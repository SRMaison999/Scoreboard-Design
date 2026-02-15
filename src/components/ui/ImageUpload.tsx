import { useRef, useCallback, useState, type DragEvent } from 'react';
import { cn } from '@/lib/utils';
import { EDITOR_LABELS } from '@/constants/labels';

interface ImageUploadProps {
  readonly label: string;
  readonly value: string;
  readonly onUpload: (dataUrl: string) => void;
  readonly onRemove: () => void;
  readonly accept?: string;
  readonly className?: string;
}

export function ImageUpload({
  label,
  value,
  onUpload,
  onRemove,
  accept = 'image/png,image/jpeg,image/webp',
  className,
}: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          onUpload(reader.result);
        }
      };
      reader.readAsDataURL(file);
    },
    [onUpload],
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) handleFile(file);
      if (inputRef.current) inputRef.current.value = '';
    },
    [handleFile],
  );

  const handleDrop = useCallback(
    (e: DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      setDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile],
  );

  const handleDragOver = useCallback((e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setDragging(false);
  }, []);

  const hasImage = value.length > 0;

  return (
    <div className={cn('flex flex-col gap-1', className)}>
      <span className="text-[11px] text-gray-400 font-medium">{label}</span>

      {hasImage ? (
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-gray-600">
            <img
              src={value}
              alt={label}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="text-xs text-red-400 cursor-pointer hover:text-red-300"
          >
            {EDITOR_LABELS.mediaRemove}
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => inputRef.current?.click()}
          className={cn(
            'border border-dashed rounded-md p-2 text-center cursor-pointer transition-colors',
            dragging
              ? 'border-sky-400 bg-sky-950/30'
              : 'border-gray-600 hover:border-gray-500',
          )}
        >
          <span className="text-xs text-gray-400">
            {EDITOR_LABELS.mediaSelectFile}
          </span>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />
    </div>
  );
}
