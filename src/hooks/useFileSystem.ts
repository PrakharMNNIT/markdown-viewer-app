import { useState, useCallback } from 'react';

export interface FileEntry {
  name: string;
  path: string;
  handle: FileSystemFileHandle;
  isMarkdown: boolean;
}

export interface FolderState {
  handle: FileSystemDirectoryHandle | null;
  files: FileEntry[];
  currentFile: FileEntry | null;
}

export function useFileSystem() {
  const [folder, setFolder] = useState<FolderState>({
    handle: null,
    files: [],
    currentFile: null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Check if File System Access API is supported
  const isSupported = 'showDirectoryPicker' in window;

  // Open folder picker
  const openFolder = useCallback(async (): Promise<boolean> => {
    if (!isSupported) {
      setError('File System Access API is not supported in this browser. Try Chrome or Edge.');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      const dirHandle = await window.showDirectoryPicker({
        mode: 'readwrite',
      });

      // Scan for markdown files
      const files: FileEntry[] = [];
      await scanDirectory(dirHandle, '', files);

      // Sort files alphabetically
      files.sort((a, b) => a.name.localeCompare(b.name));

      setFolder({
        handle: dirHandle,
        files,
        currentFile: null,
      });

      setIsLoading(false);
      return true;
    } catch (err) {
      if ((err as Error).name === 'AbortError') {
        // User cancelled - not an error
        setIsLoading(false);
        return false;
      }
      setError(`Failed to open folder: ${(err as Error).message}`);
      setIsLoading(false);
      return false;
    }
  }, [isSupported]);

  // Recursively scan directory for markdown files
  const scanDirectory = async (
    dirHandle: FileSystemDirectoryHandle,
    path: string,
    files: FileEntry[]
  ): Promise<void> => {
    for await (const entry of dirHandle.values()) {
      const entryPath = path ? `${path}/${entry.name}` : entry.name;

      if (entry.kind === 'file') {
        const isMarkdown = /\.(md|markdown|mdx)$/i.test(entry.name);
        if (isMarkdown) {
          files.push({
            name: entry.name,
            path: entryPath,
            handle: entry as FileSystemFileHandle,
            isMarkdown: true,
          });
        }
      } else if (entry.kind === 'directory') {
        // Skip hidden folders and node_modules
        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
          await scanDirectory(entry as FileSystemDirectoryHandle, entryPath, files);
        }
      }
    }
  };

  // Read file content
  const readFile = useCallback(async (fileEntry: FileEntry): Promise<string | null> => {
    try {
      setIsLoading(true);
      setError(null);

      const file = await fileEntry.handle.getFile();
      const content = await file.text();

      setFolder(prev => ({
        ...prev,
        currentFile: fileEntry,
      }));

      setIsLoading(false);
      return content;
    } catch (err) {
      setError(`Failed to read file: ${(err as Error).message}`);
      setIsLoading(false);
      return null;
    }
  }, []);

  // Save file content
  const saveFile = useCallback(async (content: string): Promise<boolean> => {
    if (!folder.currentFile) {
      setError('No file selected to save');
      return false;
    }

    try {
      setIsLoading(true);
      setError(null);

      const writable = await folder.currentFile.handle.createWritable();
      await writable.write(content);
      await writable.close();

      setIsLoading(false);
      return true;
    } catch (err) {
      setError(`Failed to save file: ${(err as Error).message}`);
      setIsLoading(false);
      return false;
    }
  }, [folder.currentFile]);

  // Create new file in current folder
  const createFile = useCallback(async (fileName: string): Promise<FileEntry | null> => {
    if (!folder.handle) {
      setError('No folder open');
      return null;
    }

    // Ensure .md extension
    const name = fileName.endsWith('.md') ? fileName : `${fileName}.md`;

    try {
      setIsLoading(true);
      setError(null);

      const fileHandle = await folder.handle.getFileHandle(name, { create: true });
      
      const newFile: FileEntry = {
        name,
        path: name,
        handle: fileHandle,
        isMarkdown: true,
      };

      setFolder(prev => ({
        ...prev,
        files: [...prev.files, newFile].sort((a, b) => a.name.localeCompare(b.name)),
        currentFile: newFile,
      }));

      setIsLoading(false);
      return newFile;
    } catch (err) {
      setError(`Failed to create file: ${(err as Error).message}`);
      setIsLoading(false);
      return null;
    }
  }, [folder.handle]);

  // Close folder
  const closeFolder = useCallback(() => {
    setFolder({
      handle: null,
      files: [],
      currentFile: null,
    });
    setError(null);
  }, []);

  return {
    folder,
    isLoading,
    error,
    isSupported,
    openFolder,
    readFile,
    saveFile,
    createFile,
    closeFolder,
  };
}

// Type declarations for File System Access API
declare global {
  interface Window {
    showDirectoryPicker(options?: {
      mode?: 'read' | 'readwrite';
    }): Promise<FileSystemDirectoryHandle>;
  }

  interface FileSystemDirectoryHandle {
    values(): AsyncIterableIterator<FileSystemHandle>;
    getFileHandle(name: string, options?: { create?: boolean }): Promise<FileSystemFileHandle>;
  }

  interface FileSystemFileHandle {
    getFile(): Promise<File>;
    createWritable(): Promise<FileSystemWritableFileStream>;
  }

  interface FileSystemWritableFileStream extends WritableStream {
    write(data: string | BufferSource | Blob): Promise<void>;
    close(): Promise<void>;
  }
}