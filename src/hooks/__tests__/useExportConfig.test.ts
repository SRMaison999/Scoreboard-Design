import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useExportConfig } from '@/hooks/useExportConfig';

describe('useExportConfig', () => {
  it('initialise avec les valeurs par defaut', () => {
    const { result } = renderHook(() => useExportConfig());
    expect(result.current.config.videoFormat).toBe('webm');
    expect(result.current.config.videoFps).toBe(30);
    expect(result.current.config.gifFps).toBe(10);
    expect(result.current.config.gifQuality).toBe('medium');
    expect(result.current.config.gifDuration).toBe(5);
  });

  it('met a jour un champ de la config', () => {
    const { result } = renderHook(() => useExportConfig());

    act(() => {
      result.current.updateField('videoFormat', 'mp4');
    });

    expect(result.current.config.videoFormat).toBe('mp4');
  });

  it('met a jour videoFps', () => {
    const { result } = renderHook(() => useExportConfig());

    act(() => {
      result.current.updateField('videoFps', 60);
    });

    expect(result.current.config.videoFps).toBe(60);
  });

  it('met a jour gifQuality', () => {
    const { result } = renderHook(() => useExportConfig());

    act(() => {
      result.current.updateField('gifQuality', 'high');
    });

    expect(result.current.config.gifQuality).toBe('high');
  });

  it('preserve les autres champs lors d une mise a jour', () => {
    const { result } = renderHook(() => useExportConfig());

    act(() => {
      result.current.updateField('gifDuration', 10);
    });

    expect(result.current.config.videoFormat).toBe('webm');
    expect(result.current.config.gifDuration).toBe(10);
  });
});
