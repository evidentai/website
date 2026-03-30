"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlaygroundStore } from "@/lib/playground-store";
import { FolderOpen, Camera, CheckCircle2, MousePointer2 } from "lucide-react";

interface EvidenceItem {
  id: string;
  label: string;
  section: string;
  cursorTarget: { x: number; y: number };
}

interface CloudEvidence {
  sequence: EvidenceItem[];
  url: string;
  sidebar: string[];
}

const evidenceByCloud: Record<string, CloudEvidence> = {
  AWS: {
    url: "console.aws.amazon.com",
    sidebar: ["Identity & Access", "Storage Security", "Logging & Monitoring", "Networking", "Compute"],
    sequence: [
      {
        id: "iam-policy",
        label: "IAM Policy Configuration",
        section: "Identity & Access",
        cursorTarget: { x: 25, y: 35 },
      },
      {
        id: "s3-encryption",
        label: "S3 Bucket Encryption Settings",
        section: "Storage Security",
        cursorTarget: { x: 65, y: 50 },
      },
      {
        id: "cloudtrail",
        label: "CloudTrail Audit Logs",
        section: "Logging & Monitoring",
        cursorTarget: { x: 40, y: 70 },
      },
    ],
  },
  Azure: {
    url: "portal.azure.com",
    sidebar: ["Identity & Access", "Storage Security", "Monitoring", "Networking", "Compute"],
    sequence: [
      {
        id: "azure-ad-roles",
        label: "Azure AD Role Assignments",
        section: "Identity & Access",
        cursorTarget: { x: 25, y: 35 },
      },
      {
        id: "blob-encryption",
        label: "Blob Storage Encryption",
        section: "Storage Security",
        cursorTarget: { x: 65, y: 50 },
      },
      {
        id: "activity-log",
        label: "Activity Log Configuration",
        section: "Monitoring",
        cursorTarget: { x: 40, y: 70 },
      },
    ],
  },
  GCP: {
    url: "console.cloud.google.com",
    sidebar: ["IAM & Admin", "Storage Security", "Logging", "Networking", "Compute"],
    sequence: [
      {
        id: "cloud-iam",
        label: "Cloud IAM Policy Bindings",
        section: "IAM & Admin",
        cursorTarget: { x: 25, y: 35 },
      },
      {
        id: "gcs-policy",
        label: "Cloud Storage Bucket Policy",
        section: "Storage Security",
        cursorTarget: { x: 65, y: 50 },
      },
      {
        id: "cloud-audit",
        label: "Cloud Audit Logs",
        section: "Logging",
        cursorTarget: { x: 40, y: 70 },
      },
    ],
  },
};

const PHASE_DURATION = 1800;

