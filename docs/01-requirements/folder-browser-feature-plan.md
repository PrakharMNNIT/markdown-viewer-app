# 📁 Folder Browser Feature - Comprehensive Plan

## **Feature Overview**

Transform Markdown Viewer Pro into an IDE-like markdown file browser with:

- Folder access via File System Access API
- Recursive directory scanning
- Tree-style file navigation
- Click-to-render markdown files
- Professional file browser UI

---

## **User Story**

**As a user**, I want to:

1. Select a folder on my computer
2. See all markdown files in a tree view
3. Click any `.md` file to render it
4. Navigate through nested folders
5. Keep the current file open while browsing

---

## **Technical Approach**

### **Browser API: File System Access API**

Modern Chrome/Edge support:

```javascript
// Request directory access
const dirHandle = await window.showDirectoryPicker();

// Read directory recursively
async function scanDirectory(dirHandle, path = '') {
  const files = [];

  for await (const entry of dirHandle.values()) {
    if (entry.kind === 'file' && entry.name.endsWith('.md')) {
      files.push({
        name: entry.name,
        path: path + entry.name,
        handle: entry,
      });
    } else if (entry.kind === 'directory') {
      const subFiles = await scanDirectory(entry, path + entry.name + '/');
      files.push(...subFiles);
    }
  }

  return files;
}
```

---

## **UI Design**

### **Layout Structure:**

**Important:** All existing features remain! This adds a sidebar panel.

```
┌─────────────────────────────────────────────────────────────────────┐
│ 📝 Markdown Viewer Pro  [✏️][⊞][👁️] [Theme▼] [🎨] [💾] [📕] [📁]    │ ← Toolbar stays
├──────────┬──────────────────────────────┬──────────────────────────┤
│          │                              │                          │
│  Files   │  Editor                      │  Preview                 │ ← 3-column layout
│ (sidebar)│  (existing)                  │  (existing)              │
│          │                              │                          │
│ 📁 docs  │  # Content...                │  Rendered...             │
│  └📄 a   │                              │                          │
│  └📄 b   │  All editor features work:   │  All preview features:   │
│ 📁 notes │  - Syntax highlighting       │  - Math rendering        │
│  └📄 c   │  - Real-time typing          │  - Mermaid diagrams      │
│          │  - Auto-save                 │  - Syntax colors         │
│          │                              │  - Zoom controls         │
├──────────┴──────────────────────────────┴──────────────────────────┤
│ Made with ❤️ by... | GitHub | Twitter                              │ ← Footer stays
└─────────────────────────────────────────────────────────────────────┘
```

**Key Points:**

- ✅ View mode buttons (✏️⊞👁️) remain in toolbar
- ✅ Theme dropdown stays
- ✅ Customize Colors, Export HTML, Export PDF stay
- ✅ Footer with links remains
- ✅ Zoom controls in preview header stay
- ✅ **NEW:** File browser sidebar on the left

**Toggle Behavior:**

