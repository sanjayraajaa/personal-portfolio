import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { navLinks, socials } from "@/data";
import { EASE } from "./primitives";
import { cn } from "@/lib/utils";

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string>("");
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) if (entry.isIntersecting) setActive(entry.target.id);
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    const nodes = ["home", ...ids].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [ids]);
  return active;
}

const ids = navLinks.map((l) => l.id);

const Nav: React.FC = () => {
  const active = useActiveSection(ids);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <motion.header
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.2 }}
        className="fixed inset-x-0 top-4 z-[60] px-4"
      >
        <nav
          className={cn(
            "mx-auto flex max-w-5xl items-center justify-between rounded-full border py-2 pl-2 pr-2 transition-all duration-500",
            scrolled || open
              ? "border-line bg-ink-2/70 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.6)] backdrop-blur-xl"
              : "border-transparent bg-transparent",
          )}
        >
          <a href="#home" onClick={() => setOpen(false)} className="group flex items-center gap-3 rounded-full pr-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-bone font-serif text-xl italic text-ink transition-colors duration-300 group-hover:bg-ember">
              S
            </span>
            <span className="hidden text-sm font-medium tracking-tight sm:block">Sanjay Raja</span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <li key={link.id} className="relative">
                <a
                  href={`#${link.id}`}
                  className={cn(
                    "relative z-10 block rounded-full px-4 py-2 text-sm transition-colors duration-300",
                    active === link.id ? "text-ink" : "text-bone/70 hover:text-bone",
                  )}
                >
                  {link.label}
                </a>
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full bg-bone"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
              </li>
            ))}
          </ul>

          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-ember px-5 py-2.5 text-sm font-medium text-ink transition-transform duration-300 hover:scale-[1.04] md:flex"
          >
            Let’s talk <span aria-hidden>→</span>
          </a>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="relative grid h-10 w-10 place-items-center rounded-full border border-line md:hidden"
          >
            <span className={cn("absolute h-px w-4 bg-bone transition-transform duration-300", open ? "rotate-45" : "-translate-y-[3px]")} />
            <span className={cn("absolute h-px w-4 bg-bone transition-transform duration-300", open ? "-rotate-45" : "translate-y-[3px]")} />
          </button>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 92% 40px)" }}
            animate={{ clipPath: "circle(150% at 92% 40px)" }}
            exit={{ clipPath: "circle(0% at 92% 40px)" }}
            transition={{ duration: 0.7, ease: EASE }}
            className="fixed inset-0 z-[55] flex flex-col justify-between bg-ink px-6 pb-10 pt-28 md:hidden"
          >
            <ul className="space-y-2">
              {[{ id: "home", label: "Home" }, ...navLinks].map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.06, duration: 0.6, ease: EASE }}
                >
                  <a
                    href={`#${link.id}`}
                    onClick={() => setOpen(false)}
                    className="flex items-baseline gap-4 border-b border-line py-3"
                  >
                    <span className="font-mono text-xs text-mute">0{i + 1}</span>
                    <span className={cn("text-5xl font-semibold tracking-tight", active === link.id && "font-serif font-normal italic text-ember")}>
                      {link.label}
                    </span>
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs uppercase tracking-[0.2em] text-mute">
              {socials.map((s) => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer" className="hover:text-bone">
                  {s.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
