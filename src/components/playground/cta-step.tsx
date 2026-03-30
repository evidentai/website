"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { usePlaygroundStore } from "@/lib/playground-store";
import { RotateCcw, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function CtaStep() {
  const { framework, cloud, restart } = usePlaygroundStore();

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, type: "spring" }}
        className="relative w-full max-w-2xl overflow-hidden rounded-2xl border border-border/50 bg-card p-10 text-center sm:p-14"
      >
        {/* Subtle gradient background */}
        <div
          className="absolute inset-0 -z-10 opacity-30"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(0,229,160,0.15), transparent 70%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="mx-auto mb-6 flex size-16 items-center justify-center rounded-2xl bg-[#00E5A0]/10">
            <Sparkles className="size-8 text-[#00E5A0]" />
          </div>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to automate your {framework} compliance?
          </h2>

          <p className="mx-auto mt-4 max-w-md text-lg text-muted-foreground">
            You just saw how evident.ai scans your {cloud} infrastructure and surfaces risks in minutes. 
            The real platform does it continuously — and fixes issues automatically.
          </p>
        </motion.div>

        <motion.div
          className="mt-8 flex flex-wrap justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <Button size="lg" asChild className="group gap-2">
            <Link href="/book-demo">
              Book a Demo
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={restart}
            className="gap-2"
          >
            <RotateCcw className="size-4" />
            Try Another Framework
          </Button>
        </motion.div>

        <motion.p
          className="mt-6 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
        >
          No credit card required.
        </motion.p>
      </motion.div>
    </div>
  );
}