- Click "📁 Open Folder" → Sidebar appears
- Click "✕ Close" in sidebar → Sidebar hides
- Sidebar hidden by default (doesn't break existing UI)

### **File Tree Component:**

```html
<div class="file-browser">
  <div class="browser-header">
    <button id="open-folder-btn">📁 Open Folder</button>
    <button id="close-folder-btn">✕ Close</button>
  </div>

  <div class="file-tree" id="file-tree">
    <!-- Tree structure rendered here -->
  </div>
</div>
```

---

## **Implementation Steps**

### **Phase 1: File System Access (Core)**

1. **Add Open Folder Button**

   ```javascript
   async function openFolder() {
     if (!('showDirectoryPicker' in window)) {
       alert('File System Access API not supported. Use Chrome/Edge.');
       return;
     }

     try {
       const dirHandle = await window.showDirectoryPicker();
       const files = await scanDirectory(dirHandle);
       renderFileTree(files);
     } catch (error) {
       if (error.name !== 'AbortError') {
         console.error('Folder access error:', error);
       }
     }
   }
   ```

2. **Recursive Directory Scanning**

   ```javascript
   async function scanDirectory(dirHandle, path = '', depth = 0) {
     if (depth > 10) return []; // Prevent infinite recursion

     const items = [];

     for await (const entry of dirHandle.values()) {
       if (entry.name.startsWith('.')) continue; // Skip hidden

       if (entry.kind === 'file') {
         if (entry.name.endsWith('.md') || entry.name.endsWith('.markdown')) {
           items.push({
             type: 'file',
             name: entry.name,
             path: path + entry.name,
             handle: entry,
           });
         }
       } else if (entry.kind === 'directory') {
         const children = await scanDirectory(entry, path + entry.name + '/', depth + 1);
         if (children.length > 0) {
           items.push({
             type: 'directory',
             name: entry.name,
             path: path + entry.name + '/',
             children: children,
             expanded: false,
           });
         }
       }
     }

     return items.sort((a, b) => {
       if (a.type !== b.type) return a.type === 'directory' ? -1 : 1;
       return a.name.localeCompare(b.name);
     });
   }
   ```

3. **File Reading**

   ```javascript
   async function loadMarkdownFile(fileHandle) {
     try {
       const file = await fileHandle.getFile();
       const content = await file.text();

       editor.value = content;
       renderMarkdown();

       // Update active file indicator
       currentFile = fileHandle;
     } catch (error) {
       console.error('Error reading file:', error);
       alert('Failed to read file: ' + error.message);
     }
   }
   ```

---

### **Phase 2: Tree View UI**

1. **Render Tree Structure**

   ```javascript
   function renderFileTree(items, container = fileTreeEl, indent = 0) {
     container.innerHTML = '';

     items.forEach(item => {
       if (item.type === 'directory') {
         const folderDiv = createFolderElement(item, indent);
         container.appendChild(folderDiv);

         if (item.expanded && item.children) {
           const childContainer = document.createElement('div');
           childContainer.className = 'tree-children';
           renderFileTree(item.children, childContainer, indent + 1);
           container.appendChild(childContainer);
         }
       } else {
         const fileDiv = createFileElement(item, indent);
         container.appendChild(fileDiv);
       }
     });
   }
   ```

2. **Tree Item Elements**

   ```javascript
   function createFolderElement(item, indent) {
     const div = document.createElement('div');
     div.className = 'tree-item folder';
     div.style.paddingLeft = indent * 20 + 'px';

     const icon = item.expanded ? '📂' : '📁';
     div.innerHTML = `
       <span class="folder-icon">${icon}</span>
       <span class="folder-name">${item.name}</span>
       <span class="file-count">(${countFiles(item.children)})</span>
     `;

     div.addEventListener('click', e => {
       e.stopPropagation();
       toggleFolder(item);
     });

     return div;
   }

   function createFileElement(item, indent) {
     const div = document.createElement('div');
     div.className = 'tree-item file';
     div.style.paddingLeft = indent * 20 + 'px';

     div.innerHTML = `
       <span class="file-icon">📄</span>
       <span class="file-name">${item.name}</span>
     `;

     div.addEventListener('click', e => {
       e.stopPropagation();
       selectFile(item);
     });

     return div;
   }
   ```

3. **Folder Toggle**

   ```javascript
   function toggleFolder(folder) {
     folder.expanded = !folder.expanded;
     renderFileTree(allFiles);
   }
   ```

4. **File Selection**

   ```javascript
   function selectFile(fileItem) {
     // Remove previous selection
     document.querySelectorAll('.tree-item.active').forEach(el => el.classList.remove('active'));

     // Mark as active
     event.target.classList.add('active');

     // Load file content
     loadMarkdownFile(fileItem.handle);

     // Update breadcrumb
     updateBreadcrumb(fileItem.path);
   }
   ```

---

### **Phase 3: CSS Styling**

```css
/* File Browser */
.file-browser {
  width: 280px;
  background-color: var(--bg-secondary);
  border-right: 1px solid var(--border-color);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.browser-header {
  padding: 12px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  gap: 8px;
}

.file-tree {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.tree-item {
  padding: 8px 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: background-color 0.2s;
  user-select: none;
}

.tree-item:hover {
  background-color: var(--bg-tertiary);
}

.tree-item.active {
  background-color: var(--h1-color);
  color: white;
}

.tree-item.folder {
  font-weight: 600;
}

.tree-children {
  border-left: 1px dashed var(--border-color);
  margin-left: 20px;
}

.folder-icon,
.file-icon {
  flex-shrink: 0;
  font-size: 16px;
}

.file-count {
  margin-left: auto;
  font-size: 12px;
  color: var(--text-secondary);
}

/* Breadcrumb */
.breadcrumb {
  padding: 8px 12px;
  background-color: var(--bg-tertiary);
  border-bottom: 1px solid var(--border-color);
  font-size: 13px;
  color: var(--text-secondary);
  overflow-x: auto;
  white-space: nowrap;
}

.breadcrumb-separator {
  margin: 0 6px;
  color: var(--text-secondary);
}

/* Resize Handle */
.resize-handle {
  width: 4px;
  background-color: var(--border-color);
  cursor: col-resize;
  transition: background-color 0.2s;
}

.resize-handle:hover {
  background-color: var(--h1-color);
}
```

---

### **Phase 4: Advanced Features**

#### **4.1 Search in Files**

```javascript
function searchInFiles(query) {
  const results = [];

  allFiles.forEach(file => {
    if (file.type === 'file') {
      const content = await file.handle.getFile().then(f => f.text());
      if (content.toLowerCase().includes(query.toLowerCase())) {
        results.push({
          file: file,
          matches: countMatches(content, query)
        });
      }
    }
  });

  return results;
}
```

#### **4.2 Recent Files**

```javascript
class RecentFilesManager {
  constructor(storage, maxRecent = 10) {
    this.storage = storage;
    this.maxRecent = maxRecent;
  }

  addRecent(filePath) {
    let recent = this.storage.getJSON('recentFiles') || [];
    recent = [filePath, ...recent.filter(p => p !== filePath)];
    recent = recent.slice(0, this.maxRecent);
    this.storage.setJSON('recentFiles', recent);
  }

  getRecent() {
    return this.storage.getJSON('recentFiles') || [];
  }
}
```

#### **4.3 File Statistics**

```javascript
function analyzeFolder(items) {
  return {
    totalFiles: countFiles(items),
    totalFolders: countFolders(items),
    totalSize: calculateSize(items),
    filesByExtension: {
      '.md': countFiles(items, '.md'),
      '.markdown': countFiles(items, '.markdown'),
    },
  };
}
```

#### **4.4 File Watching (Advanced)**

```javascript
// Watch for file system changes
async function watchDirectory(dirHandle) {
  if ('FileSystemObserver' in window) {
    const observer = new FileSystemObserver(async records => {
      for (const record of records) {
        if (record.type === 'modified') {
          // Reload file if currently open
          if (currentFile && record.path === currentFile.path) {
            await reloadCurrentFile();
          }
        }
      }
    });

    observer.observe(dirHandle);
  }
}
```

---

## **Browser Compatibility**

### **File System Access API Support:**

| Browser    | Support | Notes         |
| ---------- | ------- | ------------- |
| Chrome 86+ | ✅ Full | Recommended   |
| Edge 86+   | ✅ Full | Recommended   |
| Firefox    | ❌ No   | Behind flag   |
| Safari     | ❌ No   | Not supported |

### **Fallback for Unsupported Browsers:**

```javascript
if (!('showDirectoryPicker' in window)) {
  // Fallback: Single file picker
  alert('Folder browsing not supported. Use file picker instead.');

  // Alternative: Upload multiple files
  const input = document.createElement('input');
  input.type = 'file';
  input.multiple = true;
  input.accept = '.md,.markdown';
  input.onchange = e => {
    handleFiles(e.target.files);
  };
  input.click();
}
```

---

## **Security & Privacy**

### **Permissions:**

- User must explicitly grant folder access
- Permission persists per origin
- Can be revoked anytime in browser settings

### **Privacy Considerations:**

```javascript
// Never upload file contents without consent
// All processing happens client-side
// No server communication for file data

// Store only file handles, not content
storage.set('lastFolderHandle', dirHandle); // ✅ OK
storage.set('fileContent', content); // ❌ Privacy concern
```

---

## **Implementation Checklist**

### **Phase 1: Core Functionality (2-3 hours)**

- [ ] Add "Open Folder" button to toolbar
- [ ] Implement showDirectoryPicker()
- [ ] Create recursive directory scanner
- [ ] Filter for .md and .markdown files
- [ ] Store file handles

### **Phase 2: Tree View UI (2-3 hours)**

- [ ] Design file browser sidebar
- [ ] Create tree view component
- [ ] Add folder expand/collapse
- [ ] Add file selection highlighting
- [ ] Style tree items

### **Phase 3: File Loading (1 hour)**

- [ ] Read file content on click
- [ ] Load into editor
- [ ] Render markdown
- [ ] Update breadcrumb/title

### **Phase 4: Polish (1-2 hours)**

- [ ] Add loading states
- [ ] Add error handling
- [ ] Add empty state message
- [ ] Add file count badges
- [ ] Add icons for file types
- [ ] Add collapse/expand all

### **Phase 5: Advanced Features (Optional)**

- [ ] Search in files
- [ ] Recent files list
- [ ] Keyboard navigation (↑↓ arrows)
- [ ] Right-click context menu
- [ ] Drag to reorder
- [ ] Bookmarks/favorites

---

## **Testing Strategy**

### **Test Cases:**

1. **Basic Folder Access**
   - Open folder with markdown files
   - Verify all .md files appear
   - Verify nested folders work

2. **File Loading**
   - Click file → loads in editor
   - Content renders correctly
   - Syntax highlighting works
   - Math formulas render

3. **Edge Cases**
   - Empty folder (show message)
   - No markdown files (show message)
   - Very deep nesting (>10 levels)
   - Large folders (100+ files)
   - Permission denied handling

4. **Browser Compatibility**
   - Chrome/Edge: Full functionality
   - Firefox/Safari: Show fallback message

---

## **User Experience Flow**

### **First Use:**

```
1. User clicks "📁 Open Folder"
2. Browser shows folder picker dialog
3. User selects folder → grants permission
4. App scans for .md files recursively
5. Files appear in tree view
6. User clicks file → renders in viewer
```

### **Subsequent Use:**

```
1. App remembers last folder (if permission persists)
2. Auto-load on startup (optional)
3. Quick file switching
```

---

## **Performance Considerations**

### **Large Folders:**

- Limit to 1000 files max
- Virtual scrolling for file list
- Lazy load folder contents
- Debounce search

### **Memory Management:**

- Store file handles, not content
- Cache rendered HTML for visited files
- Clear cache when switching folders

---

## **Estimated Effort**

| Task                 | Time    | Priority |
| -------------------- | ------- | -------- |
| Core API integration | 2h      | High     |
| Tree UI component    | 2h      | High     |
| File loading         | 1h      | High     |
| Styling & polish     | 2h      | Medium   |
| Advanced features    | 4h      | Low      |
| **Total**            | **11h** | -        |

---

## **Success Metrics**

### **Functional:**

- ✅ Can open any folder
- ✅ Lists all .md files recursively
- ✅ Tree view is navigable
- ✅ Files load and render correctly
- ✅ No performance issues with 100+ files

### **UX:**

- ✅ Intuitive folder navigation
- ✅ Fast file switching (<100ms)
- ✅ Clear visual hierarchy
- ✅ Keyboard accessible

---

## **Risks & Mitigations**

### **Risk 1: Browser Compatibility**

**Impact:** High (50% of users on Firefox/Safari)
**Mitigation:**

- Show clear message about browser requirements
- Offer fallback file picker
- Link to Chrome/Edge download

### **Risk 2: Permission Persistence**

**Impact:** Medium (users might revoke permissions)
**Mitigation:**

- Handle permission errors gracefully
- Allow re-requesting permissions
- Don't assume permissions persist

### **Risk 3: Performance with Large Folders**

**Impact:** Medium (scanning 1000+ files slow)
**Mitigation:**

- Limit to 1000 files
- Show progress indicator
- Implement pagination/virtual scroll

---

## **Future Enhancements**

### **V2 Features:**

1. **File Editing & Saving**
   - Edit loaded files
   - Save changes back to disk
   - Auto-save functionality

2. **Git Integration**
   - Show git status (modified, untracked)
   - Stage/commit files
   - View history

3. **Workspace Management**
   - Save/load workspace configurations
   - Multiple folder support
   - Workspace-specific settings

4. **Advanced Navigation**
   - Fuzzy file search (Cmd/Ctrl + P)
   - Go to symbol (headers)
   - File history (recently opened)

---

## **Documentation Updates Needed**

1. **README.md**
   - Add folder browser feature
   - Browser compatibility note
   - Usage instructions

2. **User Guide**
   - How to open folders
   - File navigation tips
   - Keyboard shortcuts

3. **FAQ**
   - "Why doesn't it work in Firefox?"
   - "How to grant permissions?"
   - "Can I edit files?"

---

## **Next Steps**

1. ✅ Create feature plan (this document)
2. [ ] Get user approval on design
3. [ ] Implement Phase 1 (core functionality)
4. [ ] Implement Phase 2 (tree UI)
5. [ ] Test with real folders
6. [ ] Deploy to production
7. [ ] Update documentation

---

**Estimated Total Effort:** 11 hours for full feature
**MVP (Phases 1-3):** 6 hours
**Recommended:** Start with MVP, iterate based on feedback

**This feature transforms the app from single-file editor to full-featured markdown workspace!** 🚀
