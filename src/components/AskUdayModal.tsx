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
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Detect desktop vs mobile for animation direction
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 640);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // Animate in/out
  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setIsVisible(true), 20);
      return () => clearTimeout(t);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

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

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 400);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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
      if (e.key === "Escape") handleClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: currentInput,
          history: messages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to get response");

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

  // Slide direction depends on breakpoint
  const hiddenTransform = isDesktop ? "translateX(100%)" : "translateY(100%)";

  return (
    <div
      className="fixed inset-0 z-50"
      style={{
        opacity: isVisible ? 1 : 0,
        transition: "opacity 0.3s ease",
        pointerEvents: isVisible ? "auto" : "none",
      }}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Ask me about Uday"
        className="
          absolute flex flex-col bg-white dark:bg-neutral-950 border-neutral-200 dark:border-neutral-800 font-primary
          bottom-0 left-0 right-0 h-[85dvh] rounded-t-xl border
          sm:top-0 sm:right-0 sm:bottom-0 sm:left-auto sm:w-[420px] sm:h-full sm:rounded-none sm:rounded-l-xl sm:border-l sm:border-y-0 sm:border-r-0
        "
        style={{
          transform: isVisible ? "translate(0, 0)" : hiddenTransform,
          transition: "transform 0.4s cubic-bezier(0.32, 0.72, 0, 1)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drag handle — mobile only */}
        <div className="flex justify-center pt-3 pb-1 sm:hidden flex-shrink-0">
          <div className="w-8 h-1 rounded-full bg-neutral-700" />
        </div>

        <ChatHeader
          hasMessages={messages.length > 0}
          onClearHistory={handleClearHistory}
          onClose={handleClose}
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
