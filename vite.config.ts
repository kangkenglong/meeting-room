import { defineConfig } from 'vite';
import { resolve } from 'path';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: '@module',
        replacement: resolve(__dirname, 'src/module'),
      },
      {
        find: '@store',
        replacement: resolve(__dirname, 'src/store'),
      },
    ],
  },
})
