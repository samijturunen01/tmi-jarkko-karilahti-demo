import { defineConfig, devices } from '@playwright/test'

/**
 * Tests run against the production build served like GitHub Pages
 * (run `npm run build` first). Base path: /tmi-jarkko-karilahti-demo/.
 * LIVE_URL=https://samijturunen01.github.io runs the suite against the deployed demo.
 */
export default defineConfig({
  testDir: 'tests',
  timeout: 45_000,
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? 'github' : 'list',
  use: {
    baseURL: process.env.LIVE_URL || 'http://127.0.0.1:4318',
    trace: 'retain-on-failure',
  },
  webServer: process.env.LIVE_URL
    ? undefined
    : {
        command: 'node scripts/serve-dist.mjs 4318',
        url: 'http://127.0.0.1:4318/tmi-jarkko-karilahti-demo/',
        reuseExistingServer: !process.env.CI,
      },
  projects: [
    { name: 'desktop', use: { ...devices['Desktop Chrome'], viewport: { width: 1440, height: 900 } } },
    { name: 'mobile', use: { ...devices['Pixel 7'] } },
  ],
})
