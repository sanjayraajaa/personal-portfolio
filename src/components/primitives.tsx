import React, { useCallback } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

export const EASE = [0.22, 1, 0.36, 1] as const;

export function Reveal({
  children,
  delay = 0,
  y = 28,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({
  index,
  label,
  children,
}: {
  index: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Reveal className="mb-10 flex flex-col gap-5 border-b border-line pb-6 md:mb-20 md:gap-6 md:pb-8 md:flex-row md:items-end md:justify-between">
      <h2 className="max-w-4xl text-[clamp(2.75rem,7vw,6.5rem)] font-semibold leading-[0.92] tracking-[-0.035em]">
        {children}
      </h2>
      <span className="shrink-0 font-mono text-xs uppercase tracking-[0.22em] text-mute">
        ({index}) — {label}
      </span>
    </Reveal>
  );
}

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn("font-mono text-[11px] uppercase tracking-[0.22em] text-mute", className)}>
      {children}
    </span>
  );
}

/** Pointer handler that feeds the `.spotlight` CSS gradient. */
export function useSpotlight() {
  return useCallback((e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--sx", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - rect.top}px`);
  }, []);
}

export function Marquee({ items }: { items: string[] }) {
  const row = [...items, ...items];
  return (
    <div className="mask-fade-x group relative overflow-hidden border-y border-line py-6 md:py-8">
      <div className="flex w-max animate-marquee items-center group-hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <span key={i} className="flex items-center" aria-hidden={i >= items.length}>
            <span className="px-6 font-serif text-4xl italic text-bone/90 md:px-10 md:text-6xl">{item}</span>
            <span className="text-2xl text-ember md:text-3xl">✳</span>
          </span>
        ))}
      </div>
    </div>
  );
}
