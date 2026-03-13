'use client';

import { useAuthStore } from '@/store/authStore';
import {
  FEATURES_BY_PLAN,
  getRequiredPlan,
  type FeatureKey,
  type Plan,
} from '@/data/featureGates';

export function useFeatureGate(featureKey: FeatureKey) {
  const currentPlan = useAuthStore((s) => s.currentPlan) as Plan;
  const canAccess = FEATURES_BY_PLAN[currentPlan][featureKey] === true;
  const requiredPlan = getRequiredPlan(featureKey);
  return { canAccess, requiredPlan };
}
