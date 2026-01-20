# 🚀 Sprint Roadmap

## Markdown Preview EE — Implementation Plan

**Document Type:** Sprint Planning  
**Version:** 1.0  
**Created:** 2026-01-20  
**Status:** Ready for Execution

---

## 📋 Sprint Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🎯 IMPLEMENTATION TIMELINE                                                │
│                                                                              │
│   Total Duration: 6 Sprints (12 weeks)                                      │
│   Sprint Length: 2 weeks                                                    │
│   Team Size: 1-2 developers                                                 │
│                                                                              │
│   ┌─────────────────────────────────────────────────────────────────────┐  │
│   │                                                                      │  │
│   │   Sprint 1 (Week 1-2)    │ Foundation & CSS Architecture           │  │
│   │   Sprint 2 (Week 3-4)    │ Core Editor & Preview                   │  │
│   │   Sprint 3 (Week 5-6)    │ Theme System & Preview Themes           │  │
│   │   Sprint 4 (Week 7-8)    │ File Operations & Export                │  │
│   │   Sprint 5 (Week 9-10)   │ AI Integration & Polish                 │  │
│   │   Sprint 6 (Week 11-12)  │ Testing, Accessibility & Launch         │  │
│   │                                                                      │  │
│   └─────────────────────────────────────────────────────────────────────┘  │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📅 Sprint 1: Foundation & CSS Architecture

**Duration:** Week 1-2  
**Focus:** Project setup, CSS layer architecture, brand theme implementation

### Goals

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   SPRINT 1: FOUNDATION                                                      │
│                                                                              │
│   ✅ Success Criteria:                                                      │
│   • React 19 + Vite + Tailwind v4 project running                          │
│   • CSS @layer architecture implemented                                     │
│   • Candyland brand theme (Light/Dark) working                              │
│   • Basic app shell (header, sidebar placeholder, main area)               │
│   • Theme toggle functional                                                 │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tasks

| ID | Task | Est. | Priority |
|----|------|------|----------|
| S1-01 | Initialize React 19 + Vite project | 2h | P0 |
| S1-02 | Configure Tailwind v4 with CSS layers | 4h | P0 |
| S1-03 | Implement `@layer base` (reset, typography) | 2h | P0 |
| S1-04 | Implement `@layer theme.app` (Candyland colors) | 4h | P0 |
| S1-05 | Create brand color tokens (OKLCH) | 2h | P0 |
| S1-06 | Build Header component | 4h | P0 |
| S1-07 | Build Toolbar component | 4h | P0 |
| S1-08 | Implement Light/Dark toggle | 3h | P0 |
| S1-09 | Set up localStorage for theme persistence | 2h | P1 |
| S1-10 | Create basic layout grid (sidebar + main) | 3h | P1 |
| S1-11 | Add Google Fonts (Poppins, Roboto Mono) | 1h | P1 |
| S1-12 | Configure ESLint + Prettier | 2h | P1 |
| S1-13 | Write initial unit tests | 3h | P1 |

### Deliverables

- [ ] Running app with Candyland theme
- [ ] Theme toggle (Light ↔ Dark)
- [ ] App shell layout
- [ ] CSS architecture in place

---

## 📅 Sprint 2: Core Editor & Preview

**Duration:** Week 3-4  
**Focus:** Markdown editor, live preview, rendering pipeline

### Goals

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   SPRINT 2: EDITOR & PREVIEW                                                │
│                                                                              │
│   ✅ Success Criteria:                                                      │
│   • Textarea editor with monospace font                                     │
│   • Live markdown preview (debounced)                                       │
│   • GFM rendering (tables, task lists, footnotes)                          │
│   • Syntax highlighting for code blocks                                     │
│   • View mode toggle (Editor/Preview/Split)                                │
│   • Auto-save to localStorage                                               │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tasks

| ID | Task | Est. | Priority |
|----|------|------|----------|
| S2-01 | Create Editor component (textarea) | 4h | P0 |
| S2-02 | Install & configure marked.js (GFM) | 3h | P0 |
| S2-03 | Create Preview component | 4h | P0 |
| S2-04 | Implement debounced rendering (300ms) | 2h | P0 |
| S2-05 | Install & configure Prism.js | 4h | P0 |
| S2-06 | Implement syntax highlighting | 4h | P0 |
| S2-07 | Add DOMPurify sanitization | 2h | P0 |
| S2-08 | Create view mode state (Editor/Preview/Split) | 3h | P0 |
| S2-09 | Build view mode toggle buttons | 3h | P0 |
| S2-10 | Implement split view with resizable pane | 4h | P1 |
| S2-11 | Add auto-save to localStorage | 3h | P1 |
| S2-12 | Create "Last saved" indicator | 2h | P1 |
| S2-13 | Add line numbers (toggleable) | 3h | P2 |
| S2-14 | Write editor/preview tests | 4h | P1 |

### Deliverables

- [ ] Working markdown editor
- [ ] Live preview with GFM support
- [ ] Syntax highlighting
- [ ] View mode switching
- [ ] Auto-save functionality

