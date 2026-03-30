"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { usePlaygroundStore, type Framework } from "@/lib/playground-store";

const frameworks: { name: Framework; image: string; description: string; color: string; size?: number }[] = [
  {
    name: "SOC 2",
    image: "/images/frameworks/soc2.png",
    description: "Security, Availability, Processing Integrity trust principles",
    color: "#00E5A0",
  },
  {
    name: "ISO 27001",
    image: "/images/frameworks/iso27001.png",
    description: "International information security management standard",
    color: "#3B82F6",
  },
  {
    name: "HIPAA",
    image: "/images/frameworks/hipaa.png",
    description: "Health Insurance Portability and Accountability Act",
    color: "#0EA5E9",
  },
  {
    name: "GDPR",
    image: "/images/frameworks/gdpr.png",
    description: "EU General Data Protection Regulation",
    color: "#8B5CF6",
    size: 72,
  },
  {
    name: "FedRAMP",
    image: "/images/frameworks/fedramp.png",
    description: "Federal Risk and Authorization Management Program",
    color: "#B91C1C",
  },
  {
    name: "CMMC",
    image: "/images/frameworks/cmmc.png",
    description: "Cybersecurity Maturity Model Certification for defense contractors",
    color: "#1E40AF",
  },
];

export function ChooseCompliance() {
  const { selectFramework, setStep } = usePlaygroundStore();

  const handleSelect = (fw: Framework) => {
    selectFramework(fw);
    setStep("connectCloud");
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Step 1 of 6
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Choose your compliance framework
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Select the framework you&apos;re preparing for. We&apos;ll tailor the simulation accordingly.
        </p>
      </motion.div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {frameworks.map((fw, i) => (
          <motion.button
            key={fw.name}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
            whileHover={{ scale: 1.03, y: -4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(fw.name)}
            className="group relative flex flex-col items-start gap-3 rounded-xl border border-border/50 bg-card p-6 text-left transition-colors hover:border-transparent"
            style={{
              boxShadow: `0 0 0 0 ${fw.color}00`,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 30px ${fw.color}20, 0 0 0 1px ${fw.color}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = `0 0 0 0 ${fw.color}00`;
            }}
          >
            <Image
              src={fw.image}
              alt={fw.name}
              width={fw.size ?? 56}
              height={fw.size ?? 56}
              className="object-contain"
            />
            <div>
              <h3 className="text-lg font-semibold">{fw.name}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{fw.description}</p>
            </div>
            <div
              className="absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
              style={{
                background: `radial-gradient(ellipse at 50% 0%, ${fw.color}08, transparent 70%)`,
              }}
            />
          </motion.button>
        ))}
      </div>
    </div>
  );
}
