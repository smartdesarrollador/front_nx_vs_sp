'use client';
import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

interface Props {
  images: string[];
  projectTitle: string;
}

export function ImageGallery({ images, projectTitle }: Props) {
  const t = useTranslations('portfolio');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const close = useCallback(() => setActiveIndex(null), []);

  const prev = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i - 1 + images.length) % images.length));
  }, [images.length]);

  const next = useCallback(() => {
    setActiveIndex((i) => (i === null ? null : (i + 1) % images.length));
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [activeIndex, close, prev, next]);

  return (
    <>
      {/* Thumbnail grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((src, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className="relative aspect-square rounded-lg overflow-hidden cursor-pointer hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary-500"
            aria-label={`${projectTitle} — imagen ${index + 1}`}
          >
            <Image
              src={src}
              alt={`${projectTitle} — imagen ${index + 1}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
          </button>
        ))}
      </div>

      {/* Lightbox */}
      {activeIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t('gallery')}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={close}
        >
          {/* Close button */}
          <button
            onClick={close}
            className="absolute top-4 right-4 p-2 text-white/80 hover:text-white bg-white/10 rounded-lg transition-colors"
            aria-label={t('closeGallery')}
          >
            <X size={24} />
          </button>

          {/* Prev button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 p-2 text-white/80 hover:text-white bg-white/10 rounded-lg transition-colors"
              aria-label={t('previousImage')}
            >
              <ChevronLeft size={32} />
            </button>
          )}

          {/* Main image */}
          <div
            className="relative max-w-[90vw] max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
            style={{ width: '90vw', height: '90vh' }}
          >
            <Image
              src={images[activeIndex]}
              alt={`${projectTitle} — imagen ${activeIndex + 1}`}
              fill
              className="object-contain"
              sizes="90vw"
              priority
            />
          </div>

          {/* Next button */}
          {images.length > 1 && (
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 p-2 text-white/80 hover:text-white bg-white/10 rounded-lg transition-colors"
              aria-label={t('nextImage')}
            >
              <ChevronRight size={32} />
            </button>
          )}

          {/* Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm">
            {activeIndex + 1} / {images.length}
          </div>
        </div>
      )}
    </>
  );
}
