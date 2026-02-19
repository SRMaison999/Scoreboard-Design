import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { FieldFontToolbar } from '../FieldFontToolbar';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

const defaultProps = {
  fontSize: 24,
  isGlobal: false,
  fieldX: 100,
  fieldY: 200,
  fieldWidth: 300,
  canvasScale: 0.5,
  onIncrease: vi.fn(),
  onDecrease: vi.fn(),
};

describe('FieldFontToolbar', () => {
  it('affiche la taille de police', () => {
    render(<FieldFontToolbar {...defaultProps} />);
    expect(screen.getByText('24')).toBeInTheDocument();
  });

  it('affiche le testid', () => {
    render(<FieldFontToolbar {...defaultProps} />);
    expect(screen.getByTestId('field-font-toolbar')).toBeInTheDocument();
  });

  it('appelle onIncrease au clic sur +', async () => {
    const onIncrease = vi.fn();
    const user = userEvent.setup();
    render(<FieldFontToolbar {...defaultProps} onIncrease={onIncrease} />);

    const btn = screen.getByTitle(CUSTOM_FIELD_LABELS.fontToolbarIncrease);
    await user.click(btn);
    expect(onIncrease).toHaveBeenCalledOnce();
  });

  it('appelle onDecrease au clic sur -', async () => {
    const onDecrease = vi.fn();
    const user = userEvent.setup();
    render(<FieldFontToolbar {...defaultProps} onDecrease={onDecrease} />);

    const btn = screen.getByTitle(CUSTOM_FIELD_LABELS.fontToolbarDecrease);
    await user.click(btn);
    expect(onDecrease).toHaveBeenCalledOnce();
  });

  it('affiche un titre de hint quand isGlobal est true', () => {
    render(<FieldFontToolbar {...defaultProps} isGlobal={true} />);
    const sizeLabel = screen.getByText('24');
    expect(sizeLabel.title).toBe(CUSTOM_FIELD_LABELS.fontToolbarGlobalHint);
  });

  it('n\'affiche pas de hint quand isGlobal est false', () => {
    render(<FieldFontToolbar {...defaultProps} isGlobal={false} />);
    const sizeLabel = screen.getByText('24');
    expect(sizeLabel.title).toBe('');
  });

  it('arrondit la valeur affichée', () => {
    render(<FieldFontToolbar {...defaultProps} fontSize={24.7} />);
    expect(screen.getByText('25')).toBeInTheDocument();
  });
});
