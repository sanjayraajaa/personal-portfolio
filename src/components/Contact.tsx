import React, { useRef } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";
import { toast } from "react-toastify";
import { FiCopy } from "react-icons/fi";
import { profileData, socials } from "@/data";
import { Eyebrow, Reveal } from "./primitives";

function MagneticEmail() {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 });

  const onMove = (e: React.PointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.35);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={`mailto:${profileData.email}`}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x, y }}
      className="group inline-flex items-center gap-4 rounded-full bg-ember py-5 pl-8 pr-5 text-lg font-medium text-ink transition-colors duration-300 hover:bg-bone md:text-2xl"
    >
      <span className="break-all">{profileData.email}</span>
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-ink text-bone transition-transform duration-500 group-hover:rotate-45 md:h-12 md:w-12">
        ↗
      </span>
    </motion.a>
  );
}

const Contact: React.FC = () => {
  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profileData.email);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Couldn’t copy — please copy it manually");
    }
  };

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-4 py-20 sm:px-8 md:py-40">
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 h-[50vmax] w-[80vmax] -translate-x-1/2 translate-y-1/2 rounded-full bg-ember/15 blur-[140px]"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal>
          <Eyebrow>(05) — Contact</Eyebrow>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-8 text-[clamp(3rem,9vw,8.5rem)] font-semibold leading-[0.9] tracking-[-0.045em]">
            Let’s build something <em>worth</em> writing about.
          </h2>
        </Reveal>

        <Reveal delay={0.15} className="mt-14 flex flex-wrap items-center gap-4">
          <MagneticEmail />
          <button
            type="button"
            onClick={copyEmail}
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-4 text-sm transition-colors hover:border-bone/40 hover:bg-bone/5"
          >
            <FiCopy /> Copy email
          </button>
        </Reveal>

        <Reveal delay={0.2} className="mt-24 grid border-t border-line md:grid-cols-2 md:gap-x-12">
          {socials.map(({ label, handle, url, icon: Icon }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between border-b border-line py-6 transition-colors"
            >
              <span className="flex items-center gap-5">
                <Icon className="text-xl text-mute transition-colors duration-300 group-hover:text-ember" />
                <span className="text-2xl font-medium tracking-tight transition-transform duration-500 group-hover:translate-x-2 md:text-3xl">
                  {label}
                </span>
              </span>
              <span className="flex items-center gap-4">
                <span className="hidden font-mono text-xs text-mute sm:inline">{handle}</span>
                <span className="text-xl text-mute transition-all duration-500 group-hover:rotate-45 group-hover:text-bone">↗</span>
              </span>
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  );
};

export default Contact;
