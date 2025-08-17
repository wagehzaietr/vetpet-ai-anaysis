"use client";
import { Card } from "@/components/ui/card";
import { Brain, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";
import { UploadSvg, BarinSvg, ChatSvg } from "./icons";

const steps = [
  {
    icon: <ChatSvg />,
    title: "Describe Symptoms",
    description:
      "Tell our AI about your pet's condition, behavior changes, or any concerns you've noticed.",
  },
  {
    icon: <UploadSvg />,
    title: "Upload Images",
    description:
      "Share photos of your pet or visible symptoms for more accurate AI analysis.",
  },
  {
    icon: <BarinSvg />,
    title: "Get AI Analysis",
    description:
      "Receive professional veterinary insights and recommended next steps instantly.",
  },
];

const features = [
  {
    icon: <CheckCircle className="w-6 h-6" />,
    title: "24/7 Availability",
    description:
      "Get instant veterinary insights anytime, anywhere with our AI assistant.",
  },
  {
    icon: <Brain className="w-6 h-6" />,
    title: "Professional Grade AI",
    description:
      "Trained on extensive veterinary data to provide accurate health assessments.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 ">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Get professional veterinary insights for your pet in three simple
            steps with our AI-powered platform
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col justify-center lg:flex-row gap-12 items-center">
          {/* Demo Section - Left */}
          <motion.div
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-card rounded-2xl shadow-lg overflow-hidden border border-border">
              <div className="p-6 bg-primary text-primary-foreground">
                <h3 className="text-xl font-bold mb-2">See It In Action</h3>
                <p className="text-primary-foreground/80">
                  Watch how our AI analyzes pet health in seconds
                </p>
              </div>
              <div className="aspect-video bg-muted flex items-center justify-center relative">
                <div
                  style={{
                    position: "relative",
                    paddingBottom: "calc(56.66189111747851% + 41px)",
                    height: 0,
                    width: "100%",
                  }}
                >
                  <iframe
                    src="https://demo.arcade.software/4tOhEY1hb1Qj5NYLi7eH?embed&embed_mobile=tab&embed_desktop=inline&show_copy_link=true"
                    title="Demo"
                    loading="lazy"
                    allowFullScreen
                    allow="clipboard-write"
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      colorScheme: "light",
                    }}
                  />
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="flex -space-x-2">
                    <div className="w-10 h-10 rounded-full bg-primary/20 border-2 border-background flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">JD</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/30 border-2 border-background flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">SK</span>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-primary/40 border-2 border-background flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">MT</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium">Trusted by pet owners</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="w-4 h-4 text-yellow-400"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        (4.9/5)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Cards Section - Right */}
          <motion.div
            className="lg:w-1/2 w-full"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Steps */}
            <div className="mb-12">
              <h3 className="text-2xl font-bold mb-6">Simple 3-Step Process</h3>
              <div className="space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <Card className="p-6 border-0 shadow-md hover:shadow-lg transition-shadow duration-300 bg-card/80 backdrop-blur-sm">
                      <div className="flex items-start">
                        <div className="flex-shrink-0 mr-4">
                          <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                            <div className="text-primary">{step.icon}</div>
                          </div>
                        </div>
                        <div>
                          <div className="flex items-center mb-2">
                            <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center mr-2">
                              <span className="text-white font-bold text-xs">
                                {index + 1}
                              </span>
                            </div>
                            <h3 className="text-lg font-semibold text-white">
                              {step.title}
                            </h3>
                          </div>
                          <p className="text-white/70">{step.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
