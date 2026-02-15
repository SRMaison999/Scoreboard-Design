import Dexie from 'dexie';
import type { ScoreboardTemplate } from '@/types/template';
import type { PlayerPhoto } from '@/types/playerPhoto';
import type { LogoEntry } from '@/types/logo';

class ScoreboardDatabase extends Dexie {
  templates!: Dexie.Table<ScoreboardTemplate, string>;
  playerPhotos!: Dexie.Table<PlayerPhoto, string>;
  logos!: Dexie.Table<LogoEntry, string>;

  constructor() {
    super('scoreboard-editor');
    this.version(1).stores({
      templates: 'id, name, created, modified',
    });
    this.version(2).stores({
      templates: 'id, name, created, modified',
      playerPhotos: 'id, team, number, playerName',
    });
    this.version(3).stores({
      templates: 'id, name, created, modified',
      playerPhotos: 'id, team, number, playerName',
      logos: 'id, logoType, key, name',
    });
  }
}

export const db = new ScoreboardDatabase();
