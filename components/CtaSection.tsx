'use client'
import { motion, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import {  Shield, Clock, Heart,  } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";

const features = [
  { icon: Clock, key: "features.fastResults" },
  { icon: Shield, key: "features.trusted" },
  { icon: Heart, key: "features.free" }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
  }
};


  
export default function CallToActionSection() {
  const t = useTranslations();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 px-3 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-20"></div>
      



      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >

          {/* Main headline */}
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-primary to bg-green-400 bg-clip-text text-transparent">
              {t("ctaSection.titleTop")}
            <br />
             {t("ctaSection.titleBottom")}
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-[15px] px-4 text-text mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            {t("ctaSection.subtitle")}
          </motion.p>

          {/* Features */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-text">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-secondary">{t(`ctaSection.${feature.key}`)}</span>
              </div>
            ))}
          </motion.div>

          {/* Main CTA Button */}
          <motion.button
            variants={itemVariants}
            className="mb-12"
          >
            <Link
             href='/ai-checks'
              prefetch={true}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary to-green-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-xl  hover:shadow-2xl hover:shadow-card/30 transition-all duration-300 overflow-hidden"
            >
              
              <span className="relative z-10">{t("ctaSection.button")}</span>


            </Link>
          </motion.button>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="bg-card hidden sm:block rounded-2xl p-6 max-w-2xl mx-auto shadow-lg shadow-background"
          >
            <p className="text-sm text-secondary mb-4 font-medium">{t("ctaSection.trustBanner")}</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-text">{t("ctaSection.metrics.happyPets")}</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-text">{t("ctaSection.metrics.satisfaction")}</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-text">24/7</div>
                <div className="text-sm text-text">{t("ctaSection.metrics.available")}</div>
              </div>
            </div>
          </motion.div>

          {/* Secondary text */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-text-secondary mt-8 max-w-md mx-auto"
          >
            {t("ctaSection.footerNote")}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}