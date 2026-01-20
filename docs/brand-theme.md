# 🍬 Candyland Design System

## A Bold, Playful-Yet-Professional Aesthetic for Markdown Preview EE

---

## 🎯 Design Philosophy

### The Vision

**Aesthetic Direction:** "Soft Maximalism" — Playful abundance with refined restraint.

Think: A high-end candy shop designed by a Swiss minimalist. Bright colors, but never garish. Playful, but never childish. Every element feels intentional, like a perfectly wrapped bonbon.

### What Makes This UNFORGETTABLE?

> **The one thing users will remember:** The unexpected warmth. 
> 
> In a sea of cold, corporate markdown editors (dark grays, muted blues, sterile whites), Candyland wraps you in coral pinks, lime accents, and cream yellows — like stepping into a sunlit bakery instead of a server room.

### Design Principles

| Principle | Execution |
|-----------|-----------|
| **Warm over Cold** | Lavender-tinted backgrounds, coral primaries, cream muted tones |
| **Vibrant over Muted** | OKLCH colors with high chroma (not washed out) |
| **Soft over Sharp** | Rounded corners (0.5rem), gentle shadows, no hard edges |
| **Playful over Serious** | Lime/yellow accents that pop, pink focus rings |
| **Confident over Timid** | Bold color contrasts, not safe gradients |

---

## 🎨 Color Architecture

### Why OKLCH?

We use **OKLCH** (Oklch Lightness Chroma Hue) because:
- **Perceptual uniformity** — Colors look equally vibrant at the same lightness
- **Wider gamut** — More vivid colors on modern displays than sRGB
- **Predictable mixing** — Gradients flow smoothly without muddy midpoints

### Light Mode: "Sugar Rush"

The default experience. Soft, welcoming, energetic.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                    🌸 LIGHT MODE: "SUGAR RUSH" 🌸                            │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │    BACKGROUND              FOREGROUND              PRIMARY          │   │
│  │    ┌──────────┐           ┌──────────┐           ┌──────────┐      │   │
│  │    │░░░░░░░░░░│           │██████████│           │▓▓▓▓▓▓▓▓▓▓│      │   │
│  │    │░ Lavender│           │█ Charcoal│           │▓  Coral  ▓│      │   │
│  │    │░  Mist  ░│           │██████████│           │▓  Blush  ▓│      │   │
│  │    │░░░░░░░░░░│           │          │           │▓▓▓▓▓▓▓▓▓▓│      │   │
│  │    └──────────┘           └──────────┘           └──────────┘      │   │
│  │    oklch(0.98)            oklch(0.32)            oklch(0.87)       │   │
│  │                                                                      │   │
│  │    SECONDARY               ACCENT                 MUTED             │   │
│  │    ┌──────────┐           ┌──────────┐           ┌──────────┐      │   │
│  │    │▒▒▒▒▒▒▒▒▒▒│           │▓▓▓▓▓▓▓▓▓▓│           │░░░░░░░░░░│      │   │
│  │    │▒  Sky   ▒│           │▓  Lime  ▓│           │░ Cream  ░│      │   │
│  │    │▒  Petal ▒│           │▓  Fizz  ▓│           │░ Butter ░│      │   │
│  │    │▒▒▒▒▒▒▒▒▒▒│           │▓▓▓▓▓▓▓▓▓▓│           │░░░░░░░░░░│      │   │
│  │    └──────────┘           └──────────┘           └──────────┘      │   │
│  │    oklch(0.81)            oklch(0.97)            oklch(0.88)       │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  FEELING: Warm bakery morning | Optimistic | Approachable | Fresh          │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Light Mode Palette:**

