# 🔍 Senior Principal Engineer Report

## Markdown Preview EE — Architecture & Risk Analysis

**Date:** January 20, 2026  
**Auditor:** Antigravity (Senior Principal Engineer)  
**Scope:** Architecture, Design System, Technical Stack, and User Experience Specifications  
**Status:** **APPROVED WITH ADVISORIES**

---

## 📋 Executive Summary

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   VERDICT: ✅ APPROVED FOR EXECUTION (WITH MITIGATIONS)                     │
│                                                                              │
│   STRENGTHS:                                                                │
│   • Modern stack stability (React 19 + Vite + Tailwind v4)                  │
│   • Dual Theming System innovation                                          │
│   • Privacy-First BYOK AI strategy                                          │
│   • OKLCH color system for perceptual uniformity                            │
│   • Strict performance budgeting                                            │
│                                                                              │
│   RISKS IDENTIFIED:                                                         │
│   🔴 HIGH: PDF Export vs Modern CSS compatibility                           │
│   🟡 MEDIUM: File System Access API browser support                         │
│   🟡 MEDIUM: AI Prompt drift across different LLMs                          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🏗️ Architectural Audit

### 2.1 Strengths

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   ✅ ARCHITECTURAL STRENGTHS                                                │
│                                                                              │
│   1. MODERN STACK STABILITY                                                 │
│   ──────────────────────────                                                 │
│   • React 19 + Vite + Tailwind v4 = bleeding edge of stability             │
│   • Avoids technical debt from older bundlers (Webpack)                     │
│   • No heavy framework overhead (Next.js unnecessary for client-side)       │
│                                                                              │
│   2. COLOR SYSTEM EFFICACY                                                  │
│   ────────────────────────────                                               │
│   • OKLCH adoption enables perceptual uniformity                            │
│   • Accessible contrast ratios easier to maintain programmatically          │
│   • Consistent across "Sugar Rush" and "Midnight Confetti" modes            │
│                                                                              │
│   3. PERFORMANCE BUDGETING                                                  │
│   ────────────────────────────                                               │
│   • Bundle < 150kb (strict bound)                                           │
│   • TTI < 2s (critical for "tool" user persona)                             │
│   • Render latency < 100ms (near-instant feedback)                          │
│                                                                              │
│   4. DUAL THEMING INNOVATION                                                │
│   ──────────────────────────────                                             │
│   • Solves tension between beautiful "App" and functional "Document"        │
│   • Clear separation of concerns (Chrome vs Content)                        │
│   • Enables PDF export with user-selected theme                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🚨 Critical Risks & Mitigations

