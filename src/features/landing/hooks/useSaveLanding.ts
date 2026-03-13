'use client';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient } from '@/lib/api';
import type { LandingFormState, LandingData } from '../types';

export function useSaveLanding() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (payload: LandingFormState) =>
      apiClient.post<LandingData>('/app/digital/landing/', payload).then((r) => r.data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['landing-template'] });
      qc.invalidateQueries({ queryKey: ['digital-profile'] });
    },
  });
}
