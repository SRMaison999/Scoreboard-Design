/**
 * Barre d'outils pour la multi-sélection : alignement et distribution.
 * Affichée quand 2+ champs sont sélectionnés.
 */

import {
  AlignStartVertical, AlignCenterVertical, AlignEndVertical,
  AlignStartHorizontal, AlignCenterHorizontal, AlignEndHorizontal,
  AlignHorizontalSpaceBetween, AlignVerticalSpaceBetween,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import type { DistributionAction } from '@/utils/fieldDistribution';

interface MultiSelectionToolbarProps {
  readonly count: number;
}

export function MultiSelectionToolbar({ count }: MultiSelectionToolbarProps) {
  const distribute = useScoreboardStore((s) => s.distributeSelectedFields);
  const removeSelected = useScoreboardStore((s) => s.removeSelectedFields);
  const duplicateSelected = useScoreboardStore((s) => s.duplicateSelectedFields);

  const handleAction = (action: DistributionAction) => () => distribute(action);

  return (
    <div className="flex flex-col gap-2">
      <div className="text-[12px] text-gray-300">
        {count} {CUSTOM_FIELD_LABELS.multiSelectionCount}
      </div>

      {/* Alignement entre champs */}
      <div className="text-[10px] text-gray-500 uppercase tracking-wider">
        {CUSTOM_FIELD_LABELS.alignSelectionTitle}
      </div>
      <div className="flex items-center gap-1">
        <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={handleAction('align-sel-left')} title={CUSTOM_FIELD_LABELS.alignSelLeft}>
          <AlignStartVertical size={14} className="flex-shrink-0" />
        </button>
        <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={handleAction('align-sel-center-h')} title={CUSTOM_FIELD_LABELS.alignSelCenterH}>
          <AlignCenterVertical size={14} className="flex-shrink-0" />
        </button>
        <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={handleAction('align-sel-right')} title={CUSTOM_FIELD_LABELS.alignSelRight}>
          <AlignEndVertical size={14} className="flex-shrink-0" />
        </button>
        <div className="w-px h-4 bg-gray-700 mx-1" />
        <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={handleAction('align-sel-top')} title={CUSTOM_FIELD_LABELS.alignSelTop}>
          <AlignStartHorizontal size={14} className="flex-shrink-0" />
        </button>
        <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={handleAction('align-sel-center-v')} title={CUSTOM_FIELD_LABELS.alignSelCenterV}>
          <AlignCenterHorizontal size={14} className="flex-shrink-0" />
        </button>
        <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={handleAction('align-sel-bottom')} title={CUSTOM_FIELD_LABELS.alignSelBottom}>
          <AlignEndHorizontal size={14} className="flex-shrink-0" />
        </button>
      </div>

      {/* Distribution */}
      {count >= 3 && (
        <>
          <div className="text-[10px] text-gray-500 uppercase tracking-wider border-t border-gray-800 pt-1 mt-1">
            {CUSTOM_FIELD_LABELS.distributeTitle}
          </div>
          <div className="flex items-center gap-1">
            <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={handleAction('distribute-h')} title={CUSTOM_FIELD_LABELS.distributeH}>
              <AlignHorizontalSpaceBetween size={14} className="flex-shrink-0" />
            </button>
            <button type="button" className="p-1 hover:text-sky-300 text-gray-400" onClick={handleAction('distribute-v')} title={CUSTOM_FIELD_LABELS.distributeV}>
              <AlignVerticalSpaceBetween size={14} className="flex-shrink-0" />
            </button>
          </div>
        </>
      )}

      {/* Actions groupées */}
      <div className="flex gap-2 mt-2 border-t border-gray-800 pt-2">
        <Button variant="ghost" onClick={duplicateSelected}>
          {CUSTOM_FIELD_LABELS.fieldDuplicate}
        </Button>
        <Button variant="danger" onClick={removeSelected}>
          <Trash2 size={12} className="flex-shrink-0 mr-1" />
          {CUSTOM_FIELD_LABELS.fieldDelete}
        </Button>
      </div>
    </div>
  );
}
