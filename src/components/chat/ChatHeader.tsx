import { XMarkIcon, TrashIcon } from "@heroicons/react/24/outline";

type ChatHeaderProps = {
  hasMessages: boolean;
  onClearHistory: () => void;
  onClose: () => void;
};

/**
 * Chat modal header with avatar, title, and action buttons
 */
export const ChatHeader: React.FC<ChatHeaderProps> = ({
  hasMessages,
  onClearHistory,
  onClose,
}) => {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
          <span className="text-white font-semibold text-sm font-display">UV</span>
        </div>
        <div>
          <h2 className="text-purple-100 font-semibold">Ask about Uday</h2>
          <p className="text-purple-400 text-xs">AI-powered portfolio assistant</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {hasMessages && (
          <button
            onClick={onClearHistory}
            className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors group"
            title="Clear chat history"
          >
            <TrashIcon className="w-4 h-4 text-purple-400 group-hover:text-red-400" />
          </button>
        )}
        <button
          onClick={onClose}
          className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-purple-500/20 transition-colors"
        >
          <XMarkIcon className="w-5 h-5 text-purple-300" />
        </button>
      </div>
    </div>
  );
};
