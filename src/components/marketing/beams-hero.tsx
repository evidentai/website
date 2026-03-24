"use client";

import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const Beams = dynamic(() => import("@/components/ui/beams"), { ssr: false });

interface BeamsHeroProps {
  children: ReactNode;
  size?: "full" | "medium" | "compact";
  className?: string;
}

function getSizeClasses(size: string): string {
  switch (size) {
    case "full":
      return "pt-20 pb-16 md:pt-32 md:pb-24 min-h-[600px]";
    case "medium":
      return "pt-20 pb-16 md:pt-32 md:pb-24";
    case "compact":
      return "pt-16 pb-12 md:pt-24 md:pb-16";
    default:
      return "pt-20 pb-16 md:pt-32 md:pb-24";
  }
}

export function BeamsHero({ children, size = "medium", className = "" }: BeamsHeroProps) {
  return (
    <section className={`relative overflow-hidden ${getSizeClasses(size)} ${className}`}>
      <div className="absolute inset-0 -z-10">
        <Beams
          beamWidth={3}
          beamHeight={30}
          beamNumber={20}
          lightColor="#00E5A0"
          speed={2}
          noiseIntensity={1.75}
          scale={0.2}
          rotation={30}
        />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  );
}
