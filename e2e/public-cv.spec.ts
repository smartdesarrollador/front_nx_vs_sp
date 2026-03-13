import { test, expect } from '@playwright/test';

const mockCV = {
  professional_summary: 'Experienced developer',
  experience: [{ company: 'Acme', role: 'Engineer', start_date: '2020', end_date: null, description: '' }],
  education: [{ institution: 'MIT', degree: 'BS', field: 'CS', start_date: '2015', end_date: '2019' }],
  skills: ['React', 'TypeScript'],
  languages: [{ name: 'English', level: 'Native' }],
  certifications: [],
  template_type: 'classic',
  show_photo: false,
  show_contact: true,
};

const mockProfile = {
  username: 'testuser',
  display_name: 'Jane Developer',
  title: 'Software Engineer',
  bio: 'Building great things',
  avatar_url: '',
  is_public: true,
  meta_title: '',
  meta_description: '',
  og_image_url: '',
};

test.describe('Public CV page', () => {
  test.beforeEach(async ({ page }) => {
    await page.route('**/api/v1/public/cv/testuser/', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ profile: mockProfile, cv: mockCV }),
      });
    });
  });

  test('renders display_name on CV page', async ({ page }) => {
    await page.goto('/es/cv/testuser');
    await expect(page.getByText('Jane Developer')).toBeVisible();
  });

  test('renders professional title', async ({ page }) => {
    await page.goto('/es/cv/testuser');
    await expect(page.getByText('Software Engineer')).toBeVisible();
  });

  test('has a print button visible', async ({ page }) => {
    await page.goto('/es/cv/testuser');
    const printBtn = page.getByRole('button', { name: /imprimir|print/i });
    await expect(printBtn).toBeVisible();
  });
});
