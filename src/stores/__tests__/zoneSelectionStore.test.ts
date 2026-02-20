import { describe, it, expect, beforeEach } from 'vitest';
import { useZoneSelectionStore } from '../zoneSelectionStore';
import { DEFAULT_FIELD_STYLE } from '@/types/customField';
import type { CustomField, FieldElementConfig } from '@/types/customField';

function makeField(id: string): CustomField {
  const element: FieldElementConfig = {
    type: 'text-block',
    config: { content: 'test', fontSize: 20, fontWeight: 400, fontFamily: '', textAlign: 'center', textTransform: 'none', letterSpacing: 0 },
  };
  return {
    id, label: 'Test', x: 0, y: 0, width: 100, height: 80,
    rotation: 0, zIndex: 1, locked: false, visible: true, lockAspectRatio: false,
    scaleContent: true, initialWidth: 100, initialHeight: 80,
    element, style: { ...DEFAULT_FIELD_STYLE },
  };
}

describe('zoneSelectionStore', () => {
  beforeEach(() => {
    useZoneSelectionStore.setState({ capturedFields: null });
  });

  it('commence sans champs capturés', () => {
    expect(useZoneSelectionStore.getState().capturedFields).toBeNull();
  });

  it('stocke les champs capturés', () => {
    const fields = [makeField('f1'), makeField('f2')];
    useZoneSelectionStore.getState().setCapturedFields(fields);
    expect(useZoneSelectionStore.getState().capturedFields).toHaveLength(2);
  });

  it('efface les champs capturés', () => {
    const fields = [makeField('f1')];
    useZoneSelectionStore.getState().setCapturedFields(fields);
    expect(useZoneSelectionStore.getState().capturedFields).not.toBeNull();

    useZoneSelectionStore.getState().clearCapturedFields();
    expect(useZoneSelectionStore.getState().capturedFields).toBeNull();
  });

  it('accepte un tableau vide', () => {
    useZoneSelectionStore.getState().setCapturedFields([]);
    expect(useZoneSelectionStore.getState().capturedFields).toHaveLength(0);
  });

  it('accepte null pour réinitialiser', () => {
    useZoneSelectionStore.getState().setCapturedFields([makeField('f1')]);
    useZoneSelectionStore.getState().setCapturedFields(null);
    expect(useZoneSelectionStore.getState().capturedFields).toBeNull();
  });
});
