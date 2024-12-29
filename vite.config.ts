import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist',
    sourcemap: true,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['react-draggable', 'react-resizable', 'react-webcam']
        }
      }
    }
  },
  define: {
    'import.meta.env.VITE_BUILD_TIME': JSON.stringify(new Date().toISOString())
  },
  server: {
    port: 5173,
    host: true
  }
});