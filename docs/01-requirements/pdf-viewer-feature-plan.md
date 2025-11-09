# PDF Viewer Feature - Implementation Plan

## 🎯 Feature Requirements

**User Story:** As a user, I want to preview my PDF before downloading and customize the export settings.

### Core Features

1. **PDF Preview** - View PDF before downloading
2. **Margin Control** - Adjust margins (top, right, bottom, left)
3. **Page Size** - Select A4, Letter, Legal
4. **Orientation** - Portrait or Landscape
5. **Font Size** - Increase/decrease for whole document

---

## 🏗️ Architecture Plan

### 1. Create PDFService

**Location:** `src/js/services/PDFService.js`

**Responsibilities:**

- Generate PDF with custom settings
- Preview PDF in iframe/object
- Manage PDF configuration
- Handle html2pdf.js library

**Public API:**

```javascript
class PDFService {
  generatePDF(content, config)
  previewPDF(content, config)
  downloadPDF(blob, filename)
  isReady()
}
```

### 2. Update Constants

**Location:** `src/js/config/constants.js`

**Add:**

```javascript
PDF_CONFIG: {
  PAGE_SIZES: {
    A4: { width: 210, height: 297 },
    LETTER: { width: 216, height: 279 },
    LEGAL: { width: 216, height: 356 }
  },
  ORIENTATIONS: {
    PORTRAIT: 'portrait',
    LANDSCAPE: 'landscape'
  },
  DEFAULT_MARGINS: [0.5, 0.5, 0.5, 0.5], // inches: top, right, bottom, left
  FONT_SIZES: {
    MIN: 8,
    MAX: 24,
    DEFAULT: 12,
    STEP: 1
  }
}
```

### 3. PDF Preview Modal UI

**Location:** `index.html`

**Components:**

- PDF preview container (iframe)
- Margin controls (4 inputs)
- Page size selector (A4, Letter, Legal)
- Orientation toggle (Portrait/Landscape)
- Font size controls (+/- buttons, current size display)
- Preview button
- Download button
- Close button

### 4. Update script.js

**Integration Points:**

- Import PDFService
- Initialize PDFService
- Replace current exportPDF() with PDFService
- Handle PDF configuration state
- Open PDF preview modal on "Export PDF" click

### 5. Tests

**Location:** `tests/unit/services/PDFService.test.js`

**Coverage:**

- PDF generation with custom config
- Preview generation
- Config validation
- Error handling
- Default values

---

## 📐 Implementation Steps

### Phase 1: PDFService (30min)

1. Create `src/js/services/PDFService.js`
2. Implement core methods
3. Add JSDoc documentation

### Phase 2: Constants (10min)

1. Update `src/js/config/constants.js`
2. Add PDF configuration constants

### Phase 3: UI Components (30min)

1. Create PDF preview modal in `index.html`
2. Add styling in `style.css`
3. Create configuration controls

### Phase 4: Integration (20min)

1. Import PDFService in `script.js`
2. Replace exportPDF() function
3. Add modal controls logic
4. Handle PDF preview and download

### Phase 5: Testing (20min)

1. Create unit tests for PDFService
2. Test PDF generation
3. Test preview functionality
4. Verify all configurations work

### Phase 6: Documentation (10min)

1. Update README.md with new feature
2. Update ARCHITECTURE.md with PDFService
3. Add usage examples

**Total Estimated Time:** ~2 hours

---

## 🎨 UI Design

### PDF Preview Modal Layout

```
┌─────────────────────────────────────────────┐
│  🎨 PDF Export Settings            [X]      │
├─────────────────────────────────────────────┤
│                                             │
│  ┌───────────────────────────────────┐     │
│  │                                   │     │
│  │      PDF Preview                  │     │
│  │      (iframe)                     │     │
│  │                                   │     │
│  └───────────────────────────────────┘     │
│                                             │
│  📄 Page Settings                           │
│  Size: [A4 ▼]  Orientation: [Portrait ▼]   │
│                                             │
│  📏 Margins (inches)                        │
│  Top: [0.5] Right: [0.5]                   │
│  Bottom: [0.5] Left: [0.5]                 │
│                                             │
│  🔤 Font Size                               │
│  [ - ]  12pt  [ + ]                        │
│                                             │
│  [👁️ Preview]  [💾 Download]              │
└─────────────────────────────────────────────┘
```

---

## ✅ Success Criteria

- [ ] PDF preview works in modal
- [ ] Margin controls adjust PDF layout
- [ ] Page size changes affect PDF dimensions
- [ ] Orientation switch works
- [ ] Font size increase/decrease works
- [ ] Download button saves configured PDF
- [ ] All settings persist in preview
- [ ] Tests cover PDFService
- [ ] Documentation updated
- [ ] Zero technical debt maintained

---

**Ready to implement? Respond to proceed with Phase 1.**
