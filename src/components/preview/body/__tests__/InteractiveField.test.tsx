import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { InteractiveField } from '../InteractiveField';
import { fieldBgStyle } from '@/utils/fieldStyle';
import { DEFAULT_STATE } from '@/data/defaultState';
import { DEFAULT_COLORS, DEFAULT_OPACITIES } from '@/constants/colors';
import type { CustomField, FieldElementConfig } from '@/types/customField';
import type { DragHandlers, ResizeHandlers } from '../InteractiveField';

function makeField(overrides?: Partial<CustomField>): CustomField {
  return {
    id: 'test-field',
    label: 'Champ test',
    x: 100,
    y: 50,
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
        content: 'Texte test',
        fontSize: 24,
        fontWeight: 600,
        fontFamily: '',
        textAlign: 'center',
        textTransform: 'none',
        letterSpacing: 0,
      },
    } as FieldElementConfig,
    style: {
      backgroundColor: '',
      backgroundOpacity: 0,
      borderColor: '',
      borderWidth: 0,
      borderRadius: 0,
      padding: 0,
      opacity: 100,
      shadow: null,
      backdropBlur: 0,
    },
    ...overrides,
  };
}

function makeDrag(): DragHandlers {
  return {
    onPointerDown: vi.fn(),
    onPointerMove: vi.fn(),
    onPointerUp: vi.fn(),
  };
}

function makeResize(): ResizeHandlers {
  return {
    onResizeStart: vi.fn(),
    onResizeMove: vi.fn(),
    onResizeEnd: vi.fn(),
  };
}

describe('InteractiveField', () => {
  it('rend le contenu du champ', () => {
    render(
      <InteractiveField
        field={makeField()}
        state={DEFAULT_STATE}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
        isSelected={false}
        drag={makeDrag()}
        resize={makeResize()}
      />,
    );
    expect(screen.getByText('Texte test')).toBeInTheDocument();
  });

  it('ne rend rien si le champ est invisible', () => {
    const { container } = render(
      <InteractiveField
        field={makeField({ visible: false })}
        state={DEFAULT_STATE}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
        isSelected={false}
        drag={makeDrag()}
        resize={makeResize()}
      />,
    );
    expect(container.firstChild).toBeNull();
  });

  it('affiche la bordure de selection quand selectionne', () => {
    render(
      <InteractiveField
        field={makeField()}
        state={DEFAULT_STATE}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
        isSelected={true}
        drag={makeDrag()}
        resize={makeResize()}
      />,
    );
    expect(screen.getByTestId('selection-border')).toBeInTheDocument();
  });

  it('masque la bordure de selection quand non selectionne', () => {
    render(
      <InteractiveField
        field={makeField()}
        state={DEFAULT_STATE}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
        isSelected={false}
        drag={makeDrag()}
        resize={makeResize()}
      />,
    );
    expect(screen.queryByTestId('selection-border')).not.toBeInTheDocument();
  });

  it('affiche 8 poignees de resize quand selectionne et non verrouille', () => {
    render(
      <InteractiveField
        field={makeField()}
        state={DEFAULT_STATE}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
        isSelected={true}
        drag={makeDrag()}
        resize={makeResize()}
      />,
    );
    /* 4 coins */
    expect(screen.getByTestId('resize-handle-top-left')).toBeInTheDocument();
    expect(screen.getByTestId('resize-handle-top-right')).toBeInTheDocument();
    expect(screen.getByTestId('resize-handle-bottom-left')).toBeInTheDocument();
    expect(screen.getByTestId('resize-handle-bottom-right')).toBeInTheDocument();
    /* 4 bords */
    expect(screen.getByTestId('resize-handle-top')).toBeInTheDocument();
    expect(screen.getByTestId('resize-handle-bottom')).toBeInTheDocument();
    expect(screen.getByTestId('resize-handle-left')).toBeInTheDocument();
    expect(screen.getByTestId('resize-handle-right')).toBeInTheDocument();
  });

  it('masque les poignees de resize quand verrouille', () => {
    render(
      <InteractiveField
        field={makeField({ locked: true })}
        state={DEFAULT_STATE}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
        isSelected={true}
        drag={makeDrag()}
        resize={makeResize()}
      />,
    );
    expect(screen.queryByTestId('resize-handle-top-left')).not.toBeInTheDocument();
  });

  it('appelle onPointerDown du drag au clic', () => {
    const drag = makeDrag();
    render(
      <InteractiveField
        field={makeField()}
        state={DEFAULT_STATE}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
        isSelected={false}
        drag={drag}
        resize={makeResize()}
      />,
    );
    fireEvent.pointerDown(screen.getByTestId('interactive-field-test-field'));
    expect(drag.onPointerDown).toHaveBeenCalled();
  });

  it('ne declenche pas le drag si verrouille', () => {
    const drag = makeDrag();
    render(
      <InteractiveField
        field={makeField({ locked: true })}
        state={DEFAULT_STATE}
        colors={DEFAULT_COLORS}
        opacities={DEFAULT_OPACITIES}
        isSelected={false}
        drag={drag}
        resize={makeResize()}
      />,
    );
    fireEvent.pointerDown(screen.getByTestId('interactive-field-test-field'));
    expect(drag.onPointerDown).not.toHaveBeenCalled();
  });
});

describe('fieldBgStyle', () => {
  const baseStyle = {
    backgroundColor: '',
    backgroundOpacity: 0,
    borderColor: '',
    borderWidth: 0,
    borderRadius: 0,
    padding: 0,
    opacity: 100,
    shadow: null,
    backdropBlur: 0,
  };

  it('retourne un objet vide pour un style par defaut', () => {
    const result = fieldBgStyle(baseStyle);
    expect(result).toEqual({});
  });

  it('applique la couleur de fond avec opacite', () => {
    const result = fieldBgStyle({ ...baseStyle, backgroundColor: '#ff0000', backgroundOpacity: 50 });
    expect(result.backgroundColor).toBeDefined();
  });

  it('applique la bordure quand epaisseur > 0', () => {
    const result = fieldBgStyle({ ...baseStyle, borderColor: '#0000ff', borderWidth: 2 });
    expect(result.border).toContain('2px solid');
  });
});
