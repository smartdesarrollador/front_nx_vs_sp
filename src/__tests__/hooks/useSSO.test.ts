import { renderHook, waitFor } from '@testing-library/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useSSO } from '@/hooks/useSSO';
import { publicClient } from '@/lib/api';
import { useAuthStore } from '@/store/authStore';

jest.mock('@/lib/api', () => ({
  publicClient: { post: jest.fn() },
  apiClient: { get: jest.fn(), post: jest.fn() },
  fetchApi: jest.fn(),
}));

jest.mock('@/store/authStore', () => ({
  useAuthStore: jest.fn(),
}));

const mockUser = {
  id: '1',
  email: 'test@example.com',
  first_name: 'Test',
  last_name: 'User',
  roles: [],
  permissions: [],
  tenant_slug: 'test-tenant',
};

const mockSetAuth = jest.fn();
const mockReplace = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useAuthStore as unknown as jest.Mock).mockImplementation(
    (selector: (s: { setAuth: jest.Mock }) => unknown) => selector({ setAuth: mockSetAuth }),
  );
  (useRouter as jest.Mock).mockReturnValue({ replace: mockReplace, push: jest.fn() });
});

describe('useSSO', () => {
  it('redirects to dashboard on successful SSO token validation', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (k: string) => (k === 'sso_token' ? 'valid-token' : null),
    });
    (publicClient.post as jest.Mock).mockResolvedValueOnce({
      data: { access_token: 'at', refresh_token: 'rt', user: mockUser },
    });

    const { result } = renderHook(() => useSSO('es'));

    await waitFor(() => {
      expect(mockReplace).toHaveBeenCalledWith('/es/dashboard');
    });
    expect(result.current.error).toBeNull();
    expect(mockSetAuth).toHaveBeenCalledWith(
      { access_token: 'at', refresh_token: 'rt' },
      mockUser,
    );
  });

  it('sets error when sso_token is missing from URL', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: () => null,
    });

    const { result } = renderHook(() => useSSO('es'));

    await waitFor(() => {
      expect(result.current.error).toBe('Token SSO no encontrado en la URL.');
    });
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('sets error when API returns error (invalid token)', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (k: string) => (k === 'sso_token' ? 'invalid-token' : null),
    });
    (publicClient.post as jest.Mock).mockRejectedValueOnce(new Error('400 Bad Request'));

    const { result } = renderHook(() => useSSO('es'));

    await waitFor(() => {
      expect(result.current.error).toBe(
        'El token SSO es inválido o ha expirado. Por favor, inicia sesión de nuevo.',
      );
    });
    expect(mockReplace).not.toHaveBeenCalled();
  });

  it('calls publicClient.post with the sso_token', async () => {
    (useSearchParams as jest.Mock).mockReturnValue({
      get: (k: string) => (k === 'sso_token' ? 'my-token-123' : null),
    });
    (publicClient.post as jest.Mock).mockResolvedValueOnce({
      data: { access_token: 'at', refresh_token: 'rt', user: mockUser },
    });

    renderHook(() => useSSO('en'));

    await waitFor(() => {
      expect(publicClient.post).toHaveBeenCalledWith('/auth/sso/validate/', {
        sso_token: 'my-token-123',
      });
    });
  });
});
