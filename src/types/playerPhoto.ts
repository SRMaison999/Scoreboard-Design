/**
 * Photo de joueur persistee dans IndexedDB.
 * Cle : equipe + numero (ex: "CAN-11").
 */
export interface PlayerPhoto {
  readonly id: string;
  readonly team: string;
  readonly number: string;
  readonly playerName: string;
  readonly dataUrl: string;
  readonly created: string;
}

/**
 * Genere la cle unique d'une photo joueur.
 */
export function playerPhotoKey(team: string, number: string): string {
  return `${team}-${number}`;
}
