/* eslint-disable import/no-extraneous-dependencies */
import { defineConfig } from 'cypress';

export default defineConfig({
    viewportHeight: 1024,
    viewportWidth: 1440,
    screenshotOnRunFailure: true,
    video: false,
    retries: {
        runMode: 3,
    },
    e2e: {
        baseUrl: 'http://localhost:3000',
    },
});
