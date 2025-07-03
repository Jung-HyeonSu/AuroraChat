import { defineConfig } from 'vite';

export default defineConfig({
  define: {
    global: 'window',
  },
  server: {
    host: true,
    proxy: {
      '/api': 'http://172.30.1.59:8080',
    },
  },
});