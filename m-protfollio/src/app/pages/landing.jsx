"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const sentence = `I’m a Web Application Developer specializing in building fast,
scalable, and user-centered digital products using React, Next.js,
Node.js & MongoDB.`;

// Split into words
const words = sentence.split(" ");

function RotatingWord({ items = [], interval = 2000, className = "" }) {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % items.length);
        setVisible(true);
      }, 200);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  const current = items[index] || { text: "" };
  return (
    <span
      className={`inline-block transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"
        } ${className}`}
      style={{ color: current.color }}
    >
      {current.text}
    </span>
  );
}

export default function Landing() {
  const horizontalRef = useRef(null);
  // const scrolingMovementText = useRef(null);

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
    <div className="w-full  overflow-hidden py-20">
      {/* HERO */}
      <div className="p-6 md:p-16 lg:py-24 relative overflow-hidden">

        {/* 1. BACKGROUND FLOATING TEXT (The "Design" Watermark) */}
        <div className="absolute top-0 right-0 -z-10 select-none pointer-events-none">
          <h2 className="text-[20vw] font-black text-white/[0.03] leading-none uppercase italic">
            Design
          </h2>
        </div>

        {/* 2. THE BADGE (Innovative "Creative" Tag) */}
        <div className="flex items-center gap-4 mb-6">
          <span className="text-white bg-orange-500 px-4 py-1 text-sm md:text-xl font-bold tracking-[0.2em] uppercase rounded-full shadow-[4px_4px_0px_0px_rgba(255,255,255,0.2)]">
            Creative
          </span>
          <div className="h-[1px] w-20 bg-orange-500/50 hidden md:block"></div>
        </div>

        {/* 3. MAIN TYPOGRAPHY STACK */}
        <div className="text-white font-Poppins font-black leading-[0.9] text-[50px] md:text-[100px] lg:text-[140px] flex flex-col tracking-tighter">

          {/* Line 1: Solid Text */}
          <motion.span
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="block"
          >
            WEB <span className="text-orange-500 italic">DESIGNER</span>
          </motion.span>

          {/* Line 2: Outlined & Dynamic Text */}
          <div className="flex items-center gap-x-4 md:gap-x-8 flex-wrap">
            <span className="text-transparent [text-stroke:1px_rgba(255,255,255,0.5)] md:[text-stroke:2px_rgba(255,255,255,0.5)]">
              &
            </span>

            <div className="relative inline-block">
              <RotatingWord
                items={[
                  { text: "DEVELOPER", color: "#ff6900" },
                  { text: "PROGRAMMER", color: "#ff6900" },
                  { text: "CODER", color: "#ff6900" },
                  { text: "EDITOR", color: "#ff6900" },
                ]}
                interval={2000}
                className="font-black drop-shadow-[0_0_15px_rgba(255,105,0,0.3)]"
              />

              {/* Decorative underline for the rotating word */}
              <div className="absolute -bottom-2 left-0 w-full h-[4px] md:h-[8px] bg-orange-500/20 rounded-full overflow-hidden">
                <motion.div
                  animate={{ x: ["-100%", "100%"] }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="w-1/2 h-full bg-orange-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* 4. SUB-CAPTION (Professional Detail) */}
        <div className="mt-10 max-w-md">
          <p className="text-gray-400 text-lg md:text-xl leading-relaxed border-l-2 border-orange-500 pl-6 italic font-light">
            Crafting <span className="text-white font-medium">unforgettable digital emotions</span> through pixel-perfect code and bold typography.
          </p>
        </div>
      </div>

      {/* ABOUT SECTION */}
      <div className="flex flex-col gap-10 md:flex-row justify-between items-center px-6 md:px-16 py-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          transition={{ staggerChildren: 0.08 }}
          className="text-white font-Poppins text-[18px] md:text-[20px] leading-[30px] md:w-1/2"
        >
          <motion.p className="flex flex-wrap">
            {words.map((word, index) => (
              <motion.span
                key={index}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="mr-2 inline-block"
              >
                {word}
              </motion.span>
            ))}
          </motion.p>

          {/* LIST ANIMATIONS (Optional) */}
          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.15 }}
            className="mt-6 space-y-2"
          >
            {[
              "UI/UX Designer",
              "Frontend Developer",
              "Backend Developer",
              "FullStack Developer",
              "React Native Developer",
            ].map((item, i) => (
              <motion.li
                key={i}
                className="text-orange-500"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 },
                }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                {item}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        <div className="w-full md:w-1/2 flex justify-center md:absolute md:left-[55%] top-[5%]">
          <div className="relative w-full max-w-[400px] md:max-w-[500px] aspect-[4/5] group">

            {/* 1. VERTICAL SIDE TEXT (Professional Typography) */}
            <div className="absolute -left-8 top-10 hidden md:block select-none">
              <span className="text-gray-500 uppercase tracking-[10px] text-sm [writing-mode:vertical-lr] font-light">
                Hiren Ray — Portfolio
              </span>
            </div>

            {/* The Main Image */}
            <Image
              src="/hirenray.png"
              alt="profile"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-2xl object-cover z-10 grayscale hover:grayscale-0 transition-all duration-500"
            />

            {/* 2. OVERLAY TYPOGRAPHY (Floating Minimalist) */}
            <div className="absolute bottom-10 -right-0 z-20 flex flex-col items-end">
              <div className="bg-orange-500 text-black font-bold text-[10px] px-2 py-1 mb-2 rounded-full tracking-tighter">
                AVAILABLE FOR WORK
              </div>
              <h3 className="text-white text-5xl font-black leading-none text-right">
                HIREN<br />
                <span className="text-orange-500">RAY.</span>
              </h3>
              <p className="text-gray-400 text-xs italic mt-2 border-r-2 border-orange-500 pr-3">
                Owner & Fullstack Dev
              </p>
            </div>

            {/* 3. DECORATIVE BACKGROUND SHAPE */}
            <div className="absolute inset-0 border-2 border-orange-500 rounded-2xl translate-x-4 translate-y-4 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500"></div>

          </div>
        </div>
      </div>

      {/* LENIS HORIZONTAL SCROLL */}
      <div className="mt-16 mx-auto max-w-6xl overflow-hidden">
        <div
          ref={horizontalRef}
          className="text-white font-Poppins px-12 mt-24 text-[32px] md:text-[64px] flex gap-20 whitespace-nowrap will-change-transform"
        >
          {Array(5)
            .fill("New Project's")
            .map((text, i) => (
              <motion.div
                key={text}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.04 }}

              >
                <h1 key={i}>{text}</h1>
              </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
}
