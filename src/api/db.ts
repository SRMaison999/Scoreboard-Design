import Dexie from 'dexie';
import type { ScoreboardTemplate } from '@/types/template';
import type { PlayerPhoto } from '@/types/playerPhoto';

class ScoreboardDatabase extends Dexie {
  templates!: Dexie.Table<ScoreboardTemplate, string>;
  playerPhotos!: Dexie.Table<PlayerPhoto, string>;

  constructor() {
    super('scoreboard-editor');
    this.version(1).stores({
      templates: 'id, name, created, modified',
    });
    this.version(2).stores({
      templates: 'id, name, created, modified',
      playerPhotos: 'id, team, number, playerName',
    });
  }
}

export const db = new ScoreboardDatabase();
