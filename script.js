// Markdown Viewer Pro - Main Script

// Import constants, utilities, services, and core modules
import DOMPurify from 'dompurify';
import { StorageManager } from './src/js/core/StorageManager.js';
import { ThemeManager } from './src/js/core/ThemeManager.js';
import { FolderBrowserService } from './src/js/services/FolderBrowserService.js';
import { MermaidService } from './src/js/services/MermaidService.js';
import { PDFService } from './src/js/services/PDFService.js';
import { PrismService } from './src/js/services/PrismService.js';

// Initialize services and managers
const storageManager = new StorageManager();
const themeManager = new ThemeManager(storageManager);
const mermaidService = new MermaidService();
const prismService = new PrismService();
const pdfService = new PDFService();
const folderBrowserService = new FolderBrowserService(storageManager);

// Folder browser state
const currentFolderFiles = [];
const currentFileHandle = null;

// Global render function reference (will be set in setupEditor)
let globalRenderMarkdown = null;

// Configure theme change listener to update Mermaid and force re-render
themeManager.setThemeChangeListener(() => {
  mermaidService.reinitialize();

  // Force re-render of markdown to apply new Mermaid colors
  // No timeout needed - waiting for next microtask is sufficient
  if (globalRenderMarkdown) {
    console.log('🔄 Re-rendering diagrams with new theme colors');
    globalRenderMarkdown();
  }
});

// Wait for all scripts to load
window.addEventListener('DOMContentLoaded', () => {
  initializeApp();
});

function initializeApp() {
  // Check if libraries are loaded
  if (
    typeof marked === 'undefined' ||
    typeof Prism === 'undefined' ||
    typeof mermaid === 'undefined'
  ) {
    console.error('Required libraries not loaded. Retrying...');
    setTimeout(initializeApp, 100);
    return;
  }

  // Wait for html2pdf to load before setting up editor
  if (typeof html2pdf === 'undefined') {
    console.log('Waiting for html2pdf library...');
    setTimeout(initializeApp, 100);
    return;
  }

  // Wait for KaTeX to load
  if (typeof katex === 'undefined') {
    console.log('Waiting for KaTeX library...');
    setTimeout(initializeApp, 100);
    return;
  }

  // Wait for KaTeX auto-render to load
  if (typeof renderMathInElement === 'undefined') {
    console.log('Waiting for KaTeX auto-render...');
    setTimeout(initializeApp, 100);
    return;
  }

  console.log('All libraries loaded successfully');

  // Configure Prism autoloader with correct CDN path
  if (typeof Prism !== 'undefined' && Prism.plugins && Prism.plugins.autoloader) {
    Prism.plugins.autoloader.languages_path =
      'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/';
    console.log('✅ Prism autoloader configured - 200+ languages available');
  }

  console.log('✅ KaTeX loaded - Math formula rendering available');

  // Configure marked.js extensions
  configureMarkedExtensions();

  // DON'T initialize Mermaid here - let saved theme load first
  // Mermaid will initialize after theme loads in setupEditor()

  setupEditor();
}

