import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Use automatic JSX runtime for smaller output
      jsxRuntime: 'automatic',
    }),
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  },
  build: {
    // Target modern browsers for smaller output
    target: 'es2020',
    // Enable CSS code splitting
    cssCodeSplit: true,
    // Generate source maps only in dev
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          // Core React - loaded on every page
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          // UI primitives - loaded on every page  
          'ui-vendor': [
            '@radix-ui/react-dialog',
            '@radix-ui/react-toast',
            '@radix-ui/react-separator',
            '@radix-ui/react-slot',
            '@radix-ui/react-tooltip',
            'class-variance-authority',
            'clsx',
            'tailwind-merge',
          ],
          // Heavy libs - only loaded when needed
          'markdown': ['react-markdown', 'remark-gfm'],
          'qrcode': ['qrcode.react'],
          // Crypto utils
          'crypto': ['./src/utils/crypto.js'],
        }
      }
    },
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
    },
    chunkSizeWarningLimit: 1000,
    // Inline small assets
    assetsInlineLimit: 4096,
  }
})