| Role | Name | OKLCH | Hex Approx | Feel |
|------|------|-------|------------|------|
| Background | Lavender Mist | `oklch(0.9809 0.0025 228.7836)` | #f8f7fc | Soft, slightly cool |
| Foreground | Charcoal | `oklch(0.3211 0 0)` | #4a4a4a | Confident, readable |
| Primary | Coral Blush | `oklch(0.8677 0.0735 7.0855)` | #f5b5a8 | Warm, inviting |
| Secondary | Sky Petal | `oklch(0.8148 0.0819 225.7537)` | #a8d4f5 | Cool complement |
| Accent | Lime Fizz | `oklch(0.9680 0.2110 109.7692)` | #e8ff6b | Electric pop |
| Muted | Cream Butter | `oklch(0.8828 0.0285 98.1033)` | #f5f0d8 | Neutral warmth |
| Destructive | Cherry | `oklch(0.6368 0.2078 25.3313)` | #d94545 | Alert, urgent |

---

### Dark Mode: "Midnight Confetti"

For night owls. Rich, vibrant, sophisticated.

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                   🌙 DARK MODE: "MIDNIGHT CONFETTI" 🌙                       │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  ┌─────────────────────────────────────────────────────────────────────┐   │
│  │                                                                      │   │
│  │    BACKGROUND              FOREGROUND              PRIMARY          │   │
│  │    ┌──────────┐           ┌──────────┐           ┌──────────┐      │   │
│  │    │██████████│           │░░░░░░░░░░│           │▓▓▓▓▓▓▓▓▓▓│      │   │
│  │    │█  Deep  █│           │░  Ghost ░│           │▓   Hot  ▓│      │   │
│  │    │█  Navy  █│           │░  White ░│           │▓  Pink  ▓│      │   │
│  │    │██████████│           │░░░░░░░░░░│           │▓▓▓▓▓▓▓▓▓▓│      │   │
│  │    └──────────┘           └──────────┘           └──────────┘      │   │
│  │    oklch(0.23)            oklch(0.92)            oklch(0.80)       │   │
│  │                                                                      │   │
│  │    SECONDARY               ACCENT                 MUTED             │   │
│  │    ┌──────────┐           ┌──────────┐           ┌──────────┐      │   │
│  │    │▓▓▓▓▓▓▓▓▓▓│           │▒▒▒▒▒▒▒▒▒▒│           │██████████│      │   │
│  │    │▓ Emerald▓│           │▒  Azure ▒│           │█ Graphite│      │   │
│  │    │▓  Glow  ▓│           │▒  Spark ▒│           │█  Smoke █│      │   │
│  │    │▓▓▓▓▓▓▓▓▓▓│           │▒▒▒▒▒▒▒▒▒▒│           │██████████│      │   │
│  │    └──────────┘           └──────────┘           └──────────┘      │   │
│  │    oklch(0.74)            oklch(0.81)            oklch(0.39)       │   │
│  │                                                                      │   │
│  └─────────────────────────────────────────────────────────────────────┘   │
│                                                                              │
│  FEELING: Late-night cafe | Creative | Sophisticated | Electric            │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

**Dark Mode Palette:**

| Role | Name | OKLCH | Hex Approx | Feel |
|------|------|-------|------------|------|
| Background | Deep Navy | `oklch(0.2303 0.0125 264.2926)` | #1a1d2e | Rich, not black |
| Foreground | Ghost White | `oklch(0.9219 0 0)` | #ebebeb | Easy on eyes |
| Primary | Hot Pink | `oklch(0.8027 0.1355 349.2347)` | #ff6b9d | Bold statement |
| Secondary | Emerald Glow | `oklch(0.7395 0.2268 142.8504)` | #2dd4bf | Vibrant complement |
| Accent | Azure Spark | `oklch(0.8148 0.0819 225.7537)` | #7dd3fc | Cool highlight |
| Muted | Graphite Smoke | `oklch(0.3867 0 0)` | #5c5c5c | Subtle depth |
| Destructive | Cherry | `oklch(0.6368 0.2078 25.3313)` | #d94545 | Consistent warning |

---

## ✍️ Typography System

### The Font Stack

**CRITICAL:** No Inter. No Roboto. No System UI fallbacks as primary.

```css
--font-sans: 'Poppins', sans-serif;        /* Geometric, friendly, modern */
--font-serif: 'Fraunces', Georgia, serif;  /* Optional: editorial headings */
--font-mono: 'Roboto Mono', monospace;     /* Code: crisp, technical */
```

### Why Poppins?

