import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { StaticField, GridOverlay } from '../BodyType14Static';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_COLORS, DEFAULT_OPACITIES } from '@/constants/colors';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';
import type { CustomField, FieldElementConfig } from '@/types/customField';

function makeTextField(id: string): CustomField {
  return {
    id,
    label: `Champ ${id}`,
    x: 10,
    y: 20,
    width: 200,
    height: 80,
    zIndex: 1,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: true,
    initialWidth: 200,
    initialHeight: 80,
    element: {
      type: 'text-block',
      config: {
        content: `Texte ${id}`,
        fontSize: 24,
        fontWeight: 600,
        fontFamily: '',
        textAlign: 'center',
        textTransform: 'none',
        letterSpacing: 0,
      },
    } as FieldElementConfig,
    style: { ...DEFAULT_FIELD_STYLE },
  };
}

describe('StaticField', () => {
  it('rend un champ visible', () => {
    render(
      <StaticField
        field={makeTextField('a')}
        state={DEFAULT_STATE}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
      />,
    );
    expect(screen.getByText('Texte a')).toBeInTheDocument();
  });

  it('ne rend pas un champ invisible', () => {
    const field = { ...makeTextField('hidden'), visible: false };
    render(
      <StaticField
        field={field}
        state={DEFAULT_STATE}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
      />,
    );
    expect(screen.queryByText('Texte hidden')).not.toBeInTheDocument();
  });

  it('positionne le champ avec les bonnes coordonn\u00e9es', () => {
    const field = makeTextField('pos');
    const { container } = render(
      <StaticField
        field={field}
        state={DEFAULT_STATE}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
      />,
    );
    const el = container.querySelector('[data-field-id="pos"]') as HTMLElement;
    expect(el).toBeInTheDocument();
    expect(el.style.left).toBe('10px');
    expect(el.style.top).toBe('20px');
  });
});

describe('GridOverlay', () => {
  it('rend la grille avec data-testid', () => {
    render(<GridOverlay gridSize={20} />);
    expect(screen.getByTestId('grid-overlay')).toBeInTheDocument();
  });

  it('applique la taille de grille dans le style', () => {
    render(<GridOverlay gridSize={50} />);
    const el = screen.getByTestId('grid-overlay');
    expect(el.style.backgroundSize).toBe('50px 50px');
  });
});
