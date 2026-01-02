import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/javascript-visualizer/' : '/',
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'src/index.html'),
        'visualizers/algorithm-visualizer/index': resolve(__dirname, 'src/visualizers/algorithm-visualizer/index.html')
      }
    }
  },
  server: {
    open: '/index.html',
    port: 5173
  }
}))
