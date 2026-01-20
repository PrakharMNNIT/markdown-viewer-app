# 🧪 Testing Strategy

## Markdown Preview EE — Test Plan & Coverage Targets

**Document Type:** Quality Assurance  
**Version:** 1.0  
**Created:** 2026-01-20  
**Status:** Ready for Implementation

---

## 📊 Testing Overview

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   🎯 TESTING GOALS                                                          │
│                                                                              │
│   Coverage Targets:                                                         │
│   • Unit Tests: 80% coverage (business logic)                              │
│   • Integration Tests: 70% coverage (component interactions)               │
│   • E2E Tests: Critical user journeys (100%)                               │
│                                                                              │
│   Quality Gates:                                                            │
│   • All tests must pass before merge                                       │
│   • No decrease in coverage                                                │
│   • Zero critical/blocker bugs                                             │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🛠️ Testing Stack

| Tool | Purpose | Config |
|------|---------|--------|
| **Vitest** | Unit & Integration tests | `vitest.config.ts` |
| **React Testing Library** | Component testing | Built-in |
| **Playwright** | E2E tests | `playwright.config.ts` |
| **axe-core** | Accessibility testing | Via Playwright |
| **MSW** | API mocking | Mock AI providers |

---

## 📁 Test Structure

```
tests/
├── unit/
│   ├── hooks/
│   │   ├── useTheme.test.ts
│   │   ├── useLocalStorage.test.ts
│   │   └── useDebounce.test.ts
│   ├── utils/
│   │   ├── markdown.test.ts
│   │   ├── sanitize.test.ts
│   │   └── fileHelpers.test.ts
│   └── services/
│       ├── aiService.test.ts
│       └── exportService.test.ts
│
├── integration/
│   ├── components/
│   │   ├── Editor.test.tsx
│   │   ├── Preview.test.tsx
│   │   ├── ThemeSelector.test.tsx
│   │   └── FileTree.test.tsx
│   └── features/
│       ├── markdownRendering.test.tsx
│       ├── themeSwitch.test.tsx
│       └── autoSave.test.tsx
│
├── e2e/
│   ├── editor.spec.ts
│   ├── fileOperations.spec.ts
│   ├── export.spec.ts
│   ├── themes.spec.ts
│   └── accessibility.spec.ts
│
└── __mocks__/
    ├── fileSystemAccess.ts
    ├── aiProviders.ts
    └── localStorage.ts
```

---

## 🔬 Unit Tests

### Hooks

```typescript
// useTheme.test.ts
describe('useTheme', () => {
  it('should default to system preference', () => {});
  it('should toggle between light and dark', () => {});
  it('should persist preference to localStorage', () => {});
  it('should apply dark class to document root', () => {});
});

// useDebounce.test.ts
describe('useDebounce', () => {
  it('should debounce value changes', () => {});
  it('should use specified delay', () => {});
  it('should cancel on unmount', () => {});
});

// useLocalStorage.test.ts
describe('useLocalStorage', () => {
  it('should read initial value from localStorage', () => {});
  it('should write changes to localStorage', () => {});
  it('should handle JSON parse errors', () => {});
  it('should return default when key not found', () => {});
});
```

### Utils

```typescript
// markdown.test.ts
describe('markdown rendering', () => {
  it('should render headings correctly', () => {});
  it('should render tables with GFM syntax', () => {});
  it('should render task lists', () => {});
  it('should render code blocks with language', () => {});
  it('should render footnotes', () => {});
  it('should render autolinks', () => {});
});

// sanitize.test.ts
describe('HTML sanitization', () => {
  it('should remove script tags', () => {});
  it('should remove onclick handlers', () => {});
  it('should allow safe tags', () => {});
  it('should strip dangerous attributes', () => {});
  it('should handle malformed HTML', () => {});
});

// fileHelpers.test.ts
describe('file helpers', () => {
  it('should detect markdown files', () => {});
  it('should generate unique filenames', () => {});
  it('should handle file read errors', () => {});
});
```

### Services

```typescript
// aiService.test.ts
describe('AI Service', () => {
  describe('OpenAI', () => {
    it('should format request correctly', () => {});
    it('should parse response correctly', () => {});
    it('should handle rate limits', () => {});
    it('should handle network errors', () => {});
  });
  
  describe('Anthropic', () => {
    it('should format request correctly', () => {});
    it('should parse response correctly', () => {});
  });
  
  describe('Output Validation', () => {
    it('should strip markdown code fences', () => {});
    it('should strip preamble text', () => {});
    it('should detect word count changes', () => {});
  });
});

// exportService.test.ts
describe('Export Service', () => {
  it('should generate valid HTML export', () => {});
  it('should embed theme CSS', () => {});
  it('should trigger print for PDF', () => {});
});
```

---

## 🔗 Integration Tests

### Components

```typescript
// Editor.test.tsx
describe('Editor Component', () => {
  it('should render textarea with monospace font', () => {});
  it('should update content on input', () => {});
  it('should call onChange with debounced value', () => {});
  it('should show line numbers when enabled', () => {});
  it('should support tab key for indentation', () => {});
});

// Preview.test.tsx
describe('Preview Component', () => {
  it('should render markdown content', () => {});
  it('should apply preview theme', () => {});
  it('should render Mermaid diagrams', () => {});
  it('should render KaTeX math', () => {});
  it('should sanitize HTML', () => {});
  it('should handle large content without lag', () => {});
});

// ThemeSelector.test.tsx
describe('Theme Selector', () => {
  it('should list all available themes', () => {});
  it('should show current theme as selected', () => {});
  it('should call onChange with theme name', () => {});
  it('should close dropdown after selection', () => {});
});
```

### Features

