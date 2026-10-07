import React, { useRef } from "react";
import { motion, useScroll } from "motion/react";
import { experiences } from "@/data";
import { Eyebrow, Reveal, SectionHeading, useSpotlight } from "./primitives";

const Experience: React.FC = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.7", "end 0.6"] });
  const onPointerMove = useSpotlight();

  return (
    <section id="experience" className="relative scroll-mt-24 px-4 py-20 sm:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="02" label="Experience">
          Where I’ve <em>worked</em>
        </SectionHeading>

        <div ref={ref} className="relative">
          {/* Timeline rail */}
          <div className="absolute bottom-0 left-[5px] top-2 w-px bg-line md:left-[calc(220px+5px)]" aria-hidden>
            <motion.div className="h-full w-full origin-top bg-ember" style={{ scaleY: scrollYProgress }} />
          </div>

          {experiences.map((exp) => (
            <div key={exp.company} className="relative grid gap-6 pb-16 pl-10 md:grid-cols-[220px_1fr] md:gap-12 md:pl-0">
              <span
                className="absolute left-0 top-2 h-[11px] w-[11px] rounded-full bg-ember ring-4 ring-ink md:left-[220px]"
                aria-hidden
              />

              <Reveal className="md:pr-8 md:text-right">
                <p className="font-mono text-sm text-bone">{exp.duration}</p>
                <Eyebrow className="mt-2 block">{exp.location}</Eyebrow>
              </Reveal>

              <Reveal delay={0.1} className="md:pl-12">
                <article
                  onPointerMove={onPointerMove}
                  className="spotlight overflow-hidden rounded-3xl border border-line bg-ink-2/60 p-7 backdrop-blur-sm transition-colors duration-500 hover:border-bone/20 md:p-10"
                >
                  <header className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex items-center gap-5">
                      <img
                        src={exp.logo}
                        alt={exp.company}
                        className="h-16 w-16 shrink-0 rounded-2xl bg-white object-contain p-1"
                      />
                      <div>
                        <h3 className="text-3xl font-semibold tracking-tight md:text-4xl">{exp.role}</h3>
                        <p className="mt-1 text-lg text-mute">{exp.company}</p>
                      </div>
                    </div>
                    {exp.current && (
                      <span className="inline-flex w-fit items-center gap-2 rounded-full border border-ember/40 bg-ember/10 px-3 py-1 font-mono text-[11px] uppercase tracking-[0.18em] text-ember">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-ember" />
                        Current
                      </span>
                    )}
                  </header>

                  <ul className="mt-10 divide-y divide-line border-y border-line">
                    {exp.description.map((point, i) => (
                      <li key={i} className="flex gap-5 py-4 text-bone/80">
                        <span className="pt-1 font-mono text-xs text-ember">{String(i + 1).padStart(2, "0")}</span>
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-8 flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill.name}
                        className="inline-flex items-center gap-2 rounded-full border border-line bg-ink/60 px-3.5 py-1.5 text-sm text-bone/80"
                      >
                        <img src={skill.icon} alt="" className="h-4 w-4 object-contain" />
                        {skill.name}
                      </span>
                    ))}
                  </div>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
