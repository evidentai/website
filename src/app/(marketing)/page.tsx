import { HeroSection } from "@/components/marketing/hero-section";
import { LogoBar } from "@/components/marketing/logo-bar";
import { ProblemSection } from "@/components/marketing/problem-section";
import { SolutionDiagram } from "@/components/marketing/solution-diagram";
import { HowItWorks } from "@/components/marketing/how-it-works";
import { PlatformHighlights } from "@/components/marketing/platform-highlights";
import { TestimonialsSection } from "@/components/marketing/testimonials-section";
import { CtaBand } from "@/components/marketing/cta-band";
import { siteConfig } from "@/lib/constants";
import { JsonLd } from "@/components/shared/json-ld";
import { generateOrganizationSchema, generateWebSiteSchema } from "@/lib/seo";

export const metadata = {
  title: `${siteConfig.name} — Continuous Compliance Automation`,
  description:
    "Cut audit prep from months to weeks. Automated evidence collection, AI-powered screenshots, and policy-as-code for SOC 2, ISO 27001, HIPAA, and more.",
  openGraph: {
    title: `${siteConfig.name} — Continuous Compliance Automation`,
    description:
      "Cut audit prep from months to weeks. Automated evidence collection, AI-powered screenshots, and policy-as-code for SOC 2, ISO 27001, HIPAA, and more.",
  },
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={generateOrganizationSchema()} />
      <JsonLd data={generateWebSiteSchema()} />
      <HeroSection />
      <LogoBar />
      <ProblemSection />
      <SolutionDiagram />
      <HowItWorks />
      <PlatformHighlights />
      <TestimonialsSection />
      <CtaBand />
    </>
  );
}
