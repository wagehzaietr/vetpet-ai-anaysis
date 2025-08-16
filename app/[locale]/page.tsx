import { useTranslations } from "next-intl";

import { HeroSectionOne } from "../../components/HeroSection";


export default function Home() {
  const t = useTranslations("HomePage");

  return (
    <>
      <HeroSectionOne />
      </>
  );
}
