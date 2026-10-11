import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [],
      manifest: {
        name: 'Panda Mabati',
        short_name: 'Panda Mabati',
        description: 'Roofing products, material estimates and quote requests.',
        theme_color: '#12352b',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
      },
    }),
  ],
  build: {
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    clearMocks: true,
  },
})
