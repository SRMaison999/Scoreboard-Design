/* Tous les textes UI de l'application, centralisés ici. */

export const EDITOR_LABELS = {
  appTitle: 'Scoreboard Editor',

  /* Groupes de sections */
  groupContenu: 'Contenu',
  groupApparence: 'Apparence',
  groupHorloge: 'Horloge',

  /* Sections */
  sectionBodyType: 'Type de corps',
  sectionPenalties: 'Colonnes de pénalités',
  sectionHeader: 'Header',
  sectionClock: 'Horloge',
  sectionFonts: 'Polices',
  sectionTitles: 'Titre(s)',
  sectionStats: 'Lignes de stats',
  sectionPlayerStats: 'Stats joueur',
  sectionPenaltiesPrefix: 'Pénalités',
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
  bgModeUniform: 'Couleur unie',
  bgModeGradient: 'Dégradé',
  colorBgUniform: 'Couleur de fond',
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

  /* Goal (type 4) */
  sectionGoal: 'Célébration de but',
  goalScoringTeamSide: 'Côté équipe marqueuse',
  goalSideLeft: 'Gauche',
  goalSideRight: 'Droite',
  goalScorerName: 'Nom du buteur',
  goalScorerNumber: 'Numéro',
  goalTime: 'Temps du but',
  goalPeriod: 'Période',
  goalCountMatch: 'Buts dans le match',
  goalCountTournament: 'Buts dans le tournoi',
  goalAssist1Name: 'Assist 1 - Nom',
  goalAssist1Number: 'Assist 1 - No',
  goalAssist2Name: 'Assist 2 - Nom',
  goalAssist2Number: 'Assist 2 - No',

  /* Player Card (type 5) */
  sectionPlayerCard: 'Fiche joueur',
  playerCardTitle: 'Titre',
  playerCardSubtitle: 'Sous-titre',
  playerCardName: 'Nom du joueur',
  playerCardNumber: 'Numéro',
  playerCardTeam: 'Équipe (NOC)',
  playerCardStatLabel: 'Label',
  playerCardStatValue: 'Valeur',
  playerCardAddStat: 'Ajouter une stat',

  /* Standings (type 6) */
  sectionStandings: 'Classement',
  standingsTitle: 'Titre',
  standingsTeam: 'Équipe',
  standingsHighlight: 'Surligner',
  standingsAddRow: 'Ajouter une équipe',

  /* Final Score (type 7) */
  sectionFinalScore: 'Score final',
  finalScoreTitle: 'Titre',
  finalScoreShowGwg: 'Afficher le but gagnant',
  finalScoreGwgPlayer: 'Joueur GWG',
  finalScoreGwgTeam: 'Équipe GWG',
  finalScoreGwgTime: 'Temps GWG',
  finalScoreOvertimeNote: 'Note prolongation',
  finalScorePeriodLabel: 'Période',
  finalScoreLeft: 'G',
  finalScoreRight: 'D',
  finalScoreAddPeriod: 'Ajouter une période',

  /* Free Text (type 8) */
  sectionFreeText: 'Texte libre',
  freeTextContent: 'Texte',
  freeTextFontSize: 'Taille',
  freeTextAlign: 'Alignement',
  freeTextBold: 'Gras',
  freeTextAddLine: 'Ajouter une ligne',
  freeTextAlignLeft: 'Gauche',
  freeTextAlignCenter: 'Centre',
  freeTextAlignRight: 'Droite',

  /* Header - Timeouts */
  sectionTimeouts: 'Temps morts',
  showTimeoutsLabel: 'Afficher les temps morts',
  timeoutsLeftLabel: 'Temps morts G',
  timeoutsRightLabel: 'Temps morts D',

  /* Header - Shootout */
  sectionShootout: 'Tirs au but',
  showShootoutLabel: 'Afficher les tirs au but',
  shootoutScored: 'B',
  shootoutMissed: 'R',
  shootoutPending: '-',
  shootoutAddAttempt: 'Ajouter un tir',

  /* Médias */
  mediaUploadPhoto: 'Photo',
  mediaUploadBackground: 'Arrière-plan',
  mediaSelectFile: 'Choisir un fichier',
  mediaDragDrop: 'ou glisser-déposer ici',
  mediaRemove: 'Supprimer',
  mediaFormatError: 'Format non supporté. Utilisez PNG, JPEG ou WebP.',
  mediaVideoFormatError: 'Format non supporté. Utilisez MP4 ou WebM.',
  scorerPhoto: 'Photo du buteur',
  playerPhoto: 'Photo du joueur',

  /* Fond d'écran */
  sectionBackground: 'Arrière-plan média',
  bgMediaNone: 'Aucun',
  bgMediaImage: 'Image',
  bgMediaVideo: 'Vidéo',
  bgMediaSelectImage: 'Choisir une image de fond',
  bgMediaSelectVideo: 'Choisir une vidéo de fond',

  /* Output */
  openOutput: 'Ouvrir la sortie',
} as const;
