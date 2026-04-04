"use client";

import { type ComplianceNode } from "@/lib/compliance-map-data";

interface SankeyTooltipProps {
  node: ComplianceNode | null;
  x: number;
  y: number;
}

const typeLabels: Record<ComplianceNode["type"], string> = {
  framework: "Framework",
  criteria: "Criteria",
  control: "Control",
  evidence: "Evidence",
};

const typeBadgeColors: Record<ComplianceNode["type"], string> = {
  framework: "bg-[#00E5A0]/20 text-[#00E5A0]",
  criteria: "bg-[#00E5A0]/10 text-[#00E5A0]/80",
  control: "bg-slate-500/20 text-slate-300",
  evidence: "bg-slate-600/20 text-slate-400",
};

const statusDot: Record<string, string> = {
  met: "bg-[#00E5A0]",
  partial: "bg-amber-400",
  gap: "bg-red-400",
};

export function SankeyTooltip({ node, x, y }: SankeyTooltipProps) {
  if (!node) return null;

  const clampedX = Math.min(x + 16, typeof window !== "undefined" ? window.innerWidth - 280 : x + 16);
  const clampedY = Math.max(y - 10, 8);

  return (
    <div
      className="pointer-events-none fixed z-[100] w-64 rounded-xl border border-white/[0.07] p-4 text-sm shadow-2xl"
      style={{
        left: clampedX,
        top: clampedY,
        background: "linear-gradient(180deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)",
        backdropFilter: "blur(24px) saturate(1.4)",
        WebkitBackdropFilter: "blur(24px) saturate(1.4)",
        boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.06), 0 8px 32px rgba(0,0,0,0.5)",
      }}
    >
      <div className="mb-2 flex items-center justify-between gap-2">
        <span className="font-semibold text-white truncate">{node.label}</span>
        <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider ${typeBadgeColors[node.type]}`}>
          {typeLabels[node.type]}
        </span>
      </div>

      {node.metadata?.description && (
        <p className="mb-2 text-xs leading-relaxed text-white/50">
          {node.metadata.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 text-xs">
        {node.metadata?.status && (
          <span className="flex items-center gap-1.5 text-white/60">
            <span className={`inline-block h-2 w-2 rounded-full ${statusDot[node.metadata.status] ?? "bg-slate-500"}`} />
            {node.metadata.status === "met" ? "Met" : node.metadata.status === "partial" ? "Partial" : "Gap"}
          </span>
        )}
        {node.metadata?.coverage !== undefined && (
          <span className="text-white/60">
            {node.metadata.coverage}% coverage
          </span>
        )}
      </div>

      {node.metadata?.sharedFrameworks && node.metadata.sharedFrameworks.length > 1 && (
        <div className="mt-2 border-t border-white/[0.06] pt-2">
          <span className="text-[10px] font-medium uppercase tracking-wider text-amber-400/80">
            Shared across:
          </span>
          <span className="ml-1 text-xs text-white/50">
            {node.metadata.sharedFrameworks
              .map((f) => f === "soc2" ? "SOC 2" : f === "hipaa" ? "HIPAA" : f === "iso27001" ? "ISO 27001" : f)
              .join(", ")}
          </span>
        </div>
      )}

      {node.children && node.children.length > 0 && (
        <div className="mt-2 border-t border-white/[0.06] pt-2 text-[10px] text-white/40">
          Click to expand {node.children.length} controls
        </div>
      )}
    </div>
  );
}
