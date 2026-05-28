/**
 * Loading indicator — editorial style
 */
export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-start gap-3 animate-slide-in-up">
      <span className="font-display text-xs text-neutral-500 flex-shrink-0 mt-0.5 w-5 text-right">UV</span>
      <div className="border-l border-neutral-800 pl-4">
        <div className="flex gap-1.5 items-center py-1">
          <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-1.5 h-1.5 bg-neutral-600 rounded-full animate-bounce"></span>
        </div>
      </div>
    </div>
  );
};
