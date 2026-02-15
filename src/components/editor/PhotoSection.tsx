import { useEffect, useCallback, useRef, useState } from 'react';
import { Section } from '@/components/ui/Section';
import { Button } from '@/components/ui/Button';
import { Select } from '@/components/ui/Select';
import { InputField } from '@/components/ui/InputField';
import { usePhotoStore } from '@/stores/photoStore';
import { EDITOR_LABELS } from '@/constants/labels';
import { HOCKEY_NATIONS } from '@/constants/nations';
import { ACCEPTED_IMAGE_FORMATS } from '@/types/media';
import { Trash2 } from 'lucide-react';

const TEAM_OPTIONS = HOCKEY_NATIONS.map((n) => ({
  value: n.noc,
  label: n.noc,
}));

export function PhotoSection() {
  const { photos, loading, fetchPhotos, addPhoto, removePhoto } = usePhotoStore();
  const [team, setTeam] = useState('CAN');
  const [number, setNumber] = useState('');
  const [playerName, setPlayerName] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    void fetchPhotos();
  }, [fetchPhotos]);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (!file || !number) return;
      void addPhoto(team, number, playerName, file);
      setNumber('');
      setPlayerName('');
      if (inputRef.current) inputRef.current.value = '';
    },
    [team, number, playerName, addPhoto],
  );

  const handleAddClick = useCallback(() => {
    if (!number) return;
    inputRef.current?.click();
  }, [number]);

  const handleRemove = useCallback(
    (id: string) => {
      void removePhoto(id);
    },
    [removePhoto],
  );

  return (
    <Section title={EDITOR_LABELS.sectionPhotos}>
      <div className="flex flex-col gap-1.5">
        <div className="flex gap-1.5">
          <div className="w-20">
            <Select
              label={EDITOR_LABELS.photoTeam}
              options={TEAM_OPTIONS}
              value={team}
              onChange={setTeam}
            />
          </div>
          <div className="w-14">
            <InputField
              label={EDITOR_LABELS.photoNumber}
              value={number}
              onChange={setNumber}
            />
          </div>
          <div className="flex-1">
            <InputField
              label={EDITOR_LABELS.photoPlayerName}
              value={playerName}
              onChange={setPlayerName}
            />
          </div>
        </div>

        <Button variant="add" onClick={handleAddClick} disabled={!number}>
          {EDITOR_LABELS.photoAdd}
        </Button>

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_IMAGE_FORMATS.join(',')}
          onChange={handleFileChange}
          className="hidden"
        />
      </div>

      {loading && (
        <div className="text-xs text-gray-500">...</div>
      )}

      {!loading && photos.length === 0 && (
        <div className="text-xs text-gray-500">{EDITOR_LABELS.photoEmpty}</div>
      )}

      {photos.length > 0 && (
        <div className="flex flex-col gap-1">
          {photos.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 bg-gray-800 rounded-md px-2 py-1"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0 border border-gray-600">
                <img
                  src={p.dataUrl}
                  alt={p.playerName}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs text-gray-100 truncate">
                  {p.team} #{p.number} {p.playerName}
                </div>
              </div>
              <button
                type="button"
                onClick={() => handleRemove(p.id)}
                className="text-red-400 hover:text-red-300 cursor-pointer p-0.5"
              >
                <Trash2 size={12} className="flex-shrink-0" />
              </button>
            </div>
          ))}
        </div>
      )}
    </Section>
  );
}
