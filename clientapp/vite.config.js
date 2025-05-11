import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    hmr: false,
    proxy: {
      '/uploads': {
        target: 'https://localhost:7110',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
// import { defineConfig } from 'vite';
// import react from '@vitejs/plugin-react';

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   server: {
//     // Enable HMR (recommended for development)
//     hmr: true,
    
//     // Configure proxy for API requests to avoid CORS issues
//     proxy: {
//       '/api': {
//         target: 'https://localhost:7110',
//         changeOrigin: true,
//         secure: false,
//         rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     },
    
//     // Configure development server port (optional)
//     port: 3000,
    
//     // Automatically open browser (optional)
//     open: true
//   },
//   // Configure environment variables
//   define: {
//     'process.env': process.env
//   },
//   // Build configuration
//   build: {
//     outDir: 'dist',
//     assetsDir: 'assets',
//     sourcemap: true // Useful for debugging
//   }
// });
