# ADR-001: PDF Export Strategy

## Architecture Decision Record

**Status:** DECIDED  
**Date:** 2026-01-20  
**Decision Makers:** Engineering Team  
**Category:** Export/Feature

---

## Context

Markdown Preview EE needs to export rendered markdown to PDF while preserving:
- OKLCH colors from the Candyland/preview theme
- Complex layouts (tables, blockquotes, nested lists)
- Code blocks with syntax highlighting
- Mermaid diagrams (rendered as SVG)
- Math/LaTeX rendering (KaTeX)
- Custom fonts (Poppins, Roboto Mono)

### Technical Constraints

1. **Zero Backend** - App must work entirely client-side
2. **OKLCH Colors** - Modern color space may not be supported by all export methods
3. **Complex CSS** - CSS Layers, custom properties, gradients
4. **Performance** - Export should complete in < 3 seconds for typical documents

---

## Options Considered

### Option A: Browser Native Print (`window.print()`)

```javascript
function exportPdf() {
  window.print(); // User saves as PDF from print dialog
}
```

**Pros:**
- ✅ Best fidelity - browser's own rendering engine
- ✅ Handles all modern CSS (OKLCH, layers, variables)
- ✅ Works with Mermaid SVGs and KaTeX
- ✅ Zero bundle size increase
- ✅ Works offline
- ✅ Consistent across browsers

**Cons:**
- ❌ User must manually choose "Save as PDF"
- ❌ Print dialog UI varies by browser/OS
- ❌ Less control over PDF metadata
- ❌ Page breaks may need manual tuning

**Implementation:**
```css
@media print {
  .app-chrome { display: none; }
  .preview-container { 
    padding: 1cm;
    -webkit-print-color-adjust: exact;
    print-color-adjust: exact;
  }
}
```

---

### Option B: html2pdf.js (Canvas-based)

```javascript
import html2pdf from 'html2pdf.js';

function exportPdf() {
  html2pdf()
    .from(document.getElementById('preview'))
    .save('document.pdf');
}
```

**Pros:**
- ✅ Programmatic control
- ✅ Custom filename without user interaction
- ✅ Can add headers/footers programmatically

**Cons:**
- ❌ Poor OKLCH support (canvas converts to sRGB)
- ❌ Gradients may render incorrectly
- ❌ Custom fonts may fail to embed
- ❌ Mermaid SVGs need special handling
- ❌ Adds ~200kb to bundle (html2canvas + jsPDF)
- ❌ Performance issues with large documents

**POC Results:**
```
┌─────────────────────────────────────────────────────────────────┐
│ html2pdf.js POC Results                                         │
├─────────────────────────────────────────────────────────────────┤
│ OKLCH Colors        │ ⚠️ Converted to sRGB (slight color shift)│
│ CSS Variables       │ ✅ Works (computed values used)           │
│ Gradients           │ ⚠️ Some banding artifacts                │
│ Mermaid SVG         │ ❌ Requires foreignObject workaround     │
│ Custom Fonts        │ ⚠️ Fallback to system fonts sometimes    │
│ Tables              │ ✅ Works correctly                        │
│ Code Blocks         │ ✅ Works with computed colors             │
└─────────────────────────────────────────────────────────────────┘
```

---

### Option C: react-to-print

```javascript
import { useReactToPrint } from 'react-to-print';

const handlePrint = useReactToPrint({
  content: () => previewRef.current,
});
```

**Pros:**
- ✅ React-native integration
- ✅ Same fidelity as window.print()
- ✅ More control over print trigger

**Cons:**
- ❌ Still requires user to save as PDF
- ❌ Same limitations as Option A

---

### Option D: Server-Side (Puppeteer/Playwright)

```javascript
// Requires backend
const browser = await puppeteer.launch();
const page = await browser.newPage();
await page.setContent(html);
const pdf = await page.pdf({ format: 'A4' });
```

**Pros:**
- ✅ Perfect fidelity (headless Chrome)
- ✅ Full control over PDF generation
- ✅ Programmatic download

**Cons:**
- ❌ **Violates "zero backend" requirement**
- ❌ Requires server infrastructure
- ❌ Cost implications
- ❌ Doesn't work offline

**Verdict:** ❌ Rejected due to architecture constraint

---

## Decision

### **CHOSEN: Option A - Browser Native Print with Enhanced UX**

We will use `window.print()` with a comprehensive print stylesheet and enhanced user guidance.

### Rationale

1. **Perfect Fidelity** - Browser's rendering engine handles all our modern CSS
2. **Zero Dependencies** - No bundle size increase
3. **Offline Support** - Works without internet
4. **Future-Proof** - As browsers add features, print support follows

### Trade-off Accepted

