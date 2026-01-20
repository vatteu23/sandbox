const SUGGESTIONS = [
  "What does Uday do?",
  "Tell me about his skills",
  "What projects has he worked on?",
];

type ChatEmptyStateProps = {
  onSuggestionClick: (suggestion: string) => void;
};

/**
 * Empty state shown when there are no messages
 */
export const ChatEmptyState: React.FC<ChatEmptyStateProps> = ({
  onSuggestionClick,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
        <span className="text-3xl">👋</span>
      </div>
      <h3 className="text-purple-200 font-semibold text-lg mb-2">
        Hi! Ask me anything about Uday
      </h3>
      <p className="text-purple-400 text-sm max-w-sm">
        I can tell you about his experience, skills, projects, and more.
      </p>
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        {SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestionClick(suggestion)}
            className="px-3 py-1.5 text-xs bg-purple-500/10 text-purple-300 rounded-full hover:bg-purple-500/20 transition-colors border border-purple-500/20"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};
