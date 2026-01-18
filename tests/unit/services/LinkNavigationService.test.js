import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { LinkNavigationService } from '../../../src/js/services/LinkNavigationService';

// Mock path helpers
vi.mock('../../../src/js/utils/pathHelpers.js', () => ({
  isAnchorLink: vi.fn(href => href.startsWith('#')),
  isExternalUrl: vi.fn(href => href.startsWith('http')),
  isMarkdownFile: vi.fn(href => href.endsWith('.md')),
  normalizePath: vi.fn(path => path.replace(/^\/+/, '')),
  resolveRelativePath: vi.fn((base, relative) => `${base}/${relative}`.replace('//', '/')),
}));

describe('LinkNavigationService', () => {
  let service;
  let mockFolderService;
  let mockOnNavigate;
  let container;

  beforeEach(() => {
    mockFolderService = {};
    mockOnNavigate = vi.fn();
    service = new LinkNavigationService(mockFolderService, mockOnNavigate);
    container = document.createElement('div');
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Initialization', () => {
    it('should attach click listener to container', () => {
      const addSpy = vi.spyOn(container, 'addEventListener');
      service.initialize(container);
      expect(addSpy).toHaveBeenCalledWith('click', expect.any(Function));
    });

    it('should log error if container missing', () => {
      const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { });
      service.initialize(null);
      expect(consoleSpy).toHaveBeenCalledWith('[LinkNav] Preview container not found');
    });
  });

  describe('Link Handling', () => {
    beforeEach(() => {
      service.initialize(container);
      service.navigateToMarkdownFile = vi.fn();
    });

    it('should ignore anchor links', () => {
      const link = document.createElement('a');
      link.href = '#anchor';
      link.setAttribute('href', '#anchor');
      container.appendChild(link);

      link.click();
      expect(service.navigateToMarkdownFile).not.toHaveBeenCalled();
    });

    it('should ignore external links', () => {
      const link = document.createElement('a');
      link.href = 'https://google.com';
      link.setAttribute('href', 'https://google.com');
      container.appendChild(link);

      link.click();
      expect(service.navigateToMarkdownFile).not.toHaveBeenCalled();
    });

    it('should handle markdown file links', () => {
      const link = document.createElement('a');
      link.href = 'doc.md';
      link.setAttribute('href', 'doc.md');
      container.appendChild(link);

      // Prevent actual navigation in JSDOM
      link.addEventListener('click', e => e.preventDefault());

      link.click();
      expect(service.navigateToMarkdownFile).toHaveBeenCalledWith('doc.md');
    });
  });

  describe('File Cache', () => {
    it('should recursive build cache', async () => {
      const mockFile = { kind: 'file', name: 'test.md' };
      const mockDir = {
        kind: 'directory',
        values: function* () {
          yield mockFile;
        },
      };

      await service.buildFileCache(mockDir);
      expect(service.fileHandleCache.size).toBe(1);
      expect(service.fileHandleCache.get('test.md')).toBe(mockFile);
    });
  });

  describe('Navigation', () => {
    it('should load file if in cache', async () => {
      // Setup cache
      const mockHandle = {
        getFile: vi.fn().mockResolvedValue({
          name: 'target.md',
          text: vi.fn().mockResolvedValue('# Content'),
        }),
      };
      service.fileHandleCache.set('current.md/target.md', mockHandle);
      service.currentFilePath = 'current.md';

      // Execute
      await service.navigateToMarkdownFile('target.md');

      // Verify
      expect(mockOnNavigate).toHaveBeenCalled();
      expect(mockOnNavigate.mock.calls[0][0].content).toBe('# Content');
    });

    it('should show warning if no file open', async () => {
      const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => { });
      service.currentFilePath = '';

      await service.navigateToMarkdownFile('test.md');

      expect(alertSpy).toHaveBeenCalled();
      expect(mockOnNavigate).not.toHaveBeenCalled();
    });
  });
});
