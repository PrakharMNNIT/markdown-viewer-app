# 🚀 Deployment Guide

## Markdown Preview EE — CI/CD & GitHub Pages

**Document Type:** DevOps & Deployment  
**Version:** 1.0  
**Created:** 2026-01-20  
**Status:** Ready for Implementation

---

## 📦 Build Configuration

### Vite Config

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/markdown-preview-ee/', // GitHub Pages subdirectory
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-markdown': ['marked', 'dompurify'],
          'vendor-mermaid': ['mermaid'],
          'vendor-katex': ['katex'],
          'vendor-prism': ['prismjs'],
        },
      },
    },
  },
});
```

---

## 🔄 GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: 'pages'
  cancel-in-progress: true

jobs:
  # Build job
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Run tests
        run: npm run test

      - name: Run linting
        run: npm run lint

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  # Deploy job (only on main)
  deploy:
    if: github.ref == 'refs/heads/main'
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 📋 Environment Configuration

### Production Environment

```env
# .env.production
VITE_APP_NAME=Markdown Preview EE
VITE_APP_VERSION=$npm_package_version
VITE_BASE_URL=/markdown-preview-ee/
```

### Development Environment

```env
# .env.development
VITE_APP_NAME=Markdown Preview EE (Dev)
VITE_BASE_URL=/
```

---

## 🔍 Quality Gates

```yaml
# Quality checks before deploy
jobs:
  quality:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      
      # Type checking
      - run: npm run typecheck
      
      # Linting
      - run: npm run lint
      
      # Unit tests with coverage
      - run: npm run test:coverage
      - name: Check coverage threshold
        run: |
          COVERAGE=$(cat coverage/coverage-summary.json | jq '.total.lines.pct')
          if (( $(echo "$COVERAGE < 80" | bc -l) )); then
            echo "Coverage $COVERAGE% is below 80%"
            exit 1
          fi
      
      # Bundle size check
      - run: npm run build
      - name: Check bundle size
        run: |
          SIZE=$(du -sk dist | cut -f1)
          if [ $SIZE -gt 500 ]; then
            echo "Bundle size ${SIZE}KB exceeds 500KB limit"
            exit 1
          fi
      
      # Lighthouse CI
      - name: Lighthouse CI
        uses: treosh/lighthouse-ci-action@v10
        with:
          configPath: ./lighthouserc.json
```

---

## 📊 Lighthouse CI Config

```json
// lighthouserc.json
{
  "ci": {
    "collect": {
      "staticDistDir": "./dist"
    },
    "assert": {
      "assertions": {
        "categories:performance": ["error", { "minScore": 0.9 }],
        "categories:accessibility": ["error", { "minScore": 0.95 }],
        "categories:best-practices": ["error", { "minScore": 0.95 }],
        "categories:seo": ["error", { "minScore": 0.9 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
```

---

## 🏷️ Versioning & Releases

### Semantic Versioning

```
MAJOR.MINOR.PATCH

MAJOR: Breaking changes
MINOR: New features (backward compatible)
PATCH: Bug fixes
```

### Release Workflow

```yaml
# .github/workflows/release.yml
name: Release

on:
  push:
    tags:
      - 'v*'

jobs:
  release:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      
      - name: Build
        run: |
          npm ci
          npm run build
      
      - name: Create Release
        uses: softprops/action-gh-release@v1
        with:
          files: |
            dist/**
          generate_release_notes: true
```

---

## 🌐 Deployment URLs

| Environment | URL |
|-------------|-----|
| Production | `https://username.github.io/markdown-preview-ee/` |
| Preview (PR) | `https://username.github.io/markdown-preview-ee/pr-{number}/` |

---

## ✅ Pre-Deploy Checklist

- [ ] All tests passing
- [ ] Lint errors resolved
- [ ] Bundle size within budget
- [ ] Lighthouse scores met
- [ ] Version bumped
- [ ] Changelog updated
- [ ] README updated

---

*Deployment Guide v1.0*  
*Created: 2026-01-20*