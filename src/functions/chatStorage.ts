import { Message } from "@/components/chat/types";

const STORAGE_KEY = "uday-chat-history";

/**
 * Load chat messages from localStorage
 */
export const loadChatHistory = (): Message[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert timestamp strings back to Date objects
      return parsed.map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp),
        isTyping: false, // Reset typing state
      }));
    }
  } catch (error) {
    console.error("Failed to load chat history:", error);
  }
  return [];
};

/**
 * Save chat messages to localStorage
 */
export const saveChatHistory = (messages: Message[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
  } catch (error) {
    console.error("Failed to save chat history:", error);
  }
};

/**
 * Clear chat history from localStorage
 */
export const clearChatHistory = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};
