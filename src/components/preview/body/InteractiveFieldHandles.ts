/**
 * Descripteurs et constantes pour les poignees de redimensionnement et rotation.
 * Extraits de InteractiveField pour respecter la limite de 300 lignes.
 */

import type { ResizeHandle } from '@/types/customField';

/* --- Constantes des poignees de coin --- */

export const CORNER_SIZE = 14;
const CORNER_OFFSET = -7;

/* --- Constantes des poignees de bord --- */

const EDGE_LONG = 20;
const EDGE_SHORT = 8;

/* --- Constantes de la poignee de rotation --- */

export const ROTATION_HANDLE_SIZE = 12;
export const ROTATION_HANDLE_OFFSET = 24;

export interface HandleDescriptor {
  handle: ResizeHandle;
  cursor: string;
  width: number;
  height: number;
  top?: number | string;
  bottom?: number | string;
  left?: number | string;
  right?: number | string;
}

const CORNER_HANDLES: readonly HandleDescriptor[] = [
  {
    handle: 'top-left', cursor: 'nwse-resize',
    width: CORNER_SIZE, height: CORNER_SIZE,
    top: CORNER_OFFSET, left: CORNER_OFFSET,
  },
  {
    handle: 'top-right', cursor: 'nesw-resize',
    width: CORNER_SIZE, height: CORNER_SIZE,
    top: CORNER_OFFSET, right: CORNER_OFFSET,
  },
  {
    handle: 'bottom-left', cursor: 'nesw-resize',
    width: CORNER_SIZE, height: CORNER_SIZE,
    bottom: CORNER_OFFSET, left: CORNER_OFFSET,
  },
  {
    handle: 'bottom-right', cursor: 'nwse-resize',
    width: CORNER_SIZE, height: CORNER_SIZE,
    bottom: CORNER_OFFSET, right: CORNER_OFFSET,
  },
];

const EDGE_HANDLES: readonly HandleDescriptor[] = [
  {
    handle: 'top', cursor: 'n-resize',
    width: EDGE_LONG, height: EDGE_SHORT,
    top: -(EDGE_SHORT / 2), left: '50%',
  },
  {
    handle: 'bottom', cursor: 's-resize',
    width: EDGE_LONG, height: EDGE_SHORT,
    bottom: -(EDGE_SHORT / 2), left: '50%',
  },
  {
    handle: 'left', cursor: 'w-resize',
    width: EDGE_SHORT, height: EDGE_LONG,
    left: -(EDGE_SHORT / 2), top: '50%',
  },
  {
    handle: 'right', cursor: 'e-resize',
    width: EDGE_SHORT, height: EDGE_LONG,
    right: -(EDGE_SHORT / 2), top: '50%',
  },
];

export const ALL_HANDLES: readonly HandleDescriptor[] = [
  ...CORNER_HANDLES,
  ...EDGE_HANDLES,
];

export function buildHandlePosition(desc: HandleDescriptor): React.CSSProperties {
  const pos: React.CSSProperties = {};

  if (desc.top !== undefined) pos.top = desc.top;
  if (desc.bottom !== undefined) pos.bottom = desc.bottom;
  if (desc.left !== undefined) pos.left = desc.left;
  if (desc.right !== undefined) pos.right = desc.right;

  /* Centrer les poignees de bord sur l'axe perpendiculaire */
  const needsHorizontalCenter = desc.handle === 'top' || desc.handle === 'bottom';
  const needsVerticalCenter = desc.handle === 'left' || desc.handle === 'right';

  if (needsHorizontalCenter) {
    pos.transform = `translateX(-50%)`;
  } else if (needsVerticalCenter) {
    pos.transform = `translateY(-50%)`;
  }

  return pos;
}
