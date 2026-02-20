import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { SavePresetModal } from '../SavePresetModal';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { usePresetStore } from '@/stores/presetStore';
import { db } from '@/api/db';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

describe('SavePresetModal', () => {
  beforeEach(async () => {
    useScoreboardStore.getState().resetState();
    useScoreboardStore.getState().update('bodyType', 14);
    await db.fieldPresets.clear();
    usePresetStore.setState({ presets: [], loading: false });
  });

  it('affiche le titre de la modale', () => {
    render(<SavePresetModal open onClose={() => {}} defaultScope="layout" />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.presetSaveTitle)).toBeInTheDocument();
  });

  it('affiche un message quand aucun champ n\'est s\u00e9lectionn\u00e9 en mode field', () => {
    render(<SavePresetModal open onClose={() => {}} defaultScope="field" />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.presetNoFieldSelected)).toBeInTheDocument();
  });

  it('affiche un message quand le canvas est vide en mode layout', () => {
    render(<SavePresetModal open onClose={() => {}} defaultScope="layout" />);
    expect(screen.getByText(CUSTOM_FIELD_LABELS.presetNoFields)).toBeInTheDocument();
  });

  it('le bouton sauvegarder est d\u00e9sactiv\u00e9 sans nom', () => {
    const element = { type: 'text-block' as const, config: { content: 'test', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center' as const, textTransform: 'none' as const, letterSpacing: 0 } };
    useScoreboardStore.getState().addCustomField(element, 50, 50, 200, 100);
    render(<SavePresetModal open onClose={() => {}} defaultScope="layout" />);
    const saveBtn = screen.getByText(CUSTOM_FIELD_LABELS.presetSave);
    expect(saveBtn).toBeDisabled();
  });

  it('sauvegarde un preset layout avec un nom', async () => {
    const user = userEvent.setup();
    const element = { type: 'text-block' as const, config: { content: 'test', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center' as const, textTransform: 'none' as const, letterSpacing: 0 } };
    useScoreboardStore.getState().addCustomField(element, 50, 50, 200, 100);

    const onClose = vi.fn();
    render(<SavePresetModal open onClose={onClose} defaultScope="layout" />);

    const input = screen.getByPlaceholderText(CUSTOM_FIELD_LABELS.presetNamePlaceholder);
    await user.type(input, 'Mon preset');
    await user.click(screen.getByText(CUSTOM_FIELD_LABELS.presetSave));

    await waitFor(() => {
      const { presets } = usePresetStore.getState();
      expect(presets).toHaveLength(1);
      expect(presets[0]!.name).toBe('Mon preset');
    });
    expect(onClose).toHaveBeenCalled();
  });

  it('ne s\'affiche pas quand open est false', () => {
    render(<SavePresetModal open={false} onClose={() => {}} defaultScope="layout" />);
    expect(screen.queryByText(CUSTOM_FIELD_LABELS.presetSaveTitle)).not.toBeInTheDocument();
  });

  it('affiche le nombre de champs capturés en mode zone', () => {
    const element = { type: 'text-block' as const, config: { content: 'test', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center' as const, textTransform: 'none' as const, letterSpacing: 0 } };
    const zoneFields = [{
      id: 'z1', label: 'Zone 1', x: 0, y: 0, width: 100, height: 80,
      zIndex: 1, locked: false, visible: true, lockAspectRatio: false,
      scaleContent: true, initialWidth: 100, initialHeight: 80,
      element, style: { backgroundColor: '', backgroundOpacity: 0, borderColor: '', borderWidth: 0, borderRadius: 0, padding: 0, opacity: 100, shadow: null, backdropBlur: 0 },
    }];
    render(
      <SavePresetModal open onClose={() => {}} defaultScope="layout" zoneFields={zoneFields} />,
    );
    expect(screen.getByText(CUSTOM_FIELD_LABELS.zoneSelectStart + ':')).toBeInTheDocument();
    expect(screen.getByText(/1/)).toBeInTheDocument();
  });

  it('masque le sélecteur de portée en mode zone', () => {
    const element = { type: 'text-block' as const, config: { content: 'test', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center' as const, textTransform: 'none' as const, letterSpacing: 0 } };
    const zoneFields = [{
      id: 'z1', label: 'Zone 1', x: 0, y: 0, width: 100, height: 80,
      zIndex: 1, locked: false, visible: true, lockAspectRatio: false,
      scaleContent: true, initialWidth: 100, initialHeight: 80,
      element, style: { backgroundColor: '', backgroundOpacity: 0, borderColor: '', borderWidth: 0, borderRadius: 0, padding: 0, opacity: 100, shadow: null, backdropBlur: 0 },
    }];
    render(
      <SavePresetModal open onClose={() => {}} defaultScope="layout" zoneFields={zoneFields} />,
    );
    expect(screen.queryByText(CUSTOM_FIELD_LABELS.presetScopeField)).not.toBeInTheDocument();
  });

  it('sauvegarde un preset avec les champs de zone', async () => {
    const user = userEvent.setup();
    const element = { type: 'text-block' as const, config: { content: 'test', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center' as const, textTransform: 'none' as const, letterSpacing: 0 } };
    const zoneFields = [{
      id: 'z1', label: 'Zone 1', x: 0, y: 0, width: 100, height: 80,
      zIndex: 1, locked: false, visible: true, lockAspectRatio: false,
      scaleContent: true, initialWidth: 100, initialHeight: 80,
      element, style: { backgroundColor: '', backgroundOpacity: 0, borderColor: '', borderWidth: 0, borderRadius: 0, padding: 0, opacity: 100, shadow: null, backdropBlur: 0 },
    }];
    const onClose = vi.fn();
    render(
      <SavePresetModal open onClose={onClose} defaultScope="layout" zoneFields={zoneFields} />,
    );

    const input = screen.getByPlaceholderText(CUSTOM_FIELD_LABELS.presetNamePlaceholder);
    await user.type(input, 'Zone preset');
    await user.click(screen.getByText(CUSTOM_FIELD_LABELS.presetSave));

    await waitFor(() => {
      const { presets } = usePresetStore.getState();
      expect(presets).toHaveLength(1);
      expect(presets[0]!.name).toBe('Zone preset');
      expect(presets[0]!.layout?.fields).toHaveLength(1);
    });
    expect(onClose).toHaveBeenCalled();
  });
});
