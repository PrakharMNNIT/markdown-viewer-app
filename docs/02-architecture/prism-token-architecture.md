# Prism Token Architecture - Comprehensive Reference

**Last Updated:** 12/7/2025
**Source:** Official Prism.js documentation + One Dark theme analysis

## Standard Token Classes

### Core Language Constructs

| Token Class   | Purpose                    | Example                                  | Recommended Color Hue             |
| ------------- | -------------------------- | ---------------------------------------- | --------------------------------- |
| `keyword`     | Reserved words             | `if`, `else`, `class`, `final`, `sealed` | Purple/Magenta (286°)             |
| `builtin`     | Built-in functions/types   | `String`, `Array`, `Console`             | Green (95°)                       |
| `class-name`  | Class/Interface/Type names | `Rectangle`, `Shape`, `Person`           | Orange (29°)                      |
| `function`    | Function/method names      | `main`, `println`, `forEach`             | Blue (207°)                       |
| `boolean`     | True/false values          | `true`, `false`                          | Orange (29°)                      |
| `number`      | Numeric literals           | `42`, `3.14`, `0xDEADBEEF`               | Orange (29°)                      |
| `string`      | String literals            | `"Hello"`, `'World'`                     | Green (95°)                       |
| `char`        | Character literals         | `'A'`, `'\n'`                            | Green (95°)                       |
| `symbol`      | Symbols (Smalltalk, Ruby)  | `:mySymbol`                              | Green (95°)                       |
| `regex`       | Regular expressions        | `/[a-z]+/i`                              | Green (95°)                       |
| `operator`    | Operators                  | `+`, `-`, `*`, `/`, `=`, `==`            | Purple (286°)                     |
| `variable`    | Variable names (special)   | Less/Bash variables                      | Blue (207°)                       |
| `constant`    | Constants                  | `PI`, `MAX_SIZE`, `stdout`               | Orange (29°)                      |
| `property`    | Object properties          | CSS properties, JSON keys                | Red (355°)                        |
| `punctuation` | Delimiters                 | `{`, `}`, `;`, `,`                       | Gray/White                        |
| `comment`     | Code comments              | `// comment`, `/* block */`              | Muted gray (220°, low saturation) |

### Markup-Specific Tokens

| Token Class  | Purpose             | Example                     |
| ------------ | ------------------- | --------------------------- |
| `tag`        | HTML/XML tags       | `<div>`, `<p>`              |
| `attr-name`  | Attribute names     | `id`, `class`, `href`       |
| `attr-value` | Attribute values    | `"header"`, `"https://..."` |
| `namespace`  | XML namespaces      | `html:p`, `foo:bar`         |
| `prolog`     | XML prolog          | `<?xml version="1.0"?>`     |
| `doctype`    | DOCTYPE declaration | `<!DOCTYPE html>`           |
| `cdata`      | CDATA sections      | `<![CDATA[...]]>`           |
| `entity`     | HTML entities       | `&amp;`, `&#x2665;`         |

### Document Markup Tokens

| Token Class | Purpose         | Example      |
| ----------- | --------------- | ------------ |
| `bold`      | Bold text       | `**bold**`   |
| `italic`    | Italic text     | `*italic*`   |
| `important` | Important (CSS) | `!important` |

### Stylesheet Tokens

| Token Class | Purpose       | Example                  |
| ----------- | ------------- | ------------------------ |
| `atrule`    | CSS @ rules   | `@media`, `@import`      |
| `selector`  | CSS selectors | `.class`, `#id`, `div p` |
| `url`       | URLs          | `url(image.png)`         |

### Diff Tokens

| Token Class | Purpose       |
| ----------- | ------------- |
| `inserted`  | Added lines   |
| `deleted`   | Removed lines |

## Professional Theme Analysis (One Dark)

### Color Grouping Strategy

One Dark uses **7 core hues** systematically:

1. **mono-1** (220°, 14%, 71%) - Default text
2. **mono-2** (220°, 9%, 55%) - Secondary text
3. **mono-3** (220°, 10%, 40%) - Comments
4. **hue-1** (187°, 47%, 55%) - Cyan - URLs
5. **hue-2** (207°, 82%, 66%) - Blue - Variables, operators, functions
6. **hue-3** (286°, 60%, 67%) - Purple - Keywords
7. **hue-4** (95°, 38%, 62%) - Green - Strings
8. **hue-5** (355°, 65%, 65%) - Red - Properties, tags, symbols
9. **hue-6** (29°, 54%, 61%) - Orange - Class names, constants, numbers

