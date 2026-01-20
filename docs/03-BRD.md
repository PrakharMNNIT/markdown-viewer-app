# 📋 Business Requirements Document (BRD)

## Markdown Preview EE — Complete Functional Specification

**Document Type:** Business Requirements Document  
**Version:** 2.0 (POC-Validated)  
**Created:** 2026-01-20  
**Updated:** 2026-01-20  
**Status:** ✅ APPROVED FOR IMPLEMENTATION

---

## 🔬 POC Validation Status

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   📋 POC VALIDATION SUMMARY                                                 │
│                                                                              │
│   All critical architectural risks have been validated through POCs:        │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   ✅ PDF Export Strategy (ADR-001)                                  │  │
│   │   ────────────────────────────────                                   │  │
│   │   Decision: window.print() with @media print stylesheet             │  │
│   │   Validation: poc/pdf-export/index.html                             │  │
│   │   Result: OKLCH colors preserved, zero bundle impact                │  │
│   │                                                                      │  │
│   │   ✅ CSS Architecture (Theme Isolation)                             │  │
│   │   ──────────────────────────────────────                             │  │
│   │   Decision: CSS @layer for brand/preview theme separation           │  │
│   │   Validation: poc/css-architecture/index.html                       │  │
│   │   Result: No style bleeding, specificity wars eliminated            │  │
│   │                                                                      │  │
│   │   ✅ Browser Compatibility Matrix                                   │  │
│   │   ─────────────────────────────────                                  │  │
│   │   Decision: Feature detection + conditional UI                      │  │
│   │   Validation: docs/05-browser-compatibility.md                      │  │
│   │   Result: Graceful degradation for Firefox/Safari                   │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   Engineering Sign-off: Antigravity (Principal Engineer)                    │
│   Date: 2026-01-20                                                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📌 Executive Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   PRODUCT: Markdown Preview EE (Enterprise Edition)                         │
│                                                                              │
│   MISSION: The most beautiful, feature-rich markdown preview tool           │
│            that runs entirely in the browser.                               │
│                                                                              │
│   KEY DIFFERENTIATORS:                                                      │
│   • Zero backend — complete privacy                                         │
│   • Stunning Candyland brand theme                                          │
│   • Multiple preview themes for markdown output                             │
│   • AI-powered note organization (BYOK)                                     │
│   • Local folder browsing                                                   │
│   • Export to PDF with theme preservation                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎯 Product Vision

### Problem Statement

Developers, writers, and students need to preview markdown files, but existing tools are:
- **Ugly** — Cold, corporate, utilitarian interfaces
- **Limited** — Missing mermaid diagrams, math rendering, or advanced features
- **Complicated** — Require installation, accounts, or subscriptions
- **Disconnected** — Can't work with local files easily

### Solution

**Markdown Preview EE** is a browser-based markdown editor that:
- Looks beautiful (Candyland brand theme)
- Works offline
- Offers multiple preview themes
- Supports advanced markdown features
- Requires no account or backend

---

## 🏛️ Architecture: Dual Theming System

### CRITICAL CONCEPT: Two Separate Theme Systems

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🎨 DUAL THEMING ARCHITECTURE                                              │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   THEME TYPE 1: BRAND THEME (Application Chrome)                    │  │
│   │   ══════════════════════════════════════════════                     │  │
│   │                                                                      │  │
│   │   • Controls: Toolbar, Sidebar, Modals, Buttons, Header, Footer     │  │
│   │   • Source: Candyland Design System (brand-theme.md)                │  │
│   │   • Modes: Light ("Sugar Rush") / Dark ("Midnight Confetti")        │  │
│   │   • Scope: ENTIRE APPLICATION EXCEPT PREVIEW AREA                   │  │
│   │   • User Control: Light/Dark toggle only                            │  │
│   │                                                                      │  │
│   │   ─────────────────────────────────────────────────────────────────│  │
│   │                                                                      │  │
│   │   THEME TYPE 2: PREVIEW THEME (Markdown Output)                     │  │
│   │   ═════════════════════════════════════════════                      │  │
│   │                                                                      │  │
│   │   • Controls: ONLY the rendered markdown preview                    │  │
│   │   • Source: User-selectable from theme library                      │  │
│   │   • Options: GitHub, Notion, Bear, iA Writer, Custom, etc.          │  │
│   │   • Scope: PREVIEW PANE ONLY (including in split view)              │  │
│   │   • User Control: Full theme selection                              │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   WHY? Users want:                                                          │
│   • Consistent app experience (always Candyland)                            │
│   • Flexible preview styling (match their documentation needs)              │
│   • PDF export that looks like their chosen preview theme                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Visual Representation

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   ┌─ BRAND THEME (Candyland) ───────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   ┌────────────────────────────────────────────────────────────┐    │  │
│   │   │  🍬 Markdown Preview EE          [☀️/🌙] [⚙️]              │    │  │
│   │   │  ════════════════════════════════════════════════════════  │    │  │
│   │   │                                                             │    │  │
│   │   │   [📁 Open] [💾 Save] [📤 Export] [✨ AI Organize]         │    │  │
│   │   └────────────────────────────────────────────────────────────┘    │  │
│   │                                                                      │  │
│   │   ┌──────────────┐  ┌────────────────────────────────────────┐     │  │
│   │   │              │  │                                         │     │  │
│   │   │   SIDEBAR    │  │   ┌─ PREVIEW THEME (User Selected) ──┐ │     │  │
│   │   │   (Brand)    │  │   │                                   │ │     │  │
│   │   │              │  │   │   # My Document                   │ │     │  │
│   │   │   📂 docs/   │  │   │                                   │ │     │  │
│   │   │     📄 api   │  │   │   This is **bold** text.         │ │     │  │
│   │   │     📄 guide │  │   │                                   │ │     │  │
│   │   │              │  │   │   ```javascript                   │ │     │  │
│   │   │   ─────────  │  │   │   const x = 42;                   │ │     │  │
│   │   │              │  │   │   ```                             │ │     │  │
│   │   │   Theme: ▼   │  │   │                                   │ │     │  │
│   │   │   [GitHub]   │  │   │   > Note: Important!              │ │     │  │
│   │   │              │  │   │                                   │ │     │  │
│   │   │              │  │   └───────────────────────────────────┘ │     │  │
│   │   │              │  │                                         │     │  │
│   │   └──────────────┘  └────────────────────────────────────────┘     │  │
│   │                                                                      │  │
│   └──────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   LEGEND:                                                                   │
│   ═══════                                                                   │
│   Outer box (coral/navy) = Brand Theme (Candyland)                         │
│   Inner preview box (white/dark) = Preview Theme (User-selected)           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📚 Functional Requirements

