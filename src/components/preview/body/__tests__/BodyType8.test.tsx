import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType8 } from '@/components/preview/body/BodyType8';
import { DEFAULT_FREE_TEXT_DATA } from '@/types/bodyTypes/freeText';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_FONT_SIZES } from '@/types/fontSizes';

const baseProps = {
  freeTextData: DEFAULT_FREE_TEXT_DATA,
  showPenalties: false,
  colors: DEFAULT_STATE.colors,
  opacities: DEFAULT_STATE.opacities,
  fontBody: DEFAULT_STATE.fontBody,
} as const;

describe('BodyType8', () => {
  it('affiche les lignes de texte', () => {
    render(<BodyType8 {...baseProps} />);
    expect(screen.getByText('BIENVENUE')).toBeInTheDocument();
    expect(screen.getByText('2026')).toBeInTheDocument();
  });

  it('affiche le texte avec la bonne taille de police', () => {
    render(<BodyType8 {...baseProps} />);
    const bienvenue = screen.getByText('BIENVENUE');
    expect(bienvenue.style.fontSize).toBe('60px');
  });

  it('applique le gras aux lignes concernées', () => {
    render(<BodyType8 {...baseProps} />);
    const bienvenue = screen.getByText('BIENVENUE');
    expect(bienvenue.style.fontWeight).toBe('700');
  });

  it('gère un texte vide', () => {
    const props = {
      ...baseProps,
      freeTextData: { lines: [] },
    };
    const { container } = render(<BodyType8 {...props} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('applique le body scale aux tailles de police', () => {
    const scaledFontSizes = { ...DEFAULT_FONT_SIZES, bodyScale8: 200 };
    render(<BodyType8 {...baseProps} fontSizes={scaledFontSizes} />);
    const bienvenue = screen.getByText('BIENVENUE');
    expect(bienvenue.style.fontSize).toBe('120px');
  });

  it('réduit les tailles avec un body scale inférieur à 100', () => {
    const scaledFontSizes = { ...DEFAULT_FONT_SIZES, bodyScale8: 50 };
    render(<BodyType8 {...baseProps} fontSizes={scaledFontSizes} />);
    const bienvenue = screen.getByText('BIENVENUE');
    expect(bienvenue.style.fontSize).toBe('30px');
  });
});
