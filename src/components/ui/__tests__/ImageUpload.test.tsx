import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ImageUpload } from '@/components/ui/ImageUpload';

describe('ImageUpload', () => {
  const defaultProps = {
    label: 'Photo du joueur',
    value: '',
    onUpload: vi.fn(),
    onRemove: vi.fn(),
  };

  it('affiche le label', () => {
    render(<ImageUpload {...defaultProps} />);
    expect(screen.getByText('Photo du joueur')).toBeInTheDocument();
  });

  it('affiche la zone de sélection quand pas de valeur', () => {
    render(<ImageUpload {...defaultProps} />);
    expect(screen.getByText('Choisir un fichier')).toBeInTheDocument();
  });

  it('affiche l\'aperçu et le bouton supprimer quand une valeur existe', () => {
    render(<ImageUpload {...defaultProps} value="data:image/png;base64,abc" />);
    expect(screen.getByAltText('Photo du joueur')).toBeInTheDocument();
    expect(screen.getByText('Supprimer')).toBeInTheDocument();
  });

  it('appelle onRemove quand on clique sur supprimer', async () => {
    const onRemove = vi.fn();
    const user = userEvent.setup();
    render(<ImageUpload {...defaultProps} value="data:image/png;base64,abc" onRemove={onRemove} />);
    await user.click(screen.getByText('Supprimer'));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });

  it('gère le drag over avec changement de style', () => {
    render(<ImageUpload {...defaultProps} />);
    const dropZone = screen.getByText('Choisir un fichier').closest('div')!;
    fireEvent.dragOver(dropZone, { dataTransfer: { files: [] } });
    expect(dropZone).toHaveClass('border-sky-400');
  });

  it('gère le drag leave', () => {
    render(<ImageUpload {...defaultProps} />);
    const dropZone = screen.getByText('Choisir un fichier').closest('div')!;
    fireEvent.dragOver(dropZone, { dataTransfer: { files: [] } });
    fireEvent.dragLeave(dropZone);
    expect(dropZone).not.toHaveClass('border-sky-400');
  });

  it('contient un input file caché', () => {
    render(<ImageUpload {...defaultProps} />);
    const input = document.querySelector('input[type="file"]');
    expect(input).toBeInTheDocument();
    expect(input).toHaveClass('hidden');
  });

  it('accepte le format par défaut', () => {
    render(<ImageUpload {...defaultProps} />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.accept).toBe('image/png,image/jpeg,image/webp');
  });

  it('accepte un format personnalisé', () => {
    render(<ImageUpload {...defaultProps} accept="video/mp4,video/webm" />);
    const input = document.querySelector('input[type="file"]') as HTMLInputElement;
    expect(input.accept).toBe('video/mp4,video/webm');
  });
});
