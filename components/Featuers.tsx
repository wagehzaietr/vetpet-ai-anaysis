'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Stethoscope, Palette, MessageCircle, AlertTriangle, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";

const features = [
  {
    icon: Camera,
    title: "Image Analysis",
    description: "Detect visible symptoms through advanced image recognition technology"
  },
  {
    icon: Stethoscope,
    title: "Symptom Assessment",
    description: "Comprehensive evaluation of symptoms and risk factors for accurate health insights"
  },
  {
    icon: Palette,
    title: "Waste Analysis",
    description: "Interpret poop and vomit colors to identify potential health issues"
  },
  {
    icon: MessageCircle,
    title: "Bilingual Chat",
    description: "Communicate in Arabic or English with our AI-powered assistant"
  },
  {
    icon: AlertTriangle,
    title: "Emergency Guidance",
    description: "Instant alerts and step-by-step instructions during urgent situations"
  },
  {
    icon: Shield,
    title: "Data Privacy",
    description: "Your health information is encrypted and never shared with third parties"
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

export default function FeaturesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-16 px-4 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-green-500 bg-clip-text text-transparent mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2 }}
          >
            Pet Health Features
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
          >
            Comprehensive tools to monitor and improve your pet's well-being
          </motion.p>
        </motion.div>
        
        <motion.div 
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <motion.div 
                      className="p-2 bg-blue-100 rounded-lg"
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      transition={{ type: "spring", stiffness: 400 }}
                    >
                      <feature.icon className="h-6 w-6 text-blue-600" />
                    </motion.div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}