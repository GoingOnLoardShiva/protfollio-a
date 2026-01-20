"use client";
import React from "react";
import { motion } from "framer-motion";

const containerVars = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } },
};

export default function AboutPage() {
  return (
    <motion.div 
      initial="hidden" 
      animate="visible" 
      variants={containerVars}
      className="bg-[#050505] text-white overflow-hidden pb-20"
    >
      {/* 1. HERO SECTION: Typography Backdrop */}
      <section className="relative h-screen flex items-center justify-center px-6">
        <h1 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[25vw] font-black text-white/[0.02] uppercase leading-none select-none">
          CREATOR
        </h1>
        
        <div className="relative z-10 text-center">
          <motion.p variants={fadeUp} className="text-orange-500 font-mono tracking-[0.4em] mb-4">
            EST. 2024 / INDIA
          </motion.p>
          <motion.h2 variants={fadeUp} className="text-6xl md:text-9xl font-Poppins font-bold tracking-tighter">
            Hiren <span className="italic text-transparent [text-stroke:2px_white]">Ray</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="mt-8 flex justify-center">
             <div className="w-12 h-[1px] bg-white/30 self-center"></div>
             <p className="px-6 text-gray-400 italic">Building digital emotions through code</p>
             <div className="w-12 h-[1px] bg-white/30 self-center"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. THE "BENTO" BIOGRAPHY: Unique Grid Layout */}
      <section className="px-6 md:px-16 grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-auto">
        
        {/* Large Bio Block */}
        <motion.div 
          variants={fadeUp}
          className="md:col-span-8 bg-white/5 p-10 rounded-[3rem] border border-white/10 hover:bg-white/[0.07] transition-colors"
        >
          <h3 className="text-orange-500 text-sm font-bold uppercase mb-6 tracking-widest">The Story</h3>
          <p className="text-2xl md:text-4xl font-light leading-snug">
            I am a <span className="text-white font-bold italic underline decoration-orange-500">Full-stack Designer</span> who believes that logic and aesthetics shouldn't be separated. I don't just write code; I orchestrate <span className="text-orange-500">user journeys</span>.
          </p>
        </motion.div>

        {/* Small Stats Block */}
        <motion.div 
          variants={fadeUp}
          className="md:col-span-4 bg-orange-500 text-black p-10 rounded-[3rem] flex flex-col justify-between"
        >
          <div className="text-6xl font-black">50+</div>
          <p className="font-bold uppercase tracking-tighter leading-none">Projects<br/>Completed<br/>Globally</p>
        </motion.div>

        {/* Image / Vision Block */}
        <motion.div 
          variants={fadeUp}
          className="md:col-span-4 aspect-square bg-blue-500 rounded-[3rem] overflow-hidden relative group"
        >
           <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-transparent transition-all duration-700"></div>
           <img 
            src="/hirenray.png" 
            className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" 
            alt="About Hiren" 
           />
           <div className="absolute bottom-6 left-6 z-20">
              <p className="text-white font-black text-2xl uppercase italic">Visual Mindset</p>
           </div>
        </motion.div>

        {/* Tech Stack Block */}
        <motion.div 
          variants={fadeUp}
          className="md:col-span-8 bg-white/5 p-10 rounded-[3rem] border border-white/10"
        >
          <h3 className="text-gray-500 text-sm font-bold uppercase mb-8">Mastered Tools</h3>
          <div className="flex flex-wrap gap-4">
            {["Next.js", "Tailwind", "Framer Motion", "Node.js", "PostgreSQL", "Figma", "Three.js"].map((skill) => (
              <span key={skill} className="px-6 py-3 border border-white/20 rounded-full text-sm hover:bg-white hover:text-black transition-all cursor-default">
                {skill}
              </span>
            ))}
          </div>
        </motion.div>

      </section>

      {/* 3. RUNNING TEXT TYPOGRAPHY (The Signature Move) */}
      <div className="mt-32 py-10 border-y border-white/10 flex overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex gap-20 whitespace-nowrap text-[80px] font-black uppercase"
        >
          {[...Array(4)].map((_, i) => (
            <span key={i} className="flex gap-20">
              Design <span className="text-orange-500">×</span> Development <span className="text-orange-500">×</span> Strategy
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}