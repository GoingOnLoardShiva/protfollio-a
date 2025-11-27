"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef } from "react";

const pages = [
  {
    id: 1,
    tag: "Rafiki",
    title: "The guide that keeps everything moving",
    desc: "Your life coach. Your quiet guide through work and change. Always listening. Always learning. Always on your side.",
    button: "Learn more",
    image: "/rafiki.png",
  },
  {
    id: 2,
    tag: "Mentor",
    title: "Helping you grow with confidence",
    desc: "Your personal mentor helps you develop clarity and mindset through every challenge.",
    button: "Discover",
    image: "/mentor.png",
  },
  {
    id: 3,
    tag: "Hero",
    title: "Strong support when you need it most",
    desc: "Your reliable partner through obstacles and opportunities.",
    button: "Explore",
    image: "/hero.png",
  },
];

export default function StackScroll() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-black">

      <div className="sticky top-0 h-screen flex justify-center items-center">
        {pages.map((page, index) => {
          const start = index * (1 / pages.length);
          const end = start + 1 / pages.length;

          // 🔥 MAIN CARD MOTIONS
          const y = useTransform(
            scrollYProgress,
            [start, end],
            [700, 0] // comes from bottom
          );

          const scale = useTransform(
            scrollYProgress,
            [start, end],
            [0.85, 1] // zoom in
          );

          const opacity = useTransform(
            scrollYProgress,
            [start, end],
            [0.4, 1] // fade in
          );

          // 🔥 NEXT CARD PEEKING EFFECT
          const peekY = 0 * (pages.length + index); // how much stacking gap

          return (
            <motion.div
              key={page.id}
              style={{
                y,
                scale,
                opacity,
                zIndex: 50 + index,
                translateY: peekY,
              }}
              className="absolute  bg-black rounded-3xl shadow-2xl border border-white/10
              p-8 md:p-14 flex flex-col md:flex-row gap-10 w-[90%] max-w-full
              transition-all duration-500"
            >
              {/* IMAGE */}
              <div className="w-full md:w-1/2 flex justify-center">
                <img
                  src={page.image}
                  alt={page.title}
                  className="rounded-2xl w-full h-full object-cover"
                />
              </div>

              {/* CONTENT */}
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <span className="text-gray-500 font-semibold text-lg">
                  {page.tag}
                </span>

                <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight mt-2">
                  {page.title}
                </h2>

                <p className="text-white mt-4 text-lg leading-relaxed">
                  {page.desc}
                </p>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 bg-white text-black px-6 py-3 rounded-full w-fit font-semibold"
                >
                  {page.button}
                </motion.button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
