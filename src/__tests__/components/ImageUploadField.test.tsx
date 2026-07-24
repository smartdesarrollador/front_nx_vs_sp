import { render, screen, fireEvent } from '@testing-library/react';
import { SingleImageField } from '@/features/portfolio/components/ImageUploadField';

// Controla la mutación de subida para simular éxito / 402 sin red.
jest.mock('@/hooks/useUploadImage', () => ({ useUploadImage: jest.fn() }));
import { useUploadImage } from '@/hooks/useUploadImage';

const mockUseUploadImage = useUploadImage as jest.Mock;

type MutateOpts = {
  onSuccess?: (d: { url: string }) => void;
  onError?: (e: unknown) => void;
};

function mockUpload(behavior: (opts: MutateOpts) => void) {
  mockUseUploadImage.mockReturnValue({
    isPending: false,
    mutate: (_vars: unknown, opts: MutateOpts) => behavior(opts),
  });
}

const PNG = new File(['x'], 'foto.png', { type: 'image/png' });

describe('SingleImageField upload', () => {
  beforeEach(() => jest.clearAllMocks());

  it('keeps the URL fallback input', () => {
    mockUpload(() => {});
    render(<SingleImageField label="Avatar" value="" onChange={jest.fn()} slot="avatar" />);
    expect(screen.getByPlaceholderText(/https:\/\//)).toBeInTheDocument();
  });

  it('calls onChange with the uploaded url on success', () => {
    mockUpload((opts) => opts.onSuccess?.({ url: 'http://api/media/x.png' }));
    const onChange = jest.fn();
    render(<SingleImageField label="Avatar" value="" onChange={onChange} slot="avatar" />);

    fireEvent.change(screen.getByTestId('upload-input-avatar'), { target: { files: [PNG] } });

    expect(onChange).toHaveBeenCalledWith('http://api/media/x.png');
  });

  it('shows the backend message and an upgrade CTA on 402', () => {
    mockUpload((opts) =>
      opts.onError?.({ response: { status: 402, data: { error: { message: 'Sin cuota' } } } }),
    );
    render(<SingleImageField label="Avatar" value="" onChange={jest.fn()} slot="avatar" />);

    fireEvent.change(screen.getByTestId('upload-input-avatar'), { target: { files: [PNG] } });

    expect(screen.getByText('Sin cuota')).toBeInTheDocument();
    expect(screen.getByText('Mejorar plan')).toBeInTheDocument();
  });
});
