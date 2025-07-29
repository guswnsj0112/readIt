// readit/frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 3000, // <-- 프론트엔드 포트는 3000번입니다.
    strictPort: true,
    hmr: {
      clientPort: 3000,
      host: "readit-vnygo.run.goorm.io",
    },
    proxy: {
      "/api": {
        target: "http://localhost:5000", // <-- 백엔드 포트 5000과 일치합니다.
        changeOrigin: true,
      },
    },
    allowedHosts: ["readit-vnygo.run.goorm.io", "localhost", "127.0.0.1"],
    fs: {
      strict: false,
    },
    cors: true,
  },
});
