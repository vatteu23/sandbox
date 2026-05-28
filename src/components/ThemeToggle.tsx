import React, { useEffect, useState } from "react";
import { SunIcon, MoonIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";
import { cn } from "@/functions/cn";

export type Theme = "light" | "dark" | "system";

export function applyTheme(theme: Theme) {
  if (theme === "dark") {
    document.documentElement.classList.add("dark");
  } else if (theme === "light") {
    document.documentElement.classList.remove("dark");
  } else {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    if (prefersDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }
}

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<Theme>("system");

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("theme") as Theme | null;
    if (stored === "light" || stored === "dark" || stored === "system") {
      setTheme(stored);
    }
  }, []);

  const handleChange = (next: Theme) => {
    setTheme(next);
    localStorage.setItem("theme", next);
    applyTheme(next);
  };

  if (!mounted) return null;

  const options: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: "light", icon: <SunIcon className="w-3.5 h-3.5" />, label: "Light mode" },
    { value: "dark", icon: <MoonIcon className="w-3.5 h-3.5" />, label: "Dark mode" },
    { value: "system", icon: <ComputerDesktopIcon className="w-3.5 h-3.5" />, label: "System preference" },
  ];

  return (
    <div className={cn("flex items-center gap-0.5 border border-neutral-200 dark:border-neutral-800 rounded-full p-0.5 bg-neutral-50 dark:bg-neutral-900", className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => handleChange(opt.value)}
          aria-label={opt.label}
          className={cn(
            "p-1.5 rounded-full transition-all duration-200",
            theme === opt.value
              ? "bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900"
              : "text-neutral-400 dark:text-neutral-600 hover:text-neutral-700 dark:hover:text-neutral-300"
          )}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
};

export default ThemeToggle;
