import { describe, it, expect } from 'vitest';
import { detectAlignments } from '../fieldAlignmentCheck';
import type { CustomField } from '@/types/customField';

const CANVAS_W = 1920;
const CANVAS_H = 1080;

function makeField(overrides: Partial<CustomField> & { id: string }): CustomField {
  return {
    label: overrides.id,
    x: 0, y: 0, width: 100, height: 100,
    rotation: 0, zIndex: 1, locked: false, visible: true,
    lockAspectRatio: false, scaleContent: true,
    initialWidth: 100, initialHeight: 100,
    element: { type: 'shape-block', config: { shape: 'rectangle', fillColor: '#fff', fillOpacity: 100, borderColor: '', borderWidth: 0, borderRadius: 0 } },
    style: { backgroundColor: '', backgroundOpacity: 0, borderColor: '', borderWidth: 0, borderRadius: 0, borderOpacity: 100 },
    ...overrides,
  } as CustomField;
}

describe('detectAlignments', () => {
  it('retourne un alignement exact quand deux champs partagent un bord gauche', () => {
    const selected = makeField({ id: 'a', x: 100, y: 50 });
    const other = makeField({ id: 'b', x: 100, y: 200 });

    const result = detectAlignments(selected, [other], CANVAS_W, CANVAS_H);
    const exact = result.filter((r) => r.exact && r.orientation === 'vertical');
    expect(exact.length).toBeGreaterThan(0);
    expect(exact.some((r) => Math.round(r.position) === 100)).toBe(true);
  });

  it('retourne un quasi-alignement quand un bord est décalé de quelques pixels', () => {
    const selected = makeField({ id: 'a', x: 103, y: 50 });
    const other = makeField({ id: 'b', x: 100, y: 200 });

    const result = detectAlignments(selected, [other], CANVAS_W, CANVAS_H);
    const nearMiss = result.filter((r) => !r.exact && r.orientation === 'vertical');
    expect(nearMiss.length).toBeGreaterThan(0);
    expect(nearMiss.some((r) => r.delta === 3)).toBe(true);
  });

  it('fournit un fix correct pour un quasi-alignement horizontal', () => {
    const selected = makeField({ id: 'a', x: 50, y: 205 });
    const other = makeField({ id: 'b', x: 50, y: 100, height: 100 });

    const result = detectAlignments(selected, [other], CANVAS_W, CANVAS_H);
    /* Le bord haut du selected (205) est à 5px du bord bas du other (200) */
    const near = result.find(
      (r) => !r.exact && r.orientation === 'horizontal' && Math.abs(r.delta) === 5,
    );
    expect(near).toBeDefined();
    expect(near!.fix.y).toBe(200);
  });

  it('détecte l\'alignement avec le canvas', () => {
    const selected = makeField({ id: 'a', x: 0, y: 50 });

    const result = detectAlignments(selected, [], CANVAS_W, CANVAS_H);
    const exact = result.filter((r) => r.exact && r.targetLabel === 'Canvas');
    expect(exact.length).toBeGreaterThan(0);
  });

  it('ignore les champs invisibles', () => {
    const selected = makeField({ id: 'a', x: 100, y: 50 });
    const hidden = makeField({ id: 'b', x: 100, y: 200, visible: false });

    const result = detectAlignments(selected, [hidden], CANVAS_W, CANVAS_H);
    const withB = result.filter((r) => r.targetLabel === 'b');
    expect(withB.length).toBe(0);
  });

  it('ne retourne rien si aucun champ n\'est proche', () => {
    const selected = makeField({ id: 'a', x: 500, y: 500 });
    const other = makeField({ id: 'b', x: 100, y: 100 });

    const result = detectAlignments(selected, [other], CANVAS_W, CANVAS_H);
    const withB = result.filter((r) => r.targetLabel === 'b');
    expect(withB.length).toBe(0);
  });

  it('déduplique les alignements à la même position', () => {
    const selected = makeField({ id: 'a', x: 100, y: 50, width: 200 });
    const other1 = makeField({ id: 'b', x: 100, y: 200 });
    const other2 = makeField({ id: 'c', x: 100, y: 350 });

    const result = detectAlignments(selected, [other1, other2], CANVAS_W, CANVAS_H);
    /* Tous ont left=100, il ne doit y avoir qu'une seule ligne verticale à x=100 */
    const atX100 = result.filter(
      (r) => r.exact && r.orientation === 'vertical' && Math.round(r.position) === 100,
    );
    expect(atX100.length).toBe(1);
  });

  it('limite les quasi-alignements à 6 maximum', () => {
    /* Créer beaucoup de champs avec des bords proches */
    const selected = makeField({ id: 'sel', x: 100, y: 100, width: 100, height: 100 });
    const others = Array.from({ length: 20 }, (_, i) =>
      makeField({
        id: `f${i}`,
        x: 103 + i * 200,
        y: 105 + i * 200,
        width: 50,
        height: 50,
      }),
    );

    const result = detectAlignments(selected, others, CANVAS_W, CANVAS_H);
    const nearMiss = result.filter((r) => !r.exact);
    expect(nearMiss.length).toBeLessThanOrEqual(6);
  });
});
