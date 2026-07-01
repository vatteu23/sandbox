"use client";

import { cn } from "@/functions/cn";
import type { ReactNode } from "react";
import ClientSideBadge from "../shared/ClientSideBadge";
import ToolBackLink from "./ToolBackLink";
import ToolHero from "./ToolHero";

interface ToolShellProps {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  footer?: ReactNode;
  className?: string;
  clientSideOnly?: boolean;
}

export default function ToolShell({
  eyebrow,
  title,
  description,
  children,
  footer,
  className,
  clientSideOnly = true,
}: ToolShellProps) {
  return (
    <div className={cn("relative", className)}>
      <ToolBackLink />
      <ToolHero eyebrow={eyebrow} title={title} description={description} />
      {clientSideOnly && <ClientSideBadge className="mb-10" />}
      {children}
      {footer}
    </div>
  );
}
