import '@testing-library/jest-dom';

// Mock next/navigation globally
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(() => ({ replace: jest.fn(), push: jest.fn() })),
  useSearchParams: jest.fn(() => ({ get: jest.fn().mockReturnValue(null) })),
  notFound: jest.fn(),
  redirect: jest.fn(),
}));

// Mock next-intl (useTranslations returns key as value)
jest.mock('next-intl', () => ({
  useTranslations: () => (key: string) => key,
}));
jest.mock('next-intl/server', () => ({
  getTranslations: () => Promise.resolve((key: string) => key),
}));

// Mock next/image as simple img element
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: { src: string; alt: string; [key: string]: unknown }) {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return require('react').createElement('img', { src: props.src, alt: props.alt });
  },
}));

// ResizeObserver (for components that use it)
globalThis.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};
