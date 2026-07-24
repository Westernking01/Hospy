import { test, expect } from '@playwright/test';

/**
 * Smoke Tests — lightweight checks to verify core pages load.
 * Can be run against any deployed URL by setting baseURL.
 */
test.describe('Smoke Tests', () => {
  test('homepage returns 200', async ({ page }) => {
    const response = await page.goto('/');
    expect(response?.status()).toBe(200);
  });

  test('products page returns 200', async ({ page }) => {
    const response = await page.goto('/products');
    expect(response?.status()).toBe(200);
  });

  test('categories page returns 200', async ({ page }) => {
    const response = await page.goto('/categories');
    expect(response?.status()).toBe(200);
  });

  test('brands page returns 200', async ({ page }) => {
    const response = await page.goto('/brands');
    expect(response?.status()).toBe(200);
  });

  test('cart page returns 200', async ({ page }) => {
    const response = await page.goto('/cart');
    expect(response?.status()).toBe(200);
  });

  test('auth login page returns 200', async ({ page }) => {
    const response = await page.goto('/auth/login');
    expect(response?.status()).toBe(200);
  });

  test('auth register page returns 200', async ({ page }) => {
    const response = await page.goto('/auth/register');
    expect(response?.status()).toBe(200);
  });

  test('search page returns 200', async ({ page }) => {
    const response = await page.goto('/search');
    expect(response?.status()).toBe(200);
  });

  test('about page returns 200', async ({ page }) => {
    const response = await page.goto('/about');
    expect(response?.status()).toBe(200);
  });

  test('contact page returns 200', async ({ page }) => {
    const response = await page.goto('/contact');
    expect(response?.status()).toBe(200);
  });

  test('robots.txt is accessible', async ({ page }) => {
    const response = await page.goto('/robots.txt');
    expect(response?.status()).toBe(200);
  });

  test('sitemap.xml is accessible', async ({ page }) => {
    const response = await page.goto('/sitemap.xml');
    expect(response?.status()).toBe(200);
  });

  test('404 page returns correct status for unknown route', async ({ page }) => {
    const response = await page.goto('/nonexistent-route-smoke-test');
    expect(response?.status()).toBe(404);
  });
});
