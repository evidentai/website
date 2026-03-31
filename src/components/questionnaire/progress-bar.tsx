"use client";

import { motion } from "framer-motion";

const stepLabels = [
  "Info",
  "Framework",
  "Cloud",
  "SCM",
  "CI/CD",
  "Identity",
  "Endpoint",
  "Logs",
  "Tools",
  "Message",
  "Review",
];

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

export function ProgressBar({ currentStep, totalSteps }: ProgressBarProps) {
  return (
    <div className="mb-14 sm:mb-18">
      <div className="mx-auto flex max-w-3xl items-center justify-between gap-1">
        {stepLabels.slice(0, totalSteps).map((label, i) => {
          const isActive = i === currentStep;
          const isPast = i < currentStep;
          return (
            <div
              key={label}
              className="flex flex-1 flex-col items-center gap-1.5"
            >
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
                    backgroundColor:
                      isActive || isPast ? "#00E5A0" : "hsl(var(--muted))",
                    boxShadow: isActive
                      ? "0 0 12px rgba(0,229,160,0.5)"
                      : "none",
                  }}
                  animate={isActive ? { scale: [1, 1.3, 1] } : { scale: 1 }}
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
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
