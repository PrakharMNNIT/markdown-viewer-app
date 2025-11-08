/**
 * StorageManager - LocalStorage Abstraction Layer
 *
 * Provides a clean interface for localStorage operations with error handling.
 * Centralizes all data persistence logic for better testability.
 */

/**
 * @class StorageManager
 * @description Manages all localStorage operations with error handling
 *
 * @example
 * const storage = new StorageManager();
 * storage.set(STORAGE_KEYS.MARKDOWN_CONTENT, 'Hello World');
 * const content = storage.get(STORAGE_KEYS.MARKDOWN_CONTENT);
 */
export class StorageManager {
  constructor() {
    this.CURRENT_VERSION = 2;
    this.VERSION_KEY = '__storage_version';
  }

  /**
   * Get item from localStorage
   *
   * @param {string} key - Storage key
   * @returns {string|null} Stored value or null if not found
   *
   * @example
   * const theme = storage.get(STORAGE_KEYS.SELECTED_THEME);
   */
  get(key) {
    try {
      return localStorage.getItem(key);
    } catch (error) {
      console.error('Storage get error:', error);
      return null;
    }
  }

  /**
   * Set item in localStorage
   *
   * @param {string} key - Storage key
   * @param {string} value - Value to store
   * @returns {boolean} True if successful
   *
   * @example
   * storage.set(STORAGE_KEYS.SELECTED_THEME, 'ocean-dark');
   */
  set(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      console.error('Storage set error:', error);
      return false;
    }
  }

  /**
   * Remove item from localStorage
   *
   * @param {string} key - Storage key
   * @returns {boolean} True if successful
   *
   * @example
   * storage.remove(STORAGE_KEYS.CUSTOM_THEME);
   */
  remove(key) {
    try {
      localStorage.removeItem(key);
      return true;
    } catch (error) {
      console.error('Storage remove error:', error);
      return false;
    }
  }

  /**
   * Check if key exists in storage
   *
   * @param {string} key - Storage key
   * @returns {boolean} True if key exists
   *
   * @example
   * if (storage.has(STORAGE_KEYS.CUSTOM_THEME)) { }
   */
  has(key) {
    return this.get(key) !== null;
  }

  /**
   * Get JSON object from storage
   *
   * @param {string} key - Storage key
   * @returns {any|null} Parsed JSON or null if not found/invalid
   *
   * @example
   * const theme = storage.getJSON(STORAGE_KEYS.CUSTOM_THEME);
   */
  getJSON(key) {
    const value = this.get(key);
    if (!value) {
      return null;
    }

    try {
      return JSON.parse(value);
    } catch (error) {
      console.error('JSON parse error:', error);
      return null;
    }
  }

  /**
   * Set JSON object in storage
   *
   * @param {string} key - Storage key
   * @param {any} value - Value to stringify and store
   * @returns {boolean} True if successful
   *
   * @example
   * storage.setJSON(STORAGE_KEYS.CUSTOM_THEME, { '--h1-color': '#ff0000' });
   */
  setJSON(key, value) {
    try {
      const json = JSON.stringify(value);
      return this.set(key, json);
    } catch (error) {
      console.error('JSON stringify error:', error);
      return false;
    }
  }

  /**
   * Clear all items from storage
   * USE WITH CAUTION
   *
   * @returns {boolean} True if successful
   */
  clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      console.error('Storage clear error:', error);
      return false;
    }
  }

  /**
   * Get all keys in storage
   *
   * @returns {string[]} Array of storage keys
   */
  getAllKeys() {
    try {
      return Object.keys(localStorage);
    } catch (error) {
      console.error('Storage getAllKeys error:', error);
      return [];
    }
  }

  /**
   * Get storage size in bytes (approximate)
   *
   * @returns {number} Approximate size in bytes
   */
  getSize() {
    try {
      let total = 0;
      for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
          const value = localStorage.getItem(key);
          total += key.length + (value?.length || 0);
        }
      }
      return total;
    } catch (error) {
      console.error('Storage getSize error:', error);
      return 0;
    }
  }

  /**
   * Check if storage is available
   *
   * @returns {boolean} True if localStorage is available
   */
  isAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (error) {
      return false;
    }
  }
}
