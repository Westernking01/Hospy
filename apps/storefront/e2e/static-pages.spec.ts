import { test, expect } from '@playwright/test';

test.describe('Static Pages', () => {
  test('should load the about page', async ({ page }) => {
    await page.goto('/about');
    await expect(page).toHaveURL(/\/about/);
    await expect(page.locator('body')).toBeVisible();
    await expect(page.locator('main').last()).toBeVisible();
  });

  test('should load the contact page', async ({ page }) => {
    await page.goto('/contact');
    await expect(page).toHaveURL(/\/contact/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load the FAQ page', async ({ page }) => {
    await page.goto('/faq');
    await expect(page).toHaveURL(/\/faq/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load the terms page', async ({ page }) => {
    await page.goto('/terms');
    await expect(page).toHaveURL(/\/terms/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load the B2B page', async ({ page }) => {
    await page.goto('/b2b');
    await expect(page).toHaveURL(/\/b2b/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load the deals page', async ({ page }) => {
    await page.goto('/deals');
    await expect(page).toHaveURL(/\/deals/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load the deal (single) page', async ({ page }) => {
    await page.goto('/deal');
    await expect(page).toHaveURL(/\/deal/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load the wishlist page', async ({ page }) => {
    await page.goto('/wishlist');
    await expect(page).toHaveURL(/\/wishlist/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should load the account page', async ({ page }) => {
    await page.goto('/account');
    // It should redirect to login if not authenticated
    await expect(page).toHaveURL(/.*auth\/login.*/);
    await expect(page.locator('body')).toBeVisible();
  });
});

test.describe('SEO Routes', () => {
  test('should serve robots.txt', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
    const text = await response?.text();
    expect(text).toContain('User-Agent');
  });

  test('should serve sitemap.xml', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
    const text = await response?.text();
    expect(text).toContain('urlset');
  });
});

test.describe('404 Page', () => {
  test('should show not-found page for invalid routes', async ({ page }) => {
    const response = await page.goto('/this-page-does-not-exist-12345');
    // Next.js returns 404 for unknown routes
    expect(response?.status()).toBe(404);
    await expect(page.locator('body')).toBeVisible();
  });
});