/**
 * Debounce utility function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
function debounce(func, wait) {
  let timeout;
  return function truncated(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

// Configure marked.js extensions (math + footnotes + admonitions)
function configureMarkedExtensions() {
  // Enable footnote support
  if (typeof markedFootnote !== 'undefined') {
    marked.use(markedFootnote());
    console.log('✅ Footnotes enabled');
  }

  // Add GitHub-style admonitions
  marked.use({
    extensions: [
      {
        name: 'admonition',
        level: 'block',
        start(src) {
          return src.match(/^> \[!/)?.index;
        },
        tokenizer(src) {
          const match = src.match(
            /^> \[!(NOTE|TIP|IMPORTANT|WARNING|CAUTION)\]\s*\n((?:> .*\n?)*)/
          );
          if (match) {
            const type = match[1];
            const content = match[2].replace(/^> ?/gm, '').trim();
            return {
              type: 'admonition',
              raw: match[0],
              admonitionType: type,
              text: content,
            };
          }
        },
        renderer(token) {
          const icons = {
            NOTE: 'ℹ️',
            TIP: '💡',
            IMPORTANT: '❗',
            WARNING: '⚠️',
            CAUTION: '🚨',
          };
          const icon = icons[token.admonitionType] || 'ℹ️';
          const typeClass = token.admonitionType.toLowerCase();

          return `<div class="admonition admonition-${typeClass}">
            <div class="admonition-title">
              <span class="admonition-icon">${icon}</span>
              <strong>${token.admonitionType}</strong>
            </div>
            <div class="admonition-content">${marked.parseInline(token.text)}</div>
          </div>`;
        },
      },
    ],
  });
  console.log('✅ GitHub admonitions enabled');

  // Configure math formulas
  if (typeof katex === 'undefined') {
    console.warn('KaTeX not loaded, math rendering unavailable');
    return;
  }

  // Add inline math and text formatting extensions only
  // LaTeX environments (align, gather, etc.) are not supported by KaTeX
  marked.use({
    extensions: [
      {
        name: 'mathBlock',
        level: 'block',
        start(src) {
          return src.match(/^\$\$/)?.index;
        },
        tokenizer(src) {
          const match = src.match(/^\$\$([\s\S]+?)\$\$/);
          if (match) {
            return {
              type: 'mathBlock',
              raw: match[0],
              text: match[1].trim(),
            };
          }
        },
        renderer(token) {
          try {
            return (
              '<div style="margin: 1.5em 0;">' +
              katex.renderToString(token.text, {
                displayMode: true,
                throwOnError: false,
                output: 'html',
              }) +
              '</div>'
            );
          } catch (e) {
            console.warn('KaTeX display math error:', e);
            return `<div style="color: red; padding: 10px;">Math Error: ${e.message}</div>`;
          }
        },
      },
      {
        name: 'mathInline',
        level: 'inline',
        start(src) {
          return src.match(/\$/)?.index;
        },
        tokenizer(src) {
          // Try display math first ($$...$$)
          const displayMatch = src.match(/^\$\$([\s\S]+?)\$\$/);
          if (displayMatch) {
            return {
              type: 'mathInline',
              raw: displayMatch[0],
              text: displayMatch[1].trim(),
              displayMode: true,
            };
          }

          // Then try inline math ($...$)
          const inlineMatch = src.match(/^\$([^$\n]+?)\$/);
          if (inlineMatch) {
            return {
              type: 'mathInline',
              raw: inlineMatch[0],
              text: inlineMatch[1].trim(),
              displayMode: false,
            };
          }
        },
        renderer(token) {
          try {
            const rendered = katex.renderToString(token.text, {
              displayMode: token.displayMode || false,
              throwOnError: false,
              output: 'html',
            });

            // Wrap display math in a div for proper spacing
            if (token.displayMode) {
              return '<div style="margin: 1.5em 0;">' + rendered + '</div>';
            }
            return rendered;
          } catch (e) {
            console.warn('KaTeX math error:', e);
            return `<span style="color: red;">Math Error</span>`;
          }
        },
      },
      {
        name: 'subscript',
        level: 'inline',
        start(src) {
          return src.match(/~/)?.index;
        },
        tokenizer(src) {
          const match = src.match(/^~([^~\s]+)~/);
          if (match) {
            return {
              type: 'subscript',
              raw: match[0],
              text: match[1],
            };
          }
        },
        renderer(token) {
          return `<sub>${token.text}</sub>`;
        },
      },
      {
        name: 'superscript',
        level: 'inline',
        start(src) {
          return src.match(/\^/)?.index;
        },
        tokenizer(src) {
          const match = src.match(/^\^([^^\s]+)\^/);
          if (match) {
            return {
              type: 'superscript',
              raw: match[0],
              text: match[1],
            };
          }
        },
        renderer(token) {
          return `<sup>${token.text}</sup>`;
        },
      },
    ],
  });

  console.log('✅ Marked.js configured with all extensions (LaTeX, subscript, superscript)');
}

// Initialize Mermaid using MermaidService
function initMermaidTheme() {
  mermaidService.initialize();
}

function setupEditor() {
  // Default markdown content
  const defaultMarkdown = `# Welcome to Markdown Viewer Pro! 🚀

This is a powerful markdown viewer with **syntax highlighting**, *italic text*, and much more!

## Features

- ✅ Real-time preview
- ✅ Syntax highlighting for 20+ languages
- ✅ Mermaid diagram support
- ✅ 10 built-in themes (5 themes × 2 variants each)
- ✅ Custom color customization
- ✅ Export to HTML

## Code Examples

### Java
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}
\`\`\`

### C++
\`\`\`cpp
#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}
\`\`\`

### Python
\`\`\`python
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

print(fibonacci(10))
\`\`\`

## Mermaid Diagram Example

\`\`\`mermaid
graph TD
    A[Start] --> B{Is it working?}
    B -->|Yes| C[Great!]
    B -->|No| D[Debug]
    D --> A
    C --> E[End]
\`\`\`

## Tables

| Language | Type | Year |
|----------|------|------|
| JavaScript | Dynamic | 1995 |
| Python | Dynamic | 1991 |
| Java | Static | 1995 |
| Rust | Static | 2010 |

## Quotes

> "The best way to predict the future is to invent it." - Alan Kay

## Lists

### Ordered List
1. First item
2. Second item
3. Third item

### Unordered List
- Bullet point one
- Bullet point two
- Bullet point three

---

**Try switching themes** from the dropdown menu! 🎨
`;

  // DOM Elements
  const editor = document.getElementById('markdown-editor');
  const preview = document.getElementById('markdown-preview');
  const themeSelector = document.getElementById('theme-selector');
  const customizeBtn = document.getElementById('customize-btn');
  const exportHtmlBtn = document.getElementById('export-html-btn');
  const exportPdfBtn = document.getElementById('export-pdf-btn');
  const modal = document.getElementById('customizer-modal');
  const closeModal = document.getElementById('close-modal');
  const resetBtn = document.getElementById('reset-btn');
  const saveThemeBtn = document.getElementById('save-theme-btn');
  const themeStylesheet = document.getElementById('theme-stylesheet');

  // View mode buttons
  const editorOnlyBtn = document.getElementById('editor-only-btn');
  const splitViewBtn = document.getElementById('split-view-btn');
  const previewOnlyBtn = document.getElementById('preview-only-btn');
  const syncScrollBtn = document.getElementById('sync-scroll-btn');
  const editorContainer = document.querySelector('.editor-container');
  const previewContainer = document.querySelector('.preview-container');

  // Sync scroll state
  const isSyncScrollEnabled = false;
  const isScrolling = false;

  // Zoom controls
  const zoomInBtn = document.getElementById('zoom-in-btn');
  const zoomOutBtn = document.getElementById('zoom-out-btn');
  const zoomResetBtn = document.getElementById('zoom-reset-btn');
  const zoomLevelDisplay = document.getElementById('zoom-level');
  let currentZoom = 100; // Default zoom level

  // Set default content using StorageManager
  const savedContent = storageManager.get('markdownContent');
  editor.value = savedContent || defaultMarkdown;

  // Helper function to decode HTML entities
  function decodeHtmlEntities(text) {
    const textarea = document.createElement('textarea');
    textarea.innerHTML = text;
    return textarea.value;
  }

  // Keep only subscript and superscript extensions
  // Remove LaTeX environment extensions that don't work with KaTeX
  marked.use({
    extensions: [
      {
        name: 'subscript',
        level: 'inline',
        start(src) {
          return src.match(/~/)?.index;
        },
        tokenizer(src) {
          const match = src.match(/^~([^~\s]+)~/);
          if (match) {
            return {
              type: 'subscript',
              raw: match[0],
              text: match[1],
            };
          }
        },
        renderer(token) {
          return `<sub>${token.text}</sub>`;
        },
      },
      {
        name: 'superscript',
        level: 'inline',
        start(src) {
          return src.match(/\^/)?.index;
        },
        tokenizer(src) {
          const match = src.match(/^\^([^^\s]+)\^/);
          if (match) {
            return {
              type: 'superscript',
              raw: match[0],
              text: match[1],
            };
          }
        },
        renderer(token) {
          return `<sup>${token.text}</sup>`;
        },
      },
    ],
  });

  console.log('✅ Subscript and superscript enabled (LaTeX environments display as-is)');

  // Render markdown (expose globally for theme changes)
  function renderMarkdown() {
    try {
      const markdownText = editor.value;

      // Parse markdown with all extensions
      let html = marked.parse(markdownText);

      // Replace mermaid code blocks with placeholders
      html = html.replace(
        /<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g,
        (match, code) => {
          const decodedCode = decodeHtmlEntities(code);
          const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
          // Return placeholder div
          return `<div class="mermaid" id="${id}" data-code="${encodeURIComponent(decodedCode)}">${code}</div>`;
        }
      );

      // Sanitize HTML using DOMPurify
      const cleanHtml = DOMPurify.sanitize(html, {
        ADD_TAGS: ['iframe'],
        ADD_ATTR: ['allow', 'allowfullscreen', 'frameborder', 'scrolling', 'target', 'data-code'], // Add data-code
        USE_PROFILES: { html: true, svg: true, mathml: true },
      });

      preview.innerHTML = cleanHtml;

      // Render Mermaid diagrams synchronously after DOM update
      const mermaidElements = preview.querySelectorAll('.mermaid');
      mermaidElements.forEach(element => {
        const id = element.id;
        const code = decodeURIComponent(element.dataset.code);

        if (typeof mermaid !== 'undefined') {
          mermaid
            .render('mermaid-svg-' + id, code)
            .then(result => {
              element.innerHTML = result.svg;
            })
            .catch(err => {
              element.innerHTML = `<p style="color: red;">Mermaid diagram error: ${err.message}</p>`;
            });
        }
      });

      // Apply Prism syntax highlighting using PrismService
      prismService.highlightAll(preview);

      // NOTE: KaTeX auto-render is DISABLED
      // We handle all math via marked.js extensions ($...$ and $$...$$)
      // KaTeX auto-render was causing issues with unsupported LaTeX environments

      // Save content using StorageManager
      storageManager.set('markdownContent', markdownText);
    } catch (error) {
      console.error('Render error:', error);
      preview.innerHTML =
        '<p style="color: red;">Error rendering markdown: ' + error.message + '</p>';
    }
  }

  // Change theme using ThemeManager
  async function changeTheme(themeName) {
    await themeManager.loadTheme(themeName);
    // ThemeManager listener (above) will handle the re-render automatically
  }

  // Initialize color inputs
  function initColorInputs() {
    document.querySelectorAll('.color-control input[type="color"]').forEach(input => {
      const varName = input.dataset.var;
      const textInput = document.getElementById(input.id + '-text');
      const currentValue = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();

      input.value = currentValue;
      textInput.value = currentValue;

      input.addEventListener('input', e => {
        const color = e.target.value;
        document.documentElement.style.setProperty(varName, color);
        textInput.value = color;
      });
    });
  }

  // Export to HTML
  function exportHTML() {
    const currentTheme = themeSelector.value;
    let themeCSS = '';

    if (currentTheme === 'custom') {
      const customTheme = storageManager.getJSON('customTheme');
      if (customTheme) {
        const theme = customTheme;
        themeCSS = ':root {\n';
        Object.entries(theme).forEach(([property, value]) => {
          themeCSS += `    ${property}: ${value};\n`;
        });
        themeCSS += '}';
      }
    } else {
      // Fetch theme CSS
      fetch(`themes/${currentTheme}.css`)
        .then(response => response.text())
        .then(css => {
          themeCSS = css;
          generateHTML();
        })
        .catch(err => {
          console.error('Error loading theme:', err);
          generateHTML();
        });
      return;
    }

    generateHTML();

    function generateHTML() {
      const html = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Exported Markdown</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css">
    <style>
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px 20px;
            line-height: 1.7;
        }

        ${themeCSS}

        body {
            background-color: var(--bg-primary);
            color: var(--text-primary);
        }

        h1 { color: var(--h1-color); font-size: 2.5em; margin: 0.67em 0; border-bottom: 2px solid var(--h1-color); padding-bottom: 0.3em; }
        h2 { color: var(--h2-color); font-size: 2em; margin: 0.75em 0 0.5em 0; }
        h3 { color: var(--h3-color); font-size: 1.5em; margin: 0.83em 0; }
        h4 { color: var(--h4-color); font-size: 1.25em; margin: 1em 0; }
        h5 { color: var(--h5-color); font-size: 1em; margin: 1.33em 0; }
        h6 { color: var(--h6-color); font-size: 0.875em; margin: 1.67em 0; }

        a { color: var(--link-color); text-decoration: none; }
        a:hover { color: var(--link-hover); text-decoration: underline; }

        strong { color: var(--bold-color); font-weight: 700; }
        em { color: var(--italic-color); font-style: italic; }

        code { background-color: var(--code-bg); color: var(--code-text); padding: 2px 6px; border-radius: 4px; font-family: 'Consolas', 'Monaco', monospace; font-size: 0.9em; }
        pre { background-color: var(--code-block-bg); border-radius: 8px; padding: 16px; overflow-x: auto; margin: 1.5em 0; }
        pre code { background-color: transparent; color: inherit; padding: 0; }

        blockquote { border-left: 4px solid var(--blockquote-border); background-color: var(--blockquote-bg); padding: 12px 20px; margin: 1.5em 0; font-style: italic; }

        table { border-collapse: collapse; width: 100%; margin: 1.5em 0; }
        th { background-color: var(--table-header-bg); padding: 12px; text-align: left; border: 1px solid var(--table-border); font-weight: 600; }
        td { padding: 10px 12px; border: 1px solid var(--table-border); }

        hr { border: none; border-top: 2px solid var(--border-color); margin: 2em 0; }
        img { max-width: 100%; height: auto; border-radius: 8px; margin: 1em 0; }
    </style>
</head>
<body>
    ${DOMPurify.sanitize(preview.innerHTML)}
</body>
</html>`;

      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'markdown-export.html';
      a.click();
      URL.revokeObjectURL(url);
    }
  }

  // Event Listeners
  const debouncedRender = debounce(renderMarkdown, 300);
  editor.addEventListener('input', debouncedRender);

  themeSelector.addEventListener('change', async e => {
    await changeTheme(e.target.value);
  });

  customizeBtn.addEventListener('click', () => {
    modal.classList.add('active');
    initColorInputs();
  });

  closeModal.addEventListener('click', () => {
    modal.classList.remove('active');
  });

  modal.addEventListener('click', e => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });

  resetBtn.addEventListener('click', async () => {
    const currentTheme = themeSelector.value === 'custom' ? 'default-light' : themeSelector.value;
    await changeTheme(currentTheme);
    initColorInputs();
  });

  saveThemeBtn.addEventListener('click', async () => {
    const customTheme = {};
    document.querySelectorAll('.color-control input[type="color"]').forEach(input => {
      const varName = input.dataset.var;
      customTheme[varName] = input.value;
    });

    // Save and load custom theme using ThemeManager
    themeManager.saveCustomTheme(customTheme);
    await themeManager.loadTheme('custom');
    themeSelector.value = 'custom';

    alert('Custom theme saved and applied!');
    modal.classList.remove('active');
  });

  // PDF Modal and Controls
  const pdfModal = document.getElementById('pdf-modal');
  const closePdfModal = document.getElementById('close-pdf-modal');
  const pdfPreviewFrame = document.getElementById('pdf-preview-frame');
  const pdfPageSize = document.getElementById('pdf-page-size');
  const pdfOrientation = document.getElementById('pdf-orientation');
  const pdfMarginTop = document.getElementById('pdf-margin-top');
  const pdfMarginRight = document.getElementById('pdf-margin-right');
  const pdfMarginBottom = document.getElementById('pdf-margin-bottom');
  const pdfMarginLeft = document.getElementById('pdf-margin-left');
  const pdfFontDecrease = document.getElementById('pdf-font-decrease');
  const pdfFontIncrease = document.getElementById('pdf-font-increase');
  const pdfFontSizeDisplay = document.getElementById('pdf-font-size-display');
  const pdfPreviewBtn = document.getElementById('pdf-preview-btn');
  const pdfDownloadBtn = document.getElementById('pdf-download-btn');

  let currentFontSize = 12;

  // Open PDF modal
  function openPDFModal() {
    if (!pdfService.isReady()) {
      alert('PDF library is still loading. Please try again in a moment.');
      return;
    }
    pdfModal.classList.add('active');
    updatePDFPreview();
  }

  // Close PDF modal
  closePdfModal.addEventListener('click', () => {
    pdfModal.classList.remove('active');
    // Clean up iframe
    pdfPreviewFrame.src = '';
  });

  pdfModal.addEventListener('click', e => {
    if (e.target === pdfModal) {
      pdfModal.classList.remove('active');
      pdfPreviewFrame.src = '';
    }
  });

  // Get current PDF configuration from UI
  function getPDFConfig() {
    return {
      pageSize: pdfPageSize.value,
      orientation: pdfOrientation.value,
      margins: [
        parseFloat(pdfMarginTop.value),
        parseFloat(pdfMarginRight.value),
        parseFloat(pdfMarginBottom.value),
        parseFloat(pdfMarginLeft.value),
      ],
      fontSize: currentFontSize,
    };
  }

  // Update PDF preview
  async function updatePDFPreview() {
    try {
      pdfPreviewBtn.textContent = '⏳ Generating Preview...';
      pdfPreviewBtn.disabled = true;

      const config = getPDFConfig();
      const previewUrl = await pdfService.previewPDF(preview, config);
      pdfPreviewFrame.src = previewUrl;

      pdfPreviewBtn.textContent = '👁️ Update Preview';
      pdfPreviewBtn.disabled = false;
    } catch (error) {
      console.error('PDF preview error:', error);
      alert('Error generating preview: ' + error.message);
      pdfPreviewBtn.textContent = '👁️ Update Preview';
      pdfPreviewBtn.disabled = false;
    }
  }

  // Download PDF
  async function downloadPDF() {
    try {
      pdfDownloadBtn.textContent = '⏳ Downloading...';
      pdfDownloadBtn.disabled = true;

      const success = pdfService.downloadPDF();
      if (success) {
        setTimeout(() => {
          pdfModal.classList.remove('active');
          pdfPreviewFrame.src = '';
        }, 500);
      }

      pdfDownloadBtn.textContent = '💾 Download PDF';
      pdfDownloadBtn.disabled = false;
    } catch (error) {
      console.error('PDF download error:', error);
      alert('Error downloading PDF: ' + error.message);
      pdfDownloadBtn.textContent = '💾 Download PDF';
      pdfDownloadBtn.disabled = false;
    }
  }

  // Font size controls with auto-update
  pdfFontDecrease.addEventListener('click', () => {
    if (currentFontSize > 8) {
      currentFontSize -= 1;
      pdfFontSizeDisplay.textContent = `${currentFontSize}pt`;
      updatePDFPreview();
    }
  });

  pdfFontIncrease.addEventListener('click', () => {
    if (currentFontSize < 24) {
      currentFontSize += 1;
      pdfFontSizeDisplay.textContent = `${currentFontSize}pt`;
      updatePDFPreview();
    }
  });

  // Auto-update preview when settings change
  pdfPageSize.addEventListener('change', updatePDFPreview);
  pdfOrientation.addEventListener('change', updatePDFPreview);
  pdfMarginTop.addEventListener('input', updatePDFPreview);
  pdfMarginRight.addEventListener('input', updatePDFPreview);
  pdfMarginBottom.addEventListener('input', updatePDFPreview);
  pdfMarginLeft.addEventListener('input', updatePDFPreview);

  // PDF Event Listeners
  pdfPreviewBtn.addEventListener('click', updatePDFPreview);
  pdfDownloadBtn.addEventListener('click', downloadPDF);

  // Event listeners for export buttons
  exportHtmlBtn.addEventListener('click', exportHTML);
  exportPdfBtn.addEventListener('click', () => {
    console.log('Export PDF button clicked');
    openPDFModal();
  });

  // Debug: Verify elements are found
  console.log('Export PDF Button:', exportPdfBtn);
  console.log('PDF Modal:', pdfModal);
  console.log('PDF Service Ready:', pdfService.isReady());

  // View mode switching
  function setViewMode(mode) {
    // Remove active class from all buttons
    editorOnlyBtn.classList.remove('active');
    splitViewBtn.classList.remove('active');
    previewOnlyBtn.classList.remove('active');

    // Apply view mode
    switch (mode) {
      case 'editor-only':
        editorOnlyBtn.classList.add('active');
        editorContainer.style.display = 'flex';
        previewContainer.style.display = 'none';
        break;
      case 'split-view':
        splitViewBtn.classList.add('active');
        editorContainer.style.display = 'flex';
        previewContainer.style.display = 'flex';
        break;
      case 'preview-only':
        previewOnlyBtn.classList.add('active');
        editorContainer.style.display = 'none';
        previewContainer.style.display = 'flex';
        break;
    }

    // Save view mode preference
    storageManager.set('viewMode', mode);
  }

  // ==================== SYNC SCROLL FUNCTIONALITY ====================

  // Sync scroll state (using var to avoid formatter issues)
  var syncScrollEnabled = storageManager.get('syncScrollEnabled') === 'true';
  var syncScrolling = false;

  // Load saved state and update button
  if (syncScrollEnabled) {
    syncScrollBtn.classList.add('active');
  }

  // Show sync scroll button only in split view
  function updateSyncScrollVisibility() {
    const currentView = storageManager.get('viewMode') || 'split-view';
    if (currentView === 'split-view') {
      syncScrollBtn.style.display = 'inline-block';
    } else {
      syncScrollBtn.style.display = 'none';
    }
  }

  // Sync scroll toggle
  syncScrollBtn.addEventListener('click', () => {
    syncScrollEnabled = !syncScrollEnabled;
    storageManager.set('syncScrollEnabled', syncScrollEnabled.toString());

    if (syncScrollEnabled) {
      syncScrollBtn.classList.add('active');
      console.log('✅ Sync scroll enabled');
    } else {
      syncScrollBtn.classList.remove('active');
      console.log('❌ Sync scroll disabled');
    }
  });

  // Editor scroll handler with smooth sync
  editor.addEventListener('scroll', () => {
    if (!syncScrollEnabled || syncScrolling) return;

    syncScrolling = true;

    requestAnimationFrame(() => {
      const editorHeight = editor.scrollHeight - editor.clientHeight;
      const previewHeight = previewContainer.scrollHeight - previewContainer.clientHeight;

      // Handle edge cases for perfect alignment
      if (editor.scrollTop <= 0) {
        // At top
        previewContainer.scrollTop = 0;
      } else if (editor.scrollTop >= editorHeight) {
        // At bottom
        previewContainer.scrollTop = previewHeight;
      } else {
        // Middle - proportional scroll
        const scrollPercent = editor.scrollTop / editorHeight;
        previewContainer.scrollTop = scrollPercent * previewHeight;
      }

      setTimeout(() => {
        syncScrolling = false;
      }, 10); // Reduced from 50ms for more responsive feel
    });
  });

  // Preview container scroll handler with smooth sync
  previewContainer.addEventListener('scroll', () => {
    if (!syncScrollEnabled || syncScrolling) return;

    syncScrolling = true;

    requestAnimationFrame(() => {
      const editorHeight = editor.scrollHeight - editor.clientHeight;
      const previewHeight = previewContainer.scrollHeight - previewContainer.clientHeight;

      // Handle edge cases for perfect alignment
      if (previewContainer.scrollTop <= 0) {
        // At top
        editor.scrollTop = 0;
      } else if (previewContainer.scrollTop >= previewHeight) {
        // At bottom
        editor.scrollTop = editorHeight;
      } else {
        // Middle - proportional scroll
        const scrollPercent = previewContainer.scrollTop / previewHeight;
        editor.scrollTop = scrollPercent * editorHeight;
      }

      setTimeout(() => {
        syncScrolling = false;
      }, 10); // Reduced from 50ms for more responsive feel
    });
  });

  // View mode button event listeners with sync button update
  editorOnlyBtn.addEventListener('click', () => {
    setViewMode('editor-only');
    updateSyncScrollVisibility();
  });
  splitViewBtn.addEventListener('click', () => {
    setViewMode('split-view');
    updateSyncScrollVisibility();
  });
  previewOnlyBtn.addEventListener('click', () => {
    setViewMode('preview-only');
    updateSyncScrollVisibility();
  });

  // Initialize visibility
  updateSyncScrollVisibility();

  // Load saved theme FIRST, then initialize Mermaid with correct colors
  const savedTheme = storageManager.get('selectedTheme');
  if (savedTheme) {
    // Load theme first, then sync dropdown and reinit Mermaid
    themeManager
      .loadTheme(savedTheme)
      .then(() => {
        // Theme loaded successfully - sync dropdown
        themeSelector.value = savedTheme;
        console.log(`✅ Theme restored: ${savedTheme}`);

        // NOW initialize Mermaid with correct theme colors
        mermaidService.initialize();

        // Re-render to apply theme
        renderMarkdown();
      })
      .catch(err => {
        console.error('Failed to load saved theme:', err);
        // Fallback to default-light on error
        themeManager.loadTheme('default-light').then(() => {
          themeSelector.value = 'default-light';
          mermaidService.initialize();
          renderMarkdown();
        });
      });
  } else {
    // No saved theme - initialize with default-light
    mermaidService.initialize();
    renderMarkdown();
  }

  // Zoom functionality
  function setZoom(zoomLevel) {
    // Constrain zoom level between 50% and 200%
    currentZoom = Math.max(50, Math.min(200, zoomLevel));

    // Apply zoom using CSS transform with proper container sizing
    preview.style.transform = `scale(${currentZoom / 100})`;
    preview.style.transformOrigin = 'top left';
    preview.style.width = `${10000 / currentZoom}%`;
    preview.style.height = `${10000 / currentZoom}%`;

    // Ensure scrollbar remains visible and functional
    const previewContainer = preview.parentElement;
    if (previewContainer) {
      previewContainer.style.overflow = 'auto';
    }

    // Update display
    zoomLevelDisplay.textContent = `${currentZoom}%`;

    // Save to localStorage
    storageManager.set('previewZoom', currentZoom.toString());
  }

  function zoomIn() {
    setZoom(currentZoom + 10);
  }

  function zoomOut() {
    setZoom(currentZoom - 10);
  }

  function resetZoom() {
    setZoom(100);
  }

  // Zoom event listeners
  zoomInBtn.addEventListener('click', zoomIn);
  zoomOutBtn.addEventListener('click', zoomOut);
  zoomResetBtn.addEventListener('click', resetZoom);

  // Keyboard shortcuts for zoom (Ctrl/Cmd + Plus/Minus/0)
  preview.addEventListener('wheel', e => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    }
  });

  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.target.tagName !== 'TEXTAREA') {
      if (e.key === '=' || e.key === '+') {
        e.preventDefault();
        zoomIn();
      } else if (e.key === '-') {
        e.preventDefault();
        zoomOut();
      } else if (e.key === '0') {
        e.preventDefault();
        resetZoom();
      }
    }
  });

  // Load saved zoom level
  const savedZoom = storageManager.get('previewZoom');
  if (savedZoom) {
    currentZoom = parseInt(savedZoom, 10);
    setZoom(currentZoom);
  }

  // Load saved view mode
  const savedViewMode = storageManager.get('viewMode') || 'split-view';
  setViewMode(savedViewMode);

  // ==================== FOLDER BROWSER FUNCTIONALITY ====================

  // Folder browser DOM elements
  const fileBrowser = document.getElementById('file-browser');
  const openFolderBtn = document.getElementById('open-folder-btn');
  const toggleSidebarBtn = document.getElementById('toggle-sidebar-btn');
  const closeBrowserBtn = document.getElementById('close-browser-btn');
  const floatingShowBtn = document.getElementById('floating-show-btn');
  const resizeHandle = document.getElementById('resize-handle');
  const fileTree = document.getElementById('file-tree');
  const currentFolderNameEl = document.getElementById('current-folder-name');
  const fileCountEl = document.getElementById('file-count');

  // Folder browser state (using let to allow reassignment)
  let folderFiles = [];
  let activeFileHandle = null;
  let isResizing = false;
  let sidebarWidth = 280; // Default width
  const minWidth = 100; // Allow squeezing to very narrow
  const maxWidth = 600;
  const collapseThreshold = 80; // Auto-collapse at very left edge only

  // Load saved sidebar width
  const savedWidth = storageManager.get('sidebarWidth');
  if (savedWidth) {
    sidebarWidth = parseInt(savedWidth, 10);
  }

  // Resize functionality
  resizeHandle.addEventListener('mousedown', e => {
    isResizing = true;
    fileBrowser.classList.add('resizing');
    resizeHandle.classList.add('dragging');
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
    e.preventDefault();
  });

  document.addEventListener('mousemove', e => {
    if (!isResizing) return;

    const newWidth = e.clientX;

    // Check if dragged to leftmost (auto-collapse)
    if (newWidth < collapseThreshold) {
      // Auto-collapse with smooth animation
      fileBrowser.classList.remove('resizing');
      fileBrowser.style.display = 'none';
      floatingShowBtn.style.display = 'block';
      isResizing = false;
      resizeHandle.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
      return;
    }

    // Constrain width
    if (newWidth >= minWidth && newWidth <= maxWidth) {
      sidebarWidth = newWidth;
      fileBrowser.style.width = `${sidebarWidth}px`;
    }
  });

  document.addEventListener('mouseup', () => {
    if (isResizing) {
      isResizing = false;
      fileBrowser.classList.remove('resizing');
      resizeHandle.classList.remove('dragging');
      document.body.style.cursor = '';
      document.body.style.userSelect = '';

      // Save width
      storageManager.set('sidebarWidth', sidebarWidth.toString());
    }
  });

  // Open folder handler
  openFolderBtn.addEventListener('click', async () => {
    if (!folderBrowserService.isSupported()) {
      alert(
        'Folder browsing requires File System Access API.\n\n' +
        'Please use Chrome 86+ or Edge 86+.\n\n' +
        'Firefox and Safari are not currently supported.'
      );
      return;
    }

    const result = await folderBrowserService.openFolder();

    if (result.cancelled) {
      return; // User cancelled
    }

    if (!result.success) {
      alert('Error opening folder: ' + result.error);
      return;
    }

    // Store files
    folderFiles = result.files;

    // Show browser sidebar, hide floating button
    fileBrowser.style.display = 'flex';
    floatingShowBtn.style.display = 'none';

    // Update UI
    currentFolderNameEl.textContent = result.folderName;
    fileCountEl.textContent = `${result.totalFiles} file${result.totalFiles !== 1 ? 's' : ''}`;

    // Render tree
    renderFileTree(result.files);

    console.log(`✅ Loaded ${result.totalFiles} markdown files from ${result.folderName}`);
  });

  // Toggle sidebar collapse/expand (keeps folder data)
  toggleSidebarBtn.addEventListener('click', () => {
    // Hide sidebar, show floating button
    fileBrowser.style.display = 'none';
    floatingShowBtn.style.display = 'block';
  });

  // Floating button - show sidebar
  floatingShowBtn.addEventListener('click', () => {
    // Show sidebar, hide floating button
    fileBrowser.style.display = 'flex';
    floatingShowBtn.style.display = 'none';
  });

  // Close browser handler (clears all folder data)
  closeBrowserBtn.addEventListener('click', () => {
    // Hide everything AND clear data
    fileBrowser.style.display = 'none';
    floatingShowBtn.style.display = 'none';
    folderFiles = [];
    activeFileHandle = null;
  });

  // Render file tree
  function renderFileTree(items, container = fileTree, indent = 0) {
    // Clear container on first render
    if (indent === 0) {
      container.innerHTML = '';
    }

    if (items.length === 0 && indent === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <p>📂 No markdown files found</p>
          <p class="hint">This folder doesn't contain any .md files</p>
        </div>
      `;
      return;
    }

    items.forEach(item => {
      if (item.type === 'directory') {
        const folderDiv = createFolderElement(item, indent);
        container.appendChild(folderDiv);

        if (item.expanded && item.children) {
          const childContainer = document.createElement('div');
          childContainer.className = 'tree-children';
          renderFileTree(item.children, childContainer, indent + 1);
          container.appendChild(childContainer);
        }
      } else if (item.type === 'file') {
        const fileDiv = createFileElement(item, indent);
        container.appendChild(fileDiv);
      }
    });
  }

  // Create folder element
  function createFolderElement(item, indent) {
    const div = document.createElement('div');
    div.className = 'tree-item folder';
    div.style.paddingLeft = indent * 20 + 12 + 'px';

    const icon = item.expanded ? '📂' : '📁';
    const folderIcon = document.createElement('span');
    folderIcon.className = 'folder-icon';
    folderIcon.textContent = icon;

    const folderName = document.createElement('span');
    folderName.className = 'folder-name';
    folderName.textContent = item.name;

    const fileCount = document.createElement('span');
    fileCount.className = 'file-count';
    fileCount.textContent = item.fileCount;

    div.appendChild(folderIcon);
    div.appendChild(folderName);
    div.appendChild(fileCount);

    div.addEventListener('click', e => {
      e.stopPropagation();
      toggleFolder(item);
    });

    return div;
  }

  // Create file element
  function createFileElement(item, indent) {
    const div = document.createElement('div');
    div.className = 'tree-item file';
    div.style.paddingLeft = indent * 20 + 12 + 'px';

    // Mark as active if this is the current file
    if (activeFileHandle === item.handle) {
      div.classList.add('active');
    }

    const fileIcon = document.createElement('span');
    fileIcon.className = 'file-icon';
    fileIcon.textContent = '📄';

    const fileName = document.createElement('span');
    fileName.className = 'file-name';
    fileName.textContent = item.name;

    div.appendChild(fileIcon);
    div.appendChild(fileName);

    div.addEventListener('click', async e => {
      e.stopPropagation();
      await loadFileFromBrowser(item);
    });

    return div;
  }

  // Toggle folder expand/collapse
  function toggleFolder(folder) {
    folder.expanded = !folder.expanded;
    renderFileTree(folderFiles);
  }

  // Load file from browser
  async function loadFileFromBrowser(fileItem) {
    const result = await folderBrowserService.readFile(fileItem.handle);

    if (!result.success) {
      alert('Error loading file: ' + result.error);
      return;
    }

    // Load content into editor
    editor.value = result.content;

    // Mark as active file
    activeFileHandle = fileItem.handle;

    // Re-render tree to update active state
    renderFileTree(folderFiles);

    // Render markdown
    renderMarkdown();

    console.log(`✅ Loaded file: ${fileItem.name} (${result.size} bytes)`);
  }

  // Expose renderMarkdown globally for theme changes
  globalRenderMarkdown = renderMarkdown;

  // DON'T render immediately - wait for theme to load
  // renderMarkdown will be called after theme loads above
}
