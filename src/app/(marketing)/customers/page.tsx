import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Quote, ArrowRight, Star, Clock, TrendingUp, Shield } from "lucide-react";
import { testimonials } from "@/lib/constants";
import { BeamsHero } from "@/components/marketing/beams-hero";

export const metadata: Metadata = {
  title: "Customers",
  description:
    "Trusted by fast-moving teams who need compliance without the friction. See how startups and enterprises use evident.ai to ship faster.",
};

const logoCompanies = [
  "TechCorp",
  "CloudBase",
  "DataFlow",
  "SecureStack",
  "NexaPay",
  "CodeShip",
  "VaultHQ",
  "InfraOps",
];

const caseStudies = [
  {
    company: "DataStack",
    headline: "DataStack achieved SOC 2 Type II in 8 weeks",
    metrics: [
      { icon: Clock, label: "75% reduction in audit prep time" },
      { icon: TrendingUp, label: "From Series A to enterprise-ready" },
    ],
    summary:
      "DataStack was losing enterprise deals because they couldn't answer security questionnaires. After deploying evident.ai, they went from zero compliance posture to SOC 2 Type II in just 8 weeks — closing their first enterprise contract within days of sharing their trust report.",
  },
  {
    company: "CloudScale",
    headline: "CloudScale manages 3 frameworks with one engineer",
    metrics: [
      { icon: Clock, label: "Previously needed a 4-person compliance team" },
      { icon: Shield, label: "Now 1 security engineer manages everything" },
    ],
    summary:
      "As CloudScale scaled across AWS and GCP, managing SOC 2, ISO 27001, and HIPAA simultaneously became untenable. evident.ai's shared control mapping and continuous monitoring let a single security engineer handle what previously required a dedicated team of four.",
  },
  {
    company: "NexaPay",
    headline: "NexaPay cut evidence collection from 200 to 5 hours",
    metrics: [
      { icon: Clock, label: "200 hours reduced to 5 hours per audit cycle" },
      { icon: TrendingUp, label: "AI screenshot agent eliminated manual work" },
    ],
    summary:
      "NexaPay's security team was spending 200+ hours per audit cycle manually capturing screenshots and gathering evidence across dozens of tools. evident.ai's AI-powered screenshot agent and automated collectors reduced that to under 5 hours of review time.",
  },
];

export default function CustomersPage() {
  return (
    <>
      {/* Hero */}
      <BeamsHero size="medium">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Trusted by teams who ship fast
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-muted-foreground">
            From seed-stage startups closing their first enterprise deal to
            public companies managing multi-framework compliance — teams choose
            evident.ai to move fast without breaking trust.
          </p>
        </div>
      </BeamsHero>

      {/* Logo Wall */}
      <section className="py-20 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm font-medium text-muted-foreground uppercase tracking-wider mb-12">
            Trusted by innovative teams everywhere
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {logoCompanies.map((name) => (
              <Card key={name} className="border-dashed">
                <CardContent className="flex items-center justify-center py-8">
                  <span className="text-xl font-semibold text-muted-foreground/60">
                    {name}
                  </span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              What our customers say
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from the teams who replaced months of manual compliance work
              with continuous automation.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card key={t.name} className="flex flex-col">
                <CardContent className="flex flex-col flex-1 pt-6">
                  <Quote className="h-8 w-8 text-muted-foreground/30 mb-4" />
                  <p className="text-lg italic text-foreground/90 flex-1">
                    &ldquo;{t.quote}&rdquo;
                  </p>
                  <div className="mt-6 flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-semibold shrink-0">
                      {t.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium leading-tight">{t.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {t.title}, {t.company}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 mt-4">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Customer stories
            </h2>
            <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
              See how real teams achieved compliance faster with evident.ai.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {caseStudies.map((cs) => (
              <Card key={cs.company} className="flex flex-col">
                <CardContent className="flex flex-col flex-1 pt-6">
                  <Badge variant="secondary" className="w-fit mb-4">
                    {cs.company}
                  </Badge>
                  <h3 className="text-xl font-semibold tracking-tight mb-4">
                    {cs.headline}
                  </h3>

                  <div className="space-y-3 mb-6">
                    {cs.metrics.map((m) => (
                      <div key={m.label} className="flex items-start gap-3">
                        <m.icon className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                        <span className="text-sm font-medium">{m.label}</span>
                      </div>
                    ))}
                  </div>

                  <p className="text-sm text-muted-foreground flex-1">
                    {cs.summary}
                  </p>

                  <Link
                    href="#"
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary mt-6 hover:underline"
                  >
                    Read case study
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Join the teams building trust at scale
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto">
            See why fast-growing teams trust evident.ai to automate their
            compliance journey.
          </p>
          <div className="mt-8">
            <Button size="lg" asChild>
              <Link href="#">Book a Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
