"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cog, Camera, Code2, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

const features = [
  {
    icon: Cog,
    title: "Automated Evidence Collection",
    description:
      "API connectors and cloud agents pull configs, logs, and screenshots continuously.",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "#00E5A0",
  },
  {
    icon: Camera,
    title: "AI Screenshot Capture",
    description:
      "Headless browser agent captures and classifies UI evidence from 50+ SaaS tools.",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "#00E5A0",
  },
  {
    icon: Code2,
    title: "Policy-as-Code",
    description:
      "Define compliance policies in OPA/Rego. Enforce in CI/CD pipelines.",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "#00E5A0",
  },
  {
    icon: Users,
    title: "Auditor Portal",
    description:
      "Give auditors structured, hash-verified evidence in a dedicated read-only portal.",
    gradient: "from-green-500/10 to-emerald-500/10",
    iconColor: "#00E5A0",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export function PlatformHighlights() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section ref={sectionRef} className="py-20 md:py-28 relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent pointer-events-none" />
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Why teams choose evident.ai
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Purpose-built automation that replaces manual compliance workflows
            with continuous, verifiable evidence.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              custom={index}
            >
              <Card
                className="group relative h-full transition-all duration-300 hover:shadow-lg hover:scale-[1.02] border-border/50"
                style={{
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
              >
                {/* Animated gradient background on hover */}
                <div
                  className={`absolute inset-0 rounded-lg bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />
                
                {/* Glow effect on hover */}
                <div
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    boxShadow: "0 0 30px rgba(0,229,160,0.15)",
                  }}
                />

                <CardHeader className="relative z-10">
                  {/* Icon container with animation */}
                  <div
                    className="mb-4 flex size-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,229,160,0.15), rgba(0,229,160,0.05))",
                      boxShadow: "0 4px 12px rgba(0,229,160,0.1)",
                    }}
                  >
                    <feature.icon
                      className="size-6 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: feature.iconColor }}
                    />
                  </div>
                  <CardTitle className="text-lg text-foreground">
                    {feature.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="relative z-10 flex flex-1 flex-col justify-between gap-4">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                  
                  {/* Learn more link with arrow animation */}
                  <Link
                    href="/platform"
                    className="inline-flex items-center gap-2 text-sm font-medium transition-colors group/link"
                    style={{ color: feature.iconColor }}
                  >
                    <span className="relative">
                      Learn more
                      <span
                        className="absolute bottom-0 left-0 h-[1px] w-0 transition-all duration-300 group-hover/link:w-full"
                        style={{ backgroundColor: feature.iconColor }}
                      />
                    </span>
                    <ArrowRight className="size-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