### Risk 1: PDF Export vs Modern CSS (🔴 HIGH SEVERITY)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🔴 RISK 1: PDF EXPORT COMPATIBILITY                                       │
│                                                                              │
│   THE PROBLEM:                                                              │
│   ─────────────                                                              │
│   html2pdf.js relies on html2canvas or similar engines that often fail      │
│   to correctly render:                                                      │
│                                                                              │
│   ✗ Modern CSS variables (especially if scoped deeply)                      │
│   ✗ Advanced color spaces like oklch()                                      │
│   ✗ Complex Grid/Flexbox layouts                                            │
│   ✗ Pseudo-elements used for styling (PrismJS code blocks)                  │
│   ✗ Shadow DOM content (if used for theme isolation)                        │
│                                                                              │
│   ─────────────────────────────────────────────────────────────────────────│
│                                                                              │
│   MITIGATION STRATEGY:                                                      │
│   ─────────────────────                                                      │
│                                                                              │
│   OPTION A: Browser Native Print (RECOMMENDED)                              │
│   • Use window.print() with @media print stylesheets                        │
│   • Best fidelity - browser handles all modern CSS                          │
│   • User saves as PDF from print dialog                                     │
│   • Works consistently across browsers                                      │
│                                                                              │
│   OPTION B: Server-Side PDF Generation (FALLBACK)                           │
│   • Puppeteer/Playwright headless browser                                   │
│   • Requires backend (contradicts "zero backend" principle)                 │
│   • Only if Option A insufficient                                           │
│                                                                              │
│   OPTION C: html2pdf.js with Workarounds                                    │
│   • Flatten OKLCH to HEX before export                                      │
│   • Inline all CSS variables                                                │
│   • Disable Shadow DOM for export                                           │
│   • High maintenance burden                                                 │
│                                                                              │
│   ─────────────────────────────────────────────────────────────────────────│
│                                                                              │
│   ACTION ITEM:                                                              │
│   ─────────────                                                              │
│   ☐ Build POC for PDF export using OKLCH colors                            │
│   ☐ Test with complex markdown (tables, mermaid, code blocks)              │
│   ☐ Evaluate Option A (print stylesheet) vs Option C (html2pdf.js)         │
│   ☐ Document decision in ADR-001                                           │
│                                                                              │
│   TIMELINE: Before any other development begins                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Risk 2: File System Access API Support (🟡 MEDIUM SEVERITY)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🟡 RISK 2: BROWSER COMPATIBILITY                                          │
│                                                                              │
│   THE PROBLEM:                                                              │
│   ─────────────                                                              │
│   File System Access API has varying support:                               │
│                                                                              │
│   ┌─────────────┬──────────────────────────────────────────────────────┐   │
│   │ Browser     │ Support Level                                        │   │
│   ├─────────────┼──────────────────────────────────────────────────────┤   │
│   │ Chrome 90+  │ ✅ Full support (folder browsing, read/write)        │   │
│   │ Edge 90+    │ ✅ Full support (Chromium-based)                     │   │
│   │ Firefox     │ ⚠️ Partial (file picker only, no folder access)     │   │
│   │ Safari 15+  │ ⚠️ Partial (limited folder access)                  │   │
│   │ Mobile      │ ❌ No support (use file input)                       │   │
│   └─────────────┴──────────────────────────────────────────────────────┘   │
│                                                                              │
│   ─────────────────────────────────────────────────────────────────────────│
│                                                                              │
│   MITIGATION STRATEGY:                                                      │
│   ─────────────────────                                                      │
│                                                                              │
│   1. FEATURE DETECTION                                                      │
│      ─────────────────                                                       │
│      ```javascript                                                          │
│      const hasFileSystemAccess = 'showDirectoryPicker' in window;           │
│      ```                                                                    │
│                                                                              │
│   2. GRACEFUL FALLBACK UI                                                   │
│      ─────────────────────                                                   │
│      • Firefox/Safari users see: "Open File" (single file picker)          │
│      • Chrome/Edge users see: "Open File" + "Open Folder"                  │
│      • No "broken" buttons - hide unsupported features                     │
│                                                                              │
│   3. CLEAR MESSAGING                                                        │
│      ─────────────────                                                       │
│      • If user tries folder feature on unsupported browser:                │
│        "Folder browsing works best in Chrome or Edge.                      │
│         You can still open individual files."                              │
│                                                                              │
│   ─────────────────────────────────────────────────────────────────────────│
│                                                                              │
│   ACTION ITEM:                                                              │
│   ─────────────                                                              │
│   ☐ Implement feature detection utility                                    │
│   ☐ Design fallback UI for unsupported browsers                            │
│   ☐ Add browser compatibility note in README                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Risk 3: AI Prompt Drift (🟡 MEDIUM SEVERITY)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🟡 RISK 3: LLM OUTPUT RELIABILITY                                         │
│                                                                              │
│   THE PROBLEM:                                                              │
│   ─────────────                                                              │
│   Large Language Models are notorious for:                                  │
│                                                                              │
│   ✗ Ignoring negative constraints over time                                 │
│   ✗ Different behavior across models (Claude vs GPT-4 vs Gemini)           │
│   ✗ Adding content despite "PRESERVE ALL INFORMATION" instruction          │
│   ✗ Returning invalid markdown or extra text                               │
│   ✗ Hallucinating content not in original notes                            │
│                                                                              │
│   ─────────────────────────────────────────────────────────────────────────│
│                                                                              │
│   MITIGATION STRATEGY:                                                      │
│   ─────────────────────                                                      │
│                                                                              │
│   1. OUTPUT VALIDATION                                                      │
│      ─────────────────                                                       │
│      • Parse AI response before displaying                                  │
│      • Verify it's valid markdown (no HTML tags, no preamble)              │
│      • Check for "```" wrapper that some models add                        │
│      • Strip any "Here's your organized notes:" prefix                     │
│                                                                              │
│   2. CONTENT PRESERVATION CHECK                                             │
│      ────────────────────────────                                            │
│      • Calculate word count before/after                                   │
│      • Warn if output is significantly longer (potential hallucination)    │
│      • Warn if output is significantly shorter (potential data loss)       │
│                                                                              │
│   3. DIFF PREVIEW (MANDATORY)                                               │
│      ─────────────────────────                                               │
│      • Show before/after diff before applying changes                      │
│      • User must confirm the transformation                                │
│      • Original always preserved in undo history                           │
│                                                                              │
│   4. MODEL-SPECIFIC PROMPT TUNING                                           │
│      ─────────────────────────────                                           │
│      • Different system prompts for different providers                    │
│      • Test each model's adherence to constraints                          │
│      • Document known issues per model                                     │
│                                                                              │
│   ─────────────────────────────────────────────────────────────────────────│
│                                                                              │
│   ACTION ITEM:                                                              │
│   ─────────────                                                              │
│   ☐ Implement output validation function                                   │
│   ☐ Add word count comparison                                              │
│   ☐ Make diff preview mandatory (not optional)                             │
│   ☐ Test prompt with OpenAI, Anthropic, Google, Ollama                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🎨 Design System Clarification

