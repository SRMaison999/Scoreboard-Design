/**
 * Utilitaires de distribution et d'espacement pour les champs du mode Layout libre.
 * Distribue les champs sélectionnés uniformément sur un axe.
 */

export type DistributionAction =
  | 'distribute-h'
  | 'distribute-v'
  | 'space-h'
  | 'space-v'
  | 'align-sel-left'
  | 'align-sel-center-h'
  | 'align-sel-right'
  | 'align-sel-top'
  | 'align-sel-center-v'
  | 'align-sel-bottom';

interface FieldRect {
  readonly id: string;
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

interface PositionUpdate {
  readonly id: string;
  readonly x: number;
  readonly y: number;
}

/**
 * Distribue les champs horizontalement (centres espacés uniformément).
 * Nécessite au moins 3 champs.
 */
function distributeH(fields: readonly FieldRect[]): readonly PositionUpdate[] {
  if (fields.length < 3) return fields.map((f) => ({ id: f.id, x: f.x, y: f.y }));

  const sorted = [...fields].sort((a, b) => a.x - b.x);
  const first = sorted[0]!;
  const last = sorted[sorted.length - 1]!;
  const totalWidth = (last.x + last.width) - first.x;
  const sumWidths = sorted.reduce((sum, f) => sum + f.width, 0);
  const gap = (totalWidth - sumWidths) / (sorted.length - 1);

  let currentX = first.x;
  return sorted.map((f) => {
    const update = { id: f.id, x: Math.round(currentX), y: f.y };
    currentX += f.width + gap;
    return update;
  });
}

/**
 * Distribue les champs verticalement (centres espacés uniformément).
 * Nécessite au moins 3 champs.
 */
function distributeV(fields: readonly FieldRect[]): readonly PositionUpdate[] {
  if (fields.length < 3) return fields.map((f) => ({ id: f.id, x: f.x, y: f.y }));

  const sorted = [...fields].sort((a, b) => a.y - b.y);
  const first = sorted[0]!;
  const last = sorted[sorted.length - 1]!;
  const totalHeight = (last.y + last.height) - first.y;
  const sumHeights = sorted.reduce((sum, f) => sum + f.height, 0);
  const gap = (totalHeight - sumHeights) / (sorted.length - 1);

  let currentY = first.y;
  return sorted.map((f) => {
    const update = { id: f.id, x: f.x, y: Math.round(currentY) };
    currentY += f.height + gap;
    return update;
  });
}

/**
 * Espacement horizontal égal entre les champs (gap constant).
 */
function spaceH(fields: readonly FieldRect[], gap: number): readonly PositionUpdate[] {
  if (fields.length < 2) return fields.map((f) => ({ id: f.id, x: f.x, y: f.y }));

  const sorted = [...fields].sort((a, b) => a.x - b.x);
  let currentX = sorted[0]!.x;
  return sorted.map((f) => {
    const update = { id: f.id, x: Math.round(currentX), y: f.y };
    currentX += f.width + gap;
    return update;
  });
}

/**
 * Espacement vertical égal entre les champs (gap constant).
 */
function spaceV(fields: readonly FieldRect[], gap: number): readonly PositionUpdate[] {
  if (fields.length < 2) return fields.map((f) => ({ id: f.id, x: f.x, y: f.y }));

  const sorted = [...fields].sort((a, b) => a.y - b.y);
  let currentY = sorted[0]!.y;
  return sorted.map((f) => {
    const update = { id: f.id, x: f.x, y: Math.round(currentY) };
    currentY += f.height + gap;
    return update;
  });
}

/** Aligne les champs sélectionnés entre eux (pas sur le canvas). */
function alignSelection(
  fields: readonly FieldRect[],
  action: 'align-sel-left' | 'align-sel-center-h' | 'align-sel-right' | 'align-sel-top' | 'align-sel-center-v' | 'align-sel-bottom',
): readonly PositionUpdate[] {
  if (fields.length < 2) return fields.map((f) => ({ id: f.id, x: f.x, y: f.y }));

  switch (action) {
    case 'align-sel-left': {
      const minX = Math.min(...fields.map((f) => f.x));
      return fields.map((f) => ({ id: f.id, x: minX, y: f.y }));
    }
    case 'align-sel-center-h': {
      const minX = Math.min(...fields.map((f) => f.x));
      const maxRight = Math.max(...fields.map((f) => f.x + f.width));
      const center = (minX + maxRight) / 2;
      return fields.map((f) => ({ id: f.id, x: Math.round(center - f.width / 2), y: f.y }));
    }
    case 'align-sel-right': {
      const maxRight = Math.max(...fields.map((f) => f.x + f.width));
      return fields.map((f) => ({ id: f.id, x: maxRight - f.width, y: f.y }));
    }
    case 'align-sel-top': {
      const minY = Math.min(...fields.map((f) => f.y));
      return fields.map((f) => ({ id: f.id, x: f.x, y: minY }));
    }
    case 'align-sel-center-v': {
      const minY = Math.min(...fields.map((f) => f.y));
      const maxBottom = Math.max(...fields.map((f) => f.y + f.height));
      const center = (minY + maxBottom) / 2;
      return fields.map((f) => ({ id: f.id, x: f.x, y: Math.round(center - f.height / 2) }));
    }
    case 'align-sel-bottom': {
      const maxBottom = Math.max(...fields.map((f) => f.y + f.height));
      return fields.map((f) => ({ id: f.id, x: f.x, y: maxBottom - f.height }));
    }
  }
}

const DEFAULT_SPACING = 20;

/**
 * Calcule les nouvelles positions des champs selon l'action demandée.
 */
export function distributeFields(
  fields: readonly FieldRect[],
  action: DistributionAction,
  spacing?: number,
): readonly PositionUpdate[] {
  switch (action) {
    case 'distribute-h':
      return distributeH(fields);
    case 'distribute-v':
      return distributeV(fields);
    case 'space-h':
      return spaceH(fields, spacing ?? DEFAULT_SPACING);
    case 'space-v':
      return spaceV(fields, spacing ?? DEFAULT_SPACING);
    default:
      return alignSelection(fields, action);
  }
}
