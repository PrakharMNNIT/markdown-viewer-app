/**
 * Feature Flags Configuration
 *
 * Controls which code paths are active (old vs new).
 * Provides instant rollback capability during refactoring.
 *
 * SAFETY: Set to false to use old code, true to use new modules.
 */

/**
 * @typedef {Object} FeatureFlags
 * @property {boolean} USE_STORAGE_MANAGER - Use StorageManager class
 * @property {boolean} USE_THEME_MANAGER - Use ThemeManager class
 * @property {boolean} USE_MERMAID_SERVICE - Use MermaidService class
 * @property {boolean} USE_PRISM_SERVICE - Use PrismService class
 * @property {boolean} USE_UTILS - Use utility helper functions
 */

/**
 * Feature flags for gradual module rollout
 *
 * Start with ALL flags set to FALSE.
 * Enable one at a time after testing.
 *
 * @type {FeatureFlags}
 */
export const FEATURE_FLAGS = {
  // Core Modules - Week 5
  USE_STORAGE_MANAGER: false, // StorageManager for localStorage
  USE_THEME_MANAGER: false, // ThemeManager for themes

  // Services - Week 4
  USE_MERMAID_SERVICE: false, // MermaidService for diagrams
  USE_PRISM_SERVICE: false, // PrismService for highlighting

  // Utilities - Week 3
  USE_UTILS: false, // Utility functions (htmlHelpers, colorHelpers)

  // Safety Features
  ENABLE_DEBUG_LOGGING: false, // Extra console logs for debugging
  ENABLE_PERFORMANCE_MONITORING: false, // Track performance metrics
};

/**
 * Check if new code should be used
 *
 * @param {string} flagName - Name of feature flag
 * @returns {boolean} True if flag is enabled
 *
 * @example
 * if (isFeatureEnabled('USE_THEME_MANAGER')) {
 *   // Use new ThemeManager
 * } else {
 *   // Use old code
 * }
 */
export function isFeatureEnabled(flagName) {
  return FEATURE_FLAGS[flagName] === true;
}

/**
 * Enable a feature flag
 * USE WITH CAUTION
 *
 * @param {string} flagName - Flag to enable
 */
export function enableFeature(flagName) {
  if (Object.hasOwn(FEATURE_FLAGS, flagName)) {
    FEATURE_FLAGS[flagName] = true;
    console.log(`✅ Feature enabled: ${flagName}`);
  } else {
    console.warn(`⚠️ Unknown feature flag: ${flagName}`);
  }
}

/**
 * Disable a feature flag (rollback)
 *
 * @param {string} flagName - Flag to disable
 */
export function disableFeature(flagName) {
  if (Object.hasOwn(FEATURE_FLAGS, flagName)) {
    FEATURE_FLAGS[flagName] = false;
    console.log(`🔄 Feature disabled: ${flagName}`);
  } else {
    console.warn(`⚠️ Unknown feature flag: ${flagName}`);
  }
}

/**
 * Get status of all feature flags
 *
 * @returns {FeatureFlags} Current flag states
 */
export function getAllFlags() {
  return { ...FEATURE_FLAGS };
}
