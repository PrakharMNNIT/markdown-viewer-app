# Markdown Viewer Pro - Organized Structure

## 📁 Directory Structure

```
markdown-viewer-app/
├── index.html              # Main HTML file
├── style.css               # Base styles (layout, structure)
├── script.js               # All JavaScript functionality
└── themes/                 # Theme directory
    ├── default-light.css   # Default light theme
    ├── default-dark.css    # Default dark theme
    ├── ocean-light.css     # Ocean light theme
    ├── ocean-dark.css      # Ocean dark theme
    ├── neon-light.css      # Neon light theme
    ├── neon-dark.css       # Neon dark theme
    ├── forest-light.css    # Forest light theme
    ├── forest-dark.css     # Forest dark theme
    ├── sunset-light.css    # Sunset light theme
    └── sunset-dark.css     # Sunset dark theme
```

## 🎨 Available Themes

### 1. Default Theme
- **Light**: Professional blue theme with clean whites
- **Dark**: GitHub-inspired dark mode with cool blues

### 2. Ocean Theme
- **Light**: Fresh cyan and turquoise on light blue background
- **Dark**: Deep navy with bright cyan accents

### 3. Neon Theme
- **Light**: Vibrant purples and magentas
- **Dark**: Cyberpunk-style with hot pink and electric blue

### 4. Forest Theme
- **Light**: Natural greens with lime accents
- **Dark**: Deep forest greens with bright lime highlights

### 5. Sunset Theme
- **Light**: Warm oranges and reds
- **Dark**: Deep warm browns with golden orange highlights

## 🚀 How to Use

### Quick Start
1. Open `index.html` in your web browser
2. Start typing markdown in the left panel
3. See live preview on the right
4. Switch themes from the dropdown menu

### File Structure Explanation

#### index.html
- Contains the HTML structure
- Links to external CSS and JS files
- Includes theme selector dropdown with all 10 themes

#### style.css
- Base styling (layout, typography, spacing)
- Uses CSS custom properties (variables) for theming
- No color values defined here (all in theme files)

#### script.js
- Markdown parsing and rendering
- Theme switching logic
- Color customizer functionality
- Export to HTML feature
- Auto-save to localStorage

#### themes/*.css
- Each theme file defines color variables only
- Easy to create new themes by copying and modifying
- Instantly switchable without page reload

## 🎨 Creating Your Own Theme

### Method 1: Using the Customizer
1. Select any theme as a starting point
2. Click "🎨 Customize Colors"
3. Adjust colors using the color pickers
4. Click "Save Custom Theme"

### Method 2: Creating a New Theme File
1. Copy any existing theme file (e.g., `themes/default-light.css`)
2. Rename it (e.g., `themes/mytheme-light.css`)
3. Modify the color values
4. Add it to the dropdown in `index.html`:

```html
<optgroup label="My Theme">
    <option value="mytheme-light">My Theme Light</option>
    <option value="mytheme-dark">My Theme Dark</option>
</optgroup>
```

### Theme Variables Reference

```css
:root {
    /* Backgrounds */
    --bg-primary: #ffffff;      /* Main background */
    --bg-secondary: #f8f9fa;    /* Secondary areas */
    --bg-tertiary: #e9ecef;     /* Tertiary areas */
    
    /* Text */
    --text-primary: #212529;    /* Main text */
    --text-secondary: #6c757d;  /* Secondary text */
    --border-color: #dee2e6;    /* Borders */
    
    /* Headers */
    --h1-color: #2563eb;        /* H1 heading */
    --h2-color: #7c3aed;        /* H2 heading */
    --h3-color: #db2777;        /* H3 heading */
    --h4-color: #059669;        /* H4 heading */
    --h5-color: #ea580c;        /* H5 heading */
    --h6-color: #ca8a04;        /* H6 heading */
    
    /* Elements */
    --link-color: #2563eb;      /* Link text */
    --link-hover: #1e40af;      /* Link hover */
    --code-bg: #f1f5f9;         /* Inline code background */
    --code-text: #e11d48;       /* Inline code text */
    --code-block-bg: #1e293b;   /* Code block background */
    --blockquote-border: #7c3aed; /* Blockquote left border */
    --blockquote-bg: #f3f4f6;   /* Blockquote background */
    --bold-color: #ea580c;      /* Bold text */
    --italic-color: #db2777;    /* Italic text */
    --table-header-bg: #e0e7ff; /* Table header */
    --table-border: #cbd5e1;    /* Table borders */
}
```

