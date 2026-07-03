import {
  Link2,
  Youtube,
  Twitch,
  Music2,
  Podcast,
  CalendarDays,
  Store,
  Gift,
  Video,
  Newspaper,
  Users,
  Star,
  type LucideIcon,
} from 'lucide-react';

export const CUSTOM_LINK_ICONS: Record<string, LucideIcon> = {
  link: Link2,
  youtube: Youtube,
  twitch: Twitch,
  music: Music2,
  podcast: Podcast,
  calendar: CalendarDays,
  store: Store,
  gift: Gift,
  video: Video,
  newspaper: Newspaper,
  users: Users,
  star: Star,
};

export type CustomLinkIconKey = keyof typeof CUSTOM_LINK_ICONS;

export const CUSTOM_LINK_ICON_OPTIONS: { key: CustomLinkIconKey; label: string }[] = [
  { key: 'link', label: 'Enlace' },
  { key: 'youtube', label: 'YouTube' },
  { key: 'twitch', label: 'Twitch' },
  { key: 'music', label: 'Música' },
  { key: 'podcast', label: 'Podcast' },
  { key: 'calendar', label: 'Agenda' },
  { key: 'store', label: 'Tienda' },
  { key: 'gift', label: 'Donación' },
  { key: 'video', label: 'Video' },
  { key: 'newspaper', label: 'Blog' },
  { key: 'users', label: 'Comunidad' },
  { key: 'star', label: 'Destacado' },
];

export const DEFAULT_CUSTOM_LINK_ICON: CustomLinkIconKey = 'link';
