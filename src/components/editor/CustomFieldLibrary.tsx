/**
 * Panneau bibliothèque d'éléments pour le constructeur de champs.
 * Permet de parcourir les catégories et d'ajouter des éléments au canvas.
 */

import { useState, useMemo } from 'react';
import {
  Hash, Clock, Timer, Shield, Flag, PauseCircle, Target,
  Type, BarChart2, GitCompare, User, Image, Square, Minus,
  LayoutDashboard, Columns, AlignCenter, Trophy,
  ListOrdered, FileText, Users, Calendar,
} from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import {
  LIBRARY_ELEMENTS,
  LIBRARY_CATEGORY_LABELS,
  CUSTOM_FIELD_LABELS,
} from '@/constants/customFields';
import { FIELD_MAX_FIELDS } from '@/types/customField';
import type { LibraryCategory, LibraryElement, FieldElementConfig } from '@/types/customField';
import type { LucideIcon } from 'lucide-react';

const CATEGORIES: LibraryCategory[] = ['match', 'text', 'data', 'players', 'media', 'composed'];

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
};

function LibraryIcon({ name }: { readonly name: string }) {
  const Icon = ICON_MAP[name];
  if (!Icon) return <span className="text-gray-600 text-[10px] w-3.5 flex-shrink-0">+</span>;
  return <Icon size={14} className="flex-shrink-0 text-gray-500" />;
}

function defaultConfig(el: LibraryElement): FieldElementConfig {
  switch (el.type) {
    case 'text-block':
      return { type: 'text-block', config: { content: 'Texte', fontSize: 30, fontWeight: 600, fontFamily: '', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2 } };
    case 'score-display':
      return { type: 'score-display', config: { side: 'left', showLabel: false, fontSizeOverride: 0 } };
    case 'clock-display':
      return { type: 'clock-display', config: { showPeriod: true, showBox: false, fontSizeOverride: 0 } };
    case 'period-display':
      return { type: 'period-display', config: { fontSizeOverride: 0 } };
    case 'team-name':
      return { type: 'team-name', config: { side: 'left', showFlag: true, fontSizeOverride: 0 } };
    case 'flag-display':
      return { type: 'flag-display', config: { side: 'left' } };
    case 'timeout-display':
      return { type: 'timeout-display', config: {} };
    case 'shootout-display':
      return { type: 'shootout-display', config: {} };
    case 'stat-line':
      return { type: 'stat-line', config: { statIndex: 0 } };
    case 'bar-compare':
      return { type: 'bar-compare', config: { barIndex: 0 } };
    case 'player-photo':
      return { type: 'player-photo', config: { photoKey: '', shape: 'circle' } };
    case 'image-block':
      return { type: 'image-block', config: { src: '', objectFit: 'cover' } };
    case 'shape-block':
      return { type: 'shape-block', config: { shape: 'rectangle', fillColor: '#ffffff', fillOpacity: 80, borderColor: '', borderWidth: 0, borderRadius: 0 } };
    case 'separator-line':
      return { type: 'separator-line', config: { orientation: 'horizontal', thickness: 2, lineColor: '#ffffff', lineOpacity: 50 } };
    case 'header-block':
      return { type: 'header-block', config: { showClock: true } };
    case 'penalty-column':
      return { type: 'penalty-column', config: { side: 'left' } };
    default: {
      const bodyMatch = el.type.match(/^body-type-(\d+)$/);
      if (bodyMatch?.[1]) {
        const id = parseInt(bodyMatch[1], 10);
        return { type: el.type, config: { bodyTypeId: id } } as FieldElementConfig;
      }
      return { type: 'text-block', config: { content: 'Texte', fontSize: 30, fontWeight: 600, fontFamily: '', textAlign: 'center', textTransform: 'uppercase', letterSpacing: 2 } };
    }
  }
}

export function CustomFieldLibrary() {
  const [search, setSearch] = useState('');
  const fieldsCount = useScoreboardStore((s) => s.customFieldsData.fields.length);
  const templateWidth = useScoreboardStore((s) => s.templateWidth);
  const templateHeight = useScoreboardStore((s) => s.templateHeight);
  const addField = useScoreboardStore((s) => s.addCustomField);

  const filtered = useMemo(() => {
    if (!search.trim()) return LIBRARY_ELEMENTS;
    const q = search.toLowerCase();
    return LIBRARY_ELEMENTS.filter((el) => el.label.toLowerCase().includes(q));
  }, [search]);

  const isFull = fieldsCount >= FIELD_MAX_FIELDS;

  const handleAdd = (el: LibraryElement) => {
    if (isFull) return;
    const w = Math.min(el.defaultWidth, templateWidth);
    const h = Math.min(el.defaultHeight, templateHeight);
    const x = Math.round((templateWidth - w) / 2);
    const y = Math.round((templateHeight - h) / 2);
    addField(defaultConfig(el), x, y, w, h);
  };

  return (
    <Section title={CUSTOM_FIELD_LABELS.libraryTitle} defaultOpen>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder={CUSTOM_FIELD_LABELS.librarySearch}
        className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded px-2.5 py-1 text-[13px] mb-2"
      />

      {isFull && (
        <p className="text-[11px] text-red-400 mb-2">{CUSTOM_FIELD_LABELS.maxFieldsReached}</p>
      )}

      {CATEGORIES.map((cat) => {
        const items = filtered.filter((el) => el.category === cat);
        if (items.length === 0) return null;
        return (
          <div key={cat} className="mb-2">
            <div className="text-[10px] text-gray-500 uppercase tracking-wider mb-1 border-t border-gray-800 pt-1">
              {LIBRARY_CATEGORY_LABELS[cat]}
            </div>
            <div className="flex flex-col gap-0.5">
              {items.map((el) => (
                <button
                  key={el.type}
                  type="button"
                  disabled={isFull}
                  onClick={() => handleAdd(el)}
                  className="flex items-center gap-2 text-[12px] text-gray-300 hover:text-sky-300 hover:bg-gray-800 rounded px-2 py-1 cursor-pointer text-left disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <LibraryIcon name={el.icon} />
                  {el.label}
                </button>
              ))}
            </div>
          </div>
        );
      })}

      {filtered.length === 0 && (
        <p className="text-[12px] text-gray-500">{CUSTOM_FIELD_LABELS.libraryEmpty}</p>
      )}
    </Section>
  );
}
