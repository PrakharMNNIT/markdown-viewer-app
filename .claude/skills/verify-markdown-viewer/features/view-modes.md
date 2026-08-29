# View modes

Toolbar toggles between editor-only, split, and preview-only layouts.

## Sub-features

- **split-view** — both panes visible (default)
- **editor-only** — hides preview
- **preview-only** — hides editor

## How to get to it (user POV)

Click toolbar buttons: "Split View", "Editor Only", or "Preview Only" (ARIA labels on `#split-view-btn`, `#editor-only-btn`, `#preview-only-btn`).

## Driving it with agent-browser

Preconditions: dev server running.

- **Split → Preview only:** click `[aria-label="Preview Only"]`; snapshot should show `#markdown-preview` visible, editor hidden or minimized per CSS.
- **Proof:** screenshot `$ART/view-mode-preview-only.png`.

## Gotchas

- Layout is CSS-driven; use snapshot text visibility, not fixed coordinates.
