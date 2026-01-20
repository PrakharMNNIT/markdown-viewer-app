# ♿ Accessibility Plan

## Markdown Preview EE — WCAG 2.1 AA Compliance

**Document Type:** Accessibility Engineering  
**Version:** 1.0  
**Created:** 2026-01-20  
**Status:** Ready for Implementation

---

## 🎯 Compliance Target

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                              │
│   TARGET: WCAG 2.1 Level AA                                                 │
│                                                                              │
│   Principles:                                                               │
│   • Perceivable — Information presentable in ways users can perceive       │
│   • Operable — Interface usable by all users                               │
│   • Understandable — Content and operation comprehensible                  │
│   • Robust — Compatible with assistive technologies                         │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## ✅ Accessibility Checklist

### 1. Color & Contrast

| Requirement | Target | Implementation |
|-------------|--------|----------------|
| Text contrast (normal) | 4.5:1 | All text vs backgrounds |
| Text contrast (large) | 3:1 | Headings 18px+ |
| UI component contrast | 3:1 | Buttons, inputs, icons |
| Focus indicators | 3:1 | Focus rings visible |
| Color not sole indicator | ✓ | Icons + text for states |

### 2. Keyboard Navigation

| Requirement | Implementation |
|-------------|----------------|
| All interactive elements focusable | tabindex where needed |
| Logical tab order | DOM order matches visual |
| Visible focus indicators | 2px coral ring |
| Skip to main content | Skip link at page top |
| No keyboard traps | Escape closes modals |
| Shortcut documentation | Help modal with shortcuts |

### 3. Screen Reader Support

| Requirement | Implementation |
|-------------|----------------|
| Semantic HTML | header, main, nav, aside |
| ARIA landmarks | role="banner", role="main" |
| ARIA labels | All icon buttons labeled |
| Live regions | Status updates announced |
| Heading hierarchy | H1 → H6 in order |
| Alt text | All images in preview |

### 4. Motion & Animations

| Requirement | Implementation |
|-------------|----------------|
| Respect prefers-reduced-motion | Disable animations |
| No auto-playing content | User-initiated only |
| No flashing content | < 3 flashes/second |

---

## 🏷️ ARIA Patterns

### Modal Dialog

```html
<div role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <h2 id="modal-title">Settings</h2>
  <div role="document">
    <!-- Modal content -->
  </div>
  <button aria-label="Close modal">×</button>
</div>
```

### Theme Toggle

```html
<button 
  aria-pressed="true" 
  aria-label="Dark mode enabled. Click to switch to light mode."
>
  <MoonIcon aria-hidden="true" />
</button>
```

### Dropdown Select

```html
<div role="listbox" aria-labelledby="theme-label">
  <div role="option" aria-selected="true">GitHub Light</div>
  <div role="option" aria-selected="false">Dracula</div>
</div>
```

### Live Region (Status)

```html
<div aria-live="polite" aria-atomic="true" class="sr-only">
  Document saved successfully
</div>
```

---

## ⌨️ Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl/Cmd + S` | Save file |
| `Ctrl/Cmd + O` | Open file |
| `Ctrl/Cmd + N` | New file |
| `Ctrl/Cmd + E` | Toggle view mode |
| `Ctrl/Cmd + P` | Export PDF |
| `Ctrl/Cmd + Shift + D` | Toggle dark mode |
| `Escape` | Close modal/dropdown |
| `Tab` | Navigate forward |
| `Shift + Tab` | Navigate backward |
| `?` | Show shortcuts help |

---

## 🧪 Testing Requirements

### Automated Testing
- **axe-core** in Playwright E2E tests
- **eslint-plugin-jsx-a11y** in linting
- **Lighthouse** accessibility audit (target: 100)

### Manual Testing
- [ ] Screen reader testing (VoiceOver, NVDA)
- [ ] Keyboard-only navigation
- [ ] High contrast mode
- [ ] Zoom to 200%
- [ ] Reduced motion preference

### Screen Readers to Test
- macOS: VoiceOver (Safari, Chrome)
- Windows: NVDA (Firefox, Chrome)
- Mobile: VoiceOver iOS, TalkBack Android

---

## 📋 Component Requirements

### Buttons
- Clear, descriptive labels
- Visible focus state
- Disabled state communicated

### Forms
- Labels associated with inputs
- Error messages linked to fields
- Required fields indicated

### Modals
- Focus trapped inside
- Close on Escape
- Return focus on close

### Preview Content
- Headings in order
- Images have alt text
- Links are descriptive

---

*Accessibility Plan v1.0*  
*Created: 2026-01-20*