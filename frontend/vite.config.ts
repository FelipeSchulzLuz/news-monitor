import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
  },
  server: {
    host: '192.168.1.12',
    proxy: {
      '/search':  'http://localhost:3001',
      '/notices': 'http://localhost:3001',
    },
  },
});
