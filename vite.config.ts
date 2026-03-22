import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/personal-portfolio/",
  plugins: [
    react(),
    {
      name: "preserve-seo-meta",
      transformIndexHtml: {
        order: "post",
        handler(html) {
      
          return html.replace(/<\/head>/i, "</head>");
        },
      },

    },
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
