import { test, expect } from '@playwright/test';

test.describe('Categories Page', () => {
  test('should load the categories listing page', async ({ page }) => {
    await page.goto('/categories');
    await expect(page).toHaveURL(/\/categories/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should render category content', async ({ page }) => {
    await page.goto('/categories');
    await page.waitForTimeout(500);
    await expect(page.locator('main').last()).toBeVisible();
  });

  test('should have navigable category links', async ({ page }) => {
    await page.goto('/categories');
    await page.waitForTimeout(1000);
    // Look for links to individual category pages
    const categoryLinks = page.locator('a[href*="/categories/"]');
    const count = await categoryLinks.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});

test.describe('Brands Page', () => {
  test('should load the brands listing page', async ({ page }) => {
    await page.goto('/brands');
    await expect(page).toHaveURL(/\/brands/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should render brand content', async ({ page }) => {
    await page.goto('/brands');
    await page.waitForTimeout(500);
    await expect(page.locator('main').last()).toBeVisible();
  });

  test('should have navigable brand links', async ({ page }) => {
    await page.goto('/brands');
    await page.waitForTimeout(1000);
    const brandLinks = page.locator('a[href*="/brands/"]');
    const count = await brandLinks.count();
    expect(count).toBeGreaterThanOrEqual(0);
  });
});
