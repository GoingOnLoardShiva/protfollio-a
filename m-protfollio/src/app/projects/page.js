"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const projects = [
  { id: "01", name: "E-Commerce", desc: "Next.js & Stripe Integration", category: "Web App" },
  { id: "02", name: "Portfolio", desc: "Interactive Framer Motion Experiences", category: "Branding" },
  { id: "03", name: "Blog Engine", desc: "Headless CMS & Markdown", category: "Development" },
];

// Animation Variants
const containerVars = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
};

const itemVars = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function ProjectsPage() {
  const horizontalRef = useRef(null);

  useEffect(() => {
    let lenis;
    let rafId;
    let mounted = true;
    async function setupLenis() {
      const Lenis = (await import("lenis")).default;
      lenis = new Lenis({ duration: 1.4, smooth: true });
      function raf(time) {
        lenis.raf(time);
        if (mounted) rafId = requestAnimationFrame(raf);
      }
      rafId = requestAnimationFrame(raf);
      lenis.on("scroll", (e) => {
        if (!horizontalRef.current || !mounted) return;
        const x = e.scroll * 0.25;
        horizontalRef.current.style.transform = `translateX(-${x}px)`;
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
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVars} 
      className="w-full bg-[#0a0a0a] text-white overflow-hidden"
    >
      {/* 1. HERO SECTION: Bold Typography */}
      <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-20">
        <motion.div variants={itemVars} className="flex items-center gap-4">
          <span className="h-[1px] w-12 bg-orange-500"></span>
          <span className="text-orange-500 uppercase tracking-[0.3em] text-sm font-bold">Selected Works</span>
        </motion.div>

        <motion.h1 
          variants={itemVars}
          className="font-Poppins font-bold text-[12vw] md:text-[8vw] leading-[0.9] mt-8 tracking-tighter"
        >
          EXPLORE <br />
          <span className="text-transparent [text-stroke:1px_rgba(255,255,255,0.3)]">PROJECTS</span>
        </motion.h1>

        <motion.p variants={itemVars} className="mt-10 text-gray-400 max-w-lg text-lg md:text-xl leading-relaxed">
          Crafting digital experiences where <span className="text-white">design meets performance</span>. 
          A showcase of modern web solutions.
        </motion.p>
      </section>

      {/* 2. INTERACTIVE PROJECT LIST SECTION */}
      <section className="px-6 md:px-16 py-20 flex flex-col md:flex-row gap-20">
        
        {/* Left: Animated List */}
        <div className="w-full md:w-1/2">
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              variants={itemVars}
              className="group border-b border-white/10 py-10 flex items-center justify-between cursor-pointer hover:px-4 transition-all duration-500"
            >
              <div className="flex items-start gap-6">
                <span className="text-orange-500 font-mono text-sm mt-2">{proj.id}</span>
                <div>
                  <h3 className="text-3xl md:text-5xl font-bold group-hover:text-orange-500 transition-colors">
                    {proj.name}
                  </h3>
                  <p className="text-gray-500 mt-2 uppercase tracking-widest text-xs">{proj.category}</p>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity text-orange-500 text-3xl">
                →
              </div>
            </motion.div>
          ))}
        </div>

        {/* Right: Floating Mockup with Typography Surround */}
        <div className="w-full md:w-1/2 relative flex justify-center items-center">
          <div className="relative z-10 w-full max-w-[500px] aspect-[4/5] overflow-hidden rounded-3xl border border-white/10">
             <img
              src="/Marketplace-Company-Home-Mobile-mockup_1.avif"
              alt="project showcase"
              className="object-cover w-full h-full scale-110 group-hover:scale-100 transition-transform duration-1000"
            />
          </div>
          {/* Background Decorative Text */}
          <div className="absolute -top-10 -right-10 text-[150px] font-black text-white/[0.03] select-none pointer-events-none">
            WORK
          </div>
        </div>
      </section>

      {/* 3. MARQUEE SECTION (Optimized Horizontal Scroll) */}
      <div className="py-20 bg-orange-500 text-black">
        <div 
          ref={horizontalRef}
          className="flex whitespace-nowrap gap-10 will-change-transform font-black text-6xl md:text-[120px] uppercase italic tracking-tighter"
        >
          {[...Array(6)].map((_, i) => (
            <span key={i} className="flex gap-10">
              FEATURED <span className="text-transparent [text-stroke:2px_black]">PROJECTS</span> •
            </span>
          ))}
        </div>
      </div>

      <footer className="h-[20vh]" />
    </motion.div>
  );
}