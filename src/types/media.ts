export type MediaType = 'image' | 'video';

export interface MediaEntry {
  readonly id: string;
  readonly type: MediaType;
  readonly dataUrl: string;
  readonly name: string;
  readonly mimeType: string;
}

export type BackgroundMediaMode = 'none' | 'image' | 'video';

export const ACCEPTED_IMAGE_FORMATS = ['image/png', 'image/jpeg', 'image/webp'];
export const ACCEPTED_VIDEO_FORMATS = ['video/mp4', 'video/webm'];
export const MAX_PHOTO_DIMENSION = 200;
export const MAX_BG_IMAGE_DIMENSION = 1920;
