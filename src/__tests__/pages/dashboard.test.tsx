import { render, screen } from '@testing-library/react';
import { ServiceGrid } from '@/components/dashboard/ServiceGrid';
import { useFeatureGate } from '@/hooks/useFeatureGate';
import { useServiceStatus } from '@/hooks/useServiceStatus';

jest.mock('@/hooks/useFeatureGate', () => ({
  useFeatureGate: jest.fn(),
}));

jest.mock('@/hooks/useServiceStatus', () => ({
  useServiceStatus: jest.fn(),
}));

// Mock UpgradePrompt to avoid store dependencies
jest.mock('@/components/shared/UpgradePrompt', () => ({
  UpgradePrompt: () => null,
}));

// Mock QuickStats for simplicity
jest.mock('@/components/dashboard/QuickStats', () => ({
  QuickStats: ({ activeCount }: { activeCount: number }) => (
    <div data-testid="quick-stats">Active: {activeCount}</div>
  ),
}));

const mockUseFeatureGate = useFeatureGate as jest.Mock;
const mockUseServiceStatus = useServiceStatus as jest.Mock;

beforeEach(() => {
  jest.clearAllMocks();
  mockUseFeatureGate.mockReturnValue({ canAccess: true, requiredPlan: 'free' });
  mockUseServiceStatus.mockReturnValue({ profile: null, isLoading: false });
});

describe('ServiceGrid', () => {
  it('renders all 4 service cards', () => {
    render(<ServiceGrid locale="es" />);
    expect(screen.getByText('Tarjeta Digital')).toBeInTheDocument();
    expect(screen.getByText('Landing Page')).toBeInTheDocument();
    expect(screen.getByText('Portafolio Digital')).toBeInTheDocument();
    expect(screen.getByText('CV Digital')).toBeInTheDocument();
  });

  it('shows loading skeleton when isLoading is true', () => {
    mockUseServiceStatus.mockReturnValue({ profile: null, isLoading: true });
    const { container } = render(<ServiceGrid locale="es" />);
    const skeletons = container.querySelectorAll('.animate-pulse');
    expect(skeletons.length).toBeGreaterThan(0);
  });

  it('shows locked card when canAccess is false for landingPage', () => {
    mockUseFeatureGate.mockImplementation((key: string) => ({
      canAccess: key !== 'landingPage',
      requiredPlan: key === 'landingPage' ? 'starter' : 'free',
    }));

    render(<ServiceGrid locale="es" />);

    // Locked card renders "Actualizar plan →" button
    expect(screen.getByText('Actualizar plan →')).toBeInTheDocument();
  });

  it('shows "Configurar →" link for accessible services', () => {
    render(<ServiceGrid locale="es" />);
    const configLinks = screen.getAllByText('Configurar →');
    expect(configLinks.length).toBeGreaterThan(0);
  });

  it('shows published status when profile has published services', () => {
    mockUseServiceStatus.mockReturnValue({
      profile: {
        username: 'test',
        display_name: 'Test',
        is_public: true,
        has_digital_card: true,
        has_landing: false,
        has_portfolio: false,
        has_cv: false,
        digital_card_published: true,
        landing_published: false,
        portfolio_published: false,
        cv_published: false,
      },
      isLoading: false,
    });

    render(<ServiceGrid locale="es" />);
    expect(screen.getByText('Publicado')).toBeInTheDocument();
  });
});
