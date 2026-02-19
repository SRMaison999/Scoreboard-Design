import { describe, it, expect } from 'vitest';
import { alignField } from '@/utils/fieldAlignment';
import type { AlignmentAction } from '@/utils/fieldAlignment';

const CANVAS_WIDTH = 1920;
const CANVAS_HEIGHT = 1080;

const FIELD = {
  x: 200,
  y: 150,
  width: 300,
  height: 100,
} as const;

describe('alignField — alignement horizontal', () => {
  it('aligne le champ à gauche du canvas', () => {
    const result = alignField(FIELD, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-left');
    expect(result.x).toBe(0);
    expect(result.y).toBe(FIELD.y);
  });

  it('centre le champ horizontalement sur le canvas', () => {
    const result = alignField(FIELD, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-center-h');
    expect(result.x).toBe(Math.round((CANVAS_WIDTH - FIELD.width) / 2));
    expect(result.y).toBe(FIELD.y);
  });

  it('aligne le champ à droite du canvas', () => {
    const result = alignField(FIELD, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-right');
    expect(result.x).toBe(CANVAS_WIDTH - FIELD.width);
    expect(result.y).toBe(FIELD.y);
  });
});

describe('alignField — alignement vertical', () => {
  it('aligne le champ en haut du canvas', () => {
    const result = alignField(FIELD, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-top');
    expect(result.x).toBe(FIELD.x);
    expect(result.y).toBe(0);
  });

  it('centre le champ verticalement sur le canvas', () => {
    const result = alignField(FIELD, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-center-v');
    expect(result.x).toBe(FIELD.x);
    expect(result.y).toBe(Math.round((CANVAS_HEIGHT - FIELD.height) / 2));
  });

  it('aligne le champ en bas du canvas', () => {
    const result = alignField(FIELD, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-bottom');
    expect(result.x).toBe(FIELD.x);
    expect(result.y).toBe(CANVAS_HEIGHT - FIELD.height);
  });
});

describe('alignField — valeurs exactes pour un champ connu', () => {
  const field = { x: 400, y: 300, width: 200, height: 80 } as const;

  it('align-left retourne x=0, y inchangé', () => {
    const result = alignField(field, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-left');
    expect(result).toEqual({ x: 0, y: 300 });
  });

  it('align-center-h retourne x=860 pour un champ de largeur 200 sur un canvas de 1920', () => {
    const result = alignField(field, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-center-h');
    expect(result).toEqual({ x: 860, y: 300 });
  });

  it('align-right retourne x=1720 pour un champ de largeur 200 sur un canvas de 1920', () => {
    const result = alignField(field, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-right');
    expect(result).toEqual({ x: 1720, y: 300 });
  });

  it('align-top retourne y=0, x inchangé', () => {
    const result = alignField(field, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-top');
    expect(result).toEqual({ x: 400, y: 0 });
  });

  it('align-center-v retourne y=500 pour un champ de hauteur 80 sur un canvas de 1080', () => {
    const result = alignField(field, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-center-v');
    expect(result).toEqual({ x: 400, y: 500 });
  });

  it('align-bottom retourne y=1000 pour un champ de hauteur 80 sur un canvas de 1080', () => {
    const result = alignField(field, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-bottom');
    expect(result).toEqual({ x: 400, y: 1000 });
  });
});

describe('alignField — centrage avec dimension impaire (arrondi)', () => {
  it('arrondit correctement le centrage horizontal pour une largeur impaire', () => {
    const oddField = { x: 100, y: 100, width: 151, height: 50 };
    const result = alignField(oddField, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-center-h');
    expect(result.x).toBe(Math.round((1920 - 151) / 2));
    expect(result.x).toBe(885);
  });

  it('arrondit correctement le centrage vertical pour une hauteur impaire', () => {
    const oddField = { x: 100, y: 100, width: 200, height: 91 };
    const result = alignField(oddField, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-center-v');
    expect(result.y).toBe(Math.round((1080 - 91) / 2));
    expect(result.y).toBe(495);
  });
});

describe('alignField — canvas non standard', () => {
  it('fonctionne avec un canvas 1280x720', () => {
    const field = { x: 50, y: 50, width: 100, height: 40 };
    const actions: AlignmentAction[] = [
      'align-left',
      'align-center-h',
      'align-right',
      'align-top',
      'align-center-v',
      'align-bottom',
    ];

    const expected = [
      { x: 0, y: 50 },
      { x: 590, y: 50 },
      { x: 1180, y: 50 },
      { x: 50, y: 0 },
      { x: 50, y: 340 },
      { x: 50, y: 680 },
    ];

    actions.forEach((action, i) => {
      const result = alignField(field, 1280, 720, action);
      expect(result).toEqual(expected[i]);
    });
  });
});

describe('alignField — champ positionné à l\'origine', () => {
  it('align-left ne change pas un champ déjà à x=0', () => {
    const field = { x: 0, y: 200, width: 300, height: 100 };
    const result = alignField(field, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-left');
    expect(result).toEqual({ x: 0, y: 200 });
  });

  it('align-top ne change pas un champ déjà à y=0', () => {
    const field = { x: 500, y: 0, width: 300, height: 100 };
    const result = alignField(field, CANVAS_WIDTH, CANVAS_HEIGHT, 'align-top');
    expect(result).toEqual({ x: 500, y: 0 });
  });
});
