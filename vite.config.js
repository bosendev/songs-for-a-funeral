import { defineConfig } from 'vite';
import restart from 'vite-plugin-restart';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/dist/' : '/',
  build: {
    outDir: './web/dist',
    emptyOutDir: true,
    manifest: true,
    sourcemap: true,
    rollupOptions: {
      input: {
        main: './src/js/main.js',
      },
    },
  },
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    cors: true,
    hmr: {
      host: 'localhost',
      protocol: 'ws',
    },
  },
  plugins: [
    restart({
      reload: ['templates/**/*'],
    }),
  ],
  css: {
    devSourcemap: true,
  },
}));