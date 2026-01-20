import { copyFileSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { defineConfig } from 'vite';
import prism from 'vite-plugin-prismjs';

export default defineConfig({
  root: './',
  base: '/markdown-viewer-app/',
  build: {
    outDir: 'dist',
  },
  server: {
    port: 3000,
    open: true,
  },
  plugins: [
    prism({
      languages: 'all', // Load ALL languages for future-proofing
      plugins: ['line-numbers', 'copy-to-clipboard'],
      theme: 'tomorrow',
      css: true,
    }),
    {
      name: 'copy-themes',
      closeBundle() {
        // Copy themes folder to dist after build
        const themesSource = join(process.cwd(), 'themes');
        const themesDest = join(process.cwd(), 'dist', 'themes');

        try {
          mkdirSync(themesDest, { recursive: true });
          const files = readdirSync(themesSource);
          files.forEach(file => {
            if (file.endsWith('.css')) {
              copyFileSync(join(themesSource, file), join(themesDest, file));
              console.log(`📋 Copied theme: ${file}`);
            }
          });
          console.log(
            `✅ All ${files.filter(f => f.endsWith('.css')).length} theme files copied to dist/themes/`,
          );
        } catch (error) {
          console.error('❌ Error copying themes:', error);
        }
      },
    },
  ],
});
