# Native Cursor / Claude / Codex plugins

Some capabilities ship as **marketplace plugins** rather than vendored skill trees in git. Cloud Agents cannot run `/add-plugin` — install these on your local Cursor (or equivalent) IDE.

## Compound Engineering

**Purpose:** Spec-driven product workflow (`/ce-*` commands), compound learning, structured reviews.

**Cannot automate in Cloud Agent:** `/add-plugin compound-engineering` requires the Cursor desktop marketplace.

### Cursor (local)

1. Open **Cursor Settings → Plugins** (or command palette: `Add Plugin`).
2. Search **Compound Engineering** and enable it.
3. Reload the window if prompted.
4. Verify: slash commands such as `/ce-compound`, `/ce-review` appear in chat.

### Claude Code (local)

1. Install from the Anthropic plugin marketplace if listed, or clone [every-to/compound-engineering-plugin](https://github.com/every-to/compound-engineering-plugin) per upstream README.
2. Place skills under `~/.claude/skills/` or use the plugin's documented install path.
3. Run the plugin's setup skill if provided.

### Codex CLI (local)

1. Follow Compound Engineering upstream docs for Codex/OpenAI agent integration.
2. Typically: copy skill pack to the Codex skills directory documented in that repo.

**Workflow note:** Use Compound Engineering **or** gstack spec **or** Spec Kit for a given task — not all three (see [workflow-pipeline.md](./workflow-pipeline.md)).

## pstack

**Purpose:** Principles, architecture panels, swarm/arena workflows.

### Cursor (local)

1. `/add-plugin pstack` (or enable **pstack** in Settings → Plugins).
2. Run `/setup-pstack` once to write `~/.cursor/rules/pstack-models.mdc`.
3. This repo already vendors pstack skills under `.claude/skills/pstack/`; the plugin adds Task-tool integration and slash routing.

### Claude Code / Codex

Use vendored `.claude/skills/pstack/` — no separate plugin required for markdown SOPs. Model routing overrides are Cursor-specific (`pstack-models.mdc`).

## superpowers

**Purpose:** Plan-before-code, TDD, debugging, code review discipline.

### Cursor (local)

1. `/add-plugin superpowers`
2. Skills are also vendored at `.claude/skills/superpowers/` for discovery without the plugin.

### Claude Code

Install via `npx skills add obra/superpowers` or use the vendored copy in this repo.

## CodeRabbit / Browser Use / Mobbin / shadcn

These are **MCP-backed Cursor plugins**, enabled per workspace or user in Cursor Cloud/local settings. They are listed in root `AGENTS.md` under companion plugins. No git vendoring — configure credentials and toggles in the IDE.

## Verification checklist (local)

After enabling plugins locally:

```bash
# Global discovery skill
npx skills@latest list -g | grep find-skills

# pstack models rule exists
test -f ~/.cursor/rules/pstack-models.mdc && head ~/.cursor/rules/pstack-models.mdc

# Project verification skill
test -f .claude/skills/verify-markdown-viewer/SKILL.md && echo OK
```
