'use client';

interface MobileOverlayProps {
  onClose: () => void;
}

export function MobileOverlay({ onClose }: MobileOverlayProps) {
  return (
    <div
      className="fixed inset-0 z-30 bg-black/50 md:hidden"
      onClick={onClose}
      aria-hidden="true"
    />
  );
}
