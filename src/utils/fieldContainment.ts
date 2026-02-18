/**
 * Utilitaires pour la détection des champs contenus dans un champ parent
 * et la conversion entre positions absolues et relatives.
 * Utilisé par le système de presets pour sauvegarder un champ
 * avec tous les éléments visuellement placés à l'intérieur.
 */

import type { CustomField } from '@/types/customField';

/** Seuil : un champ est considéré "contenu" si au moins 50% de sa surface est dans le parent */
const CONTAINMENT_THRESHOLD = 0.5;

/**
 * Calcule la fraction de la surface du champ enfant qui se trouve
 * à l'intérieur des bornes du parent.
 */
function overlapRatio(parent: CustomField, child: CustomField): number {
  const overlapX = Math.max(
    0,
    Math.min(parent.x + parent.width, child.x + child.width) -
      Math.max(parent.x, child.x),
  );
  const overlapY = Math.max(
    0,
    Math.min(parent.y + parent.height, child.y + child.height) -
      Math.max(parent.y, child.y),
  );
  const overlapArea = overlapX * overlapY;
  const childArea = child.width * child.height;
  if (childArea === 0) return 0;
  return overlapArea / childArea;
}

/**
 * Parmi tous les champs, retourne ceux qui sont visuellement contenus
 * dans le parent (au moins CONTAINMENT_THRESHOLD de recouvrement),
 * en excluant le parent lui-même.
 */
export function getContainedFields(
  parent: CustomField,
  allFields: readonly CustomField[],
): CustomField[] {
  return allFields.filter(
    (f) => f.id !== parent.id && overlapRatio(parent, f) >= CONTAINMENT_THRESHOLD,
  );
}

/**
 * Convertit des champs en positions relatives par rapport au parent.
 * Les coordonnées x/y deviennent des offsets depuis le coin supérieur gauche du parent.
 */
export function toRelativePositions(
  parent: CustomField,
  children: readonly CustomField[],
): CustomField[] {
  return children.map((child) => ({
    ...structuredClone(child),
    x: child.x - parent.x,
    y: child.y - parent.y,
  }));
}

/**
 * Convertit des champs en positions absolues à partir d'un parent.
 * Les offsets relatifs sont recalculés en coordonnées absolues.
 */
export function toAbsolutePositions(
  parent: CustomField,
  children: readonly CustomField[],
): CustomField[] {
  return children.map((child) => ({
    ...structuredClone(child),
    x: parent.x + child.x,
    y: parent.y + child.y,
  }));
}
