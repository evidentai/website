import type { Metadata } from "next";
import { BeamsHero } from "@/components/marketing/beams-hero";
import { PlaygroundContainer } from "@/components/playground/playground-container";

export const metadata: Metadata = {
  title: "Product Tour",
  description:
    "Experience evidentflow.ai in action. Walk through a simulated compliance scan, see risks surface in real-time, and explore the dashboard — all without signing up.",
};

export default function ProductTourPage() {
  return (
    <BeamsHero>
      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <PlaygroundContainer />
      </div>
    </BeamsHero>
  );
}
