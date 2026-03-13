'use client';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useSaveDomain } from '../hooks/useSaveDomain';
import type { DomainFormData } from '../types';

const DOMAIN_REGEX = /^([a-z0-9]+(-[a-z0-9]+)*\.)+[a-z]{2,}$/i;

const schema = z.object({
  domain: z.string().regex(DOMAIN_REGEX, 'Dominio inválido (ej: midominio.com)'),
});

interface Props {
  initialDomain?: string;
}

export function DomainForm({ initialDomain }: Props) {
  const { mutate, isPending, error } = useSaveDomain();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<DomainFormData>({
    resolver: zodResolver(schema),
    defaultValues: { domain: initialDomain ?? '' },
  });

  useEffect(() => {
    reset({ domain: initialDomain ?? '' });
  }, [initialDomain, reset]);

  const onSubmit = (data: DomainFormData) => {
    mutate(data);
  };

  const serverError =
    error instanceof Error ? error.message : error ? 'Error al guardar el dominio' : null;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label
          htmlFor="domain-input"
          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
        >
          Dominio personalizado
        </label>
        <div className="flex gap-2">
          <input
            id="domain-input"
            type="text"
            placeholder="midominio.com"
            {...register('domain')}
            disabled={isPending}
            className="flex-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-3 py-2 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60"
          />
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {isPending && (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8H4z"
                />
              </svg>
            )}
            Guardar
          </button>
        </div>
        {errors.domain && (
          <p className="mt-1 text-xs text-red-500">{errors.domain.message}</p>
        )}
        {serverError && (
          <p className="mt-1 text-xs text-red-500">{serverError}</p>
        )}
      </div>
    </form>
  );
}
