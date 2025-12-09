/**
 * PDFService - PDF Generation and Preview Service
 *
 * Handles PDF generation with customizable settings (margins, page size, orientation, font size).
 * Provides preview functionality before download.
 */

import { PDF_CONFIG } from '../config/constants.js';

/**
 * @class PDFService
 * @description Service for PDF generation with preview and customization
 *
 * @example
 * const pdfService = new PDFService();
 * const config = { pageSize: 'A4', orientation: 'portrait', margins: [0.5, 0.5, 0.5, 0.5], fontSize: 12 };
 * await pdfService.generatePDF(contentElement, config);
 */
export class PDFService {
  constructor() {
    this.currentConfig = this.getDefaultConfig();
    this.currentBlob = null;
  }

  /**
   * Get default PDF configuration
   *
   * @returns {Object} Default configuration object
   * @private
   */
  getDefaultConfig() {
    return {
      pageSize: 'A4',
      orientation: PDF_CONFIG.ORIENTATIONS.PORTRAIT,
      margins: [...PDF_CONFIG.DEFAULT_MARGINS],
      fontSize: PDF_CONFIG.FONT_SIZES.DEFAULT,
      filename: 'markdown-export.pdf',
    };
  }

  /**
   * Check if html2pdf library is loaded
   *
   * @returns {boolean} True if html2pdf is available
   */
  isReady() {
    return typeof html2pdf !== 'undefined';
  }

  /**
   * Validate PDF configuration
   *
   * @param {Object} config - Configuration object to validate
   * @returns {boolean} True if config is valid
   * @private
   */
  validateConfig(config) {
    if (!config || typeof config !== 'object') {
      return false;
    }

    // Validate page size
    if (config.pageSize && !PDF_CONFIG.PAGE_SIZES[config.pageSize.toUpperCase()]) {
      console.error('Invalid page size:', config.pageSize);
      return false;
    }

    // Validate orientation
    const validOrientations = Object.values(PDF_CONFIG.ORIENTATIONS);
    if (config.orientation && !validOrientations.includes(config.orientation)) {
      console.error('Invalid orientation:', config.orientation);
      return false;
    }

    // Validate margins
    if (config.margins && (!Array.isArray(config.margins) || config.margins.length !== 4)) {
      console.error('Invalid margins: must be array of 4 numbers');
      return false;
    }

    // Validate font size
    if (config.fontSize) {
      const size = Number(config.fontSize);
      if (isNaN(size) || size < PDF_CONFIG.FONT_SIZES.MIN || size > PDF_CONFIG.FONT_SIZES.MAX) {
        console.error('Invalid font size:', config.fontSize);
        return false;
      }
    }

    return true;
  }

  /**
   * Prepare HTML content with configuration
   *
   * @param {HTMLElement} content - Content element to export
   * @param {Object} config - PDF configuration
   * @returns {HTMLElement} Prepared container element
   * @private
   */
  prepareContent(content, config, themeName, customTheme, margins = [0.5, 0.5, 0.5, 0.5]) {
    const container = document.createElement('div');
    container.className = 'pdf-export-mode'; // Add class for specific overrides

    // Apply margins as padding to ensure background covers the entire page
    // (html2canvas captures the element including padding)
    container.style.padding = `${margins[0]}in ${margins[1]}in ${margins[2]}in ${margins[3]}in`;
    container.style.boxSizing = 'border-box';

    // Create a wrapper for the actual content to apply internal styles
    const contentWrapper = document.createElement('div');
    contentWrapper.style.fontFamily =
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif';
    contentWrapper.style.maxWidth = '800px';
    contentWrapper.style.margin = '0 auto';
    contentWrapper.style.lineHeight = '1.7';
    contentWrapper.style.fontSize = `${config.fontSize || PDF_CONFIG.FONT_SIZES.DEFAULT}pt`;

    // Apply current theme colors
    contentWrapper.style.backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--bg-primary')
      .trim();
    contentWrapper.style.color = getComputedStyle(document.documentElement)
      .getPropertyValue('--text-primary')
      .trim();

    // Handle content as either a Node or a string
    if (typeof content === 'string') {
      contentWrapper.innerHTML = content;
    } else if (content instanceof Node) {
      contentWrapper.appendChild(content.cloneNode(true));
    } else {
      console.warn('Invalid content type for PDF generation. Expected HTMLElement or string.');
    }

    container.appendChild(contentWrapper);

    // Add Footer
    const footer = document.createElement('div');
    footer.style.marginTop = '40px';
    const borderColor = getComputedStyle(document.documentElement).getPropertyValue('--border-color').trim();
    const textColor = getComputedStyle(document.documentElement).getPropertyValue('--text-secondary').trim();

    footer.style.borderTop = `1px solid ${borderColor}`;
    footer.style.paddingTop = '20px';
    footer.style.textAlign = 'center';
    footer.style.color = textColor;
    footer.style.fontSize = '0.85em';
    footer.innerHTML = `
        <p style="margin: 5px 0;">Generated by <a href="https://prakharmnnit.github.io/markdown-viewer-app/" style="color: #0969da; text-decoration: underline;">Markdown Viewer Pro</a></p>
        <p style="margin: 5px 0;">Made with ❤️ by Prax Lannister | Follow me on <a href="https://github.com/PrakharMNNIT" style="color: #0969da;">GitHub</a> & <a href="https://x.com/ByteByByteSrSDE" style="color: #0969da;">X (Twitter)</a></p>
    `;
    container.appendChild(footer);

    return container;
  }

