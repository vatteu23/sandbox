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
 * Individual chat message bubble component
 */
export const ChatMessage: React.FC<ChatMessageProps> = ({
  message,
  isTyping,
  onTypingComplete,
}) => {
  const isUser = message.role === "user";

  return (
    <div
      className={cn(
        "flex animate-slide-in-up",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      {!isUser && (
        <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
          <span className="text-white font-semibold text-xs font-display">UV</span>
        </div>
      )}
      <div
        className={cn(
          "max-w-[80%] rounded-2xl px-4 py-3",
          isUser
            ? "bg-purple-600 text-white"
            : "bg-purple-500/10 text-purple-100 border border-purple-500/20"
        )}
      >
        {isUser ? (
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        ) : isTyping ? (
          <TypingText content={message.content} onComplete={onTypingComplete} />
        ) : (
          <RenderedMessage content={message.content} />
        )}
      </div>
    </div>
  );
};
