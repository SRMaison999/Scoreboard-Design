/**
 * Bibliothèque d'éléments pour le constructeur de champs personnalisés.
 * Chaque élément définit son type, sa catégorie, ses dimensions par défaut et minimales.
 */

import type { LibraryElement, LibraryCategory } from '@/types/customField';

/* --- Labels des catégories --- */

export const LIBRARY_CATEGORY_LABELS: Readonly<Record<LibraryCategory, string>> = {
  match: 'Match',
  text: 'Texte',
  data: 'Données',
  players: 'Joueurs',
  media: 'Médias',
  composed: 'Composés',
};

/* --- Labels du constructeur de champs --- */

export const CUSTOM_FIELD_LABELS = {
  /* Section principale */
  sectionCustomFields: 'Layout libre',
  bodyType14Label: 'Layout libre (champs personnalisés)',

  /* Modes */
  fullPageMode: 'Mode pleine page',
  fullPageModeHint: 'Les éléments peuvent couvrir tout le canvas',
  snapToGrid: 'Aimanter à la grille',
  showGuides: 'Afficher les guides',
  gridSize: 'Taille de la grille',

  /* Bibliothèque */
  libraryTitle: 'Bibliothèque',
  librarySearch: 'Rechercher un élément...',
  libraryEmpty: 'Aucun élément trouvé',
  addField: 'Ajouter au canvas',

  /* Champs */
  fieldProperties: 'Propriétés du champ',
  fieldLabel: 'Nom du champ',
  fieldPosition: 'Position',
  fieldSize: 'Taille',
  fieldX: 'X',
  fieldY: 'Y',
  fieldWidth: 'Largeur',
  fieldHeight: 'Hauteur',
  fieldZIndex: 'Ordre (Z)',
  fieldLocked: 'Verrouillé',
  fieldVisible: 'Visible',
  fieldDelete: 'Supprimer le champ',
  fieldDuplicate: 'Dupliquer le champ',

  /* Style du champ */
  fieldStyleTitle: 'Style du champ',
  fieldBgColor: 'Couleur de fond',
  fieldBorderColor: 'Couleur de bordure',
  fieldBorderWidth: 'Épaisseur de bordure',
  fieldBorderRadius: 'Rayon de bordure',
  fieldPadding: 'Marge interne',
  fieldBgOpacity: 'Opacité du fond',

  /* Couches */
  layersTitle: 'Couches',
  layerMoveUp: 'Monter',
  layerMoveDown: 'Descendre',
  layerToFront: 'Premier plan',
  layerToBack: 'Arrière-plan',

  /* Contraintes */
  canvasFull: 'Canvas complet. Supprimez un champ pour en ajouter un nouveau.',
  fieldOutOfBounds: 'Champ hors limites du canvas',
  maxFieldsReached: 'Nombre maximal de champs atteint',

  /* Validations */
  validateLayout: 'Vérifier le layout',
  validationOk: 'Aucun problème détecté',
  validationOverlap: 'Chevauchement détecté',
  validationOutOfBounds: 'Champ hors limites',

  /* Config éléments */
  configTextContent: 'Contenu',
  configTextFontSize: 'Taille de police',
  configTextFontWeight: 'Épaisseur',
  configTextAlign: 'Alignement',
  configTextTransform: 'Casse',
  configSide: 'Côté',
  configSideLeft: 'Gauche',
  configSideRight: 'Droite',
  configShowFlag: 'Afficher le drapeau',
  configShowLabel: 'Afficher le label',
  configShowPeriod: 'Afficher la période',
  configShowBox: 'Afficher le cadre',
  configShowClock: 'Afficher l\'horloge',
  configStatIndex: 'Ligne de stat',
  configBarIndex: 'Barre',
  configPhotoKey: 'Clé photo',
  configPhotoShape: 'Forme',
  configPhotoCircle: 'Cercle',
  configPhotoSquare: 'Carré',
  configImageSrc: 'Source image',
  configImageFit: 'Ajustement',
  configImageBrowse: 'Parcourir...',
  configImageCover: 'Couvrir',
  configImageContain: 'Contenir',
  configImageFill: 'Étirer',
  configShapeType: 'Forme',
  configShapeRectangle: 'Rectangle',
  configShapeCircle: 'Cercle',
  configShapeRounded: 'Rectangle arrondi',
  configShapeFillColor: 'Couleur de remplissage',
  configShapeBorderColor: 'Bordure',
  configSeparatorOrientation: 'Orientation',
  configSeparatorHorizontal: 'Horizontale',
  configSeparatorVertical: 'Verticale',
  configSeparatorThickness: 'Épaisseur',
  configSeparatorColor: 'Couleur',

  /* Police de caractères */
  configFontFamily: 'Police',
  configFontFamilyGlobal: 'Police globale',

  /* Taille de police par champ */
  configFontSizeOverride: 'Taille de police',
  configFontSizeAutoHint: '0 = valeur globale',

  /* Rotation */
  fieldRotation: 'Rotation',
  fieldRotationUnit: '\u00b0',
  fieldRotationReset: 'R\u00e9initialiser',

  /* Proportions et mise à l'échelle */
  fieldLockAspectRatio: 'Verrouiller les proportions',
  fieldScaleContent: 'Mise à l\u2019échelle du contenu',
  fieldScaleContentHint: 'Le contenu suit la taille du champ',
  fieldResetScale: 'Réinitialiser l\u2019échelle',

  /* Alignement */
  alignLeft: 'Aligner \u00e0 gauche',
  alignCenterH: 'Centrer horizontalement',
  alignRight: 'Aligner \u00e0 droite',
  alignTop: 'Aligner en haut',
  alignCenterV: 'Centrer verticalement',
  alignBottom: 'Aligner en bas',

  /* Historique */
  undoAction: 'Annuler',
  redoAction: 'R\u00e9tablir',
  undoRedoHint: 'Ctrl+Z / Ctrl+Y',

  /* Raccourcis */
  keyboardShortcutsHint: 'Suppr, Ctrl+D, Fl\u00e8ches, Ctrl+Z/Y',

  /* Panneau de propriétés secondaire */
  propertiesPanelTitle: 'Propriétés',
  propertiesPanelClose: 'Fermer le panneau',

  /* Barre flottante taille de police */
  fontToolbarLabel: 'Taille',
  fontToolbarIncrease: 'Augmenter la taille de police',
  fontToolbarDecrease: 'Diminuer la taille de police',
  fontToolbarGlobalHint: 'Valeur globale',
  fontToolbarClickToEdit: 'Cliquer pour saisir une valeur',

  /* Sélection de zone */
  zoneSelectStart: 'Sélectionner une zone',
  zoneSelectCancel: 'Annuler la sélection',
  zoneSelectHint: 'Dessinez un rectangle sur le canvas pour capturer les champs',
  zoneSelectNoFields: 'Aucun champ dans la zone sélectionnée',

  /* Presets */
  sectionPresets: 'Presets',
  presetSaveField: 'Sauvegarder le champ',
  presetSaveLayout: 'Sauvegarder l\u2019\u00e9cran',
  presetLoad: 'Charger un preset',
  presetSaveTitle: 'Sauvegarder un preset',
  presetLoadTitle: 'Charger un preset',
  presetNamePlaceholder: 'Nom du preset',
  presetScopeField: 'Champ s\u00e9lectionn\u00e9',
  presetScopeLayout: '\u00c9cran complet',
  presetEmpty: 'Aucun preset sauvegard\u00e9',
  presetSaved: 'Preset sauvegard\u00e9',
  presetLoaded: 'Preset charg\u00e9',
  presetDeleted: 'Preset supprim\u00e9',
  presetExported: 'Preset export\u00e9',
  presetImported: 'Preset import\u00e9',
  presetImportError: 'Erreur lors de l\u2019import du preset',
  presetDeleteConfirm: 'Supprimer ce preset ?',
  presetSave: 'Sauvegarder',
  presetCancel: 'Annuler',
  presetConfirm: 'Confirmer',
  presetDelete: 'Supprimer',
  presetExport: 'Exporter',
  presetImport: 'Importer',
  presetRename: 'Renommer',
  presetNoFieldSelected: 'S\u00e9lectionnez un champ pour le sauvegarder',
  presetNoFields: 'Ajoutez des champs au canvas pour sauvegarder un \u00e9cran',
  presetChildrenCount: '\u00e9l\u00e9ment(s) contenu(s) inclus',
  presetLoadReplace: 'Remplacer le layout actuel',
  presetLoadMerge: 'Ajouter au layout actuel',
  presetFieldCount: 'champ(s)',

  /* Glisser-déposer depuis la bibliothèque */
  dragTooltip: 'Glisser sur le canvas pour positionner',
  dropHint: 'Relâcher pour déposer l\u2019élément',
  dragMimeType: 'application/x-scoreboard-element',

  /* État vide du canvas */
  emptyCanvasTitle: 'Canvas vide',
  emptyCanvasHint: 'Glissez un élément depuis la bibliothèque ou cliquez pour l\u2019ajouter au centre.',
  emptyCanvasStepTeams: 'Configurez d\u2019abord les équipes dans la section Header ci-dessus',
  emptyCanvasStepAdd: 'Puis ajoutez des éléments depuis la bibliothèque',

  /* Indice Header en mode Layout libre */
  headerLayoutLibreHint: 'Ces données sont utilisées par les éléments Score, Nom d\u2019équipe et Drapeau sur le canvas.',

  /* Labels lisibles pour les types d\u2019éléments */
  elementTypeLabels: {
    'score-display': 'Score',
    'clock-display': 'Horloge',
    'period-display': 'Période',
    'team-name': 'Nom d\u2019équipe',
    'flag-display': 'Drapeau',
    'timeout-display': 'Temps morts',
    'shootout-display': 'Tirs au but',
    'text-block': 'Bloc de texte',
    'stat-line': 'Ligne de stat',
    'bar-compare': 'Barre comparative',
    'player-photo': 'Photo joueur',
    'image-block': 'Image',
    'shape-block': 'Forme',
    'separator-line': 'Séparateur',
    'header-block': 'Header complet',
    'penalty-column': 'Colonne de pénalités',
  } as Readonly<Record<string, string>>,

  /* Raccourcis clavier */
  keyboardShortcutsTitle: 'Raccourcis',
  keyboardShortcutsList: 'Suppr\u00a0: supprimer \u00b7 Ctrl+D\u00a0: dupliquer \u00b7 Flèches\u00a0: déplacer \u00b7 Molette\u00a0: taille police',

  /* Zoom et navigation du canvas */
  zoomIn: 'Zoom avant',
  zoomOut: 'Zoom arri\u00e8re',
  zoomToFit: 'Ajuster \u00e0 l\u2019\u00e9cran',
  zoom100: 'Zoom 100\u00a0%',
  zoomLabel: 'Zoom',

  /* Menu contextuel */
  contextCut: 'Couper',
  contextCopy: 'Copier',
  contextPaste: 'Coller',
  contextDuplicate: 'Dupliquer',
  contextDelete: 'Supprimer',
  contextLock: 'Verrouiller',
  contextUnlock: 'D\u00e9verrouiller',
  contextHide: 'Masquer',
  contextBringToFront: 'Premier plan',
  contextSendToBack: 'Arri\u00e8re-plan',
  contextBringForward: 'Avancer',
  contextSendBackward: 'Reculer',
  contextSelectAll: 'Tout s\u00e9lectionner',
  contextToggleGrid: 'Afficher/Masquer la grille',

  /* Edition inline */
  inlineEditHint: 'Double-cliquez pour modifier le texte',

  /* Distribution et espacement */
  distributeH: 'Distribuer horizontalement',
  distributeV: 'Distribuer verticalement',
  spaceH: 'Espacement horizontal',
  spaceV: 'Espacement vertical',
  alignSelLeft: 'Aligner les bords gauches',
  alignSelCenterH: 'Centrer horizontalement',
  alignSelRight: 'Aligner les bords droits',
  alignSelTop: 'Aligner les bords sup\u00e9rieurs',
  alignSelCenterV: 'Centrer verticalement',
  alignSelBottom: 'Aligner les bords inf\u00e9rieurs',
  multiSelectionTitle: 'S\u00e9lection multiple',
  multiSelectionCount: 'champ(s) s\u00e9lectionn\u00e9(s)',
  alignSelectionTitle: 'Aligner la s\u00e9lection',
  distributeTitle: 'Distribuer',

  /* Effets visuels */
  effectsTitle: 'Effets visuels',
  effectOpacity: 'Opacit\u00e9 globale',
  effectShadow: 'Ombre port\u00e9e',
  effectShadowOffsetX: 'D\u00e9calage X',
  effectShadowOffsetY: 'D\u00e9calage Y',
  effectShadowBlur: 'Flou',
  effectShadowColor: 'Couleur',
  effectShadowOpacity: 'Opacit\u00e9',
  effectShadowEnable: 'Activer l\u2019ombre',
  effectBackdropBlur: 'Flou d\u2019arri\u00e8re-plan',
} as const;

