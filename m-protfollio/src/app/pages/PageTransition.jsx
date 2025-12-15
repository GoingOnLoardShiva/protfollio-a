"use client";

import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

export default function PageTransition({ children }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div key={pathname} className="relative overflow-hidden">
        {/* Simple Curved Wipe Overlay */}
        <motion.div
          className="fixed inset-0 z-[999] bg-white"
          style={{
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            borderBottomLeftRadius: "100% 80%",
            borderBottomRightRadius: "100% 80%",
          }}
          initial={{ y: 0 }}
          animate={{ y: "-100%" }}
          exit={{ y: 0 }}
          transition={{
            duration: 0.9,
            ease: [0.76, 0, 0.24, 1],
          }}
        />

        {/* Page Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          style={{
            borderTopLeftRadius: "0",
            borderTopRightRadius: "0",
            borderBottomLeftRadius: "100% 80%",
            borderBottomRightRadius: "100% 80%",
          }}
          transition={{
            delay: 0.35,
            duration: 0.6,
            ease: "easeOut",
          }}
        >
          {children}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
