import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BeamsHero } from "@/components/marketing/beams-hero";
import { SolutionDiagram } from "@/components/marketing/solution-diagram";
import Link from "next/link";
import {
  Shield,
  FileSearch,
  Camera,
  Code2,
  Users,
  Eye,
  Laptop,
  Server,
  Cloud,
  Lock,
  Cog,
  Bot,
  Globe,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  Monitor,
  Database,
} from "lucide-react";
import { integrations } from "@/lib/constants";

export const metadata = {
  title: "Platform — evident.ai",
  description:
    "Explore the evident.ai platform: automated evidence collection, AI-powered screenshot capture, policy-as-code, asset inventory, and a dedicated auditor portal for SOC 2, ISO 27001, HIPAA, and more.",
};

const evidenceItems = [
  {
    name: "AWS IAM password policy",
    source: "AWS",
    timestamp: "2 min ago",
    status: "collected",
  },
  {
    name: "GitHub branch protection rules",
    source: "GitHub",
    timestamp: "5 min ago",
    status: "collected",
  },
  {
    name: "Okta SSO configuration",
    source: "Okta",
    timestamp: "12 min ago",
    status: "collected",
  },
];

const inventoryCategories = [
  {
    icon: Laptop,
    title: "Developer Tools",
    description:
      "IDEs, package managers, and local dev environments across your team.",
  },
  {
    icon: Globe,
    title: "Browser Extensions",
    description:
      "Track every extension installed across managed browsers and profiles.",
  },
  {
    icon: Monitor,
    title: "Endpoint Software",
    description:
      "OS versions, agents, and installed applications on every device.",
  },
  {
    icon: Cloud,
    title: "Cloud Resources",
    description:
      "EC2 instances, S3 buckets, databases, and serverless functions.",
  },
  {
    icon: Server,
    title: "Infrastructure",
    description:
      "Kubernetes clusters, load balancers, VPCs, and network configs.",
  },
  {
    icon: Database,
    title: "Data Stores",
    description:
      "Databases, caches, message queues, and object storage inventory.",
  },
];

const auditorFeatures = [
  {
    icon: Eye,
    title: "Read-only access",
    description:
      "Auditors get a scoped portal — full visibility, zero write permissions.",
  },
  {
    icon: BarChart3,
    title: "Evidence timelines",
    description:
      "Every control shows a chronological history of collected evidence.",
  },
  {
    icon: Lock,
    title: "Hash-verified integrity",
    description:
      "SHA-256 hashes and timestamps let auditors verify evidence authenticity.",
  },
  {
    icon: FileSearch,
    title: "One-click export",
    description:
      "Export evidence packs, readiness reports, and sampling plans instantly.",
  },
];

