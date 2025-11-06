// Markdown Viewer Pro - Main Script
// Wait for all scripts to load
window.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

function initializeApp() {
    // Check if libraries are loaded
    if (typeof marked === 'undefined' || typeof Prism === 'undefined' || typeof mermaid === 'undefined') {
        console.error('Required libraries not loaded. Retrying...');
        setTimeout(initializeApp, 100);
        return;
    }

    // Initialize Mermaid
    mermaid.initialize({ startOnLoad: false, theme: 'default' });

    setupEditor();
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
    const exportBtn = document.getElementById('export-btn');
    const modal = document.getElementById('customizer-modal');
    const closeModal = document.getElementById('close-modal');
    const resetBtn = document.getElementById('reset-btn');
    const saveThemeBtn = document.getElementById('save-theme-btn');
    const themeStylesheet = document.getElementById('theme-stylesheet');

    // Set default content
    const savedContent = localStorage.getItem('markdownContent');
    editor.value = savedContent || defaultMarkdown;

    // Helper function to decode HTML entities
    function decodeHtmlEntities(text) {
        const textarea = document.createElement('textarea');
        textarea.innerHTML = text;
        return textarea.value;
    }

    // Render markdown
    function renderMarkdown() {
        try {
            const markdownText = editor.value;
            let html = marked.parse(markdownText);

            // Replace mermaid code blocks
            html = html.replace(/<pre><code class="language-mermaid">([\s\S]*?)<\/code><\/pre>/g, (match, code) => {
                // Decode HTML entities before passing to Mermaid
                const decodedCode = decodeHtmlEntities(code);
                const id = 'mermaid-' + Math.random().toString(36).substr(2, 9);
                setTimeout(() => {
                    try {
                        const element = document.getElementById(id);
                        if (element && typeof mermaid !== 'undefined') {
                            mermaid.render('mermaid-svg-' + id, decodedCode).then(result => {
                                element.innerHTML = result.svg;
                            }).catch(err => {
                                element.innerHTML = '<p style="color: red;">Mermaid diagram error: ' + err.message + '</p>';
                            });
                        }
                    } catch (e) {
                        console.error('Mermaid render error:', e);
                    }
                }, 100);
                return `<div class="mermaid" id="${id}">${code}</div>`;
            });

            preview.innerHTML = html;

            // Apply Prism syntax highlighting
            if (typeof Prism !== 'undefined') {
                preview.querySelectorAll('pre code').forEach((block) => {
                    Prism.highlightElement(block);
                });
            }

            // Save content
            localStorage.setItem('markdownContent', markdownText);
        } catch (error) {
            console.error('Render error:', error);
            preview.innerHTML = '<p style="color: red;">Error rendering markdown: ' + error.message + '</p>';
        }
    }

    // Change theme
    function changeTheme(themeName) {
        if (themeName === 'custom') {
            const customTheme = localStorage.getItem('customTheme');
            if (customTheme) {
                const theme = JSON.parse(customTheme);
                Object.entries(theme).forEach(([property, value]) => {
                    document.documentElement.style.setProperty(property, value);
                });
            }
        } else {
            // Remove inline styles
            const root = document.documentElement;
            const styles = root.style;
            for (let i = styles.length - 1; i >= 0; i--) {
                const prop = styles[i];
                if (prop.startsWith('--')) {
                    root.style.removeProperty(prop);
                }
            }

            // Load theme stylesheet
            themeStylesheet.href = `themes/${themeName}.css`;
        }
        localStorage.setItem('selectedTheme', themeName);
    }

    // Initialize color inputs
    function initColorInputs() {
        document.querySelectorAll('.color-control input[type="color"]').forEach(input => {
            const varName = input.dataset.var;
            const textInput = document.getElementById(input.id + '-text');
            const currentValue = getComputedStyle(document.documentElement).getPropertyValue(varName).trim();

            input.value = currentValue;
            textInput.value = currentValue;

            input.addEventListener('input', (e) => {
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
            const customTheme = localStorage.getItem('customTheme');
            if (customTheme) {
                const theme = JSON.parse(customTheme);
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
    ${preview.innerHTML}
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
    editor.addEventListener('input', renderMarkdown);

    themeSelector.addEventListener('change', (e) => {
        changeTheme(e.target.value);
    });

    customizeBtn.addEventListener('click', () => {
        modal.classList.add('active');
        initColorInputs();
    });

    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    resetBtn.addEventListener('click', () => {
        const currentTheme = themeSelector.value === 'custom' ? 'default-light' : themeSelector.value;
        changeTheme(currentTheme);
        initColorInputs();
    });

    saveThemeBtn.addEventListener('click', () => {
        const customTheme = {};
        document.querySelectorAll('.color-control input[type="color"]').forEach(input => {
            const varName = input.dataset.var;
            customTheme[varName] = input.value;
        });
        localStorage.setItem('customTheme', JSON.stringify(customTheme));
        themeSelector.value = 'custom';
        alert('Custom theme saved! Select "Custom Theme" from the dropdown to use it.');
        modal.classList.remove('active');
    });

    exportBtn.addEventListener('click', exportHTML);

    // Load saved theme
    const savedTheme = localStorage.getItem('selectedTheme');
    if (savedTheme) {
        themeSelector.value = savedTheme;
        changeTheme(savedTheme);
    }

    // Initial render
    renderMarkdown();
}
