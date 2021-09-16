import dotenv from 'dotenv';
dotenv.config();
import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';
const { PORT = 3001 } = process.env;

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  publicDir: 'src/assets/public',
  build: {
    outDir: 'dist/app',
  },
  server: {
    proxy: {
      '/api': {
        target: `http://localhost:${PORT}`,
        changeOrigin: true,
      },
    },
  },
});
