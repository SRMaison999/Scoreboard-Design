import { useEffect, useState, useCallback } from 'react';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { ScoreboardState } from '@/types/scoreboard';

const CHANNEL_NAME = 'scoreboard-sync';

interface SyncMessage {
  type: 'STATE_UPDATE';
  state: ScoreboardState;
}

/** Extrait uniquement les donnees de state (sans les actions) du store. */
function selectState(store: ReturnType<typeof useScoreboardStore.getState>): ScoreboardState {
  return {
    bodyType: store.bodyType,
    bgMode: store.bgMode,
    showPenalties: store.showPenalties,
    team1: store.team1,
    team2: store.team2,
    score1: store.score1,
    score2: store.score2,
    time: store.time,
    period: store.period,
    showClock: store.showClock,
    clockBoxMode: store.clockBoxMode,
    clockTenthsThreshold: store.clockTenthsThreshold,
    periodOptions: store.periodOptions,
    demoRunning: store.demoRunning,
    titleCenter: store.titleCenter,
    titleLeft: store.titleLeft,
    titleRight: store.titleRight,
    fontTeams: store.fontTeams,
    fontClock: store.fontClock,
    fontBody: store.fontBody,
    colors: store.colors,
    opacities: store.opacities,
    showPlayerPhoto: store.showPlayerPhoto,
    playerStats: store.playerStats,
    stats: store.stats,
    penaltiesLeft: store.penaltiesLeft,
    penaltiesRight: store.penaltiesRight,
    goalData: store.goalData,
    playerCardData: store.playerCardData,
    standingsData: store.standingsData,
    finalScoreData: store.finalScoreData,
    freeTextData: store.freeTextData,
    headToHeadData: store.headToHeadData,
    timelineData: store.timelineData,
    barChartData: store.barChartData,
    rosterData: store.rosterData,
    scheduleData: store.scheduleData,
    showTimeouts: store.showTimeouts,
    timeoutsLeft: store.timeoutsLeft,
    timeoutsRight: store.timeoutsRight,
    showShootout: store.showShootout,
    shootoutLeft: store.shootoutLeft,
    shootoutRight: store.shootoutRight,
    backgroundMediaMode: store.backgroundMediaMode,
    backgroundMediaUrl: store.backgroundMediaUrl,
    templateWidth: store.templateWidth,
    templateHeight: store.templateHeight,
    fontSizes: store.fontSizes,
    logoMode: store.logoMode,
    showCompetitionLogo: store.showCompetitionLogo,
    competitionLogoPosition: store.competitionLogoPosition,
    competitionLogoSize: store.competitionLogoSize,
    showSponsorLogo: store.showSponsorLogo,
    sponsorLogoPosition: store.sponsorLogoPosition,
    sponsorLogoSize: store.sponsorLogoSize,
    scoreboardVisible: store.scoreboardVisible,
    animationConfig: store.animationConfig,
    customFieldsData: store.customFieldsData,
  };
}

/**
 * Cote editeur : envoie le state a la fenetre de sortie via BroadcastChannel.
 */
export function useOutputSyncSender(): void {
  const store = useScoreboardStore();

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    const plainState = selectState(store);
    const message: SyncMessage = { type: 'STATE_UPDATE', state: plainState };
    channel.postMessage(message);

    return () => channel.close();
  }, [store]);
}

/**
 * Cote fenetre de sortie : recoit le state de l'editeur.
 */
export function useOutputSyncReceiver(): ScoreboardState | null {
  const [displayState, setDisplayState] = useState<ScoreboardState | null>(null);

  const handleMessage = useCallback((event: MessageEvent<SyncMessage>) => {
    if (event.data.type === 'STATE_UPDATE') {
      setDisplayState(event.data.state);
    }
  }, []);

  useEffect(() => {
    const channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = handleMessage;

    return () => channel.close();
  }, [handleMessage]);

  return displayState;
}
