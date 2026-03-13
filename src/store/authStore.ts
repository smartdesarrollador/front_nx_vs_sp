import { create } from 'zustand';
import type { User, TokenResponse } from '@/types/auth';

type Plan = 'free' | 'starter' | 'professional' | 'enterprise';

function derivePlan(roles: string[]): Plan {
  const rolesStr = roles.join(' ').toLowerCase();
  if (rolesStr.includes('enterprise')) return 'enterprise';
  if (rolesStr.includes('professional')) return 'professional';
  if (rolesStr.includes('starter')) return 'starter';
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
      currentPlan: derivePlan(user.roles),
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
    set({ user, isAuthenticated: true, currentPlan: derivePlan(user.roles) }),
  setAccessToken: (token) => set({ accessToken: token }),
}));
