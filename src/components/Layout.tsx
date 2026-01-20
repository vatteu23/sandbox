import { cn } from "@/functions/cn";
import React, { ReactNode, useEffect, useState } from "react";
import Header from "./Header";
import { Major_Mono_Display, Doto } from "next/font/google";
import AskUdayModal from "./AskUdayModal";
import { SparklesIcon } from "@heroicons/react/24/outline";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  bgColor?: string;
  lightText?: boolean;
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
    <div className={cn(majorMonoDisplay.className, className, "relative")}>
      <Header />
      {children}

      {/* Floating Ask Me Button */}
      {showAskMeAbout && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-40 group"
        >
          <div className="flex items-center gap-2 bg-purple-600 group hover:bg-purple-500 text-white px-4 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out hover:scale-105">
            <SparklesIcon className="w-5 h-5 group-hover:animate-pulse" />
            <span className="font-medium font-primary text-sm">Ask me about Uday</span>
          </div>
        </button>
      )}

      {/* Chat Modal */}
      <AskUdayModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default Layout;
