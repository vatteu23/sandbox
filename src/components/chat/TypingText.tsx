import { useEffect, useState, useMemo } from "react";
import { parseMarkdown } from "@/functions/markdown";

type TypingTextProps = {
  content: string;
  onComplete: () => void;
  speed?: number;
};

/**
 * Typing effect component that displays text character by character
 */
export const TypingText: React.FC<TypingTextProps> = ({ 
  content, 
  onComplete, 
  speed = 15 
}) => {
  const [displayedContent, setDisplayedContent] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex < content.length) {
      const timer = setTimeout(() => {
        setDisplayedContent((prev) => prev + content[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [currentIndex, content, speed, onComplete]);

  const parsedContent = useMemo(
    () => parseMarkdown(displayedContent),
    [displayedContent]
  );

  return <div className="text-sm">{parsedContent}</div>;
};
