import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react'; // 또는 사용 중인 플러그인

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // 다른 네트워크 장치에서 접근을 허용하는 데 유용할 수 있습니다.
    port: 3000, // 또는 사용 중인 포트
    strictPort: true,
    hmr: {
      clientPort: 3000, // 또는 사용 중인 포트
    },
    // 여기에 allowedHosts 속성을 추가합니다.
    allowedHosts: [
      'readit-cwgjw.run.goorm.io',
      // 필요한 경우 다른 호스트를 추가할 수 있습니다 (예: 'localhost', '127.0.0.1')
    ],
  },
});