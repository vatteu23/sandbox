import { cn } from "@/functions/cn";
import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import { Major_Mono_Display, Doto } from "next/font/google";
import AskUdayModal from "./AskUdayModal";
import Footer from "./Footer";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const majorMonoDisplay = Major_Mono_Display({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-major-mono-display",
});

const doto = Doto({
  subsets: ["latin"],
  weight: ["800"],
  variable: "--font-doto",
});

const Layout: React.FC<ContainerProps> = ({ children, className }) => {
  const [showAskMeAbout, setShowAskMeAbout] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAskMeAbout(true);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={cn(
        majorMonoDisplay.variable,
        doto.variable,
        className,
        "relative",
      )}
    >
      <Header />
      {children}

      {/* Floating Ask Me Button */}
      {showAskMeAbout && (
        <button
          onClick={() => setIsModalOpen(true)}
          aria-label="Ask me about Uday"
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 flex items-center gap-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-2.5 text-xs font-mono uppercase tracking-widest hover:opacity-70 transition-opacity rounded-md"
        >
          Ask me...
        </button>
      )}

      <AskUdayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Layout;
