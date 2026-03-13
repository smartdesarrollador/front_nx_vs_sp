import { renderHook } from '@testing-library/react';
import { useFeatureGate } from '@/hooks/useFeatureGate';

// Mock useAuthStore with selector pattern
jest.mock('@/store/authStore', () => ({
  useAuthStore: jest.fn(),
}));

import { useAuthStore } from '@/store/authStore';

function mockPlan(plan: string) {
  (useAuthStore as unknown as jest.Mock).mockImplementation(
    (selector: (s: { currentPlan: string }) => unknown) => selector({ currentPlan: plan }),
  );
}

describe('useFeatureGate', () => {
  describe('free plan', () => {
    beforeEach(() => mockPlan('free'));

    it('can access digitalCard', () => {
      const { result } = renderHook(() => useFeatureGate('digitalCard'));
      expect(result.current.canAccess).toBe(true);
    });

    it('cannot access landingPage', () => {
      const { result } = renderHook(() => useFeatureGate('landingPage'));
      expect(result.current.canAccess).toBe(false);
    });

    it('cannot access portfolio', () => {
      const { result } = renderHook(() => useFeatureGate('portfolio'));
      expect(result.current.canAccess).toBe(false);
    });

    it('can access cv', () => {
      const { result } = renderHook(() => useFeatureGate('cv'));
      expect(result.current.canAccess).toBe(true);
    });
  });

  describe('starter plan', () => {
    beforeEach(() => mockPlan('starter'));

    it('can access landingPage', () => {
      const { result } = renderHook(() => useFeatureGate('landingPage'));
      expect(result.current.canAccess).toBe(true);
    });

    it('cannot access portfolio', () => {
      const { result } = renderHook(() => useFeatureGate('portfolio'));
      expect(result.current.canAccess).toBe(false);
    });

    it('can access digitalCardVCard', () => {
      const { result } = renderHook(() => useFeatureGate('digitalCardVCard'));
      expect(result.current.canAccess).toBe(true);
    });
  });

  describe('professional plan', () => {
    beforeEach(() => mockPlan('professional'));

    it('can access portfolio', () => {
      const { result } = renderHook(() => useFeatureGate('portfolio'));
      expect(result.current.canAccess).toBe(true);
    });

    it('cannot access whiteLabel', () => {
      const { result } = renderHook(() => useFeatureGate('whiteLabel'));
      expect(result.current.canAccess).toBe(false);
    });

    it('can access customDomain', () => {
      const { result } = renderHook(() => useFeatureGate('customDomain'));
      expect(result.current.canAccess).toBe(true);
    });
  });

  describe('getRequiredPlan via requiredPlan return', () => {
    beforeEach(() => mockPlan('free'));

    it('returns starter as requiredPlan for landingPage', () => {
      const { result } = renderHook(() => useFeatureGate('landingPage'));
      expect(result.current.requiredPlan).toBe('starter');
    });

    it('returns professional as requiredPlan for portfolio', () => {
      const { result } = renderHook(() => useFeatureGate('portfolio'));
      expect(result.current.requiredPlan).toBe('professional');
    });

    it('returns free as requiredPlan for digitalCard', () => {
      const { result } = renderHook(() => useFeatureGate('digitalCard'));
      expect(result.current.requiredPlan).toBe('free');
    });

    it('returns enterprise as requiredPlan for whiteLabel', () => {
      const { result } = renderHook(() => useFeatureGate('whiteLabel'));
      expect(result.current.requiredPlan).toBe('enterprise');
    });
  });
});
