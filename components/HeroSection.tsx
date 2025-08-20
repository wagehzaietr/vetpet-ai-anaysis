import React from "react";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Spotlight } from "./ui/Spotlight";
import Link from "next/link";

export async function HeroSectionOne() {
  const t = await getTranslations();

  return (
    <div className="relative overflow-hidden">
      <Spotlight />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16" data-animate data-delay="100">
          {/* Enhanced Content Section */}
          <div className="relative z-10 max-w-xl lg:max-w-none">
            {/* Floating Badge */}

            {/* Main Heading */}
            <h1 data-animate data-delay="150" className="mt-8 text-5xl pt-12 text-center md:text-start font-bold leading-[1.1] text-slate-900 sm:text-5xl lg:text-6xl xl:text-7xl dark:text-white">
              <span className="text-white">
                <span className="bg-gradient-to-r from-primary to bg-green-400 bg-clip-text text-transparent">
                  {t("HomePage.title")}
                </span>
                {t("HomePage.heading")}
              </span>
            </h1>

            {/* Description */}
            <p data-animate data-delay="220" className="mt-6 text-lg leading-relaxed text-white/70 text-center md:text-start ">
              {t("HomePage.description")}
            </p>

            {/* Enhanced Action Buttons */}
            <div data-animate data-delay="280" className="mt-10 flex flex-col gap-4 sm:flex-row sm:gap-6">
              {/* Primary CTA */}
              <button
                className="group relative overflow-hidden rounded-2xl bg-primary p-[1px] shadow-xl transition-all duration-300 hover:shadow-2xl hover:ring-2 hover:ring-green-600"
                aria-label="Get started with AI website builder"
              >
                <Link href="/ai-checks">
                <div className="relative flex items-center justify-center gap-2 rounded-[15px] px-8 py-4 font-semibold text-primary-foreground transition-all duration-300">
                  {t("HomePage.button-text")}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
                </Link>
              </button>
            </div>

            {/* Trust Indicators */}
            <div data-animate data-delay="320" className="mt-12 flex items-center gap-8 text-sm text-slate-500 dark:text-slate-400">
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
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div data-animate data-delay="200" className="relative lg:ml-8">
            {/* Main container with glassmorphism */}
            <div className="relative overflow-hidden rounded-[1.75rem] border border-black/20 bg-black/20 p-3 shadow-2xl backdrop-blur-sm dark:border-white/10 dark:bg-white/90">
              {/* Inner frame */}
              <div className="overflow-hidden rounded-[1.25rem] border border-black/30 bg-card shadow-inner">
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
          </div>
        </div>
      </div>
    </div>
  );
}
