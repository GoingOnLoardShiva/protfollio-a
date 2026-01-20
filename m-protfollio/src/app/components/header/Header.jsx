"use client";
import { Plus, X } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.25, // delay between each word popping in
    },
  },
};
const navItems = [
  { name: "About", link: "/about" },
  { name: "Projects", link: "/projects" },
  { name: "Skills", link: "/skills" },
  { name: "Testimonials", link: "/testimonials" },
  { name: "Contact", link: "/contact" },
];

const word = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showCloseBtn, setShowCloseBtn] = useState(false);

  // Show close button after 1 second when menuOpen = true
  useEffect(() => {
    if (menuOpen) {
      const timer = setTimeout(() => {
        setShowCloseBtn(true);
      }, 1000); // 1 second delay

      return () => clearTimeout(timer);
    } else {
      setShowCloseBtn(false);
    }
  }, [menuOpen]);

  return (
    <div className="flex p-4 items-center justify-between  fixed top-0 left-0 w-full  z-[100] bg-gradient-to-b from-black to-transparent">
      {/* Left */}
      <div className="flex items-center">
        <img src="/R.png" className="w-16" alt="" />
        <div className="text-white text-[16px] grid m-0 leading-[16px] font-mono">
          Hiren <span>Ray</span>
        </div>
      </div>

      {/* Center */}
      <div className="hidden md:flex items-center">
        {[
          { label: "About", link: "/about" },
          { label: "Project", link: "/projects" },
          { label: "Contact", link: "/contact" },
          // { label: "Testimonials", link: "/testimonials" },
        ].map((nav) => (
          <div
            key={nav.label}
            className="text-white text-[16px] font-mono mx-4 font-bold cursor-pointer hover:text-orange-500"
          >
            <a href={nav.link}>{nav.label}</a>
          </div>
        ))}
      </div>

      {/* Right */}
      <div className="flex items-center">
        <a
          href="https://cal.com/hiren-ray/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white text-black p-4 flex cursor-pointer font-bold mr-2 hover:bg-orange-500 hover:text-white transition-colors duration-300 "
        >
          Contact
        </a>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="text-white p-4 flex font-bold cursor-pointer items-center scale-z-200 hover:text-orange-500"
        >
          Menu{" "}
          {menuOpen ? (
            <X className="ml-1 w-5" />
          ) : (
            <Plus className="ml-1 w-5" />
          )}
        </button>
      </div>
      {showCloseBtn && (
        <button
          onClick={() => setMenuOpen(false)}
          className="absolute top-6 right-6 z-60 text-black  hover:text-orange-500 flex items-center cursor-pointer"
        >
          <span className="text-[16px]">Close</span>
          <X className="w-7 h-7 hover:rotate-90 transition-transform duration-300" />
        </button>
      )}

      {/* Animated 500px Side Menu */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Layer 1 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="fixed right-0 top-0 h-full bg-[#FF6B00] z-30 
        w-full sm:w-[400px] lg:w-[500px]"
            />

            {/* Layer 2 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="fixed right-0 top-0 h-full bg-[#111] z-40
        w-full sm:w-[400px] lg:w-[500px]"
            />

            {/* Layer 3 */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="fixed right-0 top-0 h-full bg-[#f3f3f3] z-50 
        w-full sm:w-[400px] lg:w-[500px] p-8 pt-20 
        flex flex-col justify-between"
            >
              {/* TOP MENU ITEMS */}
              <motion.ul
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      delayChildren: 0.5,
                      staggerChildren: 0.15,
                    },
                  },
                }}
                className="text-black text-3xl sm:text-4xl font-bold space-y-6 text-start"
              >
                {navItems.map((nav, i) => (
                  <motion.li
                    key={i}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      show: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="hover:text-orange-500 cursor-pointer"
                  >
                    <a href={nav.link}>{nav.name}</a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* SOCIAL BOTTOM SECTION */}
              <motion.div
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: {
                    transition: {
                      delayChildren: 1,
                      staggerChildren: 0.15,
                    },
                  },
                }}
                className="space-y-3 pb-5"
              >
                <motion.span
                  variants={word}
                  className="font-bold text-[22px] text-orange-500"
                >
                  Social
                </motion.span>

                <motion.div
                  variants={container}
                  className="flex gap-6 font-bold text-black text-lg "
                >
                  <motion.a
                    variants={word}
                    initial={{ color: "#000000" }}
                    whileHover={{
                      color: "#FF6B00",
                      transition: { duration: 0.4, ease: "easeInOut" },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                    href="https://linkedin.com/in/hiren-ray-b34215346"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Linkedin
                  </motion.a>

                  <motion.a
                    variants={word}
                    initial={{ color: "#000000" }}
                    whileHover={{
                      color: "#FF6B00",
                      transition: { duration: 0.5, ease: "easeInOut" },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                    href="https://www.instagram.com/if_you_think_i_am_here/"
                  >
                    Instagram
                  </motion.a>

                  <motion.a
                    variants={word}
                    href="https://www.facebook.com/hirenray008"
                    initial={{ color: "#000000" }}
                    whileHover={{
                      color: "#FF6B00",
                      transition: { duration: 0.6, ease: "easeInOut" },
                    }}
                    whileTap={{ scale: 0.95 }}
                    className="cursor-pointer"
                  >
                    Facebook
                  </motion.a>
                </motion.div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
