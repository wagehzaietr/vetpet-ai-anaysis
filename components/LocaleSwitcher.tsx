"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intl";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  // Define available locales
  const otherLocale = locale === "en" ? "ar" : "en";

  function switchLocale() {
    // Replace the first segment of the path with the new locale
    const segments = pathname.split("/");
    segments[1] = otherLocale; 
    router.push(segments.join("/"));
  }

  return (
    <Select
      onValueChange={switchLocale}
    >
      <SelectTrigger className="border-white/20 text-white bg-card">
        <SelectValue  placeholder={locale === 'ar' ? 'العربية' : 'English'} />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className={locale === 'en' ? 'bg-primary text-primary-foreground' : ''}  value="en">English</SelectItem>
        <SelectItem className={locale === 'ar' ? 'bg-primary text-primary-foreground' : ''} value="ar">Arabic</SelectItem>
      </SelectContent>
    </Select>
  );
}
