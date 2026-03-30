"use client";

import { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { usePlaygroundStore } from "@/lib/playground-store";
import { getDemoData, type GraphNode, type GraphEdge } from "@/lib/playground-data";
import {
  Cloud,
  Database,
  User,
  HardDrive,
  Server,
  Network,
} from "lucide-react";

const iconMap: Record<GraphNode["type"], typeof Cloud> = {
  service: Cloud,
  database: Database,
  identity: User,
  storage: HardDrive,
  compute: Server,
  network: Network,
};

function EdgeLine({ edge, nodes, index }: { edge: GraphEdge; nodes: GraphNode[]; index: number }) {
  const from = nodes.find((n) => n.id === edge.from);
  const to = nodes.find((n) => n.id === edge.to);
  if (!from || !to) return null;

  return (
    <motion.line
      x1={`${from.x}%`}
      y1={`${from.y}%`}
      x2={`${to.x}%`}
      y2={`${to.y}%`}
      stroke="rgba(0,229,160,0.2)"
      strokeWidth="1.5"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ delay: 0.3 + index * 0.08, duration: 0.5 }}
    />
  );
}

function NodeCircle({ node, index, total }: { node: GraphNode; index: number; total: number }) {
  const Icon = iconMap[node.type];
  const isRisk = !!node.risk;

  return (
    <motion.div
      className="absolute flex flex-col items-center"
      style={{
        left: `${node.x}%`,
        top: `${node.y}%`,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.2 + (index / total) * 1.2,
        duration: 0.4,
        type: "spring",
        stiffness: 200,
      }}
    >
      <div className="relative">
        {isRisk && (
          <motion.div
            className="absolute -inset-2 rounded-full"
            style={{ backgroundColor: node.risk === "high" ? "rgba(239,68,68,0.15)" : "rgba(245,158,11,0.15)" }}
            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0.2, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <div
          className={`flex size-10 items-center justify-center rounded-full border-2 ${
            isRisk
              ? node.risk === "high"
                ? "border-red-500/60 bg-red-500/10 text-red-400"
                : "border-amber-500/60 bg-amber-500/10 text-amber-400"
              : "border-[#00E5A0]/30 bg-[#00E5A0]/5 text-[#00E5A0]"
          }`}
        >
          <Icon className="size-5" />
        </div>
      </div>
      <span className="mt-1.5 max-w-20 truncate text-center text-[10px] text-muted-foreground">
        {node.label}
      </span>
    </motion.div>
  );
}

export function GraphView() {
  const {
    framework,
    cloud,
    graphNodesRevealed,
    setGraphNodesRevealed,
    setStep,
  } = usePlaygroundStore();

  const data = framework && cloud ? getDemoData(framework, cloud) : null;

  const advanceToInsights = useCallback(() => {
    setStep("insights");
  }, [setStep]);

  useEffect(() => {
    if (!data) return;
    const total = data.nodes.length;
    if (graphNodesRevealed >= total) {
      const timeout = setTimeout(advanceToInsights, 2000);
      return () => clearTimeout(timeout);
    }

    const timeout = setTimeout(() => {
      setGraphNodesRevealed(graphNodesRevealed + 1);
    }, 200);
    return () => clearTimeout(timeout);
  }, [data, graphNodesRevealed, setGraphNodesRevealed, advanceToInsights]);

  if (!data) return null;

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Step 4 of 6
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Building infrastructure graph
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Mapping {data.nodes.length} resources and their relationships...
        </p>
      </motion.div>

      <div className="relative mx-auto h-[420px] w-full max-w-3xl overflow-hidden rounded-xl border border-border/50 bg-card/50">
        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,229,160,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,160,1) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* SVG edges */}
        <svg className="absolute inset-0 size-full">
          {data.edges.map((edge, i) => (
            <EdgeLine key={`${edge.from}-${edge.to}`} edge={edge} nodes={data.nodes} index={i} />
          ))}
        </svg>

        {/* Nodes */}
        {data.nodes.slice(0, graphNodesRevealed).map((node, i) => (
          <NodeCircle key={node.id} node={node} index={i} total={data.nodes.length} />
        ))}

        {/* Status overlay */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2 rounded-lg bg-background/80 px-3 py-1.5 backdrop-blur-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#00E5A0] opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-[#00E5A0]" />
          </span>
          <span className="text-xs text-muted-foreground">
            {graphNodesRevealed} / {data.nodes.length} resources mapped
          </span>
        </div>
      </div>
    </div>
  );
}
