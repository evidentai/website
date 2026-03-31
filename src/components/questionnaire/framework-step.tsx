"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Check, Plus } from "lucide-react";

interface FrameworkOption {
  id: string;
  label: string;
  image: string;
  description: string;
  color: string;
  size?: number;
}

const frameworks: FrameworkOption[] = [
  {
    id: "SOC 2",
    label: "SOC 2",
    image: "/images/frameworks/soc2.png",
    description:
      "Security, Availability, Processing Integrity trust principles",
    color: "#00E5A0",
  },
  {
    id: "ISO 27001",
    label: "ISO 27001",
    image: "/images/frameworks/iso27001.png",
    description: "International information security management standard",
    color: "#3B82F6",
  },
  {
    id: "HIPAA",
    label: "HIPAA",
    image: "/images/frameworks/hipaa.png",
    description: "Health Insurance Portability and Accountability Act",
    color: "#0EA5E9",
  },
  {
    id: "GDPR",
    label: "GDPR",
    image: "/images/frameworks/gdpr.png",
    description: "EU General Data Protection Regulation",
    color: "#8B5CF6",
    size: 72,
  },
  {
    id: "FedRAMP",
    label: "FedRAMP",
    image: "/images/frameworks/fedramp.png",
    description: "Federal Risk and Authorization Management Program",
    color: "#B91C1C",
  },
  {
    id: "CMMC",
    label: "CMMC",
    image: "/images/frameworks/cmmc.png",
    description:
      "Cybersecurity Maturity Model Certification for defense contractors",
    color: "#1E40AF",
  },
];

interface FrameworkStepProps {
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function FrameworkStep({
  selected,
  onSelectionChange,
  onNext,
  onBack,
}: FrameworkStepProps) {
  const [otherValue, setOtherValue] = useState("");

  const toggle = (id: string) => {
    const next = selected.includes(id)
      ? selected.filter((s) => s !== id)
      : [...selected, id];
    onSelectionChange(next);
  };

  const addOther = () => {
    const trimmed = otherValue.trim();
    if (trimmed && !selected.includes(`other:${trimmed}`)) {
      onSelectionChange([...selected, `other:${trimmed}`]);
      setOtherValue("");
    }
  };

  const handleOtherKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addOther();
    }
  };

  const customItems = selected.filter((s) => s.startsWith("other:"));
  const canProceed = selected.length > 0;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Step 2 of 11
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Compliance framework
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Which compliance frameworks are you targeting?
        </p>
      </motion.div>

      <div className="grid w-full max-w-4xl grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {frameworks.map((fw, i) => {
          const isSelected = selected.includes(fw.id);
          return (
            <motion.button
              key={fw.id}
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
              whileHover={{ scale: 1.03, y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(fw.id)}
              className={`group relative flex flex-col items-start gap-3 rounded-xl border p-6 text-left transition-colors ${
                isSelected
                  ? "border-[#00E5A0]/40 bg-[#00E5A0]/5"
                  : "border-border/50 bg-card hover:border-transparent"
              }`}
              style={{
                boxShadow: isSelected
                  ? `0 0 30px ${fw.color}20, 0 0 0 1px ${fw.color}40`
                  : `0 0 0 0 ${fw.color}00`,
              }}
              onMouseEnter={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.boxShadow = `0 0 30px ${fw.color}20, 0 0 0 1px ${fw.color}40`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.boxShadow = `0 0 0 0 ${fw.color}00`;
                }
              }}
            >
              <Image
                src={fw.image}
                alt={fw.label}
                width={fw.size ?? 56}
                height={fw.size ?? 56}
                className="object-contain"
              />
              <div>
                <h3 className="text-lg font-semibold">{fw.label}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {fw.description}
                </p>
              </div>
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute right-4 top-4"
                >
                  <Check className="size-5 text-[#00E5A0]" />
                </motion.div>
              )}
              <div
                className="absolute inset-0 -z-10 rounded-xl opacity-0 transition-opacity group-hover:opacity-100"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${fw.color}08, transparent 70%)`,
                }}
              />
            </motion.button>
          );
        })}
      </div>

      {/* Custom "Other" items */}
      {customItems.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 flex flex-wrap gap-2"
        >
          {customItems.map((item) => {
            const label = item.replace("other:", "");
            return (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#00E5A0]/40 bg-[#00E5A0]/5 px-3 py-1.5 text-sm text-[#00E5A0]"
              >
                {label}
                <button
                  onClick={() => toggle(item)}
                  className="ml-0.5 rounded-full p-0.5 transition-colors hover:bg-[#00E5A0]/20"
                >
                  <span className="text-xs">✕</span>
                </button>
              </span>
            );
          })}
        </motion.div>
      )}

      {/* Other input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-4 flex w-full max-w-md items-center gap-2"
      >
        <Input
          placeholder="Other framework (type and press Enter)"
          value={otherValue}
          onChange={(e) => setOtherValue(e.target.value)}
          onKeyDown={handleOtherKeyDown}
          className="h-10"
        />
        <Button
          variant="outline"
          size="icon"
          onClick={addOther}
          disabled={!otherValue.trim()}
          className="shrink-0"
        >
          <Plus className="size-4" />
        </Button>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mt-8 flex items-center gap-4"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          className="gap-2"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button
          size="lg"
          onClick={onNext}
          disabled={!canProceed}
          className="group gap-2"
        >
          Continue ({selected.length})
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
}
