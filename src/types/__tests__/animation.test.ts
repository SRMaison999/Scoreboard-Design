import { describe, it, expect } from 'vitest';
import { DEFAULT_ANIMATION_CONFIG, DEFAULT_EXPORT_CONFIG } from '@/types/animation';
import type { EntryAnimation, EasingType, AnimationConfig, ExportConfig, VideoFormat, GifQuality } from '@/types/animation';

describe('animation types', () => {
  it('DEFAULT_ANIMATION_CONFIG a les champs requis', () => {
    expect(DEFAULT_ANIMATION_CONFIG.entryAnimation).toBe('fade');
    expect(DEFAULT_ANIMATION_CONFIG.entryDuration).toBe(800);
    expect(DEFAULT_ANIMATION_CONFIG.entryEasing).toBe('ease-out');
    expect(DEFAULT_ANIMATION_CONFIG.exitAnimation).toBe('fade');
    expect(DEFAULT_ANIMATION_CONFIG.exitDuration).toBe(600);
    expect(DEFAULT_ANIMATION_CONFIG.exitEasing).toBe('ease-in');
    expect(DEFAULT_ANIMATION_CONFIG.scorePopEnabled).toBe(true);
    expect(DEFAULT_ANIMATION_CONFIG.scorePopDuration).toBe(400);
    expect(DEFAULT_ANIMATION_CONFIG.penaltyFlashEnabled).toBe(true);
    expect(DEFAULT_ANIMATION_CONFIG.penaltyFlashDuration).toBe(600);
    expect(DEFAULT_ANIMATION_CONFIG.clockPulseEnabled).toBe(true);
    expect(DEFAULT_ANIMATION_CONFIG.clockPulseThreshold).toBe(10);
  });

  it('DEFAULT_EXPORT_CONFIG a les champs requis', () => {
    expect(DEFAULT_EXPORT_CONFIG.videoFormat).toBe('webm');
    expect(DEFAULT_EXPORT_CONFIG.videoFps).toBe(30);
    expect(DEFAULT_EXPORT_CONFIG.gifFps).toBe(10);
    expect(DEFAULT_EXPORT_CONFIG.gifQuality).toBe('medium');
    expect(DEFAULT_EXPORT_CONFIG.gifDuration).toBe(5);
  });

  it('les types EntryAnimation couvrent toutes les valeurs', () => {
    const animations: EntryAnimation[] = ['none', 'fade', 'slide-top', 'slide-bottom', 'slide-left', 'slide-right'];
    expect(animations).toHaveLength(6);
  });

  it('les types EasingType couvrent toutes les valeurs', () => {
    const easings: EasingType[] = ['linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out'];
    expect(easings).toHaveLength(5);
  });

  it('les types VideoFormat couvrent toutes les valeurs', () => {
    const formats: VideoFormat[] = ['webm', 'mp4'];
    expect(formats).toHaveLength(2);
  });

  it('les types GifQuality couvrent toutes les valeurs', () => {
    const qualities: GifQuality[] = ['low', 'medium', 'high'];
    expect(qualities).toHaveLength(3);
  });

  it('AnimationConfig est compatible avec DEFAULT_ANIMATION_CONFIG', () => {
    const config: AnimationConfig = { ...DEFAULT_ANIMATION_CONFIG };
    expect(config.entryAnimation).toBeDefined();
  });

  it('ExportConfig est compatible avec DEFAULT_EXPORT_CONFIG', () => {
    const config: ExportConfig = { ...DEFAULT_EXPORT_CONFIG };
    expect(config.videoFormat).toBeDefined();
  });
});
