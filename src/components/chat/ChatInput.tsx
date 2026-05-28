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
 * Chat input area — minimal editorial style
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
      <div className="border-t border-neutral-800 px-6 py-4">
        <div className="flex gap-3 items-end">
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask something about Uday..."
            rows={1}
            className="flex-1 bg-transparent border-0 focus:outline-none focus:ring-0 text-neutral-200 placeholder-neutral-600 resize-none text-sm leading-relaxed py-1"
            style={{ minHeight: "28px", maxHeight: "120px" }}
          />
          <button
            onClick={onSend}
            disabled={!canSend}
            aria-label="Send"
            className={cn(
              "flex-shrink-0 transition-colors duration-200",
              canSend
                ? "text-neutral-300 hover:text-neutral-100"
                : "text-neutral-700 cursor-not-allowed"
            )}
          >
            <PaperAirplaneIcon className="w-4 h-4" />
          </button>
        </div>
        <p className="text-neutral-700 text-xs mt-2 font-mono">
          Enter to send · Shift+Enter for new line
        </p>
      </div>
    );
  }
);

ChatInput.displayName = "ChatInput";
