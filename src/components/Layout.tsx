import { cn } from "@/functions/cn";
import React, { ReactNode } from "react";
import Header from "./Header";
import { Major_Mono_Display, Doto } from "next/font/google";

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
  return (
    <div className={cn(majorMonoDisplay.className, className)}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
