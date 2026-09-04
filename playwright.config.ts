import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  reporter: 'html',
  globalSetup: require.resolve('./src/utilities/globalSetup'),
  globalTeardown: require.resolve('./src/utilities/globalTeardown'),
  //Run tests in files in parallel
  fullyParallel: true,

  //Retry on CI only 
  //retries: process.env.CI ? 2 : 0,
  //Opt out of parallel tests on CI.
  use: {
    trace: 'on-first-retry',
    headless: !!process.env.CI,
    screenshot: 'only-on-failure',
    launchOptions: {
      args: ['--start-maximized'],
    },

    viewport: { width: 1920, height: 1080 },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'api',
      testMatch: /tests\/api\/.*\.spec\.ts/,
      use: {
        baseURL: 'https://simple-books-api.click',
      },
    },
    
    {
    name: 'firefox',
    use: { ...devices['Desktop Firefox'] },
    },

   // {
   //   name: 'webkit',
   //   use: { ...devices['Desktop Safari'] },
   // },

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
