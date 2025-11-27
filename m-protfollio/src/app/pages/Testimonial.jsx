"use client";
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const testimonials = [
  {
    name: "Jane Doe",
    role: "Product Manager, Acme Inc.",
    avatar: "/f-img.avif",
    quote:
      "Working with them was a great experience — they delivered a well-structured UI, excellent performance, and clean code.",
  },
  {
    name: "John Smith",
    role: "CTO, StartupXYZ",
    avatar: "/Hopstack-website_1.avif",
    quote:
      "Our web app became more stable and faster after their redesign. They have a strong attention to performance and accessibility.",
  },
  {
    name: "Sara Lee",
    role: "Founder, MarketPlace Co.",
    avatar: "/Marketplace-Company-Home-Mobile-mockup_1.avif",
    quote:
      "They approached the product with clarity and professionalism. Delivery was on time and the user experience vastly improved.",
  },
];

// Page-level animation variants (open-time animation)
const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const textVariant = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const cardVariants = {
  enter: { opacity: 0, y: 12 },
  center: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -10 },
};

export default function Testimonial() {
  const horizontalRef = useRef(null);
  const [index, setIndex] = useState(0);

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
  // Autoplay carousel
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);
  const next = () => setIndex((i) => (i + 1) % testimonials.length);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={pageVariants}
      className="min-h-screen py-20 px-6 md:px-16"
    >
      {/* HERO */}
      <header className="mx-auto ">
        <motion.span
          variants={textVariant}
          className="text-white bg-orange-500 px-3 py-1 text-lg md:text-2xl "
        >
          Trusted Client's
        </motion.span>
        <motion.h1
          variants={textVariant}
          className="mt-6 text-white font-Poppins text-[40px] md:text-[72px] font-bold leading-tight"
        >
          What people say about my work
        </motion.h1>
        <motion.p
          variants={textVariant}
          className="mt-4 text-white/80 md:w-3/5 leading-relaxed"
        >
          Feedback from clients and collaborators — short and to the point. I
          value honest reviews and use them to continuously improve my craft.
        </motion.p>
      </header>

      <main className="mt-12 mx-auto max-w-6xl gap-6 items-start">
        <div className="relative flex flex-col items-center">
          <div className="w-full md:w-3/5">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: -8 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white/6 backdrop-blur-sm p-8 -3xl shadow-lg"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`Testimonial by ${testimonials[index].name}`}
                >
                  <div className="flex items-start gap-6 md:gap-8">
                    <img
                      src={testimonials[index].avatar}
                      alt={`${testimonials[index].name} avatar`}
                      className="w-20 h-20 -2xl object-cover"
                    />
                    <div>
                      <h3 className="text-white font-semibold text-xl">
                        {testimonials[index].name}
                      </h3>
                      <p className="text-white/70 text-sm">
                        {testimonials[index].role}
                      </p>
                      <blockquote className="mt-4 text-white/80 text-lg leading-relaxed">
                        “{testimonials[index].quote}”
                      </blockquote>
                      <div className="mt-4 flex items-center gap-2 text-orange-400">
                        {Array(5)
                          .fill(0)
                          .map((_, idx) => (
                            <svg
                              key={idx}
                              width="18"
                              height="18"
                              viewBox="0 0 24 24"
                              fill="currentColor"
                              aria-hidden
                            >
                              <path d="M12 .587l3.668 7.431 8.2 1.193-5.934 5.786 1.4 8.166L12 18.896l-7.334 3.854 1.4-8.166L.132 9.211l8.2-1.193z" />
                            </svg>
                          ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Controls */}
            <div className="mt-6 flex justify-center gap-4">
              <button
                onClick={prev}
                aria-label="Previous testimonial"
                className="bg-white/6 hover:bg-white/8 px-4 py-2 -full text-white"
              >
                ‹
              </button>
              <div className="flex items-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIndex(i)}
                    aria-label={`Go to testimonial ${i + 1}`}
                    className={`w-3 h-3 -full ${
                      i === index ? "bg-orange-400" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                aria-label="Next testimonial"
                className="bg-white/6 hover:bg-white/8 px-4 py-2 -full text-white"
              >
                ›
              </button>
            </div>
          </div>
        </div>

        {/* <aside className="w-full md:w-2/5">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="bg-white/4 -2xl p-6"
          >
            <h2 className="text-white font-semibold text-lg">
              Clients & Partners
            </h2>
            <p className="text-white/80 mt-2 leading-relaxed">
              A selection of the teams and companies I’ve worked with. I partner
              closely with product and engineering to ship reliable digital
              experiences.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="bg-white/4 -2xl p-6 mt-6"
          >
            <h3 className="text-white font-semibold">Highlights</h3>
            <ul className="list-disc pl-5 mt-3 text-white/80 space-y-2">
              <li>Consistent, accessible UI & UX decisions</li>
              <li>Improved performance and SEO across major projects</li>
              <li>Delivered polished, production-ready features</li>
            </ul>
          </motion.div>
        </aside> */}
      </main>
      <div className="or-review grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 py-20 px-6 md:px-36">
        {[1, 2, 3].map((item) => (
          <motion.div
            key={item}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="bg-white/5 backdrop-blur-md rounded-2xl p-6"
          >
            <h3 className="text-white font-semibold">Shopbox</h3>

            <ul className="list-disc pl-5 mt-3 text-white/80 space-y-2">
              <li>
                They approached the product with clarity and professionalism.
                Delivery was on time and the user experience vastly improved.
              </li>
            </ul>

            <div className="mt-4 flex items-center gap-3 text-orange-400">
              <img
                src="/f-img.avif"
                className="w-10 h-10 object-cover rounded-full"
              />
              <div>
                <h3 className="text-white">Robert Jhon</h3>
                <p className="text-[12px] text-white/80">CEO of Shopbox</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Horizontal marquee with logos / quotes */}
      <div className="mt-16 mx-auto max-w-6xl overflow-hidden">
        <div
          ref={horizontalRef}
          className="text-white font-Poppins px-6 md:px-12 text-[24px] md:text-[32px] flex gap-8 whitespace-nowrap will-change-transform items-center"
        >
          {Array(5)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="flex gap-6 items-center w-fit">
                {[
                  "Acme",
                  "StartupXYZ",
                  "MarketPlace",
                  "StudioA",
                  "AgencyB",
                ].map((label, idx) => (
                  <motion.div
                    key={label + idx}
                    initial={{ opacity: 0, y: 8 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: idx * 0.04 }}
                    className="px-4 py-2 bg-white/5 -xl border border-white/6 flex items-center gap-3"
                  >
                    {/* <img src="/R.png" alt={`${label} logo`} className="w-8 h-8 object-contain" /> */}
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
