'use client'
import { Card, CardContent } from "@/components/ui/card";
import { Shield, BookOpen, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.1 }
  })
};

const iconMap = {
  guidelines: { icon: Shield, bg: "bg-blue-100", color: "text-blue-600" },
  sources: { icon: BookOpen, bg: "bg-green-100", color: "text-green-600" },
  limitations: { icon: AlertCircle, bg: "bg-amber-100", color: "text-amber-600" }
};

function TrustCard({ type, title, children, index }: {
  type: keyof typeof iconMap;
  title: string;
  children: React.ReactNode;
  index: number;
}) {
  const { icon: Icon, bg, color } = iconMap[type];
  
  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      className="bg-card p-6 rounded-xl shadow-md "
    >
      <div className="flex items-center mb-4">
        <div className={`p-2 ${bg} rounded-lg mr-3`}>
          <Icon className={`h-6 w-6 ${color}`} />
        </div>
        <h3 className="text-xl text-secondary font-semibold ">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
}

export default function TrustSection() {
  const t = useTranslations();
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <section id="trust" className="py-16 px-4 scroll-mt-28">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-b from-primary to-green-500 bg-clip-text text-transparent mb-4">
            {t("trustSection.title")}
          </h2>
          <p className="text-lg text-text max-w-2xl mx-auto">
            {t("trustSection.subtitle")}
          </p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10"
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          <TrustCard
            type="guidelines"
            title={t("trustSection.cards.guidelines.title")}
            index={1}
          >
            <p className="text-text">{t("trustSection.cards.guidelines.desc")}</p>
          </TrustCard>

          <TrustCard
            type="sources"
            title={t("trustSection.cards.sources.title")}
            index={2}
          >
            <p className="text-text mb-2">{t("trustSection.cards.sources.intro")}</p>
            <ul className="text-text space-y-1">
              {[1, 2, 3].map((i) => (
                <li key={i} className="flex items-center">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2 "></span>
                  {t(`trustSection.cards.sources.items.${i === 1 ? 'wsava' : i === 2 ? 'avma' : 'rspca'}`)}
                </li>
              ))}
            </ul>
          </TrustCard>

          <TrustCard
            type="limitations"
            title={t("trustSection.cards.limitations.title")}
            index={3}
          >
            <p className="text-text">{t("trustSection.cards.limitations.desc")}</p>
          </TrustCard>
        </motion.div>


      </div>
    </section>
  );
}