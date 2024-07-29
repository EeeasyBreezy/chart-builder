import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright',
  timeout: 30000,
  use: {
    browserName: 'chromium',
    headless: true,
  },
});