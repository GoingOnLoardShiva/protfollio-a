"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

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
      className={`inline-block transition-opacity duration-300 ${
        visible ? "opacity-100" : "opacity-0"
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
      <div className="p-6 md:p-16 lg:py-24 ">
        <span className="text-white bg-orange-500 px-3 py-1 text-lg md:text-2xl rounded">
          Creative
        </span>

        <div className="text-white font-Poppins mt-5 font-bold leading-[1.1] text-[42px] md:text-[80px] lg:text-[120px] grid">
          Web Designer
          <span className="mx-2">
            &{" "}
            <RotatingWord
              items={[
                { text: "Developer", color: "#ff6900" },
                { text: "Programmer", color: "#ff6900" },
                { text: "Coder", color: "#ff6900" },
                { text: "Editor", color: "#ff6900" },
              ]}
              interval={2000}
              className="font-extrabold"
            />
          </span>
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

        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src="/f-img.avif"
            alt="profile"
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
