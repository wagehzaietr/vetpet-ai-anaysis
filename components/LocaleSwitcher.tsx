"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";


export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const otherLocale = locale === "en" ? "ar" : "en";

  function switchLocale() {
    const segments = pathname.split("/");
    segments[1] = otherLocale; 
    router.push(segments.join("/"));
  }

  return (
    <>
<Select onValueChange={switchLocale}>
  <SelectTrigger className="border-white/30 bg-background">
    <SelectValue 
      placeholder={locale === 'ar' ? 'العربية' : 'English'} 
    />
  </SelectTrigger>
  <SelectContent>
    <SelectItem className={locale === 'en' ? 'bg-secondary text-black' : ''} value="en">English</SelectItem>
    <SelectItem className={locale === 'ar' ? 'bg-secondary text-black' : ''} value="ar">Arabic</SelectItem>
  </SelectContent>
</Select>
</>
  );
}
