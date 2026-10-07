import { useEffect } from "react";
import { MotionConfig, motion, useScroll, useSpring } from "motion/react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Nav from "./components/Nav";
import Home from "./components/Home";
import About from "./components/About";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function useCursorGlow() {
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        document.documentElement.style.setProperty("--mx", `${e.clientX}px`);
        document.documentElement.style.setProperty("--my", `${e.clientY}px`);
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);
}

const App: React.FC = () => {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  useCursorGlow();

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen overflow-x-clip bg-ink text-bone">
        <motion.div
          className="fixed inset-x-0 top-0 z-[80] h-[2px] origin-left bg-ember"
          style={{ scaleX: progress }}
        />
        <div className="cursor-glow" aria-hidden />
        <div className="grain" aria-hidden />

        <Nav />

        <main className="relative z-10">
          <Home />
          <About />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
        <Footer />

        <ToastContainer position="bottom-right" autoClose={3000} theme="dark" style={{ zIndex: 99999 }} />
      </div>
    </MotionConfig>
  );
};

export default App;
