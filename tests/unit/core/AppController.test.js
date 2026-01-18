import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { AppController } from '../../../src/js/core/AppController.js';

// Mock services
vi.mock('../../../src/js/core/StorageManager');
vi.mock('../../../src/js/core/ThemeManager');
vi.mock('../../../src/js/services/MermaidService');
vi.mock('../../../src/js/services/PrismService');
vi.mock('../../../src/js/services/CodeBlockCopyService');
vi.mock('../../../src/js/services/PDFService');
vi.mock('../../../src/js/services/HTMLService');
vi.mock('../../../src/js/services/FolderBrowserService');
vi.mock('../../../src/js/services/LinkNavigationService');

// Mock external libs
vi.mock('marked', () => ({
  marked: {
    use: vi.fn(),
    parse: vi.fn(),
    parseInline: vi.fn(),
  },
}));
vi.mock('marked-footnote', () => ({ default: vi.fn() }));

describe('AppController', () => {
  let instance;

  beforeEach(() => {
    // Clear instance to allow fresh creation
    AppController.instance = null;

    // Mock basic DOM elements required by _setupEditor
    document.body.innerHTML = `
      <textarea id="markdown-editor"></textarea>
      <div id="markdown-preview"></div>
      <div class="editor-container"></div>
      <div class="preview-container"></div>
      <select id="theme-selector"></select>
      <button id="customize-btn"></button>
      <button id="export-html-btn"></button>
      <button id="export-pdf-btn"></button>
      <div id="customizer-modal"></div>
      <button id="close-modal"></button>
      <button id="reset-btn"></button>
      <button id="save-theme-btn"></button>
      <button id="editor-only-btn"></button>
      <button id="split-view-btn"></button>
      <button id="preview-only-btn"></button>
      <button id="sync-scroll-btn"></button>
      <button id="zoom-in-btn"></button>
      <button id="zoom-out-btn"></button>
      <button id="zoom-reset-btn"></button>
      <span id="zoom-level"></span>
      <div class="main-content"></div>
      <div id="split-resizer"></div>
      <div id="file-browser"></div>
      <button id="open-folder-btn"></button>
      <button id="refresh-folder-btn"></button>
      <button id="create-file-btn"></button>
      <button id="zen-mode-btn"></button>
      <button id="exit-zen-btn"></button>
      <div id="file-tree"></div>
      <span id="current-folder-name"></span>
      <span id="file-count"></span>
      <div id="create-file-modal"></div>
      <button id="close-create-file-modal"></button>
      <button id="cancel-create-file-btn"></button>
      <button id="confirm-create-file-btn"></button>
      <input id="new-file-name" />
      <select id="new-file-location"></select>
      <select id="new-file-template"></select>
      <div id="support-widget"></div>
      <div id="support-modal"></div>
      <button id="close-support-modal"></button>
      <input type="checkbox" id="support-dont-show-again" />
      <div id="pdf-modal"></div>
      <button id="close-pdf-modal"></button>
      <iframe id="pdf-preview-frame"></iframe>
      <button id="pdf-preview-btn"></button>
      <button id="pdf-download-btn"></button>
      <select id="pdf-page-size"></select>
      <select id="pdf-orientation"></select>
      <input id="pdf-margin-top" />
      <input id="pdf-margin-right" />
      <input id="pdf-margin-bottom" />
      <input id="pdf-margin-left" />
    `;

    // Mock getComputedStyle for initColorInputs
    window.getComputedStyle = vi.fn().mockReturnValue({ getPropertyValue: () => '#ffffff' });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should be a singleton', () => {
    const app1 = new AppController();
    const app2 = new AppController();
    expect(app1).toBe(app2);
  });

  it('should initialize services', () => {
    const app = new AppController();
    expect(app.storageManager).toBeDefined();
    expect(app.themeManager).toBeDefined();
    expect(app.mermaidService).toBeDefined();
  });

  it('should call internal setup methods during init', () => {
    const app = new AppController();
    const configureSpy = vi.spyOn(app, '_configureMarkedExtensions');
    const setupEditorSpy = vi.spyOn(app, '_setupEditor');

    app.init();

    expect(configureSpy).toHaveBeenCalled();
    expect(setupEditorSpy).toHaveBeenCalled();
  });
});
