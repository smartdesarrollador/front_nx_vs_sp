'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Calendar, Briefcase, Users, Heart, Shield, Star, Award,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import type { SectionProps } from '../PublicLandingView';

interface StatItem {
  icon?: string;
  value: string;
  label: string;
}

interface StatsContent {
  title?: string;
  items?: StatItem[];
}

const ICON_MAP: Record<string, LucideIcon> = {
  calendar: Calendar, briefcase: Briefcase, users: Users,
  heart: Heart, shield: Shield, star: Star, award: Award,
};

function getStatsBg(templateType: string): string {
  switch (templateType) {
    case 'creative':
      return 'bg-gradient-to-r from-purple-600 to-blue-600 text-white';
    case 'corporate':
      return 'bg-gray-800 text-white';
    default:
      return 'bg-primary-600 text-white';
  }
}

function parseNumeric(value: string): { num: number; prefix: string; suffix: string } | null {
  const match = /([\d,]+)/.exec(value);
  if (!match) return null;
  const num = parseInt(match[1].replace(',', ''), 10);
  if (isNaN(num)) return null;
  const idx = value.indexOf(match[1]);
  return {
    num,
    prefix: value.slice(0, idx),
    suffix: value.slice(idx + match[1].length),
  };
}

function AnimatedStat({ value, label, IconComp }: { value: string; label: string; IconComp: LucideIcon }) {
  const parsed = parseNumeric(value);
  const [displayed, setDisplayed] = useState(parsed ? 0 : null);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    if (!parsed || animated.current) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || animated.current) return;
        animated.current = true;
        const start = performance.now();
        const duration = 1500;
        const tick = (now: number) => {
          const elapsed = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - elapsed, 3);
          setDisplayed(Math.round(eased * parsed.num));
          if (elapsed < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [parsed]);

  const displayValue =
    parsed && displayed !== null
      ? `${parsed.prefix}${displayed.toLocaleString('es')}${parsed.suffix}`
      : value;

  return (
    <div ref={ref} className="flex flex-col items-center text-center gap-2 px-4">
      <IconComp className="w-7 h-7 opacity-80" />
      <p className="text-4xl md:text-5xl font-extrabold tracking-tight">{displayValue}</p>
      <p className="text-sm opacity-75 font-medium uppercase tracking-wide">{label}</p>
    </div>
  );
}

function getGridCols(count: number): string {
  if (count <= 2) return 'grid-cols-2';
  if (count === 3) return 'grid-cols-3';
  return 'grid-cols-2 sm:grid-cols-4';
}

export function StatsSection({ content, templateType, accentColor }: SectionProps) {
  const { title, items = [] } = content as StatsContent;
  const bgClass = getStatsBg(templateType);

  return (
    <section
      className={`py-16 px-4 ${bgClass}`}
      style={accentColor && !['creative', 'corporate'].includes(templateType) ? { background: accentColor } : undefined}
    >
      <div className="max-w-5xl mx-auto">
        {title && (
          <h2 className="text-3xl font-bold mb-10 text-center">{title}</h2>
        )}
        <div className={`grid ${getGridCols(items.length)} gap-8 divide-x divide-white/20`}>
          {items.map((item, i) => {
            const IconComp = (item.icon && ICON_MAP[item.icon.toLowerCase()]) || Star;
            return <AnimatedStat key={i} value={item.value} label={item.label} IconComp={IconComp} />;
          })}
        </div>
      </div>
    </section>
  );
}
