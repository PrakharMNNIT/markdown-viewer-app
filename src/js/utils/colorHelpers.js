/**
 * Color & CSS Variable Utility Functions
 *
 * Functions for working with CSS custom properties and theme colors.
 */

/**
 * Gets CSS custom property value from document root
 *
 * @param {string} varName - CSS variable name (e.g., '--bg-primary')
 * @returns {string} CSS variable value (trimmed)
 *
 * @example
 * getCssVariable('--bg-primary') // Returns: '#ffffff'
 */
export function getCssVariable(varName) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

/**
 * Sets CSS custom property on document root
 *
 * @param {string} varName - CSS variable name
 * @param {string} value - Color value
 *
 * @example
 * setCssVariable('--h1-color', '#ff0000');
 */
export function setCssVariable(varName, value) {
  document.documentElement.style.setProperty(varName, value);
}

/**
 * Removes CSS custom property from document root
 *
 * @param {string} varName - CSS variable name
 *
 * @example
 * removeCssVariable('--h1-color');
 */
export function removeCssVariable(varName) {
  document.documentElement.style.removeProperty(varName);
}

/**
 * Checks if current theme is dark based on background color
 *
 * @returns {boolean} True if dark theme (bg starts with #0, #1, or #2)
 *
 * @example
 * isDarkTheme() // Returns: true for #0d1117 background
 */
export function isDarkTheme() {
  const bgColor = getCssVariable('--bg-primary');
  return bgColor.startsWith('#0') || bgColor.startsWith('#1') || bgColor.startsWith('#2');
}

/**
 * Gets all current theme colors
 *
 * @param {string[]} varNames - Array of CSS variable names
 * @returns {Object} Object with variable names as keys and colors as values
 *
 * @example
 * const colors = getAllCssVariables(['--bg-primary', '--text-primary']);
 * // Returns: { '--bg-primary': '#ffffff', '--text-primary': '#000000' }
 */
export function getAllCssVariables(varNames) {
  const colors = {};
  const style = getComputedStyle(document.documentElement);

  varNames.forEach(varName => {
    colors[varName] = style.getPropertyValue(varName).trim();
  });

  return colors;
}

/**
 * Clears all custom inline CSS variable overrides
 * Used when switching from custom theme to built-in theme
 *
 * @example
 * clearAllCssVariableOverrides(); // Removes all inline --* styles
 */
export function clearAllCssVariableOverrides() {
  const root = document.documentElement;
  const styles = root.style;

  for (let i = styles.length - 1; i >= 0; i--) {
    const prop = styles[i];
    if (prop.startsWith('--')) {
      removeCssVariable(prop);
    }
  }
}
