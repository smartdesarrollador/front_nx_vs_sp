import Image from 'next/image';
import { User } from 'lucide-react';
import type { SectionProps } from '../PublicLandingView';

interface AboutContent {
  title?: string;
  text?: string;
  imageUrl?: string;
  layout?: 'image-left' | 'image-right';
}

export function AboutSection({ content }: SectionProps) {
  const {
    title,
    text,
    imageUrl,
    layout = 'image-right',
  } = content as AboutContent;

  return (
    <section id="about" className="max-w-5xl mx-auto px-4 py-16">
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          {title}
        </h2>
      )}
      <div
        className={`flex flex-col md:flex-row gap-10 items-center ${layout === 'image-left' ? 'md:flex-row-reverse' : ''}`}
      >
        <div className="flex-1">
          {imageUrl ? (
            <div className="relative w-full aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden">
              <Image src={imageUrl} alt="About" fill className="object-cover" />
            </div>
          ) : (
            <div className="w-full max-w-sm mx-auto aspect-square rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <User className="w-20 h-20 text-gray-400" />
            </div>
          )}
        </div>
        {text && (
          <div className="flex-1">
            <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
              {text}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