---

## 📅 Sprint 3: Theme System & Preview Themes

**Duration:** Week 5-6  
**Focus:** Dual theme architecture, preview theme library

### Goals

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   SPRINT 3: THEME SYSTEM                                                    │
│                                                                              │
│   ✅ Success Criteria:                                                      │
│   • Preview theme layer (`@layer theme.preview`) working                   │
│   • Theme isolation verified (no bleed)                                     │
│   • 5+ preview themes implemented                                           │
│   • Theme selector in sidebar                                               │
│   • Mermaid diagrams rendering                                              │
│   • KaTeX math rendering                                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tasks

| ID | Task | Est. | Priority |
|----|------|------|----------|
| S3-01 | Implement `@layer theme.preview` | 4h | P0 |
| S3-02 | Create preview container with data-theme | 3h | P0 |
| S3-03 | Build GitHub Light theme | 4h | P0 |
| S3-04 | Build GitHub Dark theme | 3h | P0 |
| S3-05 | Build Dracula theme | 3h | P1 |
| S3-06 | Build Nord theme | 3h | P1 |
| S3-07 | Build Candyland preview theme | 3h | P0 |
| S3-08 | Create theme selector dropdown | 3h | P0 |
| S3-09 | Persist theme selection to localStorage | 2h | P1 |
| S3-10 | Install & configure Mermaid | 4h | P1 |
| S3-11 | Theme Mermaid diagrams per preview theme | 4h | P1 |
| S3-12 | Install & configure KaTeX | 4h | P1 |
| S3-13 | Theme KaTeX per preview theme | 2h | P2 |
| S3-14 | Write theme isolation tests | 4h | P1 |

### Deliverables

- [ ] 5+ working preview themes
- [ ] Theme selector UI
- [ ] Mermaid diagram support
- [ ] Math/LaTeX rendering
- [ ] Theme isolation verified

---

## 📅 Sprint 4: File Operations & Export

**Duration:** Week 7-8  
**Focus:** File System Access API, PDF export, folder browsing

### Goals

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   SPRINT 4: FILE OPERATIONS                                                 │
│                                                                              │
│   ✅ Success Criteria:                                                      │
│   • Open file working (all browsers)                                        │
│   • Save file working (Chrome/Edge native, others download)                │
│   • Open folder working (Chrome/Edge)                                       │
│   • File tree sidebar                                                       │
│   • PDF export via window.print()                                          │
│   • HTML export                                                             │
│   • Browser fallbacks implemented                                           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tasks

| ID | Task | Est. | Priority |
|----|------|------|----------|
| S4-01 | Create BrowserCapabilities utility | 3h | P0 |
| S4-02 | Implement openFile() with fallback | 4h | P0 |
| S4-03 | Implement saveFile() with fallback | 4h | P0 |
| S4-04 | Implement openFolder() (Chrome/Edge) | 6h | P1 |
| S4-05 | Build file tree sidebar component | 6h | P1 |
| S4-06 | Implement file selection from tree | 3h | P1 |
| S4-07 | Add unsaved changes warning | 3h | P1 |
| S4-08 | Implement @media print stylesheet | 4h | P0 |
| S4-09 | Build PDF export guidance modal | 3h | P0 |
| S4-10 | Implement exportToPdf() function | 2h | P0 |
| S4-11 | Implement exportToHtml() function | 4h | P1 |
| S4-12 | Hide folder button on unsupported browsers | 2h | P0 |
| S4-13 | Add drag & drop file support | 3h | P2 |
| S4-14 | Write file operation tests | 4h | P1 |

### Deliverables

- [ ] File open/save working
- [ ] Folder browsing (Chrome/Edge)
- [ ] PDF export with guidance
- [ ] HTML export
- [ ] Browser fallbacks

---

## 📅 Sprint 5: AI Integration & Polish

**Duration:** Week 9-10  
**Focus:** AI Note Organizer, settings modal, polish

### Goals

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   SPRINT 5: AI & POLISH                                                     │
│                                                                              │
│   ✅ Success Criteria:                                                      │
│   • AI Note Organizer working (OpenAI, Anthropic, Google)                  │
│   • API key management (encrypted localStorage)                             │
│   • Settings modal complete                                                 │
│   • Keyboard shortcuts implemented                                          │
│   • Micro-interactions and animations                                       │
│   • Loading states and error handling                                       │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tasks

| ID | Task | Est. | Priority |
|----|------|------|----------|
| S5-01 | Create AI service abstraction | 4h | P1 |
| S5-02 | Implement OpenAI integration | 4h | P1 |
| S5-03 | Implement Anthropic integration | 3h | P1 |
| S5-04 | Implement Google AI integration | 3h | P2 |
| S5-05 | Build API key input modal | 4h | P1 |
| S5-06 | Implement encrypted key storage | 3h | P1 |
| S5-07 | Build AI Organize button & loading state | 3h | P1 |
| S5-08 | Implement AI output validation | 3h | P1 |
| S5-09 | Build before/after diff view | 4h | P2 |
| S5-10 | Build Settings modal | 6h | P1 |
| S5-11 | Implement keyboard shortcuts | 4h | P1 |
| S5-12 | Add micro-interactions (hover, focus) | 4h | P2 |
| S5-13 | Add page load animations | 3h | P2 |
| S5-14 | Implement toast notifications | 3h | P1 |
| S5-15 | Write AI integration tests | 4h | P1 |

