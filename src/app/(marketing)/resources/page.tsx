import { Metadata } from "next";
import Link from "next/link";
import { FileText, BookOpen, Video } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BeamsHero } from "@/components/marketing/beams-hero";

export const metadata: Metadata = {
  title: "Resources — evident.ai",
  description:
    "Guides, articles, and insights to help you navigate compliance.",
};

const sections = [
  {
    icon: FileText,
    title: "Blog",
    description: "Read our latest articles on compliance automation.",
    href: "/resources/blog",
    comingSoon: false,
  },
  {
    icon: BookOpen,
    title: "Guides",
    description: "Step-by-step guides for every framework.",
    href: "#",
    comingSoon: true,
  },
  {
    icon: Video,
    title: "Webinars",
    description: "Live and on-demand webinars.",
    href: "#",
    comingSoon: true,
  },
];

export default function ResourcesPage() {
  return (
    <>
      <BeamsHero size="medium">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Resources
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Guides, articles, and insights to help you navigate compliance.
            </p>
          </div>
        </div>
      </BeamsHero>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {sections.map((section) => (
            <Link
              key={section.title}
              href={section.href}
              className={
                section.comingSoon
                  ? "pointer-events-none"
                  : "transition-opacity hover:opacity-80"
              }
            >
              <Card className="h-full">
                <CardHeader>
                  <div className="mb-2 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      <section.icon className="h-5 w-5" />
                    </div>
                    {section.comingSoon && (
                      <Badge variant="secondary">Coming soon</Badge>
                    )}
                  </div>
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                  <CardDescription>{section.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}
