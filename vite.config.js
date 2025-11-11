import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: './public',
    emptyOutDir: true,
  },
  plugins: [react()],
  server: {
    proxy: {
      '/date': 'http://localhost:3000',
      '/posts': 'http://localhost:3000',
      '/createUser': 'http://localhost:3000',
      '/login': 'http://localhost:3000',
      '/protected-route': 'http://localhost:3000',
      '/api/feed': 'http://localhost:3000',
      '/updateUserInfo': 'http://localhost:3000',
      '/getUserInfo': 'http://localhost:3000',
      '/getAllUsers': 'http://localhost:3000',
      '/changePass': 'http://localhost:3000',
      '/changeMail': 'http://localhost:3000',
    },
  },
});
