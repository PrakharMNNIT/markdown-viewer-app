---
name: verify-markdown-viewer
description: "Drive Markdown Viewer Pro (Vite + vanilla JS) in a real browser to prove user-facing behavior. Use after UI changes, theme/export work, or when proof requires rendered Markdown, not unit tests alone."
---

# Verify Markdown Viewer Pro

Project-local verification for the Vite dev server at `http://127.0.0.1:3000/markdown-viewer-app/`. Uses `agent-browser` (CDP) or gstack `browse` as the harness.

## Launch

```bash
# From repo root — use a dedicated port per run
export VERIFY_PORT="${VERIFY_PORT:-3000}"
export VERIFY_RUN_ID="${VERIFY_RUN_ID:-$(date +%s)}"

npm run dev -- --port "$VERIFY_PORT" --host 127.0.0.1 &
DEV_PID=$!
echo "$DEV_PID" > "/tmp/mvp-verify-${VERIFY_RUN_ID}.pid"

# Wait for Vite ready
for i in $(seq 1 30); do
  curl -sf "http://127.0.0.1:${VERIFY_PORT}/markdown-viewer-app/" >/dev/null && break
  sleep 1
done
curl -sf "http://127.0.0.1:${VERIFY_PORT}/markdown-viewer-app/" || { echo "dev server failed"; exit 1; }
```

**Ready signal:** HTTP 200 on `/markdown-viewer-app/` and page title contains "Markdown Viewer Pro".

## Doctor

Read-only checks before driving:

```bash
BASE="http://127.0.0.1:${VERIFY_PORT}/markdown-viewer-app/"
curl -sf "$BASE" | grep -q "Markdown Viewer Pro" || exit 1
npx agent-browser skills get core >/dev/null 2>&1 || npx agent-browser install
test -f "/tmp/mvp-verify-${VERIFY_RUN_ID}.pid" && kill -0 "$(cat "/tmp/mvp-verify-${VERIFY_RUN_ID}.pid")" 2>/dev/null
```

Abort if the PID file is missing, the process is dead, or `agent-browser` is not installed.

## Drive

Base URL: `http://127.0.0.1:${VERIFY_PORT}/markdown-viewer-app/`

Prefer ARIA labels from `index.html`:

| Control | Handle |
| --- | --- |
| Editor | `#markdown-editor` |
| Preview | `#markdown-preview` |
| Split view | `[aria-label="Split View"]` |
| Preview only | `[aria-label="Preview Only"]` |
| Theme picker | `[aria-label="Select theme"]` |
| Sync scroll | `[aria-label="Toggle Synchronized Scrolling"]` |

Example flow (live preview):

```bash
BASE="http://127.0.0.1:${VERIFY_PORT}/markdown-viewer-app/"
ART="/tmp/mvp-verify-${VERIFY_RUN_ID}"
mkdir -p "$ART"

npx agent-browser open "$BASE"
npx agent-browser snapshot
# Type into editor — use snapshot refs (@eN) from prior snapshot
npx agent-browser fill '#markdown-editor' '# Hello Verify\n\n**bold** text'
sleep 0.5
npx agent-browser screenshot "$ART/preview-proof.png"
npx agent-browser close
```

Read [`features/README.md`](./features/README.md) before covering additional features.

## Evidence

Store artifacts under `/tmp/mvp-verify-${VERIFY_RUN_ID}/`:

- Screenshot with app chrome visible (toolbar title "Markdown Viewer Pro")
- ARIA snapshot or command log showing the action taken
- For mutations (theme/export): before + after screenshots

Proof standards: exercise the user path (type in editor → see preview update), not internal JS APIs.

## Cleanup

Kill only the dev server this run started:

```bash
if [ -f "/tmp/mvp-verify-${VERIFY_RUN_ID}.pid" ]; then
  kill "$(cat "/tmp/mvp-verify-${VERIFY_RUN_ID}.pid")" 2>/dev/null || true
  rm -f "/tmp/mvp-verify-${VERIFY_RUN_ID}.pid"
fi
```

**Do not** delete `/tmp/mvp-verify-${VERIFY_RUN_ID}/` evidence during cleanup.

## Helpers

| Script | Purpose |
| --- | --- |
| `npm run dev -- --port N` | Start Vite on port N |
| `npx agent-browser` | Browser harness (see `agent-browser` skill) |
| `npm test` | Unit tests (complement, not substitute, for UI proof) |

Maintain the feature map with `/maintain-verification-skill` when routes or controls change.
