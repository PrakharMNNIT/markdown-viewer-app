/**
 * PrismService - Syntax Highlighting Service (Enterprise Grade)
 *
 * Production-grade service using Prism.js native APIs with autoloader plugin.
 * This implementation follows Prism.js best practices and design patterns.
 *
 * Architecture:
 * - Uses Prism's battle-tested highlightAllUnder() method
 * - Relies on autoloader plugin for automatic language loading
 * - Handles dependency resolution automatically
 * - Graceful degradation on errors
 * - No custom retry logic needed - autoloader handles it
 *
 * Supports: 200+ programming languages out of the box
 */

/**
 * @class PrismService
 * @description Production-grade service for syntax highlighting
 *
 * @example
 * const service = new PrismService();
 * const count = service.highlightAll(previewElement);
 * console.log(`Highlighted ${count} code blocks`);
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
   * Highlight all code blocks in container using Prism's native API
   *
   * This method uses Prism.highlightAllUnder() which is specifically
   * designed for highlighting code within a container element.
   * The autoloader plugin automatically handles language loading.
   *
   * @param {HTMLElement} container - Container element with code blocks
   * @returns {number} Number of code blocks found
   *
   * @example
   * const count = service.highlightAll(document.getElementById('preview'));
   */
  highlightAll(container) {
    if (!this.isPrismLoaded()) {
      console.warn('⚠️ Prism library not loaded - syntax highlighting unavailable');
      return 0;
    }

    try {
      // Use Prism's native method - it's battle-tested and handles everything
      Prism.highlightAllUnder(container);

      // Count highlighted blocks for feedback
      const highlightedBlocks = container.querySelectorAll('pre code[class*="language-"]');
      return highlightedBlocks.length;
    } catch (error) {
      // Log error but don't break the app
      console.error('❌ Syntax highlighting error:', error);
      return 0;
    }
  }

  /**
   * Highlight a single code block element
   *
   * Uses Prism.highlightElement() for individual code blocks.
   * The autoloader will fetch languages on-demand if needed.
   *
   * @param {HTMLElement} block - Code block element to highlight
   * @returns {boolean} True if highlighting attempted successfully
   *
   * @example
   * const success = service.highlightElement(codeBlock);
   */
  highlightElement(block) {
    if (!this.isPrismLoaded()) {
      console.warn('⚠️ Prism library not loaded');
      return false;
    }

    try {
      Prism.highlightElement(block);
      return true;
    } catch (error) {
      console.error('❌ Error highlighting code block:', error);
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
   * Get list of currently loaded languages
   *
   * Note: With autoloader, languages load on-demand, so this list
   * will grow as different languages are used.
   *
   * @returns {string[]} Array of currently loaded language identifiers
   *
   * @example
   * const languages = service.getSupportedLanguages();
   * console.log('Loaded languages:', languages);
   */
  getSupportedLanguages() {
    if (!this.isPrismLoaded()) {
      return [];
    }

    // Filter out Prism internal properties
    return Object.keys(Prism.languages || {}).filter(
      lang => lang !== 'extend' && lang !== 'insertBefore' && lang !== 'DFS',
    );
  }

  /**
   * Check if autoloader plugin is available
   *
   * The autoloader is essential for automatic language loading.
   * Without it, only pre-loaded languages will work.
   *
   * @returns {boolean} True if autoloader plugin is loaded
   */
  hasAutoloader() {
    return (
      this.isPrismLoaded() &&
      typeof Prism.plugins !== 'undefined' &&
      typeof Prism.plugins.autoloader !== 'undefined'
    );
  }

  /**
   * Get count of code blocks in container
   *
   * Utility method to check how many code blocks will be highlighted
   *
   * @param {HTMLElement} container - Container to check
   * @returns {number} Number of code blocks found
   */
  getCodeBlockCount(container) {
    return container.querySelectorAll('pre code').length;
  }
}
