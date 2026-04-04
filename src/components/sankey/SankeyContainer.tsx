"use client";

import { useState, useMemo, useRef, useEffect, useCallback } from "react";
import {
  sankey as d3Sankey,
  sankeyCenter,
} from "d3-sankey";
import {
  complianceMapData,
  buildSankeyData,
  type SankeyFilters,
  type ComplianceNode,
} from "@/lib/compliance-map-data";
import { SankeyGraph, type SankeyNodeDatum, type SankeyLinkDatum } from "./SankeyGraph";
import { SankeyTooltip } from "./SankeyTooltip";
import { FilterPanel } from "./FilterPanel";

const AVAILABLE_FRAMEWORKS = [
  { id: "soc2", label: "SOC 2" },
  { id: "hipaa", label: "HIPAA" },
  { id: "iso27001", label: "ISO 27001" },
  { id: "gdpr", label: "GDPR" },
  { id: "fedramp", label: "FedRAMP" },
  { id: "cmmc", label: "CMMC 2.0" },
];

const NODE_WIDTH = 18;
const NODE_PADDING = 24;
const MARGIN = { top: 40, right: 180, bottom: 40, left: 100 };

export function SankeyContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  const [filters, setFilters] = useState<SankeyFilters>({
    activeFrameworks: [],
    showEvidence: true,
    detailLevel: "overview",
    expandedGroups: [],
    searchQuery: "",
  });

  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [tooltipNode, setTooltipNode] = useState<ComplianceNode | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (entry) {
        setDimensions({
          width: entry.contentRect.width,
          height: Math.max(600, entry.contentRect.height),
        });
      }
    });

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const filteredData = useMemo(
    () => buildSankeyData(complianceMapData, filters),
    [filters],
  );

  const { layoutNodes, layoutLinks } = useMemo(() => {
    if (dimensions.width === 0 || filteredData.nodes.length === 0) {
      return { layoutNodes: [] as SankeyNodeDatum[], layoutLinks: [] as SankeyLinkDatum[] };
    }

    const innerWidth = dimensions.width - MARGIN.left - MARGIN.right;
    const nodeCount = filteredData.nodes.length;
    const computedHeight = Math.max(
      600,
      MARGIN.top + MARGIN.bottom + nodeCount * 18,
    );

    const sankeyLayout = d3Sankey<ComplianceNode, { source: string; target: string; value: number }>()
      .nodeId((d) => d.id)
      .nodeWidth(NODE_WIDTH)
      .nodePadding(NODE_PADDING)
      .nodeAlign(sankeyCenter)
      .extent([
        [MARGIN.left, MARGIN.top],
        [MARGIN.left + innerWidth, computedHeight - MARGIN.bottom],
      ]);

    const graph = sankeyLayout({
      nodes: filteredData.nodes.map((n) => ({ ...n })),
      links: filteredData.links.map((l) => ({ ...l })),
    });

    return {
      layoutNodes: (graph.nodes ?? []) as SankeyNodeDatum[],
      layoutLinks: (graph.links ?? []) as SankeyLinkDatum[],
    };
  }, [filteredData, dimensions.width]);

  const svgHeight = useMemo(() => {
    if (layoutNodes.length === 0) return 600;
    const maxY = Math.max(...layoutNodes.map((n) => n.y1 ?? 0));
    return Math.max(600, maxY + MARGIN.bottom + 20);
  }, [layoutNodes]);

  const handleNodeHover = useCallback(
    (nodeId: string | null, e?: React.MouseEvent) => {
      setHoveredNode(nodeId);
      if (nodeId && e) {
        setTooltipPos({ x: e.clientX, y: e.clientY });
        const node = layoutNodes.find((n) => n.id === nodeId) ?? null;
        setTooltipNode(node);
      } else if (!nodeId) {
        setTooltipNode(null);
      }
    },
    [layoutNodes],
  );

  const handleNodeClick = useCallback((nodeId: string) => {
    setSelectedNode((prev) => (prev === nodeId ? null : nodeId));
  }, []);

  const handleExpandGroup = useCallback((groupKey: string) => {
    setFilters((prev) => ({
      ...prev,
      expandedGroups: prev.expandedGroups.includes(groupKey)
        ? prev.expandedGroups.filter((g) => g !== groupKey)
        : [...prev.expandedGroups, groupKey],
    }));
  }, []);

  // Clear selected node when clicking empty space in the container
  const handleContainerClick = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).tagName === "DIV" || (e.target as SVGElement).tagName === "svg") {
      setSelectedNode(null);
    }
  }, []);

  return (
    <div className="w-full">
      <FilterPanel
        filters={filters}
        onFiltersChange={setFilters}
        availableFrameworks={AVAILABLE_FRAMEWORKS}
      />

      <div
        ref={containerRef}
        className="relative w-full overflow-x-auto overflow-y-auto rounded-xl border border-white/[0.07]"
        style={{
          minHeight: 600,
          maxHeight: "80vh",
          background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(0,0,0,0.1) 100%)",
        }}
        onClick={handleContainerClick}
      >
        {dimensions.width > 0 && (
          <div
            className="pointer-events-none absolute top-3 flex justify-between px-4 text-[11px] font-semibold uppercase tracking-widest text-white/60"
            style={{
              left: MARGIN.left - 20,
              right: MARGIN.right - 20,
            }}
          >
            <span>Frameworks</span>
            <span>Criteria</span>
            <span>Controls</span>
            {filters.showEvidence && <span>Evidence</span>}
          </div>
        )}

        <SankeyGraph
          nodes={layoutNodes}
          links={layoutLinks}
          width={dimensions.width}
          height={svgHeight}
          hoveredNode={hoveredNode}
          selectedNode={selectedNode}
          searchQuery={filters.searchQuery}
          onNodeHover={handleNodeHover}
          onNodeClick={handleNodeClick}
          onExpandGroup={handleExpandGroup}
        />

        {filteredData.nodes.length === 0 && dimensions.width > 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-sm text-white/30">
            No data matches the current filters. Try resetting.
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-[11px] text-white/40">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#00E5A0]" />
          Framework
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#00E5A0]/55" />
          Criteria
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#64748b]" />
          Control
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm border border-[#f59e0b] bg-[#64748b]" />
          Shared Control
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2.5 w-2.5 rounded-sm bg-[#334155]" />
          Evidence
        </span>
        <span className="ml-4 flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-[#00E5A0]" /> Met
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-amber-400" /> Partial
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-2 w-2 rounded-full bg-red-400" /> Gap
        </span>
      </div>

      <SankeyTooltip node={tooltipNode} x={tooltipPos.x} y={tooltipPos.y} />
    </div>
  );
}
