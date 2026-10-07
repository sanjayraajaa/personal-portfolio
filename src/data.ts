import type { IconType } from "react-icons";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

import profile from "./assets/personal/profile.jpg";
import syvasoftLogo from "./assets/personal/Syvasoft.jpg";
import portfolioSample from "./assets/portfolio_sample.png";
import frappeBenchInfo from "./assets/frappe_bench_info.png";

import frappeIcon from "./assets/skills/frappe.svg";
import erpnextIcon from "./assets/skills/erpnext.png";
import pythonIcon from "./assets/skills/python.svg";
import javascriptIcon from "./assets/skills/javascript.svg";
import typescriptIcon from "./assets/skills/typescript.svg";
import reactIcon from "./assets/skills/react.svg";
import tailwindIcon from "./assets/skills/tailwindcss.svg";
import mariadbIcon from "./assets/skills/mariadb.svg";
import bashIcon from "./assets/skills/bash.svg";

export type Skill = { name: string; icon: string };

export const skillIcons = {
  Frappe: { name: "Frappe", icon: frappeIcon },
  ERPNext: { name: "ERPNext", icon: erpnextIcon },
  Python: { name: "Python", icon: pythonIcon },
  JavaScript: { name: "JavaScript", icon: javascriptIcon },
  TypeScript: { name: "TypeScript", icon: typescriptIcon },
  React: { name: "React", icon: reactIcon },
  Tailwind: { name: "Tailwind CSS", icon: tailwindIcon },
  MariaDB: { name: "MariaDB", icon: mariadbIcon },
  Bash: { name: "Bash", icon: bashIcon },
} satisfies Record<string, Skill>;

export const profileData = {
  name: "Sanjay Raja S",
  firstName: "Sanjay",
  lastName: "Raja",
  roles: ["Frappe Developer", "ERPNext Consultant", "Aspiring Writer"],
  location: "Madurai, India",
  timeZone: "Asia/Kolkata",
  email: "thesanjayraja@gmail.com",
  resumeLink: "", // Keep empty until the resume is ready
  image: profile,
  bio: [
    "I am a passionate developer and designer specializing in custom application development using Frappe and ERPNext. With expertise in HTML, CSS, JavaScript, Python, SQL, and React, I strive to build efficient and user-friendly solutions. I am a continuous learner, always expanding my skills to stay ahead in the tech industry.",
    "Beyond coding, I have a deep love for storytelling and poetry, along with a keen interest in movies and books. I hold a Bachelor’s degree in Information Technology from Syed Ammal Arts and Science College, Ramanathapuram, graduating with first-class distinction.",
  ],
};

export type Social = { label: string; handle: string; url: string; icon: IconType };

export const socials: Social[] = [
  { label: "GitHub", handle: "@sanjayraajaa", url: "https://github.com/sanjayraajaa", icon: FaGithub },
  { label: "LinkedIn", handle: "in/sanjayraajaa", url: "https://linkedin.com/in/sanjayraajaa", icon: FaLinkedin },
  { label: "X / Twitter", handle: "@sanjayraajaa", url: "https://x.com/sanjayraajaa", icon: FaXTwitter },
  { label: "Instagram", handle: "@sanjayraajaa", url: "https://instagram.com/sanjayraajaa", icon: FaInstagram },
];

export const experiences = [
  {
    role: "Frappe Developer",
    company: "SyvaSoft Business Solutions",
    duration: "Aug 2024 — Present",
    current: true,
    location: "Madurai, India",
    logo: syvasoftLogo,
    description: [
      "Developing and customizing ERPNext modules for business process automation.",
      "Implementing backend solutions using Python and the Frappe Framework.",
      "Enhancing system performance and database optimization using MariaDB.",
      "Collaborating with clients to deliver tailored ERP solutions.",
      "Utilizing Business Intelligence (BI) tools to develop data-driven dashboards and analytics.",
    ],
    skills: [skillIcons.Frappe, skillIcons.ERPNext, skillIcons.Python, skillIcons.JavaScript, skillIcons.MariaDB],
  },
];

export type Project = {
  id: string;
  name: string;
  kind: string;
  image: string;
  description: string;
  stack: Skill[];
  liveLink?: string;
  sourceLink: string;
};

export const projects: Project[] = [
  {
    id: "personal-portfolio",
    name: "Personal Portfolio",
    kind: "Web · Design",
    image: portfolioSample,
    description:
      "A responsive and animated personal portfolio website built with React, TypeScript, and Tailwind CSS. It showcases projects, skills, and experience with a modern UI, smooth animations, and optimized performance for all device types.",
    stack: [skillIcons.React, skillIcons.Tailwind, skillIcons.TypeScript],
    liveLink: "https://sanjayraja.vercel.app/",
    sourceLink: "https://github.com/sanjayraajaa/personal-portfolio",
  },
  {
    id: "frappe-bench-info",
    name: "Frappe Bench Info",
    kind: "CLI · Tooling",
    image: frappeBenchInfo,
    description:
      "A simple CLI tool to list all Frappe/ERPNext benches, sites, and database sizes. It scans a given path, detects benches, and shows site details in a table – no Frappe setup required.",
    stack: [skillIcons.Python, skillIcons.Bash],
    sourceLink: "https://github.com/sanjayraajaa/frappe-bench-info",
  },
];

export const navLinks = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Work" },
  { id: "skills", label: "Skills" },
  { id: "contact", label: "Contact" },
];
