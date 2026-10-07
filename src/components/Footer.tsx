import React from "react";
import { FaHeart, FaCoffee } from "react-icons/fa";
import { profileData } from "@/data";
import { Eyebrow } from "./primitives";

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 overflow-hidden border-t border-line px-4 pt-16 sm:px-8">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <p className="flex items-center gap-2 text-sm text-bone/70">
          Made with <FaHeart className="text-ember" aria-label="love" /> and{" "}
          <FaCoffee className="text-[#C69C72]" aria-label="coffee" /> by {profileData.name}
        </p>
        <Eyebrow>© {new Date().getFullYear()} — All rights reserved</Eyebrow>
        <a
          href="#home"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-mute transition-colors hover:text-bone"
        >
          Back to top
          <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
        </a>
      </div>
      <p
        aria-hidden
        className="text-outline pointer-events-none mt-10 select-none whitespace-nowrap text-center text-[19vw] font-bold leading-[0.78] tracking-[-0.06em]"
      >
        Sanjay Raja
      </p>
    </footer>
  );
};

export default Footer;
