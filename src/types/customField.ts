/**
 * Types pour le constructeur de champs personnalisés (Body Type 14).
 * Permet de placer librement des éléments sur le canvas.
 */

/* --- Catégories de la bibliothèque d'éléments --- */

export type LibraryCategory =
  | 'match'
  | 'text'
  | 'data'
  | 'players'
  | 'media'
  | 'composed';

/* --- Types d'éléments disponibles --- */

export type FieldElementType =
  /* Match */
  | 'score-display'
  | 'clock-display'
  | 'period-display'
  | 'team-name'
  | 'flag-display'
  | 'timeout-display'
  | 'shootout-display'
  /* Texte */
  | 'text-block'
  /* Données */
  | 'stat-line'
  | 'bar-compare'
  /* Joueurs */
  | 'player-photo'
  /* Médias */
  | 'image-block'
  | 'shape-block'
  | 'separator-line'
  /* Composés (body types existants) */
  | 'body-type-1'
  | 'body-type-2'
  | 'body-type-3'
  | 'body-type-4'
  | 'body-type-5'
  | 'body-type-6'
  | 'body-type-7'
  | 'body-type-8'
  | 'body-type-9'
  | 'body-type-10'
  | 'body-type-11'
  | 'body-type-12'
  | 'body-type-13'
  /* Sections existantes */
  | 'header-block'
  | 'penalty-column';

/* --- Configuration spécifique par type d'élément --- */

export interface TextBlockConfig {
  readonly content: string;
  readonly fontSize: number;
  readonly fontWeight: number;
  readonly fontFamily: string;
  readonly textAlign: 'left' | 'center' | 'right';
  readonly textTransform: 'none' | 'uppercase' | 'lowercase';
  readonly letterSpacing: number;
}

export interface ScoreDisplayConfig {
  readonly side: 'left' | 'right';
  readonly showLabel: boolean;
  readonly fontSizeOverride: number;
}

export interface ClockDisplayConfig {
  readonly showPeriod: boolean;
  readonly showBox: boolean;
  readonly fontSizeOverride: number;
}

export interface TeamNameConfig {
  readonly side: 'left' | 'right';
  readonly showFlag: boolean;
  readonly fontSizeOverride: number;
}

export interface PeriodDisplayConfig {
  readonly fontSizeOverride: number;
}

export interface FlagDisplayConfig {
  readonly side: 'left' | 'right';
}

export interface PenaltyColumnConfig {
  readonly side: 'left' | 'right';
}

export interface StatLineConfig {
  readonly statIndex: number;
}

export interface BarCompareConfig {
  readonly barIndex: number;
}

export interface PlayerPhotoConfig {
  readonly photoKey: string;
  readonly shape: 'circle' | 'square';
}

export interface ImageBlockConfig {
  readonly src: string;
  readonly objectFit: 'cover' | 'contain' | 'fill';
}

export interface ShapeBlockConfig {
  readonly shape: 'rectangle' | 'circle' | 'rounded-rect';
  readonly fillColor: string;
  readonly fillOpacity: number;
  readonly borderColor: string;
  readonly borderWidth: number;
  readonly borderRadius: number;
}

export interface SeparatorLineConfig {
  readonly orientation: 'horizontal' | 'vertical';
  readonly thickness: number;
  readonly lineColor: string;
  readonly lineOpacity: number;
}

export interface BodyTypeBlockConfig {
  readonly bodyTypeId: number;
}

export interface HeaderBlockConfig {
  readonly showClock: boolean;
}

export type TimeoutDisplayConfig = Record<string, never>;
export type ShootoutDisplayConfig = Record<string, never>;

/**
 * Union discriminée des configurations d'éléments.
 * Chaque type d'élément a sa config associée.
 */
