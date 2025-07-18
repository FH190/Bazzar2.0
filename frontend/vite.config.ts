import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/

export default {
  // ...
  server: {
    proxy: {
      '/api-proxy': {
        target: 'https://sky.coflnet.com',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api-proxy/, ''),
      }
    }
  }
}