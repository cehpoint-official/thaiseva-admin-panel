import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { visualizer } from "rollup-plugin-visualizer";

export default defineConfig({
  plugins: [
    react(),
    visualizer({
      open: true, // Automatically open the visualizer report in the browser
      filename: "stats.html", // Output file for the visualizer report
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // Example of splitting external libraries into separate chunks
          "react-vendor": ["react", "react-dom"],
          "utility-vendor": ["lodash", "moment"],
        },
      },
    },
    chunkSizeWarningLimit: 1000, // Set chunk size warning limit to 1000 KB
  },
});
