'use client';

import { useEffect } from 'react';

interface Props {
  scope: string;
}

// Registers the shared /sw.js worker scoped to a single tenant's public page, so each
// tarjeta/landing/portafolio/cv installs as its own isolated PWA on the same origin.
export function PwaInstallRegister({ scope }: Props) {
  useEffect(() => {
    if (typeof navigator === 'undefined' || !('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('/sw.js', { scope }).catch(() => {});
  }, [scope]);

  return null;
}
