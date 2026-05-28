import { cn } from "@/functions/cn";
import { Message } from "./types";
import { TypingText } from "./TypingText";
import { RenderedMessage } from "./RenderedMessage";

type ChatMessageProps = {
  message: Message;
  isTyping: boolean;
  onTypingComplete: () => void;
};

/**
 * Individual chat message component — editorial style, no bubbles for assistant
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isTyping,
  onTypingComplete,
}) => {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end animate-slide-in-up">
        <div className="max-w-[75%] bg-neutral-900 border border-neutral-800 rounded-lg px-4 py-2.5">
          <p className="text-sm text-neutral-200 whitespace-pre-wrap leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex items-start gap-3 animate-slide-in-up")}>
      <span className="font-display text-xs text-neutral-500 flex-shrink-0 mt-0.5 w-5 text-right">UV</span>
      <div className="border-l border-neutral-800 pl-4 flex-1">
        {isTyping ? (
          <TypingText content={message.content} onComplete={onTypingComplete} />
        ) : (
          <RenderedMessage content={message.content} />
        )}
      </div>
    </div>
  );
};
