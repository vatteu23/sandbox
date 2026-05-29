const SUGGESTIONS = [
  "What does Uday do?",
  "Tell me about his skills",
  "What projects has he worked on?",
];

type ChatEmptyStateProps = {
  onSuggestionClick: (suggestion: string) => void;
};

/**
 * Empty state — editorial, no emoji bubbles
 */
export const ChatEmptyState: React.FC<ChatEmptyStateProps> = ({
  onSuggestionClick,
}) => {
  return (
    <div className="flex flex-col justify-end h-full pb-2">
      <div className="mb-8">
        <span className="font-display text-5xl text-neutral-200 dark:text-neutral-800 leading-none tracking-tight">UV</span>
        <p className="text-xs font-mono text-neutral-400 dark:text-neutral-600 uppercase tracking-widest mt-3">
          Portfolio Assistant
        </p>
      </div>
      <p className="text-neutral-500 dark:text-neutral-400 text-sm mb-8 leading-relaxed max-w-xs">
        Ask me anything about Uday's experience, projects, or skills.
      </p>
      <div className="flex flex-col gap-2">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className="text-left text-sm text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-200 transition-colors underline-offset-4 hover:underline font-mono"
          >
            {suggestion} →
          </button>
        ))}
      </div>
    </div>
  );
};
