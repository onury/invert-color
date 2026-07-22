import { defineConfig } from 'vitest/config';

// Config used only by Stryker mutation runs (no coverage instrumentation).
export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    testTimeout: 30000,
    include: ['test/**/*.{test,spec}.ts'],
    exclude: ['node_modules/**']
  }
});
