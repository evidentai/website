import { create } from "zustand";

export type Step =
  | "chooseCompliance"
  | "connectCloud"
  | "integrationSCM"
  | "integrationCICD"
  | "integrationIDP"
  | "integrationEndpoint"
  | "integrationLogs"
  | "connecting"
  | "scanning"
  | "evidenceCapture"
  | "graphBuild"
  | "insights"
  | "dashboard"
  | "cta";

export type Framework = "SOC 2" | "ISO 27001" | "HIPAA" | "GDPR" | "FedRAMP" | "CMMC";
export type CloudProvider = "AWS" | "Azure" | "GCP";

interface PlaygroundState {
  step: Step;
  framework: Framework | null;
  cloud: CloudProvider | null;
  integrations: Record<string, string[]>;
  scanProgress: number;
  scanLogs: string[];
  graphNodesRevealed: number;
  riskHighlighted: boolean;
  complianceScore: number;
  checkedItems: number;

  setStep: (step: Step) => void;
  selectFramework: (fw: Framework) => void;
  selectCloud: (cloud: CloudProvider) => void;
  setIntegrations: (category: string, tools: string[]) => void;
  setScanProgress: (p: number) => void;
  addScanLog: (log: string) => void;
  setGraphNodesRevealed: (n: number) => void;
  setRiskHighlighted: (v: boolean) => void;
  setComplianceScore: (s: number) => void;
  setCheckedItems: (n: number) => void;
  restart: () => void;
}

const initialState = {
  step: "chooseCompliance" as Step,
  framework: null as Framework | null,
  cloud: null as CloudProvider | null,
  integrations: {} as Record<string, string[]>,
  scanProgress: 0,
  scanLogs: [] as string[],
  graphNodesRevealed: 0,
  riskHighlighted: false,
  complianceScore: 0,
  checkedItems: 0,
};

export const usePlaygroundStore = create<PlaygroundState>((set) => ({
  ...initialState,
  setStep: (step) => set({ step }),
  selectFramework: (framework) => set({ framework }),
  selectCloud: (cloud) => set({ cloud }),
  setIntegrations: (category, tools) =>
    set((s) => ({ integrations: { ...s.integrations, [category]: tools } })),
  setScanProgress: (scanProgress) => set({ scanProgress }),
  addScanLog: (log) =>
    set((s) => ({ scanLogs: [...s.scanLogs.slice(-19), log] })),
  setGraphNodesRevealed: (graphNodesRevealed) => set({ graphNodesRevealed }),
  setRiskHighlighted: (riskHighlighted) => set({ riskHighlighted }),
  setComplianceScore: (complianceScore) => set({ complianceScore }),
  setCheckedItems: (checkedItems) => set({ checkedItems }),
  restart: () => set(initialState),
}));
