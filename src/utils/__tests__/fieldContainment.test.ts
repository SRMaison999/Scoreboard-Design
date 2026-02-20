import { describe, it, expect } from 'vitest';
import {
  getContainedFields,
  toRelativePositions,
  toAbsolutePositions,
} from '@/utils/fieldContainment';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';
import type { CustomField } from '@/types/customField';

function makeField(overrides: Partial<CustomField> & { id: string }): CustomField {
  const w = overrides.width ?? 100;
  const h = overrides.height ?? 100;
  return {
    label: 'Champ',
    x: 0,
    y: 0,
    width: w,
    height: h,
    rotation: 0,
    zIndex: 1,
    locked: false,
    visible: true,
    lockAspectRatio: false,
    scaleContent: true,
    initialWidth: w,
    initialHeight: h,
    element: {
      type: 'text-block',
      config: { content: '', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center', textTransform: 'none', letterSpacing: 0 },
    },
    style: DEFAULT_FIELD_STYLE,
    ...overrides,
  };
}

describe('getContainedFields', () => {
  it('retourne les champs entierement contenus dans le parent', () => {
    const parent = makeField({ id: 'parent', x: 0, y: 0, width: 500, height: 500 });
    const inside = makeField({ id: 'inside', x: 50, y: 50, width: 100, height: 100 });
    const outside = makeField({ id: 'outside', x: 600, y: 600, width: 100, height: 100 });

    const result = getContainedFields(parent, [parent, inside, outside]);
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('inside');
  });

  it('exclut le parent lui-meme', () => {
    const parent = makeField({ id: 'parent', x: 0, y: 0, width: 500, height: 500 });
    const result = getContainedFields(parent, [parent]);
    expect(result).toHaveLength(0);
  });

  it('inclut les champs dont plus de 50% de la surface est dans le parent', () => {
    const parent = makeField({ id: 'parent', x: 0, y: 0, width: 200, height: 200 });
    const partial = makeField({ id: 'partial', x: 100, y: 100, width: 100, height: 100 });

    const result = getContainedFields(parent, [parent, partial]);
    expect(result).toHaveLength(1);
    expect(result[0]!.id).toBe('partial');
  });

  it('exclut les champs dont moins de 50% de la surface est dans le parent', () => {
    const parent = makeField({ id: 'parent', x: 0, y: 0, width: 200, height: 200 });
    const barely = makeField({ id: 'barely', x: 170, y: 170, width: 100, height: 100 });

    const result = getContainedFields(parent, [parent, barely]);
    expect(result).toHaveLength(0);
  });

  it('gere un parent sans champs enfants', () => {
    const parent = makeField({ id: 'parent', x: 0, y: 0, width: 500, height: 500 });
    const result = getContainedFields(parent, [parent]);
    expect(result).toHaveLength(0);
  });

  it('detecte plusieurs champs contenus', () => {
    const parent = makeField({ id: 'parent', x: 0, y: 0, width: 800, height: 800 });
    const child1 = makeField({ id: 'c1', x: 10, y: 10, width: 100, height: 50 });
    const child2 = makeField({ id: 'c2', x: 200, y: 200, width: 80, height: 80 });
    const child3 = makeField({ id: 'c3', x: 500, y: 500, width: 150, height: 150 });

    const result = getContainedFields(parent, [parent, child1, child2, child3]);
    expect(result).toHaveLength(3);
  });
});

describe('toRelativePositions', () => {
  it('convertit les positions en offsets relatifs au parent', () => {
    const parent = makeField({ id: 'parent', x: 100, y: 200, width: 500, height: 500 });
    const child = makeField({ id: 'child', x: 150, y: 250, width: 80, height: 60 });

    const [relative] = toRelativePositions(parent, [child]);
    expect(relative!.x).toBe(50);
    expect(relative!.y).toBe(50);
    expect(relative!.width).toBe(80);
    expect(relative!.height).toBe(60);
  });

  it('gere les coordonnees negatives (enfant depassant a gauche/haut)', () => {
    const parent = makeField({ id: 'parent', x: 200, y: 200, width: 500, height: 500 });
    const child = makeField({ id: 'child', x: 180, y: 180, width: 100, height: 100 });

    const [relative] = toRelativePositions(parent, [child]);
    expect(relative!.x).toBe(-20);
    expect(relative!.y).toBe(-20);
  });

  it('retourne un tableau vide pour une liste vide', () => {
    const parent = makeField({ id: 'parent', x: 0, y: 0, width: 500, height: 500 });
    expect(toRelativePositions(parent, [])).toHaveLength(0);
  });
});

describe('toAbsolutePositions', () => {
  it('convertit les offsets relatifs en positions absolues', () => {
    const parent = makeField({ id: 'parent', x: 100, y: 200, width: 500, height: 500 });
    const relative = makeField({ id: 'child', x: 50, y: 50, width: 80, height: 60 });

    const [absolute] = toAbsolutePositions(parent, [relative]);
    expect(absolute!.x).toBe(150);
    expect(absolute!.y).toBe(250);
    expect(absolute!.width).toBe(80);
    expect(absolute!.height).toBe(60);
  });

  it('roundtrip : relative puis absolute redonne les positions originales', () => {
    const parent = makeField({ id: 'parent', x: 300, y: 150, width: 500, height: 500 });
    const child = makeField({ id: 'child', x: 350, y: 200, width: 80, height: 60 });

    const relative = toRelativePositions(parent, [child]);
    const [restored] = toAbsolutePositions(parent, relative);
    expect(restored!.x).toBe(child.x);
    expect(restored!.y).toBe(child.y);
  });

  it('retourne un tableau vide pour une liste vide', () => {
    const parent = makeField({ id: 'parent', x: 0, y: 0, width: 500, height: 500 });
    expect(toAbsolutePositions(parent, [])).toHaveLength(0);
  });
});
