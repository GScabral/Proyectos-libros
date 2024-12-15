import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/Proyectos-libros/', // Cambia "<nombre-del-repositorio>" por el nombre de tu repo
})