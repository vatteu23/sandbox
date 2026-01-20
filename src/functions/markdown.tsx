import React from "react";

/**
 * Parse bold text (**text** or __text__)
 */
export const parseBoldText = (text: string, keyOffset: number): React.ReactNode[] => {
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

/**
 * Parse inline elements: bold (**text**), links [text](url)
 */
export const parseInlineElements = (text: string): React.ReactNode => {
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

/**
 * Simple markdown parser for bold, lists, links, and line breaks
 */
export const parseMarkdown = (text: string): React.ReactNode[] => {
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
