# GitHub Spec Kit

[Spec Kit](https://github.com/github/spec-kit) provides spec-driven development commands for large or greenfield features. Use it as **one** planning methodology — not alongside gstack CEO flow or Compound Engineering on the same task.

## Install (local / Cloud Agent)

```bash
# Install uv (if missing)
curl -LsSf https://astral.sh/uv/install.sh | sh

# Install specify CLI
uv tool install specify-cli --from git+https://github.com/github/spec-kit.git

# Initialize in repo (requires empty dir OR --force on existing repos)
specify init --here --integration cursor-agent --force
```

## Cloud Agent result

In this VM, `uv tool install specify-cli` and `specify init --here --integration cursor-agent --force` **succeeded**.

Generated artifacts (committed on branch `prax/dev-skills-workflow-setup-ab5b`):

- `.claude/skills/speckit-*` — slash-command skills (`/speckit-constitution`, `/speckit-specify`, etc.)
- `.specify/` — templates, scripts, constitution scaffold

Review template diffs before merging to `main`; `--force` can overwrite overlapping paths.

## Commands (after init)

| Command | Purpose |
| --- | --- |
| `/speckit.constitution` | Project principles and constraints |
| `/speckit.specify` | Feature specification |
| `/speckit.plan` | Implementation plan |
| `/speckit.implement` | Execute plan |

## When to use Spec Kit vs gstack vs CE

| Methodology | Best for |
| --- | --- |
| **gstack** | CEO/design/QA/ship loops, browser QA, existing team workflow |
| **Spec Kit** | GitHub-native spec → plan → implement on greenfield modules |
| **Compound Engineering** | Compound learning, `/ce-compound` retros |

See [`workflow-pipeline.md`](./workflow-pipeline.md) for the full layered pipeline.
