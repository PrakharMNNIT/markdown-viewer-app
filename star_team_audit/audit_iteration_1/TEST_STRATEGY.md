# Test Strategy v1.0

## 1. Executive Summary

The current test suite covers 55% of the codebase (Services/Utils) with high reliability. However, the Core Application Logic (`script.js`) has **0% coverage** due to architectural coupling. This strategy outlines the path to 90% coverage.

## 2. Current State

- **Framework:** Vitest (Excellent choice).
- **Unit Tests:** 445 tests passing.
- **Critical Failure:** `ThemeManager` test expects 15 themes, found 23.
- **Coverage:**
  - `Services`: High
  - `Utils`: High
  - `script.js`: **None**

## 3. Recommended Strategy

### Phase 1: Immediate Remediation (Week 1)

- **Fix:** Update `ThemeManager.test.js` to match current theme count.
- **Add:** E2E Tests (Playwright) to cover critical paths currently in `script.js`:
  - Application Load
  - Theme Switching
  - Markdown Rendering
  - PDF Modal Opening

### Phase 2: Refactor-Driven Testing (Week 2-4)

- As `script.js` is broken down, add Unit Tests for each extracted Controller:
  - `EditorController.spec.js`
  - `UIController.spec.js`
  - `ConfigService.spec.js`

### Phase 3: Visual Regression (Month 2)

- Implement Visual Regression Testing for the Design System (per theme).
- Verify Mermaid diagram rendering across themes.

## 4. CI/CD Integration

- Run `npm test` on every PR.
- Enforce 80% coverage on NEW code.
- Run Linting (`eslint`) as a blocking step.
