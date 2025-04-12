import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/blakk-world.github.io/',  // Add this line for GitHub Pages
  build: {
    outDir: 'dist',
    sourcemap: true
  }
})
