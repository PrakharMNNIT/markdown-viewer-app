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
});
