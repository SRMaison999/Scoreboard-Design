/**
 * Presets de layouts hockey pour le bodyType 14 (layout libre).
 * Fournit des dispositions pr\u00e9configur\u00e9es de champs personnalis\u00e9s
 * pour les retransmissions de hockey sur glace.
 */

import type { CustomField } from '@/types/customField';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import {
  makeTextField,
  makeTeamNameField,
  makeScoreField,
  makeClockField,
  makePeriodField,
  makePenaltyColumn,
  makeStatLine,
} from '@/utils/presetFieldBuilders';

/* --- Interface du preset --- */

export interface HockeyLayoutPreset {
  readonly id: string;
  readonly name: string;
  readonly description: string;
  readonly fields: readonly CustomField[];
}

/* --- 1. Score simple (5 champs) --- */

const simpleScoreFields: readonly CustomField[] = [
  makeTeamNameField(
    'preset-simple-team1', '\u00c9quipe 1',
    200, 400, 350, 80, 'left',
  ),
  makeTeamNameField(
    'preset-simple-team2', '\u00c9quipe 2',
    1370, 400, 350, 80, 'right',
  ),
  makeScoreField(
    'preset-simple-score1', 'Score gauche',
    760, 380, 120, 120, 'left',
  ),
  makeScoreField(
    'preset-simple-score2', 'Score droite',
    1040, 380, 120, 120, 'right',
  ),
  makeClockField(
    'preset-simple-clock', 'Horloge',
    810, 260, 300, 80, 3,
  ),
];

/* --- 2. Score avec p\u00e9nalit\u00e9s (7 champs) --- */

const penaltyScoreFields: readonly CustomField[] = [
  makeTeamNameField(
    'preset-penalty-team1', '\u00c9quipe 1',
    200, 300, 350, 80, 'left',
  ),
  makeTeamNameField(
    'preset-penalty-team2', '\u00c9quipe 2',
    1370, 300, 350, 80, 'right',
  ),
  makeScoreField(
    'preset-penalty-score1', 'Score gauche',
    760, 280, 120, 120, 'left',
  ),
  makeScoreField(
    'preset-penalty-score2', 'Score droite',
    1040, 280, 120, 120, 'right',
  ),
  makeClockField(
    'preset-penalty-clock', 'Horloge',
    810, 160, 300, 80, 3,
  ),
  makePenaltyColumn(
    'preset-penalty-left', 'P\u00e9nalit\u00e9s gauche',
    200, 420, 350, 400, 'left',
  ),
  makePenaltyColumn(
    'preset-penalty-right', 'P\u00e9nalit\u00e9s droite',
    1370, 420, 350, 400, 'right',
  ),
];

/* --- 3. Bandeau inf\u00e9rieur (5 champs) --- */

const lowerThirdFields: readonly CustomField[] = [
  makeTeamNameField(
    'preset-lower-team1', '\u00c9quipe 1',
    60, 920, 300, 60, 'left',
  ),
  makeScoreField(
    'preset-lower-score1', 'Score gauche',
    400, 910, 100, 80, 'left',
  ),
  makeTextField(
    'preset-lower-separator', 'S\u00e9parateur',
    520, 920, 80, 60, '-', 48,
    { textAlign: 'center', zIndex: 2 },
  ),
  makeScoreField(
    'preset-lower-score2', 'Score droite',
    620, 910, 100, 80, 'right',
  ),
  makeTeamNameField(
    'preset-lower-team2', '\u00c9quipe 2',
    760, 920, 300, 60, 'right',
  ),
];

/* --- 4. Statistiques compl\u00e8tes (12 champs) --- */

const fullStatsFields: readonly CustomField[] = [
  makeTeamNameField(
    'preset-stats-team1', '\u00c9quipe 1',
    160, 120, 350, 80, 'left',
  ),
  makeTeamNameField(
    'preset-stats-team2', '\u00c9quipe 2',
    1410, 120, 350, 80, 'right',
  ),
  makeScoreField(
    'preset-stats-score1', 'Score gauche',
    760, 100, 120, 120, 'left',
  ),
  makeScoreField(
    'preset-stats-score2', 'Score droite',
    1040, 100, 120, 120, 'right',
  ),
  makeClockField(
    'preset-stats-clock', 'Horloge',
    810, 20, 300, 60, 4,
  ),
  makePeriodField(
    'preset-stats-period', 'P\u00e9riode',
    860, 240, 200, 50, 4,
  ),
  makeTextField(
    'preset-stats-title', 'Titre statistiques',
    660, 320, 600, 60, 'STATISTIQUES', 36,
    { textAlign: 'center', zIndex: 2 },
  ),
  makeStatLine(
    'preset-stats-shots', 'Tirs au but',
    360, 420, 1200, 60, 0,
  ),
  makeStatLine(
    'preset-stats-powerplay', 'Avantages num\u00e9riques',
    360, 500, 1200, 60, 1,
  ),
  makeStatLine(
    'preset-stats-faceoffs', 'Mises en jeu',
    360, 580, 1200, 60, 2,
  ),
  makeStatLine(
    'preset-stats-pim', 'Minutes de p\u00e9nalit\u00e9',
    360, 660, 1200, 60, 3,
  ),
  makeStatLine(
    'preset-stats-hits', 'Mises en \u00e9chec',
    360, 740, 1200, 60, 4,
  ),
];

/* --- Export des presets --- */

export const HOCKEY_LAYOUT_PRESETS: readonly HockeyLayoutPreset[] = [
  {
    id: 'hockey-simple-score',
    name: CUSTOM_FIELD_LABELS.hockeyPresetSimpleScore,
    description: 'Affichage de score classique avec noms d\u2019\u00e9quipes, scores et horloge',
    fields: simpleScoreFields,
  },
  {
    id: 'hockey-with-penalties',
    name: CUSTOM_FIELD_LABELS.hockeyPresetWithPenalties,
    description: 'Score avec colonnes de p\u00e9nalit\u00e9s sous chaque \u00e9quipe',
    fields: penaltyScoreFields,
  },
  {
    id: 'hockey-lower-third',
    name: CUSTOM_FIELD_LABELS.hockeyPresetLowerThird,
    description: 'Bandeau horizontal en bas d\u2019\u00e9cran avec score et \u00e9quipes',
    fields: lowerThirdFields,
  },
  {
    id: 'hockey-full-stats',
    name: CUSTOM_FIELD_LABELS.hockeyPresetFullStats,
    description: 'Tableau complet avec score, p\u00e9riode et statistiques d\u00e9taill\u00e9es',
    fields: fullStatsFields,
  },
];
