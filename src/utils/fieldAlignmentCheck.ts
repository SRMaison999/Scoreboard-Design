/**
 * Détection d'alignement entre un champ sélectionné et les autres champs / canvas.
 * Identifie les alignements exacts et les quasi-alignements (near-miss).
 */

import type { CustomField } from '@/types/customField';

/** Seuil en pixels pour détecter un quasi-alignement */
const NEAR_THRESHOLD = 8;

/** Nombre maximum de quasi-alignements retenus */
const MAX_NEAR_MISS = 6;

export interface AlignmentDiagnostic {
  readonly orientation: 'vertical' | 'horizontal';
  /** Position de la ligne sur l'axe perpendiculaire (px) */
  readonly position: number;
  /** Début du segment de ligne (px) */
  readonly start: number;
  /** Fin du segment de ligne (px) */
  readonly end: number;
  /** true = alignement exact, false = quasi-alignement */
  readonly exact: boolean;
  /** Décalage en pixels (0 pour exact) */
  readonly delta: number;
  /** Position corrigée pour le champ sélectionné */
  readonly fix: { readonly x: number; readonly y: number };
  /** Libellé de la cible (canvas ou nom du champ) */
  readonly targetLabel: string;
}

interface Edges {
  readonly left: number;
  readonly centerX: number;
  readonly right: number;
  readonly top: number;
  readonly centerY: number;
  readonly bottom: number;
}

function computeEdges(x: number, y: number, w: number, h: number): Edges {
  return {
    left: x, centerX: x + w / 2, right: x + w,
    top: y, centerY: y + h / 2, bottom: y + h,
  };
}

/**
 * Détecte les alignements exacts et quasi-alignements d'un champ
 * par rapport aux autres champs visibles et au canvas.
 */
export function detectAlignments(
  field: CustomField,
  others: readonly CustomField[],
  canvasWidth: number,
  canvasHeight: number,
): readonly AlignmentDiagnostic[] {
  const me = computeEdges(field.x, field.y, field.width, field.height);
  const raw: AlignmentDiagnostic[] = [];

  const targets: { edges: Edges; label: string }[] = [
    { edges: computeEdges(0, 0, canvasWidth, canvasHeight), label: 'Canvas' },
  ];
  for (const o of others) {
    if (o.id === field.id || !o.visible) continue;
    targets.push({ edges: computeEdges(o.x, o.y, o.width, o.height), label: o.label });
  }

  const myX = [me.left, me.centerX, me.right];
  const myY = [me.top, me.centerY, me.bottom];

  for (const t of targets) {
    const tX = [t.edges.left, t.edges.centerX, t.edges.right];
    const tY = [t.edges.top, t.edges.centerY, t.edges.bottom];

    for (const mx of myX) {
      for (const tx of tX) {
        const delta = mx - tx;
        if (Math.abs(delta) > NEAR_THRESHOLD) continue;
        raw.push({
          orientation: 'vertical',
          position: tx,
          start: Math.min(me.top, t.edges.top),
          end: Math.max(me.bottom, t.edges.bottom),
          exact: Math.abs(delta) < 1,
          delta: Math.round(delta),
          fix: { x: Math.round(field.x - delta), y: field.y },
          targetLabel: t.label,
        });
      }
    }

    for (const my of myY) {
      for (const ty of tY) {
        const delta = my - ty;
        if (Math.abs(delta) > NEAR_THRESHOLD) continue;
        raw.push({
          orientation: 'horizontal',
          position: ty,
          start: Math.min(me.left, t.edges.left),
          end: Math.max(me.right, t.edges.right),
          exact: Math.abs(delta) < 1,
          delta: Math.round(delta),
          fix: { x: field.x, y: Math.round(field.y - delta) },
          targetLabel: t.label,
        });
      }
    }
  }

  return filterAlignments(raw);
}

/** Déduplique par position et limite les quasi-alignements */
function filterAlignments(raw: AlignmentDiagnostic[]): AlignmentDiagnostic[] {
  const byKey = new Map<string, AlignmentDiagnostic>();

  for (const r of raw) {
    const key = `${r.orientation}-${Math.round(r.position)}`;
    const existing = byKey.get(key);
    if (!existing) {
      byKey.set(key, r);
      continue;
    }
    const best = (r.exact && !existing.exact) || Math.abs(r.delta) < Math.abs(existing.delta)
      ? r : existing;
    const other = best === r ? existing : r;
    byKey.set(key, {
      ...best,
      start: Math.min(best.start, other.start),
      end: Math.max(best.end, other.end),
    });
  }

  const all = [...byKey.values()];
  const exact = all.filter((r) => r.exact);
  const nearMiss = all
    .filter((r) => !r.exact)
    .sort((a, b) => Math.abs(a.delta) - Math.abs(b.delta))
    .slice(0, MAX_NEAR_MISS);

  return [...exact, ...nearMiss];
}
