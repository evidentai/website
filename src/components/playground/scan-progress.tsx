"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { usePlaygroundStore } from "@/lib/playground-store";
import { getDemoData } from "@/lib/playground-data";
import { Terminal, Loader2 } from "lucide-react";

export function ScanProgress() {
  const {
    framework,
    cloud,
    scanProgress,
    scanLogs,
    setScanProgress,
    addScanLog,
    setStep,
  } = usePlaygroundStore();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const logContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!framework || !cloud) return;

    const data = getDemoData(framework, cloud);
    let logIndex = 0;
    let progress = 0;

    intervalRef.current = setInterval(() => {
      progress += Math.random() * 6 + 2;
      if (progress > 100) progress = 100;
      setScanProgress(Math.round(progress));

      if (logIndex < data.scanLogs.length) {
        addScanLog(data.scanLogs[logIndex]);
        logIndex++;
      }

      if (progress >= 100) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setTimeout(() => setStep("evidenceCapture"), 800);
      }
    }, 400);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [framework, cloud, setScanProgress, addScanLog, setStep]);

  useEffect(() => {
    if (logContainerRef.current) {
      logContainerRef.current.scrollTop = logContainerRef.current.scrollHeight;
    }
  }, [scanLogs]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Step 3 of 6
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Scanning your infrastructure
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Our agents are analyzing your {cloud} environment for {framework} compliance...
        </p>
      </motion.div>

      <div className="w-full max-w-2xl">
        {/* Progress bar */}
        <div className="mb-6">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="flex items-center gap-2 text-muted-foreground">
              <Loader2 className="size-4 animate-spin" />
              Scanning resources...
            </span>
            <span className="font-mono text-[#00E5A0]">{scanProgress}%</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-muted">
            <motion.div
              className="h-full rounded-full"
              style={{ backgroundColor: "#00E5A0" }}
              initial={{ width: 0 }}
              animate={{ width: `${scanProgress}%` }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Terminal-style log */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="overflow-hidden rounded-xl border border-border/50 bg-black/90"
        >
          <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5">
            <Terminal className="size-4 text-[#00E5A0]" />
            <span className="text-xs text-white/60">evidentflow.ai scanner</span>
            <div className="ml-auto flex gap-1.5">
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-white/20" />
              <span className="size-2.5 rounded-full bg-[#00E5A0]" />
            </div>
          </div>
          <div
            ref={logContainerRef}
            className="h-64 overflow-y-auto p-4 font-mono text-sm"
          >
            <AnimatePresence mode="popLayout">
              {scanLogs.map((log, i) => (
                <motion.div
                  key={`${log}-${i}`}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mb-1 flex items-start gap-2"
                >
                  <span className="select-none text-[#00E5A0]/60">$</span>
                  <span className="text-white/80">{log}</span>
                </motion.div>
              ))}
            </AnimatePresence>
            {scanProgress < 100 && (
              <div className="mt-1 flex items-center gap-2">
                <span className="text-[#00E5A0]/60">$</span>
                <span className="animate-pulse text-white/40">▌</span>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
