# 🔍 Math Rendering Issue - Senior SDE Analysis

## **Problem**

Placeholders showing as text on GitHub Pages:

- MATH_DISPLAY_0, MATH_INLINE_85, etc.
- Works locally but not in production

## **Root Cause Analysis**

### **Current Approach (Flawed):**

```
1. Extract math → create placeholders
2. Parse markdown (placeholders become text nodes)
3. Try to replace placeholders with regex
4. ❌ FAILS because:
   - marked.parse() may transform placeholders
   - Regex replacement unreliable
   - Race conditions in async rendering
```

### **Why It Works Locally:**

Local dev server shows your **unsaved changes** with working code.
Production uses **last committed code** which has the bug.

## **Senior SDE Solution**

### **Option 1: Use Marked.js Extension (Recommended)**

Register custom tokenizer and renderer:

```javascript
marked.use({
  extensions: [
    {
      name: 'math',
      level: 'inline',
      start(src) {
        return src.indexOf('$');
      },
      tokenizer(src) {
        const match = src.match(/^\$\$([^\$]+)\$\$/);
        if (match) {
          return {
            type: 'math',
            raw: match[0],
            text: match[1],
            display: true,
          };
        }
        // Inline math
        const inlineMatch = src.match(/^\$([^\$\n]+?)\$/);
        if (inlineMatch) {
          return {
            type: 'math',
            raw: inlineMatch[0],
            text: inlineMatch[1],
            display: false,
          };
        }
      },
      renderer(token) {
        return katex.renderToString(token.text, {
          displayMode: token.display,
          throwOnError: false,
        });
      },
    },
  ],
});
```

**Benefits:**

- ✅ Native marked.js integration
- ✅ No placeholders needed
- ✅ Handles HTML encoding automatically
- ✅ Production-ready pattern

### **Option 2: Simpler DOM Manipulation**

Skip placeholders, use DOM manipulation:

```javascript
function renderMarkdown() {
  let html = marked.parse(markdownText);

  // Set HTML first
  preview.innerHTML = html;

  // Then find and replace text nodes with math
  const walker = document.createTreeWalker(preview, NodeFilter.SHOW_TEXT);

  const nodesToReplace = [];
  while (walker.nextNode()) {
    const node = walker.currentNode;
    if (node.textContent.includes('$$') || /\$[^$]+\$/.test(node.textContent)) {
      nodesToReplace.push(node);
    }
  }

  nodesToReplace.forEach(node => {
    // Process math in this text node
    // ...
  });
}
```

**Benefits:**

- ✅ Works on actual DOM
- ✅ No string replacement issues
- ✅ Handles complex HTML structures

### **Option 3: Pre-parse with Code Blocks**

Treat math like code blocks:

````javascript
// Convert math to special code blocks
text = text.replace(/\$\$([\s\S]+?)\$\$/g, '```math-display\n$1\n```');
text = text.replace(/\$([^$\n]+?)\$/g, '`math-inline:$1`');

// Parse markdown
html = marked.parse(text);

// Replace special code blocks with rendered math
html = html.replace(/<code class="language-math-display">([\s\S]+?)<\/code>/g, ...);
````

---

## **Recommended Fix**

Use **Option 1: Marked Extension** - It's the proper way to extend marked.js.

This is production-grade, maintainable, and aligns with library design patterns.
