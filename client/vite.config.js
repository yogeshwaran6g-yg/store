import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from '@tailwindcss/vite'
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  return {
    plugins: [
      react({
        jsxRuntime: "automatic",
      }),
      tailwindcss()
    ],

    // -----------------------------
    // Path Aliases
    // -----------------------------
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
        "@components": path.resolve(__dirname, "src/components"),
        "@pages": path.resolve(__dirname, "src/pages"),
        "@context": path.resolve(__dirname, "src/components/context"),
        // "@assets": path.resolve(__dirname, "src/assets"),
        "@hooks": path.resolve(__dirname, "src/hooks"),
        "@utils": path.resolve(__dirname, "src/utils"),
        "@services": path.resolve(__dirname, "src/services"),
        // "@store": path.resolve(__dirname, "src/store"),
      },
    },

    // -----------------------------
    // Dev Server
    // -----------------------------
    server: {
      host: true,
      port: 3000,
      strictPort: true,
      open: false,

      proxy: {
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },

    // -----------------------------
    // Preview (Production Test)
    // -----------------------------
    preview: {
      port: 3000,
      strictPort: true,
    },

    // -----------------------------
    // Build Configuration
    // -----------------------------
    build: {
      target: "es2018",
      outDir: "dist",
      assetsDir: "assets",
      sourcemap: mode !== "production",
      emptyOutDir: true,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1500,

      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes("node_modules")) {
              if (id.includes("react")) return "react-vendor";
              if (id.includes("axios")) return "http";
              return "vendor";
            }
          },
        },
      },

      minify: "esbuild",
    },

    // -----------------------------
    // Optimizations
    // -----------------------------
    optimizeDeps: {
      include: ["react", "react-dom", "axios"],
    },

    // -----------------------------
    // Environment Variables Prefix
    // -----------------------------
    envPrefix: "VITE_",

    // -----------------------------
    // Define Global Constants
    // -----------------------------
    define: {
      __APP_ENV__: JSON.stringify(mode),
    },
  };
});
