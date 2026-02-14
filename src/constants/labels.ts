/* Tous les textes UI de l'application, centralisés ici. */

export const EDITOR_LABELS = {
  appTitle: 'Scoreboard Editor',

  /* Sections */
  sectionBodyType: 'Type de corps',
  sectionPenalties: 'Colonnes de pénalités',
  sectionHeader: 'Header',
  sectionClock: 'Horloge',
  sectionFonts: 'Polices',
  sectionTitles: 'Titre(s)',
  sectionColorsBg: 'Couleurs - Background',
  sectionColorsHeader: 'Couleurs - Header',
  sectionColorsBody: 'Couleurs - Corps',
  sectionColorsPenalties: 'Couleurs - Pénalités',
  sectionPresets: 'Presets de couleurs',

  /* Champs */
  team1Label: 'Équipe 1',
  team2Label: 'Équipe 2',
  score1Label: 'Score 1',
  score2Label: 'Score 2',
  showPenalties: 'Afficher les colonnes',
  showClock: "Afficher l'horloge",
  timeLabel: 'Temps',
  activePhase: 'Phase active',
  noPhase: '-- aucune --',
  phaseOptions: 'Options de phases et transitions',
  phaseDuration: 'Durée :',
  phaseTransition: 'À 0:00 :',
  phaseTransitionStop: '-- stop --',
  addPhase: 'Ajouter une phase',
  clockBoxLabel: 'Cadre horloge',
  clockBoxNever: 'Jamais',
  clockBoxAlways: 'Toujours',
  clockBoxStopped: 'Horloge arrêtée',
  clockBoxRunning: 'Horloge en marche',

  /* Polices */
  fontTeams: "Noms d'équipes / Scores",
  fontClock: 'Horloge / Période',
  fontBody: 'Titres / Stats / Pénalités',

  /* Titres */
  titleCenter: 'Titre central',
  titleLeft: 'Titre gauche',
  titleRight: 'Titre droite',

  /* Stats */
  statValLeft: 'Val. G',
  statLabel: 'Label',
  statValRight: 'Val. D',
  addStatLine: 'Ajouter une ligne',

  /* Player stats */
  showPlayerPhoto: 'Afficher photo joueur',
  playerVariable: 'Variable',
  playerNumber: 'No',
  playerName: 'Nom Prénom',
  playerValue: 'Valeur',

  /* Pénalités */
  penaltyTime: 'Temps',
  penaltyNumber: 'No',
  addPenalty: 'Ajouter',

  /* Couleurs */
  colorBgTop: 'Haut',
  colorBgMid: 'Milieu',
  colorBgBot: 'Bas',
  colorTeamName: "Noms d'équipes",
  colorScore: 'Scores',
  colorScoreBox: 'Cadre score',
  colorScoreBoxNone: 'Aucun cadre',
  colorTime: 'Horloge',
  colorClockBox: 'Cadre horloge',
  colorPeriod: 'Période',
  colorTitleText: 'Titres',
  colorStatVal: 'Valeurs stats',
  colorStatLabel: 'Labels stats',
  colorPenaltyTime: 'Temps',
  colorPenaltyNumber: 'Numéros',

  /* Demo / Timer */
  demoTitle: 'TIMER',
  demoStart: 'START',
  demoStop: 'STOP',
  demoReset: 'RESET',
  demoTransitionPrefix: 'À 0:00',
  demoTransitionStop: 'stop',

  /* Output */
  openOutput: 'Ouvrir la sortie',
} as const;
