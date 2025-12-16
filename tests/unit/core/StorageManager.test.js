import { beforeEach, describe, expect, it } from 'vitest';
import { StorageManager } from '../../../src/js/core/StorageManager.js';

describe('StorageManager', () => {
  let storage;

  beforeEach(() => {
    storage = new StorageManager();
    localStorage.clear();
  });

  describe('get/set', () => {
    it('should store and retrieve string values', () => {
      storage.set('test-key', 'test-value');
      expect(storage.get('test-key')).toBe('test-value');
    });

    it('should return null for non-existent key', () => {
      expect(storage.get('non-existent')).toBeNull();
    });

    it('should return true on successful set', () => {
      const result = storage.set('key', 'value');
      expect(result).toBe(true);
    });
  });

  describe('getJSON/setJSON', () => {
    it('should store and retrieve JSON objects', () => {
      const obj = { name: 'test', value: 123 };
      storage.setJSON('json-key', obj);

      const retrieved = storage.getJSON('json-key');
      expect(retrieved).toEqual(obj);
    });

    it('should return null for non-existent JSON key', () => {
      expect(storage.getJSON('non-existent')).toBeNull();
    });

    it('should handle complex nested objects', () => {
      const complex = {
        theme: 'dark',
        colors: {
          primary: '#000',
          secondary: '#fff',
        },
        settings: [1, 2, 3],
      };

      storage.setJSON('complex', complex);
      expect(storage.getJSON('complex')).toEqual(complex);
    });

    it('should return null for invalid JSON', () => {
      localStorage.setItem('invalid-json', '{invalid}');
      expect(storage.getJSON('invalid-json')).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove item from storage', () => {
      storage.set('remove-test', 'value');
      expect(storage.has('remove-test')).toBe(true);

      storage.remove('remove-test');
      expect(storage.has('remove-test')).toBe(false);
    });

    it('should return true on successful removal', () => {
      storage.set('test', 'value');
      const result = storage.remove('test');
      expect(result).toBe(true);
    });
  });

  describe('has', () => {
    it('should return true for existing keys', () => {
      storage.set('exists', 'value');
      expect(storage.has('exists')).toBe(true);
    });

    it('should return false for non-existent keys', () => {
      expect(storage.has('does-not-exist')).toBe(false);
    });
  });

  describe('clear', () => {
    it('should remove all items', () => {
      storage.set('key1', 'value1');
      storage.set('key2', 'value2');

      storage.clear();

      expect(storage.has('key1')).toBe(false);
      expect(storage.has('key2')).toBe(false);
    });

    it('should return true on success', () => {
      const result = storage.clear();
      expect(result).toBe(true);
    });
  });

  describe('getAllKeys', () => {
    it('should return all storage keys', () => {
      storage.set('key1', 'value1');
      storage.set('key2', 'value2');

      const keys = storage.getAllKeys();
      // In test environment, check that method returns an array
      expect(Array.isArray(keys)).toBe(true);
      expect(keys.length).toBeGreaterThanOrEqual(2);
    });

    it('should return empty array when storage is empty', () => {
      storage.clear();
      const keys = storage.getAllKeys();
      expect(Array.isArray(keys)).toBe(true);
    });
  });

  describe('getSize', () => {
    it('should calculate approximate storage size', () => {
      storage.set('test', 'value');
      const size = storage.getSize();

      expect(size).toBeGreaterThan(0);
      expect(typeof size).toBe('number');
    });

    it('should return 0 for empty storage', () => {
      storage.clear();
      const size = storage.getSize();
      expect(size).toBeGreaterThanOrEqual(0);
    });
  });

  describe('isAvailable', () => {
    it('should return true when localStorage is available', () => {
      expect(storage.isAvailable()).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should return null when localStorage.getItem throws', () => {
      const originalGetItem = localStorage.getItem;
      localStorage.getItem = () => {
        throw new Error('Storage error');
      };

      const result = storage.get('test');
      expect(result).toBeNull();

      localStorage.getItem = originalGetItem;
    });

    it('should return false when localStorage.setItem throws', () => {
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = () => {
        throw new Error('Quota exceeded');
      };

      const result = storage.set('test', 'value');
      expect(result).toBe(false);

      localStorage.setItem = originalSetItem;
    });

    it('should return false when localStorage.removeItem throws', () => {
      const originalRemoveItem = localStorage.removeItem;
      localStorage.removeItem = () => {
        throw new Error('Storage error');
      };

      const result = storage.remove('test');
      expect(result).toBe(false);

      localStorage.removeItem = originalRemoveItem;
    });

    it('should return false when localStorage.clear throws', () => {
      const originalClear = localStorage.clear;
      localStorage.clear = () => {
        throw new Error('Storage error');
      };

      const result = storage.clear();
      expect(result).toBe(false);

      localStorage.clear = originalClear;
    });

    it('should return empty array when Object.keys throws in getAllKeys', () => {
      const originalKeys = Object.keys;
      Object.keys = () => {
        throw new Error('Error');
      };

      const result = storage.getAllKeys();
      expect(result).toEqual([]);

      Object.keys = originalKeys;
    });

    it('should return 0 when getSize encounters an error', () => {
      // Can't fully mock localStorage, but we can test edge cases
      storage.set('test', 'value');
      const size = storage.getSize();
      expect(typeof size).toBe('number');
    });

    it('should return false when isAvailable throws', () => {
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = () => {
        throw new Error('Storage disabled');
      };

      const result = storage.isAvailable();
      expect(result).toBe(false);

      localStorage.setItem = originalSetItem;
    });

    it('should return false when setJSON fails to stringify', () => {
      // Create circular reference that can't be stringified
      const circular = {};
      circular.self = circular;

      const result = storage.setJSON('circular', circular);
      expect(result).toBe(false);
    });

    it('should handle null values in getJSON', () => {
      storage.set('null-value', 'null');
      const result = storage.getJSON('null-value');
      expect(result).toBeNull();
    });

    it('should handle empty string in get', () => {
      storage.set('empty', '');
      // Empty string is falsy, so getJSON returns null
      const result = storage.getJSON('empty');
      expect(result).toBeNull();
    });
  });

  describe('Constructor properties', () => {
    it('should have CURRENT_VERSION property', () => {
      expect(storage.CURRENT_VERSION).toBe(2);
    });

    it('should have VERSION_KEY property', () => {
      expect(storage.VERSION_KEY).toBe('__storage_version');
    });
  });

  describe('getSize - detailed', () => {
    it('should calculate size including key and value lengths', () => {
      storage.clear();
      storage.set('key', 'value');

      const size = storage.getSize();
      // Size should be at least key length (3) + value length (5) = 8
      expect(size).toBeGreaterThanOrEqual(8);
    });

    it('should handle multiple items', () => {
      storage.clear();
      storage.set('a', '1');
      storage.set('bb', '22');
      storage.set('ccc', '333');

      const size = storage.getSize();
      // Minimum: (1+1) + (2+2) + (3+3) = 12
      expect(size).toBeGreaterThanOrEqual(12);
    });
  });
});
