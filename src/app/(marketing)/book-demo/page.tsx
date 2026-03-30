import type { Metadata } from "next";
import { BeamsHero } from "@/components/marketing/beams-hero";
import { BookDemoContent } from "@/components/marketing/book-demo-content";

export const metadata: Metadata = {
  title: "Book a Demo",
  description:
    "Schedule a personalized demo with evidentflow.ai. See how we help teams achieve SOC 2, ISO 27001, and other compliance certifications in weeks.",
};

export default function BookDemoPage() {
  return (
    <BeamsHero>
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-20 lg:px-8">
        <BookDemoContent />
      </div>
    </BeamsHero>
  );
}
