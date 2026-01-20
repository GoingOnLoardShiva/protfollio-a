"use client";
import React from "react";
import { motion } from "framer-motion";

const containerVars = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const textReveal = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function ContactPage() {
  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVars}
      className="min-h-screen bg-[#0a0a0a] text-white px-6 md:px-16 py-24 flex flex-col lg:flex-row gap-16"
    >
      {/* LEFT SIDE: POWERFUL TYPOGRAPHY */}
      <div className="w-full lg:w-3/5 flex flex-col justify-between">
        <div>
          <motion.div variants={textReveal} className="flex items-center gap-3 mb-8">
            <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-orange-500 uppercase tracking-widest text-sm font-bold">Available for Projects</span>
          </motion.div>

          <h1 className="text-[14vw] lg:text-[10vw] font-black leading-[0.85] tracking-tighter uppercase italic">
            <motion.span variants={textReveal} className="block">Have an</motion.span>
            <motion.span variants={textReveal} className="block text-transparent [text-stroke:1px_rgba(255,255,255,0.4)]">Idea?</motion.span>
            <motion.span variants={textReveal} className="block text-orange-500">Let's talk.</motion.span>
          </h1>
        </div>

        {/* SOCIAL LINKS WITH HOVER EFFECTS */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-8">
          {["LinkedIn", "GitHub", "Twitter", "Instagram"].map((social) => (
            <motion.a
              key={social}
              href="#"
              variants={textReveal}
              className="text-gray-500 hover:text-white transition-colors flex flex-col group"
            >
              <span className="text-[10px] uppercase mb-1 text-orange-500/50">Follow</span>
              <span className="text-lg font-medium group-hover:translate-x-2 transition-transform duration-300 italic">{social}</span>
            </motion.a>
          ))}
        </div>
      </div>

      {/* RIGHT SIDE: MINIMALIST FORM */}
      <motion.div 
        variants={textReveal}
        className="w-full lg:w-2/5 bg-white/5 p-8 md:p-12 rounded-[2rem] border border-white/10 backdrop-blur-xl"
      >
        <form className="space-y-10">
          <div className="relative group">
            <input 
              type="text" 
              placeholder="YOUR NAME" 
              className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-700 font-bold"
            />
          </div>
          
          <div className="relative group">
            <input 
              type="email" 
              placeholder="YOUR EMAIL" 
              className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-700 font-bold"
            />
          </div>

          <div className="relative group">
            <textarea 
              rows="4"
              placeholder="TELL ME ABOUT YOUR PROJECT" 
              className="w-full bg-transparent border-b border-white/20 py-4 focus:outline-none focus:border-orange-500 transition-colors placeholder:text-gray-700 font-bold resize-none"
            ></textarea>
          </div>

          <button className="relative w-full py-6 bg-orange-500 text-black font-black uppercase tracking-widest overflow-hidden group rounded-xl">
            <span className="relative z-10">Send Message</span>
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
          </button>
        </form>

        <div className="mt-12 space-y-4">
            <p className="text-gray-400 text-sm italic">Direct Contact:</p>
            <p className="text-xl font-bold">hello@ifyouthinkiamher@gmail.com</p>
            <p className="text-xl font-bold">+91 6297704852</p>
        </div>
      </motion.div>
    </motion.div>
  );
}