---
name: verify-markdown-viewer
description: Drive Markdown Viewer Pro (Vite + vanilla JS) like a user and capture proof. Use when verifying UI changes, markdown rendering, themes, view modes, or any feature in this repo's web app.
---

# Verify Markdown Viewer Pro

Project-local verification for the primary surface: **web UI** at `http://127.0.0.1:3000/markdown-viewer-app/`.
Secondary surfaces: Vitest (`npm test`), ESLint (`npm run lint`) — use those for unit checks; this skill drives the real browser path.

Read `.cursor/skills/verify-markdown-viewer/features/README.md` before driving. One feature file per user-facing capability.

## Launch

Start an isolated dev instance (never reuse the user's personal dev server):

```bash
export RUN_ID="verify-$(date +%s)"
bash .cursor/skills/verify-markdown-viewer/scripts/control-viewer.sh launch
```

Ready when `control-viewer.sh doctor` prints `HTTP: OK` and `TITLE: OK` (Vite listening on port 3000).

Teardown after every run (success or failure):

```bash
bash .cursor/skills/verify-markdown-viewer/scripts/control-viewer.sh cleanup
```

## Doctor

Run first whenever anything looks off:

```bash
export RUN_ID=<same id used for launch>
bash .cursor/skills/verify-markdown-viewer/scripts/control-viewer.sh doctor
```

Requires: HTTP 200 at the app URL, page contains `Markdown Viewer Pro`, vite process on port 3000 owned by this run's tmux session `mv-$RUN_ID`.

## Drive

Harness: **agent-browser** (repo devDependency). Load core patterns before guessing commands:

```bash
npx agent-browser skills get core
```

Typical session:

```bash
URL=$(RUN_ID=$RUN_ID bash .cursor/skills/verify-markdown-viewer/scripts/control-viewer.sh url)
npx agent-browser open "$URL"
npx agent-browser wait "#markdown-editor"
npx agent-browser snapshot --json   # accessibility tree with @refs
npx agent-browser fill "#markdown-editor" "# Hello\n\n**bold** text"
npx agent-browser wait "h1"         # preview rendered heading
npx agent-browser screenshot /opt/cursor/artifacts/verify-preview.png
```

Stable handles (prefer over coordinates):

| Element | Handle |
| --- | --- |
| Editor | `#markdown-editor` or `[aria-label="Markdown editor input"]` |
| Preview pane | `#markdown-preview` |
| Split view | `#split-view-btn` / `[aria-label="Split View"]` |
| Preview only | `#preview-only-btn` |
| Editor only | `#editor-only-btn` |
| Theme picker | `#theme-picker-trigger` / `[aria-label="Select theme"]` |
| Zen mode | `#zen-mode-btn` / `[aria-label="Enter Distraction Free Mode"]` |

Do not drive a dev server you did not start with `control-viewer.sh launch` for this `RUN_ID`.

## Evidence

Proof artifacts go to `/opt/cursor/artifacts/` (survive cleanup).

Standards:

- Exercise the real user path (type in editor, click toolbar) — not internal setters or test-only hooks.
- Capture the action **and** resulting DOM state, not only a final screenshot.
- For markdown rendering: show editor source and preview output (screenshot + ARIA snapshot or `innerHTML` check via snapshot).
- Record feature ID and entry point in artifact filenames, e.g. `verify-markdown-preview-split.png`.
- Side effects: localStorage auto-save is acceptable; do not mutate git state.

Minimum proof set per feature: one screenshot + one accessibility snapshot or structured assertion output.

## Cleanup

Always run after verification (keeps evidence, removes instances):

```bash
bash .cursor/skills/verify-markdown-viewer/scripts/control-viewer.sh cleanup
```

Confirm evidence still exists:

```bash
ls -la /opt/cursor/artifacts/verify-*
```

Never `pkill -f vite`; kill only via `control-viewer.sh cleanup` (tmux session `mv-$RUN_ID`).

## Helpers

| Script | Purpose |
| --- | --- |
| `scripts/control-viewer.sh launch` | Start vite on port 3000 in isolated tmux session |
| `scripts/control-viewer.sh doctor` | Read-only health check |
| `scripts/control-viewer.sh cleanup` | Stop instance and scratch state |
| `scripts/control-viewer.sh url` | Print app URL |

All helpers require `RUN_ID` in the environment for isolation.

## Maintenance

Re-run `/create-verification-skill` or `/maintain-verification-skill` when routes, selectors, or ports change.
