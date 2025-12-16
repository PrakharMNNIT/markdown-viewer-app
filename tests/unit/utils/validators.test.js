import { describe, expect, it } from 'vitest';
import { STORAGE_KEYS, ZOOM } from '../../../src/js/config/constants.js';
import {
  constrainValue,
  constrainZoom,
  isValidColor,
  isValidStorageKey,
  isValidTheme,
  isValidViewMode,
} from '../../../src/js/utils/validators.js';

describe('validators', () => {
  describe('constrainValue', () => {
    it('should return value when within bounds', () => {
      expect(constrainValue(100, 50, 200)).toBe(100);
      expect(constrainValue(50, 50, 200)).toBe(50);
      expect(constrainValue(200, 50, 200)).toBe(200);
    });

    it('should return min when value is below minimum', () => {
      expect(constrainValue(30, 50, 200)).toBe(50);
      expect(constrainValue(0, 50, 200)).toBe(50);
      expect(constrainValue(-100, 50, 200)).toBe(50);
    });

    it('should return max when value is above maximum', () => {
      expect(constrainValue(250, 50, 200)).toBe(200);
      expect(constrainValue(1000, 50, 200)).toBe(200);
    });

    it('should handle edge cases', () => {
      expect(constrainValue(0, 0, 100)).toBe(0);
      expect(constrainValue(100, 0, 100)).toBe(100);
      expect(constrainValue(-1, -10, 10)).toBe(-1);
    });

    it('should handle floating point numbers', () => {
      expect(constrainValue(1.5, 1, 2)).toBe(1.5);
      expect(constrainValue(0.5, 1, 2)).toBe(1);
      expect(constrainValue(2.5, 1, 2)).toBe(2);
    });
  });

  describe('constrainZoom', () => {
    it('should return zoom level when within ZOOM bounds', () => {
      expect(constrainZoom(100)).toBe(100);
      expect(constrainZoom(ZOOM.MIN)).toBe(ZOOM.MIN);
      expect(constrainZoom(ZOOM.MAX)).toBe(ZOOM.MAX);
    });

    it('should return ZOOM.MIN when below minimum', () => {
      expect(constrainZoom(10)).toBe(ZOOM.MIN);
      expect(constrainZoom(0)).toBe(ZOOM.MIN);
      expect(constrainZoom(-50)).toBe(ZOOM.MIN);
    });

    it('should return ZOOM.MAX when above maximum', () => {
      expect(constrainZoom(500)).toBe(ZOOM.MAX);
      expect(constrainZoom(1000)).toBe(ZOOM.MAX);
    });

    it('should handle default zoom level', () => {
      expect(constrainZoom(ZOOM.DEFAULT)).toBe(ZOOM.DEFAULT);
    });
  });

  describe('isValidTheme', () => {
    it('should return true for valid light themes', () => {
      expect(isValidTheme('default-light')).toBe(true);
      expect(isValidTheme('ocean-light')).toBe(true);
      expect(isValidTheme('forest-light')).toBe(true);
      expect(isValidTheme('sunset-light')).toBe(true);
      expect(isValidTheme('neon-light')).toBe(true);
    });

    it('should return true for valid dark themes', () => {
      expect(isValidTheme('default-dark')).toBe(true);
      expect(isValidTheme('ocean-dark')).toBe(true);
      expect(isValidTheme('forest-dark')).toBe(true);
      expect(isValidTheme('sunset-dark')).toBe(true);
      expect(isValidTheme('neon-dark')).toBe(true);
    });

    it('should return true for custom theme', () => {
      expect(isValidTheme('custom')).toBe(true);
    });

    it('should return false for invalid themes', () => {
      expect(isValidTheme('invalid')).toBe(false);
      expect(isValidTheme('')).toBe(false);
      expect(isValidTheme('OCEAN-DARK')).toBe(false); // case sensitive
      expect(isValidTheme('ocean')).toBe(false);
      expect(isValidTheme('light')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isValidTheme(null)).toBe(false);
      expect(isValidTheme(undefined)).toBe(false);
      expect(isValidTheme(123)).toBe(false);
    });
  });

  describe('isValidViewMode', () => {
    it('should return true for valid view modes', () => {
      expect(isValidViewMode('editor-only')).toBe(true);
      expect(isValidViewMode('split-view')).toBe(true);
      expect(isValidViewMode('preview-only')).toBe(true);
    });

    it('should return false for invalid view modes', () => {
      expect(isValidViewMode('invalid')).toBe(false);
      expect(isValidViewMode('')).toBe(false);
      expect(isValidViewMode('SPLIT-VIEW')).toBe(false); // case sensitive
      expect(isValidViewMode('split')).toBe(false);
    });

    it('should handle edge cases', () => {
      expect(isValidViewMode(null)).toBe(false);
      expect(isValidViewMode(undefined)).toBe(false);
      expect(isValidViewMode(123)).toBe(false);
    });
  });

  describe('isValidColor', () => {
    describe('hex colors', () => {
      it('should return true for valid 6-digit hex colors', () => {
        expect(isValidColor('#ff0000')).toBe(true);
        expect(isValidColor('#FF0000')).toBe(true);
        expect(isValidColor('#000000')).toBe(true);
        expect(isValidColor('#ffffff')).toBe(true);
        expect(isValidColor('#FFFFFF')).toBe(true);
        expect(isValidColor('#1a2b3c')).toBe(true);
      });

      it('should return true for valid 3-digit hex colors', () => {
        expect(isValidColor('#f00')).toBe(true);
        expect(isValidColor('#F00')).toBe(true);
        expect(isValidColor('#000')).toBe(true);
        expect(isValidColor('#fff')).toBe(true);
        expect(isValidColor('#FFF')).toBe(true);
      });

      it('should return false for invalid hex colors', () => {
        expect(isValidColor('#ff00')).toBe(false); // 4 digits
        expect(isValidColor('#ff0000ff')).toBe(false); // 8 digits
        expect(isValidColor('ff0000')).toBe(false); // no hash
        expect(isValidColor('#gggggg')).toBe(false); // invalid chars
        expect(isValidColor('#')).toBe(false);
      });
    });

    describe('rgb colors', () => {
      it('should return true for valid rgb colors', () => {
        expect(isValidColor('rgb(255, 0, 0)')).toBe(true);
        expect(isValidColor('rgb(255,0,0)')).toBe(true);
        expect(isValidColor('rgb(0, 0, 0)')).toBe(true);
        expect(isValidColor('rgb(255, 255, 255)')).toBe(true);
        expect(isValidColor('rgb(128, 128, 128)')).toBe(true);
      });

      it('should return true for valid rgba colors', () => {
        expect(isValidColor('rgba(255, 0, 0, 1)')).toBe(true);
        expect(isValidColor('rgba(255,0,0,0.5)')).toBe(true);
        expect(isValidColor('rgba(0, 0, 0, 0)')).toBe(true);
        expect(isValidColor('rgba(255, 255, 255, 0.8)')).toBe(true);
      });

      it('should return false for invalid rgb/rgba colors', () => {
        expect(isValidColor('rgb(255, 0)')).toBe(false); // missing value
        expect(isValidColor('rgb(255 0 0)')).toBe(false); // wrong separator
        expect(isValidColor('RGB(255, 0, 0)')).toBe(false); // uppercase
        // Note: rgba(255, 0, 0) is valid - alpha is optional in the regex
      });

      it('should accept rgba with optional alpha', () => {
        // The regex allows rgba with or without alpha
        expect(isValidColor('rgba(255, 0, 0)')).toBe(true);
        expect(isValidColor('rgba(255, 0, 0, 0.5)')).toBe(true);
      });
    });

    describe('invalid formats', () => {
      it('should return false for color names', () => {
        expect(isValidColor('red')).toBe(false);
        expect(isValidColor('blue')).toBe(false);
        expect(isValidColor('transparent')).toBe(false);
      });

      it('should return false for hsl colors', () => {
        expect(isValidColor('hsl(0, 100%, 50%)')).toBe(false);
        expect(isValidColor('hsla(0, 100%, 50%, 1)')).toBe(false);
      });

      it('should return false for invalid inputs', () => {
        expect(isValidColor('')).toBe(false);
        expect(isValidColor('invalid')).toBe(false);
        expect(isValidColor('123456')).toBe(false);
      });
    });
  });

  describe('isValidStorageKey', () => {
    const validKeys = Object.values(STORAGE_KEYS);

    it('should return true for valid storage keys', () => {
      expect(isValidStorageKey('markdownContent', validKeys)).toBe(true);
      expect(isValidStorageKey('selectedTheme', validKeys)).toBe(true);
      expect(isValidStorageKey('viewMode', validKeys)).toBe(true);
      expect(isValidStorageKey('previewZoom', validKeys)).toBe(true);
    });

    it('should return false for invalid storage keys', () => {
      expect(isValidStorageKey('invalid', validKeys)).toBe(false);
      expect(isValidStorageKey('', validKeys)).toBe(false);
      expect(isValidStorageKey('MARKDOWNCONTENT', validKeys)).toBe(false);
    });

    it('should handle custom valid keys array', () => {
      const customKeys = ['key1', 'key2', 'key3'];
      expect(isValidStorageKey('key1', customKeys)).toBe(true);
      expect(isValidStorageKey('key4', customKeys)).toBe(false);
    });

    it('should handle empty valid keys array', () => {
      expect(isValidStorageKey('anything', [])).toBe(false);
    });
  });
});
