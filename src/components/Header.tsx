import { cn } from "@/functions/cn";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";

interface ContainerProps {
  className?: string;
  bgColor?: string;
  lightText?: boolean;
}

const Header: React.FC<ContainerProps> = ({
  className,
  bgColor,
  lightText,
}) => {
  const router = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (path: string) => {
    return router.pathname === path;
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  return (
    <div className="flex justify-center sticky top-0 z-50">
      <div
        className={cn(
          "w-full sm:w-auto inline-flex items-center transition-all duration-300 rounded-full my-3 md:my-6",
          scrolled
            ? "bg-purple-50 border border-purple-200 translate-y-1 px-4 sm:px-6 shadow-2xl w-[90%] sm:w-auto"
            : "bg-transparent translate-y-0 px-4 sm:px-8",
          className
        )}
      >
        <nav className="flex flex-row justify-between items-center transition-all duration-300 py-3 gap-x-4 sm:gap-x-8 w-full sm:w-auto">
          <Button
            href="/"
            className={cn(
              "text-xl font-medium  px-3 py-1.5 rounded-full transition-all duration-300 ease-in-out",
              isActive("/")
                ? "text-purple-200 bg-purple-800"
                : "text-purple-600 hover:text-purple-800 hover:bg-purple-200"
            )}
            color="light"
          >
            UV
          </Button>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="sm:hidden p-2 rounded-full hover:bg-purple-200 transition-all duration-300"
          >
            {isMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-600" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-600" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden sm:flex gap-x-4 md:gap-x-6">
            <Button
              size="sm"
              variant="text"
              color="dark"
              href="/about"
              className={cn(
                "transition-all duration-300 ease-in-out px-4 py-1.5 rounded-full font-medium",
                isActive("/about")
                  ? "text-purple-200 bg-purple-800 hover:text-purple-200"
                  : "!text-purple-600  hover:bg-purple-200"
              )}
            >
              About
            </Button>
            <Button
              size="sm"
              variant="text"
              color="dark"
              href="/photography"
              className={cn(
                "transition-all duration-300 ease-in-out px-4 py-1.5 rounded-full font-medium ",
                isActive("/photography")
                  ? "text-purple-200 bg-purple-800 hover:text-purple-200"
                  : "!text-purple-600  hover:bg-purple-200"
              )}
            >
              Photography
            </Button>
            <Button
              size="sm"
              color="dark"
              href="https://www.linkedin.com/in/vattiu/"
              target="_blank"
              className="text-purple-900 hover:bg-neutral-900 hover:text-white transition-all duration-300 ease-in-out px-4 py-1.5 rounded-full font-medium"
            >
              Get in touch
            </Button>
          </div>

          {/* Mobile menu */}
          <div
            className={cn(
              "fixed inset-x-0 top-[calc(100%+0.5rem)] mx-4 sm:hidden",
              isMenuOpen
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4 pointer-events-none"
            )}
          >
            <div className="relative">
              {/* Backdrop blur overlay */}
              <div className="absolute inset-0 -z-10 bg-stone-50/95 rounded-3xl border border-stone-300 shadow-lg" />
              <div
                className="absolute inset-0 -z-10 backdrop-blur-xl rounded-3xl"
                aria-hidden="true"
              />

              {/* Content */}
              <div className="relative px-4 py-4">
                <div className="flex flex-col gap-y-2">
                  <Button
                    size="sm"
                    href="/about"
                    className={cn(
                      "transition-all duration-300 ease-in-out px-4 py-2 rounded-full font-medium w-full text-left",
                      isActive("/about")
                        ? "text-gray-900 bg-gray-100"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    About
                  </Button>
                  <Button
                    size="sm"
                    variant="text"
                    color="dark"
                    href="/photography"
                    className={cn(
                      "transition-all duration-300 ease-in-out px-4 py-2 rounded-full font-medium w-full text-left",
                      isActive("/photography")
                        ? "text-gray-900 bg-gray-100"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    Photography
                  </Button>
                  <Button
                    size="sm"
                    color="dark"
                    href="https://www.linkedin.com/in/vattiu/"
                    target="_blank"
                    className="text-gray-900 hover:bg-gray-900 hover:text-white transition-all duration-300 ease-in-out px-4 py-2 rounded-full font-medium w-full text-left"
                  >
                    Get in touch
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Header;
