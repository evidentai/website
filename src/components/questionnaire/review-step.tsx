"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Send, Pencil, Loader2, CheckCircle2 } from "lucide-react";

export interface QuestionnaireFormData {
  name: string;
  email: string;
  company: string;
  role: string;
  framework: string[];
  cloud: string[];
  scm: string[];
  cicd: string[];
  identity: string[];
  endpoint: string[];
  logs: string[];
  otherTools: string[];
  message: string;
}

interface ReviewStepProps {
  data: QuestionnaireFormData;
  onBack: () => void;
  onEdit: (step: number) => void;
  onSubmit: () => void;
  isSubmitting: boolean;
  isSubmitted: boolean;
}

function formatSelections(items: string[]): string {
  if (items.length === 0) return "—";
  return items
    .map((item) => (item.startsWith("other:") ? item.replace("other:", "") : item))
    .join(", ");
}

interface SectionProps {
  label: string;
  value: string;
  step: number;
  onEdit: (step: number) => void;
  index: number;
}

function ReviewSection({ label, value, step, onEdit, index }: SectionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 * index }}
      className="flex items-start justify-between gap-4 rounded-lg border border-border/50 bg-card/50 px-4 py-3"
    >
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        <p className="mt-0.5 text-sm text-foreground break-words">{value}</p>
      </div>
      <button
        onClick={() => onEdit(step)}
        className="shrink-0 rounded-md p-1.5 text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
      >
        <Pencil className="size-3.5" />
      </button>
    </motion.div>
  );
}

export function ReviewStep({
  data,
  onBack,
  onEdit,
  onSubmit,
  isSubmitting,
  isSubmitted,
}: ReviewStepProps) {
  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <div className="mx-auto mb-6 flex size-20 items-center justify-center rounded-full bg-[#00E5A0]/10">
            <CheckCircle2 className="size-10 text-[#00E5A0]" />
          </div>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Thank you!
          </h2>
          <p className="mt-3 text-lg text-muted-foreground">
            Your questionnaire has been submitted successfully. Our team will
            review your responses and get back to you shortly.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            A copy has been sent to{" "}
            <span className="text-[#00E5A0]">{data.email}</span>
          </p>
        </motion.div>
      </div>
    );
  }

  const sections = [
    { label: "Full Name", value: data.name, step: 0 },
    { label: "Work Email", value: data.email, step: 0 },
    { label: "Company", value: data.company, step: 0 },
    { label: "Role", value: data.role || "—", step: 0 },
    { label: "Compliance Frameworks", value: formatSelections(data.framework), step: 1 },
    { label: "Cloud Providers", value: formatSelections(data.cloud), step: 2 },
    { label: "Source Code Management", value: formatSelections(data.scm), step: 3 },
    { label: "CI/CD Pipelines", value: formatSelections(data.cicd), step: 4 },
    { label: "Identity Providers", value: formatSelections(data.identity), step: 5 },
    { label: "Endpoint Management", value: formatSelections(data.endpoint), step: 6 },
    { label: "Log / Monitoring Tools", value: formatSelections(data.logs), step: 7 },
    { label: "Additional Tools", value: data.otherTools.length > 0 ? data.otherTools.join(", ") : "—", step: 8 },
    { label: "Additional Message", value: data.message || "—", step: 9 },
  ];

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Step 11 of 11
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Review your answers
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Please review your responses before submitting. Click the edit icon to
          change any answer.
        </p>
      </motion.div>

      <div className="w-full max-w-lg space-y-2">
        {sections.map((section, i) => (
          <ReviewSection
            key={section.label}
            label={section.label}
            value={section.value}
            step={section.step}
            onEdit={onEdit}
            index={i}
          />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex items-center gap-4"
      >
        <Button
          variant="outline"
          size="lg"
          onClick={onBack}
          disabled={isSubmitting}
          className="gap-2"
        >
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button
          size="lg"
          onClick={onSubmit}
          disabled={isSubmitting}
          className="gap-2"
          style={{
            backgroundColor: "#00E5A0",
            color: "#000",
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="size-4" />
              Submit Questionnaire
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}
