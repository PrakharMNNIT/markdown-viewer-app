# 🧮 Math Formula Rendering - Feature Plan

## **Problem Statement**

The markdown viewer cannot render LaTeX math formulas:

- Display math: `$$...$$`
- Inline math: `$...$`

**Example that doesn't work:**

```markdown
$$\log_b(y) = x \iff b^x = y$$

The complexity is $O(\log n)$ for binary search.
```

---

## **Solution: Add KaTeX Integration**

### **Why KaTeX?**

**KaTeX vs MathJax:**

| Feature         | KaTeX           | MathJax      |
| --------------- | --------------- | ------------ |
| Speed           | ⚡ 10x faster   | Slower       |
| Bundle Size     | ~300KB          | ~1MB         |
| Quality         | Excellent       | Excellent    |
| Browser Support | Modern browsers | All browsers |
| Server-side     | ✅ Yes          | ✅ Yes       |

**Decision:** KaTeX - Faster, smaller, sufficient for our needs

---

## **Implementation Plan**

### **1. Add KaTeX Library**

```html
<!-- Add to index.html <head> -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.css" />
<script src="https://cdn.jsdelivr.net/npm/katex@0.16.9/dist/katex.min.js"></script>
```

### **2. Configure Marked.js Extensions**

```javascript
// Add marked-katex extension
import markedKatex from 'marked-katex-extension';

marked.use(
  markedKatex({
    throwOnError: false, // Don't break on math errors
    output: 'html', // HTML output
  })
);
```

### **3. Alternative: Manual Parsing**

If extension not available, parse manually:

```javascript
function renderMath(html) {
  // Display math: $$...$$
  html = html.replace(/\$\$([\s\S]+?)\$\$/g, (match, math) => {
    return katex.renderToString(math, { displayMode: true });
  });

  // Inline math: $...$
  html = html.replace(/\$([^\$\n]+?)\$/g, (match, math) => {
    return katex.renderToString(math, { displayMode: false });
  });

  return html;
}
```

---

## **Testing Requirements**

### **Test Cases:**

1. **Display Math:**

```markdown
$$e^{i\pi} + 1 = 0$$
```

2. **Inline Math:**

```markdown
The time complexity is $O(\log n)$ for binary search.
```

3. **Complex Formulas:**

```markdown
$$\int_{0}^{\infty} e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$
```

4. **Multiple Lines:**

```markdown
$$
\begin{aligned}
f(x) &= x^2 + 2x + 1 \\
     &= (x+1)^2
\end{aligned}
$$
```

---

## **Implementation Steps**

1. ✅ Add KaTeX CDN links to index.html
2. ✅ Install marked-katex extension or implement manual parsing
3. ✅ Update renderMarkdown() function
4. ✅ Test with provided examples
5. ✅ Deploy to GitHub Pages
6. ✅ Update documentation

---

## **Estimated Effort**

- **Time:** 30-45 minutes
- **Complexity:** Medium
- **Files to modify:** 2-3 files
- **Testing:** Comprehensive

---

**Next Step:** Implement KaTeX integration
