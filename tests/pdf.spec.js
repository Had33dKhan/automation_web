const { test } = require('@playwright/test');

test('Find all PDF links on the page', async ({ page }) => {
  const PAGE_URL = 'https://symmetrydigital-labs.com/SBP-2025/circulars-2025.html'; // replace if needed

  page.setDefaultNavigationTimeout(60000);
  await page.goto(PAGE_URL, { waitUntil: 'domcontentloaded' });

  // Optional: scroll to load dynamic content
  await page.evaluate(async () => {
    await new Promise(resolve => {
      let scrolled = 0;
      const step = 500;
      const timer = setInterval(() => {
        window.scrollBy(0, step);
        scrolled += step;
        if (scrolled >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 300);
    });
  });

  // Auto-discover PDF links
  const pdfLinks = await page.evaluate(() => {
    const base = window.location.origin;

    return Array.from(document.querySelectorAll('a[href]'))
      .map(a => a.getAttribute('href'))
      .filter(href => href && href.toLowerCase().includes('.pdf'))
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
  const uniquePdfLinks = [...new Set(pdfLinks)];

  console.log('\n========== PDF LINK REPORT ==========');

  if (uniquePdfLinks.length === 0) {
    console.log('No PDF links found on this page.');
  } else {
    console.log('PDF links found:\n');
    uniquePdfLinks.forEach((link, index) => {
      console.log(`${index + 1}. ${link}`);
    });
  }

  console.log(`\nTotal PDF links found: ${uniquePdfLinks.length}`);
});
