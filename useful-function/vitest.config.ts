import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    includeSource: ['playground/**/*.{js,ts}']
  }
})
