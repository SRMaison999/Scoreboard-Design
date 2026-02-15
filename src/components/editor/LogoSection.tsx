import { useEffect, useCallback, useRef, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { InputField } from '@/components/ui/InputField';
import { useLogoStore } from '@/stores/logoStore';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { HOCKEY_NATIONS } from '@/constants/nations';
import { ACCEPTED_IMAGE_FORMATS } from '@/types/media';
import { Trash2 } from 'lucide-react';
import type { LogoType, LogoPosition, LogoMode } from '@/types/logo';
import type { ScoreboardState } from '@/types/scoreboard';

const L = EDITOR_LABELS;

const TEAM_OPTIONS = HOCKEY_NATIONS.map((n) => ({ value: n.noc, label: n.noc }));

const TAB_OPTIONS: { value: LogoType; label: string }[] = [
  { value: 'team', label: L.logoTeamTab },
  { value: 'competition', label: L.logoCompetitionTab },
  { value: 'sponsor', label: L.logoSponsorTab },
];

const LOGO_MODE_OPTIONS = [
  { value: 'flag', label: L.logoModeFlag },
  { value: 'logo', label: L.logoModeLogo },
  { value: 'both', label: L.logoModeBoth },
];

const POSITION_OPTIONS: { value: LogoPosition; label: string }[] = [
  { value: 'top-left', label: L.logoPositionTopLeft },
  { value: 'top-right', label: L.logoPositionTopRight },
  { value: 'top-center', label: L.logoPositionTopCenter },
  { value: 'bottom-left', label: L.logoPositionBottomLeft },
  { value: 'bottom-right', label: L.logoPositionBottomRight },
  { value: 'bottom-center', label: L.logoPositionBottomCenter },
];

export function LogoSection() {
  const { logos, loading, fetchLogos, addLogo, removeLogo } = useLogoStore();
  const update = useScoreboardStore((s) => s.update);
  const logoMode = useScoreboardStore((s) => s.logoMode);
  const showCompetitionLogo = useScoreboardStore((s) => s.showCompetitionLogo);
  const competitionLogoPosition = useScoreboardStore((s) => s.competitionLogoPosition);
  const competitionLogoSize = useScoreboardStore((s) => s.competitionLogoSize);
  const showSponsorLogo = useScoreboardStore((s) => s.showSponsorLogo);
  const sponsorLogoPosition = useScoreboardStore((s) => s.sponsorLogoPosition);
  const sponsorLogoSize = useScoreboardStore((s) => s.sponsorLogoSize);

  const [tab, setTab] = useState<LogoType>('team');
  const [key, setKey] = useState('CAN');
  const [name, setName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { void fetchLogos(); }, [fetchLogos]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !key) return;
      void addLogo(tab, key, name, file);
      if (tab !== 'team') { setKey(''); setName(''); }
      if (inputRef.current) inputRef.current.value = '';
    },
    [tab, key, name, addLogo],
  );

  const handleAddClick = useCallback(() => {
    if (!key) return;
    inputRef.current?.click();
  }, [key]);

  const handleRemove = useCallback(
    (id: string) => { void removeLogo(id); },
    [removeLogo],
  );

  const filtered = logos.filter((l) => l.logoType === tab);

  return (
    <Section title={L.sectionLogos}>
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-1">
          {TAB_OPTIONS.map((t) => (
            <button
              key={t.value}
              type="button"
              onClick={() => { setTab(t.value); setKey(t.value === 'team' ? 'CAN' : ''); setName(''); }}
              className={`flex-1 text-[10px] py-1 rounded cursor-pointer ${
                tab === t.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-gray-200'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <LogoUploadForm
          tab={tab}
          logoKey={key}
          name={name}
          onKeyChange={setKey}
          onNameChange={setName}
          onAddClick={handleAddClick}
          disabled={!key}
        />

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_FORMATS.join(',')}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {loading && <div className="text-xs text-gray-500">...</div>}

      {!loading && filtered.length === 0 && (
        <div className="text-xs text-gray-500">{L.logoEmpty}</div>
      )}

      {filtered.length > 0 && (
        <div className="flex flex-col gap-1">
          {filtered.map((l) => (
            <div key={l.id} className="flex items-center gap-2 bg-gray-800 rounded-md px-2 py-1">
              <div className="w-8 h-8 rounded overflow-hidden flex-shrink-0 border border-gray-600 flex items-center justify-center bg-gray-900">
                <img src={l.dataUrl} alt={l.name} className="max-w-full max-h-full object-contain" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-100 truncate">
                  {l.key} {l.name && `- ${l.name}`}
                </div>
              </div>
              <button type="button" onClick={() => handleRemove(l.id)} className="text-red-400 hover:text-red-300 cursor-pointer p-0.5">
                <Trash2 size={12} className="flex-shrink-0" />
              </button>
            </div>
          ))}
        </div>
      )}

      <LogoDisplaySettings
        tab={tab}
        logoMode={logoMode}
        showCompetitionLogo={showCompetitionLogo}
        competitionLogoPosition={competitionLogoPosition}
        competitionLogoSize={competitionLogoSize}
        showSponsorLogo={showSponsorLogo}
        sponsorLogoPosition={sponsorLogoPosition}
        sponsorLogoSize={sponsorLogoSize}
        update={update}
      />
    </Section>
  );
}

interface LogoUploadFormProps {
  readonly tab: LogoType;
  readonly logoKey: string;
  readonly name: string;
  readonly onKeyChange: (v: string) => void;
  readonly onNameChange: (v: string) => void;
  readonly onAddClick: () => void;
  readonly disabled: boolean;
}

function LogoUploadForm({ tab, logoKey, name, onKeyChange, onNameChange, onAddClick, disabled }: LogoUploadFormProps) {
  return (
    <>
      <div className="flex gap-1.5">
        {tab === 'team' ? (
          <div className="w-20">
            <Select label={L.logoTeamCode} options={TEAM_OPTIONS} value={logoKey} onChange={onKeyChange} />
          </div>
        ) : (
          <div className="w-24">
            <InputField label={L.logoTeamCode} value={logoKey} onChange={onKeyChange} />
          </div>
        )}
        <div className="flex-1">
          <InputField label={L.logoName} value={name} onChange={onNameChange} />
        </div>
      </div>
      <Button variant="add" onClick={onAddClick} disabled={disabled}>
        {L.logoAdd}
      </Button>
    </>
  );
}

interface LogoDisplaySettingsProps {
  readonly tab: LogoType;
  readonly logoMode: string;
  readonly showCompetitionLogo: boolean;
  readonly competitionLogoPosition: string;
  readonly competitionLogoSize: number;
  readonly showSponsorLogo: boolean;
  readonly sponsorLogoPosition: string;
  readonly sponsorLogoSize: number;
  readonly update: <K extends keyof ScoreboardState>(key: K, value: ScoreboardState[K]) => void;
}

function LogoDisplaySettings({
  tab, logoMode, showCompetitionLogo, competitionLogoPosition, competitionLogoSize,
  showSponsorLogo, sponsorLogoPosition, sponsorLogoSize, update,
}: LogoDisplaySettingsProps) {
  if (tab === 'team') {
    return (
      <div className="pt-1 border-t border-gray-800">
        <Select label={L.logoMode} options={LOGO_MODE_OPTIONS} value={logoMode} onChange={(v) => update('logoMode', v as LogoMode)} />
      </div>
    );
  }

  if (tab === 'competition') {
    return (
      <div className="flex flex-col gap-1.5 pt-1 border-t border-gray-800">
        <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
          <input type="checkbox" checked={showCompetitionLogo} onChange={(e) => update('showCompetitionLogo', e.target.checked)} />
          {L.logoShowCompetition}
        </label>
        {showCompetitionLogo && (
          <>
            <Select label={L.logoPosition} options={POSITION_OPTIONS} value={competitionLogoPosition} onChange={(v) => update('competitionLogoPosition', v as LogoPosition)} />
            <InputField label={L.logoSize} value={String(competitionLogoSize)} onChange={(v) => update('competitionLogoSize', Number(v) || 80)} />
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-1.5 pt-1 border-t border-gray-800">
      <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
        <input type="checkbox" checked={showSponsorLogo} onChange={(e) => update('showSponsorLogo', e.target.checked)} />
        {L.logoShowSponsor}
      </label>
      {showSponsorLogo && (
        <>
          <Select label={L.logoPosition} options={POSITION_OPTIONS} value={sponsorLogoPosition} onChange={(v) => update('sponsorLogoPosition', v as LogoPosition)} />
          <InputField label={L.logoSize} value={String(sponsorLogoSize)} onChange={(v) => update('sponsorLogoSize', Number(v) || 60)} />
        </>
      )}
    </div>
  );
}
