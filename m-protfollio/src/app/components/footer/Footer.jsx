"use client";
import React from "react";
import { motion } from "framer-motion";

const footerLinks = [
  {
    title: "Company",
    items: [
      { name: "About", link: "#about" },
      { name: "Projects", link: "#projects" },
      { name: "Skills", link: "#skills" },
      { name: "Testimonials", link: "#testimonials" },
    ],
  },
  {
    title: "Support",
    items: [
      { name: "Help Center", link: "/help" },
      { name: "Privacy Policy", link: "/privacy" },
      { name: "Terms of Use", link: "/terms" },
    ],
  },
  {
    title: "Social",
    items: [
      { name: "Instagram", link: "https://instagram.com/hirenray" },
      { name: "LinkedIn", link: "https://linkedin.com/in/hiren-ray-b34215346" },
      { name: "GitHub", link: "https://github.com/GoingOnLoardShiva" },
      // { name: "Twitter", link: "https://twitter.com/hiren_ray" },
    ],
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
      <div className="grid md:grid-cols-3 gap-12">
        {footerLinks.map((section, i) => (
          <motion.div
            key={section.title}
            custom={i}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeUp}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white/90">
              {section.title}
            </h3>

            <ul className="space-y-2">
              {section.items.map((item) => {
                const isExternal = item.link.startsWith("http");

                return (
                  <motion.li
                    key={item.name}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.18 }}
                    className="cursor-pointer text-white/60 hover:text-orange-400"
                  >
                    <a
                      href={item.link}
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                      className="inline-block py-1"
                      aria-label={`${item.name} link`}
                    >
                      {item.name}
                    </a>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        ))}
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
