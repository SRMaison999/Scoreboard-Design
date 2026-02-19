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
  onSetFontSize: vi.fn(),
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

  it('affiche un titre de hint quand isGlobal est true', () => {
    render(<FieldFontToolbar {...defaultProps} isGlobal={true} />);
    const sizeLabel = screen.getByTestId('font-size-display');
    expect(sizeLabel.title).toBe(CUSTOM_FIELD_LABELS.fontToolbarGlobalHint);
  });

  it('affiche le hint de saisie quand isGlobal est false', () => {
    render(<FieldFontToolbar {...defaultProps} isGlobal={false} />);
    const sizeLabel = screen.getByTestId('font-size-display');
    expect(sizeLabel.title).toBe(CUSTOM_FIELD_LABELS.fontToolbarClickToEdit);
  });

  it('arrondit la valeur affichée', () => {
    render(<FieldFontToolbar {...defaultProps} fontSize={24.7} />);
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('passe en mode saisie au clic sur la valeur', async () => {
    const user = userEvent.setup();
    render(<FieldFontToolbar {...defaultProps} />);

    await user.click(screen.getByTestId('font-size-display'));
    expect(screen.getByTestId('font-size-input')).toBeInTheDocument();
  });

  it('appelle onSetFontSize avec la valeur saisie au Enter', async () => {
    const onSetFontSize = vi.fn();
    const user = userEvent.setup();
    render(<FieldFontToolbar {...defaultProps} onSetFontSize={onSetFontSize} />);

    await user.click(screen.getByTestId('font-size-display'));
    const input = screen.getByTestId('font-size-input');
    await user.clear(input);
    await user.type(input, '48');
    await user.keyboard('{Enter}');

    expect(onSetFontSize).toHaveBeenCalledWith(48);
  });

  it('annule la saisie au Escape', async () => {
    const onSetFontSize = vi.fn();
    const user = userEvent.setup();
    render(<FieldFontToolbar {...defaultProps} onSetFontSize={onSetFontSize} />);

    await user.click(screen.getByTestId('font-size-display'));
    const input = screen.getByTestId('font-size-input');
    await user.click(input);
    await user.keyboard('{Escape}');

    expect(onSetFontSize).not.toHaveBeenCalled();
    expect(screen.queryByTestId('font-size-input')).not.toBeInTheDocument();
    expect(screen.getByTestId('font-size-display')).toBeInTheDocument();
  });
});
