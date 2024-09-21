import { defineConfig } from 'vitest/config'
import { svelte } from '@sveltejs/vite-plugin-svelte'

export default defineConfig(({ mode }) => ({
  plugins: [
    svelte(),
  ],
  test: {
    environment: 'jsdom',
    globals: true,
  },
  resolve: {
    conditions: mode === 'test' ? ['browser'] : [],
  }
}))