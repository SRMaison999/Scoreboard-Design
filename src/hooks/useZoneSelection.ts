/**
 * Hook pour la sélection de zone sur le canvas.
 * Permet de dessiner un rectangle et de capturer les champs contenus.
 */

import { useState, useCallback } from 'react';
import type { CustomField } from '@/types/customField';

export interface ZoneRect {
  readonly x: number;
  readonly y: number;
  readonly width: number;
  readonly height: number;
}

interface ZoneSelectionState {
  readonly active: boolean;
  readonly drawing: boolean;
  readonly startX: number;
  readonly startY: number;
  readonly currentRect: ZoneRect | null;
}

const INITIAL_STATE: ZoneSelectionState = {
  active: false,
  drawing: false,
  startX: 0,
  startY: 0,
  currentRect: null,
};

function isFieldInZone(field: CustomField, zone: ZoneRect): boolean {
  const centerX = field.x + field.width / 2;
  const centerY = field.y + field.height / 2;
  return (
    centerX >= zone.x &&
    centerX <= zone.x + zone.width &&
    centerY >= zone.y &&
    centerY <= zone.y + zone.height
  );
}

export function useZoneSelection(
  scale: number,
  fields: readonly CustomField[],
  onCapture: (captured: readonly CustomField[]) => void,
) {
  const [state, setState] = useState<ZoneSelectionState>(INITIAL_STATE);

  const activate = useCallback(() => {
    setState({ ...INITIAL_STATE, active: true });
  }, []);

  const cancel = useCallback(() => {
    setState(INITIAL_STATE);
  }, []);

  const onPointerDown = useCallback((e: React.PointerEvent) => {
    if (!state.active) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    setState((s) => ({ ...s, drawing: true, startX: x, startY: y, currentRect: null }));
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    e.preventDefault();
    e.stopPropagation();
  }, [state.active, scale]);

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!state.drawing) return;
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const x = (e.clientX - rect.left) / scale;
    const y = (e.clientY - rect.top) / scale;
    const zoneX = Math.min(state.startX, x);
    const zoneY = Math.min(state.startY, y);
    const zoneW = Math.abs(x - state.startX);
    const zoneH = Math.abs(y - state.startY);
    setState((s) => ({
      ...s,
      currentRect: { x: zoneX, y: zoneY, width: zoneW, height: zoneH },
    }));
  }, [state.drawing, state.startX, state.startY, scale]);

  const onPointerUp = useCallback(() => {
    if (!state.drawing || !state.currentRect) {
      setState(INITIAL_STATE);
      return;
    }
    const zone = state.currentRect;
    if (zone.width < 10 || zone.height < 10) {
      setState(INITIAL_STATE);
      return;
    }
    const captured = fields.filter((f) => f.visible && isFieldInZone(f, zone));
    setState(INITIAL_STATE);
    onCapture(captured);
  }, [state.drawing, state.currentRect, fields, onCapture]);

  return {
    active: state.active,
    drawing: state.drawing,
    currentRect: state.currentRect,
    activate,
    cancel,
    onPointerDown,
    onPointerMove,
    onPointerUp,
  };
}
