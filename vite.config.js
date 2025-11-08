import { defineConfig } from 'vite';

export default defineConfig({
  root: './',
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['marked', 'prismjs', 'mermaid']
        }
      }
    }
  },
  server: {
    port: 3000,
    open: true
  }
});
