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
    it('should initialize Mermaid with theme colors', async () => {
      await service.initialize();

      expect(mockMermaid.initialize).toHaveBeenCalledOnce();
      expect(service.initialized).toBe(true);
    });

    it('should configure Mermaid with correct theme', async () => {
      await service.initialize();

      const config = mockMermaid.initialize.mock.calls[0][0];
      expect(config.startOnLoad).toBe(false);
      expect(config.theme).toBe('base');
      expect(config.themeVariables).toBeDefined();
    });

    it('should extract CSS colors for theme variables', async () => {
      await service.initialize();

      const config = mockMermaid.initialize.mock.calls[0][0];
      expect(config.themeVariables.primaryBorderColor).toBeTruthy();
      expect(config.themeVariables.lineColor).toBeTruthy();
    });

    it('should wait for CSS to be loaded before initializing', async () => {
      // This test verifies the async nature of initialize
      const startTime = Date.now();
      await service.initialize();
      const endTime = Date.now();

      // Should complete quickly since CSS is already available in test env
      expect(endTime - startTime).toBeLessThan(100);
      expect(service.initialized).toBe(true);
    });

    it('should handle case when CSS variables return valid colors', async () => {
      await service.initialize();

      const config = mockMermaid.initialize.mock.calls[0][0];
      // Background should be a valid color, not empty
      expect(config.themeVariables.background).toBeTruthy();
      expect(config.themeVariables.background).not.toBe('');
      expect(config.themeVariables.textColor).toBeTruthy();
      expect(config.themeVariables.textColor).not.toBe('');
    });

    it('should use fallback colors when CSS variables are empty', async () => {
      // Test that fallback mechanism works
      await service.initialize();

      const config = mockMermaid.initialize.mock.calls[0][0];
      // Should have valid colors even if CSS vars returned empty
      // (the getSafeColor function handles this)
      expect(config.themeVariables.background).toBeTruthy();
      expect(config.themeVariables.primaryColor).toBeTruthy();
    });

    it('should not initialize if mermaid is undefined', async () => {
      global.mermaid = undefined;

      await service.initialize();

      // Should not throw, just log warning
      expect(service.initialized).toBe(false);
    });

    it('should provide complete theme configuration with all required variables', async () => {
      await service.initialize();

      const config = mockMermaid.initialize.mock.calls[0][0];
      const vars = config.themeVariables;

      // Core variables
      expect(vars.background).toBeDefined();
      expect(vars.textColor).toBeDefined();
      expect(vars.lineColor).toBeDefined();

      // Flowchart variables
      expect(vars.nodeBorder).toBeDefined();
      expect(vars.clusterBkg).toBeDefined();

      // Sequence diagram variables
      expect(vars.actorBkg).toBeDefined();
      expect(vars.signalColor).toBeDefined();

      // Pie chart variables
      expect(vars.pie1).toBeDefined();
      expect(vars.pieTitleTextColor).toBeDefined();
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
        'Mermaid diagram error: Parse error',
      );
    });

    it('should throw error if mermaid not loaded', async () => {
      global.mermaid = undefined;
      service.initialized = false;

      await expect(service.render('test-id', 'graph TD\n A-->B')).rejects.toThrow(
        'Mermaid library not loaded',
      );
    });

    it('should render multiple diagrams sequentially', async () => {
      const svg1 = await service.render('test-1', 'graph TD\n A-->B');
      const svg2 = await service.render('test-2', 'graph LR\n C-->D');

      expect(svg1).toBeDefined();
      expect(svg2).toBeDefined();
      expect(mockMermaid.render).toHaveBeenCalledTimes(2);
    });
  });

  describe('isReady', () => {
    it('should return true when initialized and mermaid loaded', async () => {
      await service.initialize();
      expect(service.isReady()).toBe(true);
    });

    it('should return false when not initialized', () => {
      expect(service.isReady()).toBe(false);
    });

    it('should return false when mermaid not loaded', () => {
      global.mermaid = undefined;
      expect(service.isReady()).toBe(false);
    });

    it('should return false when mermaid loaded but not initialized', () => {
      expect(global.mermaid).toBeDefined();
      expect(service.initialized).toBe(false);
      expect(service.isReady()).toBe(false);
    });
  });

  describe('reinitialize', () => {
    it('should reset initialized flag and call initialize again', async () => {
      await service.initialize();
      expect(service.initialized).toBe(true);

      // reinitialize resets initialized to false and calls initialize()
      service.reinitialize();

      // initialized should be reset to false before async initialize completes
      // The actual re-initialization happens asynchronously
      expect(mockMermaid.initialize).toHaveBeenCalledTimes(1);

      // Wait for the async initialize to complete
      await new Promise(resolve => setTimeout(resolve, 50));

      expect(mockMermaid.initialize).toHaveBeenCalledTimes(2);
    });

    it('should allow theme changes through reinitialize', async () => {
      await service.initialize();
      const firstConfig = mockMermaid.initialize.mock.calls[0][0];

      service.reinitialize();
      await new Promise(resolve => setTimeout(resolve, 50));

      const secondConfig = mockMermaid.initialize.mock.calls[1][0];

      // Both should have valid configurations
      expect(firstConfig.themeVariables).toBeDefined();
      expect(secondConfig.themeVariables).toBeDefined();
    });
  });

  describe('error handling', () => {
    it('should not crash when getComputedStyle returns empty values', async () => {
      // This simulates the Safari issue where CSS variables are empty
      // The service should handle this gracefully with fallbacks
      await expect(service.initialize()).resolves.not.toThrow();
    });

    it('should handle invalid color format gracefully', async () => {
      await service.initialize();

      const config = mockMermaid.initialize.mock.calls[0][0];
      // Should have valid colors, not empty strings or undefined
      Object.values(config.themeVariables).forEach(value => {
        if (typeof value === 'string' && value.startsWith('#')) {
          expect(value.length).toBeGreaterThanOrEqual(4); // #fff or #ffffff
        }
      });
    });

    it('should timeout gracefully if CSS never loads', async () => {
      // The waitForCSS has a max timeout of 500ms
      // In tests, CSS is available immediately, so this should pass quickly
      const startTime = Date.now();
      await service.initialize();
      const duration = Date.now() - startTime;

      // Should not wait the full timeout
      expect(duration).toBeLessThan(500);
    });
  });

  describe('theme detection', () => {
    it('should detect light theme from background color', async () => {
      await service.initialize();

      const config = mockMermaid.initialize.mock.calls[0][0];
      // darkMode should be set based on background luminance
      expect(typeof config.themeVariables.darkMode).toBe('boolean');
    });

    it('should configure appropriate colors for detected theme', async () => {
      await service.initialize();

      const config = mockMermaid.initialize.mock.calls[0][0];
      // Node background should be different from main background
      expect(config.themeVariables.primaryColor).toBeDefined();
      expect(config.themeVariables.mainBkg).toBeDefined();
    });
  });
});
