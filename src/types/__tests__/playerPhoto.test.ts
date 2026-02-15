import { describe, it, expect } from 'vitest';
import { playerPhotoKey } from '@/types/playerPhoto';

describe('playerPhotoKey', () => {
  it('génère une clé au format TEAM-NUMBER', () => {
    expect(playerPhotoKey('CAN', '11')).toBe('CAN-11');
  });

  it('gère les numéros à un chiffre', () => {
    expect(playerPhotoKey('SVK', '1')).toBe('SVK-1');
  });

  it('gère les numéros à trois chiffres', () => {
    expect(playerPhotoKey('FIN', '100')).toBe('FIN-100');
  });

  it('gère les équipes en minuscules', () => {
    expect(playerPhotoKey('can', '99')).toBe('can-99');
  });

  it('gère les chaînes vides', () => {
    expect(playerPhotoKey('', '')).toBe('-');
  });
});
