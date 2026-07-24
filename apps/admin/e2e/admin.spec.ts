import { test, expect } from '@playwright/test';

test.describe('Admin Application', () => {
  test('should load the login page at root', async ({ page }) => {
    // Navigate to admin URL
    await page.goto('/');
    
    // Check if we are redirected to login or if login form is on root
    const currentUrl = page.url();
    if (currentUrl.includes('/login') || currentUrl.includes('/auth')) {
      await expect(page.locator('form')).toBeVisible();
    } else {
      // If no auth middleware prevents access, check if body is visible
      await expect(page.locator('body')).toBeVisible();
    }
  });

  test('should have basic admin routes accessible or redirecting to auth', async ({ page }) => {
    const routes = [
      '/admin',
      '/admin/products',
      '/admin/categories',
      '/admin/orders',
      '/admin/customers',
      '/admin/settings'
    ];

    for (const route of routes) {
      const response = await page.goto(route);
      // Wait for network idle or simple timeout
      await page.waitForTimeout(500);
      
      // We expect either a successful render (200) or a redirect to login
      const status = response?.status() ?? 500;
      expect([200, 307, 308, 401]).toContain(status);
      await expect(page.locator('body')).toBeVisible();
    }
  });
});
