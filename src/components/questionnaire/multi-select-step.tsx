"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ArrowRight,
  ArrowLeft,
  Check,
  SkipForward,
  Plus,
} from "lucide-react";

export interface SelectOption {
  id: string;
  label: string;
  color: string;
  logo?: string;
}

interface MultiSelectStepProps {
  stepNumber: number;
  totalSteps: number;
  title: string;
  description: string;
  options: SelectOption[];
  selected: string[];
  onSelectionChange: (selected: string[]) => void;
  onNext: () => void;
  onBack: () => void;
  required?: boolean;
}

export function MultiSelectStep({
  stepNumber,
  totalSteps,
  title,
  description,
  options,
  selected,
  onSelectionChange,
  onNext,
  onBack,
  required = false,
}: MultiSelectStepProps) {
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
  const canProceed = !required || selected.length > 0;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Step {stepNumber} of {totalSteps}
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">{description}</p>
      </motion.div>

      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {options.map((option, i) => {
            const isSelected = selected.includes(option.id);
            return (
              <motion.button
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => toggle(option.id)}
                className={`relative flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-[#00E5A0]/40 bg-[#00E5A0]/5"
                    : "border-border/50 bg-card hover:border-border"
                }`}
              >
                {option.logo ? (
                  <img
                    src={option.logo}
                    alt={option.label}
                    className="size-9 shrink-0 rounded-lg object-contain"
                  />
                ) : (
                  <div
                    className="flex size-9 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white"
                    style={{ backgroundColor: option.color }}
                  >
                    {option.label.charAt(0)}
                  </div>
                )}
                <span className="text-sm font-medium">{option.label}</span>
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
          transition={{ delay: 0.3 }}
          className="mt-4 flex items-center gap-2"
        >
          <Input
            placeholder="Other (type and press Enter)"
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
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex items-center gap-4"
      >
        <Button variant="outline" size="lg" onClick={onBack} className="gap-2">
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button
          size="lg"
          onClick={onNext}
          disabled={!canProceed}
          className="group gap-2"
        >
          Continue
          {selected.length > 0 && ` (${selected.length})`}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>
        {!required && selected.length === 0 && (
          <button
            onClick={onNext}
            className="flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            Skip
            <SkipForward className="size-3.5" />
          </button>
        )}
      </motion.div>
    </div>
  );
}
