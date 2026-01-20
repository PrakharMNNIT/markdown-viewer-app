# 🎨 Markdown Preview EE - Brand Theme Document

## Theme Name: Candyland

**Source:** [TweakCN - Candyland Theme](https://tweakcn.com/r/themes/candyland.json)  
**Color Space:** OKLCH (Perceptually Uniform)  
**Framework Compatibility:** shadcn/ui, Tailwind CSS v4

---

## 📋 Table of Contents

1. [Theme Overview](#1-theme-overview)
2. [Color Palette](#2-color-palette)
3. [Typography](#3-typography)
4. [Spacing & Radius](#4-spacing--radius)
5. [Shadows](#5-shadows)
6. [Installation](#6-installation)
7. [CSS Variables Reference](#7-css-variables-reference)

---

## 1. Theme Overview

### Design Philosophy

**Candyland** is a playful yet professional theme that combines:
- **Soft pastels** for backgrounds (lavender-tinted whites)
- **Warm coral/pink** as primary accent
- **Cool sky blue** as secondary accent
- **Bright lime/yellow** for highlights
- **High contrast** dark mode with vibrant accents

### Why OKLCH?

OKLCH (Oklch Lightness Chroma Hue) provides:
- **Perceptual uniformity** - colors look equally bright at same lightness
- **Predictable lightness** - easy to create accessible color scales
- **Vivid colors** - wider gamut than HSL on modern displays
- **Better gradients** - smoother transitions between colors

### Color Personality

| Mode | Vibe | Primary | Secondary | Accent |
|------|------|---------|-----------|--------|
| Light | Soft, warm, approachable | Coral pink | Sky blue | Bright lime |
| Dark | Rich, vibrant, modern | Hot pink | Emerald green | Sky blue |

---

## 2. Color Palette

### Light Mode Colors

#### Core Colors (Visual Reference)

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                         LIGHT MODE PALETTE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  BACKGROUND           FOREGROUND          PRIMARY             SECONDARY     │
│  ┌──────────┐        ┌──────────┐        ┌──────────┐        ┌──────────┐  │
│  │          │        │          │        │          │        │          │  │
│  │ Lavender │        │   Dark   │        │  Coral   │        │   Sky    │  │
│  │  White   │        │   Gray   │        │   Pink   │        │   Blue   │  │
│  │          │        │          │        │          │        │          │  │
│  └──────────┘        └──────────┘        └──────────┘        └──────────┘  │
│  oklch(0.98)         oklch(0.32)         oklch(0.87)         oklch(0.81)   │
│                                                                              │
│  ACCENT               MUTED               DESTRUCTIVE         BORDER        │
│  ┌──────────┐        ┌──────────┐        ┌──────────┐        ┌──────────┐  │
│  │          │        │          │        │          │        │          │  │
│  │  Bright  │        │  Cream   │        │   Red    │        │  Light   │  │
│  │   Lime   │        │  Yellow  │        │          │        │   Gray   │  │
│  │          │        │          │        │          │        │          │  │
│  └──────────┘        └──────────┘        └──────────┘        └──────────┘  │
│  oklch(0.97)         oklch(0.88)         oklch(0.64)         oklch(0.87)   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Light Mode OKLCH Values

| Token | OKLCH Value | Description |
|-------|-------------|-------------|
| `--background` | `oklch(0.9809 0.0025 228.7836)` | Subtle lavender-tinted white |
| `--foreground` | `oklch(0.3211 0 0)` | Near-black for text |
| `--card` | `oklch(1.0000 0 0)` | Pure white cards |
| `--card-foreground` | `oklch(0.3211 0 0)` | Dark text on cards |
| `--popover` | `oklch(1.0000 0 0)` | White popovers |
| `--popover-foreground` | `oklch(0.3211 0 0)` | Dark text |
| `--primary` | `oklch(0.8677 0.0735 7.0855)` | Coral pink (warm) |
| `--primary-foreground` | `oklch(0 0 0)` | Black text on primary |
| `--secondary` | `oklch(0.8148 0.0819 225.7537)` | Sky blue (cool) |
| `--secondary-foreground` | `oklch(0 0 0)` | Black text on secondary |
| `--muted` | `oklch(0.8828 0.0285 98.1033)` | Cream/yellow tint |
| `--muted-foreground` | `oklch(0.5382 0 0)` | Gray text |
| `--accent` | `oklch(0.9680 0.2110 109.7692)` | Bright lime/yellow |
| `--accent-foreground` | `oklch(0 0 0)` | Black text on accent |
| `--destructive` | `oklch(0.6368 0.2078 25.3313)` | Red for errors |
| `--destructive-foreground` | `oklch(1.0000 0 0)` | White text on red |
| `--border` | `oklch(0.8699 0 0)` | Light gray borders |
| `--input` | `oklch(0.8699 0 0)` | Input borders |
| `--ring` | `oklch(0.8677 0.0735 7.0855)` | Focus ring (coral) |

#### Chart Colors (Light)

| Token | OKLCH Value | Use Case |
|-------|-------------|----------|
| `--chart-1` | `oklch(0.8677 0.0735 7.0855)` | Coral pink |
| `--chart-2` | `oklch(0.8148 0.0819 225.7537)` | Sky blue |
| `--chart-3` | `oklch(0.9680 0.2110 109.7692)` | Bright lime |
| `--chart-4` | `oklch(0.8027 0.1355 349.2347)` | Hot pink |
| `--chart-5` | `oklch(0.7395 0.2268 142.8504)` | Emerald green |

---

### Dark Mode Colors

#### Dark Mode Visual Reference

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                          DARK MODE PALETTE                                   │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  BACKGROUND           FOREGROUND          PRIMARY             SECONDARY     │
│  ┌──────────┐        ┌──────────┐        ┌──────────┐        ┌──────────┐  │
│  │          │        │          │        │          │        │          │  │
│  │   Deep   │        │   Off    │        │   Hot    │        │ Emerald  │  │
│  │   Navy   │        │  White   │        │   Pink   │        │  Green   │  │
│  │          │        │          │        │          │        │          │  │
│  └──────────┘        └──────────┘        └──────────┘        └──────────┘  │
│  oklch(0.23)         oklch(0.92)         oklch(0.80)         oklch(0.74)   │
│                                                                              │
│  ACCENT               MUTED               DESTRUCTIVE         BORDER        │
│  ┌──────────┐        ┌──────────┐        ┌──────────┐        ┌──────────┐  │
│  │          │        │          │        │          │        │          │  │
│  │   Sky    │        │   Dark   │        │   Red    │        │   Dark   │  │
│  │   Blue   │        │   Gray   │        │          │        │   Gray   │  │
│  │          │        │          │        │          │        │          │  │
│  └──────────┘        └──────────┘        └──────────┘        └──────────┘  │
│  oklch(0.81)         oklch(0.39)         oklch(0.64)         oklch(0.39)   │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

#### Dark Mode OKLCH Values

| Token | OKLCH Value | Description |
|-------|-------------|-------------|
| `--background` | `oklch(0.2303 0.0125 264.2926)` | Deep navy blue |
| `--foreground` | `oklch(0.9219 0 0)` | Off-white text |
| `--card` | `oklch(0.3210 0.0078 223.6661)` | Slightly lighter navy |
| `--primary` | `oklch(0.8027 0.1355 349.2347)` | Hot pink (vibrant) |
| `--secondary` | `oklch(0.7395 0.2268 142.8504)` | Emerald green |
| `--muted` | `oklch(0.3867 0 0)` | Dark gray |
| `--muted-foreground` | `oklch(0.7155 0 0)` | Medium gray text |
| `--accent` | `oklch(0.8148 0.0819 225.7537)` | Sky blue |
| `--destructive` | `oklch(0.6368 0.2078 25.3313)` | Red |
| `--border` | `oklch(0.3867 0 0)` | Dark gray borders |
| `--ring` | `oklch(0.8027 0.1355 349.2347)` | Hot pink focus ring |

---

## 3. Typography

### Font Stack

```css
--font-sans: Poppins, sans-serif;
--font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
--font-mono: Roboto Mono, monospace;
```

### Font Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```

### Usage Guidelines

| Context | Font | Weight | Example |
|---------|------|--------|---------|
| Headings | Poppins | 600-700 | Page titles, section headers |
| Body | Poppins | 400-500 | Paragraphs, UI labels |
| Code | Roboto Mono | 400-500 | Code blocks, inline code |
| Editor | Roboto Mono | 400 | Markdown editing |
| Preview | Poppins | 400 | Rendered markdown |

---

## 4. Spacing & Radius

### Border Radius

```css
--radius: 0.5rem;           /* 8px - base unit */
--radius-sm: calc(var(--radius) - 4px);   /* 4px */
--radius-md: calc(var(--radius) - 2px);   /* 6px */
--radius-lg: var(--radius);               /* 8px */
--radius-xl: calc(var(--radius) + 4px);   /* 12px */
```

### Spacing Scale

```css
--spacing: 0.25rem;  /* 4px base unit */
```

Tailwind spacing utilities map to this base:
- `space-1` = 0.25rem (4px)
- `space-2` = 0.5rem (8px)
- `space-4` = 1rem (16px)
- `space-8` = 2rem (32px)

---

## 5. Shadows

### Shadow Scale

| Token | Value | Use Case |
|-------|-------|----------|
| `--shadow-2xs` | `0 1px 3px 0px hsl(0 0% 0% / 0.05)` | Subtle elevation |
| `--shadow-xs` | `0 1px 3px 0px hsl(0 0% 0% / 0.05)` | Buttons |
| `--shadow-sm` | `0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10)` | Cards |
| `--shadow` | Same as sm | Default |
| `--shadow-md` | `0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10)` | Dropdowns |
| `--shadow-lg` | `0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10)` | Modals |
| `--shadow-xl` | `0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10)` | Floating elements |
| `--shadow-2xl` | `0 1px 3px 0px hsl(0 0% 0% / 0.25)` | Maximum elevation |

### Shadow Customization

```css
--shadow-x: 0;
--shadow-y: 1px;
--shadow-blur: 3px;
--shadow-spread: 0px;
--shadow-opacity: 0.1;
--shadow-color: oklch(0 0 0);
```

---

## 6. Installation

### Option 1: shadcn CLI (Recommended)

```bash
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/candyland.json
```

### Option 2: Manual Installation

1. **Create globals.css** with the CSS variables below
2. **Import fonts** in your HTML or CSS
3. **Configure Tailwind** to use the CSS variables

---

## 7. CSS Variables Reference

### Complete Light Mode

```css
:root {
  /* ============================================
     CORE COLORS
     ============================================ */
  --background: oklch(0.9809 0.0025 228.7836);
  --foreground: oklch(0.3211 0 0);
  --card: oklch(1.0000 0 0);
  --card-foreground: oklch(0.3211 0 0);
  --popover: oklch(1.0000 0 0);
  --popover-foreground: oklch(0.3211 0 0);
  --primary: oklch(0.8677 0.0735 7.0855);
  --primary-foreground: oklch(0 0 0);
  --secondary: oklch(0.8148 0.0819 225.7537);
  --secondary-foreground: oklch(0 0 0);
  --muted: oklch(0.8828 0.0285 98.1033);
  --muted-foreground: oklch(0.5382 0 0);
  --accent: oklch(0.9680 0.2110 109.7692);
  --accent-foreground: oklch(0 0 0);
  --destructive: oklch(0.6368 0.2078 25.3313);
  --destructive-foreground: oklch(1.0000 0 0);
  --border: oklch(0.8699 0 0);
  --input: oklch(0.8699 0 0);
  --ring: oklch(0.8677 0.0735 7.0855);

  /* ============================================
     CHART COLORS
     ============================================ */
  --chart-1: oklch(0.8677 0.0735 7.0855);
  --chart-2: oklch(0.8148 0.0819 225.7537);
  --chart-3: oklch(0.9680 0.2110 109.7692);
  --chart-4: oklch(0.8027 0.1355 349.2347);
  --chart-5: oklch(0.7395 0.2268 142.8504);

  /* ============================================
     SIDEBAR COLORS
     ============================================ */
  --sidebar: oklch(0.9809 0.0025 228.7836);
  --sidebar-foreground: oklch(0.3211 0 0);
  --sidebar-primary: oklch(0.8677 0.0735 7.0855);
  --sidebar-primary-foreground: oklch(0 0 0);
  --sidebar-accent: oklch(0.9680 0.2110 109.7692);
  --sidebar-accent-foreground: oklch(0 0 0);
  --sidebar-border: oklch(0.8699 0 0);
  --sidebar-ring: oklch(0.8677 0.0735 7.0855);

  /* ============================================
     TYPOGRAPHY
     ============================================ */
  --font-sans: Poppins, sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: Roboto Mono, monospace;

  /* ============================================
     SPACING & RADIUS
     ============================================ */
  --radius: 0.5rem;
  --spacing: 0.25rem;
  --tracking-normal: 0em;

  /* ============================================
     SHADOWS
     ============================================ */
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
}
```

### Complete Dark Mode

```css
.dark {
  /* ============================================
     CORE COLORS
     ============================================ */
  --background: oklch(0.2303 0.0125 264.2926);
  --foreground: oklch(0.9219 0 0);
  --card: oklch(0.3210 0.0078 223.6661);
  --card-foreground: oklch(0.9219 0 0);
  --popover: oklch(0.3210 0.0078 223.6661);
  --popover-foreground: oklch(0.9219 0 0);
  --primary: oklch(0.8027 0.1355 349.2347);
  --primary-foreground: oklch(0 0 0);
  --secondary: oklch(0.7395 0.2268 142.8504);
  --secondary-foreground: oklch(0 0 0);
  --muted: oklch(0.3867 0 0);
  --muted-foreground: oklch(0.7155 0 0);
  --accent: oklch(0.8148 0.0819 225.7537);
  --accent-foreground: oklch(0 0 0);
  --destructive: oklch(0.6368 0.2078 25.3313);
  --destructive-foreground: oklch(1.0000 0 0);
  --border: oklch(0.3867 0 0);
  --input: oklch(0.3867 0 0);
  --ring: oklch(0.8027 0.1355 349.2347);

  /* ============================================
     CHART COLORS
     ============================================ */
  --chart-1: oklch(0.8027 0.1355 349.2347);
  --chart-2: oklch(0.7395 0.2268 142.8504);
  --chart-3: oklch(0.8148 0.0819 225.7537);
  --chart-4: oklch(0.9680 0.2110 109.7692);
  --chart-5: oklch(0.8652 0.1768 90.3816);

  /* ============================================
     SIDEBAR COLORS
     ============================================ */
  --sidebar: oklch(0.2303 0.0125 264.2926);
  --sidebar-foreground: oklch(0.9219 0 0);
  --sidebar-primary: oklch(0.8027 0.1355 349.2347);
  --sidebar-primary-foreground: oklch(0 0 0);
  --sidebar-accent: oklch(0.8148 0.0819 225.7537);
  --sidebar-accent-foreground: oklch(0 0 0);
  --sidebar-border: oklch(0.3867 0 0);
  --sidebar-ring: oklch(0.8027 0.1355 349.2347);

  /* ============================================
     TYPOGRAPHY (same as light)
     ============================================ */
  --font-sans: Poppins, sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: Roboto Mono, monospace;

  /* ============================================
     SPACING & RADIUS (same as light)
     ============================================ */
  --radius: 0.5rem;

  /* ============================================
     SHADOWS (same as light)
     ============================================ */
  --shadow-x: 0;
  --shadow-y: 1px;
  --shadow-blur: 3px;
  --shadow-spread: 0px;
  --shadow-opacity: 0.1;
  --shadow-color: oklch(0 0 0);
  --shadow-2xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-xs: 0 1px 3px 0px hsl(0 0% 0% / 0.05);
  --shadow-sm: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 1px 2px -1px hsl(0 0% 0% / 0.10);
  --shadow-md: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 2px 4px -1px hsl(0 0% 0% / 0.10);
  --shadow-lg: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 4px 6px -1px hsl(0 0% 0% / 0.10);
  --shadow-xl: 0 1px 3px 0px hsl(0 0% 0% / 0.10), 0 8px 10px -1px hsl(0 0% 0% / 0.10);
  --shadow-2xl: 0 1px 3px 0px hsl(0 0% 0% / 0.25);
}
```

### Tailwind CSS v4 Theme Mapping

```css
@theme inline {
  /* Colors */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-popover: var(--popover);
  --color-popover-foreground: var(--popover-foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-destructive: var(--destructive);
  --color-destructive-foreground: var(--destructive-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
  --color-sidebar: var(--sidebar);
  --color-sidebar-foreground: var(--sidebar-foreground);
  --color-sidebar-primary: var(--sidebar-primary);
  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);
  --color-sidebar-accent: var(--sidebar-accent);
  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);
  --color-sidebar-border: var(--sidebar-border);
  --color-sidebar-ring: var(--sidebar-ring);

  /* Typography */
  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  /* Radius */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

  /* Shadows */
  --shadow-2xs: var(--shadow-2xs);
  --shadow-xs: var(--shadow-xs);
  --shadow-sm: var(--shadow-sm);
  --shadow: var(--shadow);
  --shadow-md: var(--shadow-md);
  --shadow-lg: var(--shadow-lg);
  --shadow-xl: var(--shadow-xl);
  --shadow-2xl: var(--shadow-2xl);
}
```

---

## 🎨 Usage Examples

### Button Primary

```html
<button class="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg px-4 py-2 shadow-sm">
  Primary Button
</button>
```

### Card Component

```html
<div class="bg-card text-card-foreground rounded-lg border border-border shadow-md p-6">
  <h2 class="font-sans font-semibold">Card Title</h2>
  <p class="text-muted-foreground">Card content goes here</p>
</div>
```

### Sidebar

```html
<aside class="bg-sidebar text-sidebar-foreground border-r border-sidebar-border w-64">
  <nav class="p-4">
    <a class="text-sidebar-primary hover:bg-sidebar-accent rounded-md px-3 py-2 block">
      Active Item
    </a>
  </nav>
</aside>
```

---

*Brand Theme Document - Candyland*  
*Last Updated: 2026-01-20*