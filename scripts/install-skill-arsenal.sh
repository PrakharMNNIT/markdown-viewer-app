#!/usr/bin/env bash
# Reinstall the flat skill packs (on-demand library). Nested packs (superpowers,
# mattpocock, pstack, gstack, improve) are vendored separately.
set -euo pipefail
cd "$(dirname "$0")/.."

install_pack() {
  echo "=== Installing $1 ==="
  npx skills@latest add "$1" --skill '*' -a cursor -a claude-code -y
}

echo "=== find-skills (discovery) ==="
npx skills@latest add vercel-labs/skills --skill find-skills -a cursor -a claude-code -y

install_pack vercel-labs/agent-skills
install_pack vercel-labs/agent-browser
install_pack trailofbits/skills
install_pack anthropics/skills
install_pack github/awesome-copilot

echo "=== agent-browser CLI ==="
npm install agent-browser --save-dev
npx agent-browser install || npx agent-browser install --with-deps

echo "Done. See docs/agents/workflow-pipeline.md for usage."
