import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import "dotenv/config";

const PORT = Number(process.env.PORT || 5000);
const URI = <string>process.env.URI || 'http://localhost';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT,
    host: URI,
  },

});
