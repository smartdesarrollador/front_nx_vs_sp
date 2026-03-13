import { generateMetadata } from '@/app/[locale]/tarjeta/[username]/page';
import { getPublicProfile } from '@/lib/publicApi';

jest.mock('@/lib/publicApi', () => ({
  getPublicProfile: jest.fn(),
}));

// Mock next/navigation notFound
jest.mock('next/navigation', () => ({
  notFound: jest.fn(),
  useRouter: jest.fn(() => ({ replace: jest.fn(), push: jest.fn() })),
  useSearchParams: jest.fn(() => ({ get: jest.fn().mockReturnValue(null) })),
}));

// Mock buildPersonJsonLd
jest.mock('@/lib/seo', () => ({
  buildPersonJsonLd: jest.fn(() => ({ '@type': 'Person', name: 'Test' })),
}));

// Mock ThemeToggle
jest.mock('@/components/shared/ThemeToggle', () => ({
  ThemeToggle: () => null,
}));

const mockGetProfile = getPublicProfile as jest.Mock;

describe('generateMetadata', () => {
  it('returns title from meta_title when profile has meta_title', async () => {
    mockGetProfile.mockResolvedValueOnce({
      profile: {
        username: 'testuser',
        display_name: 'Test User',
        title: 'Developer',
        bio: 'Bio',
        meta_title: 'Custom Meta Title',
        meta_description: 'Custom description',
        og_image_url: 'https://example.com/og.jpg',
      },
      digital_card: null,
    });

    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'es', username: 'testuser' }),
    });

    expect(metadata.title).toBe('Custom Meta Title');
  });

  it('returns fallback title when meta_title is empty', async () => {
    mockGetProfile.mockResolvedValueOnce({
      profile: {
        username: 'testuser',
        display_name: 'John Doe',
        title: 'Developer',
        bio: 'Bio',
        meta_title: '',
        meta_description: '',
        og_image_url: '',
      },
      digital_card: null,
    });

    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'es', username: 'testuser' }),
    });

    expect(metadata.title).toBe('John Doe — Vista Digital');
  });

  it('returns not-found title when profile is null', async () => {
    mockGetProfile.mockResolvedValueOnce(null);

    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'es', username: 'unknown' }),
    });

    expect(metadata.title).toBe('Tarjeta no encontrada');
  });

  it('populates openGraph images from og_image_url', async () => {
    mockGetProfile.mockResolvedValueOnce({
      profile: {
        username: 'testuser',
        display_name: 'Test',
        title: '',
        bio: '',
        meta_title: '',
        meta_description: '',
        og_image_url: 'https://example.com/og.jpg',
      },
      digital_card: null,
    });

    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'es', username: 'testuser' }),
    });

    const og = metadata.openGraph as { images: string[] };
    expect(og.images).toContain('https://example.com/og.jpg');
  });

  it('has empty openGraph images when og_image_url is empty', async () => {
    mockGetProfile.mockResolvedValueOnce({
      profile: {
        username: 'testuser',
        display_name: 'Test',
        title: '',
        bio: '',
        meta_title: '',
        meta_description: '',
        og_image_url: '',
      },
      digital_card: null,
    });

    const metadata = await generateMetadata({
      params: Promise.resolve({ locale: 'es', username: 'testuser' }),
    });

    const og = metadata.openGraph as { images: string[] };
    expect(og.images).toHaveLength(0);
  });
});
