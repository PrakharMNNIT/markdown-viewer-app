/**
 * FolderBrowserService Unit Tests
 *
 * Tests for file creation, folder refresh, and utility functions.
 * Note: File System Access API methods are mocked since they require browser context.
 */

import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ERROR_MESSAGES } from '../../../src/js/config/errorMessages.js';
import { FolderBrowserService } from '../../../src/js/services/FolderBrowserService.js';

// Mock StorageManager
const createMockStorage = () => ({
  get: vi.fn(),
  set: vi.fn(),
  getJSON: vi.fn(),
  setJSON: vi.fn(),
});

describe('FolderBrowserService', () => {
  let service;
  let mockStorage;

  beforeEach(() => {
    mockStorage = createMockStorage();
    service = new FolderBrowserService(mockStorage);
  });

  describe('Constructor', () => {
    it('initializes with default values', () => {
      expect(service.currentDirectoryHandle).toBeNull();
      expect(service.maxDepth).toBe(10);
      expect(service.maxFiles).toBe(1000);
      expect(service.fileCount).toBe(0);
      expect(service.lastScanResult).toBeNull();
    });

    it('receives storage manager via dependency injection', () => {
      expect(service.storage).toBe(mockStorage);
    });
  });

  describe('isSupported()', () => {
    it('returns true when showDirectoryPicker is available', () => {
      // Mock window.showDirectoryPicker
      const originalShowDirectoryPicker = window.showDirectoryPicker;
      window.showDirectoryPicker = vi.fn();

      expect(service.isSupported()).toBe(true);

      // Restore
      window.showDirectoryPicker = originalShowDirectoryPicker;
    });

    it('returns false when showDirectoryPicker is not available', () => {
      // Remove showDirectoryPicker
      const originalShowDirectoryPicker = window.showDirectoryPicker;
      delete window.showDirectoryPicker;

      expect(service.isSupported()).toBe(false);

      // Restore
      if (originalShowDirectoryPicker) {
        window.showDirectoryPicker = originalShowDirectoryPicker;
      }
    });
  });

  describe('sanitizeFilename()', () => {
    it('removes invalid characters', () => {
      expect(service.sanitizeFilename('test<>file.md')).toBe('testfile.md');
      expect(service.sanitizeFilename('test:file.md')).toBe('testfile.md');
      expect(service.sanitizeFilename('test"file.md')).toBe('testfile.md');
      expect(service.sanitizeFilename('test/file.md')).toBe('testfile.md');
      expect(service.sanitizeFilename('test\\file.md')).toBe('testfile.md');
      expect(service.sanitizeFilename('test|file.md')).toBe('testfile.md');
      expect(service.sanitizeFilename('test?file.md')).toBe('testfile.md');
      expect(service.sanitizeFilename('test*file.md')).toBe('testfile.md');
    });

    it('removes leading dots', () => {
      expect(service.sanitizeFilename('..test.md')).toBe('test.md');
      expect(service.sanitizeFilename('...hidden.md')).toBe('hidden.md');
    });

    it('removes trailing spaces', () => {
      expect(service.sanitizeFilename('test.md   ')).toBe('test.md');
      expect(service.sanitizeFilename('document   .md')).toBe('document   .md'); // Only trailing
    });

    it('handles Windows reserved names', () => {
      expect(service.sanitizeFilename('CON.md')).toBe('_CON.md');
      expect(service.sanitizeFilename('PRN.md')).toBe('_PRN.md');
      expect(service.sanitizeFilename('AUX.md')).toBe('_AUX.md');
      expect(service.sanitizeFilename('NUL.md')).toBe('_NUL.md');
      expect(service.sanitizeFilename('COM1.md')).toBe('_COM1.md');
      expect(service.sanitizeFilename('COM9.md')).toBe('_COM9.md');
      expect(service.sanitizeFilename('LPT1.md')).toBe('_LPT1.md');
      expect(service.sanitizeFilename('LPT9.md')).toBe('_LPT9.md');
    });

    it('handles Windows reserved names case-insensitively', () => {
      expect(service.sanitizeFilename('con.md')).toBe('_con.md');
      expect(service.sanitizeFilename('Con.md')).toBe('_Con.md');
      expect(service.sanitizeFilename('CON.md')).toBe('_CON.md');
    });

    it('truncates long filenames to MAX_LENGTH', () => {
      const longName = `${'a'.repeat(300) }.md`;
      const result = service.sanitizeFilename(longName);
      expect(result.length).toBeLessThanOrEqual(200);
    });

    it('preserves valid filenames', () => {
      expect(service.sanitizeFilename('valid-file_name.md')).toBe('valid-file_name.md');
      expect(service.sanitizeFilename('My Document 2024.md')).toBe('My Document 2024.md');
    });

    it('handles empty string', () => {
      expect(service.sanitizeFilename('')).toBe('');
    });

    it('handles string with only invalid characters', () => {
      expect(service.sanitizeFilename('<>:"/\\|?*')).toBe('');
    });
  });

  describe('isMarkdownFile()', () => {
    it('returns true for .md files', () => {
      expect(service.isMarkdownFile('test.md')).toBe(true);
      expect(service.isMarkdownFile('TEST.MD')).toBe(true);
      expect(service.isMarkdownFile('Test.Md')).toBe(true);
    });

    it('returns true for .markdown files', () => {
      expect(service.isMarkdownFile('test.markdown')).toBe(true);
      expect(service.isMarkdownFile('TEST.MARKDOWN')).toBe(true);
    });

    it('returns false for non-markdown files', () => {
      expect(service.isMarkdownFile('test.txt')).toBe(false);
      expect(service.isMarkdownFile('test.html')).toBe(false);
      expect(service.isMarkdownFile('test.js')).toBe(false);
      expect(service.isMarkdownFile('test.mdx')).toBe(false);
    });

    it('returns false for files without extension', () => {
      expect(service.isMarkdownFile('README')).toBe(false);
    });
  });

  describe('getExtension()', () => {
    it('returns correct extension', () => {
      expect(service.getExtension('test.md')).toBe('.md');
      expect(service.getExtension('test.markdown')).toBe('.markdown');
      expect(service.getExtension('test.txt')).toBe('.txt');
    });

    it('returns empty string for files without extension', () => {
      expect(service.getExtension('README')).toBe('');
    });

    it('handles multiple dots', () => {
      expect(service.getExtension('test.spec.md')).toBe('.md');
      expect(service.getExtension('my.file.name.markdown')).toBe('.markdown');
    });

    it('handles hidden files (returns empty for dotfiles)', () => {
      // Hidden files like .gitignore have no extension (the dot is not a separator)
      // The implementation returns empty string for files with no extension after first dot
      expect(service.getExtension('.gitignore')).toBe('');
      expect(service.getExtension('.env')).toBe('');
      expect(service.getExtension('.config.json')).toBe('.json');
    });
  });

  describe('shouldIgnore()', () => {
    it('ignores node_modules', () => {
      expect(service.shouldIgnore('node_modules')).toBe(true);
    });

    it('ignores dist and build folders', () => {
      expect(service.shouldIgnore('dist')).toBe(true);
      expect(service.shouldIgnore('build')).toBe(true);
    });

    it('ignores .git folder', () => {
      expect(service.shouldIgnore('.git')).toBe(true);
    });

    it('ignores IDE folders', () => {
      expect(service.shouldIgnore('.vscode')).toBe(true);
      expect(service.shouldIgnore('.idea')).toBe(true);
    });

    it('ignores cache folders', () => {
      expect(service.shouldIgnore('__pycache__')).toBe(true);
      expect(service.shouldIgnore('coverage')).toBe(true);
      expect(service.shouldIgnore('.cache')).toBe(true);
    });

    it('does not ignore regular folders', () => {
      expect(service.shouldIgnore('src')).toBe(false);
      expect(service.shouldIgnore('docs')).toBe(false);
      expect(service.shouldIgnore('tests')).toBe(false);
    });
  });

  describe('countFiles()', () => {
    it('counts files in flat array', () => {
      const items = [
        { type: 'file', name: 'a.md' },
        { type: 'file', name: 'b.md' },
        { type: 'file', name: 'c.md' },
      ];
      expect(service.countFiles(items)).toBe(3);
    });

    it('counts files in nested directories', () => {
      const items = [
        { type: 'file', name: 'root.md' },
        {
          type: 'directory',
          name: 'docs',
          children: [
            { type: 'file', name: 'a.md' },
            { type: 'file', name: 'b.md' },
          ],
        },
      ];
      expect(service.countFiles(items)).toBe(3);
    });

    it('returns 0 for empty array', () => {
      expect(service.countFiles([])).toBe(0);
    });

    it('returns 0 for directories only', () => {
      const items = [
        { type: 'directory', name: 'empty', children: [] },
      ];
      expect(service.countFiles(items)).toBe(0);
    });
  });

  describe('getAllFiles()', () => {
    it('flattens nested file tree', () => {
      const items = [
        { type: 'file', name: 'root.md' },
        {
          type: 'directory',
          name: 'docs',
          children: [
            { type: 'file', name: 'a.md' },
            {
              type: 'directory',
              name: 'nested',
              children: [
                { type: 'file', name: 'deep.md' },
              ],
            },
          ],
        },
      ];

      const files = service.getAllFiles(items);
      expect(files).toHaveLength(3);
      expect(files.map(f => f.name)).toEqual(['root.md', 'a.md', 'deep.md']);
    });

    it('returns empty array for empty input', () => {
      expect(service.getAllFiles([])).toEqual([]);
    });
  });

  describe('searchFiles()', () => {
    const items = [
      { type: 'file', name: 'README.md' },
      { type: 'file', name: 'readme-dev.md' },
      { type: 'file', name: 'setup.md' },
      {
        type: 'directory',
        name: 'docs',
        children: [
          { type: 'file', name: 'README-API.md' },
        ],
      },
    ];

    it('finds files by partial name match', () => {
      const results = service.searchFiles(items, 'readme');
      expect(results).toHaveLength(3);
    });

    it('search is case-insensitive', () => {
      const results = service.searchFiles(items, 'README');
      expect(results).toHaveLength(3);
    });

    it('returns empty array for no matches', () => {
      const results = service.searchFiles(items, 'nonexistent');
      expect(results).toHaveLength(0);
    });

    it('finds exact filename', () => {
      const results = service.searchFiles(items, 'setup.md');
      expect(results).toHaveLength(1);
      expect(results[0].name).toBe('setup.md');
    });
  });

  describe('getCurrentFolderName()', () => {
    it('returns null when no folder is open', () => {
      expect(service.getCurrentFolderName()).toBeNull();
    });

    it('returns folder name when folder is open', () => {
      service.currentDirectoryHandle = { name: 'my-project' };
      expect(service.getCurrentFolderName()).toBe('my-project');
    });
  });

  describe('clearFolder()', () => {
    it('clears all folder state', () => {
      service.currentDirectoryHandle = { name: 'test' };
      service.fileCount = 50;
      service.lastScanResult = { success: true, files: [] };

      service.clearFolder();

      expect(service.currentDirectoryHandle).toBeNull();
      expect(service.fileCount).toBe(0);
      expect(service.lastScanResult).toBeNull();
    });
  });

  describe('createFile()', () => {
    it('returns error when no folder is open', async () => {
      const result = await service.createFile(null, 'test.md', '');
      expect(result.success).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.NO_FOLDER_OPEN);
    });

    it('returns error for invalid filename', async () => {
      service.currentDirectoryHandle = { name: 'test' };

      const result = await service.createFile(null, null, '');
      expect(result.success).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.INVALID_FILENAME_PROVIDED);
    });

    it('returns error for empty filename', async () => {
      service.currentDirectoryHandle = { name: 'test' };

      const result = await service.createFile(null, '', '');
      expect(result.success).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.INVALID_FILENAME_PROVIDED);
    });

    it('adds .md extension if missing', async () => {
      const mockDirHandle = {
        name: 'test-dir',
        queryPermission: vi.fn().mockResolvedValue('granted'),
        getFileHandle: vi.fn().mockImplementation((name, options) => {
          if (!options?.create) {
            throw { name: 'NotFoundError' };
          }
          return {
            createWritable: vi.fn().mockResolvedValue({
              write: vi.fn().mockResolvedValue(undefined),
              close: vi.fn().mockResolvedValue(undefined),
            }),
          };
        }),
      };

      service.currentDirectoryHandle = mockDirHandle;

      const result = await service.createFile(null, 'test', '# Content');

      expect(result.success).toBe(true);
      expect(result.filename).toBe('test.md');
    });
  });

  describe('saveFile()', () => {
    it('returns error when no file handle provided', async () => {
      const result = await service.saveFile(null, 'content');
      expect(result.success).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.NO_FILE_HANDLE);
    });

    it('returns error when permission denied', async () => {
      const mockFileHandle = {
        name: 'test.md',
        queryPermission: vi.fn().mockResolvedValue('denied'),
        requestPermission: vi.fn().mockResolvedValue('denied'),
      };

      const result = await service.saveFile(mockFileHandle, 'content');
      expect(result.success).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.PERMISSION_DENIED_SAVE);
    });

    it('saves file successfully', async () => {
      const mockWritable = {
        write: vi.fn().mockResolvedValue(undefined),
        close: vi.fn().mockResolvedValue(undefined),
      };

      const mockFileHandle = {
        name: 'test.md',
        queryPermission: vi.fn().mockResolvedValue('granted'),
        createWritable: vi.fn().mockResolvedValue(mockWritable),
      };

      const result = await service.saveFile(mockFileHandle, '# New Content');

      expect(result.success).toBe(true);
      expect(result.filename).toBe('test.md');
      expect(mockWritable.write).toHaveBeenCalledWith('# New Content');
      expect(mockWritable.close).toHaveBeenCalled();
    });
  });

  describe('refreshFolder()', () => {
    it('returns error when no folder is open', async () => {
      const result = await service.refreshFolder();
      expect(result.success).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.NO_FOLDER_OPEN);
    });

    it('returns error when permission denied', async () => {
      service.currentDirectoryHandle = {
        name: 'test',
        queryPermission: vi.fn().mockResolvedValue('denied'),
        requestPermission: vi.fn().mockResolvedValue('denied'),
      };

      const result = await service.refreshFolder();
      expect(result.success).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.PERMISSION_DENIED);
    });
  });

  describe('createDirectory()', () => {
    it('returns error when no folder is open', async () => {
      const result = await service.createDirectory(null, 'new-dir');
      expect(result.success).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.NO_FOLDER_OPEN);
    });

    it('returns error for invalid directory name', async () => {
      service.currentDirectoryHandle = { name: 'test' };

      const result = await service.createDirectory(null, '');
      expect(result.success).toBe(false);
      expect(result.error).toBe(ERROR_MESSAGES.INVALID_DIRECTORY_NAME);
    });
  });

  describe('Error Messages Integration', () => {
    it('uses centralized error messages', () => {
      // Verify error messages are imported and used correctly
      expect(ERROR_MESSAGES.NO_FOLDER_OPEN).toBeDefined();
      expect(ERROR_MESSAGES.INVALID_FILENAME).toBeDefined();
      expect(ERROR_MESSAGES.PERMISSION_DENIED).toBeDefined();
    });

    it('FILE_EXISTS returns dynamic message', () => {
      const message = ERROR_MESSAGES.FILE_EXISTS('test.md');
      expect(message).toBe('File "test.md" already exists. Please choose a different name.');
    });
  });
});