  /**
   * Build html2pdf configuration object
   *
   * @param {Object} config - User configuration
   * @returns {Object} html2pdf configuration
   * @private
   */
  buildHtml2PdfConfig(config) {
    const pageSize = config.pageSize || 'A4';
    const orientation = config.orientation || PDF_CONFIG.ORIENTATIONS.PORTRAIT;

    // Ensure margins are numbers and safe
    // But we use 0 margin for html2pdf ensuring full background coverage
    // Margins are handled via padding in prepareContent

    return {
      margin: 0, // Zero margin for full bleed background
      filename: config.filename || 'markdown-export.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: {
        scale: 2,
        useCORS: true,
        letterRendering: true,
        backgroundColor: getComputedStyle(document.documentElement)
          .getPropertyValue('--bg-primary')
          .trim(),
      },
      jsPDF: {
        unit: 'in',
        format: pageSize.toLowerCase(),
        orientation: orientation,
      },
      pagebreak: { mode: ['avoid-all', 'css', 'legacy'] },
    };
  }

  /**
   * Generate PDF and return as blob
   *
   * @param {HTMLElement} contentElement - Content element to export
   * @param {Object} config - PDF configuration
   * @returns {Promise<Blob>} PDF blob
   * @throws {Error} If html2pdf not loaded or generation fails
   *
   * @example
   * const blob = await pdfService.generatePDF(previewElement, config);
   */
  async generatePDF(contentElement, config = {}) {
    if (!this.isReady()) {
      throw new Error('html2pdf library not loaded');
    }

    // Merge with defaults and validate
    const mergedConfig = { ...this.getDefaultConfig(), ...config };
    if (!this.validateConfig(mergedConfig)) {
      throw new Error('Invalid PDF configuration');
    }

    try {
      // Sanitize margins for internal use (Padding)
      let margins = mergedConfig.margins || PDF_CONFIG.DEFAULT_MARGINS;
      if (Array.isArray(margins)) {
        margins = margins.map(m => {
          const val = parseFloat(m);
          return isFinite(val) ? val : 0.5; // Default to 0.5 if invalid
        });
      } else {
        margins = PDF_CONFIG.DEFAULT_MARGINS; // Fallback if margins is not an array
      }

      // Prepare content with isolated styles and margins as padding
      const container = this.prepareContent(contentElement, mergedConfig, mergedConfig.themeName, mergedConfig.customTheme, margins);

      // Build html2pdf config
      const pdfConfig = this.buildHtml2PdfConfig(mergedConfig);

      // Generate PDF blob
      const pdf = html2pdf().set(pdfConfig).from(container);
      const blob = await pdf.outputPdf('blob');

      // Store for potential download
      this.currentBlob = blob;
      this.currentConfig = mergedConfig;

      return blob;
    } catch (error) {
      console.error('PDF generation error:', error);
      throw new Error(`Failed to generate PDF: ${error.message}`);
    }
  }

  /**
   * Generate PDF preview URL
   *
   * @param {HTMLElement} content - Content to preview
   * @param {Object} config - PDF configuration
   * @returns {Promise<string>} Blob URL for preview
   * @throws {Error} If generation fails
   *
   * @example
   * const previewUrl = await pdfService.previewPDF(previewElement, config);
   * iframe.src = previewUrl;
   */
  async previewPDF(content, config = {}) {
    const blob = await this.generatePDF(content, config);
    return URL.createObjectURL(blob);
  }

  /**
   * Download previously generated PDF
   *
   * @param {string} filename - Optional custom filename
   * @returns {boolean} True if download initiated
   *
   * @example
   * pdfService.downloadPDF('my-document.pdf');
   */
  downloadPDF(filename) {
    if (!this.currentBlob) {
      console.error('No PDF generated yet');
      return false;
    }

    try {
      const url = URL.createObjectURL(this.currentBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = filename || this.currentConfig.filename;
      a.click();
      URL.revokeObjectURL(url);
      return true;
    } catch (error) {
      console.error('PDF download error:', error);
      return false;
    }
  }

  /**
   * Get current PDF configuration
   *
   * @returns {Object} Current configuration
   */
  getCurrentConfig() {
    return { ...this.currentConfig };
  }

  /**
   * Update configuration
   *
   * @param {Object} config - New configuration values
   * @returns {boolean} True if update successful
   *
   * @example
   * pdfService.updateConfig({ fontSize: 14, orientation: 'landscape' });
   */
  updateConfig(config) {
    if (!this.validateConfig(config)) {
      return false;
    }

    this.currentConfig = { ...this.currentConfig, ...config };
    return true;
  }

  /**
   * Reset to default configuration
   *
   * @returns {Object} Default configuration
   */
  resetConfig() {
    this.currentConfig = this.getDefaultConfig();
    return this.getCurrentConfig();
  }

  /**
   * Get available page sizes
   *
   * @returns {string[]} Array of page size names
   */
  getAvailablePageSizes() {
    return Object.keys(PDF_CONFIG.PAGE_SIZES);
  }

  /**
   * Get available orientations
   *
   * @returns {string[]} Array of orientation values
   */
  getAvailableOrientations() {
    return Object.values(PDF_CONFIG.ORIENTATIONS);
  }
}
