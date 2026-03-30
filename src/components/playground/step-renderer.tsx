"use client";

import { AnimatePresence, motion } from "framer-motion";
import { usePlaygroundStore } from "@/lib/playground-store";
import { integrationCategories } from "@/lib/playground-data";
import { ChooseCompliance } from "./choose-compliance";
import { ConnectCloud } from "./connect-cloud";
import { IntegrationStep } from "./integration-step";
import { ConnectingAnimation } from "./connecting-animation";
import { ScanProgress } from "./scan-progress";
import { EvidenceCapture } from "./evidence-capture";
import { GraphView } from "./graph-view";
import { InsightsView } from "./insights-view";
import { DashboardView } from "./dashboard-view";
import { CtaStep } from "./cta-step";
import type { Step } from "@/lib/playground-store";

function SCMStep() {
  return (
    <IntegrationStep
      category={integrationCategories[0]}
      nextStep="integrationCICD"
      stepLabel="Integrations 1/5"
    />
  );
}

function CICDStep() {
  return (
    <IntegrationStep
      category={integrationCategories[1]}
      nextStep="integrationIDP"
      stepLabel="Integrations 2/5"
    />
  );
}

function IDPStep() {
  return (
    <IntegrationStep
      category={integrationCategories[2]}
      nextStep="integrationEndpoint"
      stepLabel="Integrations 3/5"
    />
  );
}

function EndpointStep() {
  return (
    <IntegrationStep
      category={integrationCategories[3]}
      nextStep="integrationLogs"
      stepLabel="Integrations 4/5"
    />
  );
}

function LogsStep() {
  return (
    <IntegrationStep
      category={integrationCategories[4]}
      nextStep="connecting"
      stepLabel="Integrations 5/5"
    />
  );
}

const stepComponents: Record<Step, React.ComponentType> = {
  chooseCompliance: ChooseCompliance,
  connectCloud: ConnectCloud,
  integrationSCM: SCMStep,
  integrationCICD: CICDStep,
  integrationIDP: IDPStep,
  integrationEndpoint: EndpointStep,
  integrationLogs: LogsStep,
  connecting: ConnectingAnimation,
  scanning: ScanProgress,
  evidenceCapture: EvidenceCapture,
  graphBuild: GraphView,
  insights: InsightsView,
  dashboard: DashboardView,
  cta: CtaStep,
};

export function StepRenderer() {
  const step = usePlaygroundStore((s) => s.step);
  const Component = stepComponents[step];

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={step}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.35 }}
      >
        <Component />
      </motion.div>
    </AnimatePresence>
  );
}
