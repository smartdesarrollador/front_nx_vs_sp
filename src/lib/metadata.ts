import type { Metadata } from 'next';

interface MetadataOptions {
  title: string;
  description: string;
  path?: string;
  image?: string;
}

const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3004';

export function buildMetadata({ title, description, path = '/', image }: MetadataOptions): Metadata {
  const url = `${APP_URL}${path}`;
  const ogImage = image ?? `${APP_URL}/og-default.png`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      images: [{ url: ogImage }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImage],
    },
  };
}