export type FieldElementConfig =
  | { readonly type: 'text-block'; readonly config: TextBlockConfig }
  | { readonly type: 'score-display'; readonly config: ScoreDisplayConfig }
  | { readonly type: 'clock-display'; readonly config: ClockDisplayConfig }
  | { readonly type: 'period-display'; readonly config: PeriodDisplayConfig; }
  | { readonly type: 'team-name'; readonly config: TeamNameConfig }
  | { readonly type: 'flag-display'; readonly config: FlagDisplayConfig }
  | { readonly type: 'timeout-display'; readonly config: TimeoutDisplayConfig }
  | { readonly type: 'shootout-display'; readonly config: ShootoutDisplayConfig }
  | { readonly type: 'stat-line'; readonly config: StatLineConfig }
  | { readonly type: 'bar-compare'; readonly config: BarCompareConfig }
  | { readonly type: 'player-photo'; readonly config: PlayerPhotoConfig }
  | { readonly type: 'image-block'; readonly config: ImageBlockConfig }
  | { readonly type: 'shape-block'; readonly config: ShapeBlockConfig }
  | { readonly type: 'separator-line'; readonly config: SeparatorLineConfig }
  | { readonly type: 'header-block'; readonly config: HeaderBlockConfig }
  | { readonly type: 'penalty-column'; readonly config: PenaltyColumnConfig }
  | { readonly type: 'body-type-1'; readonly config: BodyTypeBlockConfig }
  | { readonly type: 'body-type-2'; readonly config: BodyTypeBlockConfig }
  | { readonly type: 'body-type-3'; readonly config: BodyTypeBlockConfig }
  | { readonly type: 'body-type-4'; readonly config: BodyTypeBlockConfig }
  | { readonly type: 'body-type-5'; readonly config: BodyTypeBlockConfig }
  | { readonly type: 'body-type-6'; readonly config: BodyTypeBlockConfig }
  | { readonly type: 'body-type-7'; readonly config: BodyTypeBlockConfig }
  | { readonly type: 'body-type-8'; readonly config: BodyTypeBlockConfig }
  | { readonly type: 'body-type-9'; readonly config: BodyTypeBlockConfig }
  | { readonly type: 'body-type-10'; readonly config: BodyTypeBlockConfig }
  | { readonly type: 'body-type-11'; readonly config: BodyTypeBlockConfig }
  | { readonly type: 'body-type-12'; readonly config: BodyTypeBlockConfig }
  | { readonly type: 'body-type-13'; readonly config: BodyTypeBlockConfig };

/* --- Style d'un champ --- */

export interface FieldShadow {
  offsetX: number;
  offsetY: number;
  blur: number;
  color: string;
  opacity: number;
}

export interface FieldStyle {
  backgroundColor: string;
  backgroundOpacity: number;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  padding: number;
  /** Opacite globale de l'element (0-100) */
  opacity: number;
  /** Ombre portee */
  shadow: FieldShadow | null;
  /** Flou d'arriere-plan en pixels */
  backdropBlur: number;
}

/* --- Champ personnalisé --- */

export interface CustomField {
  id: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  /** Rotation en degres (0 par defaut) */
  rotation: number;
  zIndex: number;
  locked: boolean;
  visible: boolean;
  lockAspectRatio: boolean;
  scaleContent: boolean;
  initialWidth: number;
  initialHeight: number;
  element: FieldElementConfig;
  style: FieldStyle;
}

/* --- Données du constructeur de champs --- */

export interface CustomFieldsData {
  fields: CustomField[];
  fullPageMode: boolean;
  snapToGrid: boolean;
  gridSize: number;
  showGuides: boolean;
  selectedFieldIds: string[];
  zoneSelectionActive: boolean;
}

/* --- Élément de la bibliothèque (pour le panneau) --- */

export interface LibraryElement {
  readonly type: FieldElementType;
  readonly label: string;
  readonly category: LibraryCategory;
  readonly defaultWidth: number;
  readonly defaultHeight: number;
  readonly minWidth: number;
  readonly minHeight: number;
  readonly icon: string;
}

/* --- Type de poignée de redimensionnement --- */

export type ResizeHandle =
  | 'top'
  | 'bottom'
  | 'left'
  | 'right'
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right';

/* --- Constantes de dimensions --- */

export const FIELD_MIN_SIZE = 40;
export const FIELD_MAX_FIELDS = 50;
export const GRID_SIZE_OPTIONS = [10, 20, 50] as const;
export type GridSizeOption = (typeof GRID_SIZE_OPTIONS)[number];

/* --- Configuration par défaut --- */

export const DEFAULT_FIELD_STYLE: FieldStyle = {
  backgroundColor: '',
  backgroundOpacity: 0,
  borderColor: '',
  borderWidth: 0,
  borderRadius: 0,
  padding: 0,
  opacity: 100,
  shadow: null,
  backdropBlur: 0,
};

export const DEFAULT_CUSTOM_FIELDS_DATA: CustomFieldsData = {
  fields: [],
  fullPageMode: false,
  snapToGrid: true,
  gridSize: 20,
  showGuides: true,
  selectedFieldIds: [],
  zoneSelectionActive: false,
};
