import { useTranslations } from "next-intl";

import { HeroSectionOne } from "../../components/HeroSection";
import HowItWorks from "@/components/How-to-use";
import FeaturesSection from "@/components/Featuers";
import RiskLevelSection from "@/components/riskLevelsSection";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import CallToActionSection from "@/components/CtaSection";
import TestimonialsSection from "@/components/TestmonialsSection";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <>
      <HeroSectionOne />
      <HowItWorks />
      <FeaturesSection />
      <RiskLevelSection />
      <TrustSection />
      <TestimonialsSection/>
      <FAQSection />
      <CallToActionSection buttonText="Start Health Check" buttonLink="/health-check" />
    </>
  );
}
