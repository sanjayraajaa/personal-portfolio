import React, { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { toast } from "react-toastify";
import { profileData, socials, skillIcons } from "@/data";
import { EASE, Eyebrow, Marquee } from "./primitives";

const handleResumeDownload = () => {
  if (!profileData.resumeLink) {
    toast.info("Resume is getting a fresh coat of paint — check back soon!");
  } else {
    window.open(profileData.resumeLink, "_blank", "noopener");
  }
};

const formatTime = (timeZone: string) =>
  new Intl.DateTimeFormat("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true, timeZone }).format(new Date());

// Parallax only makes sense in the side-by-side desktop layout; on mobile it pushes the portrait into the marquee.
function useIsDesktop() {
  const query = "(min-width: 1024px)";
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return matches;
}

function useLocalTime(timeZone: string) {
  const [time, setTime] = useState(() => formatTime(timeZone));
  useEffect(() => {
    const t = setInterval(() => setTime(formatTime(timeZone)), 15_000);
    return () => clearInterval(t);
  }, [timeZone]);
  return time;
}

function SplitWord({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    // Padding gives descenders (the italic "j") room inside the mask; negative margins keep the layout unchanged.
    <span className="-mx-[0.08em] -mb-[0.25em] inline-flex overflow-hidden px-[0.08em] pb-[0.25em]" aria-label={text}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className="inline-block"
          initial={{ y: "110%" }}
          animate={{ y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: delay + i * 0.045 }}
        >
          {ch}
        </motion.span>
      ))}
    </span>
  );
}

function RoleRotator({ roles }: { roles: string[] }) {
  const [i, setI] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % roles.length), 2600);
    return () => clearInterval(t);
  }, [roles.length]);
  return (
    <span className="relative inline-flex h-[1.25em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={roles[i]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.55, ease: EASE }}
          className="inline-block whitespace-nowrap font-serif italic text-ember"
        >
          {roles[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function RotatingBadge() {
  const text = "FRAPPE · ERPNEXT · PYTHON · POETRY · ";
  return (
    <div className="absolute -bottom-8 -left-8 grid h-28 w-28 place-items-center rounded-full border border-line bg-ink/80 backdrop-blur-md sm:h-32 sm:w-32">
      <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full animate-spin-slow" aria-hidden>
        <defs>
          <path id="badge-circle" d="M50,50 m-37,0 a37,37 0 1,1 74,0 a37,37 0 1,1 -74,0" />
        </defs>
        <text className="fill-bone font-mono text-[8.2px] tracking-[0.12em]">
          <textPath href="#badge-circle">{text}</textPath>
        </text>
      </svg>
      <span className="text-2xl text-ember">✳</span>
    </div>
  );
}

const Home: React.FC = () => {
  const time = useLocalTime(profileData.timeZone);
  const isDesktop = useIsDesktop();
  const { scrollY } = useScroll();
  const portraitY = useTransform(scrollY, [0, 800], [0, 120]);
  const nameY = useTransform(scrollY, [0, 800], [0, -60]);

  return (
    <section id="home" className="relative flex min-h-[100svh] flex-col overflow-hidden px-4 pb-0 pt-28 sm:px-8">
      {/* Ambient backdrop */}
      <div className="grid-lines pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -right-[10%] -top-[20%] h-[60vmax] w-[60vmax] animate-drift rounded-full bg-ember/20 blur-[120px]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-[30%] -left-[15%] h-[50vmax] w-[50vmax] animate-drift rounded-full bg-[#ffb36b]/10 blur-[120px] [animation-delay:-8s]"
        aria-hidden
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col">
        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4"
        >
          <Eyebrow>Portfolio ©{new Date().getFullYear()}</Eyebrow>
          <Eyebrow>
            {profileData.location} · {time} IST
          </Eyebrow>
        </motion.div>

        <div className="grid flex-1 items-center gap-14 py-12 lg:grid-cols-[1fr_auto] lg:gap-10">
          {/* Name + intro */}
          <motion.div style={{ y: isDesktop ? nameY : 0 }}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: EASE }}
              className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-mute"
            >
              Hello, I’m —
            </motion.p>
            <h1 className="text-[clamp(4.5rem,13vw,12.5rem)] font-bold leading-[0.84] tracking-[-0.055em]">
              <SplitWord text={profileData.firstName} delay={0.35} />
              <br />
              <em className="pr-[0.1em] !tracking-[-0.03em]">
                <SplitWord text={profileData.lastName} delay={0.6} />
              </em>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.1, ease: EASE }}
              className="mt-10 max-w-xl text-xl leading-snug text-bone/80 md:text-2xl"
            >
              <RoleRotator roles={profileData.roles} /> <br className="sm:hidden" />
              building custom business applications on Frappe&nbsp;&amp;&nbsp;ERPNext — with the care of someone who
              also writes poetry.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.3, ease: EASE }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-3 rounded-full bg-bone px-7 py-4 text-sm font-medium text-ink transition-all duration-300 hover:bg-ember"
              >
                See my work
                <span className="transition-transform duration-300 group-hover:translate-y-0.5">↓</span>
              </a>
              <button
                type="button"
                onClick={handleResumeDownload}
                className="inline-flex items-center gap-3 rounded-full border border-line px-7 py-4 text-sm font-medium transition-colors duration-300 hover:border-bone/40 hover:bg-bone/5"
              >
                Download Resume
              </button>
              <div className="ml-1 flex items-center gap-1">
                {socials.map(({ label, url, icon: Icon }) => (
                  <a
                    key={label}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="grid h-11 w-11 place-items-center rounded-full text-lg text-mute transition-all duration-300 hover:-translate-y-0.5 hover:bg-bone/5 hover:text-bone"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            </motion.div>
          </motion.div>

          {/* Portrait */}
          <motion.div
            style={{ y: isDesktop ? portraitY : 0 }}
            initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.4, delay: 0.5, ease: EASE }}
            className="relative mx-auto mb-8 w-64 sm:w-72 lg:mb-0 lg:w-80"
          >
            <div className="group relative aspect-[3/4] overflow-hidden rounded-t-full rounded-b-[2rem] border border-line bg-ink-2">
              <img
                src={profileData.image}
                alt={profileData.name}
                className="h-full w-full object-cover grayscale-[0.85] transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
              <span className="absolute bottom-5 right-5 font-mono text-[10px] uppercase tracking-[0.22em] text-bone/80">
                Fig. 01 — The Learner
              </span>
            </div>
            <RotatingBadge />
          </motion.div>
        </div>
      </div>

      <div className="relative -mx-4 sm:-mx-8">
        <Marquee items={[...Object.values(skillIcons).map((s) => s.name), "Poetry", "Storytelling"]} />
      </div>
    </section>
  );
};

export default Home;
