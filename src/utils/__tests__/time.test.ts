import { describe, it, expect } from 'vitest';
import { parseTime, formatTime, displayTime } from '@/utils/time';

describe('parseTime', () => {
  it('convertit M:SS en dixièmes de seconde', () => {
    expect(parseTime('20:00')).toBe(12000);
  });

  it('gère les secondes non nulles', () => {
    expect(parseTime('1:30')).toBe(900);
  });

  it('retourne 0 pour 0:00', () => {
    expect(parseTime('0:00')).toBe(0);
  });

  it('retourne 0 pour un format invalide', () => {
    expect(parseTime('invalid')).toBe(0);
  });

  it('gère les grands nombres', () => {
    expect(parseTime('99:59')).toBe(59990);
  });

  it('parse le format M:SS.t avec dixièmes', () => {
    expect(parseTime('4:59.9')).toBe(2999);
  });

  it('parse le format S.t sous 10 secondes', () => {
    expect(parseTime('9.5')).toBe(95);
  });

  it('parse 0.0 à zéro', () => {
    expect(parseTime('0.0')).toBe(0);
  });

  it('parse 0:10.0 à 100 dixièmes', () => {
    expect(parseTime('0:10.0')).toBe(100);
  });
});

describe('formatTime', () => {
  it('formate en M:SS.t au-dessus de 10 secondes', () => {
    expect(formatTime(900)).toBe('1:30.0');
  });

  it('formate 0 en 0.0', () => {
    expect(formatTime(0)).toBe('0.0');
  });

  it('pad les secondes avec un zéro', () => {
    expect(formatTime(610)).toBe('1:01.0');
  });

  it('gère les grands nombres', () => {
    expect(formatTime(12000)).toBe('20:00.0');
  });

  it('clamp les valeurs négatives à 0.0', () => {
    expect(formatTime(-5)).toBe('0.0');
  });

  it('formate en S.t sous 10 secondes', () => {
    expect(formatTime(95)).toBe('9.5');
  });

  it('formate la frontière 100 dixièmes en M:SS.t', () => {
    expect(formatTime(100)).toBe('0:10.0');
  });

  it('formate 99 dixièmes en S.t', () => {
    expect(formatTime(99)).toBe('9.9');
  });

  it('préserve les dixièmes non nuls', () => {
    expect(formatTime(2999)).toBe('4:59.9');
  });
});

describe('displayTime', () => {
  it('masque les dixièmes au format M:SS.t avec seuil par défaut', () => {
    expect(displayTime('4:59.9')).toBe('4:59');
  });

  it('garde le format M:SS sans dixièmes', () => {
    expect(displayTime('20:00')).toBe('20:00');
  });

  it('garde le format S.t sous le seuil par défaut', () => {
    expect(displayTime('9.5')).toBe('9.5');
  });

  it('garde 0.0 tel quel', () => {
    expect(displayTime('0.0')).toBe('0.0');
  });

  it('masque les dixièmes pour 0:10.0 avec seuil par défaut', () => {
    expect(displayTime('0:10.0')).toBe('0:10');
  });

  describe('seuil configurable', () => {
    it('affiche les dixièmes sous le seuil personnalisé', () => {
      expect(displayTime('0:25.3', 30)).toBe('0:25.3');
    });

    it('masque les dixièmes au-dessus du seuil personnalisé', () => {
      expect(displayTime('0:35.7', 30)).toBe('0:35');
    });

    it('masque les dixièmes pile au seuil', () => {
      expect(displayTime('0:30.0', 30)).toBe('0:30');
    });

    it('affiche toujours les dixièmes avec seuil 0', () => {
      // seuil 0 = jamais de dixièmes (0 secondes < 0 est faux, rien n'est sous 0)
      expect(displayTime('5.5', 0)).toBe('5');
    });

    it('affiche les dixièmes pour un grand seuil', () => {
      expect(displayTime('4:59.9', 600)).toBe('4:59.9');
    });

    it('masque les dixièmes au-dessus d\'un grand seuil', () => {
      expect(displayTime('10:00.0', 600)).toBe('10:00');
    });

    it('garde un temps sans dixièmes inchangé quel que soit le seuil', () => {
      expect(displayTime('20:00', 30)).toBe('20:00');
    });
  });
});
