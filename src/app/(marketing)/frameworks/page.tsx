import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { frameworks } from "@/lib/constants";
import { BeamsHero } from "@/components/marketing/beams-hero";

export const metadata: Metadata = {
  title: "Compliance Frameworks — evidentflow.ai",
  description:
    "Automate SOC 2, ISO 27001, HIPAA, GDPR, FedRAMP, and more — all from a single platform with continuous evidence collection.",
};

export default function FrameworksPage() {
  return (
    <>
      <BeamsHero size="medium">
        <div className="mx-auto max-w-6xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Every framework, one platform
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            Map controls, automate evidence, and monitor compliance across every
            framework your customers require — without duplicating work.
          </p>
        </div>
      </BeamsHero>

      <section className="mx-auto max-w-6xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {frameworks.map((fw) => (
            <Link key={fw.slug} href={`/frameworks/${fw.slug}`} className="group">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className={`mb-2 flex items-center justify-center ${fw.slug === "gdpr" ? "h-14 w-16" : "h-14 w-14"}`}>
                    <Image
                      src={fw.image}
                      alt={fw.name}
                      width={fw.slug === "gdpr" ? 64 : 56}
                      height={fw.slug === "gdpr" ? 46 : 56}
                      className="object-contain"
                    />
                  </div>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    {fw.name}
                    <ArrowRight className="ml-auto h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>{fw.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Badge variant="secondary">{fw.controlCount} controls</Badge>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="mb-4 text-muted-foreground">
            Need a framework we don&apos;t list? We support custom frameworks too.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Book a Demo</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
