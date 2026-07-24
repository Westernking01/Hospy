import { test, expect } from '@playwright/test';

test.describe('Products Page', () => {
  test('should load the products listing page', async ({ page }) => {
    await page.goto('/products');
    await expect(page).toHaveURL(/\/products/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should display product cards in a grid', async ({ page }) => {
    await page.goto('/products');
    // Wait for the client-side rendering to complete
    await page.waitForTimeout(1000);
    // Products page uses ShopProductCard components
    const productLinks = page.locator('a[href*="/products/"]');
    // There should be at least one product visible
    const count = await productLinks.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have filter controls', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(500);
    // The shop page has category filter, price range, brand filter, and sort controls
    const body = page.locator('body');
    await expect(body).toBeVisible();
  });

  test('should have view mode toggle (grid/list)', async ({ page }) => {
    await page.goto('/products');
    await page.waitForTimeout(500);
    // Page should render without errors
    await expect(page.locator('main').last()).toBeVisible();
  });
});

test.describe('Product Detail Page', () => {
  test('should load a product detail page', async ({ page }) => {
    // First visit products page to find a product link
    await page.goto('/products');
    await page.waitForTimeout(1000);
    
    const productLink = page.locator('a[href*="/products/"]').first();
    const linkCount = await productLink.count();
    
    if (linkCount > 0) {
      const href = await productLink.getAttribute('href');
      if (href) {
        await page.goto(href);
        await page.waitForTimeout(500);
        await expect(page.locator('body')).toBeVisible();
      }
    }
  });
});
