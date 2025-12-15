import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismService } from '../../../src/js/services/PrismService.js';

describe('PrismService', () => {
  let service;
  let mockPrism;
  let mockContainer;
  let mockCodeBlock;

  beforeEach(() => {
    service = new PrismService();

    // Mock DOM elements FIRST (before Prism mock)
    mockCodeBlock = document.createElement('code');
    mockCodeBlock.className = 'language-javascript'; // Add language class
    mockContainer = document.createElement('div');
    const pre = document.createElement('pre');
    pre.appendChild(mockCodeBlock);
    mockContainer.appendChild(pre);

    // Mock Prism object with highlightAllUnder (what the service actually uses)
    mockPrism = {
      highlightElement: vi.fn(),
      highlightAllUnder: vi.fn(), // This is what the service actually calls
      languages: {
        javascript: {},
        python: {},
        java: {},
      },
    };
    global.Prism = mockPrism;
  });

  describe('highlightAll', () => {
    it('should call Prism.highlightAllUnder on container', () => {
      service.highlightAll(mockContainer);

      expect(mockPrism.highlightAllUnder).toHaveBeenCalledOnce();
      expect(mockPrism.highlightAllUnder).toHaveBeenCalledWith(mockContainer);
    });

    it('should return count of highlighted blocks with language class', () => {
      const count = service.highlightAll(mockContainer);

      // The service counts elements with class*="language-"
      expect(count).toBe(1);
    });

    it('should return 0 if Prism not loaded', () => {
      global.Prism = undefined;

      const count = service.highlightAll(mockContainer);

      expect(count).toBe(0);
    });

    it('should handle multiple code blocks', () => {
      // Add more code blocks with language classes
      for (let i = 0; i < 3; i++) {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        code.className = 'language-python';
        pre.appendChild(code);
        mockContainer.appendChild(pre);
      }

      const count = service.highlightAll(mockContainer);

      expect(count).toBe(4); // 1 original + 3 added
      expect(mockPrism.highlightAllUnder).toHaveBeenCalledOnce();
    });

    it('should return 0 and log error if highlightAllUnder throws', () => {
      mockPrism.highlightAllUnder.mockImplementation(() => {
        throw new Error('Highlight failed');
      });

      const count = service.highlightAll(mockContainer);

      expect(count).toBe(0);
    });
  });

  describe('highlightElement', () => {
    it('should highlight single code block', () => {
      const success = service.highlightElement(mockCodeBlock);

      expect(success).toBe(true);
      expect(mockPrism.highlightElement).toHaveBeenCalledWith(mockCodeBlock);
    });

    it('should return false if Prism not loaded', () => {
      global.Prism = undefined;

      const success = service.highlightElement(mockCodeBlock);

      expect(success).toBe(false);
    });

    it('should return false on error', () => {
      mockPrism.highlightElement.mockImplementation(() => {
        throw new Error('Highlight failed');
      });

      const success = service.highlightElement(mockCodeBlock);

      expect(success).toBe(false);
    });
  });

  describe('isReady', () => {
    it('should return true when Prism is loaded', () => {
      expect(service.isReady()).toBe(true);
    });

    it('should return false when Prism not loaded', () => {
      global.Prism = undefined;
      expect(service.isReady()).toBe(false);
    });
  });

  describe('getSupportedLanguages', () => {
    it('should return list of supported languages', () => {
      const languages = service.getSupportedLanguages();

      expect(languages).toEqual(['javascript', 'python', 'java']);
    });

    it('should return empty array if Prism not loaded', () => {
      global.Prism = undefined;

      const languages = service.getSupportedLanguages();

      expect(languages).toEqual([]);
    });

    it('should handle missing languages object', () => {
      global.Prism = {};

      const languages = service.getSupportedLanguages();

      expect(languages).toEqual([]);
    });
  });
});
