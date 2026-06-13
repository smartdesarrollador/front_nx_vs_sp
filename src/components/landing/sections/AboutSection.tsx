import Image from 'next/image';
import { User, Check } from 'lucide-react';
import type { SectionProps } from '../PublicLandingView';

interface AboutContent {
  title?: string;
  text?: string;
  imageUrl?: string;
  layout?: 'image-left' | 'image-right';
  highlights?: string[];
  skills?: string[];
}

export function AboutSection({ content }: SectionProps) {
  const {
    title,
    text,
    imageUrl,
    layout = 'image-right',
    highlights = [],
    skills = [],
  } = content as AboutContent;

  return (
    <section id="about" className="max-w-5xl mx-auto px-4 py-16">
      {title && (
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-10 text-center">
          {title}
        </h2>
      )}
      <div
        className={`flex flex-col md:flex-row gap-12 items-center ${layout === 'image-left' ? 'md:flex-row-reverse' : ''}`}
      >
        {/* Imagen */}
        <div className="flex-shrink-0 w-full md:w-auto">
          {imageUrl ? (
            <div className="relative w-full max-w-sm mx-auto aspect-square rounded-2xl overflow-hidden shadow-xl">
              <Image src={imageUrl} alt="About" fill className="object-cover" />
            </div>
          ) : (
            <div className="w-full max-w-sm mx-auto aspect-square rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
              <User className="w-20 h-20 text-gray-300 dark:text-gray-600" />
            </div>
          )}
        </div>

        {/* Contenido */}
        <div className="flex-1 space-y-5">
          {text && (
            <div>
              <span className="block font-serif text-6xl text-primary-200 dark:text-primary-800 leading-none mb-2 select-none">
                "
              </span>
              <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed whitespace-pre-line">
                {text}
              </p>
            </div>
          )}

          {highlights.length > 0 && (
            <ul className="space-y-2 mt-4">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 dark:text-gray-300">{h}</span>
                </li>
              ))}
            </ul>
          )}

          {skills.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium border border-primary-100 dark:border-primary-800"
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
