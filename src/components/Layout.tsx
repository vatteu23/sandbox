import { cn } from "@/functions/cn";
import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import { Major_Mono_Display, Doto } from "next/font/google";
import AskUdayModal from "./AskUdayModal";
import Footer from "./Footer";
import { ArrowTopRightOnSquareIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  showAssistant?: boolean;
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

const Layout: React.FC<ContainerProps> = ({
  children,
  className,
  showAssistant = true,
}) => {
  const [showAskMeAbout, setShowAskMeAbout] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAskMeAbout(true);
    }, 1000);

    const greetingTimer = setTimeout(() => {
      if (typeof window !== "undefined") {
        const dismissed = sessionStorage.getItem("dismissed-greeting") === "true";
        if (!dismissed) {
          setShowGreeting(true);
        }
      }
    }, 3000);

    return () => {
      clearTimeout(timer);
      clearTimeout(greetingTimer);
    };
  }, []);

  // Ensure that opening the modal permanently dismisses the greeting bubble
  useEffect(() => {
    if (isModalOpen) {
      setShowGreeting(false);
      if (typeof window !== "undefined") {
        sessionStorage.setItem("dismissed-greeting", "true");
      }
    }
  }, [isModalOpen]);

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
      <AnimatePresence>
        {showAssistant && showAskMeAbout && showGreeting && !isModalOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed bottom-[74px] right-6 md:bottom-[94px] md:right-10 z-40 w-72 p-4 bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_30px_rgba(0,0,0,0.35)] cursor-pointer select-none"
            onClick={() => {
              setIsModalOpen(true);
              setShowGreeting(false);
              sessionStorage.setItem("dismissed-greeting", "true");
            }}
          >
            {/* Little triangle pointing down */}
            <div className="absolute right-6 md:right-10 bottom-[-5px] w-2.5 h-2.5 rotate-45 bg-white dark:bg-neutral-900 border-r border-b border-neutral-200 dark:border-neutral-800" />

            {/* Close button */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Avoid opening modal
                setShowGreeting(false);
                sessionStorage.setItem("dismissed-greeting", "true");
              }}
              className="absolute top-2.5 right-2.5 text-neutral-400 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              aria-label="Dismiss greeting"
            >
              <XMarkIcon className="w-3.5 h-3.5" />
            </button>

            {/* Bubble content */}
            <div className="flex gap-2.5 items-start pr-4">
              <span className="relative flex h-2 w-2 mt-1.5 flex-shrink-0">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-neutral-400 dark:bg-neutral-500 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neutral-500 dark:bg-neutral-300" />
              </span>
              <div className="space-y-1">
                <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-neutral-400 dark:text-neutral-500 font-semibold leading-none">
                  Uday's AI Twin
                </p>
                <p className="text-xs text-neutral-600 dark:text-neutral-300 leading-normal font-sans">
                  Hi there! Ask me anything about Uday's projects, technical skills, or design philosophy.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {showAssistant && showAskMeAbout && (
        <button
          onClick={() => {
            setIsModalOpen(true);
            setShowGreeting(false);
            sessionStorage.setItem("dismissed-greeting", "true");
          }}
          aria-label="Ask me about Uday"
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 flex items-center gap-2.5 bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 px-4 py-2.5 text-xs font-mono uppercase tracking-widest hover:opacity-70 transition-opacity rounded-md"
        >
          Ask me...
        </button>
      )}

      {showAssistant && (
        <AskUdayModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Layout;