```typescript
// markdownRendering.test.tsx
describe('Markdown Rendering', () => {
  it('should render heading hierarchy', () => {});
  it('should render nested lists', () => {});
  it('should render code with syntax highlighting', () => {});
  it('should render tables with alignment', () => {});
  it('should render blockquotes with nesting', () => {});
  it('should render images with alt text', () => {});
  it('should render links with target blank', () => {});
});

// themeSwitch.test.tsx
describe('Theme Switching', () => {
  it('should switch brand theme without affecting preview', () => {});
  it('should switch preview theme without affecting chrome', () => {});
  it('should persist both themes independently', () => {});
  it('should apply correct CSS variables', () => {});
});

// autoSave.test.tsx
describe('Auto Save', () => {
  it('should save content after debounce delay', () => {});
  it('should show "saved" indicator', () => {});
  it('should restore content on reload', () => {});
  it('should handle localStorage errors gracefully', () => {});
});
```

---

## 🌐 E2E Tests (Playwright)

### Critical User Journeys

```typescript
// editor.spec.ts
test.describe('Editor', () => {
  test('should type markdown and see live preview', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="editor"]').fill('# Hello World');
    await expect(page.locator('[data-testid="preview"] h1')).toHaveText('Hello World');
  });

  test('should switch view modes', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="view-mode-editor"]');
    await expect(page.locator('[data-testid="preview"]')).not.toBeVisible();
    await page.click('[data-testid="view-mode-split"]');
    await expect(page.locator('[data-testid="preview"]')).toBeVisible();
  });

  test('should auto-save content', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="editor"]').fill('Test content');
    await page.waitForTimeout(500); // wait for debounce
    await page.reload();
    await expect(page.locator('[data-testid="editor"]')).toHaveValue('Test content');
  });
});

// fileOperations.spec.ts
test.describe('File Operations', () => {
  test('should open markdown file', async ({ page }) => {
    await page.goto('/');
    // Mock file picker
    await page.evaluate(() => {
      window.__mockFileContent = '# Test File';
    });
    await page.click('[data-testid="open-file"]');
    await expect(page.locator('[data-testid="editor"]')).toHaveValue('# Test File');
  });

  test('should show unsaved changes warning', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="editor"]').fill('New content');
    await page.click('[data-testid="new-file"]');
    await expect(page.locator('[data-testid="unsaved-warning"]')).toBeVisible();
  });
});

// export.spec.ts
test.describe('Export', () => {
  test('should trigger print dialog for PDF', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="editor"]').fill('# Export Test');
    
    let printCalled = false;
    await page.exposeFunction('__onPrint', () => { printCalled = true; });
    await page.evaluate(() => {
      window.print = () => window.__onPrint();
    });
    
    await page.click('[data-testid="export-pdf"]');
    expect(printCalled).toBe(true);
  });

  test('should download HTML export', async ({ page }) => {
    await page.goto('/');
    await page.locator('[data-testid="editor"]').fill('# HTML Test');
    
    const downloadPromise = page.waitForEvent('download');
    await page.click('[data-testid="export-html"]');
    const download = await downloadPromise;
    
    expect(download.suggestedFilename()).toMatch(/\.html$/);
  });
});

// themes.spec.ts
test.describe('Themes', () => {
  test('should toggle brand theme', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="theme-toggle"]');
    await expect(page.locator('html')).toHaveClass(/dark/);
    await page.click('[data-testid="theme-toggle"]');
    await expect(page.locator('html')).not.toHaveClass(/dark/);
  });

  test('should change preview theme', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="preview-theme-select"]');
    await page.click('[data-testid="theme-github-dark"]');
    await expect(page.locator('[data-testid="preview"]')).toHaveAttribute('data-theme', 'github-dark');
  });

  test('should persist themes after reload', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="theme-toggle"]'); // dark mode
    await page.reload();
    await expect(page.locator('html')).toHaveClass(/dark/);
  });
});

// accessibility.spec.ts
test.describe('Accessibility', () => {
  test('should have no axe violations on main page', async ({ page }) => {
    await page.goto('/');
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations).toEqual([]);
  });

  test('should support keyboard navigation', async ({ page }) => {
    await page.goto('/');
    await page.keyboard.press('Tab'); // focus first element
    await expect(page.locator(':focus')).toBeVisible();
  });

  test('should trap focus in modal', async ({ page }) => {
    await page.goto('/');
    await page.click('[data-testid="settings-button"]');
    await page.keyboard.press('Tab');
    // Focus should stay inside modal
    await expect(page.locator('[data-testid="modal"] :focus')).toBeVisible();
  });
});
```

---

## 📋 Test Coverage Requirements

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   COVERAGE THRESHOLDS                                                       │
│                                                                              │
│   Area                    │ Lines │ Branches │ Functions │ Statements       │
│   ────────────────────────┼───────┼──────────┼───────────┼──────────────    │
│   utils/                  │  90%  │   85%    │    90%    │    90%           │
│   hooks/                  │  85%  │   80%    │    85%    │    85%           │
│   services/               │  80%  │   75%    │    80%    │    80%           │
│   components/             │  75%  │   70%    │    75%    │    75%           │
│   ────────────────────────┼───────┼──────────┼───────────┼──────────────    │
│   OVERALL                 │  80%  │   75%    │    80%    │    80%           │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## 🔄 CI/CD Integration

```yaml
# .github/workflows/test.yml
name: Tests

on: [push, pull_request]

jobs:
  unit-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
      - run: npm ci
      - run: npm run test:unit
      - run: npm run test:coverage
      - uses: codecov/codecov-action@v3

  e2e-tests:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  accessibility:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run test:a11y
```

---

*Testing Strategy v1.0*  
*Created: 2026-01-20*