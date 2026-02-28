import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { StyleOverridePanel } from '@/components/editor/StyleOverridePanel';

const ROLES = [
  { role: 'title', label: 'Titre' },
  { role: 'value', label: 'Valeur' },
  { role: 'label', label: 'Label' },
];

describe('StyleOverridePanel', () => {
  it('affiche la section avec le titre', () => {
    const onUpdate = vi.fn();
    render(<StyleOverridePanel roles={ROLES} overrides={{}} onUpdate={onUpdate} />);
    expect(screen.getByText('Style par \u00e9l\u00e9ment')).toBeInTheDocument();
  });

  it('affiche tous les r\u00f4les', () => {
    const onUpdate = vi.fn();
    render(<StyleOverridePanel roles={ROLES} overrides={{}} onUpdate={onUpdate} />);
    expect(screen.getByText('Titre')).toBeInTheDocument();
    expect(screen.getByText('Valeur')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
  });

  it('affiche un badge quand un r\u00f4le a des surcharges', () => {
    const onUpdate = vi.fn();
    const overrides = { title: { fontSize: 30 } };
    render(<StyleOverridePanel roles={ROLES} overrides={overrides} onUpdate={onUpdate} />);
    expect(screen.getByText('Personnaliser')).toBeInTheDocument();
  });

  it('n\u2019affiche pas de badge sans surcharges', () => {
    const onUpdate = vi.fn();
    render(<StyleOverridePanel roles={ROLES} overrides={{}} onUpdate={onUpdate} />);
    expect(screen.queryByText('Personnaliser')).not.toBeInTheDocument();
  });

  it('affiche les champs de style au clic sur un r\u00f4le', () => {
    const onUpdate = vi.fn();
    render(<StyleOverridePanel roles={ROLES} overrides={{}} onUpdate={onUpdate} />);
    fireEvent.click(screen.getByText('Titre'));
    expect(screen.getByText('Taille (px)')).toBeInTheDocument();
    expect(screen.getByText('Graisse')).toBeInTheDocument();
  });

  it('masque les champs de style au second clic', () => {
    const onUpdate = vi.fn();
    render(<StyleOverridePanel roles={ROLES} overrides={{}} onUpdate={onUpdate} />);
    fireEvent.click(screen.getByText('Titre'));
    expect(screen.getByText('Taille (px)')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Titre'));
    expect(screen.queryByText('Taille (px)')).not.toBeInTheDocument();
  });
});
