"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { usePlaygroundStore, type Step } from "@/lib/playground-store";
import { StepRenderer } from "./step-renderer";

const allSteps: Step[] = [
  "chooseCompliance",
  "connectCloud",
  "integrationSCM",
  "integrationCICD",
  "integrationIDP",
  "integrationEndpoint",
  "integrationLogs",
  "connecting",
  "scanning",
  "evidenceCapture",
  "graphBuild",
  "insights",
  "dashboard",
  "cta",
];

type ProgressDot = {
  label: string;
  steps: Step[];
};

const progressDots: ProgressDot[] = [
  { label: "Framework", steps: ["chooseCompliance"] },
  {
    label: "Integrations",
    steps: [
      "connectCloud",
      "integrationSCM",
      "integrationCICD",
      "integrationIDP",
      "integrationEndpoint",
      "integrationLogs",
    ],
  },
  { label: "Connecting", steps: ["connecting"] },
  { label: "Scanning", steps: ["scanning", "evidenceCapture"] },
  { label: "Graph", steps: ["graphBuild"] },
  { label: "Insights", steps: ["insights"] },
  { label: "Dashboard", steps: ["dashboard"] },
];

export function PlaygroundContainer() {
  const { step, framework, cloud } = usePlaygroundStore();
  const topRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [step]);

  const currentDotIndex = progressDots.findIndex((d) =>
    d.steps.includes(step)
  );
  const isCta = step === "cta";

  return (
    <div ref={topRef} className="relative min-h-[90vh]" style={{ scrollMarginTop: "150px" }}>
      {/* Progress indicator */}
      {!isCta && (
      <div className="mb-18">
        <div className="mx-auto flex max-w-2xl items-center justify-between gap-1">
          {progressDots.map((dot, i) => {
            const isActive = i === currentDotIndex;
            const isPast = currentDotIndex === -1 ? true : i < currentDotIndex;
            return (
              <div key={dot.label} className="flex flex-1 flex-col items-center gap-1.5">
                <div className="relative flex w-full items-center">
                  {i > 0 && (
                    <div
                      className="absolute right-1/2 h-0.5 w-full transition-colors duration-300"
                      style={{
                        backgroundColor: isPast
                          ? "#00E5A0"
                          : "hsl(var(--muted))",
                      }}
                    />
                  )}
                  <motion.div
                    className="relative z-10 mx-auto flex size-3 items-center justify-center rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: isActive
                        ? "#00E5A0"
                        : isPast
                          ? "#00E5A0"
                          : "hsl(var(--muted))",
                      boxShadow: isActive
                        ? "0 0 12px rgba(0,229,160,0.5)"
                        : "none",
                    }}
                    animate={
                      isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }
                    }
                    transition={
                      isActive
                        ? { duration: 1.5, repeat: Infinity }
                        : undefined
                    }
                  />
                </div>
                <span
                  className="hidden text-[10px] sm:block"
                  style={{
                    color: isActive
                      ? "#00E5A0"
                      : isPast
                        ? "hsl(var(--foreground))"
                        : "hsl(var(--muted-foreground))",
                  }}
                >
                  {dot.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      )}

      {/* Current context */}
      {!isCta && (framework || cloud) && (
        <div className="mb-10 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
          {framework && (
            <span className="rounded-full bg-[#00E5A0]/10 px-3 py-1 text-xs text-[#00E5A0]">
              {framework}
            </span>
          )}
          {cloud && (
            <span className="rounded-full bg-blue-500/10 px-3 py-1 text-xs text-blue-400">
              {cloud}
            </span>
          )}
        </div>
      )}

      {/* Step content */}
      <StepRenderer />
    </div>
  );
}
