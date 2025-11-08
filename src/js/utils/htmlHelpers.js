/**
 * HTML Utility Functions
 *
 * Reusable functions for HTML manipulation and processing.
 */

/**
 * Decodes HTML entities in text
 * Critical for Mermaid diagram rendering
 *
 * @param {string} text - Text containing HTML entities
 * @returns {string} Decoded text
 *
 * @example
 * decodeHtmlEntities('&lt;div&gt;') // Returns: '<div>'
 * decodeHtmlEntities('A{Start}')    // Returns: 'A{Start}' (unchanged)
 */
export function decodeHtmlEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

/**
 * Creates a Blob URL for file download
 *
 * @param {string} content - File content
 * @param {string} mimeType - MIME type (e.g., 'text/html')
 * @returns {string} Blob URL
 *
 * @example
 * const url = createBlobUrl('<html>...</html>', 'text/html');
 */
export function createBlobUrl(content, mimeType) {
  const blob = new Blob([content], { type: mimeType });
  return URL.createObjectURL(blob);
}

/**
 * Triggers file download in browser
 *
 * @param {string} url - File URL (blob or data URL)
 * @param {string} filename - Download filename
 *
 * @example
 * const url = createBlobUrl(html, 'text/html');
 * downloadFile(url, 'export.html');
 */
export function downloadFile(url, filename) {
  const anchor = document.createElement('a');
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

/**
 * Generates a unique ID for elements
 *
 * @param {string} prefix - ID prefix
 * @returns {string} Unique ID
 *
 * @example
 * generateId('mermaid') // Returns: 'mermaid-a1b2c3d4'
 */
export function generateId(prefix = 'id') {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}
