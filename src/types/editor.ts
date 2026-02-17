import type { ComponentType } from 'react';
import type { LucideIcon } from 'lucide-react';

/* Identifiants des onglets du rail principal */
export type RailTabId =
  | 'content'
  | 'appearance'
  | 'clock'
  | 'animations'
  | 'integrations';

/* Sous-onglets par groupe */
export type ContentSubTab = 'general' | 'teams' | 'match' | 'media';
export type AppearanceSubTab = 'style' | 'fonts' | 'colors';
export type AnimationsSubTab = 'animations' | 'export';
export type IntegrationsSubTab = 'live' | 'multi' | 'sync' | 'broadcast';

/* Union de tous les sous-onglets possibles */
export type SubTabId =
  | ContentSubTab
  | AppearanceSubTab
  | AnimationsSubTab
  | IntegrationsSubTab;

/* Configuration d'un onglet du rail */
export interface RailTabConfig {
  readonly id: RailTabId;
  readonly icon: LucideIcon;
  readonly label: string;
}

/* Configuration d'un sous-onglet */
export interface SubTabConfig {
  readonly id: string;
  readonly label: string;
}

/* Item du rail d'icônes (générique, réutilisable) */
export interface IconRailItem {
  readonly id: string;
  readonly icon: ComponentType<{ readonly size?: number; readonly className?: string }>;
  readonly label: string;
}

/* Item de sous-onglet (générique, réutilisable) */
export interface SubTabItem {
  readonly id: string;
  readonly label: string;
}
