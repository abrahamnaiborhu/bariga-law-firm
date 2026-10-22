import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';
import { site } from './config/site.mjs';

export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  base: site.base,
  define: { 'import.meta.env.SITE_BUILD_YEAR': JSON.stringify(new Date().getFullYear()) },
  build: {
    rolldownOptions: isSsrBuild ? undefined : {
      input: Object.fromEntries(['', 'about-us', 'practice-areas', 'lain-lain', 'konsultasi', '404.html'].map(path => [
        path || 'home', resolve(import.meta.dirname, path === '404.html' ? path : `${path ? `${path}/` : ''}index.html`),
      ])),
    },
  },
}));
