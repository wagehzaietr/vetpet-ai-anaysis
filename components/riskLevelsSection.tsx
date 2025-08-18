'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";

const riskLevels = [
  {
    levelKey: "levels.high",
    color: "bg-red-500",
    borderColor: "border-red-200",
    bgColor: "bg-red-50",
    textColor: "text-red-700",
    icon: AlertTriangle,
    exampleKey: "examples.high",
  },
  {
    levelKey: "levels.moderate",
    color: "bg-amber-500",
    borderColor: "border-amber-200",
    bgColor: "bg-amber-50",
    textColor: "text-amber-700",
    icon: AlertCircle,
    exampleKey: "examples.moderate",
  },
  {
    levelKey: "levels.low",
    color: "bg-green-500",
    borderColor: "border-green-200",
    bgColor: "bg-green-50",
    textColor: "text-green-700",
    icon: CheckCircle,
    exampleKey: "examples.low",
  },
];

export default function RiskLevelSection() {
  const t = useTranslations();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl  md:text-4xl font-bold bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent mb-4">
            {t("riskLevels.title")}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t("riskLevels.subtitle")}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {riskLevels.map((risk, index) => (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{ y: -10 }}
            >
              <Card
                className={`h-full border-2 ${risk.borderColor} shadow-lg overflow-hidden`}
              >
                <CardHeader
                  className={`${risk.bgColor} border-b ${risk.borderColor} pb-4`}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className={`text-xl ${risk.textColor}`}>
                      {t(`riskLevels.${risk.levelKey}`)}
                    </CardTitle>
                    <div className={`p-2 rounded-full ${risk.color}`}>
                      <risk.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <div className="flex items-center mb-2">
                      <span className="text-sm font-medium text-gray-500">
                        {t("riskLevels.exampleLabel")}
                      </span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                      <p className="text-gray-700">{t(`riskLevels.${risk.exampleKey}`)}</p>
                    </div>
                  </div>
                  <div className="flex justify-center mt-4">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${risk.color} mr-2`}></div>
                      <span className="text-sm text-gray-500">
                        {t("riskLevels.indicator")}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-12 text-center"
        >
          <div className="inline-flex items-center bg-blue-50 px-4 py-2 rounded-full">
            <span className="text-blue-700 font-medium">
              {t("riskLevels.footerNote")}
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}