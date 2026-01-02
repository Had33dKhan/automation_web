import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('https://facebook.com');
  await expect(page).toHaveTitle();
});

// https://www.simosa.com.pk/assets/images/gameNow_1.png

// test('test', async ({ page }) => {
//   await page.goto('https://www.google.com/');
//   await page.getByRole('combobox', { name: 'Search' }).click();
//   await page.getByRole('combobox', { name: 'Search' }).fill('game');
//   test.setTimeout("500000ms")
//   await page.locator('iframe[name="a-jeexxr71a5cd"]').contentFrame().getByRole('checkbox', { name: 'I\'m not a robot' }).click();
//   await page.locator('iframe[name="c-jeexxr71a5cd"]').contentFrame().locator('.rc-imageselect-tile').first().click();
//   await page.locator('iframe[name="c-jeexxr71a5cd"]').contentFrame().locator('tr:nth-child(3) > td').first().click();
//   await page.locator('iframe[name="c-jeexxr71a5cd"]').contentFrame().locator('tr:nth-child(4) > td').first().click();
//   await page.locator('iframe[name="c-jeexxr71a5cd"]').contentFrame().locator('tr:nth-child(2) > td:nth-child(2)').click();
//   await page.locator('iframe[name="c-jeexxr71a5cd"]').contentFrame().locator('tr:nth-child(2) > td').first().click();
//   await page.locator('iframe[name="c-jeexxr71a5cd"]').contentFrame().locator('tr:nth-child(3) > td:nth-child(2)').click();
//   await page.locator('iframe[name="c-jeexxr71a5cd"]').contentFrame().locator('tr:nth-child(4) > td:nth-child(2)').click();
//   await page.locator('iframe[name="c-jeexxr71a5cd"]').contentFrame().locator('td:nth-child(2)').first().click();
//   await page.locator('iframe[name="c-jeexxr71a5cd"]').contentFrame().getByRole('button', { name: 'Verify' }).click();
//   await page.getByRole('link', { name: 'Images' }).click();
//   await page.getByRole('button', { name: 'Top paid Games on PC |' }).click();
//   const page1Promise = page.waitForEvent('popup');
//   await page.getByRole('link', { name: 'Visit Microsoft' }).click();
//   const page1 = await page1Promise;
// });


test('Google search and image navigation test', async ({ page }) => {
  // Set timeout properly (as number in milliseconds)
  test.setTimeout(500000);

  // Navigate to Google
  await page.goto('https://www.google.com/');
  
  // Perform search
  const searchBox = page.getByRole('combobox', { name: 'Search' });
  await searchBox.click();
  await searchBox.fill('game');
  await searchBox.press('Enter');

  // Wait for navigation and click Images link
  await page.waitForLoadState('networkidle');
  await page.getByRole('link', { name: 'Images' }).click();

  // Click on game result (with more reliable waiting)
  await page.waitForSelector('[name="Top paid Games on PC"]');
  await page.getByRole('button', { name: 'Top paid Games on PC |' }).click();

  // Handle new tab
  const [newPage] = await Promise.all([
    page.waitForEvent('popup'),
    page.getByRole('link', { name: 'Visit Microsoft' }).click()
  ]);
  
  // Close the new page when done 
  await newPage.close();
});




test('test', async ({ page }) => {
  await page.goto('https://www.google.com/');
   test.setTimeout(500000);
  await page.locator('.lnXdpd > path').first().click();
  await page.getByRole('link', { name: 'Gmail' }).click();
  await page.getByText('Gemini in Gmail can compose').click();
  await page.getByRole('heading', { name: 'Search your inbox in a whole' }).click();
  await page.getByRole('img', { name: 'Privacy notification' }).click();
  await page.locator('#m10 > div > ._column_vqvmf_125').click();
  await page.getByRole('img', { name: 'Gmail chat function with' }).click();
  await page.locator('.\\32  > .png > image').click();
});