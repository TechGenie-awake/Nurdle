import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite"; // keep this if you're using it this way

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    open: true,
    // ✅ This enables routing fallback in dev mode (for React Router)
    historyApiFallback: true,
  },
  build: {
    outDir: "dist",
  },
});
