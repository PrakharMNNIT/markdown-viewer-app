/**
 * FolderBrowserService - File System Browser Service (Enterprise Grade)
 *
 * Handles folder access, recursive scanning, and file management using
 * the File System Access API (Chrome 86+, Edge 86+).
 *
 * Features:
 * - Recursive directory scanning
 * - File filtering (.md, .markdown)
 * - Tree structure generation
 * - Permission management
 * - Error handling and graceful degradation
 *
 * Architecture:
 * - Single Responsibility: Folder/file operations only
 * - Dependency Injection: Receives StorageManager
 * - Error Handling: Never throws, returns error states
 * - Performance: Depth limiting, file count caps
 */

/**
 * @class FolderBrowserService
 * @description Enterprise-grade service for browsing markdown files in folders
 *
 * @example
 * const service = new FolderBrowserService(storageManager);
 * const result = await service.openFolder();
 * if (result.success) {
 *   renderTree(result.files);
 * }
 */
export class FolderBrowserService {
  constructor(storageManager) {
    this.storage = storageManager;
    this.currentDirectoryHandle = null;
    this.maxDepth = 10; // Prevent infinite recursion
    this.maxFiles = 1000; // Performance cap
    this.fileCount = 0;
  }

  /**
   * Check if File System Access API is supported
   *
   * @returns {boolean} True if supported
   */
  isSupported() {
    return 'showDirectoryPicker' in window;
  }

  /**
   * Request user to select a folder
   *
   * @returns {Promise<Object>} Result with success, files, or error
   *
   * @example
   * const result = await service.openFolder();
   * if (result.success) {
   *   console.log(`Found ${result.files.length} markdown files`);
   * }
   */
  async openFolder() {
    if (!this.isSupported()) {
      return {
        success: false,
        error: 'File System Access API not supported. Please use Chrome or Edge browser.',
        files: [],
      };
    }

    try {
      // Request folder access
      const dirHandle = await window.showDirectoryPicker({
        mode: 'read', // Only read access needed
      });

      this.currentDirectoryHandle = dirHandle;
      this.fileCount = 0;

      // Scan directory recursively
      const files = await this.scanDirectory(dirHandle);

      // Store permission for future use
      this.storage.set('lastFolderName', dirHandle.name);

      return {
        success: true,
        files: files,
        folderName: dirHandle.name,
        totalFiles: this.fileCount,
      };
    } catch (error) {
      if (error.name === 'AbortError') {
        // User cancelled - not an error
        return {
          success: false,
          cancelled: true,
          files: [],
        };
      }

      console.error('Folder access error:', error);
      return {
        success: false,
        error: error.message,
        files: [],
      };
    }
  }

  /**
   * Recursively scan directory for markdown files
   *
   * @param {FileSystemDirectoryHandle} dirHandle - Directory to scan
   * @param {string} path - Current path (for display)
   * @param {number} depth - Current recursion depth
   * @returns {Promise<Array>} Array of file and directory objects
   * @private
   */
  async scanDirectory(dirHandle, path = '', depth = 0) {
    // Prevent excessive recursion
    if (depth > this.maxDepth) {
      console.warn(`Max depth ${this.maxDepth} reached at: ${path}`);
      return [];
    }

    // Prevent scanning too many files
    if (this.fileCount >= this.maxFiles) {
      console.warn(`Max files ${this.maxFiles} reached`);
      return [];
    }

    const items = [];

    try {
      for await (const entry of dirHandle.values()) {
        // Skip hidden files/folders
        if (entry.name.startsWith('.')) {
          continue;
        }

        // Skip common ignore patterns
        if (this.shouldIgnore(entry.name)) {
          continue;
        }

        if (entry.kind === 'file') {
          // Check if markdown file
          if (this.isMarkdownFile(entry.name)) {
            this.fileCount++;

            items.push({
              type: 'file',
              name: entry.name,
              path: path + entry.name,
              handle: entry,
              extension: this.getExtension(entry.name),
              size: 0, // Will be loaded on demand
            });
          }
        } else if (entry.kind === 'directory') {
          // Recursively scan subdirectory
          const children = await this.scanDirectory(entry, path + entry.name + '/', depth + 1);

          // Only include folders with markdown files
          if (children.length > 0) {
            items.push({
              type: 'directory',
              name: entry.name,
              path: path + entry.name + '/',
              handle: entry,
              children: children,
              expanded: false,
              fileCount: this.countFiles(children),
            });
          }
        }
      }
    } catch (error) {
      console.error(`Error scanning ${path}:`, error);
    }

    // Sort: folders first, then files, alphabetically
    return items.sort((a, b) => {
      if (a.type !== b.type) {
        return a.type === 'directory' ? -1 : 1;
      }
      return a.name.localeCompare(b.name, undefined, { numeric: true });
    });
  }

