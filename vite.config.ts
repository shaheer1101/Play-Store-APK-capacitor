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
        includeAssets: ['favicon.png', 'apple-touch-icon.png', 'icon.svg', 'pwa-192x192.png', 'pwa-512x512.png', 'pwa-maskable-512x512.png'],
        manifest: {
          id: '/',
          name: "Aneela's MakeOver",
          short_name: "Aneela's",
          description: "Luxury Salon Mobile Experience & Academy. Perfection in Every Stroke.",
          start_url: "/",
          scope: "/",
          display: "standalone",
          orientation: "portrait",
          background_color: "#0A2419",
          theme_color: "#0A2419",
          icons: [
            {
              src: "/pwa-192x192.png",
              sizes: "192x192",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "/pwa-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "any"
            },
            {
              src: "/pwa-maskable-512x512.png",
              sizes: "512x512",
              type: "image/png",
              purpose: "maskable"
            }
          ]
        },
        devOptions: {
          enabled: true,
          type: 'module',
        }
      })
    ],
    define: {
      'process.env.API_KEY': JSON.stringify(apiKey),
    },
  }
})