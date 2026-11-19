import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages project site lives under /<repo>/. Override with VITE_BASE_PATH
// (e.g. "/" when the site moves to the customer's own domain).
const base = process.env.VITE_BASE_PATH || '/tmi-jarkko-karilahti-demo/'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base,
  build: {
    target: 'es2022',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) return 'gsap'
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) return 'react'
        },
      },
    },
  },
})
