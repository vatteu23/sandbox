import { cn } from "@/functions/cn";
import { useEffect, useRef, useState, useMemo } from "react";
import { XMarkIcon, PaperAirplaneIcon, TrashIcon } from "@heroicons/react/24/outline";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  isTyping?: boolean;
};

// Simple markdown parser for bold, lists, links, and line breaks
const parseMarkdown = (text: string) => {
  const lines = text.split("\n");
  const elements: React.ReactNode[] = [];

  lines.forEach((line, lineIndex) => {
    // Check if it's a list item
    const listMatch = line.match(/^[\*\-]\s+(.+)$/);
    if (listMatch) {
      const content = listMatch[1];
      elements.push(
        <li key={lineIndex} className="ml-4 mb-1 list-disc">
          {parseInlineElements(content)}
        </li>
      );
    } else if (line.trim() === "") {
      elements.push(<br key={lineIndex} />);
    } else {
      elements.push(
        <p key={lineIndex} className="mb-2 last:mb-0">
          {parseInlineElements(line)}
        </p>
      );
    }
  });

  return elements;
};

// Parse inline elements: bold (**text**), links [text](url)
const parseInlineElements = (text: string): React.ReactNode => {
  // First parse links, then bold within each part
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link
    if (match.index > lastIndex) {
      parts.push(...parseBoldText(text.slice(lastIndex, match.index), parts.length));
    }
    // Add the link
    const [, linkText, url] = match;
    const isExternal = url.startsWith("http");
    parts.push(
      <a
        key={`link-${parts.length}`}
        href={url}
        target={isExternal ? "_blank" : "_self"}
        rel={isExternal ? "noopener noreferrer" : undefined}
        className="text-purple-300 hover:text-purple-200 underline underline-offset-2 transition-colors"
      >
        {linkText}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    parts.push(...parseBoldText(text.slice(lastIndex), parts.length));
  }

  return parts.length > 0 ? parts : parseBoldText(text, 0);
};

// Parse bold text (**text** or __text__)
const parseBoldText = (text: string, keyOffset: number): React.ReactNode[] => {
  const parts = text.split(/(\*\*[^*]+\*\*|__[^_]+__)/g);
  return parts.map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={`bold-${keyOffset}-${i}`} className="font-semibold text-purple-200">
          {part.slice(2, -2)}
        </strong>
      );
    }
    if (part.startsWith("__") && part.endsWith("__")) {
      return (
        <strong key={`bold-${keyOffset}-${i}`} className="font-semibold text-purple-200">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={`text-${keyOffset}-${i}`}>{part}</span>;
  });
};

