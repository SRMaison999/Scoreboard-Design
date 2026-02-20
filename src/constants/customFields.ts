/**
 * Labels et constantes pour le constructeur de champs personnalis\u00e9s.
 * Les d\u00e9finitions des \u00e9l\u00e9ments de la biblioth\u00e8que sont dans ./libraryElements.ts.
 */

import type { LibraryCategory } from '@/types/customField';

export { LIBRARY_ELEMENTS } from './libraryElements';

/* --- Labels des cat\u00e9gories --- */

export const LIBRARY_CATEGORY_LABELS: Readonly<Record<LibraryCategory, string>> = {
  match: 'Match',
  text: 'Texte',
  data: 'Donn\u00e9es',
  players: 'Joueurs',
  media: 'M\u00e9dias',
  composed: 'Compos\u00e9s',
};

/* --- Labels du constructeur de champs --- */

export const CUSTOM_FIELD_LABELS = {
  /* Section principale */
  sectionCustomFields: 'Layout libre',
  bodyType14Label: 'Layout libre (champs personnalis\u00e9s)',

  /* Modes */
  fullPageMode: 'Mode pleine page',
  fullPageModeHint: 'Les \u00e9l\u00e9ments peuvent couvrir tout le canvas',
  snapToGrid: 'Aimanter \u00e0 la grille',
  showGuides: 'Afficher les guides',
  gridSize: 'Taille de la grille',

  /* Biblioth\u00e8que */
  libraryTitle: 'Biblioth\u00e8que',
  librarySearch: 'Rechercher un \u00e9l\u00e9ment...',
  libraryEmpty: 'Aucun \u00e9l\u00e9ment trouv\u00e9',
  addField: 'Ajouter au canvas',

  /* Champs */
  fieldProperties: 'Propri\u00e9t\u00e9s du champ',
  fieldLabel: 'Nom du champ',
  fieldPosition: 'Position',
  fieldSize: 'Taille',
  fieldX: 'X',
  fieldY: 'Y',
  fieldWidth: 'Largeur',
  fieldHeight: 'Hauteur',
  fieldZIndex: 'Ordre (Z)',
  fieldLocked: 'Verrouill\u00e9',
  fieldVisible: 'Visible',
  fieldDelete: 'Supprimer le champ',
  fieldDuplicate: 'Dupliquer le champ',

  /* Style du champ */
  fieldStyleTitle: 'Style du champ',
  fieldBgColor: 'Couleur de fond',
  fieldBorderColor: 'Couleur de bordure',
  fieldBorderWidth: '\u00c9paisseur de bordure',
  fieldBorderRadius: 'Rayon de bordure',
  fieldPadding: 'Marge interne',
  fieldBgOpacity: 'Opacit\u00e9 du fond',

  /* Couches */
  layersTitle: 'Couches',
  layerMoveUp: 'Monter',
  layerMoveDown: 'Descendre',
  layerToFront: 'Premier plan',
  layerToBack: 'Arri\u00e8re-plan',
  layerRename: 'Double-cliquer pour renommer',
  layerRenameEmpty: 'Le nom ne peut pas \u00eatre vide',

  /* Contraintes */
  canvasFull: 'Canvas complet. Supprimez un champ pour en ajouter un nouveau.',
  fieldOutOfBounds: 'Champ hors limites du canvas',
  maxFieldsReached: 'Nombre maximal de champs atteint',

  /* Validations */
  validateLayout: 'V\u00e9rifier le layout',
  validationOk: 'Aucun probl\u00e8me d\u00e9tect\u00e9',
  validationOverlap: 'Chevauchement d\u00e9tect\u00e9',
  validationOutOfBounds: 'Champ hors limites',

  /* Config \u00e9l\u00e9ments */
  configTextContent: 'Contenu',
  configTextFontSize: 'Taille de police',
  configTextFontWeight: '\u00c9paisseur',
  configTextAlign: 'Alignement',
  configTextTransform: 'Casse',
  configSide: 'C\u00f4t\u00e9',
  configSideLeft: 'Gauche',
  configSideRight: 'Droite',
  configShowFlag: 'Afficher le drapeau',
  configShowLabel: 'Afficher le label',
  configShowPeriod: 'Afficher la p\u00e9riode',
  configShowBox: 'Afficher le cadre',
  configShowClock: 'Afficher l\'horloge',
  configStatIndex: 'Ligne de stat',
  configBarIndex: 'Barre',
  configPhotoKey: 'Cl\u00e9 photo',
  configPhotoShape: 'Forme',
  configPhotoCircle: 'Cercle',
  configPhotoSquare: 'Carr\u00e9',
  configImageSrc: 'Source image',
  configImageFit: 'Ajustement',
  configImageBrowse: 'Parcourir...',
  configImageCover: 'Couvrir',
  configImageContain: 'Contenir',
  configImageFill: '\u00c9tirer',
  configShapeType: 'Forme',
  configShapeRectangle: 'Rectangle',
  configShapeCircle: 'Cercle',
  configShapeRounded: 'Rectangle arrondi',
  configShapeFillColor: 'Couleur de remplissage',
  configShapeBorderColor: 'Bordure',
  configSeparatorOrientation: 'Orientation',
  configSeparatorHorizontal: 'Horizontale',
  configSeparatorVertical: 'Verticale',
  configSeparatorThickness: '\u00c9paisseur',
  configSeparatorColor: 'Couleur',

  /* Police de caract\u00e8res */
  configFontFamily: 'Police',
  configFontFamilyGlobal: 'Police globale',

  /* Taille de police par champ */
  configFontSizeOverride: 'Taille de police',
  configFontSizeAutoHint: '0 = valeur globale',

  /* Rotation */
  fieldRotation: 'Rotation',
  fieldRotationUnit: '\u00b0',
  fieldRotationReset: 'R\u00e9initialiser',

  /* Proportions et mise \u00e0 l'\u00e9chelle */
  fieldLockAspectRatio: 'Verrouiller les proportions',
  fieldScaleContent: 'Mise \u00e0 l\u2019\u00e9chelle du contenu',
  fieldScaleContentHint: 'Le contenu suit la taille du champ',
  fieldResetScale: 'R\u00e9initialiser l\u2019\u00e9chelle',

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

  /* Panneau de propri\u00e9t\u00e9s secondaire */
  propertiesPanelTitle: 'Propri\u00e9t\u00e9s',
  propertiesPanelClose: 'Fermer le panneau',

  /* Barre flottante taille de police */
  fontToolbarLabel: 'Taille',
  fontToolbarIncrease: 'Augmenter la taille de police',
  fontToolbarDecrease: 'Diminuer la taille de police',
  fontToolbarGlobalHint: 'Valeur globale',
  fontToolbarClickToEdit: 'Cliquer pour saisir une valeur',

  /* S\u00e9lection de zone */
  zoneSelectStart: 'S\u00e9lectionner une zone',
  zoneSelectCancel: 'Annuler la s\u00e9lection',
  zoneSelectHint: 'Dessinez un rectangle sur le canvas pour capturer les champs',
  zoneSelectNoFields: 'Aucun champ dans la zone s\u00e9lectionn\u00e9e',

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

  /* Glisser-d\u00e9poser depuis la biblioth\u00e8que */
  dragTooltip: 'Glisser sur le canvas pour positionner',
  dropHint: 'Rel\u00e2cher pour d\u00e9poser l\u2019\u00e9l\u00e9ment',
  dragMimeType: 'application/x-scoreboard-element',

  /* \u00c9tat vide du canvas */
  emptyCanvasTitle: 'Canvas vide',
  emptyCanvasHint: 'Glissez un \u00e9l\u00e9ment depuis la biblioth\u00e8que ou cliquez pour l\u2019ajouter au centre.',
  emptyCanvasStepTeams: 'Configurez d\u2019abord les \u00e9quipes dans la section Header ci-dessus',
  emptyCanvasStepAdd: 'Puis ajoutez des \u00e9l\u00e9ments depuis la biblioth\u00e8que',

  /* Indice Header en mode Layout libre */
  headerLayoutLibreHint: 'Ces donn\u00e9es sont utilis\u00e9es par les \u00e9l\u00e9ments Score, Nom d\u2019\u00e9quipe et Drapeau sur le canvas.',

  /* Labels lisibles pour les types d\u2019\u00e9l\u00e9ments */
  elementTypeLabels: {
    'score-display': 'Score',
    'clock-display': 'Horloge',
    'period-display': 'P\u00e9riode',
    'team-name': 'Nom d\u2019\u00e9quipe',
    'flag-display': 'Drapeau',
    'timeout-display': 'Temps morts',
    'shootout-display': 'Tirs au but',
    'text-block': 'Bloc de texte',
    'stat-line': 'Ligne de stat',
    'bar-compare': 'Barre comparative',
    'player-photo': 'Photo joueur',
    'image-block': 'Image',
    'shape-block': 'Forme',
    'separator-line': 'S\u00e9parateur',
    'header-block': 'Header complet',
    'penalty-column': 'Colonne de p\u00e9nalit\u00e9s',
  } as Readonly<Record<string, string>>,

  /* Raccourcis clavier */
  keyboardShortcutsTitle: 'Raccourcis',
  keyboardShortcutsList: 'Suppr\u00a0: supprimer \u00b7 Ctrl+D\u00a0: dupliquer \u00b7 Fl\u00e8ches\u00a0: d\u00e9placer \u00b7 Molette\u00a0: taille police',

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

  /* R\u00e8gles du canvas */
  rulerUnit: 'px',

  /* Mod\u00e8les hockey (presets bodyType 14) */
  hockeyPresetTitle: 'Mod\u00e8les hockey',
  hockeyPresetSimpleScore: 'Score simple',
  hockeyPresetWithPenalties: 'Score avec p\u00e9nalit\u00e9s',
  hockeyPresetLowerThird: 'Bandeau inf\u00e9rieur',
  hockeyPresetFullStats: 'Statistiques compl\u00e8tes',
  hockeyPresetApply: 'Appliquer le mod\u00e8le',
  hockeyPresetDescription: 'Mod\u00e8les pr\u00e9d\u00e9finis pour tableaux de bord hockey',

  /* Navigation Layout libre (onglets) */
  freeLayoutTabCanvas: 'Canvas',
  freeLayoutTabLibrary: 'Biblioth\u00e8que',
  freeLayoutTabLayers: 'Couches',
  freeLayoutTabPresets: 'Presets',
  freeLayoutNoSelection: 'S\u00e9lectionnez un champ sur le canvas pour voir ses propri\u00e9t\u00e9s.',
  freeLayoutAddHint: 'Cliquer pour ajouter, ou glisser sur le canvas',
  freeLayoutFieldAdded: 'Champ ajout\u00e9 \u2014 configurez-le dans le panneau de propri\u00e9t\u00e9s ci-dessous',
  freeLayoutCategoryAll: 'Tout',

  /* Ordre des couches (z-index) */
  zIndexBringToFront: 'Premier plan',
  zIndexBringForward: 'Avancer',
  zIndexSendBackward: 'Reculer',
  zIndexSendToBack: 'Arri\u00e8re-plan',
  zIndexOrderTitle: 'Ordre d\u2019affichage',

  /* Indicateur de coordonn\u00e9es */
  cursorCoordinates: 'Coordonn\u00e9es',

  /* Modale raccourcis clavier */
  shortcutsTitle: 'Raccourcis clavier',
  shortcutsSectionGeneral: 'G\u00e9n\u00e9ral',
  shortcutsSectionSelection: 'S\u00e9lection',
  shortcutsSectionClipboard: 'Presse-papiers',
  shortcutsSectionFields: 'Champs',
  shortcutsSectionZoom: 'Zoom',
  shortcutUndo: 'Annuler',
  shortcutRedo: 'R\u00e9tablir',
  shortcutSave: 'Sauvegarder',
  shortcutSelectAll: 'Tout s\u00e9lectionner',
  shortcutDeselect: 'D\u00e9s\u00e9lectionner',
  shortcutCopy: 'Copier',
  shortcutCut: 'Couper',
  shortcutPaste: 'Coller',
  shortcutDuplicate: 'Dupliquer',
  shortcutDelete: 'Supprimer',
  shortcutMove: 'D\u00e9placer (1px)',
  shortcutMoveFast: 'D\u00e9placer (10px)',
  shortcutZoomFit: 'Ajuster au canvas',
  shortcutZoom100: 'Zoom 100\u00a0%',
  shortcutZoomIn: 'Zoom avant',
  shortcutZoomOut: 'Zoom arri\u00e8re',
  alignmentFixHint: 'Corriger l\'alignement',
} as const;
