import axios from 'axios';
import type { AxiosRequestConfig, AxiosResponse } from 'axios';
import { useAuthStore } from '@/store/authStore';

const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL ?? ''}/api/v1`;

// --- fetchApi: for Server Components (RSC / ISR) ---

export async function fetchApi<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });

  if (!res.ok) {
    throw new Error(`API error ${res.status}: ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}

// --- Axios clients for Client Components ---

export const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
});

export const publicClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10_000,
});

// --- Refresh token queue logic ---

let isRefreshing = false;
type QueueItem = { resolve: (token: string) => void; reject: (err: unknown) => void };
let failedQueue: QueueItem[] = [];

function processQueue(error: unknown, token: string | null = null) {
  for (const item of failedQueue) {
    if (error) {
      item.reject(error);
    } else {
      item.resolve(token!);
    }
  }
  failedQueue = [];
}

// --- Request interceptor: inject Bearer token ---

apiClient.interceptors.request.use((config) => {
  const { accessToken } = useAuthStore.getState();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

// --- Response interceptor: handle 401 and refresh ---

interface RetryConfig extends AxiosRequestConfig {
  _retry?: boolean;
}

const HUB_URL = process.env.NEXT_PUBLIC_HUB_URL ?? 'http://localhost:3003';

apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: unknown) => {
    if (!axios.isAxiosError(error)) return Promise.reject(error);

    const orig = error.config as RetryConfig | undefined;
    if (!orig) return Promise.reject(error);

    if (error.response?.status !== 401 || orig._retry) {
      return Promise.reject(error);
    }

    if (isRefreshing) {
      return new Promise<string>((resolve, reject) => {
        failedQueue.push({ resolve, reject });
      }).then((token) => {
        orig.headers = orig.headers ?? {};
        orig.headers['Authorization'] = `Bearer ${token}`;
        return apiClient(orig);
      });
    }

    orig._retry = true;
    isRefreshing = true;

    const refresh = localStorage.getItem('refreshToken');
    if (!refresh) {
      useAuthStore.getState().clearAuth();
      processQueue(error, null);
      isRefreshing = false;
      window.location.href = `${HUB_URL}/login?next=vista`;
      return Promise.reject(error);
    }

    try {
      const { data } = await publicClient.post<{ access_token: string; refresh_token: string }>(
        '/auth/refresh-token',
        { refresh_token: refresh },
      );
      useAuthStore.getState().setAccessToken(data.access_token);
      localStorage.setItem('refreshToken', data.refresh_token);
      processQueue(null, data.access_token);
      orig.headers = orig.headers ?? {};
      orig.headers['Authorization'] = `Bearer ${data.access_token}`;
      return apiClient(orig);
    } catch (err) {
      processQueue(err, null);
      useAuthStore.getState().clearAuth();
      window.location.href = `${HUB_URL}/login?next=vista`;
      return Promise.reject(err);
    } finally {
      isRefreshing = false;
    }
  },
);
