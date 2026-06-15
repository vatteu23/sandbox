"use client";
import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Globe2, BarChart2, Layers, Bot, Zap, ArrowRight } from "lucide-react";
import type { PorjectProps } from "@/pages/index";
import { projectConceptNarratives } from "@/data/graph/projectConcepts";

// ─── Icon registry ─────────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ICON_MAP: Record<string, React.ComponentType<any>> = {
  Globe2, BarChart2, Layers, Bot, Zap,
};

// Card dimensions
// Width: viewport-relative so cards always overflow on any monitor
const CARD_W_STYLE = "clamp(300px, 26vw, 420px)";
const CARD_H = 400;

// ─── ImpactCard ────────────────────────────────────────────────────────────────
interface ImpactCardProps {
  category: string;
  text: string;
  stat: string;
  icon: string;
}

const ImpactCard: React.FC<ImpactCardProps> = ({ category, text, stat, icon }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const Icon = ICON_MAP[icon] ?? Globe2;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="impact-card relative w-full h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 overflow-hidden flex flex-col cursor-default select-none transition-colors duration-200 hover:border-neutral-300 dark:hover:border-neutral-700"
    >
      {/* Top area */}
      <div className="relative z-10 flex-1 p-6 flex flex-col gap-4">
        {/* Category row */}
        <div className="flex items-center justify-between">
          <span className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.2em]">
            {category}
          </span>
          <div className="w-7 h-7 rounded-full border border-neutral-100 dark:border-neutral-800 flex items-center justify-center">
            <Icon size={13} className="text-neutral-400 dark:text-neutral-500" />
          </div>
        </div>

        {/* Body text */}
        <p className="text-[15px] text-neutral-700 dark:text-neutral-300 leading-relaxed flex-1">
          {text}
        </p>
      </div>

      {/* Stat strip */}
      <div className="relative z-10 px-6 py-5 border-t border-neutral-100 dark:border-neutral-800 bg-neutral-50/60 dark:bg-neutral-800/40">
        <p className="text-xl font-semibold text-neutral-900 dark:text-neutral-100 leading-none">
          {stat}
        </p>
      </div>
    </div>
  );
};

// ─── ViewDetailsCard ───────────────────────────────────────────────────────────
const ViewDetailsCard: React.FC<{ href: string }> = ({ href }) => (
  <Link
    href={href}
    className="relative w-full h-full rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 flex flex-col items-center justify-center gap-4 overflow-hidden transition-all duration-300 hover:border-neutral-900 dark:hover:border-neutral-100 group"
  >
    <div className="w-12 h-12 rounded-full border border-neutral-200 dark:border-neutral-700 flex items-center justify-center transition-all duration-300 group-hover:border-neutral-900 group-hover:bg-neutral-900 dark:group-hover:border-neutral-100 dark:group-hover:bg-neutral-100">
      <ArrowRight
        size={16}
        className="text-neutral-400 dark:text-neutral-500 transition-colors duration-300 group-hover:text-white dark:group-hover:text-neutral-900"
      />
    </div>
    <div className="text-center">
      <p className="text-xs font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.18em] transition-colors duration-300 group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
        Explore supporting work
      </p>
    </div>
  </Link>
);

// ─── Desktop: GSAP ScrollTrigger ───────────────────────────────────────────────
const DesktopWorkSection: React.FC<{ project: PorjectProps }> = ({ project }) => {
  const { name, role, year, id, impacts = [] } = project;
  const concept = projectConceptNarratives[id]?.concept;

  const sectionRef  = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const hintRef     = useRef<HTMLParagraphElement>(null);
  const dotRefs     = useRef<(HTMLDivElement | null)[]>([]);

  const totalCards = impacts.length + 1;

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!window.matchMedia("(min-width: 768px)").matches) return;

    const section = sectionRef.current;
    const track   = trackRef.current;
    if (!section || !track) return;

    gsap.registerPlugin(ScrollTrigger);

    // Measure actual header height so we can center cards properly
    const headerEl  = section.querySelector("[data-header]") as HTMLElement | null;
    const headerH   = headerEl?.offsetHeight ?? 220;
    const dotsH     = 72;
    const availH    = window.innerHeight - headerH - dotsH;
    const centeredY = headerH + Math.max(8, (availH - CARD_H) / 2);

    // Position track vertically (GSAP manages the transform)
    gsap.set(track, { y: centeredY });

    // Hide cards for entrance animation
    gsap.set(Array.from(track.children), { opacity: 0, x: 32 });

    // Activate first dot
    const setDot = (idx: number) => {
      dotRefs.current.forEach((dot, i) => {
        if (!dot) return;
        dot.style.width = i === idx ? "24px" : "8px";
        dot.style.opacity = i === idx ? "1" : "0.3";
      });
    };
    setDot(0);

    const ctx = gsap.context(() => {
      // Card entrance on scroll-into-view
      gsap.to(Array.from(track.children), {
        opacity: 1,
        x: 0,
        duration: 0.55,
        stagger: 0.07,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 88%",
          toggleActions: "play none none none",
        },
      });

      // Scroll hint
      if (hintRef.current) {
        gsap.fromTo(
          hintRef.current,
          { opacity: 0, y: 4 },
          {
            opacity: 1, y: 0, duration: 0.5, delay: 0.4,
            scrollTrigger: {
              trigger: section,
              start: "top 82%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      // Horizontal scroll driven by vertical scrub
      // track.scrollWidth includes content + padding; compare to viewport width
      const getScrollDist = () =>
        Math.max(0, track.scrollWidth - window.innerWidth);

      gsap.to(track, {
        x: () => -getScrollDist(),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${getScrollDist()}`,
          pin: true,
          anticipatePin: 1,
          scrub: 1.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(
              Math.round(self.progress * (totalCards - 1)),
              totalCards - 1
            );
            setDot(idx);
            if (hintRef.current) {
              hintRef.current.style.opacity = String(Math.max(0, 1 - self.progress * 14));
            }
          },
        },
      });
    }, section);

    return () => ctx.revert();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      ref={sectionRef}
      className="relative w-full bg-white dark:bg-neutral-950 overflow-hidden"
      style={{ height: "100vh" }}
    >
      {/* Header — absolutely positioned at top so GSAP can measure it */}
      <div
        data-header
        className="absolute top-0 left-0 right-0 z-20 px-6 lg:px-8 pt-16 pb-6"
      >
        <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-3">
          {role} · {year}
        </p>
        {concept && (
          <p className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.16em] mb-3">
            {concept}
          </p>
        )}
        <h2
          className="font-display text-neutral-900 dark:text-neutral-100 leading-none tracking-tight mb-4"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}
        >
          {name}
        </h2>
        <p
          ref={hintRef}
          className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.18em]"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          scroll to explore →
        </p>
      </div>

      {/* Edge fade — left (matches container left-pad) */}
      <div className="absolute left-0 top-0 bottom-16 z-10 pointer-events-none w-8 bg-gradient-to-r from-white dark:from-neutral-950 to-transparent" />
      {/* Edge fade — right (wider, strong hint more cards exist) */}
      <div className="absolute right-0 top-0 bottom-16 z-10 pointer-events-none w-32 bg-gradient-to-l from-white dark:from-neutral-950 to-transparent" />

      {/* Track — GSAP translates on X (y already set by gsap.set above) */}
      <div
        ref={trackRef}
        className="absolute top-0 left-0 flex gap-5 px-6 lg:px-8"
        style={{ width: "max-content" }}
      >
        {impacts.map((item) => (
          <div
            key={item.category}
            style={{ width: CARD_W_STYLE, height: CARD_H, flexShrink: 0 }}
          >
            <ImpactCard {...item} />
          </div>
        ))}
        <div style={{ width: CARD_W_STYLE, height: CARD_H, flexShrink: 0 }}>
          <ViewDetailsCard href={`/work/${id}`} />
        </div>
      </div>

      {/* Progress dots */}
      <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-2">
        {Array.from({ length: totalCards }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { dotRefs.current[i] = el; }}
            className="h-1 rounded-full bg-neutral-300 dark:bg-neutral-700 transition-all duration-300"
            style={{ width: 8, opacity: 0.3 }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Mobile: native CSS scroll-snap carousel ───────────────────────────────────
const MobileWorkSection: React.FC<{ project: PorjectProps }> = ({ project }) => {
  const { name, role, year, id, impacts = [] } = project;
  const concept = projectConceptNarratives[id]?.concept;
  const carouselRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const totalCards = impacts.length + 1;

  const handleScroll = () => {
    const el = carouselRef.current;
    if (!el) return;
    const cardWidth = el.scrollWidth / totalCards;
    setActiveIndex(Math.round(el.scrollLeft / cardWidth));
  };

  return (
    <div className="bg-white dark:bg-neutral-950 py-10">
      <div className="px-6 mb-6">
        <p className="text-xs font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-widest mb-2">
          {role} · {year}
        </p>
        {concept && (
          <p className="text-[10px] font-mono text-neutral-500 dark:text-neutral-400 uppercase tracking-[0.16em] mb-2">
            {concept}
          </p>
        )}
        <h2
          className="font-display text-neutral-900 dark:text-neutral-100 leading-none tracking-tight"
          style={{ fontSize: "clamp(2.2rem, 9vw, 3.5rem)" }}
        >
          {name}
        </h2>
      </div>

      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="cards-carousel flex overflow-x-auto snap-x snap-mandatory gap-4 px-6 pb-2"
      >
        {impacts.map((item) => (
          <div
            key={item.category}
            className="snap-start flex-shrink-0"
            style={{ width: "82vw", height: CARD_H }}
          >
            <ImpactCard {...item} />
          </div>
        ))}
        <div
          className="snap-start flex-shrink-0"
          style={{ width: "82vw", height: CARD_H }}
        >
          <ViewDetailsCard href={`/work/${id}`} />
        </div>
        <div className="flex-shrink-0 w-6" aria-hidden="true" />
      </div>

      <div className="flex items-center justify-center gap-2 mt-5">
        {Array.from({ length: totalCards }).map((_, i) => (
          <div
            key={i}
            className={`h-1 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "bg-neutral-900 dark:bg-neutral-100"
                : "bg-neutral-300 dark:bg-neutral-700"
            }`}
            style={{ width: i === activeIndex ? 24 : 8, opacity: i === activeIndex ? 1 : 0.35 }}
          />
        ))}
      </div>
    </div>
  );
};

// ─── Main export ───────────────────────────────────────────────────────────────
const WorkScrollSection: React.FC<{ project: PorjectProps; index: number }> = ({ project }) => {
  if (!project.impacts?.length) return null;

  return (
    <>
      <div className="md:hidden">
        <MobileWorkSection project={project} />
      </div>
      <div className="hidden md:block">
        <DesktopWorkSection project={project} />
      </div>
    </>
  );
};

export default WorkScrollSection;
