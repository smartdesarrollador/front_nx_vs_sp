export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
  tenant_id?: string;
  tenant_plan?: string;
  email_verified?: boolean;
  mfa_enabled?: boolean;
  created_at?: string;
}

export interface TenantBranding {
  id: string;
  name: string;
  subdomain: string;
  plan: string;
  logo_url?: string | null;
  favicon_url?: string | null;
}

export interface TokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface SSOValidateResponse extends TokenResponse {
  user: User;
}

export interface SSOValidateRequest {
  sso_token: string;
}
