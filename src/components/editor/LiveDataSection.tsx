import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { EDITOR_LABELS } from '@/constants/labels';
import { useLiveDataStore } from '@/stores/liveDataStore';
import { useLiveData } from '@/hooks/useLiveData';

const STATUS_LABELS: Record<string, string> = {
  disconnected: EDITOR_LABELS.liveDataDisconnected,
  connecting: EDITOR_LABELS.liveDataConnecting,
  connected: EDITOR_LABELS.liveDataConnected,
  error: EDITOR_LABELS.liveDataError,
};

const STATUS_COLORS: Record<string, string> = {
  disconnected: 'text-gray-500',
  connecting: 'text-yellow-400',
  connected: 'text-green-400',
  error: 'text-red-400',
};

export function LiveDataSection() {
  const { status, lastUpdate, connect, disconnect } = useLiveData();
  const config = useLiveDataStore((s) => s.config);
  const updateConfig = useLiveDataStore((s) => s.updateConfig);

  const isConnected = status === 'connected' || status === 'connecting';

  return (
    <Section title={EDITOR_LABELS.sectionLiveData} defaultOpen={false}>
      <InputField
        label={EDITOR_LABELS.liveDataEndpoint}
        value={config.endpoint}
        onChange={(v) => updateConfig('endpoint', v)}
      />
      <InputField
        label={EDITOR_LABELS.liveDataMatchId}
        value={config.matchId}
        onChange={(v) => updateConfig('matchId', v)}
      />

      <div className="flex items-center gap-2">
        <span className="text-[11px] text-gray-400 font-medium">
          {EDITOR_LABELS.liveDataStatus}
        </span>
        <span className={`text-[11px] font-bold ${STATUS_COLORS[status] ?? 'text-gray-500'}`}>
          {STATUS_LABELS[status] ?? status}
        </span>
      </div>

      {lastUpdate && (
        <div className="text-[11px] text-gray-500">
          {EDITOR_LABELS.liveDataLastUpdate} : {lastUpdate}
        </div>
      )}

      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={config.autoUpdate}
          onChange={(e) => updateConfig('autoUpdate', e.target.checked)}
          className="accent-sky-400"
        />
        <span className="text-xs text-gray-300">
          {EDITOR_LABELS.liveDataAutoUpdate}
        </span>
      </label>

      <div className="flex gap-1.5">
        {!isConnected ? (
          <Button
            variant="primary"
            className="text-xs"
            onClick={connect}
            disabled={!config.endpoint}
          >
            {EDITOR_LABELS.liveDataConnect}
          </Button>
        ) : (
          <Button
            variant="danger"
            className="text-xs"
            onClick={disconnect}
          >
            {EDITOR_LABELS.liveDataDisconnect}
          </Button>
        )}
      </div>
    </Section>
  );
}
