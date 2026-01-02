const { test } = require('@playwright/test');
const fs = require('fs');

test('detect broken images and capture screenshots safely', async ({ page }) => {
  const BASE_URL = 'https://www.psx.com.pk';

  page.setDefaultNavigationTimeout(60000);
  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  // Scroll page to load lazy images
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let scrolled = 0;
      const step = 400;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        scrolled += step;
        if (scrolled >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 250);
    });
  });

  await page.waitForTimeout(2000);

  // Find visually broken images
  const brokenImages = await page.evaluate(() => {
    return Array.from(document.images)
      .filter(img => !img.complete || img.naturalWidth === 0)
      .map(img => img.currentSrc || img.src);
  });

  console.log(`Broken images detected: ${brokenImages.length}`);

  if (!brokenImages.length) {
    console.log('No broken images found.');
    return;
  }

  // Create folder
  if (!fs.existsSync('broken-images')) {
    fs.mkdirSync('broken-images');
  }

  // Screenshot each broken image safely
  for (let i = 0; i < brokenImages.length; i++) {
    const src = brokenImages[i];
    const imgLocator = page.locator(`img[src="${src}"]`).first();

    if (await imgLocator.count() === 0) {
      console.log(`Image not found in DOM: ${src}`);
      continue;
    }

    try {
      await imgLocator.scrollIntoViewIfNeeded();
      await imgLocator.screenshot({
        path: `broken-images/broken-${i + 1}.png`
      });
      console.log(`Screenshot saved for: ${src}`);
    } catch (err) {
      console.log(`Could not screenshot image: ${src}`);
    }
  }
});
