export interface ResolutionPreset {
  readonly label: string;
  readonly width: number;
  readonly height: number;
}

export const RESOLUTION_PRESETS: readonly ResolutionPreset[] = [
  { label: 'Full HD (1920x1080)', width: 1920, height: 1080 },
  { label: '4K UHD (3840x2160)', width: 3840, height: 2160 },
  { label: 'HD 720p (1280x720)', width: 1280, height: 720 },
  { label: 'SD 4:3 (1440x1080)', width: 1440, height: 1080 },
  { label: 'Carré (1080x1080)', width: 1080, height: 1080 },
  { label: 'Ultra-wide (2560x1080)', width: 2560, height: 1080 },
];

export const DEFAULT_TEMPLATE_WIDTH = 1920;
export const DEFAULT_TEMPLATE_HEIGHT = 1080;
