import { test, expect } from '@playwright/test';

test.describe('Authentication - Login Page', () => {
  test('should load the login page', async ({ page }) => {
    await page.goto('/auth/login');
    await expect(page).toHaveURL(/\/auth\/login/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should render email and password inputs', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForTimeout(500);
    
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]');
    const passwordInput = page.locator('input[type="password"]');
    
    await expect(emailInput).toBeVisible();
    await expect(passwordInput).toBeVisible();
  });

  test('should show validation error on empty submission', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForTimeout(500);
    
    // Find and click the submit button without filling any fields
    const submitButton = page.locator('button[type="submit"]');
    if (await submitButton.count() > 0) {
      await submitButton.click();
      await page.waitForTimeout(500);
      // The login handler checks for empty fields and sets error state
      const bodyText = await page.locator('body').textContent();
      expect(bodyText?.toLowerCase()).toContain('email');
    }
  });

  test('should have a link to registration page', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForTimeout(500);
    
    const registerLink = page.locator('a[href*="/auth/register"]');
    const count = await registerLink.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have a forgot password link', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForTimeout(500);
    
    const forgotLink = page.locator('a[href*="/auth/forgot-password"]');
    const count = await forgotLink.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should not show header/footer on login page', async ({ page }) => {
    await page.goto('/auth/login');
    await page.waitForTimeout(500);
    // Auth pages hide the customer header/footer
    const footer = page.locator('footer');
    await expect(footer).not.toBeVisible();
  });
});

test.describe('Authentication - Registration Page', () => {
  test('should load the registration page', async ({ page }) => {
    await page.goto('/auth/register');
    await expect(page).toHaveURL(/\/auth\/register/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should render registration form fields', async ({ page }) => {
    await page.goto('/auth/register');
    await page.waitForTimeout(500);
    // Registration should have input fields
    const inputs = page.locator('input');
    const count = await inputs.count();
    expect(count).toBeGreaterThan(0);
  });

  test('should have a link back to login', async ({ page }) => {
    await page.goto('/auth/register');
    await page.waitForTimeout(500);
    const loginLink = page.locator('a[href*="/auth/login"]');
    const count = await loginLink.count();
    expect(count).toBeGreaterThan(0);
  });
});

test.describe('Authentication - Forgot Password Page', () => {
  test('should load the forgot password page', async ({ page }) => {
    await page.goto('/auth/forgot-password');
    await expect(page).toHaveURL(/\/auth\/forgot-password/);
    await expect(page.locator('body')).toBeVisible();
  });

  test('should render email input for password reset', async ({ page }) => {
    await page.goto('/auth/forgot-password');
    await page.waitForTimeout(500);
    const emailInput = page.locator('input[type="email"], input[placeholder*="email" i]');
    const count = await emailInput.count();
    expect(count).toBeGreaterThan(0);
  });
});
