import { useTranslations } from "next-intl";

import { HeroSectionOne } from "../../components/HeroSection";
import HowItWorks from "@/components/HowItWorksSection";
import FeaturesSection from "@/components/Featuers";
import RiskLevelSection from "@/components/riskLevelsSection";
import TrustSection from "@/components/TrustSection";
import FAQSection from "@/components/FAQSection";
import CallToActionSection from "@/components/CtaSection";
import TestimonialsSection from "@/components/TestmonialsSection";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <main>
      <HeroSectionOne />
      <HowItWorks />
      <FeaturesSection />
      <RiskLevelSection />
      <TrustSection />
      <TestimonialsSection/>
      <FAQSection />
      <CallToActionSection />
    </main>
  );
}