### Token Grouping

```css
/* Group 1: Comments */
.token.comment, .token.prolog, .token.cdata

/* Group 2: Neutral (inherit default color) */
.token.doctype, .token.punctuation, .token.entity

/* Group 3: Orange - Class names, constants, numbers */
.token.attr-name, .token.class-name, .token.boolean,
.token.constant, .token.number, .token.atrule

/* Group 4: Purple - Keywords */
.token.keyword

/* Group 5: Red - Properties, tags */
.token.property, .token.tag, .token.symbol,
.token.deleted, .token.important

/* Group 6: Green - Strings, builtins */
.token.selector, .token.string, .token.char,
.token.builtin, .token.inserted, .token.regex,
.token.attr-value

/* Group 7: Blue - Variables, operators, functions */
.token.variable, .token.operator, .token.function

/* Group 8: Cyan - URLs */
.token.url
```

### Language-Specific Overrides

Professional themes use **cascading specificity** for language-specific rules:

```css
/* JavaScript overrides */
.language-javascript .token.operator { color: purple; }
.language-javascript .token.template-string > .token.interpolation { ... }

/* CSS overrides */
.language-css .token.selector { color: red; }
.language-css .token.property { color: gray; }

/* JSON overrides */
.language-json .token.null.keyword { color: orange; }

/* Markdown overrides */
.language-markdown .token.url { ... }
```

## Implementation Architecture

### CSS Specificity Levels

1. **Base tokens** - All languages
2. **Language-specific overrides** - `.language-xxx .token.yyy`
3. **Nested tokens** - `.token.xxx > .token.yyy`
4. **Plugin overrides** - `.rainbow-braces`, `.diff-highlight`, etc.

### Variable Mapping Strategy

```css
/* Map standard Prism tokens to theme CSS variables */
.token.keyword {
  color: var(--syntax-keyword);
}
.token.string {
  color: var(--syntax-string);
}
.token.class-name {
  color: var(--syntax-class-name); /* Distinct variable! */
}
```

### Token Aliases

Prism uses aliases to group similar tokens:

- `attr-value` can contain nested `punctuation` tokens
- `template-string` can contain `interpolation` with nested tokens
- Language definitions use `alias` property to inherit styles

## Best Practices

1. **Use Distinct Variables** - Don't reuse variables across semantically different tokens
2. **Follow Standards** - Match Prism's standard token names
3. **Language Overrides** - Use when default grouping doesn't fit
4. **Test Comprehensively** - Verify with multiple languages (Java, Python, JS, CSS, etc.)
5. **Font Weight** - Use bold/normal strategically for visual hierarchy
6. **Color Contrast** - Ensure WCAG AA compliance (4.5:1 for text)

## Token Coverage Checklist

### Must Cover (Core)

- [ ] keyword
- [ ] builtin
- [ ] class-name (distinct from keyword!)
- [ ] function
- [ ] string
- [ ] number
- [ ] boolean
- [ ] comment
- [ ] operator
- [ ] punctuation
- [ ] variable
- [ ] property
- [ ] constant
- [ ] regex

### Markup Languages

- [ ] tag
- [ ] attr-name
- [ ] attr-value
- [ ] namespace
- [ ] doctype
- [ ] entity

### Advanced

- [ ] atrule (CSS)
- [ ] selector (CSS)
- [ ] url
- [ ] inserted/deleted (Diff)
- [ ] bold/italic (Markdown)
- [ ] important (CSS)

## Implementation Checklist

- [ ] Define comprehensive CSS variable palette (8-10 distinct hues)
- [ ] Map ALL standard tokens to variables
- [ ] Add language-specific overrides where needed
- [ ] Test with Java (most complex token usage)
- [ ] Test with Python, JavaScript, CSS
- [ ] Verify font-weight hierarchy
- [ ] Check color contrast ratios
- [ ] Document color semantics

## References

- [Prism Standard Tokens](https://prismjs.com/tokens.html)
- [Prism Theme: One Dark](https://github.com/PrismJS/prism-themes/blob/master/themes/prism-one-dark.css)
- [Atom One Dark Colors](https://github.com/atom/atom/tree/master/packages/one-dark-syntax)