The trade-off of requiring users to click "Save as PDF" in the print dialog is acceptable because:
- Most users are familiar with this workflow
- We can provide clear guidance
- The PDF quality is significantly better

---

## Implementation Plan

### 1. Print Stylesheet

```css
@media print {
  /* Hide app chrome */
  .app-header,
  .app-toolbar,
  .app-sidebar,
  .app-editor,
  .split-handle,
  .modal-overlay,
  .toast-container {
    display: none !important;
  }
  
  /* Make preview full-page */
  .preview-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: auto;
    padding: 1cm;
    margin: 0;
    background: white;
    box-shadow: none;
    border-radius: 0;
  }
  
  /* Force color printing */
  * {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }
  
  /* Page setup */
  @page {
    size: A4;
    margin: 1cm;
  }
  
  /* Prevent orphans/widows */
  p, li, blockquote {
    orphans: 3;
    widows: 3;
  }
  
  /* Keep headers with content */
  h1, h2, h3, h4, h5, h6 {
    break-after: avoid;
    page-break-after: avoid;
  }
  
  /* Keep code blocks together */
  pre, code, .mermaid {
    break-inside: avoid;
    page-break-inside: avoid;
  }
  
  /* Tables */
  table {
    break-inside: auto;
  }
  tr {
    break-inside: avoid;
  }
  thead {
    display: table-header-group;
  }
  
  /* Links */
  a[href]::after {
    content: none; /* Don't show URLs by default */
  }
  
  /* Images */
  img {
    max-width: 100% !important;
    break-inside: avoid;
  }
}
```

### 2. Export Modal UX

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│   📤 Export to PDF                                              │
│                                                                  │
│   Your document will open in the print dialog.                  │
│                                                                  │
│   To save as PDF:                                               │
│   1. Select "Save as PDF" as the destination                   │
│   2. Choose your page size and orientation                      │
│   3. Click "Save"                                               │
│                                                                  │
│   ┌─────────────────────────────────────────────────────────┐  │
│   │  💡 Tip: Enable "Background graphics" for full colors    │  │
│   └─────────────────────────────────────────────────────────┘  │
│                                                                  │
│   Preview Theme: [GitHub Light ▼]                              │
│                                                                  │
│   [Cancel]                          [Open Print Dialog →]       │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3. Export Function

```javascript
export function exportToPdf(options = {}) {
  const { 
    showGuide = true,
    onBeforePrint,
    onAfterPrint 
  } = options;
  
  // Show guidance modal if first time
  if (showGuide && !localStorage.getItem('pdf-guide-dismissed')) {
    showPdfGuideModal();
    return;
  }
  
  // Prepare for print
  if (onBeforePrint) onBeforePrint();
  document.body.classList.add('printing');
  
  // Trigger print
  window.print();
  
  // Cleanup
  window.addEventListener('afterprint', () => {
    document.body.classList.remove('printing');
    if (onAfterPrint) onAfterPrint();
  }, { once: true });
}
```

---

## Consequences

### Positive
- Best possible PDF quality
- No additional dependencies
- Works offline
- Consistent with user expectations

### Negative
- Requires one extra click from user
- Print dialog appearance varies by OS
- Some users may not know "Save as PDF" option

### Mitigations
- Clear in-app guidance
- Dismissible tutorial on first export
- Tooltip hints in export button

---

## Alternatives Not Chosen

| Option | Reason Rejected |
|--------|-----------------|
| html2pdf.js | Poor OKLCH support, bundle size |
| Server-side | Violates architecture principle |
| jsPDF direct | No CSS support |
| Puppeteer WASM | Experimental, large size |

---

## Validation

### POC Results Summary

```
┌─────────────────────────────────────────────────────────────────┐
│ window.print() POC Results                                      │
├─────────────────────────────────────────────────────────────────┤
│ OKLCH Colors        │ ✅ Perfect (browser native)              │
│ CSS Variables       │ ✅ Perfect                               │
│ CSS Layers          │ ✅ Perfect                               │
│ Gradients           │ ✅ Perfect                               │
│ Mermaid SVG         │ ✅ Perfect                               │
│ KaTeX Math          │ ✅ Perfect                               │
│ Custom Fonts        │ ✅ Embedded correctly                    │
│ Tables              │ ✅ Perfect with header repeat            │
│ Code Blocks         │ ✅ Perfect with syntax colors            │
│ Performance         │ ✅ Instant (browser native)              │
│ Bundle Impact       │ ✅ Zero                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## References

- [CSS Print Media Queries](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/print)
- [Print Color Adjust](https://developer.mozilla.org/en-US/docs/Web/CSS/print-color-adjust)
- [html2pdf.js Limitations](https://github.com/eKoopmans/html2pdf.js/issues)

---

*ADR-001 v1.0*  
*Decision Date: 2026-01-20*  
*Status: DECIDED*