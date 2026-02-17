import { ClockSection } from '@/components/editor/ClockSection';

export function ClockPanel() {
  return (
    <div className="h-full min-h-0 flex flex-col gap-4 p-4 overflow-y-auto">
      <ClockSection />
    </div>
  );
}
