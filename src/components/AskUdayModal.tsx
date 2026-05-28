import { useEffect, useRef, useState } from "react";
import {
  Message,
  ChatHeader,
  ChatInput,
  ChatMessage,
  ChatEmptyState,
  LoadingIndicator,
} from "./chat";
import {
  loadChatHistory,
  saveChatHistory,
  clearChatHistory,
} from "@/functions/chatStorage";

// Re-export portfolioContext for backwards compatibility
export { portfolioContext } from "@/data/portfolioContext";

type AskUdayModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

const AskUdayModal: React.FC<AskUdayModalProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [typingMessageId, setTypingMessageId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Load messages from localStorage on mount
  useEffect(() => {
    const history = loadChatHistory();
    if (history.length > 0) {
      setMessages(history);
    }
    setIsInitialized(true);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && messages.length > 0) {
      saveChatHistory(messages);
    }
  }, [messages, isInitialized]);

  const handleClearHistory = () => {
    setMessages([]);
    clearChatHistory();
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Also scroll during typing
  useEffect(() => {
    if (typingMessageId) {
      const interval = setInterval(scrollToBottom, 100);
      return () => clearInterval(interval);
    }
  }, [typingMessageId]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input.trim();
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: currentInput,
          history: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      const messageId = (Date.now() + 1).toString();
      const assistantMessage: Message = {
        id: messageId,
        role: "assistant",
        content: data.response,
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setTypingMessageId(messageId);
    } catch (error: any) {
      console.error("Chat error:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: error?.message || "Sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTypingComplete = (messageId: string) => {
    setTypingMessageId(null);
    setMessages((prev) =>
      prev.map((m) => (m.id === messageId ? { ...m, isTyping: false } : m))
    );
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm"
      onClick={onClose}
      aria-hidden="true"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Ask me about Uday"
        className="bg-neutral-950 w-full sm:max-w-xl h-[85vh] sm:h-[600px] sm:max-h-[80vh] shadow-2xl relative flex flex-col overflow-hidden rounded-t-xl sm:rounded-xl border border-neutral-800 font-primary"
        onClick={(e) => e.stopPropagation()}
      >
        <ChatHeader
          hasMessages={messages.length > 0}
          onClearHistory={handleClearHistory}
          onClose={onClose}
        />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 && (
            <ChatEmptyState onSuggestionClick={setInput} />
          )}

          {messages.map((message) => (
            <ChatMessage
              key={message.id}
              message={message}
              isTyping={typingMessageId === message.id}
              onTypingComplete={() => handleTypingComplete(message.id)}
            />
          ))}

          {isLoading && <LoadingIndicator />}

          <div ref={messagesEndRef} />
        </div>

        <ChatInput
          ref={inputRef}
          value={input}
          onChange={setInput}
          onSend={handleSend}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default AskUdayModal;
