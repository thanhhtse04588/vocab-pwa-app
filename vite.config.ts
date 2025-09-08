import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import { VitePWA } from 'vite-plugin-pwa'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg', 
        'robots.txt', 
        'apple-touch-icon.png',
        'apple-touch-icon-152x152.png',
        'apple-touch-icon-167x167.png',
        'apple-touch-icon-180x180.png',
        'apple-splash-*.png'
      ],
      manifest: {
        name: 'Vocab PWA App',
        short_name: 'VocabPWA',
        description: 'Progressive Web App for vocabulary learning with React + Vite + TS',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        scope: '/',
        lang: 'en',
        categories: ['education', 'productivity'],
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any'
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable'
          },
          {
            src: '/apple-touch-icon.png',
            sizes: '180x180',
            type: 'image/png',
            purpose: 'any'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
            }
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(process.cwd(), './src'),
      '@/components': path.resolve(process.cwd(), './src/components'),
      '@/pages': path.resolve(process.cwd(), './src/pages'),
      '@/store': path.resolve(process.cwd(), './src/store'),
      '@/types': path.resolve(process.cwd(), './src/types'),
      '@/utils': path.resolve(process.cwd(), './src/utils'),
      '@/hooks': path.resolve(process.cwd(), './src/hooks'),
      '@/services': path.resolve(process.cwd(), './src/services'),
    },
  },
})
