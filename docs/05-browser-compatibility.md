# 🌐 Browser Compatibility Matrix

## Markdown Preview EE — Feature Support by Browser

**Document Type:** Technical Specification  
**Version:** 1.0  
**Created:** 2026-01-20

---

## 📊 Feature Support Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   BROWSER COMPATIBILITY MATRIX                                              │
│                                                                              │
│   ┌──────────────┬────────┬────────┬────────┬────────┬─────────┐           │
│   │ Feature      │ Chrome │ Edge   │ Firefox│ Safari │ Mobile  │           │
│   │              │ 90+    │ 90+    │ 90+    │ 15+    │ Browsers│           │
│   ├──────────────┼────────┼────────┼────────┼────────┼─────────┤           │
│   │ Core Editor  │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   │ Live Preview │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   │ OKLCH Colors │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   │ CSS Layers   │ ✅     │ ✅     │ ✅     │ ✅     │ ⚠️      │           │
│   │ Mermaid      │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   │ KaTeX        │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   │ localStorage │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   │ IndexedDB    │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   ├──────────────┼────────┼────────┼────────┼────────┼─────────┤           │
│   │ Open File    │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   │ Save File    │ ✅     │ ✅     │ ⚠️     │ ⚠️     │ ❌      │           │
│   │ Open Folder  │ ✅     │ ✅     │ ❌     │ ❌     │ ❌      │           │
│   │ Watch Files  │ ✅     │ ✅     │ ❌     │ ❌     │ ❌      │           │
│   ├──────────────┼────────┼────────┼────────┼────────┼─────────┤           │
│   │ PDF Export   │ ✅     │ ✅     │ ✅     │ ✅     │ ⚠️      │           │
│   │ HTML Export  │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   │ Clipboard    │ ✅     │ ✅     │ ✅     │ ✅     │ ⚠️      │           │
│   └──────────────┴────────┴────────┴────────┴────────┴─────────┘           │
│                                                                              │
│   Legend: ✅ Full Support | ⚠️ Partial/Fallback | ❌ Not Supported          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔍 Detailed Feature Analysis

### File System Access API

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   FILE SYSTEM ACCESS API SUPPORT                                            │
│                                                                              │
│   API Methods:                                                              │
│   ────────────                                                               │
│   • window.showOpenFilePicker()   - Open single/multiple files              │
│   • window.showSaveFilePicker()   - Save file with dialog                   │
│   • window.showDirectoryPicker()  - Open folder for browsing                │
│   • FileSystemFileHandle          - File read/write operations              │
│   • FileSystemDirectoryHandle     - Folder navigation                       │
│                                                                              │
│   ┌─────────────┬─────────────────────────────────────────────────────┐    │
│   │ Browser     │ Support Details                                      │    │
│   ├─────────────┼─────────────────────────────────────────────────────┤    │
│   │ Chrome 86+  │ ✅ Full support for all methods                      │    │
│   │             │ • Read/write files                                   │    │
│   │             │ • Browse folders recursively                         │    │
│   │             │ • Watch for file changes                             │    │
│   ├─────────────┼─────────────────────────────────────────────────────┤    │
│   │ Edge 86+    │ ✅ Full support (Chromium-based)                     │    │
│   │             │ Same capabilities as Chrome                          │    │
│   ├─────────────┼─────────────────────────────────────────────────────┤    │
│   │ Firefox     │ ❌ Not supported                                     │    │
│   │             │ • No showDirectoryPicker                             │    │
│   │             │ • No showSaveFilePicker (native)                     │    │
│   │             │ • Fallback: <input type="file">                      │    │
│   ├─────────────┼─────────────────────────────────────────────────────┤    │
│   │ Safari 15.2+│ ⚠️ Partial support                                   │    │
│   │             │ • showOpenFilePicker: Yes                            │    │
│   │             │ • showSaveFilePicker: Yes                            │    │
│   │             │ • showDirectoryPicker: No                            │    │
│   ├─────────────┼─────────────────────────────────────────────────────┤    │
│   │ Mobile      │ ❌ Not supported on any mobile browser               │    │
│   │             │ Fallback: Native file input                          │    │
│   └─────────────┴─────────────────────────────────────────────────────┘    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Fallback Strategies

### Strategy 1: Feature Detection

