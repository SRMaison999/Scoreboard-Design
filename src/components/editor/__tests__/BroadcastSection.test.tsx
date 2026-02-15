import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { BroadcastSection } from '@/components/editor/BroadcastSection';
import { EDITOR_LABELS } from '@/constants/labels';
import { useBroadcastStore } from '@/stores/broadcastStore';

function renderAndOpen() {
  const result = render(<BroadcastSection />);
  const title = screen.getByText(EDITOR_LABELS.sectionBroadcast);
  fireEvent.click(title);
  return result;
}

describe('BroadcastSection', () => {
  beforeEach(() => {
    useBroadcastStore.getState().resetBroadcast();
  });

  it('affiche le titre', () => {
    render(<BroadcastSection />);
    expect(screen.getByText(EDITOR_LABELS.sectionBroadcast)).toBeInTheDocument();
  });

  it('affiche le statut arr\u00eat\u00e9', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.broadcastStopped)).toBeInTheDocument();
  });

  it('affiche les ports de configuration', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.broadcastPort)).toBeInTheDocument();
    expect(screen.getByText(EDITOR_LABELS.broadcastHttpPort)).toBeInTheDocument();
  });

  it('affiche le bouton d\'activation', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.broadcastEnable)).toBeInTheDocument();
  });

  it('affiche le bouton d\'export snapshot', () => {
    renderAndOpen();
    expect(screen.getByText(EDITOR_LABELS.frameExportSnapshot)).toBeInTheDocument();
  });
});
