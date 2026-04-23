import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  logLevel: 'error', // מציג רק שגיאות קריטיות
  plugins: [
    react(), // השארנו רק את React, ללא התוסף של Base44
  ],
  resolve: {
    alias: {
      // הגדרה נכונה של קיצורי דרך לנתיבים בתוך Vite
      "@": path.resolve(__dirname, "./src"),
    },
  },
});