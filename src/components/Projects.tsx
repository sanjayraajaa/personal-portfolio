import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { projects, type Project } from "@/data";
import { Eyebrow, Reveal, SectionHeading } from "./primitives";
import { cn } from "@/lib/utils";

function hostOf(url?: string) {
  if (!url) return "localhost";
  try {
    return new URL(url).host;
  } catch {
    return url;
  }
}

function ProjectFrame({ project }: { project: Project }) {
  const px = useMotionValue(0.5);
  const py = useMotionValue(0.5);
  const rotateX = useSpring(useTransform(py, [0, 1], [5, -5]), { stiffness: 150, damping: 20 });
  const rotateY = useSpring(useTransform(px, [0, 1], [-6, 6]), { stiffness: 150, damping: 20 });

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width);
    py.set((e.clientY - r.top) / r.height);
    e.currentTarget.style.setProperty("--sx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--sy", `${e.clientY - r.top}px`);
  };
  const onLeave = () => {
    px.set(0.5);
    py.set(0.5);
  };

  return (
    <div style={{ perspective: 1200 }}>
      <motion.div
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="spotlight group overflow-hidden rounded-3xl border border-line bg-ink-2 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-3 border-b border-line px-5 py-3.5">
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-bone/15 transition-colors duration-300 group-hover:bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-bone/15 transition-colors delay-75 duration-300 group-hover:bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-bone/15 transition-colors delay-150 duration-300 group-hover:bg-[#28c840]" />
          </div>
          <span className="mx-auto truncate rounded-full bg-ink px-4 py-1 font-mono text-[11px] text-mute">
            {hostOf(project.liveLink ?? project.sourceLink)}
          </span>
          <span className="w-[42px]" />
        </div>
        <div className="relative aspect-[16/11] overflow-hidden bg-[radial-gradient(ellipse_at_top,rgba(255,91,46,0.12),transparent_60%)]">
          <img
            src={project.image}
            alt={`${project.name} preview`}
            loading="lazy"
            className="absolute inset-0 h-full w-full object-contain p-6 transition-transform duration-700 ease-out group-hover:scale-[1.04] md:p-10"
          />
        </div>
      </motion.div>
    </div>
  );
}

function ProjectLink({ href, children, primary }: { href: string; children: React.ReactNode; primary?: boolean }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-all duration-300",
        primary ? "bg-bone text-ink hover:bg-ember" : "border border-line hover:border-bone/40 hover:bg-bone/5",
      )}
    >
      {children}
      <span className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">↗</span>
    </a>
  );
}

const Projects: React.FC = () => {
  return (
    <section id="work" className="relative scroll-mt-24 px-4 py-20 sm:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="03" label="Selected Work">
          Things I’ve <em>built</em>
        </SectionHeading>

        <div className="space-y-20 md:space-y-40">
          {projects.map((project, i) => {
            const flipped = i % 2 === 1;
            return (
              <article key={project.id} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal className={cn("lg:col-span-7", flipped && "lg:order-2")}>
                  <ProjectFrame project={project} />
                </Reveal>

                <Reveal delay={0.15} className={cn("lg:col-span-5", flipped && "lg:order-1")}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-outline text-[7rem] font-bold leading-none tracking-tighter md:text-[9rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <Eyebrow>{project.kind}</Eyebrow>
                  </div>
                  <h3 className="mt-2 text-4xl font-semibold tracking-[-0.03em] md:text-5xl">{project.name}</h3>
                  <p className="mt-5 text-lg leading-relaxed text-bone/65">{project.description}</p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.stack.map((s) => (
                      <span
                        key={s.name}
                        className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-1.5 text-sm text-bone/80"
                      >
                        <img src={s.icon} alt="" className="h-4 w-4 object-contain" />
                        {s.name}
                      </span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap gap-3">
                    {project.liveLink && (
                      <ProjectLink href={project.liveLink} primary>
                        Live demo
                      </ProjectLink>
                    )}
                    <ProjectLink href={project.sourceLink} primary={!project.liveLink}>
                      Source code
                    </ProjectLink>
                  </div>
                </Reveal>
              </article>
            );
          })}
        </div>

        <Reveal className="mt-20 flex justify-center md:mt-28">
          <a
            href="https://github.com/sanjayraajaa"
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.22em] text-mute transition-colors hover:text-bone"
          >
            More on GitHub
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </Reveal>
      </div>
    </section>
  );
};

export default Projects;
