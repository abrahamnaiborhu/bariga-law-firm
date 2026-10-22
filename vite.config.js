import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      input: {
        home: resolve(import.meta.dirname, 'index.html'),
        about: resolve(import.meta.dirname, 'about-us/index.html'),
        practice: resolve(import.meta.dirname, 'practice-areas/index.html'),
        strategic: resolve(import.meta.dirname, 'lain-lain/index.html'),
        consultation: resolve(import.meta.dirname, 'konsultasi/index.html'),
      },
    },
  },
});
