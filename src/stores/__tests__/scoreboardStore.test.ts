import { describe, it, expect, beforeEach } from 'vitest';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import type { ScoreboardState } from '@/types/scoreboard';

describe('scoreboardStore', () => {
  beforeEach(() => {
    useScoreboardStore.getState().resetState();
  });

  describe('update', () => {
    it('met a jour une propriete simple', () => {
      useScoreboardStore.getState().update('team1', 'CAN');
      expect(useScoreboardStore.getState().team1).toBe('CAN');
    });
  });

  describe('couleurs', () => {
    it('met a jour une couleur', () => {
      useScoreboardStore.getState().updateColor('bgTop', '#ff0000');
      expect(useScoreboardStore.getState().colors.bgTop).toBe('#ff0000');
    });

    it('met a jour une opacite', () => {
      useScoreboardStore.getState().updateOpacity('bgTop', 50);
      expect(useScoreboardStore.getState().opacities.bgTop).toBe(50);
    });

    it('applique un preset', () => {
      useScoreboardStore.getState().applyPreset({
        label: 'Test',
        colors: {
          bgTop: '#111111',
          bgMid: '#222222',
          bgBot: '#333333',
          teamName: '#ffffff',
          score: '#ffffff',
          scoreBox: '',
          time: '#ffffff',
          clockBox: '#cc0000',
          period: '#ffffff',
          titleText: '#ffffff',
          statVal: '#ffffff',
          statLabel: '#ffffff',
          penaltyTime: '#ff5252',
          penaltyNumber: '#ffffff',
        },
      });
      expect(useScoreboardStore.getState().colors.bgTop).toBe('#111111');
      expect(useScoreboardStore.getState().opacities.bgTop).toBe(0);
    });
  });

  describe('stats', () => {
    it('ajoute une ligne de stats', () => {
      const before = useScoreboardStore.getState().stats.length;
      useScoreboardStore.getState().addStat();
      expect(useScoreboardStore.getState().stats.length).toBe(before + 1);
    });

    it('ne depasse pas 8 lignes', () => {
      for (let i = 0; i < 10; i++) {
        useScoreboardStore.getState().addStat();
      }
      expect(useScoreboardStore.getState().stats.length).toBeLessThanOrEqual(8);
    });

    it('supprime une ligne de stats', () => {
      useScoreboardStore.getState().removeStat(0);
      expect(useScoreboardStore.getState().stats.length).toBe(1);
    });

    it('met a jour un champ de stats', () => {
      useScoreboardStore.getState().updateStat(0, 'label', 'SHOTS');
      expect(useScoreboardStore.getState().stats[0]?.label).toBe('SHOTS');
    });
  });

  describe('player stats', () => {
    it('ajoute une ligne de player stats', () => {
      const before = useScoreboardStore.getState().playerStats.length;
      useScoreboardStore.getState().addPlayerStat();
      expect(useScoreboardStore.getState().playerStats.length).toBe(before + 1);
    });

    it('supprime une ligne de player stats', () => {
      useScoreboardStore.getState().removePlayerStat(0);
      expect(useScoreboardStore.getState().playerStats.length).toBe(3);
    });
  });

  describe('penalites', () => {
    it('ajoute une penalite a gauche en tete de liste', () => {
      useScoreboardStore.getState().addPenalty('left');
      const list = useScoreboardStore.getState().penaltiesLeft;
      expect(list[0]?.time).toBe('2:00');
      expect(list[0]?.number).toBe('0');
    });

    it('supprime une penalite', () => {
      const before = useScoreboardStore.getState().penaltiesLeft.length;
      useScoreboardStore.getState().removePenalty('left', 0);
      expect(useScoreboardStore.getState().penaltiesLeft.length).toBe(before - 1);
    });

    it('met a jour un champ de penalite', () => {
      useScoreboardStore.getState().updatePenalty('left', 0, 'number', '99');
      expect(useScoreboardStore.getState().penaltiesLeft[0]?.number).toBe('99');
    });
  });

  describe('actions live', () => {
    it('demarre et arrete le timer', () => {
      useScoreboardStore.getState().startClock();
      expect(useScoreboardStore.getState().demoRunning).toBe(true);
      useScoreboardStore.getState().stopClock();
      expect(useScoreboardStore.getState().demoRunning).toBe(false);
    });

    it('reset le timer a la duree de la phase courante', () => {
      useScoreboardStore.getState().update('time', '5:00');
      useScoreboardStore.getState().resetClock();
      expect(useScoreboardStore.getState().time).toBe('20:00');
      expect(useScoreboardStore.getState().demoRunning).toBe(false);
    });

    it('incremente le score gauche', () => {
      useScoreboardStore.getState().update('score1', '2');
      useScoreboardStore.getState().incrementScore('left');
      expect(useScoreboardStore.getState().score1).toBe('3');
    });

    it('decremente le score droite sans aller sous zero', () => {
      useScoreboardStore.getState().update('score2', '0');
      useScoreboardStore.getState().decrementScore('right');
      expect(useScoreboardStore.getState().score2).toBe('0');
    });

    it('passe a la phase suivante', () => {
      useScoreboardStore.getState().update('period', '1st PERIOD');
      useScoreboardStore.getState().nextPhase();
      expect(useScoreboardStore.getState().period).toBe('1st INTERMISSION');
    });
  });

  describe('tickTimer', () => {
    it('decremente le temps de 1 seconde', () => {
      useScoreboardStore.getState().update('time', '5:00');
      useScoreboardStore.getState().tickTimer();
      expect(useScoreboardStore.getState().time).toBe('4:59');
    });

    it('decremente les penalites', () => {
      useScoreboardStore.getState().update('penaltiesLeft', [
        { time: '1:00', number: '10' },
      ]);
      useScoreboardStore.getState().update('time', '5:00');
      useScoreboardStore.getState().tickTimer();
      expect(useScoreboardStore.getState().penaltiesLeft[0]?.time).toBe('0:59');
    });

    it('supprime les penalites a 0:01 apres tick', () => {
      useScoreboardStore.getState().update('penaltiesLeft', [
        { time: '0:01', number: '10' },
      ]);
      useScoreboardStore.getState().update('time', '5:00');
      useScoreboardStore.getState().tickTimer();
      expect(useScoreboardStore.getState().penaltiesLeft.length).toBe(0);
    });

    it('transite a la phase suivante quand le temps atteint 0', () => {
      useScoreboardStore.getState().update('period', '1st PERIOD');
      useScoreboardStore.getState().update('time', '0:00');
      useScoreboardStore.getState().tickTimer();
      expect(useScoreboardStore.getState().period).toBe('1st INTERMISSION');
      expect(useScoreboardStore.getState().time).toBe('15:00');
    });

    it('arrete le timer si pas de phase suivante', () => {
      useScoreboardStore.getState().update('period', '3rd INTERMISSION');
      useScoreboardStore.getState().update('time', '0:00');
      useScoreboardStore.getState().update('demoRunning', true);
      useScoreboardStore.getState().tickTimer();
      expect(useScoreboardStore.getState().demoRunning).toBe(false);
    });
  });

  describe('phases', () => {
    it('ajoute une phase', () => {
      const before = useScoreboardStore.getState().periodOptions.length;
      useScoreboardStore.getState().addPhase();
      expect(useScoreboardStore.getState().periodOptions.length).toBe(before + 1);
    });

    it('supprime une phase et vide period si c etait la phase active', () => {
      useScoreboardStore.getState().update('period', '1st PERIOD');
      const idx = useScoreboardStore.getState().periodOptions.findIndex(
        (p) => p.label === '1st PERIOD',
      );
      useScoreboardStore.getState().removePhase(idx);
      expect(useScoreboardStore.getState().period).toBe('');
    });

    it('met a jour le label et synchronise period', () => {
      useScoreboardStore.getState().update('period', '1st PERIOD');
      const idx = useScoreboardStore.getState().periodOptions.findIndex(
        (p) => p.label === '1st PERIOD',
      );
      useScoreboardStore.getState().updatePhase(idx, 'label', 'PERIOD 1');
      expect(useScoreboardStore.getState().period).toBe('PERIOD 1');
    });
  });

  describe('templates', () => {
    it('reset restaure l etat par defaut', () => {
      useScoreboardStore.getState().update('team1', 'CAN');
      useScoreboardStore.getState().resetState();
      expect(useScoreboardStore.getState().team1).toBe('SVK');
    });

    it('loadState charge un etat complet', () => {
      const s = useScoreboardStore.getState();
      const plainState: ScoreboardState = {
        bodyType: s.bodyType,
        bgMode: s.bgMode,
        showPenalties: s.showPenalties,
        team1: 'USA',
        team2: 'CAN',
        score1: s.score1,
        score2: s.score2,
        time: s.time,
        period: s.period,
        showClock: s.showClock,
        clockBoxMode: s.clockBoxMode,
        periodOptions: s.periodOptions,
        demoRunning: s.demoRunning,
        titleCenter: s.titleCenter,
        titleLeft: s.titleLeft,
        titleRight: s.titleRight,
        fontTeams: s.fontTeams,
        fontClock: s.fontClock,
        fontBody: s.fontBody,
        colors: { ...s.colors },
        opacities: { ...s.opacities },
        showPlayerPhoto: s.showPlayerPhoto,
        playerStats: s.playerStats,
        stats: s.stats,
        penaltiesLeft: s.penaltiesLeft,
        penaltiesRight: s.penaltiesRight,
        goalData: s.goalData,
        playerCardData: s.playerCardData,
        standingsData: s.standingsData,
        finalScoreData: s.finalScoreData,
        freeTextData: s.freeTextData,
        showTimeouts: s.showTimeouts,
        timeoutsLeft: s.timeoutsLeft,
        timeoutsRight: s.timeoutsRight,
        showShootout: s.showShootout,
        shootoutLeft: s.shootoutLeft,
        shootoutRight: s.shootoutRight,
        backgroundMediaMode: s.backgroundMediaMode,
        backgroundMediaUrl: s.backgroundMediaUrl,
      };
      useScoreboardStore.getState().loadState(plainState);
      expect(useScoreboardStore.getState().team1).toBe('USA');
      expect(useScoreboardStore.getState().team2).toBe('CAN');
    });
  });
});
