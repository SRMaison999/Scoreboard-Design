import { useCallback, useRef, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Select } from '@/components/ui/Select';
import { EDITOR_LABELS } from '@/constants/labels';
import { VideoRecorder } from '@/utils/videoRecorder';
import { exportGif, downloadGif } from '@/utils/gifEncoder';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { useExportConfig } from '@/hooks/useExportConfig';
import type { VideoFormat, GifQuality } from '@/types/animation';

const VIDEO_FORMAT_OPTIONS = [
  { value: 'webm', label: 'WebM' },
  { value: 'mp4', label: 'MP4' },
];

const GIF_QUALITY_OPTIONS = [
  { value: 'low', label: EDITOR_LABELS.exportGifQualityLow },
  { value: 'medium', label: EDITOR_LABELS.exportGifQualityMedium },
  { value: 'high', label: EDITOR_LABELS.exportGifQualityHigh },
];

export function ExportSection() {
  const team1 = useScoreboardStore((s) => s.team1);
  const team2 = useScoreboardStore((s) => s.team2);
  const { config, updateField } = useExportConfig();

  const [recording, setRecording] = useState(false);
  const [generatingGif, setGeneratingGif] = useState(false);
  const [gifProgress, setGifProgress] = useState(0);
  const recorderRef = useRef(new VideoRecorder());

  const getCanvasElement = useCallback((): HTMLElement | null => {
    return document.querySelector('[data-testid="scoreboard-capture"]');
  }, []);

  const handleStartRecording = useCallback(async () => {
    const el = getCanvasElement();
    if (!el) return;
    setRecording(true);
    await recorderRef.current.start(el, config.videoFormat, config.videoFps);
  }, [config.videoFormat, config.videoFps, getCanvasElement]);

  const handleStopRecording = useCallback(async () => {
    const blob = await recorderRef.current.stop(config.videoFormat);
    setRecording(false);
    if (blob) {
      VideoRecorder.download(blob, config.videoFormat, team1, team2);
    }
  }, [config.videoFormat, team1, team2]);

  const handleGenerateGif = useCallback(async () => {
    const el = getCanvasElement();
    if (!el) return;
    setGeneratingGif(true);
    setGifProgress(0);
    try {
      const blob = await exportGif({
        element: el,
        duration: config.gifDuration,
        fps: config.gifFps,
        quality: config.gifQuality,
        onProgress: setGifProgress,
      });
      downloadGif(blob, team1, team2);
    } finally {
      setGeneratingGif(false);
      setGifProgress(0);
    }
  }, [config, team1, team2, getCanvasElement]);

  return (
    <Section title={EDITOR_LABELS.sectionExport} defaultOpen={false}>
      {/* Vidéo */}
      <div className="bg-gray-800 rounded-md p-1.5 flex flex-col gap-1.5">
        <Select
          label={EDITOR_LABELS.exportVideoFormat}
          options={VIDEO_FORMAT_OPTIONS}
          value={config.videoFormat}
          onChange={(v) => updateField('videoFormat', v as VideoFormat)}
        />
        <RangeField
          label={EDITOR_LABELS.exportVideoFps}
          value={config.videoFps}
          min={10}
          max={60}
          step={5}
          onChange={(v) => updateField('videoFps', v)}
        />
        <button
          type="button"
          onClick={recording ? handleStopRecording : handleStartRecording}
          className={`w-full py-1.5 rounded-md text-sm font-medium transition-colors ${
            recording
              ? 'bg-red-900 text-gray-100 hover:bg-red-800'
              : 'bg-green-900 text-gray-100 hover:bg-green-800'
          }`}
        >
          {recording ? EDITOR_LABELS.exportStopRecording : EDITOR_LABELS.exportStartRecording}
        </button>
        {recording && (
          <div className="text-[11px] text-red-300 text-center animate-pulse">
            {EDITOR_LABELS.exportRecording}
          </div>
        )}
      </div>

      {/* GIF */}
      <div className="bg-gray-800 rounded-md p-1.5 flex flex-col gap-1.5">
        <RangeField
          label={EDITOR_LABELS.exportGifDuration}
          value={config.gifDuration}
          min={1}
          max={15}
          step={1}
          onChange={(v) => updateField('gifDuration', v)}
        />
        <RangeField
          label={EDITOR_LABELS.exportGifFps}
          value={config.gifFps}
          min={5}
          max={30}
          step={5}
          onChange={(v) => updateField('gifFps', v)}
        />
        <Select
          label={EDITOR_LABELS.exportGifQuality}
          options={GIF_QUALITY_OPTIONS}
          value={config.gifQuality}
          onChange={(v) => updateField('gifQuality', v as GifQuality)}
        />
        <button
          type="button"
          onClick={handleGenerateGif}
          disabled={generatingGif}
          className="w-full py-1.5 rounded-md text-sm font-medium bg-blue-950 border border-blue-600 text-blue-300 hover:bg-blue-900 transition-colors disabled:opacity-50"
        >
          {generatingGif ? EDITOR_LABELS.exportGenerating : EDITOR_LABELS.exportGenerateGif}
        </button>
        {generatingGif && (
          <div className="w-full bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-sky-300 h-1.5 rounded-full transition-all"
              style={{ width: `${Math.round(gifProgress * 100)}%` }}
            />
          </div>
        )}
      </div>

    </Section>
  );
}

interface RangeFieldProps {
  readonly label: string;
  readonly value: number;
  readonly min: number;
  readonly max: number;
  readonly step: number;
  readonly onChange: (value: number) => void;
}

function RangeField({ label, value, min, max, step, onChange }: RangeFieldProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <div className="flex items-center justify-between">
        <label className="text-[11px] text-gray-400 font-medium">{label}</label>
        <span className="text-[11px] text-gray-300 tabular-nums">{value}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full accent-sky-300"
      />
    </div>
  );
}
