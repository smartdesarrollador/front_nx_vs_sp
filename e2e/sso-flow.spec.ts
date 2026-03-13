import { test, expect } from '@playwright/test';

test.describe('SSO flow', () => {
  test('redirects to dashboard when valid sso_token is provided', async ({ page }) => {
    // Mock the SSO validate endpoint
    await page.route('**/api/v1/auth/sso/validate/', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'test-access-token',
          refresh_token: 'test-refresh-token',
          user: {
            id: '1',
            email: 'test@example.com',
            first_name: 'Test',
            last_name: 'User',
            roles: [],
            permissions: [],
            tenant_slug: 'test-tenant',
          },
        }),
      });
    });

    // Mock token refresh to prevent redirect to hub
    await page.route('**/api/v1/auth/token/refresh/', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          access_token: 'test-access-token',
          refresh_token: 'test-refresh-token',
        }),
      });
    });

    await page.goto('/es/sso?sso_token=valid-test-token');

    // Should redirect to dashboard
    await expect(page).toHaveURL(/\/es\/dashboard/, { timeout: 10_000 });
  });

  test('shows error message when sso_token is missing', async ({ page }) => {
    await page.goto('/es/sso');
    // Should show error about missing token
    await expect(page.getByText(/token sso no encontrado/i)).toBeVisible({ timeout: 5_000 });
  });

  test('shows error when token is invalid', async ({ page }) => {
    await page.route('**/api/v1/auth/sso/validate/', async (route) => {
      await route.fulfill({
        status: 400,
        contentType: 'application/json',
        body: JSON.stringify({ error: 'Invalid token' }),
      });
    });

    await page.goto('/es/sso?sso_token=invalid-token');

    await expect(page.getByText(/inválido o ha expirado/i)).toBeVisible({ timeout: 5_000 });
  });
});
