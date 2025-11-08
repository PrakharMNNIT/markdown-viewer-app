import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PrismService } from '../../../src/js/services/PrismService.js';

describe('PrismService', () => {
  let service;
  let mockPrism;
  let mockContainer;
  let mockCodeBlock;

  beforeEach(() => {
    service = new PrismService();

    // Mock Prism object
    mockPrism = {
      highlightElement: vi.fn(),
      languages: {
        javascript: {},
        python: {},
        java: {},
      },
    };
    global.Prism = mockPrism;

    // Mock DOM elements
    mockCodeBlock = document.createElement('code');
    mockContainer = document.createElement('div');
    const pre = document.createElement('pre');
    pre.appendChild(mockCodeBlock);
    mockContainer.appendChild(pre);
  });

  describe('highlightAll', () => {
    it('should highlight all code blocks in container', () => {
      const count = service.highlightAll(mockContainer);

      expect(count).toBe(1);
      expect(mockPrism.highlightElement).toHaveBeenCalledOnce();
      expect(mockPrism.highlightElement).toHaveBeenCalledWith(mockCodeBlock);
    });

    it('should return 0 if Prism not loaded', () => {
      global.Prism = undefined;

      const count = service.highlightAll(mockContainer);

      expect(count).toBe(0);
    });

    it('should handle multiple code blocks', () => {
      // Add more code blocks
      for (let i = 0; i < 3; i++) {
        const pre = document.createElement('pre');
        const code = document.createElement('code');
        pre.appendChild(code);
        mockContainer.appendChild(pre);
      }

      const count = service.highlightAll(mockContainer);

      expect(count).toBe(4); // 1 original + 3 added
      expect(mockPrism.highlightElement).toHaveBeenCalledTimes(4);
    });

    it('should continue if one block fails', () => {
      // Add another block
      const pre = document.createElement('pre');
      const code = document.createElement('code');
      pre.appendChild(code);
      mockContainer.appendChild(pre);

      // Make first call fail
      mockPrism.highlightElement.mockImplementationOnce(() => {
        throw new Error('Highlight failed');
      });

      const count = service.highlightAll(mockContainer);

      expect(count).toBe(1); // Only second block succeeded
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
