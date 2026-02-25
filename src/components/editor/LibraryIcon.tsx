/**
 * Icône pour un élément de la bibliothèque du constructeur de champs.
 * Résout le nom d'icône vers le composant Lucide correspondant.
 */

import {
  Hash, Clock, Timer, Shield, Flag, PauseCircle, Target,
  Type, BarChart2, GitCompare, User, Image, Square, Minus,
  LayoutDashboard, Columns, AlignCenter, Trophy,
  ListOrdered, FileText, Users, Calendar,
  UserRound, CircleDot, Handshake, Briefcase, UsersRound, Table,
  Activity, List, CalendarDays, CalendarRange,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const ICON_MAP: Record<string, LucideIcon> = {
  hash: Hash, clock: Clock, timer: Timer, shield: Shield, flag: Flag,
  'pause-circle': PauseCircle, target: Target, type: Type,
  'bar-chart-2': BarChart2, 'git-compare': GitCompare, user: User,
  image: Image, square: Square, minus: Minus,
  'layout-dashboard': LayoutDashboard, columns: Columns,
  'align-center': AlignCenter, trophy: Trophy,
  'list-ordered': ListOrdered, 'file-text': FileText,
  users: Users, calendar: Calendar,
  'flag-triangle-right': Flag, 'id-card': User, 'bar-chart': BarChart2,
  'user-round': UserRound, 'circle-dot': CircleDot, handshake: Handshake,
  briefcase: Briefcase, 'users-round': UsersRound, table: Table,
  activity: Activity, list: List,
  'calendar-days': CalendarDays, 'calendar-range': CalendarRange,
};

export function LibraryIcon({ name }: { readonly name: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return <span className="text-gray-600 text-[10px] w-3.5 flex-shrink-0">+</span>;
  return <Icon size={14} className="flex-shrink-0 text-gray-500" />;
}
