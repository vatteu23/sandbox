import React from "react";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-white dark:bg-neutral-950 border-t border-neutral-100 dark:border-neutral-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-24">
        <p className="text-[clamp(2rem,5vw,4rem)] font-display leading-tight tracking-tight text-neutral-900 dark:text-neutral-100 mb-10 max-w-xl">
          Let's work together.
        </p>

        <a
          href="mailto:vuday23@gmail.com"
          className="inline-flex items-center gap-2 text-lg font-mono text-neutral-900 dark:text-neutral-100 border-b border-neutral-300 dark:border-neutral-700 pb-0.5 hover:border-neutral-900 dark:hover:border-neutral-100 transition-colors duration-200 mb-16"
        >
          vuday23@gmail.com
          <span className="text-neutral-400 dark:text-neutral-500" aria-hidden="true">↗</span>
        </a>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div className="flex items-center gap-6">
            <Link
              href="/work"
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Work
            </Link>
            <Link
              href="/about"
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              About
            </Link>
            <Link
              href="/photography"
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Photography
            </Link>
            <Link
              href="/tools"
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Tools
            </Link>
            <a
              href="/resume.pdf"
              target="_blank"
              className="text-sm text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
            >
              Resume
            </a>
          </div>
          <div className="flex items-center gap-6">
            <ThemeToggle />
            <p className="text-xs font-mono text-neutral-400 dark:text-neutral-600">
              © {year} Uday Vatti
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
