/**
 * Section éditeur pour le constructeur de champs personnalisés (Type 14).
 * Contient les options du canvas, la bibliothèque, la liste des champs et les presets.
 */

import { useState, useEffect } from 'react';
import { Save, FolderOpen, Crosshair, X, Undo2, Redo2 } from 'lucide-react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useZoneSelectionStore } from '@/stores/zoneSelectionStore';
import { useUndoRedoStore } from '@/stores/undoRedoStore';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { useCustomFieldKeyboard } from '@/hooks/useCustomFieldKeyboard';
import { CustomFieldLibrary } from './CustomFieldLibrary';
import { CustomFieldList } from './CustomFieldList';
import { CustomFieldProperties } from './CustomFieldProperties';
import { SavePresetModal } from './SavePresetModal';
import { LoadPresetModal } from './LoadPresetModal';
import { GRID_SIZE_OPTIONS } from '@/types/customField';
import type { CustomField } from '@/types/customField';
import type { PresetScope } from '@/types/fieldPreset';

export function CustomFieldsSection() {
  useCustomFieldKeyboard();
  const fullPageMode = useScoreboardStore((s) => s.customFieldsData.fullPageMode);
  const snapToGrid = useScoreboardStore((s) => s.customFieldsData.snapToGrid);
  const showGuides = useScoreboardStore((s) => s.customFieldsData.showGuides);
  const gridSize = useScoreboardStore((s) => s.customFieldsData.gridSize);
  const selectedFieldId = useScoreboardStore((s) => s.customFieldsData.selectedFieldId);
  const fieldsCount = useScoreboardStore((s) => s.customFieldsData.fields.length);
  const updateOption = useScoreboardStore((s) => s.updateCustomFieldsOption);
  const updateGridSize = useScoreboardStore((s) => s.updateCustomFieldsGridSize);

  const zoneSelectionActive = useScoreboardStore((s) => s.customFieldsData.zoneSelectionActive);
  const capturedFields = useZoneSelectionStore((s) => s.capturedFields);
  const clearCapturedFields = useZoneSelectionStore((s) => s.clearCapturedFields);
  const canUndo = useUndoRedoStore((s) => s.canUndo);
  const canRedo = useUndoRedoStore((s) => s.canRedo);
  const undo = useUndoRedoStore((s) => s.undo);
  const redo = useUndoRedoStore((s) => s.redo);

  const [saveOpen, setSaveOpen] = useState(false);
  const [loadOpen, setLoadOpen] = useState(false);
  const [saveScope, setSaveScope] = useState<PresetScope>('layout');
  const [zoneFields, setZoneFields] = useState<readonly CustomField[] | undefined>(undefined);

  /* Ouvre la modale de sauvegarde quand des champs sont capturés par zone */
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
    <>
      <Section title={CUSTOM_FIELD_LABELS.sectionCustomFields} defaultOpen>
        <label className="flex items-center gap-2 cursor-pointer text-[13px]">
          <input
            type="checkbox"
            checked={fullPageMode}
            onChange={(e) => updateOption('fullPageMode', e.target.checked)}
            className="accent-sky-300"
          />
          {CUSTOM_FIELD_LABELS.fullPageMode}
        </label>
        <p className="text-[11px] text-gray-500 mt-0.5">
          {CUSTOM_FIELD_LABELS.fullPageModeHint}
        </p>

        <label className="flex items-center gap-2 cursor-pointer text-[13px] mt-2">
          <input
            type="checkbox"
            checked={snapToGrid}
            onChange={(e) => updateOption('snapToGrid', e.target.checked)}
            className="accent-sky-300"
          />
          {CUSTOM_FIELD_LABELS.snapToGrid}
        </label>

        {snapToGrid && (
          <div className="flex items-center gap-2 mt-1 text-[13px]">
            <span className="text-gray-400">{CUSTOM_FIELD_LABELS.gridSize}</span>
            <select
              value={gridSize}
              onChange={(e) => updateGridSize(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 text-gray-200 rounded px-2 py-0.5 text-[13px]"
            >
              {GRID_SIZE_OPTIONS.map((s) => (
                <option key={s} value={s}>{s}px</option>
              ))}
            </select>
          </div>
        )}

        <label className="flex items-center gap-2 cursor-pointer text-[13px] mt-2">
          <input
            type="checkbox"
            checked={showGuides}
            onChange={(e) => updateOption('showGuides', e.target.checked)}
            className="accent-sky-300"
          />
          {CUSTOM_FIELD_LABELS.showGuides}
        </label>

        <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-800">
          <Button
            variant="ghost"
            className="flex items-center gap-1 px-2 py-1"
            onClick={undo}
            disabled={!canUndo}
            title={CUSTOM_FIELD_LABELS.undoRedoHint}
          >
            <Undo2 size={14} className="flex-shrink-0" />
            <span className="text-[12px]">{CUSTOM_FIELD_LABELS.undoAction}</span>
          </Button>
          <Button
            variant="ghost"
            className="flex items-center gap-1 px-2 py-1"
            onClick={redo}
            disabled={!canRedo}
            title={CUSTOM_FIELD_LABELS.undoRedoHint}
          >
            <Redo2 size={14} className="flex-shrink-0" />
            <span className="text-[12px]">{CUSTOM_FIELD_LABELS.redoAction}</span>
          </Button>
          <span className="text-[10px] text-gray-600 ml-auto">{CUSTOM_FIELD_LABELS.undoRedoHint}</span>
        </div>
      </Section>

      <Section title={CUSTOM_FIELD_LABELS.sectionPresets} defaultOpen={false}>
        <div className="flex flex-col gap-1.5">
          <Button
            variant="ghost"
            className="flex items-center gap-2 w-full justify-start"
            onClick={handleOpenSaveField}
            disabled={!selectedFieldId}
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
          <div className="border-t border-gray-700 my-1 pt-1">
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
      </Section>

      {selectedFieldId && (
        <Section title={CUSTOM_FIELD_LABELS.fieldProperties} defaultOpen>
          <CustomFieldProperties fieldId={selectedFieldId} />
        </Section>
      )}

      <CustomFieldLibrary />

      <Section title={CUSTOM_FIELD_LABELS.layersTitle} defaultOpen>
        <CustomFieldList />
      </Section>

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
    </>
  );
}
