import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: 'jsx',
    include: /src\/.*\.js$/, // Force JSX parsing for .js files under src/
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://matrimony-backend-d7cq.onrender.com',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