- **Geometric circles** — Matches the soft, rounded aesthetic
- **Friendly weight distribution** — Not too corporate, not too casual
- **Excellent readability** — Works at both small UI labels and large headings
- **Full weight range** — 400-700 covers all needs

### Type Scale

| Level | Size | Weight | Use |
|-------|------|--------|-----|
| Display | 3rem (48px) | 700 | Hero headings |
| H1 | 2.25rem (36px) | 600 | Page titles |
| H2 | 1.5rem (24px) | 600 | Section headers |
| H3 | 1.25rem (20px) | 500 | Subsections |
| Body | 1rem (16px) | 400 | Paragraphs |
| Small | 0.875rem (14px) | 400 | Labels, captions |
| Tiny | 0.75rem (12px) | 500 | Badges, tags |

### Font Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto+Mono:wght@400;500&display=swap" rel="stylesheet">
```

---

## 🎭 Motion & Animation

### Philosophy

> "One well-orchestrated page load beats a hundred scattered micro-interactions."

### Animation Tokens

```css
/* Timing */
--duration-instant: 50ms;    /* Hover color changes */
--duration-fast: 150ms;      /* Button feedback */
--duration-base: 250ms;      /* Modal transitions */
--duration-slow: 400ms;      /* Page reveals */
--duration-slower: 600ms;    /* Complex sequences */

/* Easing */
--ease-bounce: cubic-bezier(0.34, 1.56, 0.64, 1);   /* Playful overshoot */
--ease-smooth: cubic-bezier(0.22, 1, 0.36, 1);      /* Elegant slide */
--ease-snappy: cubic-bezier(0.4, 0, 0.2, 1);        /* Quick response */
```

### Signature Animations

**1. Page Load: Staggered Candy Drop**
```css
@keyframes candyDrop {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.9);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.animate-candy-drop {
  animation: candyDrop 400ms var(--ease-bounce) backwards;
}

/* Stagger children */
.stagger > *:nth-child(1) { animation-delay: 0ms; }
.stagger > *:nth-child(2) { animation-delay: 60ms; }
.stagger > *:nth-child(3) { animation-delay: 120ms; }
.stagger > *:nth-child(4) { animation-delay: 180ms; }
.stagger > *:nth-child(5) { animation-delay: 240ms; }
```

**2. Button Hover: Subtle Lift**
```css
.btn-lift {
  transition: transform 150ms var(--ease-bounce), 
              box-shadow 150ms ease-out;
}

.btn-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px oklch(0 0 0 / 0.15);
}

.btn-lift:active {
  transform: translateY(0);
}
```

**3. Focus Ring: Coral Glow**
```css
:focus-visible {
  outline: none;
  box-shadow: 
    0 0 0 2px var(--background),
    0 0 0 4px var(--ring);
}
```

---

## 🏗️ Spatial Composition

### Layout Philosophy

- **Generous padding** — Let elements breathe (minimum 16px touch targets)
- **Consistent gaps** — Use spacing scale, not random values
- **Soft edges** — Everything gets `border-radius: 0.5rem`
- **Subtle depth** — Cards float with soft shadows, not flat

### Spacing Scale (4px Base)

```css
--spacing: 0.25rem;  /* Base: 4px */

/* Scale */
--space-1: 0.25rem;   /*  4px */
--space-2: 0.5rem;    /*  8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
--space-16: 4rem;     /* 64px */
```

### Border Radius

```css
--radius: 0.5rem;    /* Base: 8px */
--radius-sm: 4px;    /* Small elements */
--radius-md: 6px;    /* Input fields */
--radius-lg: 8px;    /* Buttons, cards */
--radius-xl: 12px;   /* Modals, dialogs */
--radius-full: 9999px; /* Pills, avatars */
```

---

## 🌈 Shadow System

### Shadow Scale

Soft, diffused shadows that feel like morning light, not harsh noon.

```css
--shadow-2xs: 0 1px 3px 0px oklch(0 0 0 / 0.05);
--shadow-xs: 0 1px 3px 0px oklch(0 0 0 / 0.05);
--shadow-sm: 
  0 1px 3px 0px oklch(0 0 0 / 0.10), 
  0 1px 2px -1px oklch(0 0 0 / 0.10);