/* --- Bibliothèque d'éléments --- */

export const LIBRARY_ELEMENTS: readonly LibraryElement[] = [
  /* --- Match --- */
  {
    type: 'score-display',
    label: 'Score',
    category: 'match',
    defaultWidth: 120,
    defaultHeight: 100,
    minWidth: 60,
    minHeight: 50,
    icon: 'hash',
  },
  {
    type: 'clock-display',
    label: 'Horloge',
    category: 'match',
    defaultWidth: 200,
    defaultHeight: 100,
    minWidth: 100,
    minHeight: 50,
    icon: 'clock',
  },
  {
    type: 'period-display',
    label: 'Période',
    category: 'match',
    defaultWidth: 200,
    defaultHeight: 60,
    minWidth: 80,
    minHeight: 40,
    icon: 'timer',
  },
  {
    type: 'team-name',
    label: 'Nom d\'équipe',
    category: 'match',
    defaultWidth: 200,
    defaultHeight: 80,
    minWidth: 80,
    minHeight: 40,
    icon: 'shield',
  },
  {
    type: 'flag-display',
    label: 'Drapeau',
    category: 'match',
    defaultWidth: 100,
    defaultHeight: 70,
    minWidth: 50,
    minHeight: 40,
    icon: 'flag',
  },
  {
    type: 'timeout-display',
    label: 'Temps morts',
    category: 'match',
    defaultWidth: 200,
    defaultHeight: 60,
    minWidth: 80,
    minHeight: 40,
    icon: 'pause-circle',
  },
  {
    type: 'shootout-display',
    label: 'Tirs au but',
    category: 'match',
    defaultWidth: 300,
    defaultHeight: 60,
    minWidth: 120,
    minHeight: 40,
    icon: 'target',
  },

  /* --- Texte --- */
  {
    type: 'text-block',
    label: 'Bloc de texte',
    category: 'text',
    defaultWidth: 400,
    defaultHeight: 80,
    minWidth: 80,
    minHeight: 40,
    icon: 'type',
  },

  /* --- Données --- */
  {
    type: 'stat-line',
    label: 'Ligne de stat',
    category: 'data',
    defaultWidth: 500,
    defaultHeight: 60,
    minWidth: 200,
    minHeight: 40,
    icon: 'bar-chart-2',
  },
  {
    type: 'bar-compare',
    label: 'Barre comparative',
    category: 'data',
    defaultWidth: 500,
    defaultHeight: 60,
    minWidth: 200,
    minHeight: 40,
    icon: 'git-compare',
  },

  /* --- Joueurs --- */
  {
    type: 'player-photo',
    label: 'Photo joueur',
    category: 'players',
    defaultWidth: 150,
    defaultHeight: 150,
    minWidth: 60,
    minHeight: 60,
    icon: 'user',
  },

  /* --- Médias --- */
  {
    type: 'image-block',
    label: 'Image',
    category: 'media',
    defaultWidth: 300,
    defaultHeight: 200,
    minWidth: 60,
    minHeight: 60,
    icon: 'image',
  },
  {
    type: 'shape-block',
    label: 'Forme',
    category: 'media',
    defaultWidth: 200,
    defaultHeight: 200,
    minWidth: 40,
    minHeight: 40,
    icon: 'square',
  },
  {
    type: 'separator-line',
    label: 'Séparateur',
    category: 'media',
    defaultWidth: 400,
    defaultHeight: 4,
    minWidth: 40,
    minHeight: 4,
    icon: 'minus',
  },

  /* --- Composés (body types existants) --- */
  {
    type: 'header-block',
    label: 'Header complet',
    category: 'composed',
    defaultWidth: 1920,
    defaultHeight: 200,
    minWidth: 400,
    minHeight: 100,
    icon: 'layout-dashboard',
  },
  {
    type: 'penalty-column',
    label: 'Colonne de pénalités',
    category: 'composed',
    defaultWidth: 200,
    defaultHeight: 600,
    minWidth: 100,
    minHeight: 200,
    icon: 'columns',
  },
  {
    type: 'body-type-1',
    label: 'Stats centrées (Type 1)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'align-center',
  },
  {
    type: 'body-type-2',
    label: 'Stats gauche/droite (Type 2)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'columns',
  },
  {
    type: 'body-type-3',
    label: 'Stats joueur (Type 3)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'user',
  },
  {
    type: 'body-type-4',
    label: 'Célébration de but (Type 4)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'trophy',
  },
  {
    type: 'body-type-5',
    label: 'Fiche joueur (Type 5)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'id-card',
  },
  {
    type: 'body-type-6',
    label: 'Classement (Type 6)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'list-ordered',
  },
  {
    type: 'body-type-7',
    label: 'Score final (Type 7)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'flag-triangle-right',
  },
  {
    type: 'body-type-8',
    label: 'Texte libre (Type 8)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'file-text',
  },
  {
    type: 'body-type-9',
    label: 'Face-à-face (Type 9)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'users',
  },
  {
    type: 'body-type-10',
    label: 'Chronologie (Type 10)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'clock',
  },
  {
    type: 'body-type-11',
    label: 'Barres comparatives (Type 11)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'bar-chart',
  },
  {
    type: 'body-type-12',
    label: 'Composition d\'équipe (Type 12)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'users',
  },
  {
    type: 'body-type-13',
    label: 'Calendrier (Type 13)',
    category: 'composed',
    defaultWidth: 1200,
    defaultHeight: 600,
    minWidth: 400,
    minHeight: 200,
    icon: 'calendar',
  },
];
