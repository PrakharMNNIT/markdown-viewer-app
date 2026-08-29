# Live Markdown preview

Typing in the editor updates the preview pane with rendered HTML (marked + DOMPurify).

## Sub-features

- **basic-render** — headings, bold, lists render in preview
- **sync-scroll** — optional synchronized scrolling between panes

## How to get to it (user POV)

1. Open the app (default split view).
2. Click or focus `#markdown-editor`.
3. Type Markdown; preview updates in `#markdown-preview`.

## Driving it with agent-browser

Preconditions: dev server running; split view active.

- **Action:** `npx agent-browser fill '#markdown-editor' '# Title\n\nParagraph with **bold**.'`
- **Observe:** `npx agent-browser snapshot` shows preview contains "Title" and "bold".
- **Proof:** screenshot `$ART/preview-proof.png` showing editor and preview panes.

## Gotchas

- Vite `base` is `/markdown-viewer-app/` — include the path segment in URLs.
- Debounced render may need a short sleep before screenshot.
