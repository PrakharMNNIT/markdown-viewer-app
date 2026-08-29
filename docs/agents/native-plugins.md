# Native Cursor plugins (desktop only)

Cloud Agents cannot install Cursor marketplace plugins. Enable these in **Cursor Settings → Plugins** on your desktop machine.

## compound-engineering

Compound Engineering adds spec-driven workflows, compound learning, and review loops.

```text
/add-plugin compound-engineering
```

After install, use CE skills for large features (`/ce-spec`, `/ce-compound`) as an alternative to gstack or Spec Kit. Pick **one** spec methodology per task — see [`workflow-pipeline.md`](./workflow-pipeline.md).

## pstack

pstack provides principles, arena, swarm, and verification workflows.

```text
/add-plugin pstack
/setup-pstack
```

`/setup-pstack` writes `~/.cursor/rules/pstack-models.mdc` with verified model slugs for your account. Re-run when your model entitlements change.

## superpowers

Superpowers enforces plan-before-code, TDD, debugging, and code-review discipline.

```text
/add-plugin superpowers
```

This repo also **vendors** the superpowers skill markdown under `.claude/skills/superpowers/` for cross-runtime discovery. The native plugin adds MCP integrations and slash commands in Cursor desktop.

## Pairing with this repo

| Plugin | Vendored in git? | When to use native plugin |
| --- | --- | --- |
| pstack | Yes (`.claude/skills/pstack/`) | Arena/swarm UI, `/setup-pstack` model config |
| superpowers | Yes (`.claude/skills/superpowers/`) | Slash commands, brainstorming server |
| compound-engineering | No | Large greenfield specs, compound retros |

## Cloud Agent limitations

- Plugin marketplace installs require Cursor desktop UI.
- `~/.cursor/rules/pstack-models.mdc` is user-local; Cloud Agents write it in the VM but it does not sync to your desktop automatically.
- Copy model config from the agent session or re-run `/setup-pstack` locally after merging skill changes.
