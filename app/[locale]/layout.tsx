import type { Metadata } from "next";
import { Geist, Geist_Mono, Tajawal } from "next/font/google";
import "./globals.css";
import {NextIntlClientProvider, hasLocale} from 'next-intl';
import {notFound} from 'next/navigation';
import {routing} from '@/i18n/routing';
import { HeroHeader } from "../../components/Header";
import  FooterSection  from '@/components/Footer';
import ScrollToTop from "@/components/ui/ScrollToTop";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Arabic-capable font for RTL locales
const tajawal = Tajawal({
  variable: "--font-arabic",
  subsets: ["arabic", "latin"],
  weight: ["200","300","400","500","700","800","900"],
});

// Locale-aware SEO metadata
export async function generateMetadata({
  params
}: {
  params: { locale: string }
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === 'ar';
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const siteName = 'PetCare AI';
  const titleDefault = isAr
    ? 'PetCare AI — مساعد بيطري بالذكاء الاصطناعي'
    : 'PetCare AI — AI Veterinary Assistant';
  const description = isAr
    ? 'مساعد بيطري ذكي للحيوانات الأليفة في سوريا: تحليل أعراض وسلوك وصور مع دعم العربية والإنجليزية.'
    : 'AI veterinary assistant for pet owners in Syria: analyzes symptoms, behavior, and images with AR/EN support.';

  return {
    metadataBase: new URL(siteUrl),
    applicationName: siteName,
    title: {
      default: titleDefault,
      template: `%s | ${siteName}`
    },
    description,
    keywords: isAr
      ? ['بيطري', 'ذكاء اصطناعي', 'سوريا', 'كلاب', 'قطط', 'صحة الحيوانات']
      : ['veterinary', 'ai', 'syria', 'dogs', 'cats', 'pet health', 'image analysis'],
    openGraph: {
      type: 'website',
      url: `/${locale}`,
      siteName,
      title: titleDefault,
      description,
      locale: isAr ? 'ar_SY' : 'en_US',
      images: ['/headerlogo.png']
    },
    twitter: {
      card: 'summary_large_image',
      title: titleDefault,
      description,
      images: ['/headerlogo.png']
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true
      }
    },
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        ar: '/ar'
      }
    },
    icons: {
      icon: '/favicon.ico',
      shortcut: '/favicon.ico',
      apple: '/headerlogo.png'
    },
    authors: [{ name: 'PetCare AI Team' }],
    creator: 'PetCare AI',
    publisher: 'PetCare AI'
  };
}

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: {locale: string};
}) {
  const {locale} = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  const dir = locale === 'ar' ? 'rtl' : 'ltr'
  return (
    <html lang={locale} dir={dir} className={`${geistSans.variable} ${geistMono.variable} ${tajawal.variable}`}>
      <body className="font-sans">
        <NextIntlClientProvider>
        <HeroHeader/>
        <ScrollToTop/>
        <main>
        {children}
      </main>
      <FooterSection />
          </NextIntlClientProvider>
      </body>
    </html>
  );
}

