import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  // Configuración del servidor de desarrollo
  server: {
    port: 3000,
  },
  // Configuración del servidor WebSockets
  socket: {
    port: 8080,
  },
  // Configuración de los plugins
  plugins: [react()],
})