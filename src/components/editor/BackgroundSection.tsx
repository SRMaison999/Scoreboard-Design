import { useCallback } from 'react';
import { Section } from '@/components/ui/Section';
import { ImageUpload } from '@/components/ui/ImageUpload';
import { useScoreboardStore } from '@/stores/scoreboardStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { compressBackgroundImage } from '@/utils/image';
import {
  ACCEPTED_IMAGE_FORMATS,
  ACCEPTED_VIDEO_FORMATS,
} from '@/types/media';
import type { BackgroundMediaMode } from '@/types/media';

const MODE_OPTIONS: { value: BackgroundMediaMode; label: string }[] = [
  { value: 'none', label: EDITOR_LABELS.bgMediaNone },
  { value: 'image', label: EDITOR_LABELS.bgMediaImage },
  { value: 'video', label: EDITOR_LABELS.bgMediaVideo },
];

export function BackgroundSection() {
  const mode = useScoreboardStore((s) => s.backgroundMediaMode);
  const url = useScoreboardStore((s) => s.backgroundMediaUrl);
  const update = useScoreboardStore((s) => s.update);

  const handleModeChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const newMode = e.target.value as BackgroundMediaMode;
      update('backgroundMediaMode', newMode);
      if (newMode === 'none') {
        update('backgroundMediaUrl', '');
      }
    },
    [update],
  );

  const handleImageUpload = useCallback(
    (dataUrl: string) => {
      void compressBackgroundImage(dataUrl).then((compressed) => {
        update('backgroundMediaUrl', compressed);
      });
    },
    [update],
  );

  const handleVideoUpload = useCallback(
    (dataUrl: string) => {
      update('backgroundMediaUrl', dataUrl);
    },
    [update],
  );

  const handleRemove = useCallback(() => {
    update('backgroundMediaUrl', '');
  }, [update]);

  return (
    <Section title={EDITOR_LABELS.sectionBackground}>
      <div className="bg-gray-800 rounded-md p-1.5">
        <div className="flex flex-col gap-0.5">
          <label className="text-[11px] text-gray-400 font-medium">
            {EDITOR_LABELS.sectionBackground}
          </label>
          <select
            value={mode}
            onChange={handleModeChange}
            className="bg-gray-800 border border-gray-700 rounded-md px-2.5 py-1.5 text-gray-100 text-sm outline-none w-full"
          >
            {MODE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {mode === 'image' && (
        <ImageUpload
          label={EDITOR_LABELS.bgMediaSelectImage}
          value={url}
          onUpload={handleImageUpload}
          onRemove={handleRemove}
          accept={ACCEPTED_IMAGE_FORMATS.join(',')}
        />
      )}

      {mode === 'video' && (
        <ImageUpload
          label={EDITOR_LABELS.bgMediaSelectVideo}
          value={url}
          onUpload={handleVideoUpload}
          onRemove={handleRemove}
          accept={ACCEPTED_VIDEO_FORMATS.join(',')}
        />
      )}
    </Section>
  );
}
