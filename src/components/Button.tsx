import { cn } from "@/functions/cn";
import Link from "next/link";
import React, { ReactNode } from "react";

interface ButtonProps {
  children: ReactNode;
  className?: string;
  href?: string;
  onClick?: () => void;
  size?: "sm" | "md" | "lg";
  color?: "light" | "dark";
  variant?: "contained" | "outlined" | "text";
  target?: "_blank" | "_self";
}

const defaultProps: Partial<ButtonProps> = {
  className: "",
  color: "dark",
  size: "md",
  variant: "contained",
};

const Button: React.FC<ButtonProps> = ({
  children,
  className,
  href,
  onClick,
  size,
  color,
  variant,
  target,
}) => {
  const handleOnClick = () => {
    if (onClick) {
      onClick();
    }
  };
  let defaultClasses = "my-auto";

  switch (size) {
    case "sm":
      defaultClasses += " px-3 py-2 text-sm";
      break;
    case "md":
      defaultClasses += " px-4 py-3 text-base";
      break;
    case "lg":
      defaultClasses += " px-5 py-4 text-lg";
      break;
    default:
      break;
  }

  if (variant === "contained") {
    switch (color) {
      case "light":
        defaultClasses += " bg-zinc-100 text-black hover:bg-zinc-100/80";
        break;
      case "dark":
        defaultClasses += " bg-black text-white hover:bg-black/80";
        break;
      default:
        break;
    }
  } else if (variant === "outlined") {
    switch (color) {
      case "light":
        defaultClasses +=
          " border border-zinc-100 text-white hover:border-zinc-100/80";
        break;
      case "dark":
        defaultClasses +=
          " border border-black text-black hover:border-black/80";
        break;
      default:
        break;
    }
  } else if (variant === "text") {
    switch (color) {
      case "light":
        defaultClasses += " text-white hover:text-white/80";
        break;
      case "dark":
        defaultClasses += " text-black hover:text-black/80";
        break;
      default:
        break;
    }
  }

  defaultClasses = cn(defaultClasses, className);
  return href ? (
    <Link className={defaultClasses} target={target} href={href}>
      {children}
    </Link>
  ) : (
    <button className={defaultClasses} onClick={handleOnClick}>
      {children}
    </button>
  );
};

Button.defaultProps = defaultProps;

export default Button;
