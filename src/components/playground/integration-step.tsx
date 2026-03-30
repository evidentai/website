"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { usePlaygroundStore, type Step } from "@/lib/playground-store";
import type { IntegrationCategory } from "@/lib/playground-data";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  GitBranch,
  Rocket,
  Fingerprint,
  ShieldCheck,
  ScrollText,
  SkipForward,
} from "lucide-react";
import type { ReactNode } from "react";

const iconMap: Record<string, ReactNode> = {
  GitBranch: <GitBranch className="size-6" />,
  Rocket: <Rocket className="size-6" />,
  Fingerprint: <Fingerprint className="size-6" />,
  ShieldCheck: <ShieldCheck className="size-6" />,
  ScrollText: <ScrollText className="size-6" />,
};

interface IntegrationStepProps {
  category: IntegrationCategory;
  nextStep: Step;
  stepLabel: string;
}

export function IntegrationStep({ category, nextStep, stepLabel }: IntegrationStepProps) {
  const { setIntegrations, setStep } = usePlaygroundStore();
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((s) => s !== id) : [...prev, id]
    );
  };

  const handleContinue = () => {
    setIntegrations(category.key, selected);
    setStep(nextStep);
  };

  const handleSkip = () => {
    setIntegrations(category.key, []);
    setStep(nextStep);
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          {stepLabel}
        </span>
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#00E5A0]/10 text-[#00E5A0]">
          {iconMap[category.icon] ?? <GitBranch className="size-6" />}
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {category.title}
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          {category.description}
        </p>
      </motion.div>

      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {category.tools.map((tool, i) => {
            const isSelected = selected.includes(tool.id);
            return (
              <motion.button
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggle(tool.id)}
                className={`relative flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-[#00E5A0]/40 bg-[#00E5A0]/5"
                    : "border-border/50 bg-card hover:border-border"
                }`}
              >
                {tool.logo ? (
                  <img
                    src={tool.logo}
                    alt={tool.label}
                    className="size-9 shrink-0 rounded-lg object-contain"
                  />
                ) : (
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: tool.color }}
                  >
                    {tool.label.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-medium">{tool.label}</span>
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-3 top-3"
                  >
                    <Check className="size-4 text-[#00E5A0]" />
                  </motion.div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex items-center gap-4"
      >
        <Button
          size="lg"
          onClick={handleContinue}
          disabled={selected.length === 0}
          className="group gap-2"
        >
          Continue ({selected.length} selected)
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>
        <button
          onClick={handleSkip}
          className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          Skip
          <SkipForward className="size-3.5" />
        </button>
      </motion.div>
    </div>
  );
}