### Deliverables

- [ ] AI Note Organizer functional
- [ ] Settings modal complete
- [ ] Keyboard shortcuts
- [ ] Polished interactions
- [ ] Error handling

---

## 📅 Sprint 6: Testing, Accessibility & Launch

**Duration:** Week 11-12  
**Focus:** Testing, accessibility audit, performance optimization, launch

### Goals

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   SPRINT 6: LAUNCH PREP                                                     │
│                                                                              │
│   ✅ Success Criteria:                                                      │
│   • 80%+ test coverage                                                      │
│   • WCAG 2.1 AA compliance                                                  │
│   • Lighthouse 90+ scores                                                   │
│   • Bundle size < 150kb gzipped                                            │
│   • Documentation complete                                                  │
│   • Production deployment ready                                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

### Tasks

| ID | Task | Est. | Priority |
|----|------|------|----------|
| S6-01 | Write E2E tests (Playwright) | 8h | P0 |
| S6-02 | Achieve 80% unit test coverage | 6h | P0 |
| S6-03 | Run accessibility audit (axe-core) | 4h | P0 |
| S6-04 | Fix accessibility issues | 6h | P0 |
| S6-05 | Test with screen reader | 3h | P1 |
| S6-06 | Implement focus management | 3h | P0 |
| S6-07 | Add ARIA labels | 3h | P0 |
| S6-08 | Run Lighthouse audit | 2h | P0 |
| S6-09 | Optimize bundle size (code splitting) | 4h | P0 |
| S6-10 | Lazy load Mermaid, KaTeX, Prism | 4h | P1 |
| S6-11 | Add service worker (offline support) | 4h | P1 |
| S6-12 | Cross-browser testing | 4h | P0 |
| S6-13 | Mobile responsive testing | 4h | P0 |
| S6-14 | Configure GitHub Pages deployment | 3h | P0 |
| S6-15 | Write README and user documentation | 4h | P1 |
| S6-16 | Create demo video/GIFs | 3h | P2 |

### Deliverables

- [ ] Test suite complete
- [ ] Accessibility compliant
- [ ] Performance optimized
- [ ] Deployed to production
- [ ] Documentation complete

---

## 📊 Milestone Tracker

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🎯 MILESTONES                                                             │
│                                                                              │
│   Week 2  │ M1: Foundation Complete                                        │
│           │ ☐ CSS architecture working                                     │
│           │ ☐ Brand theme implemented                                      │
│           │                                                                 │
│   Week 4  │ M2: Core MVP                                                   │
│           │ ☐ Editor + Preview functional                                  │
│           │ ☐ Auto-save working                                            │
│           │                                                                 │
│   Week 6  │ M3: Theme System Complete                                      │
│           │ ☐ Preview themes working                                       │
│           │ ☐ Mermaid + Math rendering                                     │
│           │                                                                 │
│   Week 8  │ M4: File Operations Complete                                   │
│           │ ☐ Open/Save/Folder working                                     │
│           │ ☐ PDF export working                                           │
│           │                                                                 │
│   Week 10 │ M5: Feature Complete                                           │
│           │ ☐ AI integration working                                       │
│           │ ☐ Settings complete                                            │
│           │                                                                 │
│   Week 12 │ M6: Production Launch                                          │
│           │ ☐ All tests passing                                            │
│           │ ☐ Deployed to GitHub Pages                                     │
│           │                                                                 │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 📈 Risk Register

| Risk | Impact | Likelihood | Mitigation |
|------|--------|------------|------------|
| Mermaid bundle size | High | Medium | Lazy load, code splitting |
| AI API rate limits | Medium | Low | Error handling, retry logic |
| Safari File System API | Medium | High | Already mitigated with fallbacks |
| OKLCH browser support | Low | Low | All modern browsers support |
| Performance on large files | Medium | Medium | Virtual scrolling if needed |

---

## 📚 Next Documentation Needed

| # | Document | Purpose | Create After |
|---|----------|---------|--------------|
| 08 | `08-component-library.md` | Design tokens, component specs | Sprint 1 |
| 09 | `09-testing-strategy.md` | Test plan, coverage targets | Sprint 2 |
| 10 | `10-performance-budget.md` | Bundle limits, metrics | Sprint 3 |
| 11 | `11-accessibility-plan.md` | WCAG checklist | Sprint 5 |
| 12 | `12-deployment-guide.md` | CI/CD, versioning | Sprint 6 |

---

*Sprint Roadmap v1.0*  
*Created: 2026-01-20*  
*Status: Ready for Execution*