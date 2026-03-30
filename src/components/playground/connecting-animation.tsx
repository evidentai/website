"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { usePlaygroundStore } from "@/lib/playground-store";
import { Loader2, CheckCircle2 } from "lucide-react";

const steps = [
  "Establishing secure connection...",
  "Authenticating credentials...",
  "Enumerating resources...",
  "Connection established!",
];

export function ConnectingAnimation() {
  const { cloud, setStep } = usePlaygroundStore();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStep("scanning");
    }, steps.length * 700 + 500);

    return () => clearTimeout(timeout);
  }, [setStep]);

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Connecting to {cloud}
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Setting up a secure read-only connection...
        </p>
      </motion.div>

      <div className="w-full max-w-md space-y-4">
        {steps.map((step, i) => (
          <motion.div
            key={step}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.7, duration: 0.4 }}
            className="flex items-center gap-3 rounded-lg border border-border/50 bg-card px-4 py-3"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.7 + 0.5, type: "spring" }}
            >
              {i === steps.length - 1 ? (
                <CheckCircle2 className="size-5 text-[#00E5A0]" />
              ) : (
                <motion.div
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ delay: i * 0.7, duration: 0.6 }}
                >
                  <Loader2 className="size-5 animate-spin text-[#00E5A0]" />
                </motion.div>
              )}
            </motion.div>
            <span className="text-sm text-foreground">{step}</span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
