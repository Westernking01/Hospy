import { test, expect } from '@playwright/test';

test.describe('Search Page', () => {
  test('should load the search page', async ({ page }) => {
    await page.goto('/search');
    await expect(page).toHaveURL(/\/search/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should render search input', async ({ page }) => {
    await page.goto('/search');
    await page.waitForTimeout(500);
    const searchInput = page.locator('input[type="search"], input[type="text"], input[placeholder*="search" i]');
    const count = await searchInput.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should render search results area', async ({ page }) => {
    await page.goto('/search');
    await page.waitForTimeout(500);
    await expect(page.locator('main').last()).toBeVisible();
  });
});
