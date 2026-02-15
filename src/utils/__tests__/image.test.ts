import { describe, it, expect } from 'vitest';
import { isValidImageFile, isValidVideoFile, fileToDataUrl } from '@/utils/image';

function createFile(name: string, type: string): File {
  return new File(['content'], name, { type });
}

describe('isValidImageFile', () => {
  it('accepte PNG', () => {
    expect(isValidImageFile(createFile('test.png', 'image/png'))).toBe(true);
  });

  it('accepte JPEG', () => {
    expect(isValidImageFile(createFile('test.jpg', 'image/jpeg'))).toBe(true);
  });

  it('accepte WebP', () => {
    expect(isValidImageFile(createFile('test.webp', 'image/webp'))).toBe(true);
  });

  it('rejette GIF', () => {
    expect(isValidImageFile(createFile('test.gif', 'image/gif'))).toBe(false);
  });

  it('rejette un fichier texte', () => {
    expect(isValidImageFile(createFile('test.txt', 'text/plain'))).toBe(false);
  });
});

describe('isValidVideoFile', () => {
  it('accepte MP4', () => {
    expect(isValidVideoFile(createFile('test.mp4', 'video/mp4'))).toBe(true);
  });

  it('accepte WebM', () => {
    expect(isValidVideoFile(createFile('test.webm', 'video/webm'))).toBe(true);
  });

  it('rejette AVI', () => {
    expect(isValidVideoFile(createFile('test.avi', 'video/avi'))).toBe(false);
  });

  it('rejette un fichier image', () => {
    expect(isValidVideoFile(createFile('test.png', 'image/png'))).toBe(false);
  });
});

describe('fileToDataUrl', () => {
  it('lit un fichier et retourne un data URL', async () => {
    const file = new File(['hello'], 'test.txt', { type: 'text/plain' });
    const result = await fileToDataUrl(file);
    expect(result).toMatch(/^data:text\/plain;base64,/);
  });

  it('lit un fichier vide', async () => {
    const file = new File([], 'empty.txt', { type: 'text/plain' });
    const result = await fileToDataUrl(file);
    expect(result).toMatch(/^data:/);
  });
});
