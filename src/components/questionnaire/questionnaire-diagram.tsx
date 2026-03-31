"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Cloud,
  KeyRound,
  GitBranch,
  Workflow,
  Monitor,
  Activity,
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

const stackItems: NodeItem[] = [
  { label: "Cloud", icon: Cloud },
  { label: "Identity", icon: KeyRound },
  { label: "Repos", icon: GitBranch },
  { label: "CI/CD", icon: Workflow },
  { label: "Endpoints", icon: Monitor },
  { label: "Logs", icon: Activity },
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

const stepToStackHighlight: Record<number, number[]> = {
  2: [0],
  5: [1],
  3: [2],
  4: [3],
  6: [4],
  7: [5],
};

interface Point { x: number; y: number }
interface BeamPath { id: string; d: string; length: number }

function getBottomCenter(el: HTMLElement, container: HTMLElement): Point {
  const r = el.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  return { x: r.left + r.width / 2 - c.left, y: r.bottom - c.top };
}

function getTopCenter(el: HTMLElement, container: HTMLElement): Point {
  const r = el.getBoundingClientRect();
  const c = container.getBoundingClientRect();
  return { x: r.left + r.width / 2 - c.left, y: r.top - c.top };
}

function makeVerticalCurve(from: Point, to: Point): string {
  const dy = to.y - from.y;
  return `M ${from.x} ${from.y} C ${from.x} ${from.y + dy * 0.4}, ${to.x} ${from.y + dy * 0.6}, ${to.x} ${to.y}`;
}

function pathLen(from: Point, to: Point): number {
  return Math.sqrt((to.x - from.x) ** 2 + (to.y - from.y) ** 2) * 1.15;
}

function Beam({
  beam,
  visible,
  highlighted,
  delay,
}: {
  beam: BeamPath;
  visible: boolean;
  highlighted: boolean;
  delay: number;
}) {
  const count = 3;
  const dur = highlighted ? 1.8 : 2.6;
  const baseStroke = "rgba(255,255,255,0.05)";
  const highlightStroke = highlighted ? "rgba(255,255,255,0.18)" : "rgba(255,255,255,0.05)";

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
        strokeWidth={highlighted ? 2.5 : 1}
        filter="url(#q-glow)"
        strokeDasharray={beam.length}
        strokeDashoffset={visible ? 0 : beam.length}
        style={{
          transition: `stroke-dashoffset 0.9s cubic-bezier(0.4,0,0.2,1) ${delay}s, stroke 0.3s, stroke-width 0.3s`,
        }}
      />
      {visible &&
        Array.from({ length: count }).map((_, i) => (
          <circle key={i} r={highlighted ? 2.2 : 1.3} fill="#00E5A0" filter="url(#q-pglow)">
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
  hidden: { opacity: 0, y: 12, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 0.08 + i * 0.04,
      duration: 0.35,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

const glassCard = "rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-md shadow-[0_0_30px_rgba(0,0,0,0.15)]";
const glassChip = "rounded-lg border border-white/[0.05] bg-white/[0.03] backdrop-blur-sm";

interface QuestionnaireDiagramProps {
  currentStep: number;
}

export function QuestionnaireDiagram({ currentStep }: QuestionnaireDiagramProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stackEls = useRef<(HTMLDivElement | null)[]>(new Array(stackItems.length).fill(null));
  const platEls = useRef<(HTMLDivElement | null)[]>(new Array(platformFeatures.length).fill(null));
  const outEls = useRef<(HTMLDivElement | null)[]>(new Array(outputItems.length).fill(null));

  const [beams, setBeams] = useState<BeamPath[]>([]);
  const [beamsReady, setBeamsReady] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  const highlightedRows = stepToStackHighlight[currentStep] ?? [];

  const calcBeams = useCallback(() => {
    const c = containerRef.current;
    if (!c) return;
    const sEls = stackEls.current.filter(Boolean) as HTMLDivElement[];
    const pEls = platEls.current.filter(Boolean) as HTMLDivElement[];
    const oEls = outEls.current.filter(Boolean) as HTMLDivElement[];
    if (!sEls.length || !pEls.length || !oEls.length) return;

    const b: BeamPath[] = [];

    // Spread stack -> platform connections so pipes fan out evenly
    // 6 stack items -> 3 platform items, 2 each for balanced distribution
    const stackToPlatform: [number, number][] = [
      [0, 0], // Cloud -> Evidence Engine
      [1, 1], // Identity -> Policy Engine
      [2, 0], // Repos -> Evidence Engine
      [3, 2], // CI/CD -> Screenshot Agent
      [4, 1], // Endpoints -> Policy Engine
      [5, 2], // Logs -> Screenshot Agent
    ];

    stackToPlatform.forEach(([si, pi]) => {
      if (!sEls[si] || !pEls[pi]) return;
      const from = getBottomCenter(sEls[si], c);
      const to = getTopCenter(pEls[pi], c);
      b.push({ id: `s${si}-p${pi}`, d: makeVerticalCurve(from, to), length: pathLen(from, to) });
    });

    // Spread platform -> output: one primary connection each for a clean fan
    const platformToOutput: [number, number][] = [
      [0, 0], // Evidence Engine -> Dashboard
      [0, 1], // Evidence Engine -> Auditor Portal
      [1, 1], // Policy Engine -> Auditor Portal
      [1, 2], // Policy Engine -> Trust Report
      [2, 0], // Screenshot Agent -> Dashboard
      [2, 2], // Screenshot Agent -> Trust Report
    ];

    platformToOutput.forEach(([pi, oi]) => {
      if (!pEls[pi] || !oEls[oi]) return;
      const from = getBottomCenter(pEls[pi], c);
      const to = getTopCenter(oEls[oi], c);
      b.push({ id: `p${pi}-o${oi}`, d: makeVerticalCurve(from, to), length: pathLen(from, to) });
    });

    setBeams(b);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => {
      calcBeams();
      setBeamsReady(true);
    }, 600);
    return () => clearTimeout(t);
  }, [calcBeams]);

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
    if (hovered) return id.includes(hovered);
    for (const row of highlightedRows) {
      if (id.includes(`s${row}`)) return true;
    }
    return false;
  };

  return (
    <div className="sticky top-24">
      <div ref={containerRef} className="relative">
        {/* SVG beams layer */}
        <svg
          className="pointer-events-none absolute inset-0 size-full overflow-visible"
          style={{ zIndex: 1 }}
        >
          <defs>
            <filter id="q-glow">
              <feGaussianBlur stdDeviation="3" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="q-pglow">
              <feGaussianBlur stdDeviation="2" />
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
            />
          ))}
        </svg>

        {/* Vertical 3-layer layout with generous spacing */}
        <div className="relative z-10 flex flex-col gap-16">

          {/* Layer 1: Your Stack */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div className={`${glassCard} px-4 py-3`}>
              <p className="mb-2.5 text-center text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Your Stack
              </p>
              <div className="flex flex-wrap justify-between gap-y-1.5 gap-x-1">
                {stackItems.map((item, i) => {
                  const isActive = highlightedRows.includes(i);
                  return (
                    <motion.div
                      key={item.label}
                      ref={(el) => { stackEls.current[i] = el; }}
                      className={`flex w-[6.5rem] items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-[11px] transition-all duration-300 ${
                        isActive
                          ? "bg-[#00E5A0]/10 ring-1 ring-[#00E5A0]/30"
                          : `${glassChip} hover:bg-white/[0.06]`
                      }`}
                      variants={cardV}
                      initial="hidden"
                      animate="visible"
                      custom={i}
                      onMouseEnter={() => setHovered(`s${i}`)}
                      onMouseLeave={() => setHovered(null)}
                    >
                      <div className={`flex size-5 shrink-0 items-center justify-center rounded ${
                        isActive ? "bg-[#00E5A0]/20" : "bg-white/[0.05]"
                      }`}>
                        <item.icon className={`size-2.5 ${
                          isActive ? "text-[#00E5A0]" : "text-muted-foreground"
                        }`} />
                      </div>
                      <span className={`leading-none ${isActive ? "text-[#00E5A0]" : "text-foreground/80"}`}>
                        {item.label}
                      </span>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Layer 2: Platform */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div
              className="absolute -inset-[1px] rounded-xl transition-opacity duration-500"
              style={{
                opacity: hovered?.startsWith("p") ? 0.8 : 0.25,
                background: `conic-gradient(from ${angle}deg at 50% 50%, rgba(0,229,160,0.3), rgba(0,229,160,0.02) 25%, rgba(0,229,160,0.02) 50%, rgba(0,229,160,0.3) 75%, rgba(0,229,160,0.02))`,
              }}
            />
            <div className={`relative ${glassCard} px-4 py-3`}>
              <p className="mb-2.5 text-center text-[9px] uppercase tracking-[0.2em] text-[#00E5A0]/70">
                evidentflow.ai Platform
              </p>
              <div className="flex justify-between gap-1.5">
                {platformFeatures.map((feat, i) => (
                  <motion.div
                    key={feat.label}
                    ref={(el) => { platEls.current[i] = el; }}
                    className={`flex items-center gap-1.5 ${glassChip} px-2.5 py-2 text-[11px] transition-all duration-300 hover:bg-white/[0.06]`}
                    variants={cardV}
                    initial="hidden"
                    animate="visible"
                    custom={i + stackItems.length}
                    onMouseEnter={() => setHovered(`p${i}`)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="flex size-5 shrink-0 items-center justify-center rounded bg-white/[0.06]">
                      <feat.icon className="size-2.5 text-foreground/80" />
                    </div>
                    <span className="leading-none text-foreground/80">{feat.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Layer 3: Outputs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <div className={`${glassCard} px-4 py-3`}>
              <p className="mb-2.5 text-center text-[9px] uppercase tracking-[0.2em] text-muted-foreground">
                Outputs
              </p>
              <div className="flex justify-between gap-1.5">
                {outputItems.map((item, i) => (
                  <motion.div
                    key={item.label}
                    ref={(el) => { outEls.current[i] = el; }}
                    className={`flex items-center gap-1.5 ${glassChip} px-2.5 py-2 text-[11px] transition-all duration-300 hover:bg-white/[0.05]`}
                    variants={cardV}
                    initial="hidden"
                    animate="visible"
                    custom={i + stackItems.length + platformFeatures.length}
                    onMouseEnter={() => setHovered(`o${i}`)}
                    onMouseLeave={() => setHovered(null)}
                  >
                    <div className="flex size-5 shrink-0 items-center justify-center rounded bg-emerald-500/10">
                      <item.icon className="size-2.5 text-emerald-400" />
                    </div>
                    <span className="leading-none text-foreground/80">{item.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
