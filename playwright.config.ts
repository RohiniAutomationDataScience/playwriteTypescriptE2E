import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  globalSetup: './src/global-setup.ts',
  globalTeardown: './src/global-teardown.ts',
  testDir: './src/tests',
  reporter: [['list'], ['html', { open: 'always' }]],
  use: {
    baseURL: process.env.UI_BASE_URL || 'https://www.saucedemo.com',
    //trace: 'on-first-retry',
    //video: 'retain-on-failure',
    trace: 'on',
    video: 'on',
    screenshot: 'only-on-failure',
  },
  projects: [
    //  UI tests → run on all 3 browsers
    {
      name: 'UI-Chrome',
      testMatch: /.*ui.*\.spec\.ts/,
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'UI-Firefox',
      testMatch: /.*ui.*\.spec\.ts/,
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'UI-WebKit',
      testMatch: /.*ui.*\.spec\.ts/,
      use: { ...devices['Desktop Safari'] }
    },

    // API tests → just one project, no browser
    {
      name: 'API',
      testMatch: /.*api.*\.spec\.ts/,
      use: {}
    }
  ]
});
