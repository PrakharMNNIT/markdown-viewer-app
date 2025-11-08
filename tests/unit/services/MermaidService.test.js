import { beforeEach, describe, expect, it, vi } from 'vitest';
import { MermaidService } from '../../../src/js/services/MermaidService.js';

describe('MermaidService', () => {
  let service;
  let mockMermaid;

  beforeEach(() => {
    service = new MermaidService();

    // Mock global mermaid object
    mockMermaid = {
      initialize: vi.fn(),
      render: vi.fn().mockResolvedValue({ svg: '<svg>Test SVG</svg>' }),
    };
    global.mermaid = mockMermaid;
  });

  describe('initialize', () => {
    it('should initialize Mermaid with theme colors', () => {
      service.initialize();

      expect(mockMermaid.initialize).toHaveBeenCalledOnce();
      expect(service.initialized).toBe(true);
    });

    it('should configure Mermaid with correct theme', () => {
      service.initialize();

      const config = mockMermaid.initialize.mock.calls[0][0];
      expect(config.startOnLoad).toBe(false);
      expect(config.theme).toBe('base');
      expect(config.themeVariables).toBeDefined();
    });

    it('should extract CSS colors for theme variables', () => {
      service.initialize();

      const config = mockMermaid.initialize.mock.calls[0][0];
      expect(config.themeVariables.primaryBorderColor).toBeTruthy();
      expect(config.themeVariables.lineColor).toBeTruthy();
    });
  });

  describe('render', () => {
    it('should render Mermaid diagram', async () => {
      const svg = await service.render('test-id', 'graph TD\n A-->B');

      expect(svg).toContain('<svg>');
      expect(mockMermaid.render).toHaveBeenCalledWith('test-id', 'graph TD\n A-->B');
    });

    it('should auto-initialize if not initialized', async () => {
      expect(service.initialized).toBe(false);

      await service.render('test-id', 'graph TD\n A-->B');

      expect(service.initialized).toBe(true);
    });

    it('should handle render errors gracefully', async () => {
      mockMermaid.render.mockRejectedValue(new Error('Parse error'));

      await expect(service.render('test-id', 'invalid')).rejects.toThrow(
        'Mermaid diagram error: Parse error'
      );
    });

    it('should throw error if mermaid not loaded', async () => {
      global.mermaid = undefined;
      service.initialized = false;

      await expect(service.render('test-id', 'graph TD\n A-->B')).rejects.toThrow(
        'Mermaid library not loaded'
      );
    });
  });

  describe('isReady', () => {
    it('should return true when initialized and mermaid loaded', () => {
      service.initialize();
      expect(service.isReady()).toBe(true);
    });

    it('should return false when not initialized', () => {
      expect(service.isReady()).toBe(false);
    });

    it('should return false when mermaid not loaded', () => {
      global.mermaid = undefined;
      expect(service.isReady()).toBe(false);
    });
  });

  describe('reinitialize', () => {
    it('should reset and reinitialize', () => {
      service.initialize();
      expect(service.initialized).toBe(true);

      service.reinitialize();

      expect(mockMermaid.initialize).toHaveBeenCalledTimes(2);
    });
  });
});
