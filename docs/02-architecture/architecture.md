# 🏗️ Architecture Documentation

**Markdown Viewer Pro - Technical Architecture Guide**

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architectural Principles](#architectural-principles)
3. [System Architecture](#system-architecture)
4. [Module Specifications](#module-specifications)
5. [Design Patterns](#design-patterns)
6. [Data Flow](#data-flow)
7. [Testing Strategy](#testing-strategy)
8. [Performance Considerations](#performance-considerations)
9. [Security Model](#security-model)
10. [Extension Guide](#extension-guide)

---

## Overview

### Project Philosophy

Markdown Viewer Pro is built on three core principles:

1. **Separation of Concerns** - Each module has a single, well-defined responsibility
2. **Testability First** - All business logic is isolated and testable
3. **Zero Technical Debt** - Maintain production-grade quality at all times

### Architecture Goals

- ✅ **Scalability** - Easy to add new features without touching existing code
- ✅ **Maintainability** - Clear, self-documenting code structure
- ✅ **Testability** - 100% of business logic covered by tests
- ✅ **Performance** - Minimal overhead, optimized for speed
- ✅ **Reliability** - Error handling at every layer

---

## Architectural Principles

### 1. SOLID Principles

#### Single Responsibility Principle

Each class has one reason to change:

- `StorageManager` - Only handles localStorage operations
- `ThemeManager` - Only handles theme operations
- `MermaidService` - Only handles Mermaid rendering
- `PrismService` - Only handles syntax highlighting

#### Open/Closed Principle

Classes are open for extension, closed for modification:

- New themes can be added without modifying `ThemeManager`
- New storage backends could be added without modifying consumers

#### Liskov Substitution Principle

Services implement clear contracts:

- All services have consistent `isReady()` method
- All services handle errors uniformly

#### Interface Segregation Principle

Clients depend only on methods they use:

- `StorageManager` exposes specific get/set/JSON methods
- `ThemeManager` exposes only theme-related operations

#### Dependency Inversion Principle

High-level modules depend on abstractions:

- `ThemeManager` receives `StorageManager` as dependency
- Services don't depend on concrete implementations

### 2. DRY (Don't Repeat Yourself)

- Constants extracted to `constants.js`
- Common utilities in `utils/` directory
- Shared validation logic in `validators.js`

### 3. KISS (Keep It Simple, Stupid)

- Each function does one thing well
- Clear naming conventions
- Minimal abstraction layers
- Direct, readable code

### 4. YAGNI (You Aren't Gonna Need It)

- No speculative features
- Build what's needed now
- Refactor when patterns emerge

---

## System Architecture

### High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         UI Layer                            │
│                       (index.html)                          │
└────────────────────┬────────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────────┐
│                   Application Layer                         │
│                     (script.js)                             │
│  • Orchestrates all modules                                 │
│  • Handles user interactions                                │
│  • Manages application lifecycle                            │
└─────┬──────────┬─────────────┬──────────────┬───────────────┘
      │          │             │              │
┌─────▼──┐  ┌───▼─────┐  ┌────▼─────┐  ┌────▼─────┐
│ Core   │  │Services │  │ Utils    │  │ Config   │
│ Layer  │  │  Layer  │  │  Layer   │  │  Layer   │
└────────┘  └─────────┘  └──────────┘  └──────────┘
     │           │             │              │
     │           │             │              │
┌────▼───────────▼─────────────▼──────────────▼────┐
│            External Dependencies                  │
│  • localStorage (browser API)                     │
│  • Marked.js (markdown parsing)                   │
│  • Prism.js (syntax highlighting)                 │
│  • Mermaid.js (diagram rendering)                 │
└───────────────────────────────────────────────────┘
```

### Layer Responsibilities

#### **UI Layer** (index.html)

- Presents interface to user
- Captures user input
- Displays rendered output

#### **Application Layer** (script.js)

- Entry point for the application
- Initializes all modules
- Coordinates between layers
- Handles DOM events
- Manages application state

#### **Core Layer** (src/js/core/)

- **StorageManager**: Data persistence abstraction
- **ThemeManager**: Theme loading and management

#### **Services Layer** (src/js/services/)

- **MermaidService**: Diagram rendering with theme integration
- **PrismService**: Code syntax highlighting

#### **Utils Layer** (src/js/utils/)

- **htmlHelpers**: DOM manipulation utilities
- **colorHelpers**: CSS variable management
- **validators**: Input validation and constraints

#### **Config Layer** (src/js/config/)

- **constants**: Application-wide constants
- **featureFlags**: Feature toggle system

---

## Module Specifications

### Core Modules

#### StorageManager

**Purpose**: Abstract localStorage operations with error handling

**Public API**:

```javascript
class StorageManager {
  get(key: string): string | null
  set(key: string, value: string): boolean
  getJSON(key: string): any | null
  setJSON(key: string, value: any): boolean
  remove(key: string): boolean
  has(key: string): boolean
  clear(): boolean
  getAllKeys(): string[]
  getSize(): number
  isAvailable(): boolean
}
```

**Error Handling**:

- All methods wrapped in try-catch
- Returns null/false on error
- Logs errors to console
- Never throws exceptions to caller

**Testing**: 18 unit tests covering all methods and error scenarios

---

#### ThemeManager

**Purpose**: Manage theme loading, switching, and persistence

**Public API**:

```javascript
class ThemeManager {
  constructor(storageManager: StorageManager)

  async loadTheme(themeName: string): Promise<boolean>
  saveCustomTheme(colors: Object): boolean
  getCurrentTheme(): string | null
  getCurrentColors(): Object
  setThemeChangeListener(callback: Function): void
  getAvailableThemes(): string[]
  themeExists(themeName: string): boolean
}
```

**Dependencies**:

- `StorageManager` (injected)
- `constants.js` (THEMES, STORAGE_KEYS)
- `validators.js` (isValidTheme)
- `colorHelpers.js` (getCssVariable, setCssVariable)

**Design Patterns**:

- **Dependency Injection**: Receives StorageManager
- **Observer Pattern**: Theme change notifications
- **Strategy Pattern**: Different loading for built-in vs custom themes

**Testing**: 16 unit tests with mocked dependencies

---

### Service Modules

#### MermaidService

**Purpose**: Render Mermaid diagrams with theme-aware configuration

**Public API**:

```javascript
class MermaidService {
  initialize(): void
  async render(id: string, code: string): Promise<string>
  isReady(): boolean
  reinitialize(): void
}
```

**Key Features**:

- Extracts theme colors from CSS variables
- Configures Mermaid with current theme
- Auto-initializes on first render
- Reinitializes on theme change

**Error Handling**:

- Throws meaningful errors on failure
- Checks Mermaid library availability
- Handles invalid diagram syntax

**Testing**: 11 unit tests with mocked Mermaid library

---

#### PrismService

**Purpose**: Apply syntax highlighting to code blocks

**Public API**:

```javascript
class PrismService {
  highlightAll(container: HTMLElement): number
  highlightElement(block: HTMLElement): boolean
  isReady(): boolean
  getSupportedLanguages(): string[]
}
```

**Key Features**:

- Batch highlighting with error recovery
- Continues if one block fails
- Returns count of successful highlights
- Language detection support

**Error Handling**:

- Graceful degradation if Prism unavailable
- Individual block error handling
- Returns false/0 on failure, never throws

**Testing**: 12 unit tests covering all scenarios

---

### Utility Modules

#### htmlHelpers

**Functions**:

```javascript
decodeHtmlEntities(text: string): string
createBlobUrl(content: string, type: string): string
downloadFile(url: string, filename: string): void
generateId(prefix: string): string
```

**Use Cases**:

- Decode HTML entities in Mermaid diagrams
- Create blob URLs for exports
- Trigger file downloads
- Generate unique element IDs

---

#### colorHelpers

**Functions**:

```javascript
getCssVariable(name: string): string
setCssVariable(name: string, value: string): void
removeCssVariable(name: string): void
getAllCssVariables(names: string[]): Object
clearAllCssVariableOverrides(): void
isValidCssColor(color: string): boolean
```

**Use Cases**:

- Read CSS custom properties
- Set inline style overrides
- Clean up custom theme applications
- Validate color values

---

#### validators

**Functions**:

```javascript
constrainZoom(level: number): number
isValidTheme(themeName: string): boolean
isValidColor(color: string): boolean
isValidStorageKey(key: string): boolean
sanitizeFilename(filename: string): string
```

**Use Cases**:

- Constrain zoom level (50-200%)
- Validate theme names
- Validate color formats
- Sanitize user input

---

### Configuration

#### constants.js

**Groups** (12 total):

```javascript
ZOOM: { MIN, MAX, DEFAULT, STEP }
STORAGE_KEYS: { MARKDOWN_CONTENT, SELECTED_THEME, ... }
THEMES: { DEFAULT_LIGHT, OCEAN_DARK, ... }
VIEW_MODES: { EDITOR_ONLY, SPLIT_VIEW, PREVIEW_ONLY }
ELEMENT_IDS: { EDITOR, PREVIEW, THEME_SELECTOR, ... }
MERMAID_CONFIG: { START_ON_LOAD, THEME }
PDF_CONFIG: { MARGIN, FILENAME, ... }
```

**Purpose**:

- Eliminate magic numbers
- Centralize configuration
- Easy to modify without code changes
- Type-safe constants

---

## Design Patterns

### 1. Service Layer Pattern

**What**: Isolate business logic from UI code

**Implementation**:

```javascript
// Services don't know about DOM
class MermaidService {
  async render(id, code) {
    // Pure business logic
    return await mermaid.render(id, code);
  }
}

// Application layer handles DOM
const svg = await mermaidService.render(id, code);
element.innerHTML = svg;
```

**Benefits**:

- Services are independently testable
- Business logic reusable across contexts
- Clear separation of concerns

---

### 2. Observer Pattern

**What**: Notify dependents of state changes

**Implementation**:

```javascript
class ThemeManager {
  setThemeChangeListener(callback) {
    this.onThemeChange = callback;
  }

  notifyThemeChange(themeName) {
    if (this.onThemeChange) {
      this.onThemeChange(themeName);
    }
  }
}

// Usage
themeManager.setThemeChangeListener(() => {
  mermaidService.reinitialize();
});
```

**Benefits**:

- Loose coupling between modules
- Easy to add new listeners
- Clear dependency relationships

---

### 3. Dependency Injection

**What**: Pass dependencies rather than creating them

**Implementation**:

```javascript
class ThemeManager {
  constructor(storageManager) {
    this.storage = storageManager; // Injected!
  }
}

// Application layer provides dependency
const storage = new StorageManager();
const themeManager = new ThemeManager(storage);
```

**Benefits**:

- Easy to test with mocks
- Flexible dependency swapping
- Clear dependency graph

---

### 4. Facade Pattern

**What**: Provide simplified interface to complex subsystems

**Implementation**:

```javascript
// Complex: Manual theme application
document.documentElement.style.setProperty('--h1-color', '#ff0000');
// ...50 more lines

// Simple: Facade
await themeManager.loadTheme('ocean-dark');
```

**Benefits**:

- Hides complexity
- Consistent API
- Easier to use correctly

---

### 5. Strategy Pattern

**What**: Select algorithm at runtime

**Implementation**:

```javascript
class ThemeManager {
  async loadTheme(themeName) {
    if (themeName === 'custom') {
      return this.loadCustomTheme(); // Strategy 1
    }
    return this.loadBuiltInTheme(themeName); // Strategy 2
  }
}
```

**Benefits**:

- Different behaviors without conditionals
- Easy to add new strategies
- Testable in isolation

---

## Data Flow

### Application Initialization

```
1. DOMContentLoaded fires
2. Initialize all services
   ├─ storageManager = new StorageManager()
   ├─ themeManager = new ThemeManager(storageManager)
   ├─ mermaidService = new MermaidService()
   └─ prismService = new PrismService()
3. Configure observers
   └─ themeManager.setThemeChangeListener(...)
4. Initialize external libraries
   └─ mermaidService.initialize()
5. Load user preferences
   ├─ Load saved theme
   ├─ Load saved content
   └─ Load saved view mode
6. Render initial content
```

---

### Theme Change Flow

```
User clicks theme dropdown
       │
       ▼
themeSelector.change event
       │
       ▼
changeTheme(themeName)
       │
       ▼
themeManager.loadTheme(themeName)
       │
       ├─ Validate theme name
       ├─ Load theme (built-in or custom)
       ├─ Save to storage
       └─ Notify observers
       │
       ▼
Observer: mermaidService.reinitialize()
       │
       ├─ Re-extract CSS colors
       └─ Reconfigure Mermaid
       │
       ▼
renderMarkdown()
       │
       └─ Re-render with new theme
```

---

### Content Rendering Flow

```
User types in editor
       │
       ▼
editor.input event
       │
       ▼
renderMarkdown()
       │
       ├─ Parse markdown (Marked.js)
       ├─ Process Mermaid blocks
       │  ├─ Decode HTML entities
       │  ├─ Generate unique ID
       │  └─ Async: mermaidService.render()
       ├─ Set preview.innerHTML
       ├─ Highlight code (PrismService)
       └─ Save content (StorageManager)
```

---

## Testing Strategy

### Test Pyramid

```
        /\
       /  \          10% - End-to-End (Baseline)
      /────\         30% - Integration (Baseline)
     /      \        60% - Unit (Module Tests)
    /________\
```

### Test Categories

#### 1. Baseline Tests (98 tests)

- **Purpose**: Ensure core functionality never breaks
- **Scope**: Full application behavior
- **Coverage**: User journeys, edge cases, error scenarios
- **Location**: `tests/baseline/current-functionality.test.js`

#### 2. Unit Tests (57 tests)

- **Purpose**: Test individual modules in isolation
- **Scope**: Single module/class
- **Coverage**: All public methods, error paths
- **Location**: `tests/unit/services/`, `tests/unit/core/`

#### 3. Mocking Strategy

```javascript
// Mock external dependencies
const mockMermaid = {
  initialize: vi.fn(),
  render: vi.fn().mockResolvedValue({ svg: '<svg>...</svg>' }),
};
global.mermaid = mockMermaid;

// Mock injected dependencies
const mockStorage = {
  get: vi.fn(),
  set: vi.fn().mockReturnValue(true),
};
```

### Test Organization

```
tests/
├── setup.js                    # Global test configuration
├── baseline/                   # Integration tests
│   └── current-functionality.test.js
└── unit/                       # Unit tests
    ├── services/
    │   ├── MermaidService.test.js
    │   └── PrismService.test.js
    └── core/
        ├── StorageManager.test.js
        └── ThemeManager.test.js
```

### Coverage Goals

- **Overall**: >85%
- **Core modules**: 100%
- **Services**: >90%
- **Utilities**: >80%

### Testing Best Practices

1. **Arrange-Act-Assert** pattern
2. One assertion concept per test
3. Clear, descriptive test names
4. Independent tests (no shared state)
5. Mock external dependencies
6. Test error paths
7. Test edge cases

---

## Performance Considerations

### Optimization Strategies

#### 1. Lazy Initialization

```javascript
async render(id, code) {
  if (!this.initialized) {
    this.initialize();  // Initialize on first use
  }
  return await mermaid.render(id, code);
}
```

#### 2. Debouncing

```javascript
// User input debounced to reduce re-renders
editor.addEventListener('input', debounce(renderMarkdown, 300));
```

#### 3. Efficient DOM Updates

```javascript
// Batch DOM updates
preview.innerHTML = html; // Single update
prismService.highlightAll(preview); // Batch highlight
```

#### 4. Async Operations

```javascript
// Non-blocking theme loading
await themeManager.loadTheme(themeName);

// Async Mermaid rendering
setTimeout(() => {
  mermaidService.render(id, code);
}, 100);
```

### Performance Metrics

| Metric                | Target | Actual |
| --------------------- | ------ | ------ |
| Bundle Size (gzipped) | <100KB | ~80KB  |
| First Paint           | <500ms | ~300ms |
| Time to Interactive   | <1s    | ~800ms |
| Markdown Parse        | <50ms  | ~20ms  |
| Theme Switch          | <100ms | ~60ms  |

---

## Security Model

### Input Validation

```javascript
// All user input validated
const constrainedZoom = constrainZoom(userZoom); // 50-200
const validTheme = isValidTheme(themeName); // Whitelist

// HTML encoding
const decodedCode = decodeHtmlEntities(code);
```

### XSS Prevention

1. **Marked.js Configuration**: Sanitize HTML
2. **HTML Entity Encoding**: Before Mermaid rendering
3. **Content Security Policy**: Recommended in production

### Secure Storage

- No sensitive data in localStorage
- Theme data only (user preferences)
- No credentials, no PII

### Dependency Security

```bash
# Regular audits
npm audit

# No known vulnerabilities in dependencies
# Auto-update with dependabot/renovate
```

---

## Extension Guide

### Adding a New Service

1. **Create Service File**: `src/js/services/NewService.js`

```javascript
export class NewService {
  constructor() {
    this.initialized = false;
  }

  initialize() {
    // Setup logic
    this.initialized = true;
  }

  isReady() {
    return this.initialized;
  }
}
```

2. **Import in script.js**:

```javascript
import { NewService } from './src/js/services/NewService.js';
const newService = new NewService();
```

3. **Create Tests**: `tests/unit/services/NewService.test.js`

---

### Adding a New Theme

1. **Create Theme File**: `themes/mytheme-dark.css`

```css
:root {
  --bg-primary: #1a1a1a;
  --text-primary: #e0e0e0;
  /* ...all other variables... */
}
```

2. **Add to Dropdown**: `index.html`

```html
<optgroup label="My Theme">
  <option value="mytheme-dark">My Theme Dark</option>
</optgroup>
```

3. **Add to Constants**: `src/js/config/constants.js`

```javascript
export const THEMES = {
  // ...existing themes
  MYTHEME_DARK: 'mytheme-dark',
};
```

---

### Adding a New Utility

1. **Add Function**: `src/js/utils/myHelper.js`

```javascript
export function myHelper(input) {
  // Implementation
  return output;
}
```

2. **Import Where Needed**:

```javascript
import { myHelper } from './src/js/utils/myHelper.js';
```

3. **Write Tests**: `tests/unit/utils/myHelper.test.js`

---

## Future Considerations

### Potential Enhancements

1. **Plugin System**: Allow third-party extensions
2. **Real-time Collaboration**: Multi-user editing
3. **Cloud Sync**: Cross-device synchronization
4. **TypeScript Migration**: Type safety throughout
5. **Web Components**: Reusable UI components
6. **PWA Support**: Offline functionality
7. **Backend Integration**: Optional server-side storage
8. **Version Control**: Built-in git integration

### Scalability Path

```
Current: Single-page application
  ↓
Next: Multi-page with routing
  ↓
Future: Micro-frontend architecture
  ↓
Enterprise: Distributed system
```

---

## Conclusion

Markdown Viewer Pro demonstrates enterprise-grade frontend architecture through:

✅ **Clear separation of concerns**
✅ **Proven design patterns**
✅ **Comprehensive testing**
✅ **Production-ready code quality**
✅ **Zero technical debt**

This architecture serves as a foundation for continued growth and enhancement while maintaining code quality and maintainability.

---

**Last Updated**: November 9, 2025
**Architecture Version**: 2.0
**Maintainer**: Development Team
