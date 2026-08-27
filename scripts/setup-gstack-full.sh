#!/usr/bin/env bash
# Idempotent full gstack runtime setup: Bun + upstream gstack build + sidecar links.
# Keeps vendored skill markdown in git; fetches bin/lib/browse at setup time.
set -euo pipefail

GSTACK_REPO_URL="${GSTACK_REPO_URL:-https://github.com/garrytan/gstack.git}"
GSTACK_CACHE="${GSTACK_CACHE_DIR:-${XDG_CACHE_HOME:-$HOME/.cache}/gstack-upstream}"
GSTACK_HOST="${GSTACK_HOST:-cursor}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

log() {
  printf 'setup-gstack-full: %s\n' "$*"
}

ensure_bun() {
  if command -v bun >/dev/null 2>&1; then
    log "bun already installed ($(bun --version))"
    return 0
  fi

  log "Installing Bun via official install script..."
  export BUN_INSTALL="${BUN_INSTALL:-$HOME/.bun}"
  curl -fsSL https://bun.sh/install | bash
  export PATH="$BUN_INSTALL/bin:$PATH"

  if ! command -v bun >/dev/null 2>&1; then
    echo "setup-gstack-full: bun install finished but bun is not on PATH" >&2
    exit 1
  fi
  log "bun installed ($(bun --version))"
}

sync_gstack_cache() {
  if [ -d "$GSTACK_CACHE/.git" ]; then
    log "Updating gstack cache at $GSTACK_CACHE"
    git -C "$GSTACK_CACHE" fetch --depth 1 origin main
    git -C "$GSTACK_CACHE" checkout -q main
    git -C "$GSTACK_CACHE" reset -q --hard origin/main
  else
    log "Cloning gstack into $GSTACK_CACHE"
    mkdir -p "$(dirname "$GSTACK_CACHE")"
    git clone --depth 1 "$GSTACK_REPO_URL" "$GSTACK_CACHE"
  fi
}

link_or_replace() {
  local src="$1"
  local dst="$2"

  if [ ! -e "$src" ]; then
    return 0
  fi

  mkdir -p "$(dirname "$dst")"
  if [ -e "$dst" ] || [ -L "$dst" ]; then
    rm -rf "$dst"
  fi
  ln -sf "$src" "$dst"
}

link_runtime_sidecar() {
  local cache_root="$1"
  local target_root="$2"

  mkdir -p "$target_root"

  for asset in bin lib; do
    if [ -d "$cache_root/$asset" ]; then
      link_or_replace "$cache_root/$asset" "$target_root/$asset"
    fi
  done

  if [ -d "$cache_root/browse/dist" ] || [ -d "$cache_root/browse/bin" ]; then
    mkdir -p "$target_root/browse"
    if [ -d "$cache_root/browse/dist" ]; then
      link_or_replace "$cache_root/browse/dist" "$target_root/browse/dist"
    fi
    if [ -d "$cache_root/browse/bin" ]; then
      link_or_replace "$cache_root/browse/bin" "$target_root/browse/bin"
    fi
  fi

  if [ -f "$cache_root/VERSION" ]; then
    link_or_replace "$cache_root/VERSION" "$target_root/VERSION"
  fi

  if [ -f "$cache_root/supabase/config.sh" ]; then
    mkdir -p "$target_root/supabase"
    link_or_replace "$cache_root/supabase/config.sh" "$target_root/supabase/config.sh"
  fi

  if [ -d "$cache_root/gstack-upgrade" ]; then
    mkdir -p "$target_root/gstack-upgrade"
    if [ -f "$cache_root/gstack-upgrade/SKILL.md" ]; then
      link_or_replace "$cache_root/gstack-upgrade/SKILL.md" "$target_root/gstack-upgrade/SKILL.md"
    fi
  fi
}

run_upstream_setup() {
  log "Running upstream ./setup --host $GSTACK_HOST in $GSTACK_CACHE"
  (
    cd "$GSTACK_CACHE"
    ./setup --host "$GSTACK_HOST"
  )
}

link_repo_and_global_sidecars() {
  local target

  for target in \
    "$REPO_ROOT/.claude/skills/gstack" \
    "$REPO_ROOT/.agents/skills/gstack"; do
    if [ -d "$target" ]; then
      log "Linking runtime sidecar into $target"
      link_runtime_sidecar "$GSTACK_CACHE" "$target"
    fi
  done

  mkdir -p "$HOME/.claude/skills/gstack"
  log "Linking runtime sidecar into $HOME/.claude/skills/gstack"
  link_runtime_sidecar "$GSTACK_CACHE" "$HOME/.claude/skills/gstack"
}

verify_runtime() {
  local browse_bin="$GSTACK_CACHE/browse/dist/browse"
  local config_bin="$GSTACK_CACHE/bin/gstack-config"

  if [ ! -x "$config_bin" ]; then
    echo "setup-gstack-full: expected executable missing: $config_bin" >&2
    exit 1
  fi

  if [ ! -f "$browse_bin" ]; then
    echo "setup-gstack-full: browse binary missing: $browse_bin" >&2
    exit 1
  fi

  log "gstack-config: OK"
  log "browse binary: $browse_bin"
}

main() {
  ensure_bun
  sync_gstack_cache
  run_upstream_setup
  link_repo_and_global_sidecars
  verify_runtime
  log "Full gstack runtime is ready (cache: $GSTACK_CACHE)"
}

main "$@"
