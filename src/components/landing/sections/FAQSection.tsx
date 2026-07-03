'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { SectionProps } from '../PublicLandingView';

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQContent {
  title?: string;
  items?: FAQItem[];
}

export function FAQSection({ content, styleTokens }: SectionProps) {
  const { title, items = [] } = content as FAQContent;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className={`bg-gray-50 dark:bg-gray-800/50 ${styleTokens.spacingSection}`}>
      <div className="max-w-3xl mx-auto px-4">
        {title && (
          <h2 className={`text-3xl ${styleTokens.headingFont} ${styleTokens.headingWeight} ${styleTokens.headingTracking} text-gray-900 dark:text-white mb-10 text-center`}>
            {title}
          </h2>
        )}
        {items.length === 0 ? (
          <p className="text-center text-gray-400">No hay preguntas configuradas</p>
        ) : (
          <div className="space-y-3">
            {items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div
                  key={i}
                  className={`bg-white dark:bg-gray-800 ${styleTokens.radiusCard} border border-gray-100 dark:border-gray-700 overflow-hidden`}
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    className="w-full flex items-center justify-between gap-4 px-6 py-4 text-left hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {item.question}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-96' : 'max-h-0'}`}
                  >
                    <p className="px-6 pb-5 text-gray-600 dark:text-gray-300 leading-relaxed">
                      {item.answer}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
