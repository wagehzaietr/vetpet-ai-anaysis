import { Shield, Clock, Heart } from "lucide-react";
import Link from "next/link";
import { getTranslations } from "next-intl/server";

const features = [
  { icon: Clock, key: "features.fastResults" },
  { icon: Shield, key: "features.trusted" },
  { icon: Heart, key: "features.free" }
];

 


  
export default async function CallToActionSection() {
  const t = await getTranslations();

  return (
    <section className="py-20 px-3 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-20"></div>
      



      <div className="max-w-6xl mx-auto relative text-center" data-animate data-delay="100">

          {/* Main headline */}
          <h2 data-animate data-delay="150" className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            <span className="bg-gradient-to-r from-primary to bg-green-400 bg-clip-text text-transparent">
              {t("ctaSection.titleTop")}
            <br />
             {t("ctaSection.titleBottom")}
            </span>
          </h2>

          {/* Subheading */}
          <p data-animate data-delay="250" className="text-[15px] px-4 text-text mb-8 max-w-3xl mx-auto leading-relaxed">
            {t("ctaSection.subtitle")}
          </p>

          {/* Features */}
          <div data-animate data-delay="300" className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-text">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium text-secondary">{t(`ctaSection.${feature.key}`)}</span>
              </div>
            ))}
          </div>

          {/* Main CTA Button */}
          <div data-animate data-delay="350" className="mb-12">
            <Link
             href='/ai-checks'
              prefetch={true}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary to-green-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-xl  hover:shadow-2xl hover:shadow-card/30 transition-all duration-300 overflow-hidden"
            >
              
              <span className="relative z-10">{t("ctaSection.button")}</span>


            </Link>
          </div>

          {/* Trust indicators */}
          <div data-animate data-delay="400" className="bg-card hidden sm:block rounded-2xl p-6 max-w-2xl mx-auto shadow-lg shadow-background">
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
          </div>

          {/* Secondary text */}
          <p data-animate data-delay="450" className="text-sm text-text-secondary mt-8 max-w-md mx-auto">
            {t("ctaSection.footerNote")}
          </p>
        
      </div>
    </section>
  );
}