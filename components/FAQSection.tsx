'use client'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ChevronDown, HelpCircle, MessageCircle, Mail } from "lucide-react";

const faqs = [
  {
    question: "Is PetCare AI a real vet?",
    answer: "No, PetCare AI is an AI-powered tool designed to provide preliminary health assessments based on symptoms you describe. It's not a substitute for professional veterinary care but can help you determine when to seek urgent attention.",
    icon: "🤖"
  },
  {
    question: "What kind of pets do you support?",
    answer: "Currently, we support dogs and cats of all breeds and ages. Our AI is trained on species-specific health data to provide accurate assessments for these common companion animals.",
    icon: "🐕"
  },
  {
    question: "How accurate is the AI?",
    answer: "Our AI achieves approximately 85% accuracy in identifying common symptoms and risk levels. However, accuracy varies based on symptom description quality and image clarity. Always verify with a veterinarian for critical health decisions.",
    icon: "📊"
  },
  {
    question: "What about emergencies?",
    answer: "For emergencies, our AI will immediately flag high-risk situations and recommend urgent veterinary care. We provide clear instructions for stabilizing your pet and locating the nearest emergency clinic, but you should contact your vet or emergency services directly.",
    icon: "🚨"
  }
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
      duration: 0.6,
      easing: [0.25, 0.46, 0.45, 0.94]
    }
  }
};

export default function FAQSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 px-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,transparent,black,transparent)] opacity-25"></div>
      
      <div className="max-w-4xl mx-auto relative">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl bg-gradient-to-r from-primary to-green-600 text-transparent bg-clip-text font-bold  mb-6">
            Frequently Asked Questions
          </h2>
          <p className=" text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about PetCare AI and how it can help your furry friends
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
                  className="border-0 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg shadow-gray-100/50 overflow-hidden hover:shadow-xl hover:shadow-gray-100/60 transition-all duration-300"
                >
                  <AccordionTrigger className="px-8 py-6 hover:no-underline [&[data-state=open]]:border-b border-gray-100">
                    <div className="flex items-center gap-4 text-left w-full">
                      <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-300">
                        {faq.icon}
                      </div>
                      <span className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 text-lg">
                        {faq.question}
                      </span>
                    </div>
                  
                  </AccordionTrigger>
                  
                  <AccordionContent className="px-8 pb-6 pt-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.3, delay: 0.1 }}
                      className="text-gray-600 leading-relaxed text-base ml-16"
                    >
                      {faq.answer}
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