#!/usr/bin/env bash
# Verification helper for Markdown Viewer Pro (Vite dev server).
# Usage: RUN_ID=<id> ./control-viewer.sh <launch|doctor|cleanup|pid|url>
set -euo pipefail

RUN_ID="${RUN_ID:-verify-$$}"
STATE_DIR="/tmp/markdown-viewer-verify-${RUN_ID}"
PID_FILE="${STATE_DIR}/vite.pid"
PORT="${VIEWER_PORT:-3000}"
HOST="${VIEWER_HOST:-127.0.0.1}"
BASE_PATH="/markdown-viewer-app/"
URL="http://${HOST}:${PORT}${BASE_PATH}"
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/../../../.." && pwd)"

mkdir -p "$STATE_DIR"

launch() {
  if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    echo "control-viewer: already running pid $(cat "$PID_FILE") at $URL"
    return 0
  fi

  tmux -f /exec-daemon/tmux.portal.conf has-session -t "mv-${RUN_ID}" 2>/dev/null \
    && tmux -f /exec-daemon/tmux.portal.conf kill-session -t "mv-${RUN_ID}" || true

  tmux -f /exec-daemon/tmux.portal.conf new-session -d -s "mv-${RUN_ID}" -c "$REPO_ROOT" -- "${SHELL:-bash}" -l
  tmux -f /exec-daemon/tmux.portal.conf send-keys -t "mv-${RUN_ID}:0.0" \
    "npm run dev -- --host ${HOST} --port ${PORT} --strictPort" C-m

  for _ in $(seq 1 30); do
    if curl -sf "$URL" >/dev/null 2>&1; then
      pgrep -f "vite.*--port ${PORT}" | head -1 >"$PID_FILE" || true
      echo "control-viewer: ready at $URL (session mv-${RUN_ID})"
      return 0
    fi
    sleep 1
  done

  echo "control-viewer: timed out waiting for $URL" >&2
  return 1
}

doctor() {
  local ok=0
  echo "RUN_ID=$RUN_ID"
  echo "URL=$URL"
  echo "STATE_DIR=$STATE_DIR"

  if curl -sf "$URL" >/dev/null 2>&1; then
    echo "HTTP: OK (200)"
  else
    echo "HTTP: FAIL (no response at $URL)" >&2
    ok=1
  fi

  if curl -sf "$URL" | grep -q 'Markdown Viewer Pro'; then
    echo "TITLE: OK"
  else
    echo "TITLE: FAIL (page missing app title)" >&2
    ok=1
  fi

  if [ -f "$PID_FILE" ] && kill -0 "$(cat "$PID_FILE")" 2>/dev/null; then
    echo "PID: OK ($(cat "$PID_FILE"))"
  elif pgrep -f "vite.*--port ${PORT}" >/dev/null 2>&1; then
    echo "PID: OK (vite on port ${PORT})"
  else
    echo "PID: WARN (no tracked vite process; port may be owned elsewhere)" >&2
  fi

  return "$ok"
}

cleanup() {
  if tmux -f /exec-daemon/tmux.portal.conf has-session -t "mv-${RUN_ID}" 2>/dev/null; then
    tmux -f /exec-daemon/tmux.portal.conf kill-session -t "mv-${RUN_ID}"
    echo "control-viewer: killed tmux session mv-${RUN_ID}"
  fi

  if [ -f "$PID_FILE" ]; then
    local pid
    pid="$(cat "$PID_FILE")"
    if kill -0 "$pid" 2>/dev/null; then
      kill "$pid" 2>/dev/null || true
      echo "control-viewer: killed pid $pid"
    fi
    rm -f "$PID_FILE"
  fi

  rm -rf "$STATE_DIR"
  echo "control-viewer: cleanup complete (evidence dir /opt/cursor/artifacts is untouched)"
}

cmd="${1:-doctor}"
case "$cmd" in
  launch) launch ;;
  doctor) doctor ;;
  cleanup) cleanup ;;
  pid) [ -f "$PID_FILE" ] && cat "$PID_FILE" || pgrep -f "vite.*--port ${PORT}" | head -1 || true ;;
  url) echo "$URL" ;;
  *) echo "usage: RUN_ID=<id> $0 {launch|doctor|cleanup|pid|url}" >&2; exit 1 ;;
esac
