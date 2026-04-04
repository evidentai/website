"use client";

import { useMemo } from "react";
import { sankeyLinkHorizontal } from "d3-sankey";
import {
  type ComplianceNode,
  NODE_COLORS,
  SHARED_CONTROL_BORDER,
  isSharedControl,
  getConnectedIds,
  getConnectedLinkKeys,
} from "@/lib/compliance-map-data";

export interface SankeyNodeDatum extends ComplianceNode {
  x0?: number;
  x1?: number;
  y0?: number;
  y1?: number;
  index?: number;
}

export interface SankeyLinkDatum {
  source: SankeyNodeDatum;
  target: SankeyNodeDatum;
  value: number;
  width?: number;
  y0?: number;
  y1?: number;
  index?: number;
}

interface SankeyGraphProps {
  nodes: SankeyNodeDatum[];
  links: SankeyLinkDatum[];
  width: number;
  height: number;
  hoveredNode: string | null;
  selectedNode: string | null;
  searchQuery: string;
  onNodeHover: (nodeId: string | null, e?: React.MouseEvent) => void;
  onNodeClick: (nodeId: string) => void;
  onExpandGroup: (groupKey: string) => void;
}

const linkPathGen = sankeyLinkHorizontal();
const NODE_RX = 6;
const LABEL_PADDING = 8;

