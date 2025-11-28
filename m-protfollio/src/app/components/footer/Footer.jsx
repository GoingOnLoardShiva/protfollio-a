"use client";
import React from "react";
import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Company",
    items: ["About", "Projects", "Skills", "Testimonials"],
  },
  {
    title: "Support",
    items: ["Help Center", "Privacy Policy", "Terms of Use"],
  },
  {
    title: "Social",
    items: ["Instagram", "LinkedIn", "GitHub", "Twitter"],
  },
];

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6 },
  }),
};

// Footer Component
export default function Footer() {
  return (
    <footer className="relative mt-32 bg-black text-white px-6 md:px-20 pt-24 pb-12 overflow-hidden">

      {/* Top Divider Line */}
      <motion.div
        initial={{ width: 0 }}
        whileInView={{ width: "100%" }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="h-[1px] bg-white/10 mx-auto mb-12"
      />

      {/* Footer Grid */}
      <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">

        {footerLinks.map((section, i) => (
          <motion.div
            key={section.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white/90">{section.title}</h3>

            <ul className="space-y-2">
              {section.items.map((item, idx) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 6, color: "#fb923c" }} // Orange hover
                  transition={{ duration: 0.2 }}
                  className="cursor-pointer text-white/60 hover:text-orange-400"
                >
                  {item}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        ))}

        {/* Brand Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className="md:col-span-3 flex flex-col items-center mt-10"
        >
          <h2 className="text-[38px] md:text-[56px] font-Poppins font-bold tracking-tight">
            Hiren Ray
          </h2>
          <p className="text-white/60 mt-2 text-center md:w-1/2">
            Creating beautiful digital experiences with performance, precision
            & modern design systems.
          </p>
        </motion.div>
      </div>

      {/* Scroll Animated Tagline (Marquee Style) */}
      <div className="mt-20 overflow-hidden">
        <motion.div
          initial={{ x: "0%" }}
          animate={{ x: "-50%" }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="flex gap-12 text-[28px] md:text-[40px] font-Poppins whitespace-nowrap opacity-20"
        >
          {Array(10)
            .fill("Creative Developer • UI/UX Designer • React Expert •")
            .map((t, i) => (
              <span key={i}>{t}</span>
            ))}
        </motion.div>
      </div>

      {/* Bottom Line */}
      <div className="text-center mt-16 text-white/40 text-sm">
        © {new Date().getFullYear()} Hiren Ray. All rights reserved.
      </div>
    </footer>
  );
}