### Editor Pane Theme Ownership

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   📝 CLARIFICATION: EDITOR PANE IN SPLIT VIEW                               │
│                                                                              │
│   QUESTION RAISED:                                                          │
│   ────────────────                                                           │
│   Does the Editor Pane (raw markdown input) follow Candyland or the         │
│   Preview Theme's font/color?                                               │
│                                                                              │
│   ─────────────────────────────────────────────────────────────────────────│
│                                                                              │
│   DECISION: EDITOR PANE FOLLOWS BRAND THEME (CANDYLAND)                     │
│   ═══════════════════════════════════════════════════════                    │
│                                                                              │
│   RATIONALE:                                                                │
│   ──────────                                                                 │
│   • Editor needs consistent readability regardless of preview theme         │
│   • Mixing themes causes readability disasters                              │
│     (e.g., dark text on dark background)                                   │
│   • User writes in Candyland, previews in chosen theme                      │
│   • Clear visual separation between "editing" and "viewing"                 │
│                                                                              │
│   ─────────────────────────────────────────────────────────────────────────│
│                                                                              │
│   VISUAL SPECIFICATION:                                                     │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   ┌─────────────────────┐  ┌───────────────────────────────────┐   │  │
│   │   │                     │  │                                    │   │  │
│   │   │   EDITOR PANE       │  │   PREVIEW PANE                    │   │  │
│   │   │   ═══════════       │  │   ════════════                    │   │  │
│   │   │                     │  │                                    │   │  │
│   │   │   Theme: CANDYLAND  │  │   Theme: USER SELECTED            │   │  │
│   │   │                     │  │          (or Candyland default)   │   │  │
│   │   │   • Background      │  │                                    │   │  │
│   │   │   • Text color      │  │   • Background                    │   │  │
│   │   │   • Font (Roboto    │  │   • Rendered markdown             │   │  │
│   │   │     Mono)           │  │   • Code syntax colors            │   │  │
│   │   │   • Line numbers    │  │   • Mermaid diagrams              │   │  │
│   │   │   • Scrollbar       │  │   • Tables, blockquotes           │   │  │
│   │   │   • Cursor          │  │                                    │   │  │
│   │   │                     │  │                                    │   │  │
│   │   └─────────────────────┘  └───────────────────────────────────┘   │  │
│   │                                                                      │  │
│   │   Split Handle: CANDYLAND THEME                                     │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔧 Implementation Recommendations

