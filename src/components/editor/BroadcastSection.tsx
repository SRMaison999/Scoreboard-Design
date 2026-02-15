import { Section } from '@/components/ui/Section';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { EDITOR_LABELS } from '@/constants/labels';
import { useBroadcastStore } from '@/stores/broadcastStore';
import { useBroadcast } from '@/hooks/useBroadcast';

export function BroadcastSection() {
  const { status, framesSent, lastFrameTime, start, stop, getSnapshot } = useBroadcast();
  const config = useBroadcastStore((s) => s.config);
  const connectedClients = useBroadcastStore((s) => s.connectedClients);
  const updateConfig = useBroadcastStore((s) => s.updateConfig);

  const isRunning = status === 'running';

  const handleDownloadSnapshot = () => {
    const json = getSnapshot();
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'scoreboard-snapshot.json';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Section title={EDITOR_LABELS.sectionBroadcast} defaultOpen={false}>
      {/* Statut */}
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-gray-400 font-medium">
          {EDITOR_LABELS.broadcastStatus}
        </span>
        <span className={`text-[11px] font-bold ${isRunning ? 'text-green-400' : 'text-gray-500'}`}>
          {isRunning ? EDITOR_LABELS.broadcastRunning : EDITOR_LABELS.broadcastStopped}
        </span>
      </div>

      {/* Ports */}
      <div className="flex gap-1.5">
        <div className="flex flex-col gap-0.5 flex-1">
          <label className="text-[11px] text-gray-400 font-medium">
            {EDITOR_LABELS.broadcastPort}
          </label>
          <input
            type="number"
            value={config.wsPort}
            onChange={(e) => updateConfig('wsPort', Number(e.target.value))}
            className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-gray-100 text-sm outline-none w-full"
            min={1024}
            max={65535}
          />
        </div>
        <div className="flex flex-col gap-0.5 flex-1">
          <label className="text-[11px] text-gray-400 font-medium">
            {EDITOR_LABELS.broadcastHttpPort}
          </label>
          <input
            type="number"
            value={config.httpPort}
            onChange={(e) => updateConfig('httpPort', Number(e.target.value))}
            className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-gray-100 text-sm outline-none w-full"
            min={1024}
            max={65535}
          />
        </div>
      </div>

      {/* Export fichier */}
      <label className="flex items-center gap-2 cursor-pointer">
        <input
          type="checkbox"
          checked={config.fileExportEnabled}
          onChange={(e) => updateConfig('fileExportEnabled', e.target.checked)}
          className="accent-sky-400"
        />
        <span className="text-xs text-gray-300">
          {EDITOR_LABELS.broadcastFileExport}
        </span>
      </label>

      {config.fileExportEnabled && (
        <>
          <InputField
            label={EDITOR_LABELS.broadcastExportPath}
            value={config.fileExportPath}
            onChange={(v) => updateConfig('fileExportPath', v)}
          />
          <div className="flex flex-col gap-0.5">
            <label className="text-[11px] text-gray-400 font-medium">
              {EDITOR_LABELS.broadcastExportInterval}
            </label>
            <input
              type="number"
              value={config.fileExportInterval}
              onChange={(e) => updateConfig('fileExportInterval', Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 rounded-md px-2 py-1 text-gray-100 text-sm outline-none w-full"
              min={100}
              max={10000}
              step={100}
            />
          </div>
        </>
      )}

      {/* Statistiques */}
      {isRunning && (
        <div className="flex flex-col gap-0.5 text-[11px] text-gray-400">
          <span>{EDITOR_LABELS.broadcastClients} : {String(connectedClients)}</span>
          <span>{EDITOR_LABELS.frameCount} : {String(framesSent)}</span>
          {lastFrameTime && (
            <span>{EDITOR_LABELS.liveDataLastUpdate} : {lastFrameTime}</span>
          )}
        </div>
      )}

      {/* Boutons */}
      <div className="flex gap-1.5">
        {!isRunning ? (
          <Button variant="primary" className="text-xs" onClick={start}>
            {EDITOR_LABELS.broadcastEnable}
          </Button>
        ) : (
          <Button variant="danger" className="text-xs" onClick={stop}>
            {EDITOR_LABELS.broadcastStopped}
          </Button>
        )}
        <Button variant="ghost" className="text-xs" onClick={handleDownloadSnapshot}>
          {EDITOR_LABELS.frameExportSnapshot}
        </Button>
      </div>
    </Section>
  );
}
