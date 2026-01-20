# 📄 Code Review: `src/hooks/useFileSystem.ts`

**Generated:** 1/20/2026, 4:22:32 PM
**Project:** AI Visual Code Review
**Review Type:** Individual File Analysis

## 📊 File Information

**Type:** TypeScript Source File 📘
**Path:** `src/hooks/useFileSystem.ts`
**Extension:** .ts

## 📝 Changes

```diff
@@ -0,0 +1,228 @@
      1 +import { useState, useCallback } from 'react';
      2 +
      3 +export interface FileEntry {
      4 +  name: string;
      5 +  path: string;
      6 +  handle: FileSystemFileHandle;
      7 +  isMarkdown: boolean;
      8 +}
      9 +
     10 +export interface FolderState {
     11 +  handle: FileSystemDirectoryHandle | null;
     12 +  files: FileEntry[];
     13 +  currentFile: FileEntry | null;
     14 +}
     15 +
     16 +export function useFileSystem() {
     17 +  const [folder, setFolder] = useState<FolderState>({
     18 +    handle: null,
     19 +    files: [],
     20 +    currentFile: null,
     21 +  });
     22 +  const [isLoading, setIsLoading] = useState(false);
     23 +  const [error, setError] = useState<string | null>(null);
     24 +
     25 +  // Check if File System Access API is supported
     26 +  const isSupported = 'showDirectoryPicker' in window;
     27 +
     28 +  // Open folder picker
     29 +  const openFolder = useCallback(async (): Promise<boolean> => {
     30 +    if (!isSupported) {
     31 +      setError('File System Access API is not supported in this browser. Try Chrome or Edge.');
     32 +      return false;
     33 +    }
     34 +
     35 +    try {
     36 +      setIsLoading(true);
     37 +      setError(null);
     38 +
     39 +      const dirHandle = await window.showDirectoryPicker({
     40 +        mode: 'readwrite',
     41 +      });
     42 +
     43 +      // Scan for markdown files
     44 +      const files: FileEntry[] = [];
     45 +      await scanDirectory(dirHandle, '', files);
     46 +
     47 +      // Sort files alphabetically
     48 +      files.sort((a, b) => a.name.localeCompare(b.name));
     49 +
     50 +      setFolder({
     51 +        handle: dirHandle,
     52 +        files,
     53 +        currentFile: null,
     54 +      });
     55 +
     56 +      setIsLoading(false);
     57 +      return true;
     58 +    } catch (err) {
     59 +      if ((err as Error).name === 'AbortError') {
     60 +        // User cancelled - not an error
     61 +        setIsLoading(false);
     62 +        return false;
     63 +      }
     64 +      setError(`Failed to open folder: ${(err as Error).message}`);
     65 +      setIsLoading(false);
     66 +      return false;
     67 +    }
     68 +  }, [isSupported]);
     69 +
     70 +  // Recursively scan directory for markdown files
     71 +  const scanDirectory = async (
     72 +    dirHandle: FileSystemDirectoryHandle,
     73 +    path: string,
     74 +    files: FileEntry[]
     75 +  ): Promise<void> => {
     76 +    for await (const entry of dirHandle.values()) {
     77 +      const entryPath = path ? `${path}/${entry.name}` : entry.name;
     78 +
     79 +      if (entry.kind === 'file') {
     80 +        const isMarkdown = /\.(md|markdown|mdx)$/i.test(entry.name);
     81 +        if (isMarkdown) {
     82 +          files.push({
     83 +            name: entry.name,
     84 +            path: entryPath,
     85 +            handle: entry as FileSystemFileHandle,
     86 +            isMarkdown: true,
     87 +          });
     88 +        }
     89 +      } else if (entry.kind === 'directory') {
     90 +        // Skip hidden folders and node_modules
     91 +        if (!entry.name.startsWith('.') && entry.name !== 'node_modules') {
     92 +          await scanDirectory(entry as FileSystemDirectoryHandle, entryPath, files);
     93 +        }
     94 +      }
     95 +    }
     96 +  };
     97 +
     98 +  // Read file content
     99 +  const readFile = useCallback(async (fileEntry: FileEntry): Promise<string | null> => {
    100 +    try {
    101 +      setIsLoading(true);
    102 +      setError(null);
    103 +
    104 +      const file = await fileEntry.handle.getFile();
    105 +      const content = await file.text();
    106 +
    107 +      setFolder(prev => ({
    108 +        ...prev,
    109 +        currentFile: fileEntry,
    110 +      }));
    111 +
    112 +      setIsLoading(false);
    113 +      return content;
    114 +    } catch (err) {
    115 +      setError(`Failed to read file: ${(err as Error).message}`);
    116 +      setIsLoading(false);
    117 +      return null;
    118 +    }
    119 +  }, []);
    120 +
    121 +  // Save file content
    122 +  const saveFile = useCallback(async (content: string): Promise<boolean> => {
    123 +    if (!folder.currentFile) {
    124 +      setError('No file selected to save');
    125 +      return false;
    126 +    }
    127 +
    128 +    try {
    129 +      setIsLoading(true);
    130 +      setError(null);
    131 +
    132 +      const writable = await folder.currentFile.handle.createWritable();
    133 +      await writable.write(content);
    134 +      await writable.close();
    135 +
    136 +      setIsLoading(false);
    137 +      return true;
    138 +    } catch (err) {
    139 +      setError(`Failed to save file: ${(err as Error).message}`);
    140 +      setIsLoading(false);
    141 +      return false;
    142 +    }
    143 +  }, [folder.currentFile]);
    144 +
    145 +  // Create new file in current folder
    146 +  const createFile = useCallback(async (fileName: string): Promise<FileEntry | null> => {
    147 +    if (!folder.handle) {
    148 +      setError('No folder open');
    149 +      return null;
    150 +    }
    151 +
    152 +    // Ensure .md extension
    153 +    const name = fileName.endsWith('.md') ? fileName : `${fileName}.md`;
    154 +
    155 +    try {
    156 +      setIsLoading(true);
    157 +      setError(null);
    158 +
    159 +      const fileHandle = await folder.handle.getFileHandle(name, { create: true });
    160 +      
    161 +      const newFile: FileEntry = {
    162 +        name,
    163 +        path: name,
    164 +        handle: fileHandle,
    165 +        isMarkdown: true,
    166 +      };
    167 +
    168 +      setFolder(prev => ({
    169 +        ...prev,
    170 +        files: [...prev.files, newFile].sort((a, b) => a.name.localeCompare(b.name)),
    171 +        currentFile: newFile,
    172 +      }));
    173 +
    174 +      setIsLoading(false);
    175 +      return newFile;
    176 +    } catch (err) {
    177 +      setError(`Failed to create file: ${(err as Error).message}`);
    178 +      setIsLoading(false);
    179 +      return null;
    180 +    }
    181 +  }, [folder.handle]);
    182 +
    183 +  // Close folder
    184 +  const closeFolder = useCallback(() => {
    185 +    setFolder({
    186 +      handle: null,
    187 +      files: [],
    188 +      currentFile: null,
    189 +    });
    190 +    setError(null);
    191 +  }, []);
    192 +
    193 +  return {
    194 +    folder,
    195 +    isLoading,
    196 +    error,
    197 +    isSupported,
    198 +    openFolder,
    199 +    readFile,
    200 +    saveFile,
    201 +    createFile,
    202 +    closeFolder,
    203 +  };
    204 +}
    205 +
    206 +// Type declarations for File System Access API
    207 +declare global {
    208 +  interface Window {
    209 +    showDirectoryPicker(options?: {
    210 +      mode?: 'read' | 'readwrite';
    211 +    }): Promise<FileSystemDirectoryHandle>;
    212 +  }
    213 +
    214 +  interface FileSystemDirectoryHandle {
    215 +    values(): AsyncIterableIterator<FileSystemHandle>;
    216 +    getFileHandle(name: string, options?: { create?: boolean }): Promise<FileSystemFileHandle>;
    217 +  }
    218 +
    219 +  interface FileSystemFileHandle {
    220 +    getFile(): Promise<File>;
    221 +    createWritable(): Promise<FileSystemWritableFileStream>;
    222 +  }
    223 +
    224 +  interface FileSystemWritableFileStream extends WritableStream {
    225 +    write(data: string | BufferSource | Blob): Promise<void>;
    226 +    close(): Promise<void>;
    227 +  }
    228 +}
    229   No newline at end of file
  1 230  

```

