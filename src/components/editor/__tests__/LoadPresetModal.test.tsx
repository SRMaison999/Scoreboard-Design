import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { LoadPresetModal } from '../LoadPresetModal';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { usePresetStore } from '@/stores/presetStore';
import { db } from '@/api/db';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';
import { DEFAULT_FIELD_STYLE, DEFAULT_CUSTOM_FIELDS_DATA } from '@/types/customField';
import type { CustomField } from '@/types/customField';

const MOCK_FIELD: CustomField = {
  id: 'field-test-1',
  label: 'Champ test',
  x: 100,
  y: 50,
  width: 200,
  height: 100,
  rotation: 0,
  zIndex: 1,
  locked: false,
  visible: true,
  lockAspectRatio: false,
  scaleContent: true,
  initialWidth: 200,
  initialHeight: 100,
  element: {
    type: 'text-block',
    config: { content: 'Preset', fontSize: 24, fontWeight: 600, fontFamily: '', textAlign: 'center', textTransform: 'none', letterSpacing: 0, textColor: '#ffffff' },
  },
  style: DEFAULT_FIELD_STYLE,
};

describe('LoadPresetModal', () => {
  beforeEach(async () => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
    await db.fieldPresets.clear();
    usePresetStore.setState({ presets: [], loading: false });
  });

  it('affiche le titre de la modale', () => {
    render(<LoadPresetModal open onClose={() => {}} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.presetLoadTitle)).toBeInTheDocument();
  });

  it('affiche un message quand la liste est vide', () => {
    render(<LoadPresetModal open onClose={() => {}} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.presetEmpty)).toBeInTheDocument();
  });

  it('affiche les presets apr\u00e8s chargement', async () => {
    await usePresetStore.getState().saveFieldPreset('Preset 1', MOCK_FIELD);
    render(<LoadPresetModal open onClose={() => {}} />);
    expect(await screen.findByText('Preset 1')).toBeInTheDocument();
  });

  it('affiche les presets layout', async () => {
    const layout = { ...DEFAULT_CUSTOM_FIELDS_DATA, fields: [MOCK_FIELD] };
    await usePresetStore.getState().saveLayoutPreset('Layout 1', layout);
    render(<LoadPresetModal open onClose={() => {}} />);
    expect(await screen.findByText('Layout 1')).toBeInTheDocument();
  });

  it('ne s\'affiche pas quand open est false', () => {
    render(<LoadPresetModal open={false} onClose={() => {}} />);
    expect(screen.queryByText(CUSTOM_FIELD_LABELS.presetLoadTitle)).not.toBeInTheDocument();
  });

  it('affiche le bouton importer', () => {
    render(<LoadPresetModal open onClose={() => {}} />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.presetImport)).toBeInTheDocument();
  });
});
