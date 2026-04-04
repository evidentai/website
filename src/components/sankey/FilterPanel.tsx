"use client";

import { Search, RotateCcw, Eye, EyeOff, Layers, Maximize2 } from "lucide-react";
import type { SankeyFilters } from "@/lib/compliance-map-data";

interface FilterPanelProps {
  filters: SankeyFilters;
  onFiltersChange: (filters: SankeyFilters) => void;
  availableFrameworks: { id: string; label: string }[];
}

export function FilterPanel({
  filters,
  onFiltersChange,
  availableFrameworks,
}: FilterPanelProps) {
  const toggleFramework = (id: string) => {
    const active = filters.activeFrameworks.includes(id)
      ? filters.activeFrameworks.filter((f) => f !== id)
      : [...filters.activeFrameworks, id];
    onFiltersChange({ ...filters, activeFrameworks: active });
  };

  const reset = () =>
    onFiltersChange({
      activeFrameworks: [],
      showEvidence: true,
      detailLevel: "overview",
      expandedGroups: [],
      searchQuery: "",
    });

  return (
    <div
      className="mb-6 flex flex-wrap items-center gap-3 rounded-xl border border-white/[0.07] px-4 py-3"
      style={{
        background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
      }}
    >
      {/* Framework toggles */}
      <span className="mr-1 text-[11px] font-medium uppercase tracking-wider text-white/40">
        Frameworks
      </span>
      {availableFrameworks.map((fw) => {
        const active = filters.activeFrameworks.length === 0 || filters.activeFrameworks.includes(fw.id);
        return (
          <button
            key={fw.id}
            onClick={() => toggleFramework(fw.id)}
            className={`rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
              active
                ? "bg-[#00E5A0]/20 text-[#00E5A0] ring-1 ring-[#00E5A0]/30"
                : "bg-white/[0.04] text-white/30 hover:bg-white/[0.08] hover:text-white/50"
            }`}
          >
            {fw.label}
          </button>
        );
      })}

      <div className="mx-2 h-5 w-px bg-white/[0.08]" />

      {/* Evidence toggle */}
      <button
        onClick={() => onFiltersChange({ ...filters, showEvidence: !filters.showEvidence })}
        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
          filters.showEvidence
            ? "bg-white/[0.08] text-white/70"
            : "bg-white/[0.03] text-white/30 hover:text-white/50"
        }`}
      >
        {filters.showEvidence ? <Eye className="h-3 w-3" /> : <EyeOff className="h-3 w-3" />}
        Evidence
      </button>

      {/* Detail level */}
      <button
        onClick={() =>
          onFiltersChange({
            ...filters,
            detailLevel: filters.detailLevel === "overview" ? "expanded" : "overview",
            expandedGroups: [],
          })
        }
        className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
          filters.detailLevel === "expanded"
            ? "bg-white/[0.08] text-white/70"
            : "bg-white/[0.03] text-white/30 hover:text-white/50"
        }`}
      >
        {filters.detailLevel === "expanded" ? <Maximize2 className="h-3 w-3" /> : <Layers className="h-3 w-3" />}
        {filters.detailLevel === "expanded" ? "Expanded" : "Overview"}
      </button>

      <div className="mx-2 h-5 w-px bg-white/[0.08]" />

      {/* Search */}
      <div className="relative flex items-center">
        <Search className="absolute left-2 h-3 w-3 text-white/30" />
        <input
          type="text"
          value={filters.searchQuery}
          onChange={(e) => onFiltersChange({ ...filters, searchQuery: e.target.value })}
          placeholder="Search controls..."
          className="h-7 w-40 rounded-full border border-white/[0.07] bg-white/[0.03] pl-7 pr-3 text-xs text-white/80 placeholder:text-white/25 outline-none transition-colors focus:border-[#00E5A0]/30 focus:bg-white/[0.05]"
        />
      </div>

      {/* Reset */}
      <button
        onClick={reset}
        className="ml-auto flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-white/30 transition-colors hover:bg-white/[0.05] hover:text-white/60"
      >
        <RotateCcw className="h-3 w-3" />
        Reset
      </button>
    </div>
  );
}
