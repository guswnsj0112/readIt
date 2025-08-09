// readit/frontend/vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "localhost", // <-- 로컬 환경에 맞게 변경
    port: 3000,
    // strictPort: true, // <-- 주석 처리하거나 제거
    hmr: {
      // clientPort: 3000, // <-- 주석 처리하거나 제거
      // host: "readit-krggx.run.goorm.io", // <-- 주석 처리하거나 제거
    },
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    // allowedHosts: ["readit-vnygo.run.goorm.io", "localhost", "127.0.0.1"], // <-- 주석 처리하거나 제거
    fs: {
      strict: false,
    },
    cors: true,
  },
});
