import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BodyType14 } from '../BodyType14';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_COLORS, DEFAULT_OPACITIES } from '@/constants/colors';
import type { CustomField, FieldElementConfig } from '@/types/customField';
import type { ScoreboardState } from '@/types/scoreboard';

function makeTextField(id: string, x: number, y: number): CustomField {
  return {
    id,
    label: `Champ ${id}`,
    x, y, width: 200, height: 80,
    zIndex: 1,
    locked: false, visible: true, lockAspectRatio: false,
    scaleContent: true, initialWidth: 200, initialHeight: 80,
    element: {
      type: 'text-block',
      config: {
        content: `Texte ${id}`,
        fontSize: 24, fontWeight: 600, fontFamily: '',
        textAlign: 'center', textTransform: 'none', letterSpacing: 0,
      },
    } as FieldElementConfig,
    style: {
      backgroundColor: '', backgroundOpacity: 0,
      borderColor: '', borderWidth: 0, borderRadius: 0, padding: 0,
    },
  };
}

function makeState(fields: CustomField[]): ScoreboardState {
  return {
    ...DEFAULT_STATE,
    bodyType: 14,
    customFieldsData: {
      fields,
      fullPageMode: false,
      snapToGrid: true,
      gridSize: 20,
      showGuides: true,
      selectedFieldId: null,
    },
  };
}

describe('BodyType14', () => {
  it('rend le conteneur avec data-testid', () => {
    const state = makeState([]);
    render(
      <BodyType14 state={state} colors={DEFAULT_COLORS} opacities={DEFAULT_OPACITIES} />,
    );
    expect(screen.getByTestId('body-type-14')).toBeInTheDocument();
  });

  it('rend les champs visibles', () => {
    const fields = [makeTextField('a', 0, 0), makeTextField('b', 100, 100)];
    const state = makeState(fields);
    render(
      <BodyType14 state={state} colors={DEFAULT_COLORS} opacities={DEFAULT_OPACITIES} />,
    );
    expect(screen.getByText('Texte a')).toBeInTheDocument();
    expect(screen.getByText('Texte b')).toBeInTheDocument();
  });

  it('masque les champs invisibles', () => {
    const field = makeTextField('hidden', 0, 0);
    const hiddenField: CustomField = { ...field, visible: false };
    const state = makeState([hiddenField]);
    render(
      <BodyType14 state={state} colors={DEFAULT_COLORS} opacities={DEFAULT_OPACITIES} />,
    );
    expect(screen.queryByText('Texte hidden')).not.toBeInTheDocument();
  });

  it('rend un canvas vide sans erreur', () => {
    const state = makeState([]);
    const { container } = render(
      <BodyType14 state={state} colors={DEFAULT_COLORS} opacities={DEFAULT_OPACITIES} />,
    );
    expect(container.querySelector('[data-testid="body-type-14"]')).toBeInTheDocument();
  });
});
