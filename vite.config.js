import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      
    },
  },
  plugins: [react(),
    tailwindcss(),
    // require('@tailwindcss/typography'),
  ],
  server: {
    host: '0.0.0.0', // allows access from your phone
    port: 5175,
  },
  base: '/',

})