```javascript
// Feature detection utilities
const BrowserCapabilities = {
  // File System Access API
  hasFileSystemAccess: () => 'showOpenFilePicker' in window,
  hasSaveFilePicker: () => 'showSaveFilePicker' in window,
  hasDirectoryPicker: () => 'showDirectoryPicker' in window,
  
  // OKLCH Color Support
  hasOklchSupport: () => {
    const el = document.createElement('div');
    el.style.color = 'oklch(0.5 0.1 180)';
    return el.style.color !== '';
  },
  
  // CSS Layers Support
  hasCssLayers: () => {
    try {
      document.querySelector(':is(*)');
      return CSS.supports('@layer test');
    } catch {
      return false;
    }
  },
  
  // Clipboard API
  hasClipboardApi: () => 'clipboard' in navigator,
  
  // IndexedDB
  hasIndexedDB: () => 'indexedDB' in window,
};
```

### Strategy 2: Conditional UI Rendering

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   CONDITIONAL UI BASED ON BROWSER CAPABILITIES                              │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   CHROME / EDGE (Full Support)                                      │  │
│   │   ════════════════════════════                                       │  │
│   │                                                                      │  │
│   │   Toolbar:                                                          │  │
│   │   [📁 Open File] [📂 Open Folder] [💾 Save] [📤 Export ▼]          │  │
│   │                                                                      │  │
│   │   Sidebar: Shows folder tree with file navigation                   │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   FIREFOX / SAFARI (Partial Support)                                │  │
│   │   ══════════════════════════════════                                 │  │
│   │                                                                      │  │
│   │   Toolbar:                                                          │  │
│   │   [📁 Open File] [💾 Download] [📤 Export ▼]                       │  │
│   │                                                                      │  │
│   │   Note: "Open Folder" button HIDDEN                                 │  │
│   │   Note: "Save" becomes "Download" (triggers file download)          │  │
│   │                                                                      │  │
│   │   Info Banner (dismissible):                                        │  │
│   │   ┌─────────────────────────────────────────────────────────────┐  │  │
│   │   │ ℹ️ Folder browsing is available in Chrome and Edge.         │  │  │
│   │   │    You can still open individual files.              [Dismiss]│  │  │
│   │   └─────────────────────────────────────────────────────────────┘  │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   MOBILE BROWSERS (Limited Support)                                 │  │
│   │   ═════════════════════════════════                                  │  │
│   │                                                                      │  │
│   │   Toolbar (Simplified):                                             │  │
│   │   [📁 Open] [📤 Share]                                             │  │
│   │                                                                      │  │
│   │   Note: Uses native file picker for open                           │  │
│   │   Note: Uses Web Share API for export                              │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Strategy 3: Graceful Degradation Implementation

```javascript
// File operations with fallback
async function openFile() {
  if (BrowserCapabilities.hasFileSystemAccess()) {
    // Modern API
    const [fileHandle] = await window.showOpenFilePicker({
      types: [{
        description: 'Markdown Files',
        accept: { 'text/markdown': ['.md', '.markdown'] }
      }]
    });
    const file = await fileHandle.getFile();
    return { content: await file.text(), handle: fileHandle };
  } else {
    // Fallback: Classic file input
    return new Promise((resolve) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = '.md,.markdown,.txt';
      input.onchange = async (e) => {
        const file = e.target.files[0];
        resolve({ content: await file.text(), handle: null });
      };
      input.click();
    });
  }
}

async function saveFile(content, existingHandle) {
  if (BrowserCapabilities.hasSaveFilePicker() && existingHandle) {
    // Save to existing file
    const writable = await existingHandle.createWritable();
    await writable.write(content);
    await writable.close();
    return existingHandle;
  } else if (BrowserCapabilities.hasSaveFilePicker()) {
    // Save As dialog
    const handle = await window.showSaveFilePicker({
      suggestedName: 'document.md',
      types: [{
        description: 'Markdown',
        accept: { 'text/markdown': ['.md'] }
      }]
    });
    const writable = await handle.createWritable();
    await writable.write(content);
    await writable.close();
    return handle;
  } else {
    // Fallback: Download file
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'document.md';
    a.click();
    URL.revokeObjectURL(url);
    return null;
  }
}

async function openFolder() {
  if (!BrowserCapabilities.hasDirectoryPicker()) {
    // Show user-friendly message
    showNotification({
      type: 'info',
      title: 'Folder Browsing Unavailable',
      message: 'Folder browsing works best in Chrome or Edge. You can still open individual files.',
      action: { label: 'Open File', onClick: openFile }
    });
    return null;
  }
  
  const dirHandle = await window.showDirectoryPicker();
  return scanDirectory(dirHandle);
}
```

