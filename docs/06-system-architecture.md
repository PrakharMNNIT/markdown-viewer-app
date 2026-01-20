# 🏗️ System Architecture & Implementation Spec

**Document Type:** Technical Specification
**Version:** 1.0
**References:** verified via POCs (`poc/css-architecture`, `poc/pdf-export`)
**Status:** **APPROVED FOR IMPLEMENTATION**

---

## 1. CSS Architecture: The "Dual-Theme" Layering Strategy

To satisfy the **Dual Theme** requirement (Brand Theme vs. Preview Theme) without specificity wars or style leakage, we will utilize **CSS Cascade Layers (`@layer`)**.

### 1.1 The Layer Stack
We define a strict layer order in `globals.css`. This ensures that lower layers (framework) never accidentally override higher layers (themes), regardless of selector specificity.

```css
/* src/styles/globals.css */

@layer base, theme.app, theme.preview, components, utilities;

/*
   LAYER DEFINITIONS:

   1. base:          Resets, normalize, basic HTML element defaults.
   2. theme.app:     THE BRAND THEME. Styles for the holistic app interface.
                     (Sidebar, Toolbar, Modals, Buttons).
                     Source: brand-theme.md (Candyland)

   3. theme.preview: THE USER THEME. Isolated styles for the markdown content.
                     Source: User selection (GitHub, Dracula, etc.)

   4. components:    Complex UI component styles (shadcn/ui overrides).
   5. utilities:     Tailwind utility classes (text-center, p-4).
*/
```

### 1.2 Tailwind Configuration
Tailwind must be configured to inject its generated styles into these specific layers.

```css
@import "tailwindcss";

@layer theme.app {
  /* Brand Theme Tokens (OKLCH) */
  :root {
    --brand-bg: oklch(0.9809 0.0025 228.7836); /* Lavender Mist */
    --brand-primary: oklch(0.8677 0.0735 7.0855); /* Coral Blush */
  }
}

@layer theme.preview {
  /* Preview Theme Scope - user selected */
  .preview-content {
    /* Theme variables will be injected here via JS or data-theme attributes */
    --prose-body: var(--preview-fg);
    --prose-headings: var(--preview-fg-strong);
  }
}
```

## 2. PDF Export Architecture: Native Print Strategy

Based on **ADR-001**, we reject client-side PDF generation libraries in favor of the browser's native print engine.

### 2.1 The "Print-First" Rendering Flow

1.  **User Action**: Clicks "Export PDF".
2.  **App State Change**:
    *   Application enters `isPrinting` state (optional, if JS needed).
    *   CSS `@media print` query activates.
3.  **Visual Transformation**:
    *   **Hide**: Sidebar, Toolbar, Floating actions, Toasts.
    *   **Expand**: Preview Pane becomes 100% width/height.
    *   **Reset**: Background colors removed (save ink/toner) or preserved (`-webkit-print-color-adjust: exact`).
4.  **Browser Dialog**: System print dialog opens.
5.  **User Output**: Selects "Save as PDF".

### 2.2 Implementation Details

```css
/* src/styles/print.css */

@media print {
  /* Hide Application Chrome */
  aside,          /* Sidebar */
  header,         /* Toolbar */
  .toolbar-actions,
  .toast-viewport {
    display: none !important;
  }

  /* Reset Layout for A4/Letter */
  body, #root, main {
    margin: 0;
    padding: 0;
    overflow: visible !important;
    height: auto !important;
    background: white;
  }

  /* Target the Preview Component */
  .preview-container {
    width: 100% !important;
    position: static !important;
    overflow: visible !important;
    box-shadow: none !important;
    border: none !important;

    /* Ensure colors render (critical for syntax highlighting) */
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }

  /* Mermaid Diagram Tuning */
  svg.mermaid {
    max-width: 100% !important;
    page-break-inside: avoid;
  }
}
```

## 3. Browser Compatibility & Fallbacks

Verified strategy for File System Access API support.

### 3.1 Feature Detection Logic

```typescript
// src/lib/capabilities.ts

export const capabilities = {
  hasFileSystem: 'showOpenFilePicker' in window,
  hasNativeShare: 'share' in navigator,
};
```

### 3.2 Conditional UI Matrix

| Feature | Chrome / Edge | Firefox / Safari | Fallback UX |
| :--- | :--- | :--- | :--- |
| **Open File** | `showOpenFilePicker` | `<input type="file">` | Native file picker (standard) |
| **Save File** | `showSaveFilePicker` | Auto-download | "File downloaded to Downloads" |
| **Open Folder** | `showDirectoryPicker` | **NOT SUPPORTED** | **Hide "Open Folder" button** |
| **Export PDF** | `window.print()` | `window.print()` | Universal support |

## 4. Implementation Checklist (Sprint 1)

1.  [ ] **Scaffold**: Setup React 19 + Tailwind v4 + Vite.
2.  [ ] **Styles**: Create `globals.css` with valid `@layer` stack.
3.  [ ] **Theme**: Implement `brand-theme.md` tokens in `@layer theme.app`.
4.  [ ] **Component**: Build `Editor` (Monaco or simple textarea) and `Preview` (marked).
5.  [ ] **Feature**: Wire up `window.print()` styling.
