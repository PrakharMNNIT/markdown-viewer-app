import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  base: '/markdown-viewer-app/',
  build: {
    outDir: 'dist',
    // Note: marked, prismjs, and mermaid are loaded via CDN in index.html
    // No need for manualChunks as they are not npm dependencies
  },
  server: {
    port: 3000,
    open: true,
  },
});
