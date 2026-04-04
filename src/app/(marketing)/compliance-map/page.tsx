import { Metadata } from "next";
import { BeamsHero } from "@/components/marketing/beams-hero";
import { SankeyContainer } from "@/components/sankey/SankeyContainer";

export const metadata: Metadata = {
  title: "Compliance Intelligence Map — evidentflow.ai",
  description:
    "Interactive Sankey visualization of compliance framework mappings — see how SOC 2, HIPAA, and ISO 27001 criteria map to shared controls and evidence artifacts.",
};

export default function ComplianceMapPage() {
  return (
    <>
      <BeamsHero size="small">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Compliance Intelligence Map
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Visualize how frameworks, criteria, controls, and evidence connect
            across your compliance program — including cross-framework shared
            controls.
          </p>
        </div>
      </BeamsHero>

      <section className="mx-auto max-w-[1400px] px-6 py-12 md:py-16">
        <SankeyContainer />
      </section>
    </>
  );
}
