import { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { frameworks } from "@/lib/constants";
import { JsonLd } from "@/components/shared/json-ld";
import { generateBreadcrumbSchema } from "@/lib/seo";
import { BeamsHero } from "@/components/marketing/beams-hero";

export function generateStaticParams() {
  return frameworks.map((fw) => ({ slug: fw.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const fw = frameworks.find((f) => f.slug === slug);
  if (!fw) return {};

  return {
    title: `${fw.name} Compliance Automation — evident.ai`,
    description: fw.description,
  };
}

export default async function FrameworkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fw = frameworks.find((f) => f.slug === slug);
  if (!fw) notFound();

  return (
    <>
      <JsonLd
        data={generateBreadcrumbSchema([
          { name: "Home", url: "https://yourdomain.com" },
          { name: "Frameworks", url: "https://yourdomain.com/frameworks" },
          { name: fw.name, url: `https://yourdomain.com/frameworks/${fw.slug}` },
        ])}
      />
      {/* Hero */}
      <BeamsHero size="medium">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <fw.icon className="h-7 w-7" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {fw.name}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {fw.longDescription}
          </p>
        </div>
      </BeamsHero>

      {/* Who needs this */}
      <section className="border-y bg-muted/40 py-16">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold tracking-tight">
            Who needs {fw.shortName}?
          </h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">
            {fw.whoNeeds}
          </p>
        </div>
      </section>

      {/* What it covers */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="text-2xl font-bold tracking-tight">
          What it covers
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          {fw.controlCount} controls across key domains
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          {fw.controls.map((control) => (
            <Badge key={control} variant="secondary" className="px-3 py-1.5 text-sm">
              {control}
            </Badge>
          ))}
        </div>
      </section>

      {/* How we automate it */}
      <section className="border-t bg-muted/40 py-20">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="text-2xl font-bold tracking-tight">
            How we automate {fw.shortName}
          </h2>
          <ul className="mt-8 space-y-4">
            {fw.automationFeatures.map((feature) => (
              <li key={feature} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
                <span className="text-muted-foreground">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-3xl px-6 py-24 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          See {fw.shortName} automation in action
        </h2>
        <p className="mt-4 text-muted-foreground">
          Book a demo and we&apos;ll walk you through how evident.ai automates{" "}
          {fw.shortName} evidence collection end-to-end.
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
