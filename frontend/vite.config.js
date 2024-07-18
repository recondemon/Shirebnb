import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';

export default defineConfig(({ mode }) => ({
  base: mode === 'production' ? '/your-base-path/' : '/', // Adjust '/your-base-path/' as needed
  plugins: [
    react(),
    eslint({
      lintOnStart: true,
      failOnError: mode === 'production'
    })
  ],
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
