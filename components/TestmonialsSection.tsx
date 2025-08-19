'use client'
/* eslint-disable @next/next/no-img-element */
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Star } from "lucide-react";
import { Marquee3D } from "@/components/Marquee3D";
import {reviews} from '@/app/data/data'
import { useTranslations } from "next-intl";
// Pet-focused testimonials


const firstRow = reviews.slice(0, Math.ceil(reviews.length / 4));
const secondRow = reviews.slice(Math.ceil(reviews.length / 4), Math.ceil(reviews.length / 2));
const thirdRow = reviews.slice(Math.ceil(reviews.length / 2), Math.ceil(3 * reviews.length / 4));
const fourthRow = reviews.slice(Math.ceil(3 * reviews.length / 4));

const ReviewCard = ({
  img,
  name,
  username,
  body,
  rating,
  petType,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  rating: number;
  petType: string;
}) => {
  return (
    <figure
      className={cn(
        "relative h-fit w-80 cursor-pointer overflow-hidden rounded-2xl border p-6 shadow-lg",
        // light styles
        "border-gray-200 hover:bg-white/90 hover:shadow-xl",
        // dark styles
        "dark:border-gray-700 dark:bg-gray-800/80 dark:hover:bg-gray-800/90",
        "transition-all duration-300"
      )}
    >
      <div className="flex flex-row items-center gap-3 mb-3">
        <img className="rounded-full ring-2 ring-blue-100" width="48" height="48" alt="" src={img} />
        <div className="flex flex-col flex-1">
          <div className="flex items-center gap-2">
            <figcaption className="text-base font-semibold text-gray-900 dark:text-white">
              {name}
            </figcaption>
            <span className="text-lg">{petType}</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{username}</p>
        </div>
      </div>
      
      {/* Star Rating */}
      <div className="flex items-center gap-1 mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      
      <blockquote className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
        "{body}"
      </blockquote>
    </figure>
  );
};

export default function TestimonialsSection() {
  const t = useTranslations();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 px-4  relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0  opacity-30"></div>
      
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
          
          <p className="text-[17px] text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
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