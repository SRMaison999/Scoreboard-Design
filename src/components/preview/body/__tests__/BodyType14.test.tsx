import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BodyType14 } from '../BodyType14';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_COLORS, DEFAULT_OPACITIES } from '@/constants/colors';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { CustomField, FieldElementConfig } from '@/types/customField';
import type { ScoreboardState } from '@/types/scoreboard';

const DRAG_MIME = CUSTOM_FIELD_LABELS.dragMimeType;

function makeTextField(id: string, x: number, y: number): CustomField {
  return {
    id,
    label: `Champ ${id}`,
    x, y, width: 200, height: 80,
    rotation: 0, zIndex: 1,
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
      opacity: 100, shadow: null, backdropBlur: 0,
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
      selectedFieldIds: [],
      zoneSelectionActive: false,
    },
  };
}

describe('BodyType14', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
  });

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

  it('affiche l indice de canvas vide en mode interactif sans champs', () => {
    const state = makeState([]);
    render(
      <BodyType14 state={state} colors={DEFAULT_COLORS} opacities={DEFAULT_OPACITIES} canvasScale={0.5} />,
    );
    expect(screen.getByTestId('empty-canvas-hint')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.emptyCanvasTitle)).toBeInTheDocument();
  });

  it('masque l indice de canvas vide quand des champs existent', () => {
    const fields = [makeTextField('a', 0, 0)];
    const state = makeState(fields);
    render(
      <BodyType14 state={state} colors={DEFAULT_COLORS} opacities={DEFAULT_OPACITIES} canvasScale={0.5} />,
    );
    expect(screen.queryByTestId('empty-canvas-hint')).not.toBeInTheDocument();
  });

  it('affiche l indicateur de depot lors d un dragOver valide', () => {
    const state = makeState([]);
    render(
      <BodyType14 state={state} colors={DEFAULT_COLORS} opacities={DEFAULT_OPACITIES} canvasScale={0.5} />,
    );

    const canvas = screen.getByTestId('body-type-14');

    /* Simuler un dragover avec le type MIME correct */
    const dragOverEvent = new Event('dragover', { bubbles: true, cancelable: true });
    Object.defineProperty(dragOverEvent, 'dataTransfer', {
      value: {
        types: [DRAG_MIME],
        dropEffect: 'none',
      },
    });
    fireEvent(canvas, dragOverEvent);

    expect(screen.getByTestId('drop-indicator')).toBeInTheDocument();
    expect(screen.getByText(CUSTOM_FIELD_LABELS.dropHint)).toBeInTheDocument();
  });

  it('n affiche pas l indicateur de depot sans dragOver', () => {
    const state = makeState([]);
    render(
      <BodyType14 state={state} colors={DEFAULT_COLORS} opacities={DEFAULT_OPACITIES} canvasScale={0.5} />,
    );

    expect(screen.queryByTestId('drop-indicator')).not.toBeInTheDocument();
  });

  it('ajoute un champ au drop d un element', () => {
    const state = makeState([]);
    render(
      <BodyType14 state={state} colors={DEFAULT_COLORS} opacities={DEFAULT_OPACITIES} canvasScale={1} />,
    );

    const canvas = screen.getByTestId('body-type-14');
    const payload = JSON.stringify({ elementType: 'text-block' });

    /* Simuler le drop */
    const dropEvent = new Event('drop', { bubbles: true, cancelable: true });
    Object.defineProperty(dropEvent, 'dataTransfer', {
      value: {
        types: [DRAG_MIME],
        getData: vi.fn(() => payload),
      },
    });
    Object.defineProperty(dropEvent, 'clientX', { value: 500 });
    Object.defineProperty(dropEvent, 'clientY', { value: 300 });

    fireEvent(canvas, dropEvent);

    const fields = useScoreboardStore.getState().customFieldsData.fields;
    expect(fields.length).toBe(1);
    expect(fields[0]?.element.type).toBe('text-block');
  });
});
