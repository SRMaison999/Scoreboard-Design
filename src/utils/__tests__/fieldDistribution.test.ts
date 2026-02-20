/**
 * Tests pour les utilitaires de distribution et d'espacement.
 */

import { describe, it, expect } from 'vitest';
import { distributeFields } from '../fieldDistribution';

function makeRect(id: string, x: number, y: number, w = 100, h = 50) {
  return { id, x, y, width: w, height: h };
}

describe('distributeFields', () => {
  describe('distribute-h', () => {
    it('distribue 3 champs horizontalement', () => {
      const fields = [
        makeRect('a', 0, 0),
        makeRect('b', 500, 0),
        makeRect('c', 200, 0),
      ];
      const result = distributeFields(fields, 'distribute-h');
      expect(result).toHaveLength(3);
      const sorted = [...result].sort((a, b) => a.x - b.x);
      expect(sorted[0]!.id).toBe('a');
      expect(sorted[2]!.id).toBe('b');
    });

    it('ne modifie pas les positions avec moins de 3 champs', () => {
      const fields = [makeRect('a', 0, 0), makeRect('b', 200, 0)];
      const result = distributeFields(fields, 'distribute-h');
      expect(result[0]!.x).toBe(0);
      expect(result[1]!.x).toBe(200);
    });
  });

  describe('distribute-v', () => {
    it('distribue 3 champs verticalement', () => {
      const fields = [
        makeRect('a', 0, 0),
        makeRect('b', 0, 400),
        makeRect('c', 0, 150),
      ];
      const result = distributeFields(fields, 'distribute-v');
      expect(result).toHaveLength(3);
      const sorted = [...result].sort((a, b) => a.y - b.y);
      expect(sorted[0]!.id).toBe('a');
      expect(sorted[2]!.id).toBe('b');
    });
  });

  describe('space-h', () => {
    it('espace les champs horizontalement avec un gap donne', () => {
      const fields = [
        makeRect('a', 0, 0, 100, 50),
        makeRect('b', 300, 0, 100, 50),
      ];
      const result = distributeFields(fields, 'space-h', 20);
      expect(result[0]!.x).toBe(0);
      expect(result[1]!.x).toBe(120);
    });
  });

  describe('space-v', () => {
    it('espace les champs verticalement avec un gap donne', () => {
      const fields = [
        makeRect('a', 0, 0, 100, 50),
        makeRect('b', 0, 300, 100, 50),
      ];
      const result = distributeFields(fields, 'space-v', 10);
      expect(result[0]!.y).toBe(0);
      expect(result[1]!.y).toBe(60);
    });
  });

  describe('align-sel-left', () => {
    it('aligne les bords gauches sur le minimum', () => {
      const fields = [
        makeRect('a', 50, 0),
        makeRect('b', 200, 100),
        makeRect('c', 100, 200),
      ];
      const result = distributeFields(fields, 'align-sel-left');
      expect(result.every((r) => r.x === 50)).toBe(true);
    });
  });

  describe('align-sel-right', () => {
    it('aligne les bords droits sur le maximum', () => {
      const fields = [
        makeRect('a', 50, 0, 100),
        makeRect('b', 200, 100, 100),
      ];
      const result = distributeFields(fields, 'align-sel-right');
      expect(result[0]!.x + 100).toBe(300);
      expect(result[1]!.x + 100).toBe(300);
    });
  });

  describe('align-sel-center-h', () => {
    it('centre horizontalement les champs', () => {
      const fields = [
        makeRect('a', 0, 0, 100),
        makeRect('b', 200, 0, 100),
      ];
      const result = distributeFields(fields, 'align-sel-center-h');
      const centerA = result[0]!.x + 50;
      const centerB = result[1]!.x + 50;
      expect(centerA).toBe(centerB);
    });
  });

  describe('align-sel-top', () => {
    it('aligne les bords superieurs', () => {
      const fields = [
        makeRect('a', 0, 100),
        makeRect('b', 100, 50),
      ];
      const result = distributeFields(fields, 'align-sel-top');
      expect(result.every((r) => r.y === 50)).toBe(true);
    });
  });

  describe('align-sel-bottom', () => {
    it('aligne les bords inferieurs', () => {
      const fields = [
        makeRect('a', 0, 100, 100, 50),
        makeRect('b', 100, 200, 100, 80),
      ];
      const result = distributeFields(fields, 'align-sel-bottom');
      expect(result[0]!.y + 50).toBe(280);
      expect(result[1]!.y + 80).toBe(280);
    });
  });

  describe('align-sel-center-v', () => {
    it('centre verticalement les champs', () => {
      const fields = [
        makeRect('a', 0, 0, 100, 50),
        makeRect('b', 0, 200, 100, 80),
      ];
      const result = distributeFields(fields, 'align-sel-center-v');
      const centerA = result[0]!.y + 25;
      const centerB = result[1]!.y + 40;
      expect(centerA).toBe(centerB);
    });
  });

  it('retourne les positions inchangees avec un seul champ', () => {
    const fields = [makeRect('a', 50, 100)];
    const result = distributeFields(fields, 'align-sel-left');
    expect(result[0]!.x).toBe(50);
    expect(result[0]!.y).toBe(100);
  });
});
