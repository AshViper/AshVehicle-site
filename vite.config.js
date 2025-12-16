import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  // GitHub Pages base path
  base: '/AshVehicle-site/',
  plugins: [
    svelte(),
    tailwindcss()
  ],
  resolve: {
    alias: {
      '$lib': '/src/lib',
      '$assets': '/src/assets'
    }
  },
  build: {
    outDir: 'dist',
    rollupOptions: {
      output: {
        manualChunks: {
          'three': ['three'],
          'vendor': ['svelte', 'lucide-svelte']
        }
      }
    }
  },
  server: {
    allowedHosts: true
  }
});
