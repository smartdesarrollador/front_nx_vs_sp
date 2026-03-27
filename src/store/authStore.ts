import { create } from 'zustand';
import type { User, TokenResponse } from '@/types/auth';

type Plan = 'free' | 'starter' | 'professional' | 'enterprise';

const VALID_PLANS: Plan[] = ['free', 'starter', 'professional', 'enterprise'];

function parsePlan(tenantPlan?: string): Plan {
  if (tenantPlan && (VALID_PLANS as string[]).includes(tenantPlan)) {
    return tenantPlan as Plan;
  }
  return 'free';
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  currentPlan: Plan;
  setAuth: (tokens: TokenResponse, user: User) => void;
  clearAuth: () => void;
  setUser: (user: User) => void;
  setAccessToken: (token: string) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,
  refreshToken: null,
  isAuthenticated: false,
  currentPlan: 'free',
  setAuth: (tokens, user) => {
    localStorage.setItem('refreshToken', tokens.refresh_token);
    set({
      user,
      accessToken: tokens.access_token,
      refreshToken: tokens.refresh_token,
      isAuthenticated: true,
      currentPlan: parsePlan(user.tenant_plan),
    });
  },
  clearAuth: () => {
    localStorage.removeItem('refreshToken');
    set({
      user: null,
      accessToken: null,
      refreshToken: null,
      isAuthenticated: false,
      currentPlan: 'free',
    });
  },
  setUser: (user) =>
    set({ user, isAuthenticated: true, currentPlan: parsePlan(user.tenant_plan) }),
  setAccessToken: (token) => set({ accessToken: token }),
}));
