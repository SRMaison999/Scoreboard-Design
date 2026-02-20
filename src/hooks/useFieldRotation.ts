/**
 * Hook pour la rotation des champs sur le canvas.
 * Calcule l'angle entre le centre du champ et la position de la souris.
 */

import { useCallback, useRef } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';

interface RotationState {
  fieldId: string;
  centerX: number;
  centerY: number;
  startAngle: number;
  startRotation: number;
}

export interface RotationHandlers {
  readonly onRotateStart: (
    e: React.PointerEvent,
    fieldId: string,
    fieldX: number,
    fieldY: number,
    fieldW: number,
    fieldH: number,
    currentRotation: number,
  ) => void;
  readonly onRotateMove: (e: React.PointerEvent) => void;
  readonly onRotateEnd: () => void;
}

function computeAngleDeg(
  centerX: number,
  centerY: number,
  mouseX: number,
  mouseY: number,
): number {
  const dx = mouseX - centerX;
  const dy = mouseY - centerY;
  /* atan2 retourne des radians, conversion en degres */
  /* -90 car la poignee est au-dessus du champ (axe Y negatif = angle 0) */
  return (Math.atan2(dy, dx) * 180) / Math.PI + 90;
}

function normalizeAngle(angle: number): number {
  let result = angle % 360;
  if (result > 180) result -= 360;
  if (result < -180) result += 360;
  return Math.round(result);
}

export function useFieldRotation(scale: number): RotationHandlers {
  const updateProp = useScoreboardStore((s) => s.updateCustomFieldProp);
  const rotationRef = useRef<RotationState | null>(null);

  const onRotateStart = useCallback(
    (
      e: React.PointerEvent,
      fieldId: string,
      fieldX: number,
      fieldY: number,
      fieldW: number,
      fieldH: number,
      currentRotation: number,
    ) => {
      e.stopPropagation();
      e.preventDefault();

      const el = e.currentTarget as HTMLElement;
      el.setPointerCapture(e.pointerId);

      /* Trouver le centre du champ dans les coordonnees de la page */
      const canvas = el.closest('[data-canvas-container]');
      if (!canvas) return;

      const canvasRect = canvas.getBoundingClientRect();
      const centerX = canvasRect.left + (fieldX + fieldW / 2) * scale;
      const centerY = canvasRect.top + (fieldY + fieldH / 2) * scale;

      const startAngle = computeAngleDeg(centerX, centerY, e.clientX, e.clientY);

      rotationRef.current = {
        fieldId,
        centerX,
        centerY,
        startAngle,
        startRotation: currentRotation,
      };
    },
    [scale],
  );

  const onRotateMove = useCallback(
    (e: React.PointerEvent) => {
      const state = rotationRef.current;
      if (!state) return;

      const currentAngle = computeAngleDeg(
        state.centerX,
        state.centerY,
        e.clientX,
        e.clientY,
      );
      const delta = currentAngle - state.startAngle;
      let newRotation = state.startRotation + delta;

      /* Snap a 15 degres si Shift est enfonce */
      if (e.shiftKey) {
        newRotation = Math.round(newRotation / 15) * 15;
      }

      updateProp(state.fieldId, 'rotation', normalizeAngle(newRotation));
    },
    [updateProp],
  );

  const onRotateEnd = useCallback(() => {
    rotationRef.current = null;
  }, []);

  return { onRotateStart, onRotateMove, onRotateEnd };
}
