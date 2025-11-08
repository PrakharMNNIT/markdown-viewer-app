/**
 * Validation Utility Functions
 *
 * Functions for validating user input and ensuring data integrity.
 */

import { THEMES, VIEW_MODES, ZOOM } from '../config/constants.js';

/**
 * Constrains a value between min and max bounds
 *
 * @param {number} value - Value to constrain
 * @param {number} min - Minimum allowed value
 * @param {number} max - Maximum allowed value
 * @returns {number} Constrained value
 *
 * @example
 * constrainValue(250, 50, 200) // Returns: 200
 * constrainValue(30, 50, 200)  // Returns: 50
 * constrainValue(100, 50, 200) // Returns: 100
 */
export function constrainValue(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

/**
 * Validates and constrains zoom level
 *
 * @param {number} zoomLevel - Zoom level to validate
 * @returns {number} Valid zoom level between ZOOM.MIN and ZOOM.MAX
 *
 * @example
 * constrainZoom(150) // Returns: 150
 * constrainZoom(300) // Returns: 200 (max)
 * constrainZoom(25)  // Returns: 50 (min)
 */
export function constrainZoom(zoomLevel) {
  return constrainValue(zoomLevel, ZOOM.MIN, ZOOM.MAX);
}

/**
 * Checks if theme name is valid
 *
 * @param {string} themeName - Theme name to validate
 * @returns {boolean} True if theme exists
 *
 * @example
 * isValidTheme('ocean-dark') // Returns: true
 * isValidTheme('invalid')    // Returns: false
 */
export function isValidTheme(themeName) {
  const validThemes = Object.values(THEMES);
  return validThemes.includes(themeName);
}

/**
 * Checks if view mode is valid
 *
 * @param {string} mode - View mode to validate
 * @returns {boolean} True if mode is valid
 *
 * @example
 * isValidViewMode('split-view') // Returns: true
 * isValidViewMode('invalid')    // Returns: false
 */
export function isValidViewMode(mode) {
  const validModes = Object.values(VIEW_MODES);
  return validModes.includes(mode);
}

/**
 * Validates CSS color value format
 *
 * @param {string} color - Color value to validate
 * @returns {boolean} True if valid color format
 *
 * @example
 * isValidColor('#ff0000')       // Returns: true
 * isValidColor('rgb(255,0,0)')  // Returns: true
 * isValidColor('invalid')       // Returns: false
 */
export function isValidColor(color) {
  // Test hex colors
  const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  if (hexRegex.test(color)) {
    return true;
  }

  // Test rgb/rgba
  const rgbRegex = /^rgba?\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*(,\s*[\d.]+)?\s*\)$/;
  if (rgbRegex.test(color)) {
    return true;
  }

  return false;
}

/**
 * Validates localStorage key exists and has expected format
 *
 * @param {string} key - Storage key to validate
 * @param {string[]} validKeys - Array of valid keys
 * @returns {boolean} True if key is valid
 *
 * @example
 * isValidStorageKey('markdownContent', Object.values(STORAGE_KEYS)) // true
 */
export function isValidStorageKey(key, validKeys) {
  return validKeys.includes(key);
}
