import { cn } from "@/functions/cn";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import ThemeToggle from "./ThemeToggle";

const NAV_LINKS = [
  { href: "/work", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/photography", label: "Photography" },
];

const Header: React.FC = () => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Trigger stagger animation after overlay mounts
  useEffect(() => {
    if (isMenuOpen) {
      const t = setTimeout(() => setIsAnimating(true), 20);
      return () => clearTimeout(t);
    } else {
      setIsAnimating(false);
    }
  }, [isMenuOpen]);

  const openMenu = () => setIsMenuOpen(true);
  const closeMenu = () => {
    setIsAnimating(false);
    setTimeout(() => setIsMenuOpen(false), 400);
  };

  const isActive = (path: string) =>
    router.pathname === path || router.pathname.startsWith(path + "/");

  const navLinkClass = (path: string) =>
    cn(
      "text-sm font-medium transition-colors duration-200 pb-px",
      isActive(path)
        ? "text-neutral-900 dark:text-neutral-100 underline underline-offset-4 decoration-neutral-900 dark:decoration-neutral-100"
        : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100"
    );

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/95 dark:bg-neutral-950/95 backdrop-blur-sm border-b border-neutral-100 dark:border-neutral-900">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <nav className="flex items-center justify-between h-14">
            <Link
              href="/"
              className="font-display text-xl text-neutral-900 dark:text-neutral-100 tracking-tight hover:opacity-60 transition-opacity"
            >
              UV
            </Link>

            {/* Mobile: only Menu button */}
            <div className="sm:hidden">
              <button
                onClick={openMenu}
                aria-label="Open menu"
                aria-expanded={isMenuOpen}
                className="text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors uppercase tracking-widest px-1 py-1.5"
              >
                Menu
              </button>
            </div>

            {/* Desktop navigation */}
            <div className="hidden sm:flex items-center gap-7">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className={navLinkClass(link.href)}>
                  {link.label}
                </Link>
              ))}
              <a
                href="https://www.linkedin.com/in/vattiu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors"
              >
                Get in touch
              </a>
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Full-screen mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-white dark:bg-neutral-950 sm:hidden"
          style={{
            opacity: isAnimating ? 1 : 0,
            transition: "opacity 0.35s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 h-14 border-b border-neutral-100 dark:border-neutral-900 flex-shrink-0">
            <Link
              href="/"
              className="font-display text-xl text-neutral-900 dark:text-neutral-100 tracking-tight"
              onClick={closeMenu}
            >
              UV
            </Link>
            <button
              onClick={closeMenu}
              aria-label="Close menu"
              className="text-xs font-mono text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 transition-colors uppercase tracking-widest px-1 py-1.5"
            >
              Close
            </button>
          </div>

          {/* Nav links — large, staggered */}
          <div className="flex-1 flex flex-col justify-center px-8 gap-2">
            {NAV_LINKS.map((link, i) => (
              <div
                key={link.href}
                style={{
                  opacity: isAnimating ? 1 : 0,
                  transform: isAnimating ? "translateY(0)" : "translateY(24px)",
                  transition: `opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1) ${60 + i * 60}ms, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1) ${60 + i * 60}ms`,
                }}
              >
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className={cn(
                    "font-display tracking-tight leading-none block py-3 border-b border-neutral-100 dark:border-neutral-900 transition-opacity",
                    isActive(link.href)
                      ? "text-neutral-900 dark:text-neutral-100"
                      : "text-neutral-400 dark:text-neutral-600 hover:text-neutral-900 dark:hover:text-neutral-100"
                  )}
                  style={{ fontSize: "clamp(2.5rem, 10vw, 3.5rem)" }}
                >
                  {link.label}
                </Link>
              </div>
            ))}
          </div>

          {/* Bottom bar — contact + theme toggle */}
          <div
            className="px-8 py-8 flex items-center justify-between border-t border-neutral-100 dark:border-neutral-900 flex-shrink-0"
            style={{
              opacity: isAnimating ? 1 : 0,
              transform: isAnimating ? "translateY(0)" : "translateY(12px)",
              transition: "opacity 0.45s cubic-bezier(0.4, 0, 0.2, 1) 300ms, transform 0.45s cubic-bezier(0.4, 0, 0.2, 1) 300ms",
            }}
          >
            <a
              href="https://www.linkedin.com/in/vattiu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-neutral-900 dark:text-neutral-100 border-b border-neutral-300 dark:border-neutral-700 pb-0.5"
              onClick={closeMenu}
            >
              Get in touch →
            </a>
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
