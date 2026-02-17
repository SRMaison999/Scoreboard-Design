import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { FieldElementRenderer } from '../FieldElementRenderer';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_COLORS, DEFAULT_OPACITIES } from '@/constants/colors';
import type { FieldElementConfig } from '@/types/customField';

const defaultProps = {
  state: DEFAULT_STATE,
  colors: DEFAULT_COLORS,
  opacities: DEFAULT_OPACITIES,
  width: 200,
  height: 100,
};

describe('FieldElementRenderer', () => {
  it('rend un text-block avec son contenu', () => {
    const element: FieldElementConfig = {
      type: 'text-block',
      config: { content: 'Mon texte', fontSize: 24, fontWeight: 600, textAlign: 'center', textTransform: 'none', letterSpacing: 0 },
    };
    render(<FieldElementRenderer element={element} {...defaultProps} />);
    expect(screen.getByText('Mon texte')).toBeInTheDocument();
  });

  it('rend un score-display avec le score de l\'état', () => {
    const element: FieldElementConfig = {
      type: 'score-display',
      config: { side: 'left', showLabel: false },
    };
    render(<FieldElementRenderer element={element} {...defaultProps} />);
    expect(screen.getByText(DEFAULT_STATE.score1)).toBeInTheDocument();
  });

  it('rend un score-display côté droit', () => {
    const element: FieldElementConfig = {
      type: 'score-display',
      config: { side: 'right', showLabel: false },
    };
    render(<FieldElementRenderer element={element} {...defaultProps} />);
    expect(screen.getByText(DEFAULT_STATE.score2)).toBeInTheDocument();
  });

  it('rend un clock-display avec le temps', () => {
    const element: FieldElementConfig = {
      type: 'clock-display',
      config: { showPeriod: true, showBox: false },
    };
    render(<FieldElementRenderer element={element} {...defaultProps} />);
    expect(screen.getByText(DEFAULT_STATE.time)).toBeInTheDocument();
  });

  it('rend un period-display avec la période', () => {
    const element: FieldElementConfig = {
      type: 'period-display',
      config: {},
    };
    render(<FieldElementRenderer element={element} {...defaultProps} />);
    expect(screen.getByText(DEFAULT_STATE.period)).toBeInTheDocument();
  });

  it('rend un team-name côté gauche', () => {
    const element: FieldElementConfig = {
      type: 'team-name',
      config: { side: 'left', showFlag: true },
    };
    render(<FieldElementRenderer element={element} {...defaultProps} />);
    expect(screen.getByText(DEFAULT_STATE.team1)).toBeInTheDocument();
  });

  it('rend un team-name côté droit', () => {
    const element: FieldElementConfig = {
      type: 'team-name',
      config: { side: 'right', showFlag: true },
    };
    render(<FieldElementRenderer element={element} {...defaultProps} />);
    expect(screen.getByText(DEFAULT_STATE.team2)).toBeInTheDocument();
  });

  it('rend un image-block placeholder quand pas de src', () => {
    const element: FieldElementConfig = {
      type: 'image-block',
      config: { src: '', objectFit: 'cover' },
    };
    render(<FieldElementRenderer element={element} {...defaultProps} />);
    expect(screen.getByText('Image')).toBeInTheDocument();
  });

  it('rend un placeholder pour un type non implémenté', () => {
    const element: FieldElementConfig = {
      type: 'flag-display',
      config: { side: 'left' },
    };
    render(<FieldElementRenderer element={element} {...defaultProps} />);
    expect(screen.getByText('flag-display')).toBeInTheDocument();
  });

  it('rend un shape-block sans erreur', () => {
    const element: FieldElementConfig = {
      type: 'shape-block',
      config: { shape: 'rectangle', fillColor: '#ff0000', fillOpacity: 80, borderColor: '', borderWidth: 0, borderRadius: 0 },
    };
    const { container } = render(<FieldElementRenderer element={element} {...defaultProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });

  it('rend un separator-line sans erreur', () => {
    const element: FieldElementConfig = {
      type: 'separator-line',
      config: { orientation: 'horizontal', thickness: 2, lineColor: '#ffffff', lineOpacity: 50 },
    };
    const { container } = render(<FieldElementRenderer element={element} {...defaultProps} />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
