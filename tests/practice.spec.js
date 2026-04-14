import { test, expect } from '@playwright/test';

test.use({
  viewport: {
    height: 920,
    width: 420
  }
});

test('test', async ({ page }) => {
  await page.getByRole('textbox', { name: 'Complaint & Feedback' }).click();
  await page.getByRole('textbox', { name: 'Complaint & Feedback' }).fill('testing');
  await page.getByRole('textbox', { name: 'Brands' }).click();
  await page.getByRole('textbox', { name: 'Brands' }).fill('nothing');
  await page.getByRole('textbox', { name: 'Pack sizes include' }).click();
  await page.getByRole('textbox', { name: 'Pack sizes include' }).fill('100');
  await page.locator('#store_of_purchase').click();
  await page.locator('#store_of_purchase').fill('10000');
  await page.getByRole('textbox', { name: 'Karachi' }).click();
  await page.getByRole('textbox', { name: 'Karachi' }).fill('karachi');
  await page.locator('#batch_id').click();
  await page.locator('#batch_id').fill('nothing');
  await page.locator('#best_before_code').click();
  await page.locator('#best_before_code').fill('1000000');
  await page.getByRole('textbox', { name: 'Your message' }).click();
  await page.getByRole('textbox', { name: 'Your message' }).fill('its only for testing');
  await page.getByRole('button', { name: 'SEND' }).click();
});