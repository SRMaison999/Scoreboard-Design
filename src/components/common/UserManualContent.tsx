import { useMemo } from 'react';
import { MANUAL_CHAPTERS } from '@/data/manual/chapters';
import { renderMarkdown } from '@/utils/markdownRenderer';

interface UserManualContentProps {
  readonly chapterIndex: number;
}

export function UserManualContent({ chapterIndex }: UserManualContentProps) {
  const chapter = MANUAL_CHAPTERS[chapterIndex] ?? MANUAL_CHAPTERS[0];

  const content = chapter?.content ?? '';
  const title = chapter?.title ?? '';

  const html = useMemo(
    () => renderMarkdown(content),
    [content],
  );

  return (
    <div className="flex-1 overflow-y-auto px-6 py-4">
      <h1
        className="text-xl font-bold text-gray-100 mb-4 pb-2 border-b border-gray-700"
        data-testid="manual-chapter-title"
      >
        {title}
      </h1>
      <div
        data-testid="manual-chapter-content"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  );
}
