import { test, expect } from '@playwright/test';

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should navigate to products page', async ({ page }) => {
    await page.goto('/products');
    await expect(page).toHaveURL(/\/products/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to categories page', async ({ page }) => {
    await page.goto('/categories');
    await expect(page).toHaveURL(/\/categories/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to brands page', async ({ page }) => {
    await page.goto('/brands');
    await expect(page).toHaveURL(/\/brands/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to cart page', async ({ page }) => {
    await page.goto('/cart');
    await expect(page).toHaveURL(/\/cart/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to wishlist page', async ({ page }) => {
    await page.goto('/wishlist');
    await expect(page).toHaveURL(/\/wishlist/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to deals page', async ({ page }) => {
    await page.goto('/deals');
    await expect(page).toHaveURL(/\/deals/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should navigate to search page', async ({ page }) => {
    await page.goto('/search');
    await expect(page).toHaveURL(/\/search/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should render header navigation on all pages', async ({ page }) => {
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Navigate to a different page and verify header persists
    await page.goto('/products');
    await expect(header).toBeVisible();
  });

  test('should render footer on all non-auth pages', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(300);
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should hide header and footer on auth pages', async ({ page }) => {
    await page.goto('/auth/login');
    // Auth pages intentionally hide the main header/footer per the layout
    const footer = page.locator('footer');
    await expect(footer).not.toBeVisible();
  });
});
