const { test } = require('@playwright/test');

test('broken links report', async ({ page }) => {
  const BASE_URL = 'https://www.psx.com.pk';

  await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });

  // Auto-discover all valid hrefs
  const links = await page.evaluate(() => {
    const base = window.location.origin;

    return Array.from(document.querySelectorAll('a[href]'))
      .map(a => a.getAttribute('href'))
      .filter(href =>
        href &&
        href !== '#' &&
        !href.startsWith('javascript:') &&
        !href.startsWith('mailto:') &&
        !href.startsWith('tel:')
      )
      .map(href => {
        try {
          return new URL(href, base).href;
        } catch {
          return null;
        }
      })
      .filter(Boolean);
  });

  // Remove duplicates
  const uniqueLinks = [...new Set(links)];

  console.log('\n========== LINK REPORT ==========');
  console.log('These are the links:\n');

  uniqueLinks.forEach((link, index) => {
    console.log(`${index + 1}. ${link}`);
  });

  console.log(`\nTotal links found: ${uniqueLinks.length}`);
});
