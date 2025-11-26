"use client";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Skils() {
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
    <div className="overflow-hidden">
      <div
        ref={horizontalRef}
        className="text-white font-Poppins px-8 mt-24 text-[32px] md:text-[64px] flex gap-20 whitespace-nowrap will-change-transform"
      >
        {Array(10)
          .fill("My Skill")
          .map((text, i) => (
            <div key={i} className="flex items-center gap-32">
                <h1>{text}</h1>
              <img
                src="/R.png"
                alt="skill icon"
                className="w-24 h-24 object-contain"
              />
              
            </div>
          ))}
      </div>
    </div>
  );
}