export function EvidenceCapture() {
  const { cloud, setStep } = usePlaygroundStore();
  const [phase, setPhase] = useState(0);
  const [captured, setCaptured] = useState<string[]>([]);
  const [flashing, setFlashing] = useState(false);
  const [complete, setComplete] = useState(false);

  const cloudData = useMemo(
    () => evidenceByCloud[cloud ?? "AWS"] ?? evidenceByCloud.AWS,
    [cloud]
  );

  const evidenceSequence = cloudData.sequence;
  const totalPhases = evidenceSequence.length;

  useEffect(() => {
    if (phase >= totalPhases) {
      setTimeout(() => setComplete(true), 400);
      setTimeout(() => setStep("graphBuild"), 2200);
      return;
    }

    const item = evidenceSequence[phase];

    const captureTimeout = setTimeout(() => {
      setFlashing(true);
      setTimeout(() => {
        setFlashing(false);
        setCaptured((prev) => [...prev, item.id]);
        setTimeout(() => setPhase((p) => p + 1), 600);
      }, 300);
    }, PHASE_DURATION);

    return () => clearTimeout(captureTimeout);
  }, [phase, totalPhases, setStep, evidenceSequence]);

  const currentItem = phase < totalPhases ? evidenceSequence[phase] : null;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Capturing Evidence
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Collecting compliance evidence
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Automatically capturing screenshots and configurations from your {cloud} console...
        </p>
      </motion.div>

      <div className="flex w-full max-w-4xl gap-6">
        {/* Simulated Console */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative flex-1 overflow-hidden rounded-xl border border-border/50 bg-[#0a0a0a]"
        >
          {/* Browser chrome */}
          <div className="flex items-center gap-2 border-b border-white/10 bg-[#1a1a1a] px-4 py-2.5">
            <div className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
            </div>
            <div className="mx-4 flex-1 rounded-md bg-white/5 px-3 py-1 text-xs text-white/40">
              {cloudData.url}
            </div>
          </div>

          {/* Console content */}
          <div className="relative h-72 p-4">
            {/* Sidebar */}
            <div className="absolute left-0 top-0 h-full w-36 border-r border-white/5 p-3">
              <div className="mb-4 h-2 w-16 rounded bg-white/10" />
              {cloudData.sidebar.map((item) => (
                <div
                  key={item}
                  className={`mb-2 rounded px-2 py-1.5 text-[9px] ${
                    currentItem?.section === item
                      ? "bg-[#00E5A0]/10 text-[#00E5A0]"
                      : "text-white/30"
                  }`}
                >
                  {item}
                </div>
              ))}
            </div>

            {/* Main area */}
            <div className="ml-40 space-y-3">
              <div className="h-3 w-40 rounded bg-white/10" />
              <div className="h-2 w-64 rounded bg-white/5" />

              <div className="mt-4 grid grid-cols-2 gap-3">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/5 bg-white/[0.02] p-3"
                  >
                    <div className="mb-2 h-2 w-20 rounded bg-white/8" />
                    <div className="h-1.5 w-full rounded bg-white/4" />
                    <div className="mt-1 h-1.5 w-3/4 rounded bg-white/4" />
                  </div>
                ))}
              </div>

              <div className="mt-3 rounded-lg border border-white/5 bg-white/[0.02] p-3">
                <div className="mb-2 flex items-center gap-2">
                  <div className="h-2 w-24 rounded bg-white/8" />
                  <div className="h-4 w-12 rounded-full bg-[#00E5A0]/20 text-center text-[8px] leading-4 text-[#00E5A0]">
                    Active
                  </div>
                </div>
                <div className="h-1.5 w-full rounded bg-white/4" />
              </div>
            </div>

            {/* Animated cursor */}
            {currentItem && (
              <motion.div
                className="pointer-events-none absolute z-20"
                animate={{
                  left: `${currentItem.cursorTarget.x}%`,
                  top: `${currentItem.cursorTarget.y}%`,
                }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              >
                <MousePointer2 className="size-5 -rotate-12 fill-white text-white drop-shadow-lg" />
              </motion.div>
            )}

            {/* Screenshot flash */}
            <AnimatePresence>
              {flashing && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.6 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute inset-0 z-30 bg-white"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Current action label */}
          {currentItem && (
            <motion.div
              key={currentItem.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex items-center gap-2 border-t border-white/10 px-4 py-2"
            >
              <Camera className="size-3.5 text-[#00E5A0]" />
              <span className="text-xs text-white/60">
                Capturing: {currentItem.label}
              </span>
            </motion.div>
          )}
        </motion.div>

        {/* Evidence Folder */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="w-56 shrink-0"
        >
          <div className="rounded-xl border border-border/50 bg-card p-4">
            <div className="mb-4 flex items-center gap-2">
              <FolderOpen className="size-5 text-[#00E5A0]" />
              <span className="text-sm font-medium">Evidence Folder</span>
              {captured.length > 0 && (
                <span className="ml-auto flex size-5 items-center justify-center rounded-full bg-[#00E5A0] text-[10px] font-bold text-black">
                  {captured.length}
                </span>
              )}
            </div>

            <div className="space-y-2">
              <AnimatePresence mode="popLayout">
                {captured.map((id) => {
                  const item = evidenceSequence.find((e) => e.id === id);
                  if (!item) return null;
                  return (
                    <motion.div
                      key={id}
                      initial={{ opacity: 0, x: -60, scale: 0.5, rotate: -5 }}
                      animate={{ opacity: 1, x: 0, scale: 1, rotate: 0 }}
                      transition={{ type: "spring", stiffness: 200, damping: 20 }}
                      className="rounded-lg border border-border/50 bg-background p-2.5"
                    >
                      <div className="mb-1 flex items-center gap-1.5">
                        <CheckCircle2 className="size-3 text-[#00E5A0]" />
                        <span className="text-[10px] font-medium text-foreground">
                          {item.label}
                        </span>
                      </div>
                      <div className="flex gap-1">
                        <div className="h-6 flex-1 rounded bg-muted" />
                        <div className="h-6 w-8 rounded bg-muted" />
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>

              {captured.length === 0 && (
                <p className="py-4 text-center text-xs text-muted-foreground/50">
                  Waiting for captures...
                </p>
              )}
            </div>
          </div>

          {/* Completion state */}
          <AnimatePresence>
            {complete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-lg bg-[#00E5A0]/10 p-3 text-center"
              >
                <CheckCircle2 className="mx-auto mb-1 size-5 text-[#00E5A0]" />
                <p className="text-xs font-medium text-[#00E5A0]">
                  Evidence collection complete
                </p>
                <p className="mt-0.5 text-[10px] text-muted-foreground">
                  {captured.length} artifacts captured
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  );
}
