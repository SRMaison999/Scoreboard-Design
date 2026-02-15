import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { EDITOR_LABELS } from '@/constants/labels';
import { useSyncStore } from '@/stores/syncStore';
import { useSync } from '@/hooks/useSync';
import type { SyncRole } from '@/types/sync';

const STATUS_LABELS: Record<string, string> = {
  disconnected: EDITOR_LABELS.syncDisconnected,
  connecting: EDITOR_LABELS.syncConnecting,
  connected: EDITOR_LABELS.syncConnected,
  error: EDITOR_LABELS.liveDataError,
};

const STATUS_COLORS: Record<string, string> = {
  disconnected: 'text-gray-500',
  connecting: 'text-yellow-400',
  connected: 'text-green-400',
  error: 'text-red-400',
};

const ROLE_OPTIONS: { value: SyncRole; label: string }[] = [
  { value: 'admin', label: EDITOR_LABELS.syncRoleAdmin },
  { value: 'operator', label: EDITOR_LABELS.syncRoleOperator },
  { value: 'viewer', label: EDITOR_LABELS.syncRoleViewer },
];

export function SyncSection() {
  const { status, peers, connect, disconnect } = useSync();
  const config = useSyncStore((s) => s.config);
  const updateConfig = useSyncStore((s) => s.updateConfig);

  const isConnected = status === 'connected' || status === 'connecting';

  return (
    <Section title={EDITOR_LABELS.sectionSync} defaultOpen={false}>
      <InputField
        label={EDITOR_LABELS.syncServerUrl}
        value={config.serverUrl}
        onChange={(v) => updateConfig('serverUrl', v)}
      />

      <div className="flex flex-col gap-0.5">
        <label className="text-[11px] text-gray-400 font-medium">
          {EDITOR_LABELS.syncRole}
        </label>
        <select
          value={config.role}
          onChange={(e) => updateConfig('role', e.target.value as SyncRole)}
          className="bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 text-gray-100 text-sm outline-none"
        >
          {ROLE_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[11px] text-gray-400 font-medium">
          {EDITOR_LABELS.syncStatus}
        </span>
        <span className={`text-[11px] font-bold ${STATUS_COLORS[status] ?? 'text-gray-500'}`}>
          {STATUS_LABELS[status] ?? status}
        </span>
      </div>

      {peers.length > 0 && (
        <div className="flex flex-col gap-1">
          <span className="text-[11px] text-gray-400 font-medium">
            {EDITOR_LABELS.syncPeers} ({String(peers.length)})
          </span>
          {peers.map((peer) => (
            <div key={peer.clientId} className="flex items-center gap-2 text-xs text-gray-300">
              <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0" />
              <span>{peer.name || peer.clientId}</span>
              <span className="text-gray-500 ml-auto">{peer.role}</span>
            </div>
          ))}
        </div>
      )}

      <div className="flex gap-1.5">
        {!isConnected ? (
          <Button
            variant="primary"
            className="text-xs"
            onClick={connect}
            disabled={!config.serverUrl}
          >
            {EDITOR_LABELS.syncConnect}
          </Button>
        ) : (
          <Button
            variant="danger"
            className="text-xs"
            onClick={disconnect}
          >
            {EDITOR_LABELS.syncDisconnect}
          </Button>
        )}
      </div>
    </Section>
  );
}
