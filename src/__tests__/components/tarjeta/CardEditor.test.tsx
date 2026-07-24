import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { CardEditor } from '@/features/tarjeta/components/CardEditor';
import { useSaveCard } from '@/features/tarjeta/hooks/useSaveCard';

jest.mock('@/features/tarjeta/hooks/useSaveCard', () => ({
  useSaveCard: jest.fn(),
}));

// CardEditor usa SingleImageField (useUploadImage → useMutation), así que necesita un QueryClient.
function renderCard() {
  const qc = new QueryClient({ defaultOptions: { mutations: { retry: false } } });
  return render(
    <QueryClientProvider client={qc}>
      <CardEditor data={null} onSaved={jest.fn()} />
    </QueryClientProvider>,
  );
}

const mockMutate = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  (useSaveCard as jest.Mock).mockReturnValue({
    mutate: mockMutate,
    isPending: false,
    error: null,
  });
});

describe('CardEditor', () => {
  it('renders all form sections', () => {
    renderCard();
    expect(screen.getByText('Perfil')).toBeInTheDocument();
    expect(screen.getByText('Contacto')).toBeInTheDocument();
    expect(screen.getByText('Redes Sociales')).toBeInTheDocument();
    expect(screen.getByText('Tema')).toBeInTheDocument();
  });

  it('calls mutate on valid form submission', async () => {
    renderCard();

    fireEvent.change(screen.getByPlaceholderText('ej: juan-perez'), {
      target: { value: 'john-doe' },
    });
    const nameInput = screen.getByPlaceholderText('Tu nombre');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const submitBtn = screen.getByRole('button', { name: /guardar cambios/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalled();
    });
  });

  it('shows URL validation error for invalid URL', async () => {
    renderCard();

    fireEvent.change(screen.getByPlaceholderText('ej: juan-perez'), {
      target: { value: 'john-doe' },
    });
    const nameInput = screen.getByPlaceholderText('Tu nombre');
    fireEvent.change(nameInput, { target: { value: 'John Doe' } });

    const linkedinInput = screen.getByPlaceholderText('https://linkedin.com/in/...');
    fireEvent.change(linkedinInput, { target: { value: 'not-a-valid-url' } });

    const submitBtn = screen.getByRole('button', { name: /guardar cambios/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getAllByText('URL inválida').length).toBeGreaterThan(0);
    });
    expect(mockMutate).not.toHaveBeenCalled();
  });

  it('disables submit button when isPending is true', () => {
    (useSaveCard as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
      error: null,
    });

    renderCard();

    const submitBtn = screen.getByRole('button', { name: /guardar cambios/i });
    expect(submitBtn).toBeDisabled();
  });

  it('shows spinner when isPending is true', () => {
    (useSaveCard as jest.Mock).mockReturnValue({
      mutate: mockMutate,
      isPending: true,
      error: null,
    });

    const { container } = renderCard();
    expect(container.querySelector('.animate-spin')).toBeInTheDocument();
  });

  it('shows required error when display_name is empty', async () => {
    renderCard();

    const submitBtn = screen.getByRole('button', { name: /guardar cambios/i });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(screen.getByText('Nombre requerido')).toBeInTheDocument();
    });
  });
});
