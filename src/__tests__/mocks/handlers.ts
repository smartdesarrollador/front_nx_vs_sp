import { http, HttpResponse } from 'msw';

const API = process.env.NEXT_PUBLIC_API_URL
  ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1`
  : 'http://localhost:8000/api/v1';

export const handlers = [
  http.post(`${API}/auth/sso/validate/`, () =>
    HttpResponse.json({
      access_token: 'test-access-token',
      refresh_token: 'test-refresh-token',
      user: {
        id: '1',
        email: 'test@example.com',
        first_name: 'Test',
        last_name: 'User',
        roles: [],
        permissions: [],
        tenant_slug: 'test-tenant',
      },
    }),
  ),
  http.get(`${API}/public/profiles/:username`, ({ params }) =>
    HttpResponse.json({
      profile: {
        username: params.username,
        display_name: 'Test User',
        title: 'Developer',
        bio: 'Bio text',
        avatar_url: '',
        is_public: true,
        meta_title: '',
        meta_description: '',
        og_image_url: '',
      },
      digital_card: null,
    }),
  ),
];
