import type { ScoreboardState } from './scoreboard';

export interface ScoreboardTemplate {
  readonly id: string;
  readonly name: string;
  readonly created: string;
  readonly modified: string;
  readonly state: ScoreboardState;
}

export interface TemplateFileFormat {
  readonly version: string;
  readonly name: string;
  readonly created: string;
  readonly modified: string;
  readonly state: ScoreboardState;
}
