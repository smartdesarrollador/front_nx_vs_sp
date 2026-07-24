import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createElement, type ReactNode } from 'react';
import { useUploadImage } from '@/hooks/useUploadImage';

jest.mock('@/lib/api', () => ({ apiClient: { post: jest.fn() } }));
import { apiClient } from '@/lib/api';

const mockPost = apiClient.post as jest.Mock;

function wrapper({ children }: { children: ReactNode }) {
  const qc = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return createElement(QueryClientProvider, { client: qc }, children);
}

describe('useUploadImage', () => {
  beforeEach(() => jest.clearAllMocks());

  it('posts FormData with file + slot and returns the uploaded asset', async () => {
    mockPost.mockResolvedValue({
      data: { id: 'a1', url: 'http://api/media/digital_assets/x.png', size: 1234, slot: 'avatar' },
    });
    const { result } = renderHook(() => useUploadImage(), { wrapper });

    const file = new File(['x'], 'foto.png', { type: 'image/png' });
    const data = await result.current.mutateAsync({ file, slot: 'avatar' });

    expect(data.url).toBe('http://api/media/digital_assets/x.png');
    const [url, body] = mockPost.mock.calls[0];
    expect(url).toBe('/app/digital/assets/');
    expect(body).toBeInstanceOf(FormData);
    expect((body as FormData).get('slot')).toBe('avatar');
    expect((body as FormData).get('file')).toBe(file);
  });

  it('propagates a 402 error (quota / plan exceeded)', async () => {
    mockPost.mockRejectedValue({
      response: { status: 402, data: { error: { message: 'Sin cuota' } } },
    });
    const { result } = renderHook(() => useUploadImage(), { wrapper });

    await expect(
      result.current.mutateAsync({ file: new File(['x'], 'a.png'), slot: 'avatar' }),
    ).rejects.toMatchObject({ response: { status: 402 } });

    await waitFor(() => expect(result.current.isError).toBe(true));
  });
});
