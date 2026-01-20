/**
 * Loading indicator with bouncing dots
 */
export const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex justify-start animate-slide-in-up">
      <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2 flex-shrink-0">
        <span className="text-white font-semibold text-xs font-display">UV</span>
      </div>
      <div className="bg-purple-500/10 text-purple-100 border border-purple-500/20 rounded-2xl px-4 py-3">
        <div className="flex gap-1.5 items-center">
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
          <span className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></span>
          <span className="text-purple-400 text-xs ml-2">Thinking...</span>
        </div>
      </div>
    </div>
  );
};
