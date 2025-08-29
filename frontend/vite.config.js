import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(),
    tailwindcss(),
  ],
  server: {
    host: "0.0.0.0", // 서버는 컨테이너 내부에서 모든 인터페이스를 수신
    port: 3000,
    hmr: {
      protocol: "wss", // 보안 웹소켓(HTTPS) 사용
      host: "readit-aqvzs.run.goorm.io", // 브라우저가 접속할 공개 URL
      clientPort: 443 // 브라우저가 연결할 포트 (HTTPS 기본 포트)
    },
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
      },
    },
    allowedHosts: ["readit-aqvzs.run.goorm.io", "localhost", "127.0.0.1"],
    fs: {
      strict: false,
    },
    cors: true,
  },
});