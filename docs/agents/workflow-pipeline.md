# Agent workflow pipeline

This repo uses a layered skill stack. Do not activate every methodology on the same task.

## Pipeline

```
find-skills          → discover capabilities on demand
        ↓
PRODUCT / SPEC       → gstack OR Spec Kit OR Compound Engineering (pick one)
        ↓
DEEP INTERROGATION   → Matt Pocock + shadcn/improve
        ↓
IMPLEMENTATION       → pstack + Superpowers
        ↓
TEST / REVIEW        → Superpowers + Matt Pocock + Trail of Bits (on demand)
        ↓
SECURITY GATE        → trailofbits/skills (differential-review, semgrep, etc.)
        ↓
REAL BROWSER QA      → agent-browser (or browse / Browser Use MCP)
        ↓
SHIP / DEPLOY        → gstack ship skills + GitHub Actions
        ↓
RETRO / COMPOUND     → Compound Engineering /ce-compound (optional)
```

## Core 10 (always available in `.claude/skills/`)

| Layer | Pack | Invoke |
| --- | --- | --- |
| Discovery | `find-skills` | `/find-skills` or skill search |
| Execution OS | `pstack` | `/add-plugin pstack` in Cursor; principles, arena, swarm |
| Discipline | `superpowers` | brainstorming → writing-plans → TDD → review |
| Engineering | `mattpocock` | triage, to-spec, code-review, TDD |
| Company workflow | `gstack` | CEO/design/QA/ship (runtime via `scripts/setup-gstack-full.sh`) |
| Audit | `shadcn/improve` | `/improve` (read-only) |
| Security | `trailofbits/*` | on demand: differential-review, semgrep, second-opinion |
| Browser QA | `agent-browser` | `npx agent-browser` + skill |
| Web craft | `vercel-*` | react-best-practices, web-design-guidelines |
| Learning | Compound Engineering | `/add-plugin compound-engineering` (Cursor native) |

## Stack-specific cartridges (install per project)

Install with `npx skills add <owner/repo> --skill <name> -y` when the stack applies:

- **Supabase** — `supabase/agent-skills`
- **Cloudflare** — `cloudflare/skills`
- **AWS** — `aws/agent-toolkit-for-aws/skills`
- **Microsoft/Azure** — `microsoft/skills` (selective; avoid `--skill '*'`)

## Native plugins (not vendored in git)

See [`native-plugins.md`](./native-plugins.md) for desktop install steps (`/add-plugin`).

## Spec Kit (large / greenfield features)

See [`spec-kit.md`](./spec-kit.md). CLI installs via `uv tool`; repo init requires `--force` on non-empty trees.

Commands (after init): `/speckit.constitution`, `/speckit.specify`, `/speckit.plan`, `/speckit.implement`.

## Context hygiene

- Do **not** load all ~693 vendored skills into every session.
- Use **`find-skills`** globally (`npx skills@latest list -g`) or project-local to pull capabilities on demand.
- **`microsoft/skills`**: selective install only — never `--skill '*'`.
- **Stack cartridges** (Supabase, Cloudflare, AWS): install when that stack applies to the project.
- **One spec/planning methodology per task** (gstack **or** Spec Kit **or** CE).
- **Browser proof**: use [`verify-markdown-viewer`](../../.claude/skills/verify-markdown-viewer/SKILL.md) for the Vite UI.

## Global vs project skills

| Scope | Example | Purpose |
| --- | --- | --- |
| Global (`-g`) | `find-skills` | Discovery in every repo |
| Project | `bash scripts/install-skill-arsenal.sh` | Flat library in `.claude/skills/` |
