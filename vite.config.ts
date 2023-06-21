import "dotenv/config";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const PORT = Number(process.env.PORT || 5000);
const URI = <string>process.env.URI || "http://localhost";
const URIAPIGATEWAY = <string>process.env.URIAPIGATEWAY || "35.247.192.77:5000";
const PORTAPIGATEWAY = Number(process.env.PORTAPIGATEWAY || 5000);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT,
    host: URI,
    proxy: {
      '/api': {
        // target: 'http://sae_ag:80',
        // target: 'http://35.247.192.77:5000',
        target: `http://${URIAPIGATEWAY}:${PORTAPIGATEWAY}`,
        changeOrigin: true,
        secure:false,
        rewrite: (path) => path.replace(/^\/api/,'')
      }
}
  },

  base: "/sae"
});
