# Theme selection

Theme picker swaps the active stylesheet (`#theme-stylesheet`) and updates the swatch label.

## Sub-features

- **picker-open** — dropdown lists available themes
- **theme-apply** — selecting a theme changes colors and label

## How to get to it (user POV)

1. Click `#theme-picker-trigger` (listbox "Select theme").
2. Choose a theme from `#theme-picker-dropdown`.

## Driving it with agent-browser

Preconditions: dev server running.

- **Action:** click theme picker trigger, then click a theme option (use snapshot refs).
- **Observe:** `#theme-picker-label` text changes; preview/editor colors shift.
- **Proof:** before/after screenshots in `$ART/theme-before.png` and `$ART/theme-after.png`.

## Gotchas

- Hidden `<select id="theme-selector">` exists for a11y; prefer the visible picker for user POV tests.
