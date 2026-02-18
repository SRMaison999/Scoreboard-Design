import type { FontOption, FontCategory } from '@/types/fonts';

export const FONT_LINK =
  "https://fonts.googleapis.com/css2?" +
  "family=Oswald:wght@400;500;600;700" +
  "&family=Barlow+Condensed:wght@400;500;600;700" +
  "&family=Bebas+Neue" +
  "&family=Teko:wght@400;500;600;700" +
  "&family=Anton" +
  "&family=Rajdhani:wght@400;500;600;700" +
  "&family=Russo+One" +
  "&family=Orbitron:wght@400;500;600;700" +
  "&family=Saira+Condensed:wght@400;500;600;700" +
  "&family=Chakra+Petch:wght@400;500;600;700" +
  "&family=Archivo+Black" +
  "&family=Black+Ops+One" +
  "&family=Bungee" +
  "&family=Montserrat:wght@400;500;600;700" +
  "&family=Roboto+Condensed:wght@400;500;600;700" +
  "&family=Inter:wght@400;500;600;700" +
  "&family=Poppins:wght@400;500;600;700" +
  "&family=Share+Tech+Mono" +
  "&family=JetBrains+Mono:wght@400;500;600;700" +
  "&family=Righteous" +
  "&family=Audiowide" +
  "&family=Exo+2:wght@400;500;600;700" +
  "&family=Playfair+Display:wght@400;500;600;700" +
  "&family=Bitter:wght@400;500;600;700" +
  "&family=Fjalla+One" +
  "&display=swap";

export const FONT_OPTIONS: readonly FontOption[] = [
  /* --- Sport / Impact --- */
  { id: 'oswald', label: 'Oswald', family: "'Oswald', sans-serif", category: 'sport' },
  { id: 'bebas', label: 'Bebas Neue', family: "'Bebas Neue', sans-serif", category: 'sport' },
  { id: 'anton', label: 'Anton', family: "'Anton', sans-serif", category: 'sport' },
  { id: 'russo', label: 'Russo One', family: "'Russo One', sans-serif", category: 'sport' },
  { id: 'archivo-black', label: 'Archivo Black', family: "'Archivo Black', sans-serif", category: 'sport' },
  { id: 'black-ops-one', label: 'Black Ops One', family: "'Black Ops One', sans-serif", category: 'sport' },
  { id: 'bungee', label: 'Bungee', family: "'Bungee', sans-serif", category: 'sport' },

  /* --- Condensed --- */
  { id: 'barlow', label: 'Barlow Condensed', family: "'Barlow Condensed', sans-serif", category: 'condensed' },
  { id: 'saira', label: 'Saira Condensed', family: "'Saira Condensed', sans-serif", category: 'condensed' },
  { id: 'roboto-condensed', label: 'Roboto Condensed', family: "'Roboto Condensed', sans-serif", category: 'condensed' },
  { id: 'fjalla-one', label: 'Fjalla One', family: "'Fjalla One', sans-serif", category: 'condensed' },
  { id: 'teko', label: 'Teko', family: "'Teko', sans-serif", category: 'condensed' },

  /* --- Modernes / Sans-serif --- */
  { id: 'montserrat', label: 'Montserrat', family: "'Montserrat', sans-serif", category: 'modern' },
  { id: 'inter', label: 'Inter', family: "'Inter', sans-serif", category: 'modern' },
  { id: 'poppins', label: 'Poppins', family: "'Poppins', sans-serif", category: 'modern' },
  { id: 'rajdhani', label: 'Rajdhani', family: "'Rajdhani', sans-serif", category: 'modern' },
  { id: 'chakra', label: 'Chakra Petch', family: "'Chakra Petch', sans-serif", category: 'modern' },

  /* --- Display / Decoratives --- */
  { id: 'righteous', label: 'Righteous', family: "'Righteous', sans-serif", category: 'display' },
  { id: 'audiowide', label: 'Audiowide', family: "'Audiowide', sans-serif", category: 'display' },
  { id: 'exo2', label: 'Exo 2', family: "'Exo 2', sans-serif", category: 'display' },
  { id: 'orbitron', label: 'Orbitron', family: "'Orbitron', sans-serif", category: 'display' },

  /* --- Monospace / Digital --- */
  { id: 'share-tech-mono', label: 'Share Tech Mono', family: "'Share Tech Mono', monospace", category: 'monospace' },
  { id: 'jetbrains-mono', label: 'JetBrains Mono', family: "'JetBrains Mono', monospace", category: 'monospace' },

  /* --- Serif / Classiques --- */
  { id: 'playfair', label: 'Playfair Display', family: "'Playfair Display', serif", category: 'serif' },
  { id: 'bitter', label: 'Bitter', family: "'Bitter', serif", category: 'serif' },
] as const;

/** Labels des catégories de polices pour l'interface */
export const FONT_CATEGORY_LABELS: Record<FontCategory, string> = {
  sport: 'Sport / Impact',
  condensed: 'Condensed',
  modern: 'Modernes',
  display: 'Display',
  monospace: 'Monospace',
  serif: 'Serif',
};

/** Ordre d'affichage des catégories */
export const FONT_CATEGORY_ORDER: readonly FontCategory[] = [
  'sport',
  'condensed',
  'modern',
  'display',
  'monospace',
  'serif',
] as const;
