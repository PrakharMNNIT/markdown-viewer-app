/**
 * MermaidService - Mermaid Diagram Rendering Service
 *
 * Handles all Mermaid diagram rendering with theme-aware configuration.
 * Isolated service for better testability and maintainability.
 */

import { MERMAID_CONFIG } from '../config/constants.js';
import { getCssVariable } from '../utils/colorHelpers.js';

/**
 * @class MermaidService
 * @description Service for rendering Mermaid diagrams with theme integration
 *
 * @example
 * const service = new MermaidService();
 * service.initialize();
 * const svg = await service.render('diagram-1', 'graph TD\n A-->B');
 */
export class MermaidService {
  constructor() {
    this.initialized = false;
  }

  /**
   * Initialize Mermaid with current theme colors
   * Extracts theme colors from CSS variables and configures Mermaid
   *
   * @returns {void}
   */
  initialize() {
    // Extract theme colors from CSS variables
    const h1Color = getCssVariable('--h1-color');
    const h2Color = getCssVariable('--h2-color');
    const h3Color = getCssVariable('--h3-color');
    const bgSecondary = getCssVariable('--bg-secondary');
    const textPrimary = getCssVariable('--text-primary');

    // Configure Mermaid with theme colors
    if (typeof mermaid !== 'undefined') {
      mermaid.initialize({
        startOnLoad: MERMAID_CONFIG.START_ON_LOAD,
        theme: MERMAID_CONFIG.THEME,
        themeVariables: {
          primaryColor: bgSecondary,
          primaryTextColor: textPrimary,
          primaryBorderColor: h1Color,
          lineColor: h2Color,
          secondaryColor: bgSecondary,
          tertiaryColor: bgSecondary,
          background: bgSecondary,
          mainBkg: bgSecondary,
          secondBkg: bgSecondary,
          tertiaryBkg: bgSecondary,
          nodeBorder: h1Color,
          clusterBkg: bgSecondary,
          clusterBorder: h3Color,
          titleColor: textPrimary,
          edgeLabelBackground: bgSecondary,
          nodeTextColor: textPrimary,
          fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        },
      });

      this.initialized = true;
    } else {
      console.warn('Mermaid library not loaded');
    }
  }

  /**
   * Render a Mermaid diagram
   *
   * @param {string} id - Unique ID for the diagram
   * @param {string} code - Mermaid diagram code
   * @returns {Promise<string>} Rendered SVG string
   * @throws {Error} If rendering fails
   *
   * @example
   * const svg = await service.render('diagram-1', 'graph TD\n A-->B');
   */
  async render(id, code) {
    // Initialize if not already done
    if (!this.initialized) {
      this.initialize();
    }

    // Check if Mermaid is available
    if (typeof mermaid === 'undefined') {
      throw new Error('Mermaid library not loaded');
    }

    try {
      const result = await mermaid.render(id, code);
      return result.svg;
    } catch (error) {
      console.error('Mermaid render error:', error);
      throw new Error(`Mermaid diagram error: ${error.message}`);
    }
  }

  /**
   * Check if service is ready to render
   *
   * @returns {boolean} True if initialized
   */
  isReady() {
    return this.initialized && typeof mermaid !== 'undefined';
  }

  /**
   * Reinitialize with new theme colors
   * Call this when theme changes
   *
   * @returns {void}
   */
  reinitialize() {
    this.initialized = false;
    this.initialize();
  }
}
