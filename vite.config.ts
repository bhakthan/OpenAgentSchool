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
      // Enable React 19 features
      jsxRuntime: 'automatic',
      jsxImportSource: 'react',
    }),
    tailwindcss(),
  ],
  build: {
    outDir: process.env.OUTPUT_DIR || 'dist',
    // Optimize for Azure Static Web Apps
    chunkSizeWarningLimit: 500, // Force smaller chunks
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // Vendor chunks for major libraries - more granular splitting
          if (id.includes('node_modules')) {
            // React ecosystem - keep separate and small
            if (id.includes('react-dom')) {
              return 'vendor-react-dom';
            }
            if (id.includes('react/') && !id.includes('react-dom')) {
              return 'vendor-react';
            }
            if (id.includes('react-router')) {
              return 'vendor-router';
            }
            
            // Split Radix UI into very small chunks
            if (id.includes('@radix-ui/react-tabs') || id.includes('@radix-ui/react-accordion')) {
              return 'vendor-ui-tabs';
            }
            if (id.includes('@radix-ui/react-dialog') || id.includes('@radix-ui/react-alert-dialog')) {
              return 'vendor-ui-dialog';
            }
            if (id.includes('@radix-ui/react-dropdown') || id.includes('@radix-ui/react-select')) {
              return 'vendor-ui-dropdown';
            }
            if (id.includes('@radix-ui/react-scroll') || id.includes('@radix-ui/react-separator')) {
              return 'vendor-ui-layout';
            }
            if (id.includes('@radix-ui')) {
              return 'vendor-ui-misc';
            }
            
            // Split icon libraries by usage
            if (id.includes('@phosphor-icons/react/dist/ssr')) {
              return 'vendor-phosphor-ssr';
            }
            if (id.includes('@phosphor-icons')) {
              return 'vendor-phosphor';
            }
            if (id.includes('lucide-react') || id.includes('@heroicons')) {
              return 'vendor-icons-other';
            }
            
            // Large libraries get their own chunks
            if (id.includes('framer-motion')) {
              return 'vendor-animation';
            }
            if (id.includes('recharts')) {
              return 'vendor-charts';
            }
            if (id.includes('@xyflow/react')) {
              return 'vendor-flow';
            }
            
            // Utility libraries
            if (id.includes('clsx') || id.includes('tailwind-merge')) {
              return 'vendor-utils-css';
            }
            if (id.includes('class-variance-authority') || id.includes('@hookform')) {
              return 'vendor-utils-form';
            }
            
            // Split other vendor libraries by size/function
            if (id.includes('axios') || id.includes('fetch')) {
              return 'vendor-http';
            }
            if (id.includes('date') || id.includes('moment')) {
              return 'vendor-date';
            }
            
            // Catch-all for remaining vendor code - split by first letter to distribute
            const packageName = id.split('node_modules/')[1]?.split('/')[0] || '';
            const firstChar = packageName.charAt(0);
            if (firstChar >= 'a' && firstChar <= 'h') {
              return 'vendor-a-h';
            } else if (firstChar >= 'i' && firstChar <= 'p') {
              return 'vendor-i-p';
            } else {
              return 'vendor-q-z';
            }
          }
          
          // App chunks for major feature areas - more granular
          if (id.includes('/patterns/PatternExplorer') || id.includes('/patterns/PatternDetails')) {
            return 'app-patterns-core';
          }
          if (id.includes('/patterns/')) {
            return 'app-patterns-extra';
          }
          
          if (id.includes('/concepts/ConceptsExplorer') || id.includes('/concepts/ConceptsHub')) {
            return 'app-concepts-core';
          }
          if (id.includes('/concepts/')) {
            return 'app-concepts-extra';
          }
          
          if (id.includes('/visualization/SimplePatternVisualizer')) {
            return 'app-viz-patterns';
          }
          if (id.includes('/visualization/') || id.includes('/interactive-demos/')) {
            return 'app-viz-other';
          }
          
          if (id.includes('/tutorial/') || id.includes('/quiz/')) {
            return 'app-tutorial';
          }
          if (id.includes('/azure-services/')) {
            return 'app-azure';
          }
          if (id.includes('/community/') || id.includes('/references/')) {
            return 'app-content';
          }
          if (id.includes('/code-playbook/')) {
            return 'app-code-playbook';
          }
          
          // Data and configuration
          if (id.includes('/lib/data/patterns/')) {
            return 'app-data-patterns';
          }
          if (id.includes('/lib/data/') || id.includes('/lib/tutorial/')) {
            return 'app-data-other';
          }
          if (id.includes('/lib/utils/')) {
            return 'app-utils';
          }
        },
        // Optimize chunk naming for better caching
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
  define: {
    // ensure that you give these types in `src/vite-end.d.ts`
    GITHUB_RUNTIME_PERMANENT_NAME: JSON.stringify(GITHUB_RUNTIME_PERMANENT_NAME),
    BASE_KV_SERVICE_URL: JSON.stringify("/_spark/kv"),
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
        target: "http://localhost:8000",
        changeOrigin: true,
      }
    },
  },
  resolve: {
    alias: {
      '@': resolve(projectRoot, 'src')
    }
  },
});
