import { resolve } from 'node:path';

import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react()],
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
