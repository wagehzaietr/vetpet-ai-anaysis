"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Marquee3D } from "@/components/Marquee3D";
import { useTranslations } from "next-intl";
// Pet-focused testimonials

export default function TestimonialsSection() {
  const t = useTranslations();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-20 px-4  relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-30"></div>

      <div className="max-w-7xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            <span className="bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent">
              {t("testimonials.titleTop")}
              <br />
              {t("testimonials.titleBottom")}
            </span>
          </h2>

          <p className="text-[17px] text-text max-w-3xl mx-auto leading-relaxed mb-8">
            {t("testimonials.subtitle")}
          </p>
        </motion.div>

        {/* 3D Marquee */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Marquee3D />
        </motion.div>
      </div>
    </section>
  );
}
