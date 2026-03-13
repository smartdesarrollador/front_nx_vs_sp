export interface User {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar?: string;
  roles: string[];
  permissions: string[];
  tenant_slug: string;
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
