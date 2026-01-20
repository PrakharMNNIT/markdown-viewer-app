# 📄 Code Review: `docs/06-system-architecture.md`

**Generated:** 1/20/2026, 4:22:32 PM
**Project:** AI Visual Code Review
**Review Type:** Individual File Analysis

## 📊 File Information

**Type:** Documentation 📖
**Path:** `docs/06-system-architecture.md`
**Extension:** .md

## 📝 Changes

```diff
@@ -0,0 +1,153 @@
      1 +# 🏗️ System Architecture & Implementation Spec
      2 +
      3 +**Document Type:** Technical Specification
      4 +**Version:** 1.0
      5 +**References:** verified via POCs (`poc/css-architecture`, `poc/pdf-export`)
      6 +**Status:** **APPROVED FOR IMPLEMENTATION**
      7 +
      8 +---
      9 +
     10 +## 1. CSS Architecture: The "Dual-Theme" Layering Strategy
     11 +
     12 +To satisfy the **Dual Theme** requirement (Brand Theme vs. Preview Theme) without specificity wars or style leakage, we will utilize **CSS Cascade Layers (`@layer`)**.
     13 +
     14 +### 1.1 The Layer Stack
     15 +We define a strict layer order in `globals.css`. This ensures that lower layers (framework) never accidentally override higher layers (themes), regardless of selector specificity.
     16 +
     17 +```css
     18 +/* src/styles/globals.css */
     19 +
     20 +@layer base, theme.app, theme.preview, components, utilities;
     21 +
     22 +/*
     23 +   LAYER DEFINITIONS:
     24 +
     25 +   1. base:          Resets, normalize, basic HTML element defaults.
     26 +   2. theme.app:     THE BRAND THEME. Styles for the holistic app interface.
     27 +                     (Sidebar, Toolbar, Modals, Buttons).
     28 +                     Source: brand-theme.md (Candyland)
     29 +
     30 +   3. theme.preview: THE USER THEME. Isolated styles for the markdown content.
     31 +                     Source: User selection (GitHub, Dracula, etc.)
     32 +
     33 +   4. components:    Complex UI component styles (shadcn/ui overrides).
     34 +   5. utilities:     Tailwind utility classes (text-center, p-4).
     35 +*/
     36 +```
     37 +
     38 +### 1.2 Tailwind Configuration
     39 +Tailwind must be configured to inject its generated styles into these specific layers.
     40 +
     41 +```css
     42 +@import "tailwindcss";
     43 +
     44 +@layer theme.app {
     45 +  /* Brand Theme Tokens (OKLCH) */
     46 +  :root {
     47 +    --brand-bg: oklch(0.9809 0.0025 228.7836); /* Lavender Mist */
     48 +    --brand-primary: oklch(0.8677 0.0735 7.0855); /* Coral Blush */
     49 +  }
     50 +}
     51 +
     52 +@layer theme.preview {
     53 +  /* Preview Theme Scope - user selected */
     54 +  .preview-content {
     55 +    /* Theme variables will be injected here via JS or data-theme attributes */
     56 +    --prose-body: var(--preview-fg);
     57 +    --prose-headings: var(--preview-fg-strong);
     58 +  }
     59 +}
     60 +```
     61 +
     62 +## 2. PDF Export Architecture: Native Print Strategy
     63 +
     64 +Based on **ADR-001**, we reject client-side PDF generation libraries in favor of the browser's native print engine.
     65 +
     66 +### 2.1 The "Print-First" Rendering Flow
     67 +
     68 +1.  **User Action**: Clicks "Export PDF".
     69 +2.  **App State Change**:
     70 +    *   Application enters `isPrinting` state (optional, if JS needed).
     71 +    *   CSS `@media print` query activates.
     72 +3.  **Visual Transformation**:
     73 +    *   **Hide**: Sidebar, Toolbar, Floating actions, Toasts.
     74 +    *   **Expand**: Preview Pane becomes 100% width/height.
     75 +    *   **Reset**: Background colors removed (save ink/toner) or preserved (`-webkit-print-color-adjust: exact`).
     76 +4.  **Browser Dialog**: System print dialog opens.
     77 +5.  **User Output**: Selects "Save as PDF".
     78 +
     79 +### 2.2 Implementation Details
     80 +
     81 +```css
     82 +/* src/styles/print.css */
     83 +
     84 +@media print {
     85 +  /* Hide Application Chrome */
     86 +  aside,          /* Sidebar */
     87 +  header,         /* Toolbar */
     88 +  .toolbar-actions,
     89 +  .toast-viewport {
     90 +    display: none !important;
     91 +  }
     92 +
     93 +  /* Reset Layout for A4/Letter */
     94 +  body, #root, main {
     95 +    margin: 0;
     96 +    padding: 0;
     97 +    overflow: visible !important;
     98 +    height: auto !important;
     99 +    background: white;
    100 +  }
    101 +
    102 +  /* Target the Preview Component */
    103 +  .preview-container {
    104 +    width: 100% !important;
    105 +    position: static !important;
    106 +    overflow: visible !important;
    107 +    box-shadow: none !important;
    108 +    border: none !important;
    109 +
    110 +    /* Ensure colors render (critical for syntax highlighting) */
    111 +    -webkit-print-color-adjust: exact;
    112 +    print-color-adjust: exact;
    113 +  }
    114 +
    115 +  /* Mermaid Diagram Tuning */
    116 +  svg.mermaid {
    117 +    max-width: 100% !important;
    118 +    page-break-inside: avoid;
    119 +  }
    120 +}
    121 +```
    122 +
    123 +## 3. Browser Compatibility & Fallbacks
    124 +
    125 +Verified strategy for File System Access API support.
    126 +
    127 +### 3.1 Feature Detection Logic
    128 +
    129 +```typescript
    130 +// src/lib/capabilities.ts
    131 +
    132 +export const capabilities = {
    133 +  hasFileSystem: 'showOpenFilePicker' in window,
    134 +  hasNativeShare: 'share' in navigator,
    135 +};
    136 +```
    137 +
    138 +### 3.2 Conditional UI Matrix
    139 +
    140 +| Feature | Chrome / Edge | Firefox / Safari | Fallback UX |
    141 +| :--- | :--- | :--- | :--- |
    142 +| **Open File** | `showOpenFilePicker` | `<input type="file">` | Native file picker (standard) |
    143 +| **Save File** | `showSaveFilePicker` | Auto-download | "File downloaded to Downloads" |
    144 +| **Open Folder** | `showDirectoryPicker` | **NOT SUPPORTED** | **Hide "Open Folder" button** |
    145 +| **Export PDF** | `window.print()` | `window.print()` | Universal support |
    146 +
    147 +## 4. Implementation Checklist (Sprint 1)
    148 +
    149 +1.  [ ] **Scaffold**: Setup React 19 + Tailwind v4 + Vite.
    150 +2.  [ ] **Styles**: Create `globals.css` with valid `@layer` stack.
    151 +3.  [ ] **Theme**: Implement `brand-theme.md` tokens in `@layer theme.app`.
    152 +4.  [ ] **Component**: Build `Editor` (Monaco or simple textarea) and `Preview` (marked).
    153 +5.  [ ] **Feature**: Wire up `window.print()` styling.
    154  

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
*Generated: 2026-01-20T10:52:32.224Z*
