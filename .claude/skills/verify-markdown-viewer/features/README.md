# Markdown Viewer Pro verification map

Maintained source for user-facing verification. Read this index before driving the app.

## Baseline preconditions

- Dev server at `http://127.0.0.1:${VERIFY_PORT}/markdown-viewer-app/` (default port 3000).
- `VERIFY_RUN_ID` set; PID file at `/tmp/mvp-verify-${VERIFY_RUN_ID}.pid`.
- `agent-browser` installed (`npx agent-browser install`).
- Start from split view unless a feature specifies otherwise.

## Driving conventions

- Prefer `#markdown-editor`, `#markdown-preview`, and `aria-label` selectors.
- Wait ~500ms after editor input before screenshotting preview updates.
- Capture proof under `/tmp/mvp-verify-${VERIFY_RUN_ID}/`.

## Features

- [Live Markdown preview](./live-preview.md) — editor → preview rendering
- [View modes](./view-modes.md) — split, editor-only, preview-only
- [Theme selection](./theme-selection.md) — theme picker changes stylesheet
