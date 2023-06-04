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
    middleware: [
      (req, res, next) => {
        // Aquí puedes agregar tus reglas de acceso personalizadas
        // Verificar la solicitud (req) y responder (res) según sea necesario

        // Ejemplo de regla de acceso que permite todas las solicitudes GET
        if (req.method === 'GET') {
          next(); // Permite la solicitud continuar
        } else {
          res.status(403).end('Acceso denegado'); // Responde con un estado 403 para otras solicitudes
        }
      },
    ],
  },
  base: "/sae"
});
