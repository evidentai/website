"use client";

import { motion } from "framer-motion";
import { InlineWidget } from "react-calendly";
import { CheckCircle, Clock, Users, Video } from "lucide-react";

const demoHighlights = [
  {
    icon: Video,
    title: "See the Platform Live",
    description: "Walk through real compliance workflows and evidence automation",
  },
  {
    icon: CheckCircle,
    title: "Get Your Questions Answered",
    description: "Discuss your specific compliance requirements and timeline",
  },
  {
    icon: Users,
    title: "Meet the Team",
    description: "Connect with compliance experts who understand your challenges",
  },
  {
    icon: Clock,
    title: "30-Minute Call",
    description: "Quick, focused session tailored to your needs",
  },
];

export function BookDemoContent() {
  const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

  return (
    <>
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
          See evidentflow.ai in action
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Book a personalized demo to see how we can help you achieve compliance
          in weeks, not months.
        </p>
      </motion.div>

      {/* Main content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="grid gap-8 lg:grid-cols-[2fr,3fr] lg:gap-12"
      >
        {/* Left column - What to expect */}
        <div className="space-y-8">
          <div>
            <h2 className="mb-6 text-2xl font-semibold">
              What to expect in your demo
            </h2>
            <div className="space-y-4">
              {demoHighlights.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className="flex items-start gap-4"
                >
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-[#00E5A0]/10">
                    <item.icon className="size-5 text-[#00E5A0]" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Additional info */}
          <div className="rounded-xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
            <h3 className="mb-3 font-semibold">Perfect for teams who:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-[#00E5A0]" />
                Need SOC 2, ISO 27001, or other compliance certifications
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-[#00E5A0]" />
                Want to automate evidence collection across their infrastructure
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-[#00E5A0]" />
                Are preparing for their first audit or annual renewals
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="mt-0.5 size-4 shrink-0 text-[#00E5A0]" />
                Need continuous compliance monitoring, not point-in-time checks
              </li>
            </ul>
          </div>
        </div>

        {/* Right column - Calendly widget */}
        <div className="relative">
          <div className="overflow-hidden rounded-2xl border border-border/50 bg-card/30 p-1 backdrop-blur-sm">
            {calendlyUrl ? (
              <InlineWidget
                url={calendlyUrl}
                styles={{
                  height: "700px",
                  minWidth: "100%",
                }}
              />
            ) : (
              <div className="flex h-[700px] items-center justify-center rounded-xl bg-muted/50">
                <div className="text-center">
                  <p className="mb-2 text-lg font-semibold">
                    Calendly URL Not Configured
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Add NEXT_PUBLIC_CALENDLY_URL to your .env.local file
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Trust indicators */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="mt-16 text-center"
      >
        <p className="text-sm text-muted-foreground">
          Trusted by high-growth startups to achieve compliance faster
        </p>
      </motion.div>
    </>
  );
}
