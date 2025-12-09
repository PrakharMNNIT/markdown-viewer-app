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
  prepareContent(content, config) {
    // Clone content
    const element = content.cloneNode(true);

    // Create container with theme styles
    const container = document.createElement('div');
    container.className = 'html2pdf__container pdf-export-mode';
    container.style.fontFamily =
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, sans-serif';
    container.style.maxWidth = '800px';
    container.style.margin = '0 auto';
    container.style.padding = '40px 20px';
    container.style.lineHeight = '1.7';
    container.style.fontSize = `${config.fontSize || PDF_CONFIG.FONT_SIZES.DEFAULT}pt`;

    // Apply current theme colors
    container.style.backgroundColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--bg-primary')
      .trim();
    container.style.color = getComputedStyle(document.documentElement)
      .getPropertyValue('--text-primary')
      .trim();

    container.appendChild(element);
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
    const margins = config.margins || PDF_CONFIG.DEFAULT_MARGINS;

    return {
      margin: margins,
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
   * @param {HTMLElement} content - Content to export
   * @param {Object} config - PDF configuration
   * @returns {Promise<Blob>} PDF blob
   * @throws {Error} If html2pdf not loaded or generation fails
   *
   * @example
   * const blob = await pdfService.generatePDF(previewElement, config);
   */
  async generatePDF(content, config = {}) {
    if (!this.isReady()) {
      throw new Error('html2pdf library not loaded');
    }

    // Merge with defaults and validate
    const mergedConfig = { ...this.getDefaultConfig(), ...config };
    if (!this.validateConfig(mergedConfig)) {
      throw new Error('Invalid PDF configuration');
    }

    try {
      // Prepare content with configuration
      const container = this.prepareContent(content, mergedConfig);

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
