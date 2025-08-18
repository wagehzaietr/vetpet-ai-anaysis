"use client";
import React from "react";
import { cn } from "@/lib/utils";

import { motion, type Variants } from "framer-motion";
import {  useTranslations } from "next-intl";
import Image from "next/image";
import { ArrowRight, Play } from "lucide-react";
import { Spotlight } from "./ui/Spotlight";
import HowItWorks from "./How-to-use";

export function HeroSectionOne() {
  const t = useTranslations();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative overflow-hidden">
    

        <Spotlight
        className="-top-40 right-0 md:-top-20 md:left-20"
        fill="white"
        />
      

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16"
        >
          {/* Enhanced Content Section */}
          <div className="relative z-10 max-w-xl lg:max-w-none">
            {/* Floating Badge */}

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="mt-8 text-5xl pt-12 text-center md:text-start font-bold leading-[1.1] text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white"
            >
              <span className="text-white">
                <span className="bg-gradient-to-r from-primary to bg-green-400 bg-clip-text text-transparent">{t("HomePage.title")}</span>
                {t("HomePage.heading")}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="mt-6 text-lg leading-relaxed text-white/70 text-center md:text-start "
            >
              {t("HomePage.description")}
            </motion.p>

            {/* Enhanced Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6"
            >
              {/* Primary CTA */}
              <button
                className="group relative overflow-hidden rounded-2xl bg-primary p-[1px] shadow-xl transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-primary/30"
                aria-label="Get started with AI website builder"
              >
                <div className="relative flex items-center justify-center gap-2 rounded-[15px] px-8 py-4 font-semibold text-primary-foreground transition-all duration-300">
                  <span>{t("HomePage.button-text")}</span>
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>

                {/* Glow effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary to-secondary opacity-0 blur transition-opacity duration-300 group-hover:opacity-30" />
              </button>

              {/* Secondary CTA */}
              <button
                className="group flex items-center justify-center gap-3 rounded-2xl border border-border bg-white/90 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:bg-white hover:shadow-lg dark:border-border dark:bg-white dark:text-foreground"
                aria-label="Watch demo video"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground transition-transform duration-300 group-hover:scale-110">
                  <Play
                    className="h-4 w-4 translate-x-0.5"
                    fill="currentColor"
                  />
                </div>
                <span>{t("HomePage.button-link")}</span>
              </button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={itemVariants}
              className="mt-12 flex items-center gap-8 text-sm text-slate-500 dark:text-slate-400"
            >
              <div className="flex items-center gap-2">
                <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-2">
                <div
                  className="h-2 w-2 rounded-full bg-secondary animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />
                <span>Setup in 2 Minutes</span>
              </div>
            </motion.div>
          </div>

          {/* Enhanced Image Section */}
          <motion.div variants={itemVariants} className="relative lg:ml-8">
            {/* Main container with glassmorphism */}
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/20 bg-white/80 p-3 shadow-2xl backdrop-blur-sm dark:border-white/10 dark:bg-white/90">
              {/* Inner frame */}
              <div className="overflow-hidden rounded-[1.25rem] border border-slate-200/60 bg-white shadow-inner">
                <div className="relative">
                  <Image
                    src="/hero-img.png"
                    alt="AI-powered website builder interface showing modern landing page templates"
                    className="h-auto w-full object-cover transition-transform duration-700 hover:scale-105"
                    height={900}
                    width={900}
                    loading="eager"
                    priority
                  />

                </div>
              </div>
            </div>


          </motion.div>
        </motion.div>
      </div>
   
    </div>
  );
}
