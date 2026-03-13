import { test, expect } from '@playwright/test';

const mockProfile = {
  username: 'testuser',
  display_name: 'Test User',
  title: 'Full Stack Developer',
  bio: 'Passionate developer',
  avatar_url: '',
  is_public: true,
  meta_title: 'Test User — Digital Card',
  meta_description: 'Test description',
  og_image_url: '',
};

test.describe('Public tarjeta page', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/v1/public/profiles/testuser/', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ profile: mockProfile, digital_card: null }),
      });
    });
  });

  test('renders display_name on public card page', async ({ page }) => {
    await page.goto('/es/tarjeta/testuser');
    await expect(page.getByText('Test User')).toBeVisible();
  });

  test('renders Vista Digital branding', async ({ page }) => {
    await page.goto('/es/tarjeta/testuser');
    await expect(page.getByText('Vista Digital')).toBeVisible();
  });

  test('renders title when present', async ({ page }) => {
    await page.goto('/es/tarjeta/testuser');
    await expect(page.getByText('Full Stack Developer')).toBeVisible();
  });

  test('contains JSON-LD structured data script', async ({ page }) => {
    await page.goto('/es/tarjeta/testuser');
    const jsonLd = await page.$('script[type="application/ld+json"]');
    expect(jsonLd).not.toBeNull();
  });
});