--shadow: 
  0 1px 3px 0px oklch(0 0 0 / 0.10), 
  0 1px 2px -1px oklch(0 0 0 / 0.10);
--shadow-md: 
  0 1px 3px 0px oklch(0 0 0 / 0.10), 
  0 2px 4px -1px oklch(0 0 0 / 0.10);
--shadow-lg: 
  0 1px 3px 0px oklch(0 0 0 / 0.10), 
  0 4px 6px -1px oklch(0 0 0 / 0.10);
--shadow-xl: 
  0 1px 3px 0px oklch(0 0 0 / 0.10), 
  0 8px 10px -1px oklch(0 0 0 / 0.10);
--shadow-2xl: 0 1px 3px 0px oklch(0 0 0 / 0.25);
```

---

## 📋 Complete CSS Variables

### Light Mode (`:root`)

```css
:root {
  /* ═══════════════════════════════════════════════════════════════
     CANDYLAND LIGHT: "SUGAR RUSH"
     ═══════════════════════════════════════════════════════════════ */
  
  /* Core */
  --background: oklch(0.9809 0.0025 228.7836);
  --foreground: oklch(0.3211 0 0);
  --card: oklch(1.0000 0 0);
  --card-foreground: oklch(0.3211 0 0);
  --popover: oklch(1.0000 0 0);
  --popover-foreground: oklch(0.3211 0 0);
  
  /* Primary: Coral Blush */
  --primary: oklch(0.8677 0.0735 7.0855);
  --primary-foreground: oklch(0 0 0);
  
  /* Secondary: Sky Petal */
  --secondary: oklch(0.8148 0.0819 225.7537);
  --secondary-foreground: oklch(0 0 0);
  
  /* Muted: Cream Butter */
  --muted: oklch(0.8828 0.0285 98.1033);
  --muted-foreground: oklch(0.5382 0 0);
  
  /* Accent: Lime Fizz */
  --accent: oklch(0.9680 0.2110 109.7692);
  --accent-foreground: oklch(0 0 0);
  
  /* Destructive */
  --destructive: oklch(0.6368 0.2078 25.3313);
  --destructive-foreground: oklch(1.0000 0 0);
  
  /* Borders */
  --border: oklch(0.8699 0 0);
  --input: oklch(0.8699 0 0);
  --ring: oklch(0.8677 0.0735 7.0855);
  
  /* Charts */
  --chart-1: oklch(0.8677 0.0735 7.0855);
  --chart-2: oklch(0.8148 0.0819 225.7537);
  --chart-3: oklch(0.9680 0.2110 109.7692);
  --chart-4: oklch(0.8027 0.1355 349.2347);
  --chart-5: oklch(0.7395 0.2268 142.8504);
  
  /* Sidebar */
  --sidebar: oklch(0.9809 0.0025 228.7836);
  --sidebar-foreground: oklch(0.3211 0 0);
  --sidebar-primary: oklch(0.8677 0.0735 7.0855);
  --sidebar-primary-foreground: oklch(0 0 0);
  --sidebar-accent: oklch(0.9680 0.2110 109.7692);
  --sidebar-accent-foreground: oklch(0 0 0);
  --sidebar-border: oklch(0.8699 0 0);
  --sidebar-ring: oklch(0.8677 0.0735 7.0855);
  
  /* Typography */
  --font-sans: 'Poppins', sans-serif;
  --font-serif: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  --font-mono: 'Roboto Mono', monospace;
  
  /* Spacing & Radius */
  --radius: 0.5rem;
  --spacing: 0.25rem;
  --tracking-normal: 0em;
  
  /* Shadows */
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

### Dark Mode (`.dark`)

```css
.dark {
  /* ═══════════════════════════════════════════════════════════════
     CANDYLAND DARK: "MIDNIGHT CONFETTI"
     ═══════════════════════════════════════════════════════════════ */
  
  /* Core */
  --background: oklch(0.2303 0.0125 264.2926);
  --foreground: oklch(0.9219 0 0);
  --card: oklch(0.3210 0.0078 223.6661);
  --card-foreground: oklch(0.9219 0 0);
  --popover: oklch(0.3210 0.0078 223.6661);
  --popover-foreground: oklch(0.9219 0 0);
  
  /* Primary: Hot Pink */
  --primary: oklch(0.8027 0.1355 349.2347);
  --primary-foreground: oklch(0 0 0);
  
  /* Secondary: Emerald Glow */
  --secondary: oklch(0.7395 0.2268 142.8504);
  --secondary-foreground: oklch(0 0 0);
  
  /* Muted: Graphite Smoke */
  --muted: oklch(0.3867 0 0);
  --muted-foreground: oklch(0.7155 0 0);
  
  /* Accent: Azure Spark */
  --accent: oklch(0.8148 0.0819 225.7537);
  --accent-foreground: oklch(0 0 0);
  
  /* Destructive */
  --destructive: oklch(0.6368 0.2078 25.3313);
  --destructive-foreground: oklch(1.0000 0 0);
  
  /* Borders */
  --border: oklch(0.3867 0 0);
  --input: oklch(0.3867 0 0);
  --ring: oklch(0.8027 0.1355 349.2347);
  
  /* Charts */
  --chart-1: oklch(0.8027 0.1355 349.2347);
  --chart-2: oklch(0.7395 0.2268 142.8504);
  --chart-3: oklch(0.8148 0.0819 225.7537);
  --chart-4: oklch(0.9680 0.2110 109.7692);
  --chart-5: oklch(0.8652 0.1768 90.3816);
  
  /* Sidebar */
  --sidebar: oklch(0.2303 0.0125 264.2926);
  --sidebar-foreground: oklch(0.9219 0 0);
  --sidebar-primary: oklch(0.8027 0.1355 349.2347);
  --sidebar-primary-foreground: oklch(0 0 0);
  --sidebar-accent: oklch(0.8148 0.0819 225.7537);
  --sidebar-accent-foreground: oklch(0 0 0);
  --sidebar-border: oklch(0.3867 0 0);
  --sidebar-ring: oklch(0.8027 0.1355 349.2347);
}
```

### Tailwind CSS v4 Theme Mapping

```css
@theme inline {
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

  --font-sans: var(--font-sans);
  --font-mono: var(--font-mono);
  --font-serif: var(--font-serif);

  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);

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

## 🚀 Installation

```bash
pnpm dlx shadcn@latest add https://tweakcn.com/r/themes/candyland.json
```

---

## 🎯 What Makes This Different

| Generic Design System | Candyland |
|----------------------|-----------|
| Gray backgrounds | Lavender-tinted backgrounds |
| Blue primary | Coral/Hot Pink primary |
| Muted accents | Electric Lime/Azure accents |
| Inter/Roboto fonts | Poppins (geometric, friendly) |
| Corporate feel | Bakery-shop warmth |
| Safe, predictable | Bold, memorable |

**The Memory Test:**

> "Close your eyes. Picture the app. What do you see?"
> 
> ❌ Generic: "Uh... gray? Blue buttons?"
> 
> ✅ Candyland: "Warm coral, that electric lime pop, the deep navy at night!"

---

## 📝 Summary

**Candyland** is a design system that dares to be different:

| Aspect | Decision | Why |
|--------|----------|-----|
| **Direction** | "Soft Maximalism" | Playful + Professional |
| **Light Primary** | Coral Blush | Warmth over corporate blue |
| **Dark Primary** | Hot Pink | Bold statement, not boring |
| **Accent** | Lime Fizz / Azure | Electric pop that's memorable |
| **Typography** | Poppins | Geometric, friendly, readable |
| **Motion** | Bounce easing, staggered loads | Playful personality |
| **Shadows** | Soft, diffused | Morning light, not harsh |

**The Candyland Promise:**

> "You'll know you're not in another gray markdown editor. You're somewhere warm, creative, and joyful — a place where writing feels good."

---

*Candyland Design System v1.0*  
*Created: 2026-01-20*  
*Aesthetic: Soft Maximalism*  
*Compatible with: shadcn/ui, Tailwind CSS v4*