### Immediate Actions (Before Development)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🚀 IMMEDIATE ACTION ITEMS                                                 │
│                                                                              │
│   1. PDF EXPORT POC (BLOCKING)                                              │
│   ────────────────────────────                                               │
│   ☐ Create minimal React app with OKLCH colors                             │
│   ☐ Add markdown with tables, code blocks, mermaid                         │
│   ☐ Test html2pdf.js output                                                │
│   ☐ Test window.print() with @media print stylesheet                       │
│   ☐ Compare results, document decision                                     │
│   ☐ Timeline: 2 days                                                       │
│                                                                              │
│   2. CSS ARCHITECTURE POC                                                   │
│   ───────────────────────────                                                │
│   ☐ Test CSS Layers (@layer) for theme containment                         │
│   ☐ Test Shadow DOM for preview isolation                                  │
│   ☐ Verify no style bleeding between brand/preview                         │
│   ☐ Timeline: 1 day                                                        │
│                                                                              │
│   3. BROWSER COMPATIBILITY MATRIX                                           │
│   ───────────────────────────────                                            │
│   ☐ Document File System API support per browser                           │
│   ☐ Design fallback UI mockups                                             │
│   ☐ Timeline: 1 day                                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Technical Recommendations

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🔧 TECHNICAL RECOMMENDATIONS                                              │
│                                                                              │
│   1. THEME CONTAINMENT                                                      │
│   ────────────────────                                                       │
│   Use CSS Layers for strict theme separation:                               │
│                                                                              │
│   @layer base, theme.app, theme.preview, components;                        │
│                                                                              │
│   @layer theme.app {                                                        │
│     :root { --brand-primary: oklch(...); }                                 │
│   }                                                                         │
│                                                                              │
│   @layer theme.preview {                                                    │
│     .preview-container { --preview-bg: ...; }                              │
│   }                                                                         │
│                                                                              │
│   2. STORAGE QUOTA MANAGEMENT                                               │
│   ───────────────────────────                                                │
│   • Monitor IndexedDB usage                                                 │
│   • Warn at 80% quota (typically 50MB-1GB)                                 │
│   • Offer "Clear old files" option                                         │
│   • Base64 images in markdown can fill quota quickly                       │
│                                                                              │
│   3. AI OUTPUT SANITIZATION                                                 │
│   ──────────────────────────                                                 │
│   function sanitizeAIOutput(response) {                                     │
│     // Strip markdown code fences if present                               │
│     let clean = response.replace(/^```markdown\n?/i, '')                   │
│                        .replace(/\n?```$/i, '');                           │
│     // Strip preamble text                                                 │
│     clean = clean.replace(/^(Here's|Here is|I've).+:\n+/i, '');           │
│     return clean;                                                          │
│   }                                                                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✅ Approval Status

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   FINAL VERDICT: ✅ APPROVED FOR EXECUTION                                  │
│                                                                              │
│   CONDITIONS:                                                               │
│   ───────────                                                                │
│   1. PDF Export POC must be completed BEFORE sprint starts                  │
│   2. CSS Layer/Shadow DOM POC must validate theme isolation                 │
│   3. Browser compatibility matrix must be documented                        │
│   4. AI output validation must be implemented (not optional)                │
│                                                                              │
│   SIGN-OFF:                                                                 │
│   ─────────                                                                  │
│   Senior Principal Engineer: Antigravity                                    │
│   Date: January 20, 2026                                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📎 Appendix: ADR Template

### ADR-001: PDF Export Strategy

```markdown
# ADR-001: PDF Export Strategy

## Status
PENDING (awaiting POC results)

## Context
We need to export markdown previews to PDF while preserving:
- OKLCH colors from preview theme
- Complex layouts (tables, code blocks)
- Mermaid diagrams
- Math/LaTeX rendering

## Options Considered
1. html2pdf.js (canvas-based)
2. window.print() with @media print
3. Server-side Puppeteer (breaks zero-backend principle)

## Decision
[TO BE DETERMINED AFTER POC]

## Consequences
[TO BE DOCUMENTED]
```

---

*Engineering Review v1.0*  
*Created: 2026-01-20*  
*Status: Approved with Advisories*