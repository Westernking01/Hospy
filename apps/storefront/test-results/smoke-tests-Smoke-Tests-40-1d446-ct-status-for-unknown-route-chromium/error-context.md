# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: smoke-tests.spec.ts >> Smoke Tests >> 404 page returns correct status for unknown route
- Location: e2e\smoke-tests.spec.ts:68:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.goto: Test timeout of 60000ms exceeded.
Call log:
  - navigating to "http://localhost:3000/nonexistent-route-smoke-test", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | /**
  4  |  * Smoke Tests — lightweight checks to verify core pages load.
  5  |  * Can be run against any deployed URL by setting baseURL.
  6  |  */
  7  | test.describe('Smoke Tests', () => {
  8  |   test('homepage returns 200', async ({ page }) => {
  9  |     const response = await page.goto('/');
  10 |     expect(response?.status()).toBe(200);
  11 |   });
  12 | 
  13 |   test('products page returns 200', async ({ page }) => {
  14 |     const response = await page.goto('/products');
  15 |     expect(response?.status()).toBe(200);
  16 |   });
  17 | 
  18 |   test('categories page returns 200', async ({ page }) => {
  19 |     const response = await page.goto('/categories');
  20 |     expect(response?.status()).toBe(200);
  21 |   });
  22 | 
  23 |   test('brands page returns 200', async ({ page }) => {
  24 |     const response = await page.goto('/brands');
  25 |     expect(response?.status()).toBe(200);
  26 |   });
  27 | 
  28 |   test('cart page returns 200', async ({ page }) => {
  29 |     const response = await page.goto('/cart');
  30 |     expect(response?.status()).toBe(200);
  31 |   });
  32 | 
  33 |   test('auth login page returns 200', async ({ page }) => {
  34 |     const response = await page.goto('/auth/login');
  35 |     expect(response?.status()).toBe(200);
  36 |   });
  37 | 
  38 |   test('auth register page returns 200', async ({ page }) => {
  39 |     const response = await page.goto('/auth/register');
  40 |     expect(response?.status()).toBe(200);
  41 |   });
  42 | 
  43 |   test('search page returns 200', async ({ page }) => {
  44 |     const response = await page.goto('/search');
  45 |     expect(response?.status()).toBe(200);
  46 |   });
  47 | 
  48 |   test('about page returns 200', async ({ page }) => {
  49 |     const response = await page.goto('/about');
  50 |     expect(response?.status()).toBe(200);
  51 |   });
  52 | 
  53 |   test('contact page returns 200', async ({ page }) => {
  54 |     const response = await page.goto('/contact');
  55 |     expect(response?.status()).toBe(200);
  56 |   });
  57 | 
  58 |   test('robots.txt is accessible', async ({ page }) => {
  59 |     const response = await page.goto('/robots.txt');
  60 |     expect(response?.status()).toBe(200);
  61 |   });
  62 | 
  63 |   test('sitemap.xml is accessible', async ({ page }) => {
  64 |     const response = await page.goto('/sitemap.xml');
  65 |     expect(response?.status()).toBe(200);
  66 |   });
  67 | 
  68 |   test('404 page returns correct status for unknown route', async ({ page }) => {
> 69 |     const response = await page.goto('/nonexistent-route-smoke-test');
     |                                 ^ Error: page.goto: Test timeout of 60000ms exceeded.
  70 |     expect(response?.status()).toBe(404);
  71 |   });
  72 | });
  73 | 
```