import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

type ChatHeaderProps = {
  hasMessages: boolean;
  onClearHistory: () => void;
  onClose: () => void;
};

/**
 * Chat modal header
 */
export const ChatHeader: React.FC<ChatHeaderProps> = ({
  hasMessages,
  onClearHistory,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800">
      <div className="flex items-center gap-3">
        <span className="font-display text-lg text-neutral-100 tracking-tight">UV</span>
        <span className="text-neutral-600 text-xs font-mono">·</span>
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest">Ask</span>
      </div>
      <div className="flex items-center gap-3">
        {hasMessages && (
          <button
            onClick={onClearHistory}
            className="text-neutral-600 hover:text-neutral-300 transition-colors"
            title="Clear chat history"
            aria-label="Clear chat history"
          >
            <TrashIcon className="w-3.5 h-3.5" />
          </button>
        )}
        <button
          onClick={onClose}
          aria-label="Close"
          className="text-neutral-600 hover:text-neutral-100 transition-colors"
        >
          <XMarkIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