---

## 🎨 UI/UX Guidelines for Fallbacks

### Notification Messages

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   USER-FRIENDLY MESSAGES FOR UNSUPPORTED FEATURES                           │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   FOLDER BROWSING (Firefox/Safari)                                  │  │
│   │   ────────────────────────────────                                   │  │
│   │                                                                      │  │
│   │   ℹ️ "Folder browsing is available in Chrome and Edge.             │  │
│   │       You can still open and edit individual markdown files."       │  │
│   │                                                                      │  │
│   │   Button: [Open Individual File]                                    │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   SAVE FILE (Firefox/Safari)                                        │  │
│   │   ──────────────────────────                                         │  │
│   │                                                                      │  │
│   │   ℹ️ "Your browser doesn't support direct file saving.             │  │
│   │       The file will be downloaded to your Downloads folder."        │  │
│   │                                                                      │  │
│   │   Button: [Download File]                                           │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   MOBILE EXPORT                                                     │  │
│   │   ─────────────                                                      │  │
│   │                                                                      │  │
│   │   ℹ️ "PDF export on mobile opens your device's print dialog.       │  │
│   │       Select 'Save as PDF' to export your document."                │  │
│   │                                                                      │  │
│   │   Button: [Open Print Dialog]                                       │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Visual Indicators

```css
/* Disabled button styling for unsupported features */
.btn-unsupported {
  opacity: 0.5;
  cursor: not-allowed;
  position: relative;
}

.btn-unsupported::after {
  content: 'Not available in this browser';
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%);
  background: var(--brand-text);
  color: var(--brand-surface);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.75rem;
  white-space: nowrap;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.2s;
}

.btn-unsupported:hover::after {
  opacity: 1;
}
```

---

## 📱 Mobile-Specific Considerations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   MOBILE BROWSER ADAPTATIONS                                                │
│                                                                              │
│   1. RESPONSIVE LAYOUT                                                      │
│   ────────────────────                                                       │
│   • Single-pane view (editor OR preview, not split)                        │
│   • Bottom navigation for view toggle                                       │
│   • Touch-friendly button sizes (min 44x44px)                              │
│   • Swipe gestures for view switching                                       │
│                                                                              │
│   2. FILE HANDLING                                                          │
│   ────────────────                                                           │
│   • Use native <input type="file"> for opening                             │
│   • Use Web Share API for sharing/exporting                                │
│   • Download fallback for saving                                           │
│   • No folder browsing (hide feature entirely)                             │
│                                                                              │
│   3. KEYBOARD HANDLING                                                      │
│   ────────────────────                                                       │
│   • Adjust viewport on keyboard open                                       │
│   • Toolbar collapses when keyboard visible                                │
│   • Floating action button for quick actions                               │
│                                                                              │
│   4. PERFORMANCE                                                            │
│   ───────────────                                                            │
│   • Longer debounce on preview update (500ms vs 300ms)                     │
│   • Lazy load Mermaid and KaTeX                                            │
│   • Reduce animation complexity                                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🧪 Testing Checklist

### Browser Testing Matrix

| Test Case | Chrome | Edge | Firefox | Safari | iOS Safari | Android Chrome |
|-----------|--------|------|---------|--------|------------|----------------|
| App loads correctly | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Editor typing works | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Preview renders | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| OKLCH colors display | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Theme switching | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Open file | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Open folder | ☐ | ☐ | N/A | N/A | N/A | N/A |
| Save file | ☐ | ☐ | ☐ (dl) | ☐ (dl) | ☐ (dl) | ☐ (dl) |
| PDF export | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Mermaid diagrams | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Math rendering | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| localStorage persist | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |
| Keyboard shortcuts | ☐ | ☐ | ☐ | ☐ | N/A | N/A |
| Accessibility | ☐ | ☐ | ☐ | ☐ | ☐ | ☐ |

---

## 📝 Implementation Notes

1. **Always test fallbacks** - Don't assume the modern API works
2. **Provide clear feedback** - Users should understand why a feature isn't available
3. **Never show broken UI** - Hide buttons for unsupported features
4. **Test on actual devices** - Emulators don't catch everything
5. **Document edge cases** - Some browsers have quirks in private mode

---

*Browser Compatibility Matrix v1.0*  
*Created: 2026-01-20*  
*Last Updated: 2026-01-20*