'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { Stethoscope, PawPrint, BarChart3, Siren } from "lucide-react";
import { useTranslations } from "next-intl";

const faqs = [
  { questionKey: "items.isVet.question", answerKey: "items.isVet.answer", icon: <Stethoscope className="w-6 h-6 text-blue-600" /> },
  { questionKey: "items.supportedPets.question", answerKey: "items.supportedPets.answer", icon: <PawPrint className="w-6 h-6 text-green-600" /> },
  { questionKey: "items.accuracy.question", answerKey: "items.accuracy.answer", icon: <BarChart3 className="w-6 h-6 text-purple-600" /> },
  { questionKey: "items.emergencies.question", answerKey: "items.emergencies.answer", icon: <Siren className="w-6 h-6 text-amber-600" /> }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

export default function FAQSection() {
  const t = useTranslations();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section id="faq" className="py-20 px-4 relative overflow-hidden scroll-mt-28">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black,transparent)] opacity-25"></div>
      
      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl bg-gradient-to-r from-primary to-green-600 text-transparent bg-clip-text font-bold  mb-6">
            {t("faq.title")}
          </h2>
          <p className=" text-text max-w-2xl mx-auto leading-relaxed">
            {t("faq.subtitle")}
          </p>
        </motion.div>

        {/* FAQ Accordion */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="mb-16"
        >
          <Accordion type="single" collapsible className="w-full space-y-6">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ 
                  scale: 1.02,
                  transition: { duration: 0.2 }
                }}
                className="group"
              >
                <AccordionItem 
                  value={`item-${index}`} 
                  className="border-0 bg-card backdrop-blur-sm rounded-2xl shadow-lg shadow-card/80 overflow-hidden hover:shadow-xl hover:shadow-card/70 transition-all duration-300"
                >
                  <AccordionTrigger className="px-8 py-6 hover:no-underline [&[data-state=open]]:border-b border-text">
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                        {faq.icon}
                      </div>
                      <span className="font-semibold text-secondary  transition-colors duration-300 text-lg">
                        {t(`faq.${faq.questionKey}`)}
                      </span>
                    </div>
                  
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-8 pb-6 pt-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-text leading-relaxed text-base ml-16"
                    >
                      {t(`faq.${faq.answerKey}`)}
                    </motion.div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}