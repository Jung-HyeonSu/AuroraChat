import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'window',
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
});