// Typing effect component
const TypingText: React.FC<{
  content: string;
  onComplete: () => void;
  speed?: number;
}> = ({ content, onComplete, speed = 15 }) => {
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

// Static rendered message
const RenderedMessage: React.FC<{ content: string }> = ({ content }) => {
  const parsedContent = useMemo(() => parseMarkdown(content), [content]);
  return <div className="text-sm">{parsedContent}</div>;
};

type AskUdayModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

// Portfolio context data for the AI
export const portfolioContext = {
  personalInfo: {
    name: "Uday Vatti",
    title: "Sr. Web Developer and Designer",
    company: "Labelbox",
    location: "San Francisco, CA",
    email: "vuday23@gmail.com",
    linkedin: "https://www.linkedin.com/in/vattiu/",
    website: "https://udayvatti.com",
    yearsOfExperience: "9+",
  },
  websitePages: {
    home: { url: "/", description: "Home page with overview of Uday's work" },
    about: { url: "/about", description: "Detailed about page with bio, skills, and interests" },
    photography: { url: "/photography", description: "Uday's photography portfolio" },
    labelbox: { url: "/work/labelbox", description: "Details about Uday's work at Labelbox" },
    tcp: { url: "/work/tcp", description: "Details about Uday's work at Triple Crown Products" },
    cgs: { url: "/work/cgs", description: "Details about Uday's work at Center for Governmental Studies" },
    resume: { url: "/resume.pdf", description: "Uday's resume/CV in PDF format" },
  },
  summary:
    "Senior Web Developer & Designer with 9+ years of experience specializing in React, Next.js, and TypeScript. Currently leading web development across marketing websites and evaluation studio at Labelbox.",
  skills: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "UI/UX Design",
    "Design Systems",
    "GSAP",
    "Framer Motion",
    "Sanity CMS",
    "GraphQL",
    "Figma",
    "Google Tag Manager",
    "SEO Optimization",
    "D3.js",
    "C#",
    ".NET",
    "SQL",
  ],
  whatIDo: [
    "UI/UX design in Figma and design systems",
    "Component architecture and development",
    "Performance optimization and monitoring",
  ],
  experience: [
    {
      company: "Labelbox",
      role: "Sr. Web Developer and Designer",
      period: "Nov, 2021 - Present",
      description:
        "Led full-stack development across multiple products, including the main marketing website and customer platforms for AI data labeling used by Fortune 500 companies.",
      achievements: [
        "Built Labelbox Evaluation Studio product with 2-person team, creating model performance visualization tools",
        "Migrated entire labelbox.com from Material UI to Tailwind CSS, improving performance and maintainability",
        "Built complex CMS structures enabling marketing team to autonomously update content with zero developer dependency",
        "Created high-performance pages using Next.js App Router with hybrid static/dynamic rendering",
        "Implemented advanced animations using GSAP and Framer Motion in client components",
        "Developed alignerr.com from ground up using custom Sanity CMS, delivering full-stack solution",
        "Implemented multi-modal data visualization supporting video, audio, text, and image formats",
        "Maintained GTM implementation and ensured SEO optimization across all projects",
      ],
      technologies: [
        "React",
        "TypeScript",
        "Next.js",
        "Tailwind CSS",
        "Sanity CMS",
        "GSAP",
        "Framer Motion",
        "Google Tag Manager",
        "GraphQL",
        "Figma",
      ],
    },
    {
      company: "Triple Crown Products",
      role: "Full Stack Developer",
      period: "July, 2017 - Oct, 2021",
      description:
        "Led full-stack development of e-commerce platforms and internal systems, migrating parts of the website to React with Tailwind CSS. Focused on performance optimization, SEO enhancement, and creating maintainable solutions for marketing team.",
      achievements: [
        "Developed custom webstores and e-commerce UIs with a reusable framework for different customers",
        "Created complex stored procedures for efficient data management and reporting",
        "Built a custom CMS enabling scheduled content releases and future feature deployments",
        "Improved website performance by 40% through optimization and caching strategies",
        "Enhanced SEO rankings resulting in 60% increase in organic traffic",
        "Created sales dashboard with real-time analytics and reporting features",
        "Implemented .NET Core APIs to support modern web architecture",
      ],
      technologies: [
        "C#",
        ".NET",
        ".NET Core",
        "SQL",
        "React",
        "Tailwind CSS",
        "Stored Procedures",
        "CMS Development",
      ],
    },
    {
      company: "Center for Governmental Studies (NIU)",
      role: "Web Developer",
      period: "June, 2016 - May, 2017",
      description:
        "Core developer for interactive data visualization tools, collaborating with researchers and policymakers.",
      achievements: [
        "Implemented complex data analysis tools using D3.js and C# MVC architecture",
        "Built a responsive platform that visualized student graduation rates and other educational metrics",
        "Created interactive dashboards for data exploration and analysis",
        "Developed comprehensive filtering system for multi-dimensional data analysis",
      ],
      technologies: ["D3.js", "C#", "SQL", "MVC", "JavaScript", "Bootstrap"],
    },
  ],
  freelanceProjects: [
    {
      name: "Them Design Studios",
      role: "Full Stack Developer",
      period: "June, 2018",
      description:
        "Built modern web presence for creative agency specializing in brand identity and digital experiences for startups.",
      achievements: [
        "Delivered responsive portfolio site increasing inquiries by 200%",
        "Implemented custom CMS for easy content management",
        "Optimized performance achieving 95+ Lighthouse scores",
      ],
    },
    {
      name: "Earthbound Adventures",
      role: "Full Stack Developer",
      period: "May, 2017",
      description:
        "Developed booking platform and marketing website for adventure tourism company offering hiking expeditions in Peru.",
      achievements: [
        "Built booking system increasing conversions by 85%",
        "Created interactive itinerary builder for custom trips",
        "Implemented multi-currency support for international customers",
      ],
    },
  ],
  interests: [
    "Cars - how they're built, why some feel special, what makes people obsess over them",
    "Photography - capturing small moments, car meets, city walks, chasing good light",
  ],
  philosophy:
    "I believe the best digital experiences are built with a blend of curiosity and craft.",
};

const STORAGE_KEY = "uday-chat-history";

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
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Convert timestamp strings back to Date objects
        const messagesWithDates = parsed.map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp),
          isTyping: false, // Reset typing state
        }));
        setMessages(messagesWithDates);
      }
    } catch (error) {
      console.error("Failed to load chat history:", error);
    }
    setIsInitialized(true);
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && messages.length > 0) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
      } catch (error) {
        console.error("Failed to save chat history:", error);
      }
    }
  }, [messages, isInitialized]);

  const clearHistory = () => {
    setMessages([]);
    localStorage.removeItem(STORAGE_KEY);
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

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="bg-neutral-900 w-full sm:max-w-2xl h-[85vh] sm:h-[600px] sm:max-h-[80vh] shadow-2xl relative flex flex-col overflow-hidden rounded-t-2xl sm:rounded-2xl border border-purple-500/20 font-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-purple-500/20">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
              <span className="text-white font-semibold text-sm font-display">UV</span>
            </div>
            <div>
              <h2 className="text-purple-100 font-semibold">Ask about Uday</h2>
              <p className="text-purple-400 text-xs">
                AI-powered portfolio assistant
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {messages.length > 0 && (
              <button
                onClick={clearHistory}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-500/20 transition-colors group"
                title="Clear chat history"
              >
                <TrashIcon className="w-4 h-4 text-purple-400 group-hover:text-red-400" />
              </button>
            )}
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-purple-500/20 transition-colors"
            >
              <XMarkIcon className="w-5 h-5 text-purple-300" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <div className="w-16 h-16 rounded-full bg-purple-600/20 flex items-center justify-center mb-4">
                <span className="text-3xl">👋</span>
              </div>
              <h3 className="text-purple-200 font-semibold text-lg mb-2">
                Hi! Ask me anything about Uday
              </h3>
              <p className="text-purple-400 text-sm max-w-sm">
                I can tell you about his experience, skills, projects, and more.
              </p>
              <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {[
                  "What does Uday do?",
                  "Tell me about his skills",
                  "What projects has he worked on?",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setInput(suggestion)}
                    className="px-3 py-1.5 text-xs bg-purple-500/10 text-purple-300 rounded-full hover:bg-purple-500/20 transition-colors border border-purple-500/20"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex animate-slide-in-up",
                message.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {message.role === "assistant" && (
                <div className="w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center mr-2 flex-shrink-0 mt-1">
                  <span className="text-white font-semibold text-xs font-display">UV</span>
                </div>
              )}
              <div
                className={cn(
                  "max-w-[80%] rounded-2xl px-4 py-3",
                  message.role === "user"
                    ? "bg-purple-600 text-white"
                    : "bg-purple-500/10 text-purple-100 border border-purple-500/20"
                )}
              >
                {message.role === "user" ? (
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                ) : typingMessageId === message.id ? (
                  <TypingText
                    content={message.content}
                    onComplete={() => {
                      setTypingMessageId(null);
                      setMessages((prev) =>
                        prev.map((m) =>
                          m.id === message.id ? { ...m, isTyping: false } : m
                        )
                      );
                    }}
                  />
                ) : (
                  <RenderedMessage content={message.content} />
                )}
              </div>
            </div>
          ))}

          {isLoading && (
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
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="px-6 py-4 border-t border-purple-500/20">
          <div className="flex gap-3 items-end">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask something about Uday..."
              rows={1}
              className="flex-1 bg-purple-500/10 border border-purple-500/20 rounded-xl px-4 py-3 text-purple-100 placeholder-purple-400 focus:outline-none focus:ring-2 focus:ring-purple-500/50 resize-none text-sm"
              style={{ minHeight: "44px", maxHeight: "120px" }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              className={cn(
                "w-11 h-11 rounded-xl flex items-center justify-center transition-all",
                input.trim() && !isLoading
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
      </div>
    </div>
  );
};

export default AskUdayModal;
