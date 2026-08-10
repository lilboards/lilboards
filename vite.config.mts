import { resolve } from 'node:path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  plugins: [
    react(),
    // vite-plugin-commonjs is needed because firebaseui's CJS build uses
    // `require('dialog-polyfill')`, which Vite doesn't transform by default
    commonjs(),
  ],
  resolve: {
    alias: {
      src: resolve(import.meta.dirname, 'src'),
      test: resolve(import.meta.dirname, 'test'),
    },
  },
  server: {
    watch: {
      ignored: ['**/coverage/**', '**/dist/**'],
    },
  },
});
