"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight, Activity, Shield } from "lucide-react";
import Link from "next/link";

const Beams = dynamic(() => import("@/components/ui/beams"), { ssr: false });

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const frameworkProgress = [
  { name: "SOC 2", progress: 73, color: "bg-emerald-500" },
  { name: "ISO 27001", progress: 58, color: "bg-blue-500" },
  { name: "HIPAA", progress: 41, color: "bg-amber-500" },
];

const recentActivity = [
  { text: "AWS IAM policy collected", time: "2m ago", icon: Shield },
  { text: "GitHub branch protection verified", time: "5m ago", icon: CheckCircle },
  { text: "Okta MFA status checked", time: "12m ago", icon: Activity },
];

export function HeroSection() {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const [idleAngle, setIdleAngle] = useState(0);

  useEffect(() => {
    let frame: number;
    const animate = () => {
      setIdleAngle((prev) => (prev + 0.8) % 360);
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const rotateX = ((e.clientY - centerY) / (rect.height / 2)) * -12;
    const rotateY = ((e.clientX - centerX) / (rect.width / 2)) * 12;
    setRotate({ x: rotateX, y: rotateY });
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePos({ x: px, y: py });
  }, []);

  const handleMouseEnter = useCallback(() => setIsHovering(true), []);
  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    setRotate({ x: 0, y: 0 });
  }, []);

  return (
    <section className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      <div className="absolute inset-0 -z-10">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#00E5A0"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <motion.h1
              className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
            >
              Continuous compliance &amp; evidence automation for high-growth
              startups
            </motion.h1>

            <motion.ul
              className="mt-8 space-y-3"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
            >
              {[
                "Cut audit prep from months to weeks",
                "Prove security posture with real system evidence",
              ].map((point) => (
                <li key={point} className="flex items-start gap-3 text-lg dark:text-muted-foreground text-foreground">
                  <CheckCircle className="mt-0.5 size-5 shrink-0 text-primary" />
                  {point}
                </li>
              ))}
            </motion.ul>

            <motion.div
              className="mt-10 flex flex-wrap gap-4"
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
            >
              <Button size="lg" asChild>
                <Link href="/book-demo">
                  Book Demo
                  <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="/gap-assessment">Start Free SOC 2 Gap Assessment</Link>
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative"
            variants={fadeUp}
            initial="hidden"
            animate="visible"
            custom={3}
          >
            <div
              ref={cardRef}
              className="group relative aspect-[4/3] w-full"
              onMouseMove={handleMouseMove}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              <div className="[perspective:1200px] [transform-style:preserve-3d]">

                {/* 3D card container */}
                <div
                  className="relative size-full [transform-style:preserve-3d] transition-transform duration-200 ease-out"
                  style={{
                    transform: `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(${isHovering ? 16 : 0}px)`,
                  }}
                >
                  {/* Animated glow border — sits behind the card, 1px larger on each side */}
                  <div
                    className="absolute -inset-[1px] rounded-2xl z-0 transition-opacity duration-500"
                    style={{
                      opacity: isHovering ? 1 : 0.5,
                      background: isHovering
                        ? `conic-gradient(from ${Math.atan2(mousePos.y - 50, mousePos.x - 50) * (180 / Math.PI)}deg at ${mousePos.x}% ${mousePos.y}%, rgba(0,229,160,0.8), rgba(0,229,160,0.1) 40%, rgba(0,229,160,0.1) 60%, rgba(0,229,160,0.8))`
                        : `conic-gradient(from ${idleAngle}deg at 50% 50%, rgba(0,229,160,0.4), rgba(0,229,160,0.05) 25%, rgba(0,229,160,0.05) 50%, rgba(0,229,160,0.4) 75%, rgba(0,229,160,0.05))`,
                    }}
                  />

                  {/* Soft outer glow — blurred halo outside the border */}
                  <div
                    className="absolute -inset-3 rounded-3xl z-0 blur-xl transition-opacity duration-700 pointer-events-none"
                    style={{
                      opacity: isHovering ? 0.6 : 0.2,
                      background: isHovering
                        ? `radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(0,229,160,0.3), transparent 70%)`
                        : `radial-gradient(ellipse at 50% 50%, rgba(0,229,160,0.15), transparent 70%)`,
                    }}
                  />

                  {/* Main card */}
                  <div
                    className="relative z-10 size-full rounded-2xl overflow-hidden dark:bg-[rgba(255,255,255,0.05)] bg-[rgba(255,255,255,0.3)]"
                    style={{
                      backdropFilter: "blur(12px) saturate(1.3)",
                      WebkitBackdropFilter: "blur(12px) saturate(1.3)",
                      boxShadow:
                        "0 0 0 1px rgba(0,229,160,0.15) inset, 0 1px 0 0 rgba(255,255,255,0.1) inset, 0 -1px 0 0 rgba(255,255,255,0.05) inset, 0 8px 40px rgba(0,0,0,0.2), 0 20px 60px rgba(0,0,0,0.1)",
                      border: "1px solid rgba(255,255,255,0.15)",
                    }}
                  >

                    {/* Dashboard content */}
                    <div className="size-full p-6 relative">
                      {/* Subtle background overlay for text readability */}
                      <div className="absolute inset-0 bg-background/40 dark:bg-background/40 -z-10" />
                      
                      <div className="mb-6 flex items-center justify-between relative z-10">
                        <span className="text-sm font-medium text-foreground/90">
                          Compliance Overview
                        </span>
                        <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                          Live
                        </span>
                      </div>

                      <div className="mb-8 flex items-end gap-4 relative z-10">
                        <div className="relative flex size-24 items-center justify-center">
                          <svg className="size-24 -rotate-90" viewBox="0 0 100 100">
                            <circle
                              cx="50"
                              cy="50"
                              r="42"
                              fill="none"
                              stroke="hsl(var(--muted))"
                              strokeWidth="8"
                            />
                            <circle
                              cx="50"
                              cy="50"
                              r="42"
                              fill="none"
                              stroke="hsl(var(--primary))"
                              strokeWidth="8"
                              strokeLinecap="round"
                              strokeDasharray={`${87 * 2.64} ${264 - 87 * 2.64}`}
                            />
                          </svg>
                          <span className="absolute text-2xl font-bold text-foreground">87%</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Compliance Score</p>
                          <p className="text-xs text-muted-foreground">Across 3 frameworks</p>
                        </div>
                      </div>

                      <div className="mb-6 space-y-3 relative z-10">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Framework Progress
                        </p>
                        {frameworkProgress.map((fw) => (
                          <div key={fw.name} className="space-y-1">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-foreground">{fw.name}</span>
                              <span className="text-muted-foreground">{fw.progress}%</span>
                            </div>
                            <div className="h-1.5 rounded-full bg-muted">
                              <div
                                className={`h-full rounded-full ${fw.color}`}
                                style={{ width: `${fw.progress}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="space-y-2 relative z-10">
                        <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                          Recent Activity
                        </p>
                        {recentActivity.map((item) => (
                          <div
                            key={item.text}
                            className="flex items-center gap-3 rounded-lg border border-border bg-background/40 dark:bg-background/20 px-3 py-2 text-sm backdrop-blur-sm"
                          >
                            <item.icon className="size-4 shrink-0 text-primary" />
                            <span className="flex-1 truncate text-foreground">{item.text}</span>
                            <span className="shrink-0 text-xs text-muted-foreground">{item.time}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
