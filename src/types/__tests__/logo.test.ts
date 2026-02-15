import { describe, it, expect } from 'vitest';
import { logoEntryId } from '@/types/logo';
import type { LogoType } from '@/types/logo';

describe('logoEntryId', () => {
  it('génère un ID pour un logo d\'équipe', () => {
    expect(logoEntryId('team', 'CAN')).toBe('team-CAN');
  });

  it('génère un ID pour un logo de compétition', () => {
    expect(logoEntryId('competition', 'olympics')).toBe('competition-olympics');
  });

  it('génère un ID pour un logo de sponsor', () => {
    expect(logoEntryId('sponsor', 'nike')).toBe('sponsor-nike');
  });

  it('retourne le format correct pour tous les types', () => {
    const types: LogoType[] = ['team', 'competition', 'sponsor'];
    for (const t of types) {
      const id = logoEntryId(t, 'test');
      expect(id).toBe(`${t}-test`);
      expect(id).toContain('-');
    }
  });

  it('gère les clés avec caractères spéciaux', () => {
    expect(logoEntryId('team', 'USA-1')).toBe('team-USA-1');
  });
});
