/** Types d'animation d'entrée/sortie du scoreboard. */
export type EntryAnimation =
  | 'none'
  | 'fade'
  | 'slide-top'
  | 'slide-bottom'
  | 'slide-left'
  | 'slide-right';

/** Fonctions d'easing CSS. */
export type EasingType =
  | 'linear'
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out';

/**
 * Configuration des animations du scoreboard.
 */
export interface AnimationConfig {
  /** Animation d'apparition */
  readonly entryAnimation: EntryAnimation;
  readonly entryDuration: number;
  readonly entryEasing: EasingType;

  /** Animation de disparition */
  readonly exitAnimation: EntryAnimation;
  readonly exitDuration: number;
  readonly exitEasing: EasingType;

  /** Animation quand le score change */
  readonly scorePopEnabled: boolean;
  readonly scorePopDuration: number;

  /** Clignotement lors d'une nouvelle pénalité */
  readonly penaltyFlashEnabled: boolean;
  readonly penaltyFlashDuration: number;

  /** Pulsation de l'horloge dans les dernières secondes */
  readonly clockPulseEnabled: boolean;
  readonly clockPulseThreshold: number;
}

export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  entryAnimation: 'fade',
  entryDuration: 800,
  entryEasing: 'ease-out',

  exitAnimation: 'fade',
  exitDuration: 600,
  exitEasing: 'ease-in',

  scorePopEnabled: true,
  scorePopDuration: 400,

  penaltyFlashEnabled: true,
  penaltyFlashDuration: 600,

  clockPulseEnabled: true,
  clockPulseThreshold: 10,
};

/** Format d'export vidéo. */
export type VideoFormat = 'webm' | 'mp4';

/** Qualité d'export GIF. */
export type GifQuality = 'low' | 'medium' | 'high';

/** Configuration de l'export vidéo/GIF. */
export interface ExportConfig {
  readonly videoFormat: VideoFormat;
  readonly videoFps: number;
  readonly gifFps: number;
  readonly gifQuality: GifQuality;
  readonly gifDuration: number;
}

export const DEFAULT_EXPORT_CONFIG: ExportConfig = {
  videoFormat: 'webm',
  videoFps: 30,
  gifFps: 10,
  gifQuality: 'medium',
  gifDuration: 5,
};
