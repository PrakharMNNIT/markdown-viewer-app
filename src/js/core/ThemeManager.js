/**
 * ThemeManager - Theme Management Core Module
 *
 * Handles all theme operations: loading, switching, customization, and persistence.
 * Integrates with StorageManager for persistence and MermaidService for theme updates.
 */

import { ELEMENT_IDS, STORAGE_KEYS, THEMES } from '../config/constants.js';
import { getCssVariable, removeCssVariable, setCssVariable } from '../utils/colorHelpers.js';
import { isValidTheme } from '../utils/validators.js';

/**
 * @class ThemeManager
 * @description Manages theme loading, switching, and customization
 *
 * @example
 * const storage = new StorageManager();
 * const themeManager = new ThemeManager(storage);
 * await themeManager.loadTheme('ocean-dark');
 */
export class ThemeManager {
  /**
   * @param {StorageManager} storageManager - Storage manager instance
   */
  constructor(storageManager) {
    this.storage = storageManager;
    this.currentTheme = null;
    this.onThemeChange = null;
  }

  /**
   * Load and apply a theme
   *
   * @param {string} themeName - Name of theme to load
   * @returns {Promise<boolean>} True if successful
   * @throws {Error} If theme name is invalid
   *
   * @example
   * await themeManager.loadTheme('obsidian-dark');
   */
  async loadTheme(themeName) {
    // Validate theme name
    if (!isValidTheme(themeName)) {
      throw new Error(`Invalid theme: ${themeName}`);
    }

    // Load appropriate theme
    if (themeName === THEMES.CUSTOM) {
      return this.loadCustomTheme();
    }

    return this.loadBuiltInTheme(themeName);
  }

  /**
   * Load a built-in theme from CSS file
   *
   * @param {string} themeName - Built-in theme name
   * @returns {Promise<boolean>} True if successful
   * @private
   */
  async loadBuiltInTheme(themeName) {
    try {
      // Clear any custom inline styles
      this.clearInlineStyles();

      // Load theme stylesheet
      const stylesheet = document.getElementById(ELEMENT_IDS.THEME_STYLESHEET);
      if (!stylesheet) {
        throw new Error('Theme stylesheet element not found');
      }

      // Use BASE_URL for proper path resolution in production
      const baseUrl = import.meta.env.BASE_URL || '/';
      stylesheet.href = `${baseUrl}themes/${themeName}.css`;

      // Save selection
      this.currentTheme = themeName;
      this.storage.set(STORAGE_KEYS.SELECTED_THEME, themeName);

      // Notify listeners
      this.notifyThemeChange(themeName);

      return true;
    } catch (error) {
      console.error('Failed to load built-in theme:', error);
      return false;
    }
  }

  /**
   * Load custom theme from storage
   *
   * @returns {Promise<boolean>} True if successful
   * @private
   */
  async loadCustomTheme() {
    const customTheme = this.storage.getJSON(STORAGE_KEYS.CUSTOM_THEME);

    if (!customTheme) {
      console.warn('No custom theme found, loading default');
      return this.loadTheme(THEMES.DEFAULT_LIGHT);
    }

    try {
      // Apply custom colors
      Object.entries(customTheme).forEach(([property, value]) => {
        setCssVariable(property, value);
      });

      this.currentTheme = THEMES.CUSTOM;
      this.storage.set(STORAGE_KEYS.SELECTED_THEME, THEMES.CUSTOM);

      // Notify listeners
      this.notifyThemeChange(THEMES.CUSTOM);

      return true;
    } catch (error) {
      console.error('Failed to load custom theme:', error);
      return false;
    }
  }

  /**
   * Save custom theme colors
   *
   * @param {Object} colors - Object with CSS variable names as keys
   * @returns {boolean} True if successful
   *
   * @example
   * themeManager.saveCustomTheme({ '--h1-color': '#ff0000' });
   */
  saveCustomTheme(colors) {
    if (!colors || typeof colors !== 'object') {
      console.error('Invalid colors object');
      return false;
    }

    return this.storage.setJSON(STORAGE_KEYS.CUSTOM_THEME, colors);
  }

  /**
   * Get current theme name
   *
   * @returns {string|null} Current theme name
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * Get all current theme colors
   *
   * @returns {Object} Object with CSS variable names and values
   *
   * @example
   * const colors = themeManager.getCurrentColors();
   * // { '--bg-primary': '#ffffff', '--h1-color': '#0969da', ... }
   */
  getCurrentColors() {
    const colors = {};
    const style = getComputedStyle(document.documentElement);

    // Extract all theme-related CSS variables
    const cssVarNames = [
      '--bg-primary',
      '--bg-secondary',
      '--bg-tertiary',
      '--text-primary',
      '--text-secondary',
      '--h1-color',
      '--h2-color',
      '--h3-color',
      '--h4-color',
      '--h5-color',
      '--h6-color',
      '--link-color',
      '--bold-color',
      '--italic-color',
      '--code-text',
      '--code-bg',
      '--code-block-bg',
      '--blockquote-border',
    ];

    cssVarNames.forEach(varName => {
      colors[varName] = getCssVariable(varName);
    });

    return colors;
  }

  /**
   * Clear all inline CSS variable overrides
   * Used when switching from custom to built-in theme
   *
   * @private
   */
  clearInlineStyles() {
    const root = document.documentElement;
    const styles = root.style;

    for (let i = styles.length - 1; i >= 0; i--) {
      const prop = styles[i];
      if (prop.startsWith('--')) {
        removeCssVariable(prop);
      }
    }
  }

  /**
   * Register callback for theme changes
   *
   * @param {Function} callback - Function to call when theme changes
   *
   * @example
   * themeManager.onThemeChange = (themeName) => {
   *   console.log('Theme changed to:', themeName);
   *   mermaidService.reinitialize();
   * };
   */
  setThemeChangeListener(callback) {
    this.onThemeChange = callback;
  }

  /**
   * Notify listeners of theme change
   *
   * @param {string} themeName - New theme name
   * @private
   */
  notifyThemeChange(themeName) {
    if (this.onThemeChange && typeof this.onThemeChange === 'function') {
      this.onThemeChange(themeName);
    }
  }

  /**
   * Get list of all available themes
   *
   * @returns {string[]} Array of theme names
   */
  getAvailableThemes() {
    return Object.values(THEMES);
  }

  /**
   * Check if a theme exists
   *
   * @param {string} themeName - Theme name to check
   * @returns {boolean} True if theme exists
   */
  themeExists(themeName) {
    return isValidTheme(themeName);
  }
}
