'use client'
import { motion, cubicBezier, type Variants } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { ArrowRight, Shield, Clock, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

const route = () =>{
    
}

const features = [
  {
    icon: Clock,
    text: "Get results in seconds"
  },
  {
    icon: Shield,
    text: "Trusted by 50,000+ pet parents"
  },
  {
    icon: Heart,
    text: "Free health assessments"
  }
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: cubicBezier(0.25, 0.46, 0.45, 0.94)
    }
  }
};

const floatingVariants: Variants = {
  animate: {
    y: [-10, 10, -10],
    rotate: [0, 5, 0, -5, 0],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};
interface CallToActionProps {
    buttonText: string;
    buttonLink: string;
  }

  
export default function CallToActionSection({buttonText, buttonLink}: CallToActionProps) {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section className="py-20 px-4relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] opacity-20"></div>
      



      <div className="max-w-6xl mx-auto relative">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center"
        >

          {/* Main headline */}
          <motion.h2
            variants={itemVariants}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
          >
            <span className="bg-gradient-to-r from-primary to bg-green-400 bg-clip-text text-transparent">
              Start Your Pet's
            </span>
            <br />
            Health Check Now
          </motion.h2>

          {/* Subheading */}
          <motion.p
            variants={itemVariants}
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
          >
            Join thousands of pet parents who trust PetCare AI for quick, reliable health assessments. 
            Get peace of mind in just a few clicks.
          </motion.p>

          {/* Features */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12"
          >
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <feature.icon className="w-4 h-4 text-green-600" />
                </div>
                <span className="font-medium">{feature.text}</span>
              </div>
            ))}
          </motion.div>

          {/* Main CTA Button */}
          <motion.div
            variants={itemVariants}
            className="mb-12"
          >
            <Link
             href='/ai-checks'
              prefetch={true}
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-primary to-green-600 text-white px-12 py-6 rounded-2xl font-bold text-xl shadow-xl shadow-blue-500/25 hover:shadow-2xl hover:shadow-blue-500/30 transition-all duration-300 overflow-hidden"
            >
              
              <span className="relative z-10">Start Health Check</span>


            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={itemVariants}
            className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-2xl mx-auto shadow-lg shadow-gray-100/50"
          >
            <p className="text-sm text-gray-500 mb-4 font-medium">Trusted by pet parents worldwide</p>
            <div className="flex items-center justify-center gap-8 flex-wrap">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">50K+</div>
                <div className="text-sm text-gray-600">Happy Pets</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">98%</div>
                <div className="text-sm text-gray-600">Satisfaction</div>
              </div>
              <div className="w-px h-8 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">24/7</div>
                <div className="text-sm text-gray-600">Available</div>
              </div>
            </div>
          </motion.div>

          {/* Secondary text */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-gray-500 mt-8 max-w-md mx-auto"
          >
            No registration required • Free to use • Results in seconds
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}