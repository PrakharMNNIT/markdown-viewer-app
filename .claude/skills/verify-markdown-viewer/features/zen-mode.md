# Zen mode

Users enter distraction-free full-screen preview; ESC or exit button returns to normal UI.

## Sub-features

- `zen-enter` — hides toolbar/sidebar, full-width preview.
- `zen-exit` — restores normal chrome.

## How to get to it (user POV)

- Click **Enter Distraction Free Mode** (`#zen-mode-btn`).
- Press Escape or click **Exit Zen Mode** (`#exit-zen-btn`).

## Driving it with agent-browser

Preconditions:

- App loaded with some preview content (type `# Zen\n\nContent` in editor first).

- **Enter zen.** Run `npx agent-browser click "#zen-mode-btn"`. Toolbar hidden; `#exit-zen-btn` visible.
- **Proof zen.** Run `npx agent-browser screenshot /opt/cursor/artifacts/verify-zen-mode.png`.
- **Exit zen.** Run `npx agent-browser press Escape` or `npx agent-browser click "#exit-zen-btn"`. Toolbar returns.

## Gotchas

- Zen requires preview content to be meaningful; empty preview still works but proof is weak.
- Floating exit button may overlap content — include it in screenshot as identity marker.
