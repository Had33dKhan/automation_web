// open-iphone14.js
const { chromium, devices } = require('@playwright/test');

(async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    ...devices['iPhone 14'], // iPhone 14 emulation
  });

  const page = await context.newPage();
  await page.goto('https://symmetrydigital-labs.com/SBP-2025/careers.html');

  // Pause so you can interact manually
  await page.pause();
})();
