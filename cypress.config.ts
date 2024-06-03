import { defineConfig } from 'cypress';

export default defineConfig({
    viewportHeight: 1024,
    viewportWidth: 1440,
    screenshotOnRunFailure: true,
    video: false,
    screenshots: true,
    retries: {
        runMode: 3,
    },
    e2e: {
        baseUrl: 'http://localhost:3000',
    },
});
