"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { usePlaygroundStore, type Framework } from "@/lib/playground-store";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  ArrowRight,
  Shield,
  TrendingDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const insightsByFramework: Record<
  Framework,
  { critical: number; high: number; medium: number; low: number; remediate: number }
> = {
  "SOC 2": { critical: 29, high: 83, medium: 194, low: 347, remediate: 418 },
  "ISO 27001": { critical: 34, high: 91, medium: 213, low: 371, remediate: 456 },
  HIPAA: { critical: 41, high: 97, medium: 178, low: 312, remediate: 389 },
  GDPR: { critical: 22, high: 67, medium: 201, low: 358, remediate: 421 },
  FedRAMP: { critical: 47, high: 112, medium: 237, low: 389, remediate: 503 },
  CMMC: { critical: 36, high: 89, medium: 206, low: 334, remediate: 427 },
};

function useCountUp(target: number, duration: number, delay: number) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const delayTimeout = setTimeout(() => {
      const startTime = performance.now();
      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(eased * target));
        if (progress < 1) requestAnimationFrame(animate);
      };
      requestAnimationFrame(animate);
    }, delay);

    return () => clearTimeout(delayTimeout);
  }, [target, duration, delay]);

  return value;
}

export function InsightsView() {
  const { framework, cloud, setRiskHighlighted, setStep } = usePlaygroundStore();

  const stats = framework ? insightsByFramework[framework] : insightsByFramework["SOC 2"];
  const total = stats.critical + stats.high + stats.medium + stats.low;

  const criticalAnimated = useCountUp(stats.critical, 1200, 400);
  const highAnimated = useCountUp(stats.high, 1200, 550);
  const mediumAnimated = useCountUp(stats.medium, 1200, 700);
  const lowAnimated = useCountUp(stats.low, 1200, 850);
  const totalAnimated = useCountUp(total, 1400, 300);
  const remediateAnimated = useCountUp(stats.remediate, 1400, 1000);

  const [showCta, setShowCta] = useState(false);

  const revealCta = useCallback(() => {
    setShowCta(true);
  }, []);

  useEffect(() => {
    setRiskHighlighted(true);
    const timeout = setTimeout(revealCta, 2200);
    return () => clearTimeout(timeout);
  }, [setRiskHighlighted, revealCta]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Risk Insights
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Risk insights discovered
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          We found{" "}
          <span className="font-semibold text-foreground">{totalAnimated.toLocaleString()}</span>{" "}
          findings across your {cloud} environment for {framework} compliance.
        </p>
      </motion.div>

      {/* Summary stat cards */}
      <motion.div
        className="mb-8 grid w-full max-w-2xl grid-cols-2 gap-3 sm:grid-cols-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {[
          { count: criticalAnimated, label: "Critical", color: "#EF4444", bg: "rgba(239,68,68,0.08)", icon: AlertTriangle },
          { count: highAnimated, label: "High", color: "#F59E0B", bg: "rgba(245,158,11,0.08)", icon: AlertCircle },
          { count: mediumAnimated, label: "Medium", color: "#3B82F6", bg: "rgba(59,130,246,0.08)", icon: Info },
          { count: lowAnimated, label: "Low", color: "#6B7280", bg: "rgba(107,114,128,0.08)", icon: Info },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={item.label}
              whileHover={{ scale: 1.03, y: -2 }}
              className="flex flex-col items-center rounded-xl border border-border/40 p-5"
              style={{ backgroundColor: item.bg }}
            >
              <div
                className="mb-2 flex size-9 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${item.color}20` }}
              >
                <Icon className="size-4.5" style={{ color: item.color }} />
              </div>
              <span className="text-3xl font-bold tabular-nums" style={{ color: item.color }}>
                {item.count.toLocaleString()}
              </span>
              <span className="mt-1 text-xs text-muted-foreground">{item.label}</span>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Exposure indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="mb-6 w-full max-w-2xl"
      >
        <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card p-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-red-500/10">
            <TrendingDown className="size-5 text-red-400" />
          </div>
          <div className="flex-1">
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className="font-medium">Risk Exposure Level</span>
              <span className="font-medium text-red-400">High</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-muted">
              <motion.div
                className="h-full rounded-full"
                style={{
                  background: "linear-gradient(90deg, #EF4444, #F59E0B)",
                }}
                initial={{ width: 0 }}
                animate={{ width: "78%" }}
                transition={{ delay: 0.8, duration: 1.2, ease: "easeOut" }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Auto-remediate callout + CTA */}
      {showCta && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-4 flex flex-col items-center gap-4"
        >
          <div className="flex items-center gap-2 rounded-full bg-[#00E5A0]/10 px-5 py-2 text-sm">
            <Shield className="size-4 text-[#00E5A0]" />
            <span className="text-muted-foreground">
              evident.ai can auto-remediate{" "}
              <span className="font-semibold text-[#00E5A0]">
                {remediateAnimated.toLocaleString()}
              </span>{" "}
              of {totalAnimated.toLocaleString()} findings
            </span>
          </div>
          <Button
            size="lg"
            onClick={() => setStep("dashboard")}
            className="group gap-2"
          >
            View Compliance Dashboard
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
