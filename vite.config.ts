import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, (process as any).cwd(), '');
  
  // Priority: Netlify/System Env -> .env file -> Hardcoded Fallback
  const apiKey = process.env.API_KEY || env.API_KEY || "AIzaSyCCJV06PLqQ4gC7MvIRvtPLBPxG6oBc8Nk";

  return {
    plugins: [
      react(),
      VitePWA({
        registerType: 'autoUpdate',
        manifest: {
          name: "Aneela's MakeOver",
          short_name: "Aneela's",
          description: "Luxury Salon Mobile Experience & Academy",
          start_url: ".",
          display: "standalone",
          orientation: "portrait",
          background_color: "#0A2419",
          theme_color: "#0A2419",
          icons: [
            {
              src: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=192&h=192&auto=format&fit=crop",
              sizes: "192x192",
              type: "image/png"
            },
            {
              src: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?q=80&w=512&h=512&auto=format&fit=crop",
              sizes: "512x512",
              type: "image/png"
            }
          ]
        }
      })
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
  }
})