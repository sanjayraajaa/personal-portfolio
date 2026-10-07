import React from "react";
import { skillIcons, type Skill } from "@/data";
import { Eyebrow, Reveal, SectionHeading, useSpotlight } from "./primitives";
import { cn } from "@/lib/utils";

const tools: { skill: Skill; tag: string }[] = [
  { skill: skillIcons.Python, tag: "Backend" },
  { skill: skillIcons.JavaScript, tag: "Language" },
  { skill: skillIcons.TypeScript, tag: "Language" },
  { skill: skillIcons.React, tag: "Frontend" },
  { skill: skillIcons.Tailwind, tag: "Styling" },
  { skill: skillIcons.MariaDB, tag: "Database" },
];

function Tile({ className, children }: { className?: string; children: React.ReactNode }) {
  const onPointerMove = useSpotlight();
  return (
    <div
      onPointerMove={onPointerMove}
      className={cn(
        "spotlight group relative overflow-hidden rounded-3xl border border-line bg-ink-2/60 p-6 transition-colors duration-500 hover:border-bone/20 md:p-7",
        className,
      )}
    >
      {children}
    </div>
  );
}

const Skills: React.FC = () => {
  return (
    <section id="skills" className="relative scroll-mt-24 px-4 py-20 sm:px-8 md:py-36">
      <div className="mx-auto max-w-7xl">
        <SectionHeading index="04" label="Toolkit">
          What I <em>work</em> with
        </SectionHeading>

        <Reveal className="grid auto-rows-[minmax(170px,auto)] grid-cols-2 gap-3 md:grid-cols-4">
          {/* Home turf */}
          <Tile className="col-span-2 row-span-2 flex flex-col justify-between bg-[radial-gradient(ellipse_at_top_right,rgba(255,91,46,0.16),transparent_60%)]">
            <Eyebrow>Home turf</Eyebrow>
            <div className="my-10 flex items-center gap-5">
              {[skillIcons.Frappe, skillIcons.ERPNext].map((s) => (
                <div
                  key={s.name}
                  className="grid h-20 w-20 place-items-center rounded-2xl border border-line bg-ink transition-transform duration-500 group-hover:-rotate-6 md:h-24 md:w-24 [&:nth-child(2)]:group-hover:rotate-6"
                >
                  <img src={s.icon} alt={s.name} className="h-11 w-11 object-contain md:h-12 md:w-12" />
                </div>
              ))}
            </div>
            <div>
              <h3 className="text-4xl font-semibold tracking-tight md:text-5xl">
                Frappe <em>&amp;</em> ERPNext
              </h3>
              <p className="mt-3 max-w-md text-bone/60">
                Custom modules, backend logic and BI dashboards that automate how a business actually runs.
              </p>
            </div>
          </Tile>

          {tools.map(({ skill, tag }) => (
            <Tile key={skill.name} className="flex flex-col justify-between">
              <img
                src={skill.icon}
                alt=""
                className="h-10 w-10 object-contain transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-110"
              />
              <div>
                <p className="text-xl font-medium tracking-tight">{skill.name}</p>
                <Eyebrow className="mt-1 block text-[10px]">{tag}</Eyebrow>
              </div>
            </Tile>
          ))}

          {/* The other half */}
          <Tile className="col-span-2 flex flex-col justify-between">
            <Eyebrow>Beyond code</Eyebrow>
            <p className="statement mt-8 text-2xl leading-tight tracking-tight md:text-3xl">
              Storytelling, <em>poetry,</em> films &amp; <em>books</em> — the stuff that keeps the code human.
            </p>
          </Tile>
        </Reveal>
      </div>
    </section>
  );
};

export default Skills;
