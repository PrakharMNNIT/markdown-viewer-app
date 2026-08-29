# Real-time markdown preview

Users type Markdown in the editor and see rendered HTML update live in the preview pane (split view default).

## Sub-features

- `preview-headings` — `# heading` renders as `<h1>`.
- `preview-bold` — `**text**` renders bold.
- `preview-empty` — clearing editor clears preview.

## How to get to it (user POV)

- Open the app (default split view shows editor left, preview right).
- Click inside the **Markdown editor** textarea and type.

## Driving it with agent-browser

Preconditions:

- App healthy at `http://127.0.0.1:3000/markdown-viewer-app/`.
- Split view active (default on load; confirm `#split-view-btn` has active/pressed state or both `#markdown-editor` and `#markdown-preview` visible).

- **Open app.** Run `npx agent-browser open "$URL"`. Editor `#markdown-editor` is visible.
- **Type sample.** Run `npx agent-browser fill "#markdown-editor" "# Verify Title\n\n**proof** word"`. Preview `#markdown-preview` updates without page reload.
- **Assert heading.** Run `npx agent-browser wait "h1"` and `npx agent-browser snapshot --json`. Snapshot contains `Verify Title` heading.
- **Assert bold.** Snapshot or screenshot shows bold **proof** in preview.
- **Proof.** Run `npx agent-browser screenshot /opt/cursor/artifacts/verify-markdown-preview-split.png`. File shows editor source and rendered preview side by side.

## Gotchas

- Vite `base` is `/markdown-viewer-app/` — open the full path, not `/` alone.
- Large paste may lag preview; wait for `h1` or specific preview text before screenshot.
- Mermaid/KaTeX need extra wait time; this feature covers basic CommonMark only.
