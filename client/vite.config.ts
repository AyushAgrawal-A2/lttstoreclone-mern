import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import react from '@vitejs/plugin-react-swc';

// https://vitejs.dev/config/
export default defineConfig({
  server: { https: true },
  plugins: [react(), basicSsl()],
  define: {
    'process.env': `"${process.env}"`,
  },
});
