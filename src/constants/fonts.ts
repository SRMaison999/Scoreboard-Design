import type { FontOption } from '@/types/fonts';

export const FONT_LINK =
  "https://fonts.googleapis.com/css2?family=Oswald:wght@400;500;600;700&family=Barlow+Condensed:wght@400;500;600;700&family=Bebas+Neue&family=Teko:wght@400;500;600;700&family=Anton&family=Rajdhani:wght@400;500;600;700&family=Russo+One&family=Orbitron:wght@400;500;600;700&family=Saira+Condensed:wght@400;500;600;700&family=Chakra+Petch:wght@400;500;600;700&display=swap";

export const FONT_OPTIONS: readonly FontOption[] = [
  { id: 'oswald', label: 'Oswald', family: "'Oswald', sans-serif" },
  { id: 'barlow', label: 'Barlow Condensed', family: "'Barlow Condensed', sans-serif" },
  { id: 'bebas', label: 'Bebas Neue', family: "'Bebas Neue', sans-serif" },
  { id: 'teko', label: 'Teko', family: "'Teko', sans-serif" },
  { id: 'anton', label: 'Anton', family: "'Anton', sans-serif" },
  { id: 'rajdhani', label: 'Rajdhani', family: "'Rajdhani', sans-serif" },
  { id: 'russo', label: 'Russo One', family: "'Russo One', sans-serif" },
  { id: 'orbitron', label: 'Orbitron', family: "'Orbitron', sans-serif" },
  { id: 'saira', label: 'Saira Condensed', family: "'Saira Condensed', sans-serif" },
  { id: 'chakra', label: 'Chakra Petch', family: "'Chakra Petch', sans-serif" },
] as const;
