import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/javascript-visualizer/' : '/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        'algorithm-visualizer': resolve(__dirname, 'src/visualizers/algorithm-visualizer/index.html')
      }
    }
  },
  server: {
    open: '/src/index.html',
    port: 5173
  }
}))
