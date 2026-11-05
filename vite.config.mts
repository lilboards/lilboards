import { resolve } from 'node:path';

import react from '@vitejs/plugin-react-swc';
import commonjs from 'vite-plugin-commonjs';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'react',
              test: /node_modules\/(react|react-dom)\//,
            },
          ],
        },
      },
    },
  },

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
      ignored: ['**/coverage/**'],
    },
  },

  test: {
    coverage: {
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/types/**', '**/*.test.*'],
      thresholds: {
        100: true,
      },
    },

    projects: [
      {
        test: {
          name: 'app',
          environment: 'jsdom',
          include: ['src/**/*.test.{ts,tsx}', 'test/**/*.test.{ts,tsx}'],
          exclude: ['test/rules/**'],
          setupFiles: ['./test/setupFiles.ts'],
        },
      },

      {
        test: {
          name: 'rules',
          globals: true,
          include: ['test/rules/**/*.test.ts'],
        },
      },
    ],
  },
});