export function SankeyGraph({
  nodes,
  links,
  width,
  height,
  hoveredNode,
  selectedNode,
  searchQuery,
  onNodeHover,
  onNodeClick,
  onExpandGroup,
}: SankeyGraphProps) {
  // Build a flat link list with string IDs for highlight computation
  const flatLinks = useMemo(
    () =>
      links.map((l) => ({
        source: typeof l.source === "object" ? l.source.id : String(l.source),
        target: typeof l.target === "object" ? l.target.id : String(l.target),
      })),
    [links],
  );

  const activeId = selectedNode ?? hoveredNode;

  const highlightedNodes = useMemo(() => {
    if (!activeId) return null;
    return getConnectedIds(activeId, flatLinks);
  }, [activeId, flatLinks]);

  const highlightedLinkKeys = useMemo(() => {
    if (!activeId) return null;
    return getConnectedLinkKeys(activeId, flatLinks);
  }, [activeId, flatLinks]);

  const searchMatchIds = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return new Set(
      nodes
        .filter(
          (n) =>
            n.label.toLowerCase().includes(q) ||
            n.metadata?.description?.toLowerCase().includes(q),
        )
        .map((n) => n.id),
    );
  }, [nodes, searchQuery]);

  // Determine if we are in a "dimming" state (hover, click, or search active)
  const isDimming = highlightedNodes !== null || searchMatchIds !== null;

  if (width === 0 || height === 0) return null;

  return (
    <svg width={width} height={height} className="overflow-visible">
      <defs>
        <filter id="sankey-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="sankey-glow-strong" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="10" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Links */}
      <g>
        {links.map((link) => {
          const d = linkPathGen(link as never);
          if (!d) return null;

          const srcId = typeof link.source === "object" ? link.source.id : String(link.source);
          const tgtId = typeof link.target === "object" ? link.target.id : String(link.target);
          const linkKey = `${srcId}->${tgtId}`;
          const sourceNode = typeof link.source === "object" ? link.source : null;
          const color = sourceNode ? (NODE_COLORS[sourceNode.type] ?? "rgba(255,255,255,0.1)") : "rgba(255,255,255,0.1)";

          let opacity: number;
          let isHighlighted = false;

          if (searchMatchIds) {
            isHighlighted = searchMatchIds.has(srcId) || searchMatchIds.has(tgtId);
            opacity = isHighlighted ? 0.5 : 0.04;
          } else if (highlightedLinkKeys) {
            isHighlighted = highlightedLinkKeys.has(linkKey);
            opacity = isHighlighted ? 0.55 : 0.04;
          } else {
            opacity = Math.min(0.25, 0.08 + link.value * 0.03);
          }

          return (
            <g key={linkKey}>
              {/* Glow layer — always present, opacity-controlled */}
              <path
                d={d}
                fill="none"
                stroke="#00E5A0"
                strokeWidth={Math.max(2, (link.width ?? 1) + 4)}
                filter="url(#sankey-glow)"
                className="pointer-events-none"
                style={{
                  strokeOpacity: isHighlighted ? 0.15 : 0,
                  transition: "stroke-opacity 250ms ease",
                }}
              />
              {/* Main link */}
              <path
                d={d}
                fill="none"
                stroke={isHighlighted ? "#00E5A0" : color}
                strokeWidth={Math.max(1, link.width ?? 1)}
                style={{
                  strokeOpacity: opacity,
                  transition: "stroke-opacity 250ms ease, stroke 250ms ease",
                }}
              />
            </g>
          );
        })}
      </g>

      {/* Nodes */}
      <g>
        {nodes.map((node) => {
          const x = node.x0 ?? 0;
          const y = node.y0 ?? 0;
          const w = (node.x1 ?? 0) - x;
          const h = (node.y1 ?? 0) - y;
          const fill = NODE_COLORS[node.type] ?? NODE_COLORS.control;
          const stroke = isSharedControl(node)
            ? SHARED_CONTROL_BORDER
            : node.children && node.children.length > 0
              ? "rgba(255,255,255,0.15)"
              : "transparent";
          const hasChildren = node.children && node.children.length > 0;

          let nodeIsHighlighted: boolean;
          let nodeOpacity: number;

          if (searchMatchIds) {
            nodeIsHighlighted = searchMatchIds.has(node.id);
            nodeOpacity = nodeIsHighlighted ? 1 : 0.08;
          } else if (highlightedNodes) {
            nodeIsHighlighted = highlightedNodes.has(node.id);
            nodeOpacity = nodeIsHighlighted ? 1 : 0.08;
          } else {
            nodeIsHighlighted = false;
            nodeOpacity = 1;
          }

          return (
            <g
              key={node.id}
              className="cursor-pointer"
              style={{
                opacity: nodeOpacity,
                transition: "opacity 250ms ease",
              }}
              onMouseEnter={(e) => onNodeHover(node.id, e)}
              onMouseLeave={() => onNodeHover(null)}
              onClick={() => {
                if (hasChildren && node.group) {
                  onExpandGroup(node.group);
                } else {
                  onNodeClick(node.id);
                }
              }}
            >
              {/* Glow behind node — always present, opacity-controlled */}
              <rect
                x={x - 3}
                y={y - 3}
                width={w + 6}
                height={h + 6}
                rx={NODE_RX + 2}
                fill={fill}
                className="pointer-events-none"
                style={{
                  opacity: isDimming && nodeIsHighlighted ? 0.12 : 0,
                  transition: "opacity 250ms ease",
                }}
                filter="url(#sankey-glow-strong)"
              />

              <rect
                x={x}
                y={y}
                width={w}
                height={h}
                rx={NODE_RX}
                fill={fill}
                stroke={stroke}
                strokeWidth={stroke === "transparent" ? 0 : 1.5}
              />

              {isSharedControl(node) && (
                <circle
                  cx={x + w - 4}
                  cy={y + 4}
                  r={3}
                  fill={SHARED_CONTROL_BORDER}
                  className="pointer-events-none"
                />
              )}

              {hasChildren && (
                <text
                  x={x + w / 2}
                  y={y + h / 2}
                  textAnchor="middle"
                  dominantBaseline="central"
                  className="pointer-events-none fill-white/60 text-[9px]"
                >
                  ▸
                </text>
              )}

              <text
                x={node.type === "evidence" ? x - LABEL_PADDING : x + w + LABEL_PADDING}
                y={y + h / 2}
                textAnchor={node.type === "evidence" ? "end" : "start"}
                dominantBaseline="central"
                className="pointer-events-none fill-white/80 text-[11px] font-medium"
              >
                {node.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
}
