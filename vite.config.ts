import "dotenv/config";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const PORT = Number(process.env.PORT || 5000);
const URI = <string>process.env.URI || "http://localhost";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT,
    host: URI,
    server: {
      '/api' : {
        target: 'https://35.247.192.77:5001',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/,'')
      }
    }
  },
  base: "/sae"
});