export default function PlatformPage() {
  return (
    <>
      {/* ─── Hero ─── */}
      <BeamsHero size="medium">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6">
            Platform Overview
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mx-auto max-w-3xl">
            The compliance automation platform
          </h1>
          <p className="mt-6 text-lg text-muted-foreground mx-auto max-w-2xl">
            Automate evidence collection across every framework — SOC 2, ISO
            27001, HIPAA, GDPR, and FedRAMP — with API connectors, AI-powered
            screenshot capture, and policy-as-code enforcement.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/book-demo">
                Book a Demo
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              asChild
              className="group/tour relative overflow-hidden border-[#00E5A0]/30 hover:border-[#00E5A0]/60 transition-all duration-300"
            >
              <Link href="/product-tour" className="gap-2.5">
                <span
                  className="flex size-7 items-center justify-center rounded-full text-xs transition-all duration-300 group-hover/tour:scale-110"
                  style={{
                    background: "linear-gradient(135deg, #00E5A0 0%, #00C98B 100%)",
                    color: "#000",
                    boxShadow: "0 0 12px rgba(0,229,160,0.4)",
                  }}
                >
                  ▶
                </span>
                <span>Product Tour</span>
                <span
                  className="absolute inset-0 -z-10 opacity-0 group-hover/tour:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,229,160,0.08) 0%, transparent 60%)",
                  }}
                />
              </Link>
            </Button>
          </div>
        </div>
      </BeamsHero>

      {/* ─── Architecture Diagram ─── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Platform architecture
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A real-time pipeline from your infrastructure to audit-ready
              evidence.
            </p>
          </div>

          <SolutionDiagram showHeading={false} />
        </div>
      </section>

      {/* ─── Evidence Automation ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Cog className="size-3" />
                Evidence Automation
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Automated evidence collection
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Replace manual screenshots and spreadsheets with always-on
                collectors that pull evidence directly from your systems.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  {
                    title: "API connectors",
                    text: "Native integrations with 50+ cloud, identity, and DevOps tools pull configs and logs automatically.",
                  },
                  {
                    title: "Cloud agent scanning",
                    text: "Lightweight agents scan infrastructure for configuration state, access policies, and encryption settings.",
                  },
                  {
                    title: "Continuous collection",
                    text: "Evidence is refreshed on configurable intervals — hourly, daily, or on-demand — not just at audit time.",
                  },
                  {
                    title: "Hash-verified evidence",
                    text: "Every artifact is SHA-256 hashed with a collection timestamp for auditor-grade integrity.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <CheckCircle2 className="mt-1 size-5 shrink-0 text-emerald-500" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <Card className="shadow-lg">
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-base">Recent Evidence</CardTitle>
                  <span className="rounded-full bg-emerald-500/10 px-3 py-0.5 text-xs font-semibold text-emerald-600">
                    Live
                  </span>
                </div>
              </CardHeader>
              <CardContent className="divide-y">
                {evidenceItems.map((item) => (
                  <div
                    key={item.name}
                    className="flex items-center gap-3 py-4 first:pt-0 last:pb-0"
                  >
                    <CheckCircle2 className="size-5 shrink-0 text-emerald-500" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        {item.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.source}
                      </p>
                    </div>
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {item.timestamp}
                    </span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── Screenshot Automation ─── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Mock browser window */}
            <div 
              className="group rounded-2xl border shadow-2xl overflow-hidden relative"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,160,0.03) 0%, rgba(0,229,160,0.01) 100%)",
              }}
            >
              {/* Animated glow on hover */}
              <div 
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at center, rgba(0,229,160,0.1) 0%, transparent 70%)",
                }}
              />
              
              {/* Browser chrome */}
              <div className="relative flex items-center gap-2 border-b bg-muted/70 backdrop-blur-sm px-4 py-3.5">
                <div className="flex gap-1.5">
                  <div 
                    className="size-3 rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{ background: "#ff5f56" }}
                  />
                  <div 
                    className="size-3 rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{ background: "#ffbd2e" }}
                  />
                  <div 
                    className="size-3 rounded-full transition-all duration-300 group-hover:scale-110"
                    style={{ background: "#27c93f" }}
                  />
                </div>
                <div 
                  className="ml-4 flex-1 rounded-lg bg-background/80 backdrop-blur-sm px-4 py-2 text-xs text-muted-foreground truncate border border-border/50"
                >
                  <span className="opacity-60">🔒</span> https://admin.example-saas.com/security/settings
                </div>
              </div>
              
              {/* Browser content */}
              <div className="relative flex items-center justify-center bg-gradient-to-br from-muted/30 to-muted/10 p-16 min-h-[320px]">
                {/* Scanning effect */}
                <div 
                  className="absolute inset-0 opacity-30"
                  style={{
                    background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,229,160,0.03) 2px, rgba(0,229,160,0.03) 4px)",
                  }}
                />
                
                <div className="relative flex flex-col items-center gap-5 text-center z-10">
                  {/* Animated icon container */}
                  <div className="relative">
                    <div 
                      className="absolute inset-0 rounded-3xl blur-xl opacity-50 animate-pulse"
                      style={{ background: "#00E5A0" }}
                    />
                    <div 
                      className="relative flex size-20 items-center justify-center rounded-3xl shadow-lg"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,229,160,0.2) 0%, rgba(0,229,160,0.1) 100%)",
                      }}
                    >
                      <Camera className="size-10" style={{ color: "#00E5A0" }} />
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-base font-semibold text-foreground">
                      AI agent capturing screenshot
                    </p>
                    <p className="mt-2 text-sm text-muted-foreground flex items-center justify-center gap-2">
                      <span className="inline-block size-2 rounded-full animate-pulse" style={{ background: "#00E5A0" }} />
                      Navigating to Security → MFA settings...
                    </p>
                  </div>
                  
                  {/* Enhanced progress bar */}
                  <div className="mt-2 relative w-56 h-2 overflow-hidden rounded-full bg-muted/50">
                    <div 
                      className="h-full rounded-full transition-all duration-1000"
                      style={{
                        width: "75%",
                        background: "linear-gradient(90deg, #00E5A0 0%, rgba(0,229,160,0.7) 100%)",
                        boxShadow: "0 0 10px rgba(0,229,160,0.5)",
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Decorative corner accent */}
              <div 
                className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-50"
                style={{
                  background: "radial-gradient(circle at top right, rgba(0,229,160,0.1) 0%, transparent 70%)",
                }}
              />
            </div>

            <div>
              <Badge 
                variant="secondary" 
                className="mb-4 px-3 py-1"
                style={{
                  background: "linear-gradient(135deg, rgba(0,229,160,0.1) 0%, rgba(0,229,160,0.05) 100%)",
                  border: "1px solid rgba(0,229,160,0.2)",
                }}
              >
                <Camera className="size-3 mr-1" style={{ color: "#00E5A0" }} />
                Screenshot Agent
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                AI-powered screenshot capture
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                A headless browser agent built on Playwright and AI vision
                navigates your SaaS tools, locates the right settings pages, and
                captures pixel-perfect UI evidence — hands-free.
              </p>
              <ul className="mt-8 space-y-3">
                {[
                  "Autonomous navigation across complex SaaS admin panels",
                  "AI vision verifies the correct page and settings are captured",
                  "Works across 50+ SaaS applications out of the box",
                  "Captures are timestamped, hashed, and linked to controls",
                ].map((point, index) => (
                  <li
                    key={point}
                    className="group flex items-start gap-3 p-3 rounded-lg transition-all duration-300 hover:bg-card hover:shadow-sm"
                  >
                    <div 
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,229,160,0.15) 0%, rgba(0,229,160,0.08) 100%)",
                      }}
                    >
                      <Bot 
                        className="size-4 transition-colors duration-300"
                        style={{ color: "#00E5A0" }}
                      />
                    </div>
                    <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300 leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Compliance as Code ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge variant="secondary" className="mb-4">
                <Code2 className="size-3" />
                Policy-as-Code
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Policy-as-code with OPA
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Define compliance policies as Rego rules and enforce them
                programmatically. Run checks in CI/CD pipelines, fail builds
                that violate security requirements, and verify compliance at the
                pull-request level.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  "Write policies in Rego with full OPA runtime support",
                  "Integrate with GitHub Actions, GitLab CI, and Jenkins",
                  "PR-level compliance status checks for every change",
                  "Drift detection when infrastructure deviates from policy",
                ].map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-3 text-muted-foreground"
                  >
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-emerald-500" />
                    <span className="text-sm">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-xl border bg-zinc-950 p-6 shadow-lg font-mono text-sm leading-relaxed overflow-x-auto">
              <div className="flex items-center gap-2 mb-4 text-zinc-500 text-xs">
                <Code2 className="size-3.5" />
                <span>policy/access_control.rego</span>
              </div>
              <pre className="text-zinc-300">
                <code>{`package compliance.access_control

import rego.v1

default allow := false

allow if {
    input.mfa_enabled == true
    input.password_policy.min_length >= 12
    input.session_timeout_minutes <= 30
}

violations contains msg if {
    not input.mfa_enabled
    msg := "MFA must be enabled for all users"
}

violations contains msg if {
    input.password_policy.min_length < 12
    msg := "Minimum password length must be 12+"
}`}</code>
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Asset & Software Inventory ─── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Complete asset visibility
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Maintain a live inventory of every asset, tool, and resource across
              your organization — from developer laptops to cloud databases.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inventoryCategories.map((category, index) => (
              <Card
                key={category.title}
                className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] hover:-translate-y-1"
                style={{
                  background: "linear-gradient(135deg, rgba(0,229,160,0.03) 0%, rgba(0,229,160,0.01) 100%)",
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <CardHeader className="relative">
                  <div 
                    className="mb-3 flex size-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                    style={{
                      background: "linear-gradient(135deg, rgba(0,229,160,0.2) 0%, rgba(0,229,160,0.1) 100%)",
                    }}
                  >
                    <category.icon 
                      className="size-6 transition-colors duration-300"
                      style={{ color: "#00E5A0" }}
                    />
                  </div>
                  <CardTitle className="text-lg group-hover:text-primary transition-colors duration-300">
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative">
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {category.description}
                  </p>
                  
                  {/* Decorative corner accent */}
                  <div 
                    className="absolute bottom-0 right-0 w-20 h-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: "radial-gradient(circle at bottom right, rgba(0,229,160,0.1) 0%, transparent 70%)",
                    }}
                  />
                </CardContent>

                {/* Animated border glow on hover */}
                <div 
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: "0 0 0 1px rgba(0,229,160,0.2) inset",
                  }}
                />
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Auditor Portal ─── */}
      <section className="py-20 md:py-28 bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <Badge 
                variant="secondary" 
                className="mb-4 px-3 py-1"
                style={{
                  background: "linear-gradient(135deg, rgba(0,229,160,0.1) 0%, rgba(0,229,160,0.05) 100%)",
                  border: "1px solid rgba(0,229,160,0.2)",
                }}
              >
                <Users className="size-3 mr-1" style={{ color: "#00E5A0" }} />
                Auditor Experience
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Dedicated auditor portal
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Give your auditors a structured, read-only portal with
                time-stamped evidence organized by framework and control. No more
                chasing evidence over email or sharing Dropbox links.
              </p>
              <div className="mt-8 space-y-4">
                {auditorFeatures.map((feature, index) => (
                  <div 
                    key={feature.title} 
                    className="group flex gap-4 p-4 rounded-xl transition-all duration-300 hover:bg-card hover:shadow-md"
                  >
                    <div 
                      className="flex size-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,229,160,0.15) 0%, rgba(0,229,160,0.08) 100%)",
                      }}
                    >
                      <feature.icon 
                        className="size-5 transition-colors duration-300"
                        style={{ color: "#00E5A0" }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                        {feature.title}
                      </p>
                      <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <Card 
              className="shadow-xl relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,160,0.02) 0%, transparent 100%)",
              }}
            >
              {/* Decorative top border */}
              <div 
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, #00E5A0 50%, transparent 100%)",
                  opacity: 0.5,
                }}
              />
              
              <CardHeader className="border-b bg-muted/20 backdrop-blur-sm">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div 
                      className="flex size-8 items-center justify-center rounded-lg"
                      style={{
                        background: "linear-gradient(135deg, rgba(0,229,160,0.2) 0%, rgba(0,229,160,0.1) 100%)",
                      }}
                    >
                      <Eye className="size-4" style={{ color: "#00E5A0" }} />
                    </div>
                    <CardTitle className="text-base font-semibold">Auditor Portal</CardTitle>
                  </div>
                  <Badge 
                    variant="outline" 
                    className="text-xs"
                    style={{
                      borderColor: "rgba(0,229,160,0.3)",
                      color: "#00E5A0",
                    }}
                  >
                    <Lock className="size-3 mr-1" />
                    Read-only
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3 pt-4">
                {[
                  {
                    control: "AC-2: Account Management",
                    evidence: 12,
                    status: "Complete",
                  },
                  {
                    control: "AC-3: Access Enforcement",
                    evidence: 8,
                    status: "Complete",
                  },
                  {
                    control: "AU-2: Audit Events",
                    evidence: 15,
                    status: "Complete",
                  },
                  {
                    control: "SC-7: Boundary Protection",
                    evidence: 6,
                    status: "In Review",
                  },
                ].map((row, index) => (
                  <div
                    key={row.control}
                    className="group flex items-center justify-between rounded-xl border bg-card px-4 py-3.5 transition-all duration-300 hover:shadow-md hover:scale-[1.02] hover:border-primary/30"
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div 
                        className="flex size-2 shrink-0 rounded-full transition-all duration-300 group-hover:scale-125"
                        style={{
                          background: row.status === "Complete" ? "#00E5A0" : "#fbbf24",
                          boxShadow: row.status === "Complete" 
                            ? "0 0 8px rgba(0,229,160,0.5)" 
                            : "0 0 8px rgba(251,191,36,0.5)",
                        }}
                      />
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate group-hover:text-primary transition-colors duration-300">
                          {row.control}
                        </p>
                        <p className="text-xs text-muted-foreground mt-0.5">
                          {row.evidence} artifacts
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={row.status === "Complete" ? "default" : "secondary"}
                      className="shrink-0 text-xs ml-3"
                      style={row.status === "Complete" ? {
                        background: "linear-gradient(135deg, rgba(0,229,160,0.15) 0%, rgba(0,229,160,0.08) 100%)",
                        color: "#00E5A0",
                        border: "1px solid rgba(0,229,160,0.3)",
                      } : {}}
                    >
                      {row.status}
                    </Badge>
                  </div>
                ))}
              </CardContent>
              
              {/* Decorative bottom accent */}
              <div 
                className="absolute bottom-0 right-0 w-32 h-32 pointer-events-none"
                style={{
                  background: "radial-gradient(circle at bottom right, rgba(0,229,160,0.08) 0%, transparent 70%)",
                }}
              />
            </Card>
          </div>
        </div>
      </section>

      {/* ─── Integrations Grid ─── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-14 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              50+ integrations and growing
            </h2>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              Connect your entire stack in minutes. Native integrations pull
              evidence automatically from the tools you already use.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
            {integrations.map((name, index) => (
              <div
                key={name}
                className="group relative overflow-hidden rounded-xl border bg-card transition-all duration-300 hover:scale-105 hover:shadow-lg hover:-translate-y-1"
                style={{
                  animationDelay: `${index * 30}ms`,
                }}
              >
                {/* Gradient overlay on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,229,160,0.05) 0%, rgba(0,229,160,0.02) 100%)",
                  }}
                />
                
                {/* Content */}
                <div className="relative flex items-center justify-center px-4 py-6">
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {name}
                  </span>
                </div>

                {/* Animated border glow on hover */}
                <div 
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    boxShadow: "0 0 0 1px rgba(0,229,160,0.3) inset",
                  }}
                />

                {/* Top accent line */}
                <div 
                  className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: "linear-gradient(90deg, transparent 0%, #00E5A0 50%, transparent 100%)",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div 
              className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm border transition-all duration-300 hover:shadow-md hover:scale-105"
              style={{
                background: "linear-gradient(135deg, rgba(0,229,160,0.05) 0%, rgba(0,229,160,0.02) 100%)",
                borderColor: "rgba(0,229,160,0.2)",
              }}
            >
              <span className="text-muted-foreground">
                New integrations added monthly based on customer requests.
              </span>
              <Link
                href="/book-demo"
                className="font-semibold transition-colors duration-300 hover:underline"
                style={{ color: "#00E5A0" }}
              >
                Request an integration →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 md:py-28 bg-background">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            See the platform in action
          </h2>
          <p className="mt-4 mx-auto max-w-xl text-lg text-muted-foreground">
            Walk through a live demo with our team and see how evident.ai
            automates evidence collection, screenshot capture, and audit
            preparation for your stack.
          </p>
          <div className="mt-10">
            <Button
              size="lg"
              asChild
              className="shadow-lg"
            >
              <Link href="/book-demo">
                Book a Demo
                <ArrowRight className="size-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
