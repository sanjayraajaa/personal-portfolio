import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import portfolioArchiveImg from "../assets/portfolio_sample.png"; // Project preview image
import reactIcon from "../assets/skills/react.svg"; // HTML icon
import tailwindIcon from "../assets/skills/tailwindcss.svg"; // CSS icon
import typescriptIcon from "../assets/skills/typescript.svg"; // JavaScript icon
import pythonIncon from "../assets/skills/python.svg"; // JavaScript icon
import bashIcon from "../assets/skills/bash.svg"; // JavaScript icon
import frappeBenchInfo from "../assets/frappe_bench_info.png"; // JavaScript icon

interface Project {
  id: string;
  projectName: string;
  previewImg: string;
  langs: { name: string; icon: JSX.Element }[];
  description: string;
  projectLink: string;
  sourceLink: string;
}

export const projects: Project[] = [
  {
    id: "personal-portfolio",
    projectName: "Personal Portfolio",
    previewImg: portfolioArchiveImg,
    langs: [
      { name: "React", icon: <img src={reactIcon} alt="React" className="w-6 h-6" /> },
      { name: "TailWindCSS", icon: <img src={tailwindIcon} alt="TailWindCSS" className="w-6 h-6" /> },
      { name: "TypeScript", icon: <img src={typescriptIcon} alt="TypeScript" className="w-6 h-6" /> },
    ],
    description:
      "A responsive and animated personal portfolio website built with React, TypeScript, and Tailwind CSS. It showcases projects, skills, and experience with a modern UI, smooth animations, and optimized performance for all device types.",
    projectLink: "https://sanjayraja.vercel.app/",
    sourceLink: "https://github.com/sanjayraajaa/personal-portfolio",
  },
  {
    id: "frappe-bench-info",
    projectName: "Frappe Bench Info",
    previewImg: frappeBenchInfo,
    langs: [
      { name: "Pthoon", icon: <img src={pythonIncon} alt="Python" className="w-6 h-6" /> },
      { name: "Bash", icon: <img src={bashIcon} alt="Bash" className="w-6 h-6" /> },
    ],
    description:
      "A simple CLI tool to list all Frappe/ERPNext benches, sites, and database sizes. It scans a given path, detects benches, and shows site details in a table – no Frappe setup required.",
    projectLink: "#",
    sourceLink: "https://github.com/sanjayraajaa/frappe-bench-info",
  },
];

const Projects = () => {
  return (
    <section className="pt-0 pb-16 text-white">
      <div className="container mx-auto px-6 max-w-5xl">
        <h2 className="text-4xl font-bold text-center mb-12">Projects</h2>
        <div className="space-y-10 mx-2 sm:mx-4 md:mx-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="rounded-lg shadow-md bg-[#1e2939]/30 backdrop-blur-lg overflow-hidden transition-all duration-300 w-full min-h-[350px] hover:scale-105 hover:shadow-xl border-0"
            >
              <div className="flex flex-col md:flex-row items-center justify-between p-6 space-y-6 md:space-y-0 md:space-x-6">
                {/* Left side: Image */}
                <div className="flex-shrink-0 w-full md:w-2/5 h-48 sm:h-64 md:h-72 rounded-lg overflow-hidden border border-gray-700">
                  <img
                    src={project.previewImg}
                    alt={`${project.projectName} preview`}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                </div>

                {/* Right side: Content and Buttons */}
                <div className="flex-grow md:pl-6 text-center md:text-left">
                  <h3 className="text-2xl font-semibold mb-3">{project.projectName}</h3>
                  <div className="flex gap-4 justify-center md:justify-start mb-4">
                    {project.langs.map((lang) => (
                      <span
                        key={lang.name}
                        title={lang.name}
                        className="text-xl transition-transform duration-200 hover:scale-125"
                      >
                        {lang.icon}
                      </span>
                    ))}
                  </div>
                  <p className="text-gray-400 text-sm md:text-base mb-5 line-clamp-3">{project.description}</p>
                  <div className="flex gap-4 justify-center md:justify-start">
                    <Button className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md text-base font-medium transition-colors duration-200">
                      <a href={project.projectLink} target="_blank" rel="noopener noreferrer">
                        Live Demo
                      </a>
                    </Button>
                    <Button className="border border-white text-white hover:bg-white hover:text-gray-900 px-5 py-2 rounded-md text-base font-medium transition-all duration-200">
                      <a href={project.sourceLink} target="_blank" rel="noopener noreferrer">
                        Source Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
