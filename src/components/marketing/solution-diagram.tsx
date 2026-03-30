"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import {
  Cloud,
  KeyRound,
  GitBranch,
  Workflow,
  Monitor,
  LayoutDashboard,
  UserCheck,
  FileCheck,
  SearchCode,
  ScrollText,
  Camera,
  type LucideIcon,
} from "lucide-react";

interface NodeItem {
  label: string;
  icon: LucideIcon;
}

interface SolutionDiagramProps {
  showHeading?: boolean;
}

const stackItems: NodeItem[] = [
  { label: "Cloud", icon: Cloud },
  { label: "Identity", icon: KeyRound },
  { label: "Repos", icon: GitBranch },
  { label: "CI/CD", icon: Workflow },
  { label: "Endpoints", icon: Monitor },
];

const platformFeatures: NodeItem[] = [
  { label: "Evidence Engine", icon: SearchCode },
  { label: "Policy Engine", icon: ScrollText },
  { label: "Screenshot Agent", icon: Camera },
];

const outputItems: NodeItem[] = [
  { label: "Dashboard", icon: LayoutDashboard },
  { label: "Auditor Portal", icon: UserCheck },
  { label: "Trust Report", icon: FileCheck },
];

interface Point {
  x: number;
  y: number;
}

interface BeamPath {
  id: string;
  d: string;
  length: number;
}

function getRightEdge(el: HTMLElement, container: HTMLElement): Point {
  const r = el.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  return { x: r.right - c.left, y: r.top + r.height / 2 - c.top };
}

function getLeftEdge(el: HTMLElement, container: HTMLElement): Point {
  const r = el.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  return { x: r.left - c.left, y: r.top + r.height / 2 - c.top };
}

function makeCurvePath(from: Point, to: Point): string {
  const dx = to.x - from.x;
  return `M ${from.x} ${from.y} C ${from.x + dx * 0.4} ${from.y}, ${from.x + dx * 0.6} ${to.y}, ${to.x} ${to.y}`;
}

function pathLen(from: Point, to: Point): number {
  return Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2) * 1.15;
}

function Beam({
  beam,
  visible,
  highlighted,
  delay,
  isDark,
}: {
  beam: BeamPath;
  visible: boolean;
  highlighted: boolean;
  delay: number;
  isDark: boolean;
}) {
  const count = 3;
  const dur = highlighted ? 1.6 : 2.4;
  
  // Theme-aware stroke colors
  const baseStroke = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.08)";
  const highlightStroke = isDark 
    ? (highlighted ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.04)")
    : (highlighted ? "rgba(0,0,0,0.25)" : "rgba(0,0,0,0.08)");

  return (
    <g>
      <path
        d={beam.d}
        fill="none"
        stroke={baseStroke}
        strokeWidth={1}
        strokeDasharray={beam.length}
        strokeDashoffset={visible ? 0 : beam.length}
        style={{ transition: `stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}s` }}
      />
      <path
        d={beam.d}
        fill="none"
        stroke={highlightStroke}
        strokeWidth={highlighted ? 3 : 1.5}
        filter="url(#glow)"
        strokeDasharray={beam.length}
        strokeDashoffset={visible ? 0 : beam.length}
        style={{
          transition: `stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}s, stroke 0.3s, stroke-width 0.3s`,
        }}
      />
      {visible &&
        Array.from({ length: count }).map((_, i) => (
          <circle
            key={i}
            r={highlighted ? 2.5 : 1.5}
            fill="#00E5A0"
            filter="url(#pglow)"
          >
            <animateMotion
              dur={`${dur}s`}
              repeatCount="indefinite"
              begin={`${delay + (i * dur) / count}s`}
              path={beam.d}
            />
            <animate
              attributeName="opacity"
              values="0;0.85;0.85;0"
              keyTimes="0;0.08;0.88;1"
              dur={`${dur}s`}
              repeatCount="indefinite"
              begin={`${delay + (i * dur) / count}s`}
            />
          </circle>
        ))}
    </g>
  );
}

