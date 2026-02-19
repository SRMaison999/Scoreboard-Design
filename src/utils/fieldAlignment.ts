/**
 * Utilitaires d'alignement pour les champs du mode Layout libre.
 * Aligne un champ sur le canvas (1920x1080 par defaut).
 */

export type AlignmentAction =
  | 'align-left'
  | 'align-center-h'
  | 'align-right'
  | 'align-top'
  | 'align-center-v'
  | 'align-bottom';

interface FieldRect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

export function alignField(
  field: FieldRect,
  canvasWidth: number,
  canvasHeight: number,
  action: AlignmentAction,
): { x: number; y: number } {
  switch (action) {
    case 'align-left':
      return { x: 0, y: field.y };
    case 'align-center-h':
      return { x: Math.round((canvasWidth - field.width) / 2), y: field.y };
    case 'align-right':
      return { x: canvasWidth - field.width, y: field.y };
    case 'align-top':
      return { x: field.x, y: 0 };
    case 'align-center-v':
      return { x: field.x, y: Math.round((canvasHeight - field.height) / 2) };
    case 'align-bottom':
      return { x: field.x, y: canvasHeight - field.height };
  }
}
