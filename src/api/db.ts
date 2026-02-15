import Dexie from 'dexie';
import type { ScoreboardTemplate } from '@/types/template';

class ScoreboardDatabase extends Dexie {
  templates!: Dexie.Table<ScoreboardTemplate, string>;

  constructor() {
    super('scoreboard-editor');
    this.version(1).stores({
      templates: 'id, name, created, modified',
    });
  }
}

export const db = new ScoreboardDatabase();
