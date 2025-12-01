/* eslint-disable n/no-unpublished-import */
/* eslint-disable n/no-unsupported-features/es-syntax */
import {defineConfig} from 'vite';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig({
  plugins: [tailwindcss()],
});
