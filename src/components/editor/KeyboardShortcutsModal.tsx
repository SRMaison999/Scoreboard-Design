import { Modal, ModalHeader, ModalBody } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';
import { CUSTOM_FIELD_LABELS } from '@/constants/customFields';

interface KeyboardShortcutsModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
}

interface ShortcutEntry {
  readonly keys: readonly string[];
  readonly description: string;
}

interface ShortcutSection {
  readonly title: string;
  readonly shortcuts: readonly ShortcutEntry[];
}

const KEY_CLASS = cn(
  'inline-flex items-center px-1.5 py-0.5',
  'bg-gray-700 border border-gray-600 rounded',
  'text-[11px] font-mono text-gray-300',
);

const SECTIONS: readonly ShortcutSection[] = [
  {
    title: CUSTOM_FIELD_LABELS.shortcutsSectionGeneral,
    shortcuts: [
      { keys: ['Ctrl', 'Z'], description: CUSTOM_FIELD_LABELS.shortcutUndo },
      { keys: ['Ctrl', 'Y'], description: CUSTOM_FIELD_LABELS.shortcutRedo },
      { keys: ['Ctrl', 'S'], description: CUSTOM_FIELD_LABELS.shortcutSave },
    ],
  },
  {
    title: CUSTOM_FIELD_LABELS.shortcutsSectionSelection,
    shortcuts: [
      { keys: ['Ctrl', 'A'], description: CUSTOM_FIELD_LABELS.shortcutSelectAll },
      { keys: ['Escape'], description: CUSTOM_FIELD_LABELS.shortcutDeselect },
    ],
  },
  {
    title: CUSTOM_FIELD_LABELS.shortcutsSectionClipboard,
    shortcuts: [
      { keys: ['Ctrl', 'C'], description: CUSTOM_FIELD_LABELS.shortcutCopy },
      { keys: ['Ctrl', 'X'], description: CUSTOM_FIELD_LABELS.shortcutCut },
      { keys: ['Ctrl', 'V'], description: CUSTOM_FIELD_LABELS.shortcutPaste },
      { keys: ['Ctrl', 'D'], description: CUSTOM_FIELD_LABELS.shortcutDuplicate },
    ],
  },
  {
    title: CUSTOM_FIELD_LABELS.shortcutsSectionFields,
    shortcuts: [
      { keys: ['Suppr'], description: CUSTOM_FIELD_LABELS.shortcutDelete },
      { keys: ['\u2190', '\u2191', '\u2192', '\u2193'], description: CUSTOM_FIELD_LABELS.shortcutMove },
      { keys: ['Shift', '\u2190\u2191\u2192\u2193'], description: CUSTOM_FIELD_LABELS.shortcutMoveFast },
    ],
  },
  {
    title: CUSTOM_FIELD_LABELS.shortcutsSectionZoom,
    shortcuts: [
      { keys: ['Ctrl', '0'], description: CUSTOM_FIELD_LABELS.shortcutZoomFit },
      { keys: ['Ctrl', '1'], description: CUSTOM_FIELD_LABELS.shortcutZoom100 },
      { keys: ['Ctrl', '='], description: CUSTOM_FIELD_LABELS.shortcutZoomIn },
      { keys: ['Ctrl', '-'], description: CUSTOM_FIELD_LABELS.shortcutZoomOut },
    ],
  },
];

function ShortcutKey({ label }: { readonly label: string }) {
  return <kbd className={KEY_CLASS}>{label}</kbd>;
}

function ShortcutRow({ entry }: { readonly entry: ShortcutEntry }) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div className="flex items-center gap-1">
        {entry.keys.map((key, index) => (
          <span key={key} className="flex items-center gap-1">
            {index > 0 && (
              <span className="text-gray-500 text-xs">+</span>
            )}
            <ShortcutKey label={key} />
          </span>
        ))}
      </div>
      <span className="text-sm text-gray-400">{entry.description}</span>
    </div>
  );
}

function ShortcutSectionBlock({ section }: { readonly section: ShortcutSection }) {
  return (
    <div className="mb-4 last:mb-0">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">
        {section.title}
      </h3>
      <div className="space-y-0.5">
        {section.shortcuts.map((entry) => (
          <ShortcutRow key={entry.description} entry={entry} />
        ))}
      </div>
    </div>
  );
}

export function KeyboardShortcutsModal({ isOpen, onClose }: KeyboardShortcutsModalProps) {
  return (
    <Modal open={isOpen} onClose={onClose} size="sm">
      <div data-testid="keyboard-shortcuts-modal">
        <ModalHeader>{CUSTOM_FIELD_LABELS.shortcutsTitle}</ModalHeader>
        <ModalBody>
          {SECTIONS.map((section) => (
            <ShortcutSectionBlock key={section.title} section={section} />
          ))}
        </ModalBody>
      </div>
    </Modal>
  );
}
