import { describe, it, expect } from 'vitest';
import {
  entryKeyframeName,
  exitKeyframeName,
  buildAnimationCss,
  parseTimeToSeconds,
} from '@/utils/animation';

describe('entryKeyframeName', () => {
  it('retourne sb-fade-in pour fade', () => {
    expect(entryKeyframeName('fade')).toBe('sb-fade-in');
  });

  it('retourne sb-slide-top-in pour slide-top', () => {
    expect(entryKeyframeName('slide-top')).toBe('sb-slide-top-in');
  });

  it('retourne sb-slide-bottom-in pour slide-bottom', () => {
    expect(entryKeyframeName('slide-bottom')).toBe('sb-slide-bottom-in');
  });

  it('retourne sb-slide-left-in pour slide-left', () => {
    expect(entryKeyframeName('slide-left')).toBe('sb-slide-left-in');
  });

  it('retourne sb-slide-right-in pour slide-right', () => {
    expect(entryKeyframeName('slide-right')).toBe('sb-slide-right-in');
  });

  it('retourne une chaine vide pour none', () => {
    expect(entryKeyframeName('none')).toBe('');
  });
});

describe('exitKeyframeName', () => {
  it('retourne sb-fade-out pour fade', () => {
    expect(exitKeyframeName('fade')).toBe('sb-fade-out');
  });

  it('retourne sb-slide-top-out pour slide-top', () => {
    expect(exitKeyframeName('slide-top')).toBe('sb-slide-top-out');
  });

  it('retourne une chaine vide pour none', () => {
    expect(exitKeyframeName('none')).toBe('');
  });
});

describe('buildAnimationCss', () => {
  it('construit la propriete animation CSS', () => {
    const result = buildAnimationCss('sb-fade-in', 800, 'ease-out');
    expect(result).toBe('sb-fade-in 800ms ease-out both');
  });

  it('retourne none si keyframe est vide', () => {
    expect(buildAnimationCss('', 800, 'ease-out')).toBe('none');
  });

  it('respecte le fillMode personnalise', () => {
    const result = buildAnimationCss('sb-fade-in', 500, 'linear', 'forwards');
    expect(result).toBe('sb-fade-in 500ms linear forwards');
  });
});

describe('parseTimeToSeconds', () => {
  it('parse MM:SS', () => {
    expect(parseTimeToSeconds('5:00')).toBe(300);
  });

  it('parse MM:SS.d', () => {
    expect(parseTimeToSeconds('1:30.5')).toBeCloseTo(90.5);
  });

  it('parse 0:09.9', () => {
    expect(parseTimeToSeconds('0:09.9')).toBeCloseTo(9.9);
  });

  it('parse 20:00', () => {
    expect(parseTimeToSeconds('20:00')).toBe(1200);
  });

  it('retourne 0 pour une chaine vide', () => {
    expect(parseTimeToSeconds('')).toBe(0);
  });

  it('retourne 0 pour une chaine invalide', () => {
    expect(parseTimeToSeconds('abc')).toBe(0);
  });
});
