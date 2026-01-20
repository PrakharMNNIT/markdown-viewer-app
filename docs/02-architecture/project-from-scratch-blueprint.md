# 🏗️ Markdown Viewer Pro: From Scratch Blueprint

## A Principal Engineer's Complete Project Architecture

**Document Type:** Greenfield Project Planning  
**Audience:** Technical Leadership, Design Team, Development Team  
**Created:** 2026-01-20

---

## 📋 Table of Contents

1. [Discovery Phase](#1-discovery-phase)
2. [User Journey Mapping](#2-user-journey-mapping)
3. [Tech Stack Selection](#3-tech-stack-selection)
4. [High-Level Design (HLD)](#4-high-level-design-hld)
5. [Design Language & Brand System](#5-design-language--brand-system)
6. [Low-Level Design (LLD)](#6-low-level-design-lld)
7. [Implementation Phases](#7-implementation-phases)
8. [Quality Gates](#8-quality-gates)

---

## 1. Discovery Phase

### 1.1 Problem Statement

> "Developers and writers need a fast, offline-capable markdown editor with real-time preview, syntax highlighting, and professional export capabilities."

### 1.2 Core Questions to Answer

| Question | Answer |
|----------|--------|
| Who is the user? | Developers, technical writers, students, bloggers |
| Where do they use it? | Desktop browser (primary), tablet (secondary) |
| What's their context? | Writing documentation, notes, blog posts |
| What do they have now? | VS Code (heavy), online editors (no offline), basic text editors (no preview) |
| What's the pain? | Context switching, no offline, slow, ugly, no folder browsing |
| What's the win? | Single-purpose tool, fast, beautiful, works anywhere |

### 1.3 Success Metrics (Define BEFORE Building)

| Metric | Target | Measurement |
|--------|--------|-------------|
| Time to First Render | < 1.5s | Lighthouse |
| Time to Interactive | < 2.5s | Lighthouse |
| Largest Contentful Paint | < 2.0s | Core Web Vitals |
| Export Success Rate | > 99% | Error tracking |
| User Return Rate | > 40% (7-day) | Analytics |
| NPS Score | > 50 | Survey |

---

## 2. User Journey Mapping

### 2.1 Primary Personas

```
┌─────────────────────────────────────────────────────────────────┐
│ PERSONA 1: "Dev Diana"                                          │
│ Role: Senior Developer                                          │
│ Context: Writing README, documentation, ADRs                    │
│ Needs: Fast preview, code blocks, mermaid diagrams, export      │
│ Pain: VS Code is overkill, online editors are slow              │
│ Goal: "Write docs without leaving my flow"                      │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PERSONA 2: "Writer Will"                                        │
│ Role: Technical Blogger                                         │
│ Context: Writing blog posts, tutorials                          │
│ Needs: Beautiful preview, themes, PDF export, zen mode          │
│ Pain: Online editors lose work, offline apps are ugly           │
│ Goal: "See how my post will look while writing"                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PERSONA 3: "Student Sam"                                        │
│ Role: CS Student                                                │
│ Context: Taking notes, math formulas, code snippets             │
│ Needs: LaTeX support, folder organization, quick access         │
│ Pain: Notion is online-only, local files are scattered          │
│ Goal: "All my notes in one place, beautifully rendered"         │
└─────────────────────────────────────────────────────────────────┘
```

### 2.2 User Journey: Happy Path

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           USER JOURNEY MAP                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  DISCOVERY          FIRST USE           CORE LOOP           RETENTION       │
│  ─────────          ─────────           ─────────           ─────────       │
│                                                                              │
│  ┌─────────┐       ┌─────────┐        ┌─────────┐        ┌─────────┐       │
│  │ Finds   │──────▶│ Lands   │───────▶│ Types   │───────▶│ Returns │       │
│  │ via     │       │ on app  │        │ markdown│        │ daily   │       │
│  │ search  │       │         │        │         │        │         │       │
│  └─────────┘       └─────────┘        └─────────┘        └─────────┘       │
│       │                 │                  │                  │             │
│       ▼                 ▼                  ▼                  ▼             │
│  "I need a         "Wow, this         "This just         "My go-to        │
│   markdown          looks nice"        works"             tool"            │
│   editor"                                                                   │
│                                                                              │
│  EMOTION:          EMOTION:           EMOTION:           EMOTION:          │
│  Frustrated        Curious/Hopeful    Satisfied          Loyal             │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │ KEY MOMENTS:                                                         │   │
│  │ 1. First impression (< 3 seconds to form opinion)                   │   │
│  │ 2. First successful render (validation)                             │   │
│  │ 3. First export (utility proven)                                    │   │
│  │ 4. First return visit (habit formed)                                │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 2.3 Feature Priority Matrix

| Feature | User Value | Complexity | Priority |
|---------|------------|------------|----------|
| Real-time preview | 🔥🔥🔥🔥🔥 | Low | P0 |
| Syntax highlighting | 🔥🔥🔥🔥 | Medium | P0 |
| Theme switching | 🔥🔥🔥 | Low | P0 |
| Folder browsing | 🔥🔥🔥🔥 | High | P1 |
| PDF export | 🔥🔥🔥 | High | P1 |
| Mermaid diagrams | 🔥🔥🔥 | Medium | P1 |
| LaTeX math | 🔥🔥🔥 | Medium | P1 |
| Zen mode | 🔥🔥 | Low | P2 |
| Sync scroll | 🔥🔥 | Medium | P2 |
| Custom themes | 🔥 | Medium | P3 |

---

## 3. Tech Stack Selection

### 3.1 Decision Framework

```
┌─────────────────────────────────────────────────────────────────┐
│                    TECH STACK DECISION TREE                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Q1: Does this app need SEO?                                    │
│      └── NO → Skip SSR frameworks (Next.js, Nuxt)               │
│                                                                  │
│  Q2: Does this app need a backend?                              │
│      └── NO → Skip backend services (Supabase, Firebase)        │
│                                                                  │
│  Q3: Does this app need offline capability?                     │
│      └── YES → PWA + Local storage + File System API            │
│                                                                  │
│  Q4: What's the team size?                                      │
│      └── SMALL → Keep stack simple, fewer abstractions          │
│                                                                  │
│  Q5: What's the expected lifespan?                              │
│      └── LONG → Choose stable, boring technology                │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### 3.2 Recommended Stack

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         TECH STACK: MARKDOWN VIEWER PRO                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  LAYER           TECHNOLOGY              RATIONALE                          │
│  ─────           ──────────              ─────────                          │
│                                                                              │
│  ┌────────────────────────────────────────────────────────────────────┐    │
│  │ BUILD          Vite 5                 Fast HMR, modern defaults     │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ LANGUAGE       TypeScript 5.3         Type safety, refactor safe    │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ UI FRAMEWORK   React 18 (optional)    If component complexity grows │    │
│  │                OR Vanilla JS          Simpler, faster, less bloat   │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ STYLING        Tailwind CSS 3         Utility-first, design system  │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ MARKDOWN       marked.js              Battle-tested, extensible     │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ SYNTAX HL      Prism.js               Lightweight, many languages   │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ DIAGRAMS       Mermaid.js             Standard, well-maintained     │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ MATH           KaTeX                  Faster than MathJax           │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ PDF            html2pdf.js            Client-side, no server needed │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ SANITIZE       DOMPurify              XSS protection                │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ TESTING        Vitest + Playwright    Unit + E2E coverage           │    │
│  ├────────────────────────────────────────────────────────────────────┤    │
│  │ DEPLOY         Vercel / Netlify       Static hosting, free tier     │    │
│  └────────────────────────────────────────────────────────────────────┘    │
│                                                                              │
│  DELIBERATELY EXCLUDED:                                                      │
│  ─────────────────────                                                       │
│  • Next.js (no SSR needed)                                                  │
│  • Redux/Zustand (state is simple)                                          │
│  • Supabase/Firebase (no backend)                                           │
│  • Aceternity/Magic UI (trend-chasing)                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.3 Dependency Budget

| Category | Max Dependencies | Rationale |
|----------|------------------|-----------|
| Core (marked, prism, katex) | 5 | Essential features |
| Build (vite, typescript) | 3 | Development needs |
| Styling (tailwind, postcss) | 2 | Design system |
| Testing (vitest, playwright) | 3 | Quality assurance |
| Utilities (dompurify, etc) | 3 | Security, helpers |
| **TOTAL** | **16** | Keep it lean |

---

## 4. High-Level Design (HLD)

### 4.1 System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         HIGH-LEVEL ARCHITECTURE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         BROWSER (Client-Side Only)                   │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐          │   │
│  │  │    Editor    │───▶│   Renderer   │───▶│   Preview    │          │   │
│  │  │  (textarea)  │    │   (marked)   │    │   (DOM)      │          │   │
│  │  └──────────────┘    └──────────────┘    └──────────────┘          │   │
│  │         │                   │                   │                   │   │
│  │         ▼                   ▼                   ▼                   │   │
│  │  ┌──────────────────────────────────────────────────────┐          │   │
│  │  │                    Services Layer                     │          │   │
│  │  ├──────────────────────────────────────────────────────┤          │   │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │          │   │
│  │  │  │ Theme   │ │ Syntax  │ │ Diagram │ │  Math   │    │          │   │
│  │  │  │ Manager │ │ Prism   │ │ Mermaid │ │ KaTeX   │    │          │   │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘    │          │   │
│  │  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐    │          │   │
│  │  │  │ Storage │ │  PDF    │ │  HTML   │ │ Folder  │    │          │   │
│  │  │  │ Manager │ │ Export  │ │ Export  │ │ Browser │    │          │   │
│  │  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘    │          │   │
│  │  └──────────────────────────────────────────────────────┘          │   │
│  │                              │                                      │   │
│  │                              ▼                                      │   │
│  │  ┌──────────────────────────────────────────────────────┐          │   │
│  │  │                    Browser APIs                       │          │   │
│  │  ├──────────────────────────────────────────────────────┤          │   │
│  │  │  • LocalStorage (settings, content)                   │          │   │
│  │  │  • File System Access API (folder browsing)           │          │   │
│  │  │  • Clipboard API (copy operations)                    │          │   │
│  │  │  • Download API (export)                              │          │   │
│  │  └──────────────────────────────────────────────────────┘          │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  NO BACKEND REQUIRED                                                        │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.2 Data Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              DATA FLOW                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  USER INPUT                                                                  │
│      │                                                                       │
│      ▼                                                                       │
│  ┌────────────┐                                                              │
│  │  Textarea  │ ─── onInput (debounced 300ms) ───▶ renderMarkdown()         │
│  └────────────┘                                                              │
│                                                                              │
│  renderMarkdown()                                                            │
│      │                                                                       │
│      ├──▶ marked.parse(content)                                              │
│      │         │                                                             │
│      │         ├──▶ Custom heading renderer (anchor IDs)                    │
│      │         ├──▶ Custom code block handler (mermaid detection)           │
│      │         ├──▶ Custom math tokenizer (KaTeX blocks)                    │
│      │         └──▶ Return HTML string                                       │
│      │                                                                       │
│      ├──▶ DOMPurify.sanitize(html)                                          │
│      │                                                                       │
│      ├──▶ preview.innerHTML = cleanHtml                                     │
│      │                                                                       │
│      ├──▶ Post-render processing:                                           │
│      │         ├──▶ Prism.highlightAll() (syntax)                           │
│      │         └──▶ Mermaid.render() (diagrams)                             │
│      │                                                                       │
│      └──▶ StorageManager.save(content)                                      │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 4.3 Component Hierarchy

```
App
├── Toolbar
│   ├── Logo
│   ├── FolderButton
│   ├── ViewModeButtons
│   ├── ThemeSelector
│   └── ActionButtons (Export, Customize, Zen)
│
├── MainContent
│   ├── Sidebar (FolderBrowser)
│   │   ├── Header
│   │   ├── FileTree
│   │   └── ResizeHandle
│   │
│   ├── EditorPane
│   │   ├── Header
│   │   └── Textarea
│   │
│   ├── SplitResizer
│   │
│   └── PreviewPane
│       ├── Header (ZoomControls)
│       └── MarkdownPreview
│
├── Footer
│   └── SupportWidget
│
└── Modals
    ├── ThemeCustomizer
    ├── PDFExport
    ├── CreateFile
    └── Support
```

---

## 5. Design Language & Brand System

### 5.1 Design Philosophy

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DESIGN PHILOSOPHY                                    │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  AESTHETIC DIRECTION: "Editorial Craftsmanship"                             │
│  ────────────────────────────────────────────────                           │
│                                                                              │
│  MOOD BOARD KEYWORDS:                                                        │
│  • Warm paper texture (not sterile white)                                   │
│  • Ink-black type (confident, readable)                                     │
│  • Serif headlines (editorial gravitas)                                     │
│  • Monospace editor (technical authenticity)                                │
│  • Terracotta accents (warmth, not corporate blue)                          │
│  • Print-inspired details (rule lines, drop shadows)                        │
│                                                                              │
│  DIFFERENTIATION:                                                            │
│  ─────────────────                                                           │
│  "If VS Code is a Swiss Army knife, we're a Mont Blanc pen."                │
│                                                                              │
│  WHAT USERS WILL REMEMBER:                                                   │
│  ─────────────────────────                                                   │
│  • The warm, paper-like background                                          │
│  • The beautiful serif headings in preview                                  │
│  • The single, confident accent color                                       │
│  • The feeling of writing, not coding                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 5.2 Design Tokens (Root CSS)

```css
/* ================================================
   DESIGN TOKENS: MARKDOWN VIEWER PRO
   ================================================ */

:root {
  /* ============================================
     TYPOGRAPHY
     ============================================ */
  
  /* Font Families */
  --font-display: 'Fraunces', Georgia, serif;
  --font-body: 'Source Serif 4', Georgia, serif;
  --font-code: 'Source Code Pro', 'Consolas', monospace;
  --font-ui: system-ui, -apple-system, sans-serif;
  
  /* Type Scale (1.25 ratio - Major Third) */
  --text-xs: 0.64rem;     /* 10.24px */
  --text-sm: 0.8rem;      /* 12.8px */
  --text-base: 1rem;      /* 16px */
  --text-lg: 1.25rem;     /* 20px */
  --text-xl: 1.563rem;    /* 25px */
  --text-2xl: 1.953rem;   /* 31.25px */
  --text-3xl: 2.441rem;   /* 39px */
  --text-4xl: 3.052rem;   /* 48.83px */
  
  /* Font Weights */
  --font-light: 300;
  --font-regular: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Line Heights */
  --leading-tight: 1.1;
  --leading-snug: 1.3;
  --leading-normal: 1.5;
  --leading-relaxed: 1.7;
  --leading-loose: 1.9;
  
  /* ============================================
     COLORS
     ============================================ */
  
  /* Paper (Light Mode Backgrounds) */
  --paper-white: #ffffff;
  --paper-cream: #fdf8f3;
  --paper-warm: #f5efe6;
  --paper-cool: #f0f4f8;
  
  /* Ink (Text Colors) */
  --ink-black: #1a1a1a;
  --ink-dark: #2d2d2d;
  --ink-medium: #525252;
  --ink-light: #8b8b8b;
  --ink-faint: #c4c4c4;
  
  /* Accent (Terracotta) */
  --accent: #c4785a;
  --accent-hover: #a8624a;
  --accent-light: #e8c4b4;
  --accent-glow: rgba(196, 120, 90, 0.3);
  
  /* Semantic */
  --success: #5a8c5a;
  --warning: #c49a5a;
  --error: #c45a5a;
  --info: #5a7ac4;
  
  /* ============================================
     SPACING (4px Base Unit)
     ============================================ */
  
  --space-0: 0;
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 20px;
  --space-6: 24px;
  --space-8: 32px;
  --space-10: 40px;
  --space-12: 48px;
  --space-16: 64px;
  --space-20: 80px;
  --space-24: 96px;
  
  /* ============================================
     LAYOUT
     ============================================ */
  
  --content-width: 70ch;
  --sidebar-width: 280px;
  --toolbar-height: 60px;
  --footer-height: 44px;
  
  /* ============================================
     BORDERS & RADIUS
     ============================================ */
  
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 12px;
  --radius-xl: 16px;
  --radius-full: 9999px;
  
  --border-light: rgba(0, 0, 0, 0.08);
  --border-medium: rgba(0, 0, 0, 0.15);
  --border-dark: rgba(0, 0, 0, 0.25);
  
  /* ============================================
     SHADOWS
     ============================================ */
  
  --shadow-xs: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-sm: 0 2px 4px rgba(0, 0, 0, 0.06);
  --shadow-md: 0 4px 8px rgba(0, 0, 0, 0.08);
  --shadow-lg: 0 8px 16px rgba(0, 0, 0, 0.1);
  --shadow-xl: 0 16px 32px rgba(0, 0, 0, 0.12);
  --shadow-inner: inset 0 2px 4px rgba(0, 0, 0, 0.06);
  
  /* ============================================
     MOTION
     ============================================ */
  
  --ease-default: cubic-bezier(0.4, 0, 0.2, 1);
  --ease-in: cubic-bezier(0.4, 0, 1, 1);
  --ease-out: cubic-bezier(0, 0, 0.2, 1);
  --ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);
  
  --duration-instant: 50ms;
  --duration-fast: 150ms;
  --duration-base: 250ms;
  --duration-slow: 400ms;
  --duration-slower: 600ms;
  
  /* ============================================
     Z-INDEX SCALE
     ============================================ */
  
  --z-base: 0;
  --z-dropdown: 100;
  --z-sticky: 200;
  --z-overlay: 300;
  --z-modal-backdrop: 400;
  --z-modal: 500;
  --z-toast: 600;
  --z-tooltip: 700;
}

/* ================================================
   DARK MODE
   ================================================ */

[data-theme="dark"] {
  /* Paper → Dark backgrounds */
  --paper-white: #121212;
  --paper-cream: #1a1a1a;
  --paper-warm: #242424;
  --paper-cool: #1e2028;
  
  /* Ink → Light text */
  --ink-black: #f5f5f5;
  --ink-dark: #e0e0e0;
  --ink-medium: #a0a0a0;
  --ink-light: #6b6b6b;
  --ink-faint: #404040;
  
  /* Accent lightened for dark mode */
  --accent: #e8a88a;
  --accent-hover: #f0bda6;
  --accent-light: #3d2920;
  
  /* Borders */
  --border-light: rgba(255, 255, 255, 0.08);
  --border-medium: rgba(255, 255, 255, 0.15);
  --border-dark: rgba(255, 255, 255, 0.25);
}
```

### 5.3 Component Design Patterns

```css
/* ================================================
   BUTTON COMPONENT
   ================================================ */

.btn {
  /* Reset */
  appearance: none;
  border: none;
  background: none;
  cursor: pointer;
  
  /* Layout */
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-2);
  
  /* Typography */
  font-family: var(--font-ui);
  font-size: var(--text-sm);
  font-weight: var(--font-medium);
  line-height: 1;
  text-decoration: none;
  
  /* Spacing */
  padding: var(--space-3) var(--space-4);
  
  /* Shape */
  border-radius: var(--radius-md);
  
  /* Transition */
  transition-property: background-color, color, border-color, transform, box-shadow;
  transition-duration: var(--duration-fast);
  transition-timing-function: var(--ease-default);
}

/* Ghost variant */
.btn-ghost {
  background: transparent;
  color: var(--ink-dark);
  border: 1px solid var(--border-medium);
}

.btn-ghost:hover {
  background: var(--paper-warm);
  border-color: var(--border-dark);
}

/* Primary variant */
.btn-primary {
  background: var(--accent);
  color: white;
}

.btn-primary:hover {
  background: var(--accent-hover);
  transform: translateY(-1px);
  box-shadow: var(--shadow-md);
}

/* ================================================
   PREVIEW TYPOGRAPHY
   ================================================ */

.preview {
  font-family: var(--font-body);
  font-size: var(--text-base);
  line-height: var(--leading-relaxed);
  color: var(--ink-black);
  max-width: var(--content-width);
  
  /* Paper texture */
  background-color: var(--paper-cream);
}

.preview h1 {
  font-family: var(--font-display);
  font-size: var(--text-4xl);
  font-weight: var(--font-bold);
  line-height: var(--leading-tight);
  color: var(--ink-black);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 2px solid var(--accent);
}

.preview h2 {
  font-family: var(--font-display);
  font-size: var(--text-2xl);
  font-weight: var(--font-semibold);
  margin-top: var(--space-8);
  margin-bottom: var(--space-4);
  padding-left: var(--space-4);
  border-left: 3px solid var(--accent);
}

.preview code {
  font-family: var(--font-code);
  font-size: 0.9em;
  background: var(--paper-warm);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border-light);
}

.preview pre {
  background: var(--ink-black);
  color: var(--paper-cream);
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  overflow-x: auto;
  box-shadow: var(--shadow-inner), var(--shadow-lg);
}

.preview blockquote {
  margin: var(--space-6) 0;
  padding: var(--space-4) var(--space-6);
  border-left: 3px solid var(--accent);
  background: linear-gradient(90deg, var(--accent-light) 0%, transparent 100%);
  font-style: italic;
  color: var(--ink-medium);
}
```

---

## 6. Low-Level Design (LLD)

### 6.1 File Structure

```
markdown-viewer-pro/
├── index.html                 # Single HTML entry point
├── package.json
├── tsconfig.json
├── vite.config.ts
├── tailwind.config.ts
├── postcss.config.js
│
├── public/
│   ├── favicon.ico
│   └── fonts/                 # Self-hosted fonts (optional)
│
├── src/
│   ├── main.ts                # Entry point
│   ├── app.ts                 # App initialization
│   │
│   ├── styles/
│   │   ├── tokens.css         # Design tokens (from Section 5.2)
│   │   ├── base.css           # Reset + global styles
│   │   ├── components/
│   │   │   ├── buttons.css
│   │   │   ├── toolbar.css
│   │   │   ├── sidebar.css
│   │   │   ├── editor.css
│   │   │   ├── preview.css
│   │   │   └── modals.css
│   │   └── utilities/
│   │       ├── animations.css
│   │       └── helpers.css
│   │
│   ├── core/
│   │   ├── StorageManager.ts
│   │   ├── ThemeManager.ts
│   │   └── EventBus.ts        # Pub/sub for decoupling
│   │
│   ├── services/
│   │   ├── MarkdownService.ts # marked.js wrapper
│   │   ├── PrismService.ts    # Syntax highlighting
│   │   ├── MermaidService.ts  # Diagram rendering
│   │   ├── KatexService.ts    # Math rendering
│   │   ├── PDFService.ts      # PDF export
│   │   ├── HTMLService.ts     # HTML export
│   │   └── FolderService.ts   # File System API
│   │
│   ├── components/            # UI Components (vanilla or React)
│   │   ├── Toolbar.ts
│   │   ├── Sidebar.ts
│   │   ├── Editor.ts
│   │   ├── Preview.ts
│   │   └── Modal.ts
│   │
│   ├── utils/
│   │   ├── debounce.ts
│   │   ├── slugify.ts
│   │   ├── pathHelpers.ts
│   │   └── validators.ts
│   │
│   └── types/
│       ├── index.d.ts
│       └── services.d.ts
│
├── tests/
│   ├── unit/
│   └── e2e/
│
└── docs/                      # Documentation (this folder)
```

### 6.2 Service Interfaces

```typescript
// MarkdownService.ts

interface MarkdownService {
  // Core rendering
  render(content: string): string;
  
  // Configuration
  configure(options: MarkdownOptions): void;
  
  // Extension points
  registerExtension(extension: MarkedExtension): void;
}

interface MarkdownOptions {
  gfm: boolean;           // GitHub Flavored Markdown
  breaks: boolean;        // Line breaks → <br>
  headerIds: boolean;     // Generate anchor IDs
  sanitize: boolean;      // Use DOMPurify
}
```

```typescript
// ThemeManager.ts

interface ThemeManager {
  // State
  currentTheme: string;
  
  // Actions
  loadTheme(themeName: string): Promise<void>;
  setCustomColors(colors: Record<string, string>): void;
  saveCustomTheme(): void;
  
  // Events
  onThemeChange(callback: (theme: string) => void): void;
}
```

```typescript
// StorageManager.ts

interface StorageManager {
  // Generic
  get<T>(key: string): T | null;
  set<T>(key: string, value: T): void;
  remove(key: string): void;
  clear(): void;
  
  // Typed helpers
  getContent(): string;
  setContent(content: string): void;
  getSettings(): AppSettings;
  setSettings(settings: Partial<AppSettings>): void;
}

interface AppSettings {
  theme: string;
  viewMode: 'editor' | 'split' | 'preview';
  sidebarWidth: number;
  sidebarCollapsed: boolean;
  zoomLevel: number;
  syncScroll: boolean;
}
```

### 6.3 Component APIs

```typescript
// Editor Component

interface EditorComponent {
  // Props
  initialContent: string;
  placeholder: string;
  
  // Methods
  getValue(): string;
  setValue(content: string): void;
  focus(): void;
  
  // Events
  onInput: (content: string) => void;
  onScroll: (scrollRatio: number) => void;
}
```

```typescript
// Preview Component

interface PreviewComponent {
  // Props
  html: string;
  zoomLevel: number;
  
  // Methods
  scrollTo(ratio: number): void;
  scrollToAnchor(id: string): void;
  
  // Events
  onScroll: (scrollRatio: number) => void;
  onLinkClick: (href: string) => void;
}
```

### 6.4 State Management

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           STATE ARCHITECTURE                                 │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  PRINCIPLE: Keep state minimal and colocated                                │
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                         APP STATE                                    │   │
│  ├─────────────────────────────────────────────────────────────────────┤   │
│  │                                                                      │   │
│  │  PERSISTED (LocalStorage)         IN-MEMORY (Runtime)               │   │
│  │  ────────────────────────         ─────────────────────             │   │
│  │                                                                      │   │
│  │  • markdownContent                • currentHtml (derived)           │   │
│  │  • theme                          • isRendering                     │   │
│  │  • viewMode                       • activeFileHandle                │   │
│  │  • sidebarWidth                   • folderFileTree                  │   │
│  │  • sidebarCollapsed               • navigationHistory               │   │
│  │  • zoomLevel                      • modalStack                      │   │
│  │  • syncScrollEnabled                                                │   │
│  │  • customThemeColors                                                │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  NO GLOBAL STATE MANAGER NEEDED (Redux/Zustand/etc)                         │
│  Each service manages its own state internally                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 7. Implementation Phases

### Phase 0: Project Setup (Week 1, Days 1-2)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 0: PROJECT SETUP                                                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ DELIVERABLES:                                                                │
│ ─────────────                                                                │
│ □ Initialize Vite + TypeScript project                                      │
│ □ Configure Tailwind CSS                                                     │
│ □ Set up ESLint + Prettier                                                  │
│ □ Configure Vitest for unit tests                                           │
│ □ Set up Playwright for E2E tests                                           │
│ □ Create folder structure                                                   │
│ □ Add design tokens (tokens.css)                                            │
│ □ Create base HTML shell                                                    │
│ □ Set up CI/CD (GitHub Actions)                                             │
│                                                                              │
│ ACCEPTANCE CRITERIA:                                                         │
│ ────────────────────                                                         │
│ ✓ `npm run dev` starts dev server                                           │
│ ✓ `npm run build` produces production build                                 │
│ ✓ `npm run test` runs all tests                                             │
│ ✓ TypeScript compilation with zero errors                                   │
│ ✓ Tailwind utilities work                                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 1: Core MVP (Week 1, Days 3-7)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 1: CORE MVP                                                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ GOAL: Basic editor ↔ preview with real-time rendering                       │
│                                                                              │
│ DELIVERABLES:                                                                │
│ ─────────────                                                                │
│ □ Editor component (textarea)                                               │
│ □ Preview component (rendered HTML)                                         │
│ □ MarkdownService (marked.js integration)                                   │
│ □ StorageManager (save/load content)                                        │
│ □ Basic toolbar (title only)                                                │
│ □ Split view layout                                                         │
│ □ Debounced rendering (300ms)                                               │
│ □ DOMPurify sanitization                                                    │
│                                                                              │
│ ACCEPTANCE CRITERIA:                                                         │
│ ────────────────────                                                         │
│ ✓ User types markdown → preview updates                                     │
│ ✓ Content persists on page reload                                           │
│ ✓ No XSS vulnerabilities                                                    │
│ ✓ Renders standard markdown (headings, lists, links, code)                  │
│                                                                              │
│ TESTS:                                                                       │
│ ──────                                                                       │
│ • Unit: MarkdownService.render() produces correct HTML                      │
│ • Unit: StorageManager persists and retrieves                               │
│ • E2E: Type markdown → see rendered output                                  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 2: Syntax Highlighting + Themes (Week 2)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 2: SYNTAX HIGHLIGHTING + THEMES                                        │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ GOAL: Beautiful code blocks + light/dark themes                             │
│                                                                              │
│ DELIVERABLES:                                                                │
│ ─────────────                                                                │
│ □ PrismService (syntax highlighting)                                        │
│ □ ThemeManager (load/switch themes)                                         │
│ □ Light theme (Ink & Paper light)                                           │
│ □ Dark theme (Ink & Paper dark)                                             │
│ □ Theme selector in toolbar                                                 │
│ □ Persistent theme preference                                               │
│ □ System preference detection (prefers-color-scheme)                        │
│ □ Custom syntax token colors per theme                                      │
│                                                                              │
│ ACCEPTANCE CRITERIA:                                                         │
│ ────────────────────                                                         │
│ ✓ Code blocks have syntax colors                                            │
│ ✓ 10+ languages supported                                                   │
│ ✓ Theme switch is instant (no flicker)                                      │
│ ✓ Theme persists on reload                                                  │
│ ✓ Respects OS dark mode preference                                          │
│                                                                              │
│ TESTS:                                                                       │
│ ──────                                                                       │
│ • Unit: PrismService highlights JavaScript correctly                        │
│ • Unit: ThemeManager loads CSS files                                        │
│ • E2E: Switch theme → all colors change                                     │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 3: Advanced Rendering (Week 3)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 3: ADVANCED RENDERING                                                  │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ GOAL: Mermaid diagrams + KaTeX math + tables + footnotes                    │
│                                                                              │
│ DELIVERABLES:                                                                │
│ ─────────────                                                                │
│ □ MermaidService (diagram rendering)                                        │
│ □ KatexService (math formulas)                                              │
│ □ GFM tables styling                                                        │
│ □ Footnotes support                                                         │
│ □ GitHub admonitions (NOTE, TIP, WARNING)                                   │
│ □ Anchor navigation (TOC links)                                             │
│ □ Custom heading IDs                                                        │
│                                                                              │
│ ACCEPTANCE CRITERIA:                                                         │
│ ────────────────────                                                         │
│ ✓ ```mermaid blocks render as SVG                                           │
│ ✓ $...$ renders inline math                                                 │
│ ✓ $$...$$ renders block math                                                │
│ ✓ Tables are readable with alternating rows                                 │
│ ✓ [^1] footnotes work                                                       │
│ ✓ Clicking TOC link scrolls to heading                                      │
│                                                                              │
│ TESTS:                                                                       │
│ ──────                                                                       │
│ • Unit: MermaidService handles invalid syntax gracefully                    │
│ • Unit: KatexService renders Pythagorean theorem                            │
│ • E2E: Full document with all features renders correctly                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 4: Export Features (Week 4)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 4: EXPORT FEATURES                                                     │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ GOAL: Export to HTML and PDF with styling preserved                         │
│                                                                              │
│ DELIVERABLES:                                                                │
│ ─────────────                                                                │
│ □ HTMLService (standalone HTML export)                                      │
│ □ PDFService (PDF generation)                                               │
│ □ PDF settings modal (page size, margins, orientation)                      │
│ □ PDF preview in modal                                                      │
│ □ Inline styles in HTML export (no external CSS)                            │
│ □ Copy HTML to clipboard                                                    │
│                                                                              │
│ ACCEPTANCE CRITERIA:                                                         │
│ ────────────────────                                                         │
│ ✓ Exported HTML opens correctly in any browser                              │
│ ✓ PDF includes syntax highlighting colors                                   │
│ ✓ PDF respects chosen page size                                             │
│ ✓ Mermaid diagrams appear in exports                                        │
│ ✓ Math formulas appear in exports                                           │
│                                                                              │
│ TESTS:                                                                       │
│ ──────                                                                       │
│ • Unit: HTMLService embeds all styles                                       │
│ • E2E: Export PDF → file downloads                                          │
│ • E2E: Exported HTML renders identically to preview                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 5: Folder Browser (Week 5)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 5: FOLDER BROWSER                                                      │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ GOAL: Browse local folders, open/create markdown files                      │
│                                                                              │
│ DELIVERABLES:                                                                │
│ ─────────────                                                                │
│ □ FolderService (File System Access API)                                    │
│ □ Sidebar component with file tree                                          │
│ □ Recursive folder scanning                                                 │
│ □ Create new file modal                                                     │
│ □ File templates (empty, readme, notes, blog)                               │
│ □ Resizable sidebar                                                         │
│ □ Collapsible sidebar                                                       │
│ □ Link navigation between files                                             │
│                                                                              │
│ ACCEPTANCE CRITERIA:                                                         │
│ ────────────────────                                                         │
│ ✓ Opens folder picker dialog                                                │
│ ✓ Shows tree of .md files                                                   │
│ ✓ Click file → loads in editor                                              │
│ ✓ Create file → appears in tree                                             │
│ ✓ Sidebar resize persists                                                   │
│ ✓ Click [link.md] → opens that file                                         │
│                                                                              │
│ TESTS:                                                                       │
│ ──────                                                                       │
│ • Unit: FolderService builds correct tree structure                         │
│ • E2E: Open folder → see files → click file → content loads                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 6: Polish & UX (Week 6)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 6: POLISH & UX                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ GOAL: Professional feel with animations, zen mode, mobile support           │
│                                                                              │
│ DELIVERABLES:                                                                │
│ ─────────────                                                                │
│ □ View mode buttons (editor/split/preview)                                  │
│ □ Synchronized scroll (editor ↔ preview)                                    │
│ □ Zen mode (distraction-free writing)                                       │
│ □ Zoom controls for preview                                                 │
│ □ Mobile responsive layout                                                  │
│ □ Mobile tabs (editor/preview toggle)                                       │
│ □ Toast notifications                                                       │
│ □ Keyboard shortcuts                                                        │
│ □ Page load animations (staggered reveals)                                  │
│ □ Reduced motion support                                                    │
│                                                                              │
│ ACCEPTANCE CRITERIA:                                                         │
│ ────────────────────                                                         │
│ ✓ Scroll in editor → preview follows                                        │
│ ✓ Zen mode hides all UI except preview                                      │
│ ✓ Works on mobile (iPhone, Android)                                         │
│ ✓ Ctrl+B bolds text, etc.                                                   │
│ ✓ No jarring layout shifts                                                  │
│ ✓ Prefers-reduced-motion disables animations                                │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Phase 7: Launch Prep (Week 7)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ PHASE 7: LAUNCH PREP                                                         │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│ GOAL: Production-ready deployment                                           │
│                                                                              │
│ DELIVERABLES:                                                                │
│ ─────────────                                                                │
│ □ Performance audit (Lighthouse 90+)                                        │
│ □ Accessibility audit (WCAG AA)                                             │
│ □ Bundle size optimization                                                  │
│ □ Error tracking (Sentry)                                                   │
│ □ Analytics (privacy-friendly)                                              │
│ □ PWA manifest + service worker                                             │
│ □ README documentation                                                      │
│ □ Deploy to Vercel/Netlify                                                  │
│ □ Custom domain setup                                                       │
│ □ OG tags for social sharing                                                │
│                                                                              │
│ ACCEPTANCE CRITERIA:                                                         │
│ ────────────────────                                                         │
│ ✓ Lighthouse Performance > 90                                               │
│ ✓ Lighthouse Accessibility = 100                                            │
│ ✓ Bundle size < 500KB gzipped                                               │
│ ✓ Works offline (PWA)                                                       │
│ ✓ No console errors in production                                           │
│ ✓ Social share cards work                                                   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 8. Quality Gates

### 8.1 Definition of Done (Per Feature)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         DEFINITION OF DONE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  A feature is DONE when ALL of the following are true:                      │
│                                                                              │
│  CODE QUALITY                                                                │
│  ────────────                                                                │
│  □ TypeScript compiles with zero errors                                     │
│  □ ESLint passes with zero warnings                                         │
│  □ Prettier formatting applied                                              │
│  □ No `any` types (except justified exceptions)                             │
│  □ No `// @ts-ignore` (except justified exceptions)                         │
│                                                                              │
│  TESTING                                                                     │
│  ───────                                                                     │
│  □ Unit tests written and passing                                           │
│  □ E2E test for happy path                                                  │
│  □ Edge cases documented and tested                                         │
│  □ No flaky tests                                                           │
│                                                                              │
│  DOCUMENTATION                                                               │
│  ─────────────                                                               │
│  □ JSDoc comments on public APIs                                            │
│  □ README updated if user-facing change                                     │
│  □ Changelog entry added                                                    │
│                                                                              │
│  ACCESSIBILITY                                                               │
│  ─────────────                                                               │
│  □ Keyboard navigable                                                       │
│  □ Screen reader tested                                                     │
│  □ Color contrast passes WCAG AA                                            │
│  □ Focus indicators visible                                                 │
│                                                                              │
│  PERFORMANCE                                                                 │
│  ───────────                                                                 │
│  □ No memory leaks                                                          │
│  □ No unnecessary re-renders                                                │
│  □ Lazy load where appropriate                                              │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 8.2 Release Checklist

```
BEFORE EVERY RELEASE:

□ All tests pass (unit + E2E)
□ Manual smoke test on Chrome, Firefox, Safari
□ Mobile test on iOS and Android
□ Lighthouse audit (Performance > 90, A11y = 100)
□ Bundle size check (no unexpected growth)
□ Changelog updated
□ Version bumped (semantic versioning)
□ Git tag created
□ Deploy to staging first
□ Verify staging works
□ Deploy to production
□ Monitor error tracking for 24h
```

---

## 🎯 Summary

This blueprint provides a complete roadmap from zero to production:

1. **Discovery** — Know your users before writing code
2. **User Journeys** — Design for the experience, not features
3. **Tech Stack** — Choose boring technology that fits the problem
4. **HLD** — Understand the system before diving into details
5. **Design System** — Establish visual language early (tokens, not themes)
6. **LLD** — Define interfaces before implementation
7. **Phases** — Ship incrementally with clear milestones
8. **Quality Gates** — Don't ship without standards

**Total Timeline:** 7 weeks to production-ready MVP

**Key Differentiator:** "Editorial Craftsmanship" design language (warm paper, serif headlines, terracotta accent) creates a memorable brand, not another generic markdown editor.

---

*Blueprint created by Principal Engineer*
*Last updated: 2026-01-20*