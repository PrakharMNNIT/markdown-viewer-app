# 📄 Code Review: `docs/09-testing-strategy.md`

**Generated:** 1/20/2026, 4:22:32 PM
**Project:** AI Visual Code Review
**Review Type:** Individual File Analysis

## 📊 File Information

**Type:** Documentation 📖
**Path:** `docs/09-testing-strategy.md`
**Extension:** .md

## 📝 Changes

```diff
@@ -0,0 +1,445 @@
      1 +# 🧪 Testing Strategy
      2 +
      3 +## Markdown Preview EE — Test Plan & Coverage Targets
      4 +
      5 +**Document Type:** Quality Assurance  
      6 +**Version:** 1.0  
      7 +**Created:** 2026-01-20  
      8 +**Status:** Ready for Implementation
      9 +
     10 +---
     11 +
     12 +## 📊 Testing Overview
     13 +
     14 +```
     15 +┌─────────────────────────────────────────────────────────────────────────────┐
     16 +│                                                                              │
     17 +│   🎯 TESTING GOALS                                                          │
     18 +│                                                                              │
     19 +│   Coverage Targets:                                                         │
     20 +│   • Unit Tests: 80% coverage (business logic)                              │
     21 +│   • Integration Tests: 70% coverage (component interactions)               │
     22 +│   • E2E Tests: Critical user journeys (100%)                               │
     23 +│                                                                              │
     24 +│   Quality Gates:                                                            │
     25 +│   • All tests must pass before merge                                       │
     26 +│   • No decrease in coverage                                                │
     27 +│   • Zero critical/blocker bugs                                             │
     28 +│                                                                              │
     29 +└─────────────────────────────────────────────────────────────────────────────┘
     30 +```
     31 +
     32 +---
     33 +
     34 +## 🛠️ Testing Stack
     35 +
     36 +| Tool | Purpose | Config |
     37 +|------|---------|--------|
     38 +| **Vitest** | Unit & Integration tests | `vitest.config.ts` |
     39 +| **React Testing Library** | Component testing | Built-in |
     40 +| **Playwright** | E2E tests | `playwright.config.ts` |
     41 +| **axe-core** | Accessibility testing | Via Playwright |
     42 +| **MSW** | API mocking | Mock AI providers |
     43 +
     44 +---
     45 +
     46 +## 📁 Test Structure
     47 +
     48 +```
     49 +tests/
     50 +├── unit/
     51 +│   ├── hooks/
     52 +│   │   ├── useTheme.test.ts
     53 +│   │   ├── useLocalStorage.test.ts
     54 +│   │   └── useDebounce.test.ts
     55 +│   ├── utils/
     56 +│   │   ├── markdown.test.ts
     57 +│   │   ├── sanitize.test.ts
     58 +│   │   └── fileHelpers.test.ts
     59 +│   └── services/
     60 +│       ├── aiService.test.ts
     61 +│       └── exportService.test.ts
     62 +│
     63 +├── integration/
     64 +│   ├── components/
     65 +│   │   ├── Editor.test.tsx
     66 +│   │   ├── Preview.test.tsx
     67 +│   │   ├── ThemeSelector.test.tsx
     68 +│   │   └── FileTree.test.tsx
     69 +│   └── features/
     70 +│       ├── markdownRendering.test.tsx
     71 +│       ├── themeSwitch.test.tsx
     72 +│       └── autoSave.test.tsx
     73 +│
     74 +├── e2e/
     75 +│   ├── editor.spec.ts
     76 +│   ├── fileOperations.spec.ts
     77 +│   ├── export.spec.ts
     78 +│   ├── themes.spec.ts
     79 +│   └── accessibility.spec.ts
     80 +│
     81 +└── __mocks__/
     82 +    ├── fileSystemAccess.ts
     83 +    ├── aiProviders.ts
     84 +    └── localStorage.ts
     85 +```
     86 +
     87 +---
     88 +
     89 +## 🔬 Unit Tests
     90 +
     91 +### Hooks
     92 +
     93 +```typescript
     94 +// useTheme.test.ts
     95 +describe('useTheme', () => {
     96 +  it('should default to system preference', () => {});
     97 +  it('should toggle between light and dark', () => {});
     98 +  it('should persist preference to localStorage', () => {});
     99 +  it('should apply dark class to document root', () => {});
    100 +});
    101 +
    102 +// useDebounce.test.ts
    103 +describe('useDebounce', () => {
    104 +  it('should debounce value changes', () => {});
    105 +  it('should use specified delay', () => {});
    106 +  it('should cancel on unmount', () => {});
    107 +});
    108 +
    109 +// useLocalStorage.test.ts
    110 +describe('useLocalStorage', () => {
    111 +  it('should read initial value from localStorage', () => {});
    112 +  it('should write changes to localStorage', () => {});
    113 +  it('should handle JSON parse errors', () => {});
    114 +  it('should return default when key not found', () => {});
    115 +});
    116 +```
    117 +
    118 +### Utils
    119 +
    120 +```typescript
    121 +// markdown.test.ts
    122 +describe('markdown rendering', () => {
    123 +  it('should render headings correctly', () => {});
    124 +  it('should render tables with GFM syntax', () => {});
    125 +  it('should render task lists', () => {});
    126 +  it('should render code blocks with language', () => {});
    127 +  it('should render footnotes', () => {});
    128 +  it('should render autolinks', () => {});
    129 +});
    130 +
    131 +// sanitize.test.ts
    132 +describe('HTML sanitization', () => {
    133 +  it('should remove script tags', () => {});
    134 +  it('should remove onclick handlers', () => {});
    135 +  it('should allow safe tags', () => {});
    136 +  it('should strip dangerous attributes', () => {});
    137 +  it('should handle malformed HTML', () => {});
    138 +});
    139 +
    140 +// fileHelpers.test.ts
    141 +describe('file helpers', () => {
    142 +  it('should detect markdown files', () => {});
    143 +  it('should generate unique filenames', () => {});
    144 +  it('should handle file read errors', () => {});
    145 +});
    146 +```
    147 +
    148 +### Services
    149 +
    150 +```typescript
    151 +// aiService.test.ts
    152 +describe('AI Service', () => {
    153 +  describe('OpenAI', () => {
    154 +    it('should format request correctly', () => {});
    155 +    it('should parse response correctly', () => {});
    156 +    it('should handle rate limits', () => {});
    157 +    it('should handle network errors', () => {});
    158 +  });
    159 +  
    160 +  describe('Anthropic', () => {
    161 +    it('should format request correctly', () => {});
    162 +    it('should parse response correctly', () => {});
    163 +  });
    164 +  
    165 +  describe('Output Validation', () => {
    166 +    it('should strip markdown code fences', () => {});
    167 +    it('should strip preamble text', () => {});
    168 +    it('should detect word count changes', () => {});
    169 +  });
    170 +});
    171 +
    172 +// exportService.test.ts
    173 +describe('Export Service', () => {
    174 +  it('should generate valid HTML export', () => {});
    175 +  it('should embed theme CSS', () => {});
    176 +  it('should trigger print for PDF', () => {});
    177 +});
    178 +```
    179 +
    180 +---
    181 +
    182 +## 🔗 Integration Tests
    183 +
    184 +### Components
    185 +
    186 +```typescript
    187 +// Editor.test.tsx
    188 +describe('Editor Component', () => {
    189 +  it('should render textarea with monospace font', () => {});
    190 +  it('should update content on input', () => {});
    191 +  it('should call onChange with debounced value', () => {});
    192 +  it('should show line numbers when enabled', () => {});
    193 +  it('should support tab key for indentation', () => {});
    194 +});
    195 +
    196 +// Preview.test.tsx
    197 +describe('Preview Component', () => {
    198 +  it('should render markdown content', () => {});
    199 +  it('should apply preview theme', () => {});
    200 +  it('should render Mermaid diagrams', () => {});
    201 +  it('should render KaTeX math', () => {});
    202 +  it('should sanitize HTML', () => {});
    203 +  it('should handle large content without lag', () => {});
    204 +});
    205 +
    206 +// ThemeSelector.test.tsx
    207 +describe('Theme Selector', () => {
    208 +  it('should list all available themes', () => {});
    209 +  it('should show current theme as selected', () => {});
    210 +  it('should call onChange with theme name', () => {});
    211 +  it('should close dropdown after selection', () => {});
    212 +});
    213 +```
    214 +
    215 +### Features
    216 +
    217 +```typescript
    218 +// markdownRendering.test.tsx
    219 +describe('Markdown Rendering', () => {
    220 +  it('should render heading hierarchy', () => {});
    221 +  it('should render nested lists', () => {});
    222 +  it('should render code with syntax highlighting', () => {});
    223 +  it('should render tables with alignment', () => {});
    224 +  it('should render blockquotes with nesting', () => {});
    225 +  it('should render images with alt text', () => {});
    226 +  it('should render links with target blank', () => {});
    227 +});
    228 +
    229 +// themeSwitch.test.tsx
    230 +describe('Theme Switching', () => {
    231 +  it('should switch brand theme without affecting preview', () => {});
    232 +  it('should switch preview theme without affecting chrome', () => {});
    233 +  it('should persist both themes independently', () => {});
    234 +  it('should apply correct CSS variables', () => {});
    235 +});
    236 +
    237 +// autoSave.test.tsx
    238 +describe('Auto Save', () => {
    239 +  it('should save content after debounce delay', () => {});
    240 +  it('should show "saved" indicator', () => {});
    241 +  it('should restore content on reload', () => {});
    242 +  it('should handle localStorage errors gracefully', () => {});
    243 +});
    244 +```
    245 +
    246 +---
    247 +
    248 +## 🌐 E2E Tests (Playwright)
    249 +
    250 +### Critical User Journeys
    251 +
    252 +```typescript
    253 +// editor.spec.ts
    254 +test.describe('Editor', () => {
    255 +  test('should type markdown and see live preview', async ({ page }) => {
    256 +    await page.goto('/');
    257 +    await page.locator('[data-testid="editor"]').fill('# Hello World');
    258 +    await expect(page.locator('[data-testid="preview"] h1')).toHaveText('Hello World');
    259 +  });
    260 +
    261 +  test('should switch view modes', async ({ page }) => {
    262 +    await page.goto('/');
    263 +    await page.click('[data-testid="view-mode-editor"]');
    264 +    await expect(page.locator('[data-testid="preview"]')).not.toBeVisible();
    265 +    await page.click('[data-testid="view-mode-split"]');
    266 +    await expect(page.locator('[data-testid="preview"]')).toBeVisible();
    267 +  });
    268 +
    269 +  test('should auto-save content', async ({ page }) => {
    270 +    await page.goto('/');
    271 +    await page.locator('[data-testid="editor"]').fill('Test content');
    272 +    await page.waitForTimeout(500); // wait for debounce
    273 +    await page.reload();
    274 +    await expect(page.locator('[data-testid="editor"]')).toHaveValue('Test content');
    275 +  });
    276 +});
    277 +
    278 +// fileOperations.spec.ts
    279 +test.describe('File Operations', () => {
    280 +  test('should open markdown file', async ({ page }) => {
    281 +    await page.goto('/');
    282 +    // Mock file picker
    283 +    await page.evaluate(() => {
    284 +      window.__mockFileContent = '# Test File';
    285 +    });
    286 +    await page.click('[data-testid="open-file"]');
    287 +    await expect(page.locator('[data-testid="editor"]')).toHaveValue('# Test File');
    288 +  });
    289 +
    290 +  test('should show unsaved changes warning', async ({ page }) => {
    291 +    await page.goto('/');
    292 +    await page.locator('[data-testid="editor"]').fill('New content');
    293 +    await page.click('[data-testid="new-file"]');
    294 +    await expect(page.locator('[data-testid="unsaved-warning"]')).toBeVisible();
    295 +  });
    296 +});
    297 +
    298 +// export.spec.ts
    299 +test.describe('Export', () => {
    300 +  test('should trigger print dialog for PDF', async ({ page }) => {
    301 +    await page.goto('/');
    302 +    await page.locator('[data-testid="editor"]').fill('# Export Test');
    303 +    
    304 +    let printCalled = false;
    305 +    await page.exposeFunction('__onPrint', () => { printCalled = true; });
    306 +    await page.evaluate(() => {
    307 +      window.print = () => window.__onPrint();
    308 +    });
    309 +    
    310 +    await page.click('[data-testid="export-pdf"]');
    311 +    expect(printCalled).toBe(true);
    312 +  });
    313 +
    314 +  test('should download HTML export', async ({ page }) => {
    315 +    await page.goto('/');
    316 +    await page.locator('[data-testid="editor"]').fill('# HTML Test');
    317 +    
    318 +    const downloadPromise = page.waitForEvent('download');
    319 +    await page.click('[data-testid="export-html"]');
    320 +    const download = await downloadPromise;
    321 +    
    322 +    expect(download.suggestedFilename()).toMatch(/\.html$/);
    323 +  });
    324 +});
    325 +
    326 +// themes.spec.ts
    327 +test.describe('Themes', () => {
    328 +  test('should toggle brand theme', async ({ page }) => {
    329 +    await page.goto('/');
    330 +    await page.click('[data-testid="theme-toggle"]');
    331 +    await expect(page.locator('html')).toHaveClass(/dark/);
    332 +    await page.click('[data-testid="theme-toggle"]');
    333 +    await expect(page.locator('html')).not.toHaveClass(/dark/);
    334 +  });
    335 +
    336 +  test('should change preview theme', async ({ page }) => {
    337 +    await page.goto('/');
    338 +    await page.click('[data-testid="preview-theme-select"]');
    339 +    await page.click('[data-testid="theme-github-dark"]');
    340 +    await expect(page.locator('[data-testid="preview"]')).toHaveAttribute('data-theme', 'github-dark');
    341 +  });
    342 +
    343 +  test('should persist themes after reload', async ({ page }) => {
    344 +    await page.goto('/');
    345 +    await page.click('[data-testid="theme-toggle"]'); // dark mode
    346 +    await page.reload();
    347 +    await expect(page.locator('html')).toHaveClass(/dark/);
    348 +  });
    349 +});
    350 +
    351 +// accessibility.spec.ts
    352 +test.describe('Accessibility', () => {
    353 +  test('should have no axe violations on main page', async ({ page }) => {
    354 +    await page.goto('/');
    355 +    const results = await new AxeBuilder({ page }).analyze();
    356 +    expect(results.violations).toEqual([]);
    357 +  });
    358 +
    359 +  test('should support keyboard navigation', async ({ page }) => {
    360 +    await page.goto('/');
    361 +    await page.keyboard.press('Tab'); // focus first element
    362 +    await expect(page.locator(':focus')).toBeVisible();
    363 +  });
    364 +
    365 +  test('should trap focus in modal', async ({ page }) => {
    366 +    await page.goto('/');
    367 +    await page.click('[data-testid="settings-button"]');
    368 +    await page.keyboard.press('Tab');
    369 +    // Focus should stay inside modal
    370 +    await expect(page.locator('[data-testid="modal"] :focus')).toBeVisible();
    371 +  });
    372 +});
    373 +```
    374 +
    375 +---
    376 +
    377 +## 📋 Test Coverage Requirements
    378 +
    379 +```
    380 +┌─────────────────────────────────────────────────────────────────────────────┐
    381 +│                                                                              │
    382 +│   COVERAGE THRESHOLDS                                                       │
    383 +│                                                                              │
    384 +│   Area                    │ Lines │ Branches │ Functions │ Statements       │
    385 +│   ────────────────────────┼───────┼──────────┼───────────┼──────────────    │
    386 +│   utils/                  │  90%  │   85%    │    90%    │    90%           │
    387 +│   hooks/                  │  85%  │   80%    │    85%    │    85%           │
    388 +│   services/               │  80%  │   75%    │    80%    │    80%           │
    389 +│   components/             │  75%  │   70%    │    75%    │    75%           │
    390 +│   ────────────────────────┼───────┼──────────┼───────────┼──────────────    │
    391 +│   OVERALL                 │  80%  │   75%    │    80%    │    80%           │
    392 +│                                                                              │
    393 +└─────────────────────────────────────────────────────────────────────────────┘
    394 +```
    395 +
    396 +---
    397 +
    398 +## 🔄 CI/CD Integration
    399 +
    400 +```yaml
    401 +# .github/workflows/test.yml
    402 +name: Tests
    403 +
    404 +on: [push, pull_request]
    405 +
    406 +jobs:
    407 +  unit-tests:
    408 +    runs-on: ubuntu-latest
    409 +    steps:
    410 +      - uses: actions/checkout@v4
    411 +      - uses: actions/setup-node@v4
    412 +        with:
    413 +          node-version: '20'
    414 +      - run: npm ci
    415 +      - run: npm run test:unit
    416 +      - run: npm run test:coverage
    417 +      - uses: codecov/codecov-action@v3
    418 +
    419 +  e2e-tests:
    420 +    runs-on: ubuntu-latest
    421 +    steps:
    422 +      - uses: actions/checkout@v4
    423 +      - uses: actions/setup-node@v4
    424 +      - run: npm ci
    425 +      - run: npx playwright install --with-deps
    426 +      - run: npm run test:e2e
    427 +      - uses: actions/upload-artifact@v3
    428 +        if: failure()
    429 +        with:
    430 +          name: playwright-report
    431 +          path: playwright-report/
    432 +
    433 +  accessibility:
    434 +    runs-on: ubuntu-latest
    435 +    steps:
    436 +      - uses: actions/checkout@v4
    437 +      - uses: actions/setup-node@v4
    438 +      - run: npm ci
    439 +      - run: npm run test:a11y
    440 +```
    441 +
    442 +---
    443 +
    444 +*Testing Strategy v1.0*  
    445 +*Created: 2026-01-20*
    446   No newline at end of file
  1 447  

```

