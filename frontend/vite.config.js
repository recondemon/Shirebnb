import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? './' : '/',
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === 'production',
    }),
  ],
  build: {
    outDir: 'dist',
    rollupOptions: {
      external: [
        '/dist/assets/index-0cfd6ba9.js',
        '/dist/assets/index-dbc314b5.css',
      ],
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
}));
