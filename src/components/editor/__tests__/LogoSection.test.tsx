import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { LogoSection } from '@/components/editor/LogoSection';
import { useLogoStore } from '@/stores/logoStore';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { db } from '@/api/db';

vi.mock('@/utils/image', () => ({
  processLogo: vi.fn((file: File) =>
    Promise.resolve(`data:image/webp;base64,logo_${file.name}`),
  ),
  processPlayerPhoto: vi.fn((file: File) =>
    Promise.resolve(`data:image/webp;base64,mock_${file.name}`),
  ),
  isValidImageFile: vi.fn(() => true),
  fileToDataUrl: vi.fn(() => Promise.resolve('data:image/png;base64,test')),
  compressImage: vi.fn((url: string) => Promise.resolve(url)),
  compressLogo: vi.fn((url: string) => Promise.resolve(url)),
  compressBackgroundImage: vi.fn((url: string) => Promise.resolve(url)),
  processBackgroundImage: vi.fn((file: File) =>
    Promise.resolve(`data:image/webp;base64,bg_${file.name}`),
  ),
  isValidVideoFile: vi.fn(() => false),
}));

describe('LogoSection', () => {
  beforeEach(async () => {
    await db.logos.clear();
    useLogoStore.setState({ logos: [], loading: false });
    useScoreboardStore.getState().resetState();
  });

  it('affiche le titre de la section', () => {
    render(<LogoSection />);
    expect(screen.getByText(EDITOR_LABELS.sectionLogos)).toBeInTheDocument();
  });

  it('affiche les 3 onglets', () => {
    render(<LogoSection />);
    expect(screen.getByText(EDITOR_LABELS.logoTeamTab)).toBeInTheDocument();
    expect(screen.getByText(EDITOR_LABELS.logoCompetitionTab)).toBeInTheDocument();
    expect(screen.getByText(EDITOR_LABELS.logoSponsorTab)).toBeInTheDocument();
  });

  it('affiche le message quand aucun logo', async () => {
    render(<LogoSection />);
    await waitFor(() => {
      expect(screen.getByText(EDITOR_LABELS.logoEmpty)).toBeInTheDocument();
    });
  });

  it('affiche le bouton d\'ajout', () => {
    render(<LogoSection />);
    expect(screen.getByText(EDITOR_LABELS.logoAdd)).toBeInTheDocument();
  });

  it('change d\'onglet au clic sur Compétition', () => {
    render(<LogoSection />);
    fireEvent.click(screen.getByText(EDITOR_LABELS.logoCompetitionTab));
    expect(screen.getByText(EDITOR_LABELS.logoShowCompetition)).toBeInTheDocument();
  });

  it('change d\'onglet au clic sur Sponsor', () => {
    render(<LogoSection />);
    fireEvent.click(screen.getByText(EDITOR_LABELS.logoSponsorTab));
    expect(screen.getByText(EDITOR_LABELS.logoShowSponsor)).toBeInTheDocument();
  });

  it('affiche le sélecteur de mode logo dans l\'onglet équipe', () => {
    render(<LogoSection />);
    expect(screen.getByText(EDITOR_LABELS.logoMode)).toBeInTheDocument();
  });

  it('affiche les logos existants après chargement', async () => {
    await db.logos.add({
      id: 'team-CAN',
      logoType: 'team',
      key: 'CAN',
      name: 'Canada',
      dataUrl: 'data:image/webp;base64,abc',
      created: new Date().toISOString(),
    });

    render(<LogoSection />);
    await waitFor(() => {
      expect(screen.getByText('CAN - Canada')).toBeInTheDocument();
    });
  });
});
