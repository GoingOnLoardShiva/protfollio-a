"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const WORDS = ["HELLO", "नमस्ते", "নমস্কার"];

// ⏱ TIMING CONSTANTS (SYNCED)
const LETTER_DURATION = 0.4;
const STAGGER = 0.08;
const WORD_PAUSE = 0.4;

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: STAGGER },
  },
};

const letter = {
  hidden: {
    y: 40,
    opacity: 0,
    filter: "blur(8px)",
  },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: {
      duration: LETTER_DURATION,
      ease: [0.76, 0, 0.24, 1],
    },
  },
};

export default function CinematicPreloader({ onFinish }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const letters = WORDS[index].length;

    // ⏱ total time for this word
    const wordTime =
      (letters - 1) * STAGGER * 1000 +
      LETTER_DURATION * 1000 +
      WORD_PAUSE * 1000;

    if (index < WORDS.length - 1) {
      const nextTimer = setTimeout(() => {
        setIndex((i) => i + 1);
      }, wordTime);

      return () => clearTimeout(nextTimer);
    } else {
      // ⏱ exit after final word
      const exitTimer = setTimeout(() => {
        setOpen(false);
        onFinish?.();
      }, wordTime);

      return () => clearTimeout(exitTimer);
    }
  }, [index, onFinish]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-white text-black"
          exit={{
            y: "-100vh",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          <motion.div
            key={index}
            /* FIX 1: Add 'whitespace-nowrap' so the language doesn't break into two lines */
            className="flex gap-1 md:gap-3 text-4xl md:text-7xl font-semibold tracking-normal whitespace-nowrap"
            variants={container}
            initial="hidden"
            animate="show"
          >
            {/* FIX 2: Use Array.from or Segmenter to handle special characters correctly */}
            {Intl.Segmenter
              ? [...new Intl.Segmenter().segment(WORDS[index])].map((segment, i) => (
                <motion.span key={i} variants={letter}>
                  {segment.segment}
                </motion.span>
              ))
              : WORDS[index].split("").map((c, i) => (
                <motion.span key={i} variants={letter}>
                  {c}
                </motion.span>
              ))
            }
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
