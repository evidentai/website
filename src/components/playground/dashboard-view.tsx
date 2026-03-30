"use client";

import { useEffect, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { usePlaygroundStore } from "@/lib/playground-store";
import { getDemoData } from "@/lib/playground-data";
import {
  CheckCircle2,
  Circle,
  ArrowRight,
  RotateCcw,
  Shield,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function DashboardView() {
  const {
    framework,
    cloud,
    complianceScore,
    checkedItems,
    setComplianceScore,
    setCheckedItems,
    restart,
  } = usePlaygroundStore();

  const data = useMemo(
    () => (framework && cloud ? getDemoData(framework, cloud) : null),
    [framework, cloud]
  );

  const scoreAnimRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const checkAnimRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const finalScore = data?.finalScore ?? 0;
  const checklistLen = data?.checklist.length ?? 0;

  useEffect(() => {
    if (!finalScore) return;
    let currentScore = 0;

    scoreAnimRef.current = setInterval(() => {
      currentScore += 1;
      if (currentScore >= finalScore) {
        if (scoreAnimRef.current) clearInterval(scoreAnimRef.current);
        setComplianceScore(finalScore);
      } else {
        setComplianceScore(currentScore);
      }
    }, 30);

    return () => {
      if (scoreAnimRef.current) clearInterval(scoreAnimRef.current);
    };
  }, [finalScore, setComplianceScore]);

  const checkedTarget = Math.ceil(checklistLen * 0.22);

  useEffect(() => {
    if (!checkedTarget) return;
    let currentChecked = 0;

    checkAnimRef.current = setInterval(() => {
      currentChecked += 1;
      if (currentChecked >= checkedTarget) {
        if (checkAnimRef.current) clearInterval(checkAnimRef.current);
        setCheckedItems(checkedTarget);
      } else {
        setCheckedItems(currentChecked);
      }
    }, 300);

    return () => {
      if (checkAnimRef.current) clearInterval(checkAnimRef.current);
    };
  }, [checkedTarget, setCheckedItems]);

  if (!data) return null;

  const circumference = 2 * Math.PI * 54;
  const offset = circumference - (complianceScore / 100) * circumference;

  const scoreColor =
    complianceScore < 40
      ? "#EF4444"
      : complianceScore < 60
        ? "#F59E0B"
        : complianceScore < 80
          ? "#3B82F6"
          : "#00E5A0";

  const criticalCount = data.risks.filter((r) => r.severity === "critical").length;
  const highCount = data.risks.filter((r) => r.severity === "high").length;
  const passedControls = data.checklist.filter((_, i) => i < checkedItems).length;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Dashboard
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Your compliance dashboard
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Here&apos;s your {framework} compliance posture at a glance.
        </p>
      </motion.div>

      {/* Top stat cards */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mb-6 grid w-full max-w-3xl grid-cols-3 gap-3"
      >
        <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card p-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-[#00E5A0]/10">
            <TrendingUp className="size-5 text-[#00E5A0]" />
          </div>
          <div>
            <p className="text-xl font-bold">{passedControls}/{data.checklist.length}</p>
            <p className="text-[11px] text-muted-foreground">Controls Passing</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card p-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-red-500/10">
            <AlertTriangle className="size-5 text-red-400" />
          </div>
          <div>
            <p className="text-xl font-bold">{criticalCount + highCount}</p>
            <p className="text-[11px] text-muted-foreground">High-Priority Risks</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-xl border border-border/40 bg-card p-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-blue-500/10">
            <Shield className="size-5 text-blue-400" />
          </div>
          <div>
            <p className="text-xl font-bold">{data.risks.length}</p>
            <p className="text-[11px] text-muted-foreground">Total Findings</p>
          </div>
        </div>
      </motion.div>

      <div className="grid w-full max-w-3xl gap-6 md:grid-cols-2">
        {/* Score ring */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col items-center justify-center rounded-xl border border-border/50 bg-card p-8"
        >
          <div className="relative mb-4 flex size-36 items-center justify-center">
            <svg className="-rotate-90" viewBox="0 0 120 120" width="144" height="144">
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke="hsl(var(--muted))"
                strokeWidth="8"
              />
              <circle
                cx="60"
                cy="60"
                r="54"
                fill="none"
                stroke={scoreColor}
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                style={{ transition: "stroke-dashoffset 0.1s ease-out, stroke 0.3s ease" }}
              />
            </svg>
            <div className="absolute flex flex-col items-center">
              <span className="text-4xl font-bold">{complianceScore}%</span>
            </div>
          </div>
          <h3 className="text-lg font-semibold">Compliance Score</h3>
          <p className="mt-1 text-center text-sm text-muted-foreground">
            {complianceScore < 40
              ? "Significant gaps found — immediate action needed"
              : complianceScore < 60
                ? "Several areas need improvement"
                : complianceScore < 80
                  ? "Good progress — a few gaps remain"
                  : "Strong compliance posture"}
          </p>
        </motion.div>

        {/* Checklist */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="rounded-xl border border-border/50 bg-card p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-lg font-semibold">Controls checklist</h3>
            <span className="rounded-full bg-[#00E5A0]/10 px-2.5 py-0.5 text-xs font-medium text-[#00E5A0]">
              {passedControls} of {data.checklist.length}
            </span>
          </div>
          <div className="max-h-72 space-y-1.5 overflow-y-auto pr-2">
            {data.checklist.map((item, i) => {
              const isChecked = i < checkedItems;
              return (
                <motion.div
                  key={item.id}
                  className="flex items-start gap-3 rounded-lg px-3 py-2 transition-colors"
                  initial={false}
                  animate={{
                    backgroundColor: isChecked
                      ? "rgba(0,229,160,0.05)"
                      : "transparent",
                  }}
                >
                  {isChecked ? (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#00E5A0]" />
                    </motion.div>
                  ) : (
                    <Circle className="mt-0.5 size-4 shrink-0 text-muted-foreground/30" />
                  )}
                  <div>
                    <span
                      className={`text-sm ${
                        isChecked ? "text-foreground" : "text-muted-foreground"
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="ml-2 text-[10px] text-muted-foreground/60">
                      {item.category}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* Bold CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-10 flex flex-col items-center gap-4"
      >
        <Button
          size="lg"
          asChild
          className="group relative gap-2.5 px-8 py-6 text-base"
          style={{
            background: "linear-gradient(135deg, #00E5A0 0%, #00C98B 50%, #00B37E 100%)",
            color: "#000",
            boxShadow: "0 0 24px rgba(0,229,160,0.35), 0 4px 16px rgba(0,0,0,0.2)",
          }}
        >
          <Link href="/book-demo">
            Book a Demo
            <ArrowRight className="size-5 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={restart}
          className="gap-1.5 text-xs text-muted-foreground"
        >
          <RotateCcw className="size-3.5" />
          Try Another Framework
        </Button>
      </motion.div>
    </div>
  );
}
