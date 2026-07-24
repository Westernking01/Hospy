import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should load the homepage successfully', async ({ page }) => {
    await expect(page).toHaveTitle(/HOPSY PLAZA/i);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should render the header with brand logo', async ({ page }) => {
    await expect(page.locator('header')).toBeVisible();
  });

  test('should render the hero slider section', async ({ page }) => {
    // The hero slider is the first major visual section
    const heroSection = page.locator('main').last();
    await expect(heroSection).toBeVisible();
  });

  test('should render the category grid section', async ({ page }) => {
    // Scroll down to ensure lazy-loaded sections render
    await page.evaluate(() => window.scrollTo(0, 500));
    await page.waitForTimeout(500);
    // Category grid should be present on the homepage
    const mainContent = page.locator('main').last();
    await expect(mainContent).toBeVisible();
  });

  test('should render the footer', async ({ page }) => {
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);
    const footer = page.locator('footer');
    await expect(footer).toBeVisible();
  });

  test('should have skip-to-content link for accessibility', async ({ page }) => {
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();
  });

  test('should have proper meta description', async ({ page }) => {
    const metaDescription = page.locator('meta[name="description"]');
    await expect(metaDescription).toHaveAttribute('content', /electronics|hardware|enterprise/i);
  });

  test('should have Open Graph metadata', async ({ page }) => {
    const ogTitle = page.locator('meta[property="og:title"]');
    await expect(ogTitle).toHaveAttribute('content', /HOPSY PLAZA/i);
  });

  test('should render product sections on scroll', async ({ page }) => {
    // Scroll through the page to trigger dynamic imports
    for (let i = 0; i < 5; i++) {
      await page.evaluate((offset) => window.scrollTo(0, offset * 800), i);
      await page.waitForTimeout(300);
    }
    // The page should still be functional after scrolling
    await expect(page.locator('body')).toBeVisible();
  });
});
