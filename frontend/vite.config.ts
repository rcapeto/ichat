import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

const port = 3001;

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  preview: {
    port,
  },
  server: {
    port,
  },
});
