/**
 * Generateur de specifications techniques a partir de l'etat du scoreboard.
 * Produit un JSON structure qu'un developpeur peut utiliser pour recreer
 * l'affichage exact du scoreboard.
 */

import { ff } from '@/utils/font';
import { HOCKEY_NATIONS } from '@/constants/nations';
import type { ScoreboardState, BodyTypeId } from '@/types/scoreboard';
import type { FontSizeConfig } from '@/types/fontSizes';
import type { ColorMap, OpacityMap } from '@/types/colors';

const SPEC_VERSION = '1.0';

const BODY_TYPE_NAMES: Readonly<Record<BodyTypeId, string>> = {
  1: 'Stats centrées',
  2: 'Stats gauche/droite',
  3: 'Stats joueur',
  4: 'Célébration de but',
  5: 'Fiche joueur',
  6: 'Classement',
  7: 'Score final',
  8: 'Texte libre',
  9: 'Face-à-face',
  10: 'Chronologie',
  11: 'Barres comparatives',
  12: 'Composition d\'équipe',
  13: 'Calendrier',
  14: 'Layout libre',
};

interface SpecTeam {
  readonly code: string;
  readonly name: string;
  readonly score: string;
}

interface SpecFont {
  readonly id: string;
  readonly family: string;
}

interface SpecCanvas {
  readonly width: number;
  readonly height: number;
}

interface SpecBackground {
  readonly mode: string;
  readonly colors: { readonly top: string; readonly mid: string; readonly bot: string };
  readonly opacities: OpacityMap;
}

interface SpecHeader {
  readonly teamLeft: SpecTeam;
  readonly teamRight: SpecTeam;
  readonly clock: { readonly time: string; readonly visible: boolean; readonly boxMode: string; readonly tenthsThreshold: number };
  readonly period: { readonly text: string; readonly options: unknown[] };
  readonly penalties: { readonly show: boolean; readonly left: unknown[]; readonly right: unknown[] };
  readonly timeouts: { readonly show: boolean; readonly left: number; readonly right: number };
  readonly shootout: { readonly show: boolean; readonly left: unknown[]; readonly right: unknown[] };
}

interface SpecFonts {
  readonly teams: SpecFont;
  readonly clock: SpecFont;
  readonly body: SpecFont;
}

export interface ScoreboardSpec {
  readonly version: string;
  readonly generated: string;
  readonly canvas: SpecCanvas;
  readonly background: SpecBackground;
  readonly header: SpecHeader;
  readonly fonts: SpecFonts;
  readonly fontSizes: FontSizeConfig;
  readonly colors: ColorMap;
  readonly body: {
    readonly type: number;
    readonly label: string;
    readonly data: unknown;
  };
  readonly logos: {
    readonly mode: string;
    readonly competition: { readonly show: boolean; readonly position: string; readonly size: number };
    readonly sponsor: { readonly show: boolean; readonly position: string; readonly size: number };
  };
  readonly animations: unknown;
  readonly visibility: { readonly visible: boolean };
  readonly media: { readonly mode: string; readonly url: string };
}

function resolveNationName(code: string): string {
  const nation = HOCKEY_NATIONS.find((n) => n.noc === code);
  return nation?.name ?? code;
}

function buildFont(id: string): SpecFont {
  return { id, family: ff(id as Parameters<typeof ff>[0]) };
}

function getBodyData(state: ScoreboardState): unknown {
  switch (state.bodyType) {
    case 1: return { stats: structuredClone(state.stats), titles: { center: state.titleCenter, left: state.titleLeft, right: state.titleRight } };
    case 2: return { stats: structuredClone(state.stats), titles: { center: state.titleCenter, left: state.titleLeft, right: state.titleRight } };
    case 3: return { playerStats: structuredClone(state.playerStats), showPhoto: state.showPlayerPhoto, titles: { center: state.titleCenter } };
    case 4: return structuredClone(state.goalData);
    case 5: return structuredClone(state.playerCardData);
    case 6: return structuredClone(state.standingsData);
    case 7: return structuredClone(state.finalScoreData);
    case 8: return structuredClone(state.freeTextData);
    case 9: return structuredClone(state.headToHeadData);
    case 10: return structuredClone(state.timelineData);
    case 11: return structuredClone(state.barChartData);
    case 12: return structuredClone(state.rosterData);
    case 13: return structuredClone(state.scheduleData);
    case 14: return structuredClone({
      ...state.customFieldsData,
      selectedFieldIds: [],
    });
    default: return null;
  }
}

/** Genere les specifications completes a partir du state courant. */
export function generateSpec(state: ScoreboardState): ScoreboardSpec {
  return {
    version: SPEC_VERSION,
    generated: new Date().toISOString(),

    canvas: {
      width: state.templateWidth,
      height: state.templateHeight,
    },

    background: {
      mode: state.bgMode,
      colors: {
        top: state.colors.bgTop,
        mid: state.colors.bgMid,
        bot: state.colors.bgBot,
      },
      opacities: structuredClone(state.opacities),
    },

    header: {
      teamLeft: {
        code: state.team1,
        name: resolveNationName(state.team1),
        score: state.score1,
      },
      teamRight: {
        code: state.team2,
        name: resolveNationName(state.team2),
        score: state.score2,
      },
      clock: {
        time: state.time,
        visible: state.showClock,
        boxMode: state.clockBoxMode,
        tenthsThreshold: state.clockTenthsThreshold,
      },
      period: {
        text: state.period,
        options: structuredClone(state.periodOptions),
      },
      penalties: {
        show: state.showPenalties,
        left: structuredClone(state.penaltiesLeft),
        right: structuredClone(state.penaltiesRight),
      },
      timeouts: {
        show: state.showTimeouts,
        left: state.timeoutsLeft,
        right: state.timeoutsRight,
      },
      shootout: {
        show: state.showShootout,
        left: structuredClone(state.shootoutLeft),
        right: structuredClone(state.shootoutRight),
      },
    },

    fonts: {
      teams: buildFont(state.fontTeams),
      clock: buildFont(state.fontClock),
      body: buildFont(state.fontBody),
    },

    fontSizes: structuredClone(state.fontSizes),

    colors: structuredClone(state.colors),

    body: {
      type: state.bodyType,
      label: BODY_TYPE_NAMES[state.bodyType],
      data: getBodyData(state),
    },

    logos: {
      mode: state.logoMode,
      competition: {
        show: state.showCompetitionLogo,
        position: state.competitionLogoPosition,
        size: state.competitionLogoSize,
      },
      sponsor: {
        show: state.showSponsorLogo,
        position: state.sponsorLogoPosition,
        size: state.sponsorLogoSize,
      },
    },

    animations: structuredClone(state.animationConfig),

    visibility: {
      visible: state.scoreboardVisible,
    },

    media: {
      mode: state.backgroundMediaMode,
      url: state.backgroundMediaUrl,
    },
  };
}

/** Telecharge les specs au format JSON. */
export function downloadSpec(spec: ScoreboardSpec, team1: string, team2: string): void {
  const json = JSON.stringify(spec, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  const timestamp = new Date().toISOString().slice(0, 19).replace(/:/g, '-');
  a.href = url;
  a.download = `specs-${team1}-${team2}-${timestamp}.specs.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
