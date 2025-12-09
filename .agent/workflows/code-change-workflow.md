---
description: Standard process for making code changes with AI review validation
---

# Code Change Process

1. **Make Code Changes**: Apply fixes or new features.
2. **Stage Changes**: `git add .`
3. **AI Validation**: `npx ai-review quick`
4. **Self/User Review**: Read `AI_REVIEW.md` and verify changes.
5. **Fix Issues**: If review finds issues, repeat steps 1-4.
6. **Commit**: Only commit after a passing review.
   `git commit -m "feat: description"`