## 📦 Features

### ✅ Markdown Support
- Headers (H1-H6)
- Bold, italic, strikethrough
- Lists (ordered & unordered)
- Links and images
- Code blocks with syntax highlighting
- Tables
- Blockquotes
- Horizontal rules

### ✅ Syntax Highlighting
Supports 20+ languages:
- Java, C++, Python
- JavaScript, TypeScript
- Rust, Go, SQL
- HTML, CSS, Bash
- JSON, XML, YAML
- And more!

### ✅ Mermaid Diagrams
- Flowcharts
- Sequence diagrams
- Class diagrams
- State diagrams
- ER diagrams
- Gantt charts
- Pie charts

### ✅ Theme System
- 10 built-in themes
- Light/Dark variants for each
- Easy theme creation
- Instant switching
- Custom theme saving

### ✅ Export Feature
- Export to standalone HTML
- Preserves current theme
- Includes all styling
- Shareable file

## 💡 Customization Tips

### Changing Colors
1. Use the visual customizer for quick adjustments
2. Edit theme CSS files directly for precise control
3. Use color theory: complementary colors work well together

### Creating Color Schemes
- **Monochromatic**: Use different shades of one color
- **Analogous**: Use colors next to each other on color wheel
- **Complementary**: Use opposite colors for contrast
- **Triadic**: Use three evenly-spaced colors

### Light vs Dark Themes
- **Light themes**: Use darker text on lighter backgrounds
- **Dark themes**: Use lighter text on darker backgrounds
- Maintain contrast ratio of at least 4.5:1 for accessibility

## 🔧 Technical Details

### Dependencies
All loaded from CDN:
- **Marked.js** - Markdown parsing
- **Prism.js** - Syntax highlighting
- **Mermaid.js** - Diagram rendering

### Browser Support
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

### Storage
- Content saved to localStorage
- Custom themes saved to localStorage
- Selected theme saved to localStorage

## 📝 Usage Examples

### Writing Documentation
```markdown
# API Documentation

## Installation
npm install my-package

## Usage
const lib = require('my-package');
```

### Creating Presentations
Each `# Header` can be a slide. Use themes for visual impact.

### Taking Notes
- Quick headers for organization
- Code blocks for commands
- Tables for comparisons

## 🎯 Best Practices

1. **Choose the right theme** for your content and environment
2. **Use headers** to structure your content
3. **Add code blocks** with language tags for proper highlighting
4. **Test exports** before sharing
5. **Save custom themes** when you create good color combinations

## 🚀 Advanced Usage

### Embedding in Your Site
You can embed the viewer in your website:
1. Include the CSS and JS files
2. Add the HTML structure
3. Initialize the editor with your content

### Custom Workflows
- Use as a note-taking app
- Create a blog post editor
- Build a documentation system
- Make a presentation tool

## 📊 Theme Preview Guide

### When to Use Each Theme

**Default Light/Dark**: General purpose, professional documents
**Ocean Light/Dark**: Technical content, calming atmosphere
**Neon Light/Dark**: Creative work, presentations, eye-catching
**Forest Light/Dark**: Environmental content, natural topics
**Sunset Light/Dark**: Warm content, personal writing

## 🔗 File Linking

All files use relative paths, so you can:
- Move the entire folder anywhere
- Host on a web server
- Open directly from filesystem
- Include in other projects

## 🎨 Color Psychology

- **Blue (Default)**: Trust, professionalism, calm
- **Cyan (Ocean)**: Freshness, technology, clarity
- **Purple/Pink (Neon)**: Creativity, energy, modern
- **Green (Forest)**: Growth, nature, harmony
- **Orange/Red (Sunset)**: Warmth, passion, energy

## 🛠️ Troubleshooting

**Themes not switching?**
- Check browser console for errors
- Ensure all theme files are in themes/ folder
- Clear browser cache

**Custom theme not saving?**
- Check localStorage is enabled
- Don't use private/incognito mode for persistent themes

**Mermaid not rendering?**
- Check internet connection (requires CDN)
- Wait a few seconds for rendering
- Check diagram syntax

**Export not working?**
- Check browser allows downloads
- Try a different browser
- Ensure popup blocker is disabled

## 📚 Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [Mermaid Documentation](https://mermaid-js.github.io/)
- [Prism Supported Languages](https://prismjs.com/#supported-languages)

---

**Enjoy your organized Markdown Viewer Pro!** 🎉