  /**
   * Read content from a file handle
   *
   * @param {FileSystemFileHandle} fileHandle - File to read
   * @returns {Promise<Object>} Result with content or error
   *
   * @example
   * const result = await service.readFile(fileHandle);
   * if (result.success) {
   *   editor.value = result.content;
   * }
   */
  async readFile(fileHandle) {
    try {
      const file = await fileHandle.getFile();
      const content = await file.text();

      return {
        success: true,
        content: content,
        name: file.name,
        size: file.size,
        lastModified: new Date(file.lastModified),
      };
    } catch (error) {
      console.error('Error reading file:', error);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Check if filename is a markdown file
   *
   * @param {string} filename - Filename to check
   * @returns {boolean} True if markdown file
   * @private
   */
  isMarkdownFile(filename) {
    const lower = filename.toLowerCase();
    return lower.endsWith('.md') || lower.endsWith('.markdown');
  }

  /**
   * Get file extension
   *
   * @param {string} filename - Filename
   * @returns {string} Extension (e.g., '.md')
   * @private
   */
  getExtension(filename) {
    const lastDot = filename.lastIndexOf('.');
    return lastDot > 0 ? filename.substring(lastDot) : '';
  }

  /**
   * Check if file/folder should be ignored
   *
   * @param {string} name - File or folder name
   * @returns {boolean} True if should be ignored
   * @private
   */
  shouldIgnore(name) {
    const ignorePatterns = [
      'node_modules',
      'dist',
      'build',
      '.git',
      '.vscode',
      '.idea',
      '__pycache__',
      'coverage',
      '.cache',
    ];

    return ignorePatterns.some(pattern => name === pattern || name.startsWith(pattern));
  }

  /**
   * Count total files in tree
   *
   * @param {Array} items - Tree items
   * @returns {number} Total file count
   * @private
   */
  countFiles(items) {
    let count = 0;

    items.forEach(item => {
      if (item.type === 'file') {
        count++;
      } else if (item.type === 'directory' && item.children) {
        count += this.countFiles(item.children);
      }
    });

    return count;
  }

  /**
   * Flatten tree structure to get all files
   *
   * @param {Array} items - Tree items
   * @returns {Array} Flat array of files only
   */
  getAllFiles(items) {
    const files = [];

    items.forEach(item => {
      if (item.type === 'file') {
        files.push(item);
      } else if (item.type === 'directory' && item.children) {
        files.push(...this.getAllFiles(item.children));
      }
    });

    return files;
  }

  /**
   * Search for files by name
   *
   * @param {Array} items - Tree items
   * @param {string} query - Search query
   * @returns {Array} Matching files
   */
  searchFiles(items, query) {
    const results = [];
    const lowerQuery = query.toLowerCase();

    this.getAllFiles(items).forEach(file => {
      if (file.name.toLowerCase().includes(lowerQuery)) {
        results.push(file);
      }
    });

    return results;
  }

  /**
   * Get current folder name
   *
   * @returns {string|null} Folder name or null
   */
  getCurrentFolderName() {
    return this.currentDirectoryHandle?.name || null;
  }

  /**
   * Clear current folder
   */
  clearFolder() {
    this.currentDirectoryHandle = null;
    this.fileCount = 0;
  }
}
