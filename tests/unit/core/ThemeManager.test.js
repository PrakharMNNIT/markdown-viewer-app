import { beforeEach, describe, expect, it, vi } from 'vitest';
import { ThemeManager } from '../../../src/js/core/ThemeManager.js';

describe('ThemeManager', () => {
  let themeManager;
  let mockStorage;
  let mockStylesheet;

  beforeEach(() => {
    // Mock StorageManager
    mockStorage = {
      get: vi.fn(),
      set: vi.fn().mockReturnValue(true),
      getJSON: vi.fn(),
      setJSON: vi.fn().mockReturnValue(true),
    };

    // Mock theme stylesheet element
    mockStylesheet = { href: '' };
    vi.spyOn(document, 'getElementById').mockReturnValue(mockStylesheet);

    themeManager = new ThemeManager(mockStorage);
  });

  describe('loadTheme', () => {
    it('should load built-in theme successfully', async () => {
      const result = await themeManager.loadTheme('ocean-dark');

      expect(result).toBe(true);
      expect(mockStorage.set).toHaveBeenCalledWith('selectedTheme', 'ocean-dark');
      expect(mockStylesheet.href).toContain('ocean-dark');
    });

    it('should throw error for invalid theme', async () => {
      await expect(themeManager.loadTheme('invalid-theme')).rejects.toThrow('Invalid theme');
    });

    it('should load custom theme when specified', async () => {
      const customColors = { '--h1-color': '#ff0000' };
      mockStorage.getJSON.mockReturnValue(customColors);

      const result = await themeManager.loadTheme('custom');

      expect(result).toBe(true);
      expect(mockStorage.getJSON).toHaveBeenCalledWith('customTheme');
    });

    it('should fallback to default if custom theme not found', async () => {
      mockStorage.getJSON.mockReturnValue(null);

      await themeManager.loadTheme('custom');

      expect(mockStylesheet.href).toContain('default-light');
    });
  });

  describe('saveCustomTheme', () => {
    it('should save custom theme colors', () => {
      const colors = { '--h1-color': '#00ff00' };

      const result = themeManager.saveCustomTheme(colors);

      expect(result).toBe(true);
      expect(mockStorage.setJSON).toHaveBeenCalledWith('customTheme', colors);
    });

    it('should reject invalid colors object', () => {
      const result = themeManager.saveCustomTheme(null);

      expect(result).toBe(false);
      expect(mockStorage.setJSON).not.toHaveBeenCalled();
    });

    it('should reject non-object colors', () => {
      const result = themeManager.saveCustomTheme('not-an-object');

      expect(result).toBe(false);
    });
  });

  describe('getCurrentTheme', () => {
    it('should return current theme name', async () => {
      await themeManager.loadTheme('neon-dark');

      expect(themeManager.getCurrentTheme()).toBe('neon-dark');
    });

    it('should return null initially', () => {
      expect(themeManager.getCurrentTheme()).toBeNull();
    });
  });

  describe('getCurrentColors', () => {
    it('should extract all current CSS variables', () => {
      const colors = themeManager.getCurrentColors();

      expect(colors).toHaveProperty('--bg-primary');
      expect(colors).toHaveProperty('--h1-color');
      expect(colors).toHaveProperty('--text-primary');
    });

    it('should return object with color values', () => {
      const colors = themeManager.getCurrentColors();

      expect(typeof colors).toBe('object');
      expect(Object.keys(colors).length).toBeGreaterThan(0);
    });
  });

  describe('setThemeChangeListener', () => {
    it('should register theme change callback', async () => {
      const callback = vi.fn();
      themeManager.setThemeChangeListener(callback);

      await themeManager.loadTheme('forest-dark');

      expect(callback).toHaveBeenCalledWith('forest-dark');
    });

    it('should not throw if callback is null', async () => {
      themeManager.setThemeChangeListener(null);

      await expect(themeManager.loadTheme('ocean-light')).resolves.toBe(true);
    });
  });

  describe('getAvailableThemes', () => {
    it('should return list of all themes', () => {
      const themes = themeManager.getAvailableThemes();

      expect(themes).toContain('default-light');
      expect(themes).toContain('ocean-dark');
      expect(themes).toContain('obsidian-dark');
      expect(themes).toContain('nebula-light');
      expect(themes).toContain('nebula-dark');
      expect(themes).toContain('custom');
      // 6 base themes × 2 variants (light/dark) + 2 nebula + 1 custom = 15
      expect(themes.length).toBe(15);
    });
  });

  describe('themeExists', () => {
    it('should return true for valid themes', () => {
      expect(themeManager.themeExists('default-dark')).toBe(true);
      expect(themeManager.themeExists('obsidian-light')).toBe(true);
    });

    it('should return false for invalid themes', () => {
      expect(themeManager.themeExists('invalid')).toBe(false);
      expect(themeManager.themeExists('')).toBe(false);
    });
  });
});
