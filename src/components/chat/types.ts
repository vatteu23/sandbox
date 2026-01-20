export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
};

export type ChatModalProps = {
  isOpen: boolean;
  onClose: () => void;
};
