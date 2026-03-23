// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        // Split vendor chunks for better caching
        manualChunks: {
          react: ["react", "react-dom"],
          router: ["react-router-dom"],
          motion: ["framer-motion"],
          ui: ["lucide-react", "react-hot-toast"],
        },
      },
    },
    // Enable brotli/gzip compression hints
    reportCompressedSize: true,
    chunkSizeWarningLimit: 800,
  },
  server: {
    proxy: {
      "/api": "http://localhost:3001",
    },
  },
});
