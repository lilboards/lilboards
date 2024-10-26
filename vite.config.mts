import react from '@vitejs/plugin-react-swc';
import { resolve } from 'path';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  plugins: [react(), commonjs()],
  resolve: {
    alias: {
      src: resolve(__dirname, 'src'),
      test: resolve(__dirname, 'test'),
    },
  },
});
