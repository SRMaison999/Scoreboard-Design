/**
 * Hook pour le glisser-deposer d'elements depuis la bibliotheque vers le canvas.
 * Gere le drag start cote bibliotheque et le drop cote canvas.
 */

import { useState, useCallback, useRef } from 'react';
import { CUSTOM_FIELD_LABELS, LIBRARY_ELEMENTS } from '@/constants/customFields';
import type { FieldElementType, LibraryElement } from '@/types/customField';

/** Cle MIME personnalisee pour identifier les transferts internes */
const DRAG_MIME_TYPE = CUSTOM_FIELD_LABELS.dragMimeType;

/** Donnees serialisees dans le dataTransfer */
interface DragPayload {
  readonly elementType: FieldElementType;
}

/**
 * Demarre le drag d'un element de la bibliotheque.
 * Stocke le type d'element dans le dataTransfer.
 */
function handleDragStart(
  e: React.DragEvent,
  elementType: FieldElementType,
): void {
  const payload: DragPayload = { elementType };
  e.dataTransfer.setData(DRAG_MIME_TYPE, JSON.stringify(payload));
  e.dataTransfer.effectAllowed = 'copy';
}

/**
 * Verifie si un DragEvent transporte un element de la bibliotheque.
 */
function isLibraryDrag(e: React.DragEvent): boolean {
  return e.dataTransfer.types.includes(DRAG_MIME_TYPE);
}

/**
 * Extrait le type d'element depuis le dataTransfer au moment du drop.
 * Retourne null si la payload est invalide.
 */
function extractDropPayload(e: React.DragEvent): LibraryElement | null {
  const raw = e.dataTransfer.getData(DRAG_MIME_TYPE);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    if (
      typeof parsed !== 'object' ||
      parsed === null ||
      !('elementType' in parsed) ||
      typeof (parsed as Record<string, unknown>).elementType !== 'string'
    ) {
      return null;
    }
    const elementType = (parsed as DragPayload).elementType;
    return LIBRARY_ELEMENTS.find((el) => el.type === elementType) ?? null;
  } catch {
    return null;
  }
}

interface CanvasDropResult {
  /** L'element de la bibliotheque depose */
  readonly element: LibraryElement;
  /** Position X dans le canvas (en pixels natifs, avant scaling) */
  readonly canvasX: number;
  /** Position Y dans le canvas (en pixels natifs, avant scaling) */
  readonly canvasY: number;
}

interface UseLibraryDragDropReturn {
  /** Indique si un drag de bibliotheque survole le canvas */
  readonly isDragOver: boolean;
  /** Ref indiquant si un drag est en cours ou vient de se terminer (pour bloquer onClick) */
  readonly wasDragged: React.RefObject<boolean>;
  /** Gestionnaire onDragStart pour les elements de la bibliotheque */
  readonly onDragStart: (e: React.DragEvent, elementType: FieldElementType) => void;
  /** Gestionnaire onDragEnd pour le bouton source (reinitialise le flag de drag) */
  readonly onDragEnd: () => void;
  /** Gestionnaire onDragOver pour le canvas */
  readonly onDragOver: (e: React.DragEvent) => void;
  /** Gestionnaire onDragLeave pour le canvas */
  readonly onDragLeave: (e: React.DragEvent) => void;
  /** Gestionnaire onDrop pour le canvas. Retourne les infos de drop ou null. */
  readonly onDrop: (e: React.DragEvent, canvasScale: number) => CanvasDropResult | null;
}

/**
 * Hook gerant le glisser-deposer depuis la bibliotheque vers le canvas.
 */
export function useLibraryDragDrop(): UseLibraryDragDropReturn {
  const [isDragOver, setIsDragOver] = useState(false);
  const wasDragged = useRef(false);

  const onDragStart = useCallback(
    (e: React.DragEvent, elementType: FieldElementType) => {
      wasDragged.current = true;
      handleDragStart(e, elementType);
    },
    [],
  );

  const onDragEnd = useCallback(() => {
    /* Garder le flag actif un frame pour bloquer le click residuel */
    requestAnimationFrame(() => {
      wasDragged.current = false;
    });
  }, []);

  const onDragOver = useCallback((e: React.DragEvent) => {
    if (!isLibraryDrag(e)) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    /* Ignorer les evenements de drag leave des enfants */
    const related = e.relatedTarget as Node | null;
    if (related && (e.currentTarget as Node).contains(related)) return;
    setIsDragOver(false);
  }, []);

  const onDrop = useCallback(
    (e: React.DragEvent, canvasScale: number): CanvasDropResult | null => {
      e.preventDefault();
      setIsDragOver(false);

      const libraryElement = extractDropPayload(e);
      if (!libraryElement) return null;

      /* Calculer la position relative au canvas en tenant compte du scale */
      const rect = e.currentTarget.getBoundingClientRect();
      const canvasX = Math.round((e.clientX - rect.left) / canvasScale);
      const canvasY = Math.round((e.clientY - rect.top) / canvasScale);

      return {
        element: libraryElement,
        canvasX,
        canvasY,
      };
    },
    [],
  );

  return { isDragOver, wasDragged, onDragStart, onDragEnd, onDragOver, onDragLeave, onDrop };
}
