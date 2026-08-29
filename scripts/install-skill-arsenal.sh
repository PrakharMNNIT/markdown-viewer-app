#!/usr/bin/env bash
# Reinstall the flat skill packs (on-demand library). Nested packs (superpowers,
# mattpocock, pstack, gstack, improve) are vendored separately.
set -euo pipefail
cd "$(dirname "$0")/.."

install_pack() {
  echo "=== Installing $1 ==="
  npx skills@latest add "$1" --skill '*' -a cursor -a claude-code -y
}

install_global() {
  echo "=== Global: $1 ==="
  npx skills@latest add "$1" "${@:2}" -g -y
}

echo "=== Global find-skills (discovery across all repos) ==="
install_global vercel-labs/skills --skill find-skills -a cursor -a claude-code

echo "=== Project find-skills (this repo) ==="
npx skills@latest add vercel-labs/skills --skill find-skills -a cursor -a claude-code -y

install_pack vercel-labs/agent-skills
install_pack vercel-labs/agent-browser
install_pack trailofbits/skills
install_pack anthropics/skills
install_pack github/awesome-copilot

echo "=== agent-browser CLI ==="
npm install agent-browser --save-dev
npx agent-browser install || npx agent-browser install --with-deps

echo "Done. Global list: npx skills@latest list -g"
echo "See docs/agents/workflow-pipeline.md for usage."
