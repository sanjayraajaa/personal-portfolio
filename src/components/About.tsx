import React, { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { profileData } from "@/data";
import { Eyebrow, Reveal } from "./primitives";

// Words wrapped in *asterisks* are rendered as emphasis.
const statement =
  "I build *custom applications* on Frappe & ERPNext that make businesses run smoother — and when the terminal goes quiet, I write *stories and poetry.*";

function Word({ word, progress, range }: { word: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  const emphasised = word.startsWith("*") || word.endsWith("*") || word.endsWith("*.");
  const clean = word.replace(/\*/g, "");
  return (
    <motion.span style={{ opacity }} className="mr-[0.25em] inline-block">
      {emphasised ? <em>{clean}</em> : clean}
    </motion.span>
  );
}

function ScrollStatement({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });

  // Carry emphasis across multi-word *phrases*.
  let inEm = false;
  const words = text.split(" ").map((w) => {
    const opens = w.startsWith("*");
    const closes = w.replace(/[.,]$/, "").endsWith("*");
    const marked = inEm || opens ? `*${w.replace(/\*/g, "")}*` : w;
    if (opens && !closes) inEm = true;
    if (closes) inEm = false;
    return marked;
  });

  return (
    <p
      ref={ref}
      className="statement text-[clamp(1.9rem,4.4vw,4rem)] font-medium leading-[1.08] tracking-[-0.025em]"
    >
      {words.map((w, i) => (
        <Word key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} />
      ))}
    </p>
  );
}

const facts = [
  { label: "Currently", value: "Frappe Developer", note: "SyvaSoft Business Solutions" },
  { label: "Education", value: "B.Sc. IT — First Class", note: "Syed Ammal Arts & Science College" },
  { label: "Off-screen", value: "Stories & poetry", note: "Plus a long list of films and books" },
];

const About: React.FC = () => {
  return (
    <section id="about" className="relative scroll-mt-24 px-4 py-20 sm:px-8 md:py-40">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 md:grid-cols-[180px_1fr] md:gap-16">
          <Reveal>
            <Eyebrow>(01) — About</Eyebrow>
          </Reveal>
          <div>
            <ScrollStatement text={statement} />

            <div className="mt-16 grid gap-8 text-lg leading-relaxed text-bone/65 md:grid-cols-2 md:gap-12">
              {profileData.bio.map((para, i) => (
                <Reveal key={i} delay={i * 0.1}>
                  <p>{para}</p>
                </Reveal>
              ))}
            </div>

            <div className="mt-20 grid border-t border-line sm:grid-cols-3">
              {facts.map((f, i) => (
                <Reveal
                  key={f.label}
                  delay={i * 0.08}
                  className="border-b border-line py-8 sm:border-b-0 sm:pr-8 sm:[&:not(:first-child)]:border-l sm:[&:not(:first-child)]:pl-8"
                >
                  <Eyebrow>{f.label}</Eyebrow>
                  <p className="mt-4 text-2xl font-medium tracking-tight">{f.value}</p>
                  <p className="mt-1 text-sm text-mute">{f.note}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
