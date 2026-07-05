import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  server: {
    proxy: {
      /**
       * Forward every /api/* request from the Vite dev server
       * to the Express backend running on port 5000.
       *
       * This avoids CORS issues during local development.
       * In production, configure your reverse proxy (Nginx / Caddy / etc.)
       * to do the same.
       */
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})