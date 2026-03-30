import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { solutions } from "@/lib/constants";
import { BeamsHero } from "@/components/marketing/beams-hero";

export const metadata: Metadata = {
  title: "Solutions — evidentflow.ai",
  description:
    "Segment-specific compliance solutions for startups, growing SaaS, DevSecOps teams, and auditors. Tailored automation for every role.",
};

export default function SolutionsPage() {
  return (
    <>
      <BeamsHero size="medium">
        <div className="mx-auto max-w-5xl px-6 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Compliance solutions for every team
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            No matter your role or stage, we tailor compliance automation to fit
            the way you already work — so your team stays focused on building.
          </p>
        </div>
      </BeamsHero>

      <section className="mx-auto max-w-5xl px-6 py-20 md:py-28">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {solutions.map((sol) => (
            <Link key={sol.segment} href={`/solutions/${sol.segment}`} className="group">
              <Card className="h-full transition-shadow hover:shadow-md">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <sol.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="flex items-center justify-between text-lg">
                    {sol.title}
                    <ArrowRight className="h-4 w-4 opacity-0 transition-opacity group-hover:opacity-100" />
                  </CardTitle>
                  <CardDescription>{sol.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>

        <div className="mt-20 text-center">
          <p className="mb-4 text-muted-foreground">
            Not sure which solution fits? Let&apos;s figure it out together.
          </p>
          <Button asChild size="lg">
            <Link href="/contact">Book a Demo</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
