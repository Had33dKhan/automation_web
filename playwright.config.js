// const { defineConfig } = require('@playwright/test');

// module.exports = defineConfig({
//     // use: {
//     //     headless: true,
//     //     screenshot: 'only-on-failure',
//     //     video: 'retain-on-failure',
//     //     trace: 'retain-on-failure',
//     // },
//     reporter: [['html', { outputFolder: 'playwright-report', open: 'on-failure' }]],

//     projects: [
//         {
//             name: 'chromium',
//             use: {
//                 browserName: 'chromium',
//                 viewport: null,
//                 deviceScaleFactor: undefined,
//                 launchOptions: {
//                     args: ['--start-maximized'],
//                 },
//             },
//         },
//         {
//             name: 'firefox',
//             use: {
//                 browserName: 'firefox',
//                 viewport: null,
//                 deviceScaleFactor: undefined,
//                 launchOptions: {
//                     args: ['--start-maximized'],
//                 },
//             },
//         },
//         {
//             name: 'webkit',
//             use: {
//                 browserName: 'webkit',
//                 viewport: null,
//                 deviceScaleFactor: undefined,
//                 launchOptions: {
//                     args: ['--start-maximized'],
//                 },
//             },
//         },
//     ]
// })


const { defineConfig, devices } = require('@playwright/test');

module.exports = defineConfig({
  reporter: [['html', { outputFolder: 'playwright-report', open: 'on-failure' }]],

  projects: [
    // =======================
    // Desktop Resolutions
    // =======================

    {
      name: 'Chromium - Full HD (1920x1080)',
      use: {
        browserName: 'chromium',
        viewport: { width: 1920, height: 1080 },
        launchOptions: {
          args: ['--start-maximized'],
        },
      },
    },
    {
      name: 'Chromium - HD (1366x768)',
      use: {
        browserName: 'chromium',
        viewport: { width: 1366, height: 768 },
      },
    },
    {
      name: 'Firefox - Full HD',
      use: {
        browserName: 'firefox',
        viewport: { width: 1920, height: 1080 },
      },
    },
    {
      name: 'WebKit - Full HD',
      use: {
        browserName: 'webkit',
        viewport: { width: 1920, height: 1080 },
      },
    },

    // =======================
    // Mobile Devices
    // =======================

    {
      name: 'Mobile - iPhone 14',
      use: {
        ...devices['iPhone 14'],
      },
    },
    {
      name: 'Mobile - iPhone SE',
      use: {
        ...devices['iPhone SE'],
      },
    },
    {
      name: 'Mobile - Pixel 7',
      use: {
        ...devices['Pixel 7'],
      },
    },

    // =======================
    // Tablets
    // =======================

    {
      name: 'Tablet - iPad Pro 11',
      use: {
        ...devices['iPad Pro 11'],
      },
    },
    {
      name: 'Tablet - Galaxy Tab S4',
      use: {
        ...devices['Galaxy Tab S4'],
      },
    },
  ],
});
