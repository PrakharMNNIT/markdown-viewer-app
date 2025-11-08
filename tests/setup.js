import { beforeEach, vi } from 'vitest';

// Mock localStorage for tests
const localStorageMock = (() => {
  let store = {};

  return {
    getItem: vi.fn(key => store[key] || null),
    setItem: vi.fn((key, value) => {
      store[key] = value.toString();
    }),
    removeItem: vi.fn(key => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
    get length() {
      return Object.keys(store).length;
    },
    key: vi.fn(index => {
      const keys = Object.keys(store);
      return keys[index] || null;
    }),
  };
})();

global.localStorage = localStorageMock;

// Mock DOM methods
global.getComputedStyle = vi.fn(() => ({
  getPropertyValue: vi.fn(prop => {
    // Mock CSS variables
    const mockValues = {
      '--bg-primary': '#ffffff',
      '--text-primary': '#000000',
      '--h1-color': '#0969da',
      '--h2-color': '#8250df',
      '--h3-color': '#cf222e',
    };
    return mockValues[prop] || '';
  }),
}));

// Reset mocks before each test
beforeEach(() => {
  localStorageMock.clear();
  vi.clearAllMocks();
});
