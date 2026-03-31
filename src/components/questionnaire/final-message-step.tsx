"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRight, ArrowLeft, MessageSquare } from "lucide-react";

interface FinalMessageStepProps {
  message: string;
  onChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter((w) => w.length > 0).length;
}

export function FinalMessageStep({
  message,
  onChange,
  onNext,
  onBack,
}: FinalMessageStepProps) {
  const wordCount = countWords(message);
  const isOverLimit = wordCount > 500;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Step 10 of 11
        </span>
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#00E5A0]/10 text-[#00E5A0]">
          <MessageSquare className="size-6" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Anything else?
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Tell us anything else about your infrastructure, compliance goals, or
          specific requirements.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <Textarea
          placeholder="Tell us anything else about your infrastructure or goals..."
          value={message}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          className="min-h-[160px] resize-none"
        />
        <div className="mt-2 flex justify-end">
          <span
            className={`text-xs ${
              isOverLimit
                ? "text-destructive"
                : "text-muted-foreground"
            }`}
          >
            {wordCount} / 500 words
          </span>
        </div>
      </motion.div>

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
          disabled={isOverLimit}
          className="group gap-2"
        >
          Review Answers
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
}
