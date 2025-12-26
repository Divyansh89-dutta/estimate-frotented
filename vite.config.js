import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'  // Assuming React from your path
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
