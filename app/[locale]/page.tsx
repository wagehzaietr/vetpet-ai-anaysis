import { useTranslations } from "next-intl";

import { HeroSectionOne } from "../../components/HeroSection";
import HowItWorks from "@/components/How-to-use";
import Featuers from "@/components/Featuers";

export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <>
      <HeroSectionOne />
      <HowItWorks />
      <Featuers />
    </>
  );
}
