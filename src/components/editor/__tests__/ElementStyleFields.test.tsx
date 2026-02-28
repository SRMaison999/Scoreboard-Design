import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ElementStyleFields } from '@/components/editor/ElementStyleFields';

function renderFields(override = {}) {
  const props = {
    override,
    onSetFontSize: vi.fn(),
    onSetFontWeight: vi.fn(),
    onSetFontFamily: vi.fn(),
    onSetLetterSpacing: vi.fn(),
    onSetTextTransform: vi.fn(),
    onSetColor: vi.fn(),
    onSetOpacity: vi.fn(),
    onClearField: vi.fn(),
  };
  render(<ElementStyleFields {...props} />);
  return props;
}

describe('ElementStyleFields', () => {
  it('affiche tous les labels de champs', () => {
    renderFields();
    expect(screen.getByText('Taille (px)')).toBeInTheDocument();
    expect(screen.getByText('Graisse')).toBeInTheDocument();
    expect(screen.getByText('Police')).toBeInTheDocument();
    expect(screen.getByText('Espacement lettres')).toBeInTheDocument();
    expect(screen.getByText('Casse')).toBeInTheDocument();
    expect(screen.getByText('Couleur')).toBeInTheDocument();
  });

  it('appelle onSetFontSize au changement du champ taille', () => {
    const props = renderFields();
    const inputs = screen.getAllByRole('spinbutton');
    fireEvent.change(inputs[0]!, { target: { value: '24' } });
    expect(props.onSetFontSize).toHaveBeenCalledWith(24);
  });

  it('affiche le bouton X quand fontSize est d\u00e9fini', () => {
    renderFields({ fontSize: 24 });
    const buttons = screen.getAllByRole('button');
    expect(buttons.length).toBeGreaterThanOrEqual(1);
  });

  it('n\u2019affiche pas le bouton X quand fontSize est ind\u00e9fini', () => {
    renderFields();
    const buttons = screen.queryAllByRole('button');
    expect(buttons.length).toBe(0);
  });
});
