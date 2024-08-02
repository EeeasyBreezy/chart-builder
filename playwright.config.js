import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './playwright',
  timeout: 30000,
  use: {
    browserName: 'chromium',
    headless: true,
  },
  projects: [
    {
      name: 'desktop',
      use: {
        viewport: { width: 1980, height: 1024 },
      },
    },
  ],
  snapshotDir: './playwright/screenshots',
});