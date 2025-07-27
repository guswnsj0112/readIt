import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    hmr: {
      clientPort: 3000, // 또는 443 (아래 'HMR 클라이언트 포트' 설명 참고)
      host: 'readit-vnygo.run.goorm.io', // HMR 호스트도 정확한 도메인으로
    },
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    allowedHosts: [
      'readit-vnygo.run.goorm.io', // <<< 여기에 오류 메시지에 나온 정확한 호스트 이름!
      'localhost',
      '127.0.0.1',
      // 필요하다면 다른 도메인 추가
    ],
    fs: {
      strict: false,
    },
    cors: true,
  },
});