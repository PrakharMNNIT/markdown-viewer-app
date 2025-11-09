import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  base: '/markdown-viewer-app/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['marked', 'prismjs', 'mermaid'],
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
});
