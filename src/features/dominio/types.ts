export type DomainVerificationStatus = 'pending' | 'verified' | 'failed';

export interface CustomDomainData {
  domain: string;
  verification_status: DomainVerificationStatus;
  verification_token: string;
  last_verification_attempt: string | null;
  ssl_status: string;
  ssl_cert_expires_at: string | null;
  default_service: string;
}

export interface DomainFormData {
  domain: string;
}
