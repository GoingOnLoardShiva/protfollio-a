"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const skills = [
  { name: "HTML", percent: 95 },
  { name: "CSS / Tailwind", percent: 92 },
  { name: "JavaScript", percent: 90 },
  { name: "React / Next.js", percent: 93 },
  { name: "Node.js / Express", percent: 85 },
  { name: "MongoDB", percent: 82 },
  { name: "TypeScript", percent: 80 },
  { name: "UI/UX", percent: 88 },
];

// Page-level animation
const pageVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.06 } } };
const textVariant = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };

function SkillBar({ name, percent, delay = 0 }) {
  return (
    <motion.div initial="hidden" animate="visible" variants={pageVariants} className="w-full">
      <motion.div variants={textVariant} className="flex justify-between mb-2">
        <span className="text-white font-semibold">{name}</span>
        <span className="text-orange-500 font-mono">{percent}%</span>
      </motion.div>

      <div className="w-full bg-white/6 rounded-full h-4 overflow-hidden">
        <motion.div
          className="h-full bg-linear-to-r from-orange-400 to-orange-600"
          initial={{ width: 0 }}
          whileInView={{ width: `${percent}%` }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.6 }}
          aria-valuenow={percent}
          role="progressbar"
        />
      </div>
    </motion.div>
  );
}

export default function Skils() {
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
      const speed = 0.28;

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
    <motion.div initial="hidden" animate="visible" variants={pageVariants} className="min-h-screen py-20 px-6 md:px-16">
      {/* HERO */}
      <header className="mx-auto ">
        <motion.span variants={textVariant} className="text-white bg-orange-500 px-3 py-1 text-lg md:text-2xl rounded">
          Skills
        </motion.span>
        <motion.h1 variants={textVariant} className="mt-6 text-white font-Poppins text-[40px] md:text-[72px] font-bold leading-tight">
          Tools & Expertise
        </motion.h1>
        <motion.p variants={textVariant} className="mt-4 text-white/80 md:w-3/5 leading-relaxed">
          I build beautiful and performant web user interfaces and APIs.
          Below are the technologies I work with and how confident I am with
          them. Each bar animates on scroll for a subtle and professional feel.
        </motion.p>
      </header>

      <main className="mt-12 mx-auto max-w-6xl grid md:grid-cols-2 gap-8 items-start">
        <section>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            transition={{ staggerChildren: 0.08 }}
            className="space-y-6"
          >
            {skills.map((s, i) => (
              <SkillBar key={s.name} name={s.name} percent={s.percent} delay={i * 0.06} />
            ))}
          </motion.div>
        </section>

        <aside className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="bg-white/4 rounded-2xl p-6"
          >
            <h2 className="text-white font-semibold text-lg">Overview</h2>
            <p className="text-white/80 mt-2 leading-relaxed">
              I focus on building robust, accessible, and high-performing
              experiences — whether that’s a user-facing UI or a backend API.
              I try to complement micro-interactions with simplicity and
              clarity.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="bg-white/4 rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold">Achievements</h3>
            <ul className="list-disc pl-5 mt-3 text-white/80 space-y-2">
              <li>Led React & Next.js implementation for multiple projects</li>
              <li>Built accessible UI components & design systems</li>
              <li>Optimized apps for performance and SEO</li>
            </ul>
          </motion.div>
        </aside>
      </main>

      {/* Horizontal marquee using Lenis + Framer Motion */}
      <div className="mt-16 mx-auto max-w-6xl overflow-hidden">
        <div
          ref={horizontalRef}
          className="text-white font-Poppins px-6 md:px-12 text-[28px] md:text-[48px] flex gap-10 whitespace-nowrap will-change-transform"
        >
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex gap-6 items-center">
                {[
                  "HTML",
                  "CSS",
                  "JS",
                  "React",
                  "Next",
                  "Node",
                  "MongoDB",
                ].map((label, idx) => (
                  <motion.div
                    key={label + idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.05 }}
                    className="px-4 py-2 bg-white/5 rounded-xl border border-white/6 flex items-center gap-3"
                  >
                    {/* <img
                      src="/R.png"
                      alt={`${label} icon`}
                      className="w-8 h-8 object-contain"
                    /> */}
                    <span className="text-white/90 font-semibold">{label}</span>
                  </motion.div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
}

