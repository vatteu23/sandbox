"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";

// ─── Motion Demo ──────────────────────────────────────────────────────────────
// Fixed wave data to avoid hydration mismatch from Math.random()
const WAVE_BARS = [
  { h: 32, dur: 0.92, del: 0.00 },
  { h: 58, dur: 1.08, del: 0.09 },
  { h: 84, dur: 0.80, del: 0.18 },
  { h: 68, dur: 1.00, del: 0.27 },
  { h: 44, dur: 1.20, del: 0.36 },
  { h: 92, dur: 0.86, del: 0.45 },
  { h: 54, dur: 1.12, del: 0.54 },
  { h: 38, dur: 0.96, del: 0.63 },
  { h: 76, dur: 0.82, del: 0.72 },
  { h: 96, dur: 1.04, del: 0.81 },
  { h: 62, dur: 0.90, del: 0.90 },
  { h: 34, dur: 1.16, del: 0.99 },
];

const MotionDemo = () => (
  <div className="flex items-end justify-center gap-1.5 h-16 w-full" aria-hidden="true">
    {WAVE_BARS.map(({ h, dur, del }, i) => (
      <div
        key={i}
        className="w-1.5 rounded-full bg-neutral-800 dark:bg-neutral-100"
        style={{
          height: `${h}%`,
          opacity: 0.15 + (h / 100) * 0.72,
          animation: `wave ${dur}s ease-in-out ${del}s infinite alternate`,
          transformOrigin: "bottom",
        }}
      />
    ))}
  </div>
);

// ─── Performance Demo ─────────────────────────────────────────────────────────
const PerformanceDemo = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const obj = { val: 0 };
    const tween = gsap.to(obj, {
      val: 95,
      duration: 1.8,
      delay: 0.25,
      ease: "power2.out",
      onUpdate: () => setCount(Math.round(obj.val)),
    });
    return () => { tween.kill(); };
  }, [isInView]);

  return (
    <div ref={ref} className="text-center select-none" aria-label="95 Lighthouse score">
      <div className="font-display text-neutral-900 dark:text-neutral-100 tabular-nums leading-none" style={{ fontSize: "clamp(3.5rem, 8vw, 5rem)" }}>
        {count}
      </div>
      <div className="text-[10px] font-mono text-neutral-400 dark:text-neutral-600 mt-2 tracking-[0.2em] uppercase">
        Lighthouse Score
      </div>
    </div>
  );
};

// ─── Design → Code Demo ───────────────────────────────────────────────────────
const TOKENS = [
  { token: "color.primary", value: "#2563eb", color: "text-blue-500 dark:text-blue-400" },
  { token: "spacing.4",     value: "1rem",    color: "text-emerald-500 dark:text-emerald-400" },
  { token: "radius.md",     value: "6px",     color: "text-amber-500 dark:text-amber-400" },
];

const DesignDemo = () => (
  <div className="w-full space-y-2 px-1" aria-hidden="true">
    {TOKENS.map(({ token, value, color }) => (
      <div key={token} className="flex items-center gap-2 text-[11px] font-mono">
        <span className="text-violet-500 dark:text-violet-400 flex-shrink-0">◆</span>
        <span className="text-neutral-500 dark:text-neutral-400 flex-1 truncate">{token}</span>
        <span className="text-neutral-300 dark:text-neutral-700 flex-shrink-0">→</span>
        <span className={`${color} flex-shrink-0`}>{value}</span>
      </div>
    ))}
    <div className="mt-3 rounded-md bg-neutral-100 dark:bg-neutral-800/80 px-3 py-2 text-[11px] font-mono border border-neutral-200 dark:border-neutral-700/50 whitespace-nowrap overflow-hidden text-ellipsis">
      <span className="text-blue-600 dark:text-blue-400">{"<Button"}</span>
      <span className="text-emerald-600 dark:text-emerald-400">{" variant"}</span>
      <span className="text-neutral-400 dark:text-neutral-500">{"="}</span>
      <span className="text-amber-600 dark:text-amber-400">{'"primary"'}</span>
      <span className="text-blue-600 dark:text-blue-400">{" />"}</span>
    </div>
  </div>
);

// ─── Card metadata ─────────────────────────────────────────────────────────────
const CARD_META = {
  motion: {
    label: "Motion -> Interaction Design",
    description: "Motion is used to explain relationship and state changes.",
    Demo: MotionDemo,
  },
  performance: {
    label: "Performance -> Frontend Architecture",
    description: "Architecture decisions are evaluated through runtime quality.",
    Demo: PerformanceDemo,
  },
  design: {
    label: "Design Systems -> Developer Experience",
    description: "Shared system primitives reduce drift from design to production.",
    Demo: DesignDemo,
  },
} as const;

type CraftCardVariant = keyof typeof CARD_META;

interface CraftCardProps {
  variant: CraftCardVariant;
  delay?: number;
}

const CraftCard: React.FC<CraftCardProps> = ({ variant, delay = 0 }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { label, description, Demo } = CARD_META[variant];

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--mouse-x", `${((e.clientX - rect.left) / rect.width) * 100}%`);
    card.style.setProperty("--mouse-y", `${((e.clientY - rect.top) / rect.height) * 100}%`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="w-full"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="craft-card relative rounded-2xl border border-neutral-200/80 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 p-6 h-72 overflow-hidden flex flex-col justify-between transition-all duration-300 hover:border-neutral-300 dark:hover:border-neutral-700 hover:shadow-[0_8px_24px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)] cursor-default"
      >
        {/* Demo area */}
        <div className="relative z-10 flex-1 flex items-center justify-center">
          <Demo />
        </div>

        {/* Card footer */}
        <div className="relative z-10 pt-4 border-t border-neutral-200/60 dark:border-neutral-800/60">
          <p className="text-[10px] font-mono text-neutral-400 dark:text-neutral-500 uppercase tracking-[0.18em] mb-1">
            {label}
          </p>
          <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-snug">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

export default CraftCard;
