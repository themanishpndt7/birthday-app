const { test, expect } = require('@playwright/test');

test('intro opens one seal, then premium landing, then the app', async ({ page }) => {
  const pageErrors = [];
  page.on('pageerror', (error) => pageErrors.push(error.message));

  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });

  await expect(page.getByRole('heading', { name: /Happy Birthday, beautiful\./i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Continue to the seal/i })).toBeVisible();

  await page.getByRole('button', { name: /Continue to the seal/i }).click();
  await expect(page.getByRole('button', { name: /BREAK SEAL/i })).toHaveCount(1);
  await expect(page.getByRole('heading', { name: /A letter waiting only for you/i })).toBeVisible();

  await page.getByRole('button', { name: /BREAK SEAL/i }).click();
  await expect(page.getByRole('heading', { name: /Something Special Awaits/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Enter The Experience/i })).toBeVisible();

  await page.getByRole('button', { name: /Enter The Experience/i }).click();
  await expect(page.getByRole('heading', { name: /Welcome, My Love/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Begin The Journey/i })).toBeVisible();

  await page.getByRole('button', { name: /Begin The Journey/i }).click();
  await expect(page.getByRole('button', { name: /Story/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Cake/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Special Gifts/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Memory Vault/i })).toBeVisible();
  await expect(page.getByRole('button', { name: /Celebration/i })).toBeVisible();

  await page.getByRole('button', { name: /Memory Vault/i }).click();
  await expect(page.getByRole('heading', { name: /Memory Vault/i })).toBeVisible();

  expect(pageErrors).toEqual([]);
});
