import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { solutions } from "@/lib/constants";
import { JsonLd } from "@/components/shared/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { BeamsHero } from "@/components/marketing/beams-hero";

export function generateStaticParams() {
  return [
    { segment: "startups" },
    { segment: "growing-saas" },
    { segment: "devsecops" },
    { segment: "auditors" },
  ];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ segment: string }>;
}): Promise<Metadata> {
  const { segment } = await params;
  const solution = solutions.find((s) => s.segment === segment);
  if (!solution) return {};

  return {
    title: `${solution.title} — evidentflow.ai`,
    description: solution.description,
  };
}

export default async function SolutionPage({
  params,
}: {
  params: Promise<{ segment: string }>;
}) {
  const { segment } = await params;
  const solution = solutions.find((s) => s.segment === segment);
  if (!solution) notFound();

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: "https://yourdomain.com" },
          { name: "Solutions", url: "https://yourdomain.com/solutions" },
          { name: solution.title, url: `https://yourdomain.com/solutions/${solution.segment}` },
        ])}
      />
      {/* Hero */}
      <BeamsHero size="medium">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <solution.icon className="h-7 w-7" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {solution.headline}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {solution.description}
          </p>
        </div>
      </BeamsHero>

      {/* Value Props */}
      <section className="mx-auto max-w-5xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {solution.valueProps.map((vp) => (
            <Card key={vp.title}>
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <vp.icon className="h-5 w-5" />
                </div>
                <CardTitle className="text-lg">{vp.title}</CardTitle>
                <CardDescription>{vp.description}</CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonial */}
      <section className="border-y bg-muted/40 py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <blockquote className="text-xl font-medium leading-relaxed italic">
            &ldquo;{solution.testimonial.quote}&rdquo;
          </blockquote>
          <div className="mt-6">
            <p className="font-semibold">{solution.testimonial.name}</p>
            <p className="text-sm text-muted-foreground">
              {solution.testimonial.title}, {solution.testimonial.company}
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Ready to see it in action?
        </h2>
        <p className="mt-4 text-muted-foreground">
          Book a 30-minute demo and see how evidentflow.ai works for your team.
        </p>
        <div className="mt-8">
          <Button asChild size="lg">
            <Link href="/contact">Book a Demo</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
