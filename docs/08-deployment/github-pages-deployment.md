# GitHub Pages Deployment Guide

## Overview

This project uses **Vite** as a build tool and **GitHub Actions** for automated deployment to GitHub Pages. The deployment process builds the project and serves it from the `dist` folder.

## How It Works

### 1. Build Process

- **Vite** compiles all source files (JS modules, CSS, HTML)
- Output goes to the `dist/` directory
- The `base` path is set to `/markdown-viewer-app/` in `vite.config.js`

### 2. GitHub Actions Workflow

Located at `.github/workflows/deploy.yml`, this workflow:

- Triggers on every push to the `main` branch
- Can also be manually triggered via GitHub UI
- Installs dependencies with `npm ci`
- Builds the project with `npm run build`
- Deploys the `dist` folder to GitHub Pages

### 3. GitHub Pages Settings

The repository must be configured to serve from GitHub Actions:

1. Go to **Settings** → **Pages**
2. Under "Build and deployment":
   - Source: **GitHub Actions** (not "Deploy from a branch")
3. The site will be available at: `https://PrakharMNNIT.github.io/markdown-viewer-app/`

## Initial Setup

### Step 1: Enable GitHub Pages

```bash
# Repository Settings > Pages
# Source: GitHub Actions
```

### Step 2: Verify Configuration

Check that `vite.config.js` has the correct base path:

```javascript
export default defineConfig({
  base: '/markdown-viewer-app/', // Must match repository name
  // ... other config
});
```

### Step 3: Trigger Deployment

```bash
# Push to main branch
git add .
git commit -m "🚀 deploy: configure GitHub Pages deployment"
git push origin main
```

## Deployment Process

### Automatic Deployment

Every push to `main` automatically triggers deployment:

1. GitHub Actions runs the workflow
2. Project is built with Vite
3. `dist` folder is deployed to GitHub Pages
4. Site is live within 1-2 minutes

### Manual Deployment

You can also trigger deployment manually:

1. Go to **Actions** tab on GitHub
2. Select "Deploy to GitHub Pages" workflow
3. Click "Run workflow"
4. Select the `main` branch
5. Click "Run workflow"

## Monitoring Deployment

### Check Workflow Status

1. Go to **Actions** tab on GitHub
2. Click on the latest workflow run
3. View logs for each step:
   - ✅ Checkout
   - ✅ Setup Node
   - ✅ Install dependencies
   - ✅ Build
   - ✅ Upload artifact
   - ✅ Deploy to GitHub Pages

### Verify Deployment

Visit: `https://PrakharMNNIT.github.io/markdown-viewer-app/`

## Local Testing

### Test Production Build Locally

```bash
# Build the project
npm run build

# Preview the built version
npm run preview
```

This serves the `dist` folder locally at `http://localhost:4173` (or similar port).

## Troubleshooting

### Issue: 404 Errors on GitHub Pages

**Solution**: Verify the `base` path in `vite.config.js` matches your repository name:

```javascript
base: '/markdown-viewer-app/', // Must match repo name exactly
```

### Issue: Assets Not Loading (404s)

**Solution**: Check that all asset paths are relative and Vite is properly bundling them. The `base` path should fix this.

### Issue: Workflow Fails

**Solution**: Check the Actions logs:

1. Go to Actions tab
2. Click the failed workflow
3. Expand failed step to see error
4. Common issues:
   - Missing dependencies in `package.json`
   - Build errors (fix in local environment first)
   - Permissions issues (check repository settings)

### Issue: Old Version Showing

**Solution**:

1. Hard refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
2. Clear browser cache
3. Check if workflow completed successfully
4. Wait 1-2 minutes after deployment

## Configuration Files

### `.github/workflows/deploy.yml`

- Defines the CI/CD pipeline
- Runs on push to `main`
- Uses Node.js 20
- Caches npm dependencies for faster builds

### `vite.config.js`

```javascript
export default defineConfig({
  root: './',
  base: '/markdown-viewer-app/', // Critical for GitHub Pages
  build: {
    outDir: 'dist',
    // ... optimization settings
  },
});
```

### `package.json` Scripts

```json
{
  "scripts": {
    "dev": "vite", // Local development
    "build": "vite build", // Production build
    "preview": "vite preview" // Test production build
  }
}
```

## Best Practices

1. **Test Locally First**: Always run `npm run build` and `npm run preview` before pushing
2. **Check Actions Tab**: Monitor deployment progress
3. **Use Conventional Commits**: For clear deployment history
4. **Branch Protection**: Consider protecting `main` branch to require PR reviews
5. **Cache Busting**: Vite automatically handles this with hashed filenames

## Development Workflow

```bash
# 1. Make changes locally
npm run dev

# 2. Test production build
npm run build
npm run preview

# 3. Commit and push
git add .
git commit -m "feat: add new feature"
git push origin main

# 4. GitHub Actions automatically deploys
# 5. Visit site after 1-2 minutes
```

## Security Notes

- Never commit `.env` files with secrets
- The workflow uses GitHub's built-in `GITHUB_TOKEN`
- No additional secrets needed for basic deployment
- All builds run in isolated GitHub-hosted runners

## Additional Resources

- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Vite Configuration Reference](https://vitejs.dev/config/)

## Summary

✅ **Automatic deployment** on every push to `main`
✅ **Vite** builds optimized production bundle
✅ **GitHub Actions** handles CI/CD pipeline
✅ **GitHub Pages** serves the static site
✅ **No manual steps** required after initial setup

Your site will be live at: `https://PrakharMNNIT.github.io/markdown-viewer-app/`
