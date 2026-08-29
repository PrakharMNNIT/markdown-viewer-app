# View modes

Users switch between editor-only, split, and preview-only layouts via toolbar buttons.

## Sub-features

- `mode-editor-only` — hides preview, shows editor full width.
- `mode-preview-only` — hides editor, shows preview full width.
- `mode-split` — restores split layout.

## How to get to it (user POV)

- Toolbar buttons: **Editor Only**, **Split View**, **Preview Only** (icons with those `aria-label`s).

## Driving it with agent-browser

Preconditions:

- App loaded at verification URL.
- Split view is the starting layout.

- **Editor only.** Run `npx agent-browser click "#editor-only-btn"`. `#markdown-editor` visible; `#markdown-preview` hidden or zero-width.
- **Preview only.** Run `npx agent-browser click "#preview-only-btn"`. Preview visible; editor hidden.
- **Split restore.** Run `npx agent-browser click "#split-view-btn"`. Both panes visible.
- **Proof.** Run `npx agent-browser screenshot /opt/cursor/artifacts/verify-view-modes-split.png` after restoring split.

## Gotchas

- Mobile tab UI (`data-tab`) is separate; this map covers desktop toolbar only.
- View mode persists in localStorage — reload may restore last mode; click Split explicitly before proof.
