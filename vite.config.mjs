import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { existsSync } from 'node:fs';

// Share variables.env with the API; Vite exposes only its VITE_* entries to the client.
if (existsSync('variables.env')) process.loadEnvFile('variables.env');

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'http://localhost:8000',
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // The stylesheets still use @import and global color functions.
        // Migrate with `npx sass-migrator module` before Dart Sass 3.
        silenceDeprecations: ['import', 'global-builtin', 'color-functions', 'slash-div'],
      },
    },
  },
  build: {
    outDir: 'build',
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