## 🤖 Comprehensive Review Checklist

### ✅ Code Quality & Standards
- [ ] **Syntax & Formatting**: Consistent indentation, proper spacing
- [ ] **Naming Conventions**: Clear, descriptive variable/function names
- [ ] **Code Structure**: Logical organization, appropriate function size
- [ ] **Documentation**: Clear comments explaining complex logic
- [ ] **Type Safety**: Proper typing (if applicable)

### 🔍 Logic & Functionality
- [ ] **Algorithm Correctness**: Logic implements requirements correctly
- [ ] **Edge Case Handling**: Boundary conditions properly addressed
- [ ] **Error Handling**: Appropriate try-catch blocks and error messages
- [ ] **Performance**: Efficient algorithms, no unnecessary loops
- [ ] **Memory Management**: Proper cleanup, no memory leaks

### 🐛 Potential Issues & Bugs
- [ ] **Runtime Errors**: No null/undefined dereferencing
- [ ] **Type Mismatches**: Consistent data types throughout
- [ ] **Race Conditions**: Proper async/await handling
- [ ] **Resource Leaks**: Event listeners, timers properly cleaned up
- [ ] **Off-by-one Errors**: Array/loop bounds correctly handled

### 🔒 Security Considerations
- [ ] **Input Validation**: User inputs properly sanitized
- [ ] **XSS Prevention**: No unsafe HTML injection
- [ ] **Authentication**: Proper access controls if applicable
- [ ] **Data Exposure**: No sensitive information in logs/client
- [ ] **Dependency Security**: No known vulnerable packages

### 📱 User Experience & Accessibility
- [ ] **Responsive Design**: Works on different screen sizes
- [ ] **Loading States**: Proper feedback during operations
- [ ] **Error Messages**: User-friendly error communication
- [ ] **Accessibility**: ARIA labels, keyboard navigation
- [ ] **Performance**: Fast loading, smooth interactions

### 💡 Improvement Suggestions

#### Code Organization
- [ ] Consider extracting complex logic into separate functions
- [ ] Evaluate if constants should be moved to configuration
- [ ] Check for code duplication opportunities

#### Performance Optimizations
- [ ] Identify opportunities for memoization
- [ ] Consider lazy loading for heavy operations
- [ ] Evaluate database query efficiency (if applicable)

#### Testing Recommendations
- [ ] Unit tests for core functionality
- [ ] Integration tests for API endpoints
- [ ] Edge case testing scenarios

#### Documentation Needs
- [ ] API documentation updates
- [ ] Code comments for complex algorithms
- [ ] README updates if public interfaces changed

### 📝 Review Notes
*Add your specific feedback, suggestions, and observations here:*

---
*Individual file review generated by AI Visual Code Review v2.0*
*Generated: 2026-01-20T10:52:32.243Z*
