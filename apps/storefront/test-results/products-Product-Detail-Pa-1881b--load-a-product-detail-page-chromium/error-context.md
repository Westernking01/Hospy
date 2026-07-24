# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: products.spec.ts >> Product Detail Page >> should load a product detail page
- Location: e2e\products.spec.ts:38:7

# Error details

```
Test timeout of 60000ms exceeded.
```

```
Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
Call log:
  - navigating to "http://localhost:3000/products/apple-macbook-pro-16-m3-max", waiting until "load"

```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | 
  3  | test.describe('Products Page', () => {
  4  |   test('should load the products listing page', async ({ page }) => {
  5  |     await page.goto('/products');
  6  |     await expect(page).toHaveURL(/\/products/);
  7  |     await expect(page.locator('body')).toBeVisible();
  8  |   });
  9  | 
  10 |   test('should display product cards in a grid', async ({ page }) => {
  11 |     await page.goto('/products');
  12 |     // Wait for the client-side rendering to complete
  13 |     await page.waitForTimeout(1000);
  14 |     // Products page uses ShopProductCard components
  15 |     const productLinks = page.locator('a[href*="/products/"]');
  16 |     // There should be at least one product visible
  17 |     const count = await productLinks.count();
  18 |     expect(count).toBeGreaterThan(0);
  19 |   });
  20 | 
  21 |   test('should have filter controls', async ({ page }) => {
  22 |     await page.goto('/products');
  23 |     await page.waitForTimeout(500);
  24 |     // The shop page has category filter, price range, brand filter, and sort controls
  25 |     const body = page.locator('body');
  26 |     await expect(body).toBeVisible();
  27 |   });
  28 | 
  29 |   test('should have view mode toggle (grid/list)', async ({ page }) => {
  30 |     await page.goto('/products');
  31 |     await page.waitForTimeout(500);
  32 |     // Page should render without errors
  33 |     await expect(page.locator('main').last()).toBeVisible();
  34 |   });
  35 | });
  36 | 
  37 | test.describe('Product Detail Page', () => {
  38 |   test('should load a product detail page', async ({ page }) => {
  39 |     // First visit products page to find a product link
  40 |     await page.goto('/products');
  41 |     await page.waitForTimeout(1000);
  42 |     
  43 |     const productLink = page.locator('a[href*="/products/"]').first();
  44 |     const linkCount = await productLink.count();
  45 |     
  46 |     if (linkCount > 0) {
  47 |       const href = await productLink.getAttribute('href');
  48 |       if (href) {
> 49 |         await page.goto(href);
     |                    ^ Error: page.goto: net::ERR_ABORTED; maybe frame was detached?
  50 |         await page.waitForTimeout(500);
  51 |         await expect(page.locator('body')).toBeVisible();
  52 |       }
  53 |     }
  54 |   });
  55 | });
  56 | 
```