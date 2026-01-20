# Slide Deck: Markdown Viewer Audit Findings

## Slide 1: Title Slide

**Title:** From Monolith to Modern Modular Architecture
**Subtitle:** Technical Audit & Roadmap for Markdown Viewer App
**Presenter:** Antigravity (Star Team Auditor)

## Slide 2: Executive Summary

- **Health Score:** B- (Good Foundation, Structural Issues)
- **Critical Risks:** God Object (`script.js`), Hidden Build System.
- **Key Assets:** Modern Design System (`oklch`), Robust Service Layer.

## Slide 3: The "Good" - What We Keep

- **Service Layer:** `MermaidService`, `FolderBrowserService` are well-written.
- **Design System:** Professional `oklch` color palette with fallbacks.
- **Accessibility:** Built-in focus management and generic A11y.

## Slide 4: The "Bad" - The God Object

- **Issue:** `script.js` is ~2700 lines of mixed concerns.
- **Impact:** Untestable code, fragile updates, spaghetti logic.
- **Solution:** "Surgical" extraction of Controllers (UI, Editor, Config).

## Slide 5: The "Ugly" - Documentation vs. Reality

- **Myth:** "Zero Build Tools", "CDN Dependencies".
- **Reality:** Full Vite + NPM build system.
- **Risk:** New developers will be confused; Deployment assumes static files but requires build.

## Slide 6: Security Snapshot

- **Status:** PASS (mostly).
- **Wins:** `DOMPurify` active, `noopener` links.
- **Gaps:** Missing CSP (Content Security Policy).

## Slide 7: The Roadmap (Next 30 Days)

1.  **Week 1:** Fix Documentation & Failing Test.
2.  **Week 2:** Refactor `script.js` -> `AppController`.
3.  **Week 3:** Implement CI/CD (GitHub Actions).
4.  **Week 4:** Full E2E Test Suite.

## Slide 8: Q&A

- Open floor for architectural discussions.
