// IMPORTANT NOTE: This file is only used in two situations: local development, and the live preview in Workbench.
// For deployed Sparks, the `server/main.ts` serves the app itself. Ensure consistency between this file and `server/main.ts`
// if you have something that needs to available while deployed.

import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, PluginOption } from "vite";
import { resolve } from 'path'
import path from 'path';

const extraPlugins: PluginOption[] = [];

const GITHUB_RUNTIME_PERMANENT_NAME = process.env.GITHUB_RUNTIME_PERMANENT_NAME || process.env.CODESPACE_NAME?.substring(0, 20);
const projectRoot = process.env.PROJECT_ROOT || path.resolve()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      // Standard React 18 configuration (automatic runtime by default)
    }),
    tailwindcss(),
  ],
  define: {
    // ensure that you give these types in `src/vite-end.d.ts`
    GITHUB_RUNTIME_PERMANENT_NAME: JSON.stringify(GITHUB_RUNTIME_PERMANENT_NAME),
    BASE_KV_SERVICE_URL: JSON.stringify("/_spark/kv"),
  },
  build: {
    outDir: process.env.OUTPUT_DIR || 'dist',
    // Optimize for Azure Static Web Apps
    chunkSizeWarningLimit: 500, // Force smaller chunks
    rollupOptions: {
      external: [],
      output: {
        manualChunks(id) {
          // Group heavy libraries & visualization modules to reduce initial load
          if (id.includes('node_modules')) {
            if (id.includes('d3')) return 'vendor-d3';
            if (id.includes('react-flow') || id.includes('xyflow')) return 'vendor-flow';
            if (id.includes('three')) return 'vendor-three';
          }
          if (id.includes('/visualization/')) return 'visualizations';
          if (id.includes('/study-mode/')) return 'study-mode';
          return undefined;
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash].[ext]'
      }
    },
    // Disable source maps in production for smaller bundles
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
    }
  },
  server: {
    port: 5000,
    hmr: {
      overlay: false,
    },
    cors: {
      origin: /^https?:\/\/(?:(?:[^:]+\.)?localhost|127\.0\.0\.1|\[::1\]|(?:.*\.)?github\.com)(?::\d+)?$/
    },
    watch: {
      ignored: [
        "**/prd.md", 
        "**.log", 
        "**/.azcopy/**",
      ],
      awaitWriteFinish: {
        pollInterval: 50,
        stabilityThreshold: 100,
      },
    },
    warmup: {
      clientFiles: [
        "./src/App.tsx",
        "./src/index.css",
        "./index.html",
        "./src/**/*.tsx",
        "./src/**/*.ts",
        "./src/**/*.jsx",
        "./src/**/*.js",
        "./src/styles/theme.css",
      ],
    },
    proxy: {
      // This proxies everything under /_spark to our backend servers.
      // This is used in local development and in the live preview.
      // Deployed sparks route through ACA for /_spark.
      "^/_spark/.*": {
        // Allow overriding proxy target to hit a backend running from a separate repo
        target: process.env.VITE_CORE_API_URL || "http://localhost:8000",
        changeOrigin: true,
      }
    },
  },
  resolve: {
    alias: {
      // Path alias for TypeScript imports
      '@': path.resolve(projectRoot, './src'),
      // Ensure consistent React imports to prevent Children property errors
      'react': path.resolve(projectRoot, './node_modules/react'),
      'react-dom': path.resolve(projectRoot, './node_modules/react-dom')
    }
  },
});
