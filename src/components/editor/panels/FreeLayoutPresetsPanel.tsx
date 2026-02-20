/**
 * Panneau des presets pour le mode Layout libre.
 * Permet de sauvegarder/charger des presets et d'utiliser des modèles hockey.
 */

import { useState, useEffect } from 'react';
import { Save, FolderOpen, Crosshair, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useZoneSelectionStore } from '@/stores/zoneSelectionStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { SavePresetModal } from '@/components/editor/SavePresetModal';
import { LoadPresetModal } from '@/components/editor/LoadPresetModal';
import type { CustomField } from '@/types/customField';
import type { PresetScope } from '@/types/fieldPreset';

export function FreeLayoutPresetsPanel() {
  const singleSelectedId = useScoreboardStore((s) => {
    const ids = s.customFieldsData.selectedFieldIds;
    return ids.length === 1 ? ids[0] ?? null : null;
  });
  const fieldsCount = useScoreboardStore((s) => s.customFieldsData.fields.length);
  const zoneSelectionActive = useScoreboardStore((s) => s.customFieldsData.zoneSelectionActive);
  const updateOption = useScoreboardStore((s) => s.updateCustomFieldsOption);
  const capturedFields = useZoneSelectionStore((s) => s.capturedFields);
  const clearCapturedFields = useZoneSelectionStore((s) => s.clearCapturedFields);

  const [saveOpen, setSaveOpen] = useState(false);
  const [loadOpen, setLoadOpen] = useState(false);
  const [saveScope, setSaveScope] = useState<PresetScope>('layout');
  const [zoneFields, setZoneFields] = useState<readonly CustomField[] | undefined>(undefined);

  useEffect(() => {
    if (capturedFields && capturedFields.length > 0) {
      setZoneFields(capturedFields);
      setSaveScope('layout');
      setSaveOpen(true);
      clearCapturedFields();
    }
  }, [capturedFields, clearCapturedFields]);

  const handleOpenSaveField = () => {
    setZoneFields(undefined);
    setSaveScope('field');
    setSaveOpen(true);
  };

  const handleOpenSaveLayout = () => {
    setZoneFields(undefined);
    setSaveScope('layout');
    setSaveOpen(true);
  };

  const handleToggleZoneSelection = () => {
    updateOption('zoneSelectionActive', !zoneSelectionActive);
  };

  const handleCloseSaveModal = () => {
    setSaveOpen(false);
    setZoneFields(undefined);
  };

  return (
    <div className="flex flex-col h-full overflow-hidden" data-testid="free-layout-presets-panel">
      <div className="px-4 py-3 border-b border-gray-800">
        <h2 className="text-sm font-semibold text-gray-300">
          {CUSTOM_FIELD_LABELS.sectionPresets}
        </h2>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4 flex flex-col gap-2">
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-start"
          onClick={handleOpenSaveField}
          disabled={!singleSelectedId}
        >
          <Save size={14} className="flex-shrink-0" />
          {CUSTOM_FIELD_LABELS.presetSaveField}
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-start"
          onClick={handleOpenSaveLayout}
          disabled={fieldsCount === 0}
        >
          <Save size={14} className="flex-shrink-0" />
          {CUSTOM_FIELD_LABELS.presetSaveLayout}
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 w-full justify-start"
          onClick={() => setLoadOpen(true)}
        >
          <FolderOpen size={14} className="flex-shrink-0" />
          {CUSTOM_FIELD_LABELS.presetLoad}
        </Button>

        <div className="border-t border-gray-700 my-1 pt-2">
          <Button
            variant={zoneSelectionActive ? 'primary' : 'ghost'}
            className="flex items-center gap-2 w-full justify-start"
            onClick={handleToggleZoneSelection}
            disabled={fieldsCount === 0}
          >
            {zoneSelectionActive ? (
              <X size={14} className="flex-shrink-0" />
            ) : (
              <Crosshair size={14} className="flex-shrink-0" />
            )}
            {zoneSelectionActive
              ? CUSTOM_FIELD_LABELS.zoneSelectCancel
              : CUSTOM_FIELD_LABELS.zoneSelectStart}
          </Button>
          {zoneSelectionActive && (
            <p className="text-[11px] text-sky-400 mt-1">
              {CUSTOM_FIELD_LABELS.zoneSelectHint}
            </p>
          )}
        </div>
      </div>

      <SavePresetModal
        open={saveOpen}
        onClose={handleCloseSaveModal}
        defaultScope={saveScope}
        zoneFields={zoneFields}
      />
      <LoadPresetModal
        open={loadOpen}
        onClose={() => setLoadOpen(false)}
      />
    </div>
  );
}
