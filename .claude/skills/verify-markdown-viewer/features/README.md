# Markdown Viewer Pro verification map

Read this index before driving the app. Each feature file is a recipe for one user-facing capability.

## Baseline preconditions

- Launch with `RUN_ID=verify-<timestamp>` and `control-viewer.sh launch`.
- App URL: `http://127.0.0.1:3000/markdown-viewer-app/`
- Run `control-viewer.sh doctor` — require HTTP OK and title present.
- Never drive an instance not started by the current verification run.

## Driving conventions

- Start every recipe from a fresh launch unless preconditions say otherwise.
- Prefer `#id` selectors and `aria-label` over CSS classes or DOM position.
- Browser actions via `npx agent-browser` (see parent `SKILL.md`).
- Clear `#markdown-editor` or reload page between unrelated feature runs if state bleeds.

## Proof and skip reporting

- Capture editor input **and** preview output for rendering features.
- UI proof: screenshot + accessibility snapshot under `/opt/cursor/artifacts/`.
- Record feature ID and entry point in artifact names.
- Report unreachable paths with the attempted command and unmet precondition.

## Features

- [Real-time markdown preview](./markdown-preview.md) — type in editor, see rendered HTML in split view.
- [View modes](./view-modes.md) — editor-only, split, preview-only toolbar buttons.
- [Theme switching](./theme-switching.md) — theme picker changes visual theme.
- [Zen mode](./zen-mode.md) — distraction-free full-screen preview.