const cardV = {
  hidden: { opacity: 0, y: 16, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.08 + i * 0.05,
      duration: 0.4,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

export function SolutionDiagram({ showHeading = true }: SolutionDiagramProps = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const stackEls = useRef<(HTMLDivElement | null)[]>(new Array(stackItems.length).fill(null));
  const platEls = useRef<(HTMLDivElement | null)[]>(new Array(platformFeatures.length).fill(null));
  const outEls = useRef<(HTMLDivElement | null)[]>(new Array(outputItems.length).fill(null));

  const [beams, setBeams] = useState<BeamPath[]>([]);
  const [beamsReady, setBeamsReady] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  
  // Theme detection
  const [isDark, setIsDark] = useState(true);

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

  const calcBeams = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const sEls = stackEls.current.filter(Boolean) as HTMLDivElement[];
    const pEls = platEls.current.filter(Boolean) as HTMLDivElement[];
    const oEls = outEls.current.filter(Boolean) as HTMLDivElement[];
    if (!sEls.length || !pEls.length || !oEls.length) return;

    const b: BeamPath[] = [];

    sEls.forEach((s, si) => {
      const pi = si % pEls.length;
      const from = getRightEdge(s, c);
      const to = getLeftEdge(pEls[pi], c);
      b.push({ id: `s${si}-p${pi}`, d: makeCurvePath(from, to), length: pathLen(from, to) });
    });

    pEls.forEach((p, pi) => {
      oEls.forEach((o, oi) => {
        const from = getRightEdge(p, c);
        const to = getLeftEdge(o, c);
        b.push({ id: `p${pi}-o${oi}`, d: makeCurvePath(from, to), length: pathLen(from, to) });
      });
    });

    setBeams(b);
  }, []);

  useEffect(() => {
    if (!isInView) return;
    const t = setTimeout(() => {
      calcBeams();
      setBeamsReady(true);
    }, 500);
    return () => clearTimeout(t);
  }, [isInView, calcBeams]);

  useEffect(() => {
    if (!beamsReady) return;
    const fn = () => calcBeams();
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [beamsReady, calcBeams]);

  const [angle, setAngle] = useState(0);
  useEffect(() => {
    let f: number;
    const tick = () => {
      setAngle((a) => (a + 0.5) % 360);
      f = requestAnimationFrame(tick);
    };
    f = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(f);
  }, []);

  const isHi = (id: string) => {
    if (!hovered) return false;
    return id.includes(hovered);
  };

  return (
    <section ref={sectionRef} className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {showHeading && (
          <motion.div
            className="mx-auto mb-16 max-w-2xl text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl tracking-tight sm:text-4xl">
              How the platform connects everything
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Data flows securely from your infrastructure through our automation
              engines and into audit-ready outputs.
            </p>
          </motion.div>
        )}

        {/* ── Desktop ── */}
        <div ref={containerRef} className="relative hidden lg:block">
          <svg
            className="pointer-events-none absolute inset-0 size-full overflow-visible"
            style={{ zIndex: 1 }}
          >
            <defs>
              <filter id="glow">
                <feGaussianBlur stdDeviation="4" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <filter id="pglow">
                <feGaussianBlur stdDeviation="2.5" />
                <feMerge>
                  <feMergeNode />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {beams.map((b, i) => (
              <Beam
                key={b.id}
                beam={b}
                visible={beamsReady}
                highlighted={isHi(b.id)}
                delay={i * 0.06}
                isDark={isDark}
              />
            ))}
          </svg>

          <div className="relative z-10 flex items-start justify-between">
            {/* Left: Stack */}
            <motion.div
              className="w-[210px] shrink-0"
              initial={{ opacity: 0, x: -24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.05 }}
            >
              <div className="rounded-2xl border bg-card p-4">
                <p className="mb-4 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Your Stack
                </p>
                <div className="space-y-2">
                  {stackItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      ref={(el) => { stackEls.current[i] = el; }}
                      className="flex items-center gap-3 rounded-xl bg-muted/30 px-4 py-2.5 text-[13px] transition-all duration-300 hover:bg-muted/50"
                      variants={cardV}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      custom={i}
                      onMouseEnter={() => setHovered(`s${i}`)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <item.icon className="size-3.5 text-muted-foreground" />
                      </div>
                      <span className="text-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Center: Platform */}
            <motion.div
              className="relative w-[280px] shrink-0"
              initial={{ opacity: 0, y: 24 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div
                className="absolute -inset-[1px] rounded-2xl transition-opacity duration-500"
                style={{
                  opacity: hovered?.startsWith("p") ? 0.8 : 0.3,
                  background: isDark 
                    ? `conic-gradient(from ${angle}deg at 50% 50%, rgba(255,255,255,0.25), rgba(255,255,255,0.01) 25%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0.01))`
                    : `conic-gradient(from ${angle}deg at 50% 50%, rgba(0,229,160,0.4), rgba(0,229,160,0.05) 25%, rgba(0,229,160,0.05) 50%, rgba(0,229,160,0.4) 75%, rgba(0,229,160,0.05))`,
                }}
              />
              <div className="relative rounded-2xl border bg-card p-5">
                <p className="mb-4 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  evidentflow.ai Platform
                </p>
                <div className="space-y-2.5">
                  {platformFeatures.map((feat, i) => (
                    <motion.div
                      key={feat.label}
                      ref={(el) => { platEls.current[i] = el; }}
                      className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 text-[13px] transition-all duration-300 hover:bg-muted"
                      variants={cardV}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      custom={i + stackItems.length}
                      onMouseEnter={() => setHovered(`p${i}`)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                        <feat.icon className="size-4 text-foreground" />
                      </div>
                      <span className="text-foreground">{feat.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right: Outputs */}
            <motion.div
              className="w-[210px] shrink-0"
              initial={{ opacity: 0, x: 24 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <div className="rounded-2xl border bg-card p-4">
                <p className="mb-4 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Outputs
                </p>
                <div className="space-y-2">
                  {outputItems.map((item, i) => (
                    <motion.div
                      key={item.label}
                      ref={(el) => { outEls.current[i] = el; }}
                      className="flex items-center gap-3 rounded-xl bg-muted/30 px-4 py-2.5 text-[13px] transition-all duration-300 hover:bg-muted/50"
                      variants={cardV}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      custom={i + stackItems.length + platformFeatures.length}
                      onMouseEnter={() => setHovered(`o${i}`)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                        <item.icon className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <span className="text-foreground">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ── Mobile ── */}
        <div className="flex flex-col items-center gap-0 lg:hidden">
          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className="rounded-2xl border bg-card p-4">
              <p className="mb-3 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Your Stack
              </p>
              <div className="space-y-2">
                {stackItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl bg-muted/30 px-4 py-2.5 text-[13px]"
                    variants={cardV}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={i}
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <item.icon className="size-3.5 text-muted-foreground" />
                    </div>
                    <span className="text-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <MobileConnector visible={isInView} isDark={isDark} />

          <motion.div
            className="relative w-full max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <div
              className="absolute -inset-[1px] rounded-2xl"
              style={{
                opacity: 0.3,
                background: isDark
                  ? `conic-gradient(from ${angle}deg at 50% 50%, rgba(255,255,255,0.25), rgba(255,255,255,0.01) 25%, rgba(255,255,255,0.01) 50%, rgba(255,255,255,0.25) 75%, rgba(255,255,255,0.01))`
                  : `conic-gradient(from ${angle}deg at 50% 50%, rgba(0,229,160,0.4), rgba(0,229,160,0.05) 25%, rgba(0,229,160,0.05) 50%, rgba(0,229,160,0.4) 75%, rgba(0,229,160,0.05))`,
              }}
            />
            <div className="relative rounded-2xl border bg-card p-5">
              <p className="mb-4 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                evidentflow.ai Platform
              </p>
              <div className="space-y-2.5">
                {platformFeatures.map((feat, i) => (
                  <motion.div
                    key={feat.label}
                    className="flex items-center gap-3 rounded-xl bg-muted/50 px-4 py-3 text-[13px]"
                    variants={cardV}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={i + stackItems.length}
                  >
                    <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                      <feat.icon className="size-4 text-foreground" />
                    </div>
                    <span className="text-foreground">{feat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <MobileConnector visible={isInView} isDark={isDark} />

          <motion.div
            className="w-full max-w-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.45 }}
          >
            <div className="rounded-2xl border bg-card p-4">
              <p className="mb-3 text-center text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Outputs
              </p>
              <div className="space-y-2">
                {outputItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    className="flex items-center gap-3 rounded-xl bg-muted/30 px-4 py-2.5 text-[13px]"
                    variants={cardV}
                    initial="hidden"
                    animate={isInView ? "visible" : "hidden"}
                    custom={i + stackItems.length + platformFeatures.length}
                  >
                    <div className="flex size-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10">
                      <item.icon className="size-3.5 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-foreground">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function MobileConnector({ visible, isDark }: { visible: boolean; isDark: boolean }) {
  const h = 44;
  const lineStroke = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.12)";
  
  return (
    <svg width="20" height={h} viewBox={`-10 0 20 ${h}`} className="mx-auto my-1 overflow-visible">
      <defs>
        <filter id="mcg">
          <feGaussianBlur stdDeviation="2" />
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <line
        x1="0" y1="0" x2="0" y2={h}
        stroke={lineStroke}
        strokeWidth="1.5"
        strokeDasharray={h}
        strokeDashoffset={visible ? 0 : h}
        style={{ transition: "stroke-dashoffset 0.6s ease" }}
      />
      {visible &&
        Array.from({ length: 3 }).map((_, i) => (
          <circle key={i} r={1.5} fill="#00E5A0" filter="url(#mcg)">
            <animateMotion dur="1.3s" repeatCount="indefinite" begin={`${i * 0.4}s`} path={`M 0 0 L 0 ${h}`} />
            <animate attributeName="opacity" values="0;0.7;0.7;0" keyTimes="0;0.1;0.8;1" dur="1.3s" repeatCount="indefinite" begin={`${i * 0.4}s`} />
          </circle>
        ))}
    </svg>
  );
}
