# 📄 Code Review: `src/components/Toolbar.tsx`

**Generated:** 1/20/2026, 4:22:32 PM
**Project:** AI Visual Code Review
**Review Type:** Individual File Analysis

## 📊 File Information

**Type:** TypeScript React Component ⚛️
**Path:** `src/components/Toolbar.tsx`
**Extension:** .tsx

## 📝 Changes

```diff
@@ -0,0 +1,143 @@
      1 +import { FolderOpen, Save, FilePlus, Download, Sparkles, Columns, FileCode, Eye, Loader2 } from 'lucide-react';
      2 +import type { ViewMode } from '../App';
      3 +import './Toolbar.css';
      4 +
      5 +interface ToolbarProps {
      6 +  viewMode: ViewMode;
      7 +  onViewModeChange: (mode: ViewMode) => void;
      8 +  onOpenFile: () => void;
      9 +  onSaveFile: () => void;
     10 +  onNewFile: () => void;
     11 +  onExportPdf: () => void;
     12 +  onAiOrganize: () => void;
     13 +  lastSaved: Date;
     14 +  isLoading?: boolean;
     15 +  currentFileName?: string;
     16 +}
     17 +
     18 +export function Toolbar({
     19 +  viewMode,
     20 +  onViewModeChange,
     21 +  onOpenFile,
     22 +  onSaveFile,
     23 +  onNewFile,
     24 +  onExportPdf,
     25 +  onAiOrganize,
     26 +  lastSaved,
     27 +  isLoading = false,
     28 +  currentFileName,
     29 +}: ToolbarProps) {
     30 +  const formatLastSaved = (date: Date) => {
     31 +    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
     32 +    if (seconds < 5) return 'Just now';
     33 +    if (seconds < 60) return `${seconds}s ago`;
     34 +    const minutes = Math.floor(seconds / 60);
     35 +    return `${minutes}m ago`;
     36 +  };
     37 +
     38 +  return (
     39 +    <div className="app-toolbar">
     40 +      <div className="toolbar-group">
     41 +        <button 
     42 +          className="toolbar-button" 
     43 +          onClick={onOpenFile} 
     44 +          title="Open Folder (Ctrl+O)"
     45 +          disabled={isLoading}
     46 +        >
     47 +          {isLoading ? (
     48 +            <Loader2 size={18} className="spinner" aria-hidden="true" />
     49 +          ) : (
     50 +            <FolderOpen size={18} aria-hidden="true" />
     51 +          )}
     52 +          <span>Open</span>
     53 +        </button>
     54 +        
     55 +        <button 
     56 +          className="toolbar-button" 
     57 +          onClick={onSaveFile} 
     58 +          title="Save (Ctrl+S)"
     59 +          disabled={isLoading}
     60 +        >
     61 +          <Save size={18} aria-hidden="true" />
     62 +          <span>Save</span>
     63 +        </button>
     64 +        
     65 +        <button 
     66 +          className="toolbar-button" 
     67 +          onClick={onNewFile} 
     68 +          title="New File (Ctrl+N)"
     69 +          disabled={isLoading}
     70 +        >
     71 +          <FilePlus size={18} aria-hidden="true" />
     72 +          <span>New</span>
     73 +        </button>
     74 +      </div>
     75 +
     76 +      {currentFileName && (
     77 +        <>
     78 +          <div className="toolbar-divider" />
     79 +          <div className="toolbar-filename">
     80 +            <span className="filename-label">=�</span>
     81 +            <span className="filename-text">{currentFileName}</span>
     82 +          </div>
     83 +        </>
     84 +      )}
     85 +
     86 +      <div className="toolbar-divider" />
     87 +
     88 +      <div className="toolbar-group">
     89 +        <button className="toolbar-button" onClick={onExportPdf} title="Export to PDF (Ctrl+P)">
     90 +          <Download size={18} aria-hidden="true" />
     91 +          <span>Export</span>
     92 +        </button>
     93 +      </div>
     94 +
     95 +      <div className="toolbar-divider" />
     96 +
     97 +      <div className="toolbar-group">
     98 +        <button className="toolbar-button toolbar-button--accent" onClick={onAiOrganize} title="AI Organize Notes">
     99 +          <Sparkles size={18} aria-hidden="true" />
    100 +          <span>AI Organize</span>
    101 +        </button>
    102 +      </div>
    103 +
    104 +      <div className="toolbar-spacer" />
    105 +
    106 +      <div className="toolbar-group view-mode-toggle">
    107 +        <button
    108 +          className={`toolbar-icon-button ${viewMode === 'editor' ? 'active' : ''}`}
    109 +          onClick={() => onViewModeChange('editor')}
    110 +          title="Editor Only"
    111 +          aria-pressed={viewMode === 'editor'}
    112 +        >
    113 +          <FileCode size={18} aria-hidden="true" />
    114 +        </button>
    115 +        
    116 +        <button
    117 +          className={`toolbar-icon-button ${viewMode === 'split' ? 'active' : ''}`}
    118 +          onClick={() => onViewModeChange('split')}
    119 +          title="Split View"
    120 +          aria-pressed={viewMode === 'split'}
    121 +        >
    122 +          <Columns size={18} aria-hidden="true" />
    123 +        </button>
    124 +        
    125 +        <button
    126 +          className={`toolbar-icon-button ${viewMode === 'preview' ? 'active' : ''}`}
    127 +          onClick={() => onViewModeChange('preview')}
    128 +          title="Preview Only"
    129 +          aria-pressed={viewMode === 'preview'}
    130 +        >
    131 +          <Eye size={18} aria-hidden="true" />
    132 +        </button>
    133 +      </div>
    134 +
    135 +      <div className="toolbar-divider" />
    136 +
    137 +      <div className="toolbar-status">
    138 +        <span className="status-indicator" />
    139 +        <span className="status-text">Saved {formatLastSaved(lastSaved)}</span>
    140 +      </div>
    141 +    </div>
    142 +  );
    143 +}
    144   No newline at end of file
  1 145  

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
*Generated: 2026-01-20T10:52:32.356Z*
