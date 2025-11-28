"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

// Example new content and components
const headline = "Explore My Projects";
const description = `A showcase of my latest work, built with modern web technologies and a focus on performance, accessibility, and design.`;
const projects = [
  { name: "E-Commerce Platform", desc: "A scalable online store with custom checkout and admin dashboard." },
  { name: "Portfolio Website", desc: "Personal portfolio with interactive animations and responsive design." },
  { name: "Blog Engine", desc: "A markdown-powered blog with live search and comments." },
];

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const textVariant = {
  hidden: { opacity: 0, y: 15 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function ProjectsPage() {
  const horizontalRef = useRef(null);

  useEffect(() => {
    let lenis;
    let rafId;
    let mounted = true;
    async function setupLenis() {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({
        duration: 1.4,
        smooth: true,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      function raf(time) {
        lenis.raf(time);
        if (mounted) rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
      const el = horizontalRef.current;
      const speed = 0.25;
      lenis.on("scroll", (e) => {
        if (!el || !mounted) return;
        const sign = e.direction === "down" ? 1 : -1;
        const x = sign * e.scroll * speed;
        el.style.transform = `translateX(${x}px)`;
      });
    }
    setupLenis();
    return () => {
      mounted = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (lenis?.destroy) lenis.destroy();
    };
  }, []);

  return (
    <motion.div initial="hidden" animate="visible" variants={pageVariants} className="w-full overflow-hidden py-20 bg-black">
      {/* HERO */}
      <div className="p-6 md:p-16 lg:py-24">
        <motion.span variants={textVariant} className="text-white bg-orange-500 px-3 py-1 text-lg md:text-2xl rounded">
          Projects
        </motion.span>
        <motion.h1 variants={textVariant} className="text-white font-Poppins mt-5 font-bold leading-[1.1] text-[42px] md:text-[80px] lg:text-[120px]">
          {headline}
        </motion.h1>
        <motion.p variants={textVariant} className="mt-4 text-white/80 md:w-3/5 leading-relaxed">
          {description}
        </motion.p>
      </div>
      {/* PROJECTS LIST */}
      <div className="flex flex-col gap-10 md:flex-row justify-between items-center px-6 md:px-16 py-10">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={pageVariants}
          className="text-white font-Poppins text-[18px] md:text-[20px] leading-[30px] md:w-1/2"
        >
          <motion.ul initial="hidden" animate="visible" variants={pageVariants} className="space-y-6">
            {projects.map((proj, i) => (
              <motion.li key={proj.name} variants={textVariant} className="bg-white/5 rounded-xl p-6 shadow">
                <h3 className="text-orange-500 font-bold text-xl mb-2">{proj.name}</h3>
                <p className="text-white/80">{proj.desc}</p>
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/Marketplace-Company-Home-Mobile-mockup_1.avif"
            alt="project showcase"
            className="rounded-2xl w-full max-w-[400px] md:max-w-[600px]"
          />
        </div>
      </div>
      {/* LENIS HORIZONTAL SCROLL */}
      <div className="mt-16 mx-auto max-w-6xl overflow-hidden">
        <div
          ref={horizontalRef}
          className="text-white font-Poppins px-12 mt-24 text-[32px] md:text-[64px] flex gap-20 whitespace-nowrap will-change-transform"
        >
          {Array(5)
            .fill("Featured Project")
            .map((text, i) => (
              <motion.div
                key={text + i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.04 }}
              >
                <h1>{text}</h1>
              </motion.div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}
