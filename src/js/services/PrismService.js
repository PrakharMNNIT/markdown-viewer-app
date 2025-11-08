/**
 * PrismService - Syntax Highlighting Service
 *
 * Handles all syntax highlighting using Prism.js.
 * Isolated service for better testability and maintainability.
 */

/**
 * @class PrismService
 * @description Service for applying syntax highlighting to code blocks
 *
 * @example
 * const service = new PrismService();
 * service.highlightAll(previewElement);
 */
export class PrismService {
  /**
   * Check if Prism library is loaded
   *
   * @returns {boolean} True if Prism is available
   * @private
   */
  isPrismLoaded() {
    return typeof Prism !== 'undefined';
  }

  /**
   * Highlight all code blocks in container
   *
   * @param {HTMLElement} container - Container element with code blocks
   * @returns {number} Number of blocks highlighted
   *
   * @example
   * const count = service.highlightAll(document.getElementById('preview'));
   * console.log(`Highlighted ${count} code blocks`);
   */
  highlightAll(container) {
    if (!this.isPrismLoaded()) {
      console.warn('Prism library not loaded');
      return 0;
    }

    const codeBlocks = container.querySelectorAll('pre code');
    let count = 0;

    codeBlocks.forEach(block => {
      try {
        Prism.highlightElement(block);
        count++;
      } catch (error) {
        console.error('Prism highlight error:', error);
      }
    });

    return count;
  }

  /**
   * Highlight a single code block
   *
   * @param {HTMLElement} block - Code block element to highlight
   * @returns {boolean} True if successfully highlighted
   *
   * @example
   * const success = service.highlightElement(codeBlock);
   */
  highlightElement(block) {
    if (!this.isPrismLoaded()) {
      console.warn('Prism library not loaded');
      return false;
    }

    try {
      Prism.highlightElement(block);
      return true;
    } catch (error) {
      console.error('Prism highlight error:', error);
      return false;
    }
  }

  /**
   * Check if service is ready to highlight code
   *
   * @returns {boolean} True if Prism is loaded
   */
  isReady() {
    return this.isPrismLoaded();
  }

  /**
   * Get list of supported languages
   *
   * @returns {string[]} Array of language keys
   *
   * @example
   * const languages = service.getSupportedLanguages();
   * // Returns: ['javascript', 'python', 'java', ...]
   */
  getSupportedLanguages() {
    if (!this.isPrismLoaded()) {
      return [];
    }

    return Object.keys(Prism.languages || {});
  }
}
