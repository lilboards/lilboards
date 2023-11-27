import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import commonjs from 'vite-plugin-commonjs';

export default defineConfig({
  plugins: [react(), commonjs()],
});
