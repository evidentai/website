"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Layers, Plug, Bot, AlertTriangle, Share2, type LucideIcon } from "lucide-react";

interface Step {
  number: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

interface PathData {
  id: string;
  d: string;
  length: number;
}

const steps: Step[] = [
  {
    number: 1,
    icon: Layers,
    title: "Pick your frameworks",
    description:
      "Choose SOC 2, ISO 27001, HIPAA, GDPR, FedRAMP-lite, or a custom framework.",
  },
  {
    number: 2,
    icon: Plug,
    title: "Connect your stack",
    description:
      "Securely connect cloud accounts, IdPs, repos, CI/CD, endpoints, and security tools.",
  },
  {
    number: 3,
    icon: Bot,
    title: "Agents collect evidence",
    description:
      "Collectors and browser agents continuously pull configs, logs, and screenshots.",
  },
  {
    number: 4,
    icon: AlertTriangle,
    title: "Gaps flagged with fixes",
    description:
      "Missing evidence, misconfigurations, and drift highlighted in real time with remediation steps.",
  },
  {
    number: 5,
    icon: Share2,
    title: "Share trust report",
    description:
      "Publish live trust reports and give auditors a dedicated portal.",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

function AnimatedPath({
  path,
  visible,
  highlighted,
  delay,
  isDark,
}: {
  path: PathData;
  visible: boolean;
  highlighted: boolean;
  delay: number;
  isDark: boolean;
}) {
  const particleCount = 2;
  const baseDuration = 2.4;
  const highlightDuration = 1.6;
  const dur = highlighted ? highlightDuration : baseDuration;

  const baseStroke = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.08)";
  const glowStroke = "rgba(0,229,160,0.3)";

  return (
    <g>
      {/* Base path */}
      <path
        d={path.d}
        fill="none"
        stroke={baseStroke}
        strokeWidth={2}
        strokeDasharray={path.length}
        strokeDashoffset={visible ? 0 : path.length}
        style={{
          transition: `stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}s`,
        }}
      />
      {/* Glow path */}
      <path
        d={path.d}
        fill="none"
        stroke={glowStroke}
        strokeWidth={highlighted ? 4 : 2}
        filter="url(#path-glow)"
        strokeDasharray={path.length}
        strokeDashoffset={visible ? 0 : path.length}
        opacity={highlighted ? 0.8 : 0.4}
        style={{
          transition: `stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}s, stroke-width 0.3s, opacity 0.3s`,
        }}
      />
      {/* Flowing particles */}
      {visible &&
        Array.from({ length: particleCount }).map((_, i) => (
          <circle key={i} r={highlighted ? 2.5 : 2} fill="#00E5A0" filter="url(#particle-glow)">
            <animateMotion
              dur={`${dur}s`}
              repeatCount="indefinite"
              begin={`${delay + (i * dur) / particleCount}s`}
              path={path.d}
            />
            <animate
              attributeName="opacity"
              values="0;0.9;0.9;0"
              keyTimes="0;0.1;0.85;1"
              dur={`${dur}s`}
              repeatCount="indefinite"
              begin={`${delay + (i * dur) / particleCount}s`}
            />
          </circle>
        ))}
    </g>
  );
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const stepRefs = useRef<(HTMLDivElement | null)[]>(new Array(steps.length).fill(null));
  const [paths, setPaths] = useState<PathData[]>([]);
  const [pathsReady, setPathsReady] = useState(false);
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);
  const [isDark, setIsDark] = useState(true);

  // Theme detection
  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkTheme = () => {
      const htmlElement = document.documentElement;
      const isDarkMode = htmlElement.classList.contains("dark");
      setIsDark(isDarkMode);
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  // Calculate paths between steps
  const calculatePaths = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const validSteps = stepRefs.current.filter(Boolean) as HTMLDivElement[];
    if (validSteps.length < 2) return;

    const newPaths: PathData[] = [];
    const containerRect = container.getBoundingClientRect();

    for (let i = 0; i < validSteps.length - 1; i++) {
      const currentRect = validSteps[i].getBoundingClientRect();
      const nextRect = validSteps[i + 1].getBoundingClientRect();

      // Calculate center bottom of current step
      const x1 = currentRect.left + currentRect.width / 2 - containerRect.left;
      const y1 = currentRect.bottom - containerRect.top;

      // Calculate center top of next step
      const x2 = nextRect.left + nextRect.width / 2 - containerRect.left;
      const y2 = nextRect.top - containerRect.top;

      // Create curved vertical path
      const dy = y2 - y1;
      const pathD = `M ${x1} ${y1} C ${x1} ${y1 + dy * 0.5}, ${x2} ${y1 + dy * 0.5}, ${x2} ${y2}`;
      const pathLength = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) * 1.2;

      newPaths.push({
        id: `path-${i}-${i + 1}`,
        d: pathD,
        length: pathLength,
      });
    }

    setPaths(newPaths);
  }, []);

  // Trigger path calculation after steps are visible
  useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      calculatePaths();
      setPathsReady(true);
    }, 800); // Wait for step animations to mostly complete
    return () => clearTimeout(timer);
  }, [isInView, calculatePaths]);

  // Recalculate paths on resize
  useEffect(() => {
    if (!pathsReady) return;
    let timeoutId: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(calculatePaths, 150);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timeoutId);
    };
  }, [pathsReady, calculatePaths]);

  const isPathHighlighted = (pathId: string) => {
    if (hoveredStep === null) return false;
    return pathId.includes(`path-${hoveredStep - 1}-`) || pathId.includes(`-${hoveredStep}`);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28 overflow-hidden">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-16 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Five steps to audit readiness
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            From zero to audit-ready in weeks. Our platform automates the heavy
            lifting at every stage.
          </p>
        </motion.div>

        <div ref={containerRef} className="relative mx-auto max-w-3xl">
          {/* SVG Layer for paths */}
          <svg
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
            style={{ zIndex: 0 }}
          >
            <defs>
              <filter id="path-glow">
                <feGaussianBlur stdDeviation="3" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="particle-glow">
                <feGaussianBlur stdDeviation="2" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {paths.map((path, i) => (
              <AnimatedPath
                key={path.id}
                path={path}
                visible={pathsReady}
                highlighted={isPathHighlighted(path.id)}
                delay={0.8 + i * 0.15}
                isDark={isDark}
              />
            ))}
          </svg>

          {/* Steps */}
          <div className="relative z-10 space-y-12">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className="relative"
                variants={cardVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={index}
                onMouseEnter={() => setHoveredStep(step.number)}
                onMouseLeave={() => setHoveredStep(null)}
              >
                <div
                  className="group relative rounded-2xl border bg-card p-6 transition-all duration-300 hover:scale-[1.02]"
                  style={{
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    boxShadow:
                      hoveredStep === step.number
                        ? "0 0 30px rgba(0,229,160,0.2), 0 8px 30px rgba(0,0,0,0.12)"
                        : "0 0 20px rgba(0,229,160,0.05), 0 4px 20px rgba(0,0,0,0.08)",
                  }}
                >
                  <div className="flex items-start gap-6">
                    {/* Step number with pulsing ring */}
                    <div className="relative shrink-0">
                      {/* Pulsing ring animation */}
                      <div
                        className="absolute inset-0 rounded-full border-2 border-primary animate-ping"
                        style={{
                          animationDuration: "2s",
                          opacity: hoveredStep === step.number ? 0.4 : 0.2,
                        }}
                      />
                      <div
                        className="relative flex size-12 items-center justify-center rounded-full border-2 border-primary bg-background text-lg font-bold text-primary transition-all duration-300 group-hover:scale-110"
                        style={{
                          boxShadow:
                            hoveredStep === step.number
                              ? "0 0 20px rgba(0,229,160,0.5)"
                              : "0 0 10px rgba(0,229,160,0.2)",
                        }}
                      >
                        {step.number}
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start gap-4 mb-3">
                        {/* Icon */}
                        <div
                          className="flex size-12 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:rotate-6"
                          style={{
                            background: "linear-gradient(135deg, rgba(0,229,160,0.15), rgba(0,229,160,0.05))",
                          }}
                        >
                          <step.icon className="size-6" style={{ color: "#00E5A0" }} />
                        </div>

                        {/* Title */}
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-foreground mb-2">
                            {step.title}
                          </h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