### FR-1: Core Editor

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   FR-1: MARKDOWN EDITING                                                    │
│   ══════════════════════                                                     │
│                                                                              │
│   FR-1.1  Editor Text Input                                                 │
│   ─────────────────────────                                                  │
│   • Large textarea for markdown input                                       │
│   • Monospace font (Roboto Mono from brand theme)                          │
│   • Syntax highlighting for markdown (optional enhancement)                 │
│   • Line numbers (toggleable)                                               │
│   • Word wrap enabled by default                                            │
│                                                                              │
│   FR-1.2  Real-time Preview                                                 │
│   ────────────────────────                                                   │
│   • Preview updates as user types                                           │
│   • Debounced to 300ms to prevent lag                                       │
│   • Smooth fade transition on content change                                │
│                                                                              │
│   FR-1.3  View Modes                                                        │
│   ───────────────────                                                        │
│   • Editor Only: Full-width editor                                          │
│   • Preview Only: Full-width preview                                        │
│   • Split View: Editor left, Preview right (default)                        │
│   • Adjustable split ratio via drag handle                                  │
│                                                                              │
│   FR-1.4  Auto-Save                                                         │
│   ──────────────────                                                         │
│   • Content saved to localStorage on every change                           │
│   • Visual indicator when saved ("Last saved: X seconds ago")               │
│   • Restore content on page reload                                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### FR-2: Markdown Rendering

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   FR-2: MARKDOWN RENDERING                                                  │
│   ════════════════════════                                                   │
│                                                                              │
│   FR-2.1  Standard Markdown (GFM)                                           │
│   ───────────────────────────────                                            │
│   • Headings (H1-H6)                                                        │
│   • Bold, Italic, Strikethrough                                             │
│   • Ordered and Unordered Lists                                             │
│   • Links and Images                                                        │
│   • Blockquotes                                                             │
│   • Horizontal Rules                                                        │
│   • Inline Code and Code Blocks                                             │
│   • Tables (GFM syntax)                                                     │
│   • Task Lists (checkboxes)                                                 │
│   • Footnotes                                                               │
│   • Autolinks (URLs, emails)                                                │
│                                                                              │
│   FR-2.2  Syntax Highlighting                                               │
│   ────────────────────────────                                               │
│   • Code blocks with language detection                                     │
│   • 100+ languages supported (Prism.js)                                     │
│   • Syntax theme matches Preview Theme                                      │
│   • Copy button on code blocks                                              │
│                                                                              │
│   FR-2.3  Mermaid Diagrams                                                  │
│   ────────────────────────                                                   │
│   • Flowcharts                                                              │
│   • Sequence Diagrams                                                       │
│   • Class Diagrams                                                          │
│   • Entity Relationship Diagrams                                            │
│   • Gantt Charts                                                            │
│   • Pie Charts                                                              │
│   • Git Graphs                                                              │
│   • Diagram theme matches Preview Theme                                     │
│                                                                              │
│   FR-2.4  Math/LaTeX Rendering                                              │
│   ────────────────────────────                                               │
│   • Inline math: $E = mc^2$                                                 │
│   • Block math: $$\sum_{i=1}^{n} x_i$$                                      │
│   • KaTeX rendering (fast, high-quality)                                    │
│   • Font matches Preview Theme where possible                               │
│                                                                              │
│   FR-2.5  HTML Sanitization                                                 │
│   ──────────────────────────                                                 │
│   • All rendered HTML sanitized via DOMPurify                               │
│   • Whitelist approach (safe tags only)                                     │
│   • No script execution                                                     │
│   • No external resource loading without consent                            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### FR-3: Theme System

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   FR-3: THEME SYSTEM                                                        │
│   ══════════════════                                                         │
│                                                                              │
│   FR-3.1  Brand Theme (Application Chrome)                                  │
│   ─────────────────────────────────────────                                  │
│                                                                              │
│   SCOPE: Everything EXCEPT the preview content area                         │
│   ─────────────────────────────────────────────────                          │
│   • Header / Toolbar                                                        │
│   • Sidebar / File Browser                                                  │
│   • Modals / Dialogs                                                        │
│   • Buttons / Inputs                                                        │
│   • Editor area background and chrome                                       │
│   • Footer / Status bar                                                     │
│                                                                              │
│   OPTIONS:                                                                  │
│   • Light Mode: "Sugar Rush" (Candyland Light)                              │
│   • Dark Mode: "Midnight Confetti" (Candyland Dark)                         │
│                                                                              │
│   CONTROL:                                                                  │
│   • Toggle button in header (☀️/🌙 icon)                                    │
│   • Respects system preference on first load                                │
│   • Persisted in localStorage                                               │
│                                                                              │
│   ─────────────────────────────────────────────────────────────────────────│
│                                                                              │
│   FR-3.2  Preview Theme (Markdown Output)                                   │
│   ───────────────────────────────────────                                    │
│                                                                              │
│   SCOPE: ONLY the rendered markdown preview pane                            │
│   ────────────────────────────────────────────────                           │
│   • Markdown prose styling                                                  │
│   • Heading styles                                                          │
│   • Code block syntax theme                                                 │
│   • Table styling                                                           │
│   • Blockquote styling                                                      │
│   • Link colors                                                             │
│   • Mermaid diagram theme                                                   │
│   • Math/LaTeX font styling                                                 │
│                                                                              │
│   AVAILABLE THEMES:                                                         │
│   ┌────────────────┬────────────────────────────────────────────────────┐  │
│   │ Theme Name     │ Description                                        │  │
│   ├────────────────┼────────────────────────────────────────────────────┤  │
│   │ GitHub Light   │ Classic GitHub readme style                        │  │
│   │ GitHub Dark    │ GitHub dark mode                                   │  │
│   │ Notion Light   │ Clean Notion-like styling                          │  │
│   │ Notion Dark    │ Notion dark theme                                  │  │
│   │ iA Writer      │ Minimal, typography-focused                        │  │
│   │ Bear           │ Bear app-inspired warm theme                       │  │
│   │ Dracula        │ Popular dark syntax theme                          │  │
│   │ Solarized      │ Solarized light/dark                               │  │
│   │ Nord           │ Arctic, cool-toned                                 │  │
│   │ One Dark       │ Atom One Dark inspired                             │  │
│   │ Monokai        │ Classic Monokai colors                             │  │
│   │ Candyland      │ Matches brand theme (default)                      │  │
│   └────────────────┴────────────────────────────────────────────────────┘  │
│                                                                              │
│   CONTROL:                                                                  │
│   • Dropdown selector in sidebar or settings                                │
│   • Live preview of theme change                                            │
│   • Persisted in localStorage                                               │
│   • Default: Candyland (matches brand)                                      │
│                                                                              │
│   ─────────────────────────────────────────────────────────────────────────│
│                                                                              │
│   FR-3.3  Theme Isolation                                                   │
│   ───────────────────────                                                    │
│                                                                              │
│   CRITICAL REQUIREMENT:                                                     │
│   Preview theme MUST NOT affect app chrome                                  │
│   App chrome MUST NOT affect preview                                        │
│                                                                              │
│   IMPLEMENTATION:                                                           │
│   • Preview rendered inside isolated container                              │
│   • Preview CSS scoped with unique prefix (.preview-theme-*)               │
│   • Shadow DOM optional for complete isolation                              │
│   • CSS custom properties scoped to preview container                       │
│                                                                              │
│   EXAMPLE:                                                                  │
│   ```css                                                                    │
│   /* Brand Theme (global) */                                                │
│   :root {                                                                   │
│     --brand-primary: oklch(0.8677 0.0735 7.0855);                          │
│     --brand-bg: oklch(0.9809 0.0025 228.7836);                             │
│   }                                                                         │
│                                                                              │
│   /* Preview Theme (scoped) */                                              │
│   .preview-container[data-theme="github-light"] {                           │
│     --preview-bg: #ffffff;                                                  │
│     --preview-text: #24292e;                                                │
│     --preview-heading: #1f2328;                                             │
│     --preview-link: #0969da;                                                │
│   }                                                                         │
│   ```                                                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### FR-4: File Operations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   FR-4: FILE OPERATIONS                                                     │
│   ═════════════════════                                                      │
│                                                                              │
│   FR-4.1  Open Single File                                                  │
│   ────────────────────────                                                   │
│   • File picker dialog (native browser)                                     │
│   • Accept: .md, .markdown, .txt files                                      │
│   • Load content into editor                                                │
│   • Remember file name for save operations                                  │
│                                                                              │
│   FR-4.2  Open Folder                                                       │
│   ───────────────────                                                        │
│   • Folder picker dialog (File System Access API)                           │
│   • Display file tree in sidebar                                            │
│   • Filter to show only markdown files                                      │
│   • Click file to load into editor                                          │
│   • Expand/collapse folders                                                 │
│   • Refresh button to reload folder contents                                │
│                                                                              │
│   FR-4.3  Save File                                                         │
│   ─────────────────                                                          │
│   • If opened from folder: Save to original location                        │
│   • If new file: "Save As" dialog                                           │
│   • Keyboard shortcut: Ctrl/Cmd + S                                         │
│   • Visual confirmation on save                                             │
│                                                                              │
│   FR-4.4  Create New File                                                   │
│   ───────────────────────                                                    │
│   • Clear editor with confirmation if unsaved                               │
│   • Reset file name to "Untitled.md"                                        │
│   • Keyboard shortcut: Ctrl/Cmd + N                                         │
│                                                                              │
│   FR-4.5  Drag & Drop                                                       │
│   ───────────────────                                                        │
│   • Drop .md file onto editor to open                                       │
│   • Visual indicator on drag over                                           │
│   • Support multiple files (open first, ignore rest)                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### FR-5: Export

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   FR-5: EXPORT                                                              │
│   ════════════                                                               │
│                                                                              │
│   FR-5.1  Export to PDF                                                     │
│   ─────────────────────                                                      │
│   • Use native browser print dialog (Ctrl/Cmd + P)                          │
│   • @media print stylesheet ensures perfect formatting                      │
│   • Preserve current preview theme colors (OKLCH supported)                 │
│   • Include mermaid diagrams (SVG scales perfectly)                         │
│   • User manually selects "Save as PDF" in print dialog                     │
│   • Zero bundle size overhead                                               │
│   • Headers/Footers controlled by browser print settings                    │
│                                                                              │
│   FR-5.2  Export to HTML                                                    │
│   ──────────────────────                                                     │
│   • Generate standalone HTML file                                           │
│   • Embed preview theme CSS inline                                          │
│   • Self-contained (no external dependencies)                               │
│   • Preserve styling exactly as preview                                     │
│                                                                              │
│   FR-5.3  Copy HTML                                                         │
│   ────────────────────                                                       │
│   • Copy rendered HTML to clipboard                                         │
│   • Useful for pasting into email/docs                                      │
│   • Toast notification on copy                                              │
│                                                                              │
│   FR-5.4  Copy Markdown                                                     │
│   ────────────────────────                                                   │
│   • Copy raw markdown to clipboard                                          │
│   • Toast notification on copy                                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### FR-6: AI Note Organizer

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   FR-6: AI NOTE ORGANIZER (BYOK)                                            │
│   ══════════════════════════════                                             │
│                                                                              │
│   FR-6.1  API Key Management                                                │
│   ──────────────────────────                                                 │
│   • User provides their own API key                                         │
│   • Supported providers:                                                    │
│     - OpenAI (GPT-4, GPT-4o-mini)                                          │
│     - Anthropic (Claude)                                                    │
│     - Google (Gemini)                                                       │
│     - Local (Ollama)                                                        │
│   • Key stored locally (localStorage, encrypted)                            │
│   • Key NEVER sent to our servers                                           │
│   • Test connection button                                                  │
│                                                                              │
│   FR-6.2  Note Organization                                                 │
│   ──────────────────────────                                                 │
│   • Button: "✨ AI Organize"                                                │
│   • Takes current editor content                                            │
│   • Sends to AI with strict prompt                                          │
│   • Replaces editor content with organized output                           │
│   • Undo available (Ctrl/Cmd + Z)                                           │
│                                                                              │
│   FR-6.3  Strict Prompt (Non-negotiable Rules)                              │
│   ────────────────────────────────────────────                               │
│   • PRESERVE ALL INFORMATION                                                │
│   • ORGANIZE into logical ## headings                                       │
│   • CREATE TABLES for comparisons                                           │
│   • USE BLOCKQUOTES for key insights                                        │
│   • ADD MERMAID DIAGRAMS where relationships exist                          │
│   • USE BULLET POINTS for lists                                             │
│   • WRAP CODE in syntax-highlighted blocks                                  │
│   • FIX TYPOS only (don't change meaning)                                   │
│   • OUTPUT ONLY MARKDOWN                                                    │
│                                                                              │
│   FR-6.4  Customization                                                     │
│   ─────────────────────                                                      │
│   • User can view default prompt                                            │
│   • User can add custom instructions (appended)                             │
│   • Core safety rules cannot be removed                                     │
│                                                                              │
│   FR-6.5  Transparency                                                      │
│   ───────────────────                                                        │
│   • Show "before/after" diff option                                         │
│   • Undo always available                                                   │
│   • Original preserved in undo history                                      │
│   • Loading state with cancel option                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### FR-7: User Settings

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   FR-7: USER SETTINGS                                                       │
│   ═══════════════════                                                        │
│                                                                              │
│   FR-7.1  Appearance Settings                                               │
│   ───────────────────────────                                                │
│   • Brand theme mode (Light/Dark/System)                                    │
│   • Preview theme selection (dropdown)                                      │
│   • Editor font size (12-24px)                                              │
│   • Preview font size (14-20px)                                             │
│   • Show line numbers (toggle)                                              │
│   • Word wrap (toggle)                                                      │
│                                                                              │
│   FR-7.2  Editor Settings                                                   │
│   ───────────────────────                                                    │
│   • Default view mode (Editor/Preview/Split)                                │
│   • Auto-save interval (1s, 2s, 5s, manual)                                 │
│   • Tab size (2, 4 spaces)                                                  │
│   • Render delay (100ms, 200ms, 300ms)                                      │
│                                                                              │
│   FR-7.3  Export Settings                                                   │
│   ───────────────────────                                                    │
│   • Default PDF page size                                                   │
│   • Default PDF margins                                                     │
│   • Include page numbers                                                    │
│   • Include date in header                                                  │
│                                                                              │
│   FR-7.4  AI Settings                                                       │
│   ──────────────────                                                         │
│   • API provider selection                                                  │
│   • API key (masked input)                                                  │
│   • Model selection                                                         │
│   • Custom prompt additions                                                 │
│   • Clear API key button                                                    │
│                                                                              │
│   FR-7.5  Data Settings                                                     │
│   ─────────────────────                                                      │
│   • Clear all saved content                                                 │
│   • Export settings as JSON                                                 │
│   • Import settings from JSON                                               │
│   • Reset to defaults                                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### FR-8: Accessibility

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   FR-8: ACCESSIBILITY                                                       │
│   ═══════════════════                                                        │
│                                                                              │
│   FR-8.1  Keyboard Navigation                                               │
│   ───────────────────────────                                                │
│   • All interactive elements focusable                                      │
│   • Logical tab order                                                       │
│   • Visible focus indicators (Candyland ring color)                         │
│   • Keyboard shortcuts for common actions                                   │
│                                                                              │
│   Shortcuts:                                                                │
│   • Ctrl/Cmd + S: Save                                                      │
│   • Ctrl/Cmd + O: Open file                                                 │
│   • Ctrl/Cmd + N: New file                                                  │
│   • Ctrl/Cmd + E: Toggle view mode                                          │
│   • Ctrl/Cmd + P: Export PDF                                                │
│   • Ctrl/Cmd + Shift + D: Toggle dark mode                                  │
│   • Escape: Close modal                                                     │
│                                                                              │
│   FR-8.2  Screen Reader Support                                             │
│   ─────────────────────────────                                              │
│   • Semantic HTML (header, main, nav, aside)                                │
│   • ARIA labels on all controls                                             │
│   • ARIA live regions for dynamic content                                   │
│   • Alt text for images                                                     │
│   • Descriptive button labels                                               │
│                                                                              │
│   FR-8.3  Visual Accessibility                                              │
│   ────────────────────────────                                               │
│   • Color contrast ratio ≥ 4.5:1 (text)                                     │
│   • Color contrast ratio ≥ 3:1 (UI components)                              │
│   • No information conveyed by color alone                                  │
│   • Resizable text (browser zoom support)                                   │
│   • Reduced motion support (prefers-reduced-motion)                         │
│                                                                              │
│   FR-8.4  WCAG Compliance                                                   │
│   ───────────────────────                                                    │
│   • Target: WCAG 2.1 Level AA                                               │
│   • Automated testing with axe-core                                         │
│   • Manual testing with screen readers                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Non-Functional Requirements

### NFR-1: Performance

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   NFR-1: PERFORMANCE                                                        │
│   ══════════════════                                                         │
│                                                                              │
│   NFR-1.1  Load Time                                                        │
│   ──────────────────                                                         │
│   • First Contentful Paint: < 1.0s                                          │
│   • Largest Contentful Paint: < 1.5s                                        │
│   • Time to Interactive: < 2.0s                                             │
│                                                                              │
│   NFR-1.2  Render Performance                                               │
│   ───────────────────────────                                                │
│   • Typing → Preview update: < 100ms perceived                              │
│   • Mermaid diagram render: < 500ms                                         │
│   • PDF export: < 3s for typical document                                   │
│                                                                              │
│   NFR-1.3  Bundle Size                                                      │
│   ────────────────────                                                       │
│   • Initial bundle: < 100kb gzipped                                         │
│   • Total with lazy-loaded: < 250kb gzipped                                 │
│   • Code splitting for Mermaid, KaTeX, Prism                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### NFR-2: Reliability

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   NFR-2: RELIABILITY                                                        │
│   ══════════════════                                                         │
│                                                                              │
│   NFR-2.1  Offline Support                                                  │
│   ────────────────────────                                                   │
│   • App works without internet connection                                   │
│   • Service worker caches all assets                                        │
│   • Clear offline indicator when disconnected                               │
│                                                                              │
│   NFR-2.2  Data Persistence                                                 │
│   ──────────────────────────                                                 │
│   • No data loss on browser crash                                           │
│   • Auto-save every 2 seconds                                               │
│   • IndexedDB for large file storage                                        │
│                                                                              │
│   NFR-2.3  Error Handling                                                   │
│   ────────────────────────                                                   │
│   • Graceful degradation on feature failure                                 │
│   • User-friendly error messages                                            │
│   • Console logging for debugging                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### NFR-3: Security

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   NFR-3: SECURITY                                                           │
│   ═══════════════                                                            │
│                                                                              │
│   NFR-3.1  HTML Sanitization                                                │
│   ──────────────────────────                                                 │
│   • DOMPurify on ALL rendered content                                       │
│   • No script execution from markdown                                       │
│   • Whitelist approach for HTML tags                                        │
│                                                                              │
│   NFR-3.2  API Key Security                                                 │
│   ──────────────────────────                                                 │
│   • Keys stored encrypted in localStorage                                   │
│   • Keys never transmitted to our servers                                   │
│   • Direct browser → AI provider communication                              │
│                                                                              │
│   NFR-3.3  Content Security Policy                                          │
│   ──────────────────────────────                                             │
│   • Strict CSP headers in production                                        │
│   • No inline scripts                                                       │
│   • Limited external resource loading                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### NFR-4: Compatibility

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   NFR-4: COMPATIBILITY                                                      │
│   ════════════════════                                                       │
│                                                                              │
│   NFR-4.1  Browser Support                                                  │
│   ────────────────────────                                                   │
│   • Chrome 90+ (full support)                                               │
│   • Firefox 90+ (full support)                                              │
│   • Safari 15+ (full support)                                               │
│   • Edge 90+ (full support)                                                 │
│   • Mobile browsers (responsive, touch-friendly)                            │
│                                                                              │
│   NFR-4.2  File System Access                                               │
│   ───────────────────────────                                                │
│   • Chrome/Edge: Full File System Access API                                │
│   • Firefox/Safari: Fallback to file input/download                         │
│   • Graceful degradation for unsupported APIs                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📊 Feature Priority Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🎯 FEATURE PRIORITY                                                       │
│                                                                              │
│   ┌────────────────────────────────────────────────────────────────────┐   │
│   │                                                                     │   │
│   │   P0 — MUST HAVE (MVP)                                             │   │
│   │   ════════════════════                                              │   │
│   │   ☐ Markdown editor with live preview                              │   │
│   │   ☐ Brand theme (Light/Dark Candyland)                             │   │
│   │   ☐ Auto-save to localStorage                                      │   │
│   │   ☐ GFM rendering (tables, task lists, etc.)                       │   │
│   │   ☐ Syntax highlighting (Prism.js)                                 │   │
│   │   ☐ View modes (Editor/Preview/Split)                              │   │
│   │                                                                     │   │
│   │   P1 — SHOULD HAVE (v1.0)                                          │   │
│   │   ═════════════════════════                                         │   │
│   │   ☐ Preview themes (GitHub, Notion, etc.)                          │   │
│   │   ☐ Mermaid diagrams                                               │   │
│   │   ☐ Math/LaTeX rendering (KaTeX)                                   │   │
│   │   ☐ PDF export with theme                                          │   │
│   │   ☐ Open file / Save file                                          │   │
│   │   ☐ Open folder (File System Access API)                           │   │
│   │                                                                     │   │
│   │   P2 — NICE TO HAVE (v1.x)                                         │   │
│   │   ═════════════════════════                                         │   │
│   │   ☐ AI Note Organizer (BYOK)                                       │   │
│   │   ☐ HTML export                                                    │   │
│   │   ☐ Custom themes                                                  │   │
│   │   ☐ Keyboard shortcuts                                             │   │
│   │   ☐ Settings modal                                                 │   │
│   │   ☐ Drag & drop files                                              │   │
│   │                                                                     │   │
│   │   P3 — FUTURE (v2.0+)                                              │   │
│   │   ═══════════════════                                               │   │
│   │   ☐ Sync scroll (editor ↔ preview)                                 │   │
│   │   ☐ Zen mode (distraction-free)                                    │   │
│   │   ☐ Multiple tabs                                                  │   │
│   │   ☐ Version history                                                │   │
│   │   ☐ Collaborative editing                                          │   │
│   │                                                                     │   │
│   └────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 Summary

### Key Requirements Summary

| Category | Requirement | Priority |
|----------|-------------|----------|
| **Editor** | Markdown input with live preview | P0 |
| **Brand Theme** | Candyland Light/Dark (app chrome) | P0 |
| **Preview Theme** | Multiple selectable themes (preview only) | P1 |
| **Rendering** | GFM, Mermaid, Math, Syntax Highlighting | P0-P1 |
| **Files** | Open, Save, Folder Browse | P1 |
| **Export** | PDF with preview theme | P1 |
| **AI** | Note Organizer (BYOK) | P2 |
| **Settings** | User preferences | P2 |
| **Accessibility** | WCAG 2.1 AA | P1 |

### Theme System Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   DUAL THEME ARCHITECTURE                                                   │
│   ════════════════════════                                                   │
│                                                                              │
│   BRAND THEME (Candyland)          │  PREVIEW THEME (User Choice)           │
│   ───────────────────────          │  ─────────────────────────             │
│   • Header, Toolbar                │  • Rendered markdown                    │
│   • Sidebar, Modals                │  • Code syntax colors                   │
│   • Buttons, Inputs                │  • Mermaid diagram colors               │
│   • Editor chrome                  │  • Table styling                        │
│   • Status bar                     │  • Blockquote styling                   │
│   ───────────────────────          │  ─────────────────────────             │
│   Options: Light / Dark            │  Options: GitHub, Notion, Bear,        │
│                                    │           Dracula, Nord, etc.          │
│   ───────────────────────          │  ─────────────────────────             │
│   Scope: App shell                 │  Scope: Preview pane ONLY              │
│                                                                              │
│   PDF EXPORT: Uses PREVIEW THEME (not brand theme)                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 Theme Behavior Matrix

### Complete Theme Cascade Logic

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🎨 THEME BEHAVIOR: COMPLETE SPECIFICATION                                 │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   SCENARIO 1: LIGHT MODE + NO PREVIEW THEME SELECTED                │  │
│   │   ══════════════════════════════════════════════════                 │  │
│   │                                                                      │  │
│   │   Brand Theme: Candyland Light ("Sugar Rush")                       │  │
│   │   Preview Theme: Candyland Light (DEFAULT FALLBACK)                 │  │
│   │                                                                      │  │
│   │   Result: Entire app uses Candyland Light consistently              │  │
│   │                                                                      │  │
│   │   ─────────────────────────────────────────────────────────────────│  │
│   │                                                                      │  │
│   │   SCENARIO 2: LIGHT MODE + PREVIEW THEME SELECTED (e.g., GitHub)    │  │
│   │   ══════════════════════════════════════════════════════════════════│  │
│   │                                                                      │  │
│   │   Brand Theme: Candyland Light ("Sugar Rush")                       │  │
│   │   Preview Theme: GitHub Light                                       │  │
│   │                                                                      │  │
│   │   Result:                                                           │  │
│   │   • App chrome (toolbar, sidebar, modals) = Candyland Light         │  │
│   │   • Markdown preview pane = GitHub Light                            │  │
│   │   • Split view preview = GitHub Light                               │  │
│   │   • Full preview mode = GitHub Light                                │  │
│   │                                                                      │  │
│   │   ─────────────────────────────────────────────────────────────────│  │
│   │                                                                      │  │
│   │   SCENARIO 3: DARK MODE + NO PREVIEW THEME SELECTED                 │  │
│   │   ═══════════════════════════════════════════════════                │  │
│   │                                                                      │  │
│   │   Brand Theme: Candyland Dark ("Midnight Confetti")                 │  │
│   │   Preview Theme: Candyland Dark (DEFAULT FALLBACK)                  │  │
│   │                                                                      │  │
│   │   Result: Entire app uses Candyland Dark consistently               │  │
│   │                                                                      │  │
│   │   ─────────────────────────────────────────────────────────────────│  │
│   │                                                                      │  │
│   │   SCENARIO 4: DARK MODE + PREVIEW THEME SELECTED (e.g., Dracula)    │  │
│   │   ═══════════════════════════════════════════════════════════════════│  │
│   │                                                                      │  │
│   │   Brand Theme: Candyland Dark ("Midnight Confetti")                 │  │
│   │   Preview Theme: Dracula                                            │  │
│   │                                                                      │  │
│   │   Result:                                                           │  │
│   │   • App chrome (toolbar, sidebar, modals) = Candyland Dark          │  │
│   │   • Markdown preview pane = Dracula                                 │  │
│   │   • Split view preview = Dracula                                    │  │
│   │   • Full preview mode = Dracula                                     │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Element-by-Element Theme Ownership

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   📋 WHAT IS GOVERNED BY WHICH THEME?                                       │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   🏠 BRAND THEME (Candyland Light/Dark) GOVERNS:                    │  │
│   │   ══════════════════════════════════════════════                     │  │
│   │                                                                      │  │
│   │   APPLICATION CHROME:                                               │  │
│   │   ☑ Header / Navigation bar                                         │  │
│   │   ☑ Toolbar (Open, Save, Export, AI Organize buttons)               │  │
│   │   ☑ Sidebar / File browser panel                                    │  │
│   │   ☑ Footer / Status bar                                             │  │
│   │   ☑ View mode toggle buttons                                        │  │
│   │   ☑ Theme selector dropdown (the control itself)                    │  │
│   │                                                                      │  │
│   │   EDITOR AREA:                                                      │  │
│   │   ☑ Editor background                                               │  │
│   │   ☑ Editor text (raw markdown)                                      │  │
│   │   ☑ Line numbers                                                    │  │
│   │   ☑ Editor scrollbar styling                                        │  │
│   │   ☑ Split handle / Resizer                                          │  │
│   │                                                                      │  │
│   │   MODALS & DIALOGS:                                                 │  │
│   │   ☑ PDF Export modal                                                │  │
│   │   ☑ HTML Export modal                                               │  │
│   │   ☑ Settings modal                                                  │  │
│   │   ☑ AI Note Organizer modal                                         │  │
│   │   ☑ Open Folder confirmation                                        │  │
│   │   ☑ Unsaved changes warning                                         │  │
│   │   ☑ All alert boxes / Toast notifications                           │  │
│   │   ☑ API key input modal                                             │  │
│   │   ☑ Keyboard shortcuts help                                         │  │
│   │                                                                      │  │
│   │   FORM ELEMENTS:                                                    │  │
│   │   ☑ All buttons (primary, secondary, ghost)                         │  │
│   │   ☑ All input fields                                                │  │
│   │   ☑ All dropdowns / selects                                         │  │
│   │   ☑ All checkboxes / toggles                                        │  │
│   │   ☑ All radio buttons                                               │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   📄 PREVIEW THEME (User Selected) GOVERNS:                         │  │
│   │   ═════════════════════════════════════════                          │  │
│   │                                                                      │  │
│   │   MARKDOWN PREVIEW CONTENT ONLY:                                    │  │
│   │   ☑ Preview pane background                                         │  │
│   │   ☑ Rendered markdown text                                          │  │
│   │   ☑ Heading styles (H1-H6)                                          │  │
│   │   ☑ Paragraph text                                                  │  │
│   │   ☑ Bold, italic, strikethrough styling                             │  │
│   │   ☑ Link colors                                                     │  │
│   │   ☑ Blockquote styling                                              │  │
│   │   ☑ List bullet/number colors                                       │  │
│   │   ☑ Horizontal rule styling                                         │  │
│   │                                                                      │  │
│   │   CODE BLOCKS:                                                      │  │
│   │   ☑ Code block background                                           │  │
│   │   ☑ Syntax highlighting colors                                      │  │
│   │   ☑ Inline code styling                                             │  │
│   │   ☑ Copy button styling (inside preview)                            │  │
│   │                                                                      │  │
│   │   TABLES:                                                           │  │
│   │   ☑ Table borders                                                   │  │
│   │   ☑ Table header background                                         │  │
│   │   ☑ Table row striping                                              │  │
│   │   ☑ Table cell padding                                              │  │
│   │                                                                      │  │
│   │   DIAGRAMS & MATH:                                                  │  │
│   │   ☑ Mermaid diagram colors                                          │  │
│   │   ☑ KaTeX / Math rendering colors                                   │  │
│   │   ☑ Chart colors (if applicable)                                    │  │
│   │                                                                      │  │
│   │   APPLIES TO:                                                       │  │
│   │   ☑ Split view preview pane                                         │  │
│   │   ☑ Full preview mode                                               │  │
│   │   ☑ PDF export output                                               │  │
│   │   ☑ HTML export output                                              │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Default/Fallback Behavior

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🔄 FALLBACK LOGIC                                                         │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   IF preview theme NOT explicitly selected:                         │  │
│   │   ─────────────────────────────────────────                          │  │
│   │   → Use Candyland theme matching current brand mode                 │  │
│   │                                                                      │  │
│   │   Brand Mode: Light → Preview Default: Candyland Light              │  │
│   │   Brand Mode: Dark  → Preview Default: Candyland Dark               │  │
│   │                                                                      │  │
│   │   This ensures visual consistency when user hasn't made a choice.   │  │
│   │                                                                      │  │
│   │   ─────────────────────────────────────────────────────────────────│  │
│   │                                                                      │  │
│   │   IF preview theme IS explicitly selected:                          │  │
│   │   ────────────────────────────────────────                           │  │
│   │   → Use selected theme REGARDLESS of brand mode                     │  │
│   │                                                                      │  │
│   │   Example: Brand Dark + Preview "GitHub Light" = valid combo        │  │
│   │   Example: Brand Light + Preview "Dracula" = valid combo            │  │
│   │                                                                      │  │
│   │   User may want dark app chrome but light preview for printing.     │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Visual State Matrix

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   📊 THEME STATE MATRIX                                                     │
│                                                                              │
│   ┌──────────────┬──────────────┬──────────────┬──────────────────────┐    │
│   │ Brand Mode   │ Preview Set? │ Preview      │ Result               │    │
│   ├──────────────┼──────────────┼──────────────┼──────────────────────┤    │
│   │ Light        │ No           │ (default)    │ Candyland Light ALL  │    │
│   │ Light        │ Yes: GitHub  │ GitHub Light │ Split: CL + GH       │    │
│   │ Light        │ Yes: Dracula │ Dracula      │ Split: CL + DR       │    │
│   │ Light        │ Yes: Nord    │ Nord         │ Split: CL + ND       │    │
│   ├──────────────┼──────────────┼──────────────┼──────────────────────┤    │
│   │ Dark         │ No           │ (default)    │ Candyland Dark ALL   │    │
│   │ Dark         │ Yes: GitHub  │ GitHub Dark  │ Split: CD + GHD      │    │
│   │ Dark         │ Yes: Notion  │ Notion Light │ Split: CD + NL       │    │
│   │ Dark         │ Yes: One Dark│ One Dark     │ Split: CD + OD       │    │
│   └──────────────┴──────────────┴──────────────┴──────────────────────┘    │
│                                                                              │
│   Legend: CL = Candyland Light, CD = Candyland Dark                         │
│           GH = GitHub, DR = Dracula, ND = Nord, etc.                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✅ Approval

| Role | Name | Date | Signature |
|------|------|------|-----------|
| Product Owner | | | |
| Tech Lead | | | |
| UX Lead | | | |
| QA Lead | | | |

---

---

## 🛠️ Implementation-Ready Specifications

### CSS Architecture (POC-Validated)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🎨 CSS LAYER ARCHITECTURE (VALIDATED)                                     │
│                                                                              │
│   Layer order (lowest to highest priority):                                 │
│                                                                              │
│   @layer base, theme.app, theme.preview, components, utilities;             │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   @layer base                                                       │  │
│   │   ────────────                                                       │  │
│   │   • CSS reset, typography defaults                                  │  │
│   │   • No colors, just structure                                       │  │
│   │                                                                      │  │
│   │   @layer theme.app                                                  │  │
│   │   ─────────────────                                                  │  │
│   │   • Candyland brand colors (OKLCH)                                  │  │
│   │   • App chrome: header, toolbar, sidebar, modals                    │  │
│   │   • Light/Dark mode variants via :root.dark                         │  │
│   │                                                                      │  │
│   │   @layer theme.preview                                              │  │
│   │   ─────────────────────                                              │  │
│   │   • Preview-only styles scoped to .preview-container                │  │
│   │   • Theme variants via [data-theme="github-light"]                  │  │
│   │   • Cannot affect app chrome                                        │  │
│   │                                                                      │  │
│   │   @layer components                                                 │  │
│   │   ─────────────────                                                  │  │
│   │   • UI components (buttons, inputs, cards)                          │  │
│   │   • Uses brand theme variables                                      │  │
│   │                                                                      │  │
│   │   @layer utilities                                                  │  │
│   │   ────────────────                                                   │  │
│   │   • Tailwind utilities                                              │  │
│   │   • Override helpers (.hidden, .flex, etc.)                         │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
│   BENEFIT: Eliminates specificity wars between themes                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### PDF Export Implementation (ADR-001)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   📄 PDF EXPORT STRATEGY (DECIDED)                                          │
│                                                                              │
│   Method: window.print() + @media print stylesheet                          │
│                                                                              │
│   WHY THIS APPROACH:                                                        │
│   ──────────────────                                                         │
│   • ✅ Perfect OKLCH color fidelity (browser native)                        │
│   • ✅ Zero bundle size impact                                              │
│   • ✅ Works offline                                                        │
│   • ✅ Mermaid SVGs scale perfectly                                         │
│   • ✅ KaTeX math renders correctly                                         │
│   • ✅ All preview themes supported                                         │
│                                                                              │
│   TRADE-OFF ACCEPTED:                                                       │
│   ────────────────────                                                       │
│   User must click "Save as PDF" in print dialog                             │
│   → Mitigated with clear in-app guidance                                    │
│                                                                              │
│   ALTERNATIVES REJECTED:                                                    │
│   ──────────────────────                                                     │
│   • html2pdf.js: Poor OKLCH support, +200kb bundle                         │
│   • Server-side: Violates zero-backend principle                            │
│   • jsPDF direct: No CSS support                                            │
│                                                                              │
│   PRINT STYLESHEET:                                                         │
│   ─────────────────                                                          │
│   @media print {                                                            │
│     .app-chrome { display: none; }                                          │
│     .preview-container { padding: 1cm; }                                    │
│     * { print-color-adjust: exact; }                                        │
│   }                                                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Browser Compatibility Strategy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🌐 BROWSER SUPPORT MATRIX                                                 │
│                                                                              │
│   ┌──────────────┬────────┬────────┬────────┬────────┬─────────┐           │
│   │ Feature      │ Chrome │ Edge   │ Firefox│ Safari │ Mobile  │           │
│   ├──────────────┼────────┼────────┼────────┼────────┼─────────┤           │
│   │ Core App     │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   │ OKLCH Colors │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   │ CSS Layers   │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   │ Open Folder  │ ✅     │ ✅     │ ❌     │ ❌     │ ❌      │           │
│   │ Save File    │ ✅     │ ✅     │ ⚠️     │ ⚠️     │ ⚠️      │           │
│   │ PDF Export   │ ✅     │ ✅     │ ✅     │ ✅     │ ✅      │           │
│   └──────────────┴────────┴────────┴────────┴────────┴─────────┘           │
│                                                                              │
│   FALLBACK STRATEGY:                                                        │
│   ──────────────────                                                         │
│   • Firefox/Safari: Hide "Open Folder" button                               │
│   • Firefox/Safari: "Save" becomes "Download"                               │
│   • Mobile: Single-pane view, touch-optimized                               │
│   • Feature detection before showing UI                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✅ Final Approval

| Role | Name | Date | Status |
|------|------|------|--------|
| Principal Engineer | Antigravity | 2026-01-20 | ✅ APPROVED |
| Product Owner | | | Pending |
| Tech Lead | | | Pending |
| UX Lead | | | Pending |

---

## 📚 Related Documents

| Document | Description | Status |
|----------|-------------|--------|
| `docs/brand-theme.md` | Candyland Design System | ✅ Complete |
| `docs/01-userJourney.md` | User Personas & Journeys | ✅ Complete |
| `docs/02-techStack.md` | Technology Stack | ✅ Complete |
| `docs/04-engineering-review.md` | Architecture Audit | ✅ Complete |
| `docs/05-browser-compatibility.md` | Browser Support Matrix | ✅ Complete |
| `docs/06-system-architecture.md` | System Architecture | ✅ Complete |
| `docs/adr/ADR-001-pdf-export-strategy.md` | PDF Export Decision | ✅ Decided |
| `poc/pdf-export/index.html` | PDF Export POC | ✅ Validated |
| `poc/css-architecture/index.html` | CSS Architecture POC | ✅ Validated |

---

*Business Requirements Document v2.0 (POC-Validated)*  
*Created: 2026-01-20*  
*Updated: 2026-01-20*  
*Status: ✅ APPROVED FOR IMPLEMENTATION*