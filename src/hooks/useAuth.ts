'use client';

import { useAuthStore } from '@/store/authStore';

export function useAuth() {
  const user = useAuthStore((s) => s.user);
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const currentPlan = useAuthStore((s) => s.currentPlan);
  const clearAuth = useAuthStore((s) => s.clearAuth);

  return { user, isAuthenticated, currentPlan, clearAuth };
}
