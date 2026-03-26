import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
<<<<<<< HEAD
  build: {
    // Code splitting configuration
    rollupOptions: {
      output: {
        // Optimize chunk sizes
        manualChunks: (id) => {
          // Vendor chunk for node_modules
          if (id.includes('node_modules')) {
            // Separate heavy dependencies
            if (id.includes('recharts')) {
              return 'recharts';
            }
            if (id.includes('jspdf') || id.includes('html2canvas')) {
              return 'pdf-export';
            }
            if (id.includes('react-router')) {
              return 'router';
            }
            return 'vendor';
          }

          // Separate page chunks
          if (id.includes('/pages/')) {
            const match = id.match(/pages[/\\](\w+)/);
            if (match) {
              return `page-${match[1].toLowerCase()}`;
            }
          }

          // Separate component chunks
          if (id.includes('/components/')) {
            const match = id.match(/components[/\\](\w+)/);
            if (match) {
              return `component-${match[1].toLowerCase()}`;
            }
          }

          // Separate context chunks
          if (id.includes('/context/')) {
            return 'context';
          }
        },
      },
    },
    // Optimize chunk size warnings
    chunkSizeWarningLimit: 500,
    // Enable source maps for debugging in production
    sourcemap: false,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      'react-router-dom',
      'recharts',
      'es-toolkit/compat/get',
      'use-sync-external-store/shim/with-selector',
    ],
    exclude: [],
  },
  
  // Server configuration for dev
  server: {
    middlewareMode: false,
    hmr: true,
  },
=======
>>>>>>> 04a2f71d565a79346feae7b74ca2db6b30af6f23
})
