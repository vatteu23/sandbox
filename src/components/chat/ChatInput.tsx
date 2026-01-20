import { forwardRef } from "react";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { cn } from "@/functions/cn";

type ChatInputProps = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  isLoading: boolean;
};

/**
 * Chat input area with textarea and send button
 */
export const ChatInput = forwardRef<HTMLTextAreaElement, ChatInputProps>(
  ({ value, onChange, onSend, isLoading }, ref) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        onSend();
      }
    };

    const canSend = value.trim() && !isLoading;

    return (
      <div className="px-6 py-4 border-t border-purple-500/20">
        <div className="flex gap-3 items-end">
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something about Uday..."
            rows={1}
            className="flex-1 bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-3 text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none text-sm"
            style={{ minHeight: "44px", maxHeight: "120px" }}
          />
          <button
            onClick={onSend}
            disabled={!canSend}
            className={cn(
              "w-11 h-11 rounded-xl flex items-center justify-center transition-all",
              canSend
                ? "bg-purple-600 hover:bg-purple-500 text-white"
                : "bg-purple-500/20 text-purple-500 cursor-not-allowed"
            )}
          >
            <PaperAirplaneIcon className="w-5 h-5" />
          </button>
        </div>
        <p className="text-purple-500 text-xs mt-2 text-center">
          Press Enter to send, Shift + Enter for new line
        </p>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";
