import type { FontSizeConfig } from '@/types/fontSizes';
import { DEFAULT_FONT_SIZES } from '@/types/fontSizes';

/**
 * Taille minimale autorisee pour un element de texte.
 */
const MIN_FS = 10;

/**
 * References de scaling pour statValue et statLabel.
 * Ces valeurs representent le point 1x (pas de changement)
 * quand le slider est a cette position.
 *
 * Pour statValue : 60 (milieu de la plage 0-120)
 * Pour statLabel : 30 (milieu de la plage 0-60)
 */
const VALUE_REF = 60;
const LABEL_REF = 30;

/**
 * Applique un facteur d'echelle a une taille de police
 * en se basant sur la config du store.
 *
 * Quand configValue est a son default, retourne elementDefault inchange.
 * Quand configValue change, applique un ratio proportionnel.
 */
function scaleFrom(configValue: number, reference: number, elementDefault: number): number {
  if (reference === 0) return elementDefault;
  return Math.max(MIN_FS, Math.round(elementDefault * (configValue / reference)));
}

/**
 * Calcule la taille de police d'un titre pour un body type.
 * Le scaling est proportionnel au ratio fontSizes.title / DEFAULT_TITLE (30).
 *
 * Exemple : si title=30, elementDefault=72 -> 72 (inchange)
 *           si title=45, elementDefault=72 -> 108 (x1.5)
 *           si title=16, elementDefault=72 -> 38 (reduit)
 */
export function bodyTitleFs(fontSizes: FontSizeConfig, elementDefault: number): number {
  return scaleFrom(fontSizes.title, DEFAULT_FONT_SIZES.title, elementDefault);
}

/**
 * Calcule la taille de police d'une valeur (contenu principal) pour un body type.
 * Quand statValue=0 (auto), retourne elementDefault inchange.
 * Quand non-zero, applique un scaling proportionnel par rapport a VALUE_REF.
 */
export function bodyValueFs(fontSizes: FontSizeConfig, elementDefault: number): number {
  if (fontSizes.statValue === 0) return elementDefault;
  return scaleFrom(fontSizes.statValue, VALUE_REF, elementDefault);
}

/**
 * Calcule la taille de police d'un label (annotation secondaire) pour un body type.
 * Quand statLabel=0 (auto), retourne elementDefault inchange.
 * Quand non-zero, applique un scaling proportionnel par rapport a LABEL_REF.
 */
export function bodyLabelFs(fontSizes: FontSizeConfig, elementDefault: number): number {
  if (fontSizes.statLabel === 0) return elementDefault;
  return scaleFrom(fontSizes.statLabel, LABEL_REF, elementDefault);
}

/**
 * Calcule le gap (espacement) dynamique entre les valeurs et les labels de stats.
 * Le gap est proportionnel a la plus grande des deux tailles de police,
 * avec un minimum de securite.
 *
 * Utilise dans les body types 1/2 (grid) et 3 (grid gap).
 */
export function computeStatGap(fsVal: number, fsLabel: number, minGap = 20): number {
  const ref = Math.max(fsVal, fsLabel * 3);
  return Math.max(minGap, Math.round(ref * 0.37));
}

/**
 * Calcule la largeur de la colonne label dans les body types 1/2.
 * S'elargit quand la taille de police des labels augmente.
 */
export function computeLabelColumnWidth(
  fsLabel: number,
  showPenalties: boolean,
): number {
  const base = showPenalties ? 240 : 300;
  return Math.max(base, Math.round(fsLabel * 7));
}

/**
 * Ratio largeur / hauteur standard d'un drapeau (3:2).
 */
const FLAG_ASPECT = 1.5;

/**
 * Calcule les dimensions d'un drapeau pour qu'il ait la meme
 * hauteur que le texte NOC adjacent.
 *
 * La hauteur du drapeau est egale a fontSize : elle correspond
 * a la hauteur du bloc de texte CSS, ce qui garantit un
 * alignement visuel parfait quel que soit le zoom.
 *
 * @param fontSize  Taille de police du texte NOC a cote du drapeau.
 * @returns { w, h } en pixels.
 *
 * Exemple : fontSize=80  -> h=80, w=120
 *           fontSize=40  -> h=40, w=60
 *           fontSize=120 -> h=120, w=180
 */
export function computeFlagDimensions(fontSize: number): { w: number; h: number } {
  const h = Math.max(10, Math.round(fontSize));
  const w = Math.round(h * FLAG_ASPECT);
  return { w, h };
}
