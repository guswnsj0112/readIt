import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    host: "0.0.0.0",
    port: 3000,
    hmr: {
      protocol: "wss",
      host: "readit-cbmoe.run.goorm.io",
      clientPort: 443
    },
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    allowedHosts: [
     "*.goorm.io",
      "localhost",
      "127.0.0.1"
    ],
    fs: {
      strict: false,
    },
    cors: true,
  },
});