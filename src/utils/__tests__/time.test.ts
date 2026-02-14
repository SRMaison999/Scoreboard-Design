import { describe, it, expect } from 'vitest';
import { parseTime, formatTime } from '@/utils/time';

describe('parseTime', () => {
  it('convertit MM:SS en secondes', () => {
    expect(parseTime('20:00')).toBe(1200);
  });

  it('gère les secondes non nulles', () => {
    expect(parseTime('1:30')).toBe(90);
  });

  it('retourne 0 pour 0:00', () => {
    expect(parseTime('0:00')).toBe(0);
  });

  it('retourne 0 pour un format invalide', () => {
    expect(parseTime('invalid')).toBe(0);
  });

  it('gère les grands nombres', () => {
    expect(parseTime('99:59')).toBe(5999);
  });
});

describe('formatTime', () => {
  it('formate les secondes en M:SS', () => {
    expect(formatTime(90)).toBe('1:30');
  });

  it('formate 0 en 0:00', () => {
    expect(formatTime(0)).toBe('0:00');
  });

  it('pad les secondes avec un zéro', () => {
    expect(formatTime(61)).toBe('1:01');
  });

  it('gère les grands nombres', () => {
    expect(formatTime(1200)).toBe('20:00');
  });

  it('clamp les valeurs négatives à 0:00', () => {
    expect(formatTime(-5)).toBe('0:00');
  });
});
