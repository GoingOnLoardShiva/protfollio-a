"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import FooterA from "./components/footer/FooterA";
import Landing from "./pages/landing";
import Working from "./pages/Working";
import Skils from "./pages/Skils";
import Testimonial from "./pages/Testimonial";

import TypographyPreloader from "./pages/CinematicPreloader";
import PageTransition from "./pages/PageTransition";

export default function Page() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 4000); // match preloader duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {loading ? (
        // ✅ PRELOADER FIRST
        <TypographyPreloader key="preloader" />
      ) : (
        // ✅ MAIN SITE WITH PAGE WIPE
        <PageTransition key="content">
          <div className="bg-[#131313] overflow-x-hidden">
            <Header />
            <Landing />
            <Working />
            <Skils />
            <Testimonial />
            <FooterA />
            <Footer />
          </div>
        </PageTransition>
      )}
    </AnimatePresence>
  );
}
