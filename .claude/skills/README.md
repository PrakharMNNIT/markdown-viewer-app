# Agent Skills

This directory holds reusable **agent skills** (SOP-style `SKILL.md` files) that coding
agents (Claude Code, Cursor, Codex, and other harnesses) can discover and invoke.

The canonical skill tree lives under `.claude/skills/`. Agent-agnostic harnesses
(Cursor, Codex, Gemini, etc.) discover the same content via a relative symlink:

- `.claude/skills/` — canonical tree (Claude Code / Anthropic-style discovery)
- `.agents/skills` → `../.claude/skills` — symlink for cross-runtime discovery

Edit skills only under `.claude/skills/`; changes are visible through both paths.

Each skill is a directory containing a `SKILL.md` with YAML frontmatter (`name`,
`description`, optional `triggers`/`allowed-tools`). Supporting `references/`,
`sections/`, and templates live alongside it.

## Installed skill packs

| Pack | Source | License | Install | Skills |
| --- | --- | --- | --- | --- |
| `superpowers/` | [obra/superpowers](https://github.com/obra/superpowers) | MIT (Jesse Vincent) | full | 14 |
| `mattpocock/` | [mattpocock/skills](https://github.com/mattpocock/skills) | MIT (Matt Pocock) | full | 37 |
| `pstack/` | [cursor/plugins · pstack](https://github.com/cursor/plugins/tree/main/pstack) | MIT (Lauren Tan) | full | 45 |
| `gstack/` | [garrytan/gstack](https://github.com/garrytan/gstack) | MIT (Garry Tan) | slimmed | 54 |

### gstack is a slimmed install

Only the skill **markdown/templates** (the SOP content) are vendored here. The Bun
runtime that powers gstack's executable tooling — `lib/`, `bin/`, `scripts/`,
`browse/` (Chromium automation), `extension/`, `hosts/`, and tests — is **not**
included in git (~26MB). Fetch the runtime at setup time instead.

**Recommended (repo script — idempotent, Cloud Agent friendly):**

```bash
bash scripts/setup-gstack-full.sh
```

The script installs [Bun](https://bun.sh) if missing, clones/updates upstream
gstack into a cache directory (`$XDG_CACHE_HOME/gstack-upstream` by default),
runs `./setup --host cursor`, and symlinks `bin/`, `lib/`, and `browse/` into:

- `.claude/skills/gstack/` (and via symlink, `.agents/skills/gstack/`)
- `~/.claude/skills/gstack/` (global binary paths referenced by skill preambles)

Override the cache location with `GSTACK_CACHE_DIR`, the upstream ref with
`GSTACK_REF` (default `main`), or the host with `GSTACK_HOST` (e.g. `codex`, `claude`).

Cloud Agents: this repo's `.cursor/environment.json` runs the script during
`install` after `npm ci`.

**Manual upstream install** (alternative):

```bash
git clone --depth 1 https://github.com/garrytan/gstack.git ~/.claude/skills/gstack \
  && cd ~/.claude/skills/gstack && ./setup --host cursor
```

`superpowers`, `mattpocock`, and `pstack` are full skill trees (Markdown SOPs with no
mandatory runtime), so they work as-is.

## Recommended for this project (Markdown Viewer Pro)

This is a Vite + vanilla-JS frontend (marked / DOMPurify / Prism / Mermaid / KaTeX /
html2pdf) with Vitest, ESLint, Prettier, and GitHub Pages deploy. The highest-value
skills for this codebase:

**Plan & design**
- `superpowers/brainstorming`, `superpowers/writing-plans`
- `gstack/office-hours`, `gstack/plan-eng-review`
- `mattpocock/engineering/to-spec`, `mattpocock/engineering/to-tickets`
- `pstack/architect`

**Build & verify**
- `superpowers/test-driven-development`, `mattpocock/engineering/tdd` — Vitest is already set up
- `superpowers/systematic-debugging`, `mattpocock/engineering/diagnosing-bugs`
- `superpowers/verification-before-completion`, `pstack/principle-prove-it-works`

**Review & security** (this app renders untrusted Markdown → XSS surface via DOMPurify)
- `gstack/cso` — OWASP/STRIDE security review
- `gstack/review`, `mattpocock/engineering/code-review`, `pstack/unslop`

**Frontend QA & release**
- `gstack/qa`, `gstack/design-review` — browser-based UI testing
- `gstack/make-pdf` — relevant to the app's html2pdf export feature
- `gstack/ship`, `gstack/land-and-deploy` — GitHub Pages release flow

### Companion plugins available in this Cursor environment

These MCP/skill plugins are already enabled for the workspace and pair well here:

- **CodeRabbit** — automated code review (`code-review` skill / code-reviewer agent)
- **Browser Use** — real-browser QA/automation for the rendered app
- **Mobbin** — production UI/UX design references
- **shadcn** — component registry (if the UI moves to a component framework)
- **Superdesign** — design/redesign canvas for UI work

Enable additional MCP servers or Claude/Cursor plugins from the marketplace as needed;
those require per-user configuration (and any secrets) and are not vendored here.

## Provenance

All packs are MIT-licensed; each pack keeps its upstream `LICENSE`. Sources were
vendored from a shallow clone of each upstream repository. To refresh a pack, re-copy
from upstream (see each row above) and keep this table's install/notes in sync.