## 🤖 Comprehensive Review Checklist

### ✅ Code Quality & Standards
- [ ] **Syntax & Formatting**: Consistent indentation, proper spacing
- [ ] **Naming Conventions**: Clear, descriptive variable/function names
- [ ] **Code Structure**: Logical organization, appropriate function size
- [ ] **Documentation**: Clear comments explaining complex logic
- [ ] **Type Safety**: Proper typing (if applicable)

### 🔍 Logic & Functionality
- [ ] **Algorithm Correctness**: Logic implements requirements correctly
- [ ] **Edge Case Handling**: Boundary conditions properly addressed
- [ ] **Error Handling**: Appropriate try-catch blocks and error messages
- [ ] **Performance**: Efficient algorithms, no unnecessary loops
- [ ] **Memory Management**: Proper cleanup, no memory leaks

### 🐛 Potential Issues & Bugs
- [ ] **Runtime Errors**: No null/undefined dereferencing
- [ ] **Type Mismatches**: Consistent data types throughout
- [ ] **Race Conditions**: Proper async/await handling
- [ ] **Resource Leaks**: Event listeners, timers properly cleaned up
- [ ] **Off-by-one Errors**: Array/loop bounds correctly handled

### 🔒 Security Considerations
- [ ] **Input Validation**: User inputs properly sanitized
- [ ] **XSS Prevention**: No unsafe HTML injection
- [ ] **Authentication**: Proper access controls if applicable
- [ ] **Data Exposure**: No sensitive information in logs/client
- [ ] **Dependency Security**: No known vulnerable packages

### 📱 User Experience & Accessibility
- [ ] **Responsive Design**: Works on different screen sizes
- [ ] **Loading States**: Proper feedback during operations
- [ ] **Error Messages**: User-friendly error communication
- [ ] **Accessibility**: ARIA labels, keyboard navigation
- [ ] **Performance**: Fast loading, smooth interactions

### 💡 Improvement Suggestions

#### Code Organization
- [ ] Consider extracting complex logic into separate functions
- [ ] Evaluate if constants should be moved to configuration
- [ ] Check for code duplication opportunities

#### Performance Optimizations
- [ ] Identify opportunities for memoization
- [ ] Consider lazy loading for heavy operations
- [ ] Evaluate database query efficiency (if applicable)

#### Testing Recommendations
- [ ] Unit tests for core functionality
- [ ] Integration tests for API endpoints
- [ ] Edge case testing scenarios

#### Documentation Needs
- [ ] API documentation updates
- [ ] Code comments for complex algorithms
- [ ] README updates if public interfaces changed

### 📝 Review Notes
*Add your specific feedback, suggestions, and observations here:*

---
*Individual file review generated by AI Visual Code Review v2.0*
*Generated: 2026-01-20T10:52:32.361Z*
