import react from '@vitejs/plugin-react';
import { defineConfig } from 'electron-vite';
import { resolve } from 'path';

export default defineConfig({
  main: {
    build: {
      lib: {
        entry: "src/main/main.ts"
      }
    }
  },
  preload: {
    build: {
      lib: {
        entry: "src/main/preload.ts"
      }
    }
  },
  renderer: {
    plugins: [react()]
  }
});