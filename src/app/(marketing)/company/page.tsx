import { Metadata } from "next";
import Link from "next/link";
import { Shield, Code2, Eye, Mail, Twitter, Linkedin, Github, Globe } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BeamsHero } from "@/components/marketing/beams-hero";
import { StackedCards } from "@/components/marketing/stacked-cards";

export const metadata: Metadata = {
  title: "Company — evidentflow.ai",
  description:
    "We believe compliance should be a competitive advantage, not a tax. Meet the team building the future of compliance automation.",
};

const values = [
  {
    icon: <Shield className="size-10 md:size-12" style={{ color: "#00E5A0" }} />,
    title: "Security Pedigree",
    description:
      "Founded by security engineers who lived the compliance pain firsthand at high-growth startups.",
  },
  {
    icon: <Code2 className="size-10 md:size-12" style={{ color: "#00E5A0" }} />,
    title: "Developer-First",
    description:
      "Tools built for engineering teams, not checkbox auditors. If it doesn't fit your workflow, we rebuild it.",
  },
  {
    icon: <Eye className="size-10 md:size-12" style={{ color: "#00E5A0" }} />,
    title: "Transparency",
    description:
      "We practice what we preach — our own Trust page documents our security posture and certifications.",
  },
];

const team = [
  {
    name: "Alexandra Chen",
    role: "Founder & CEO",
    bio: "Former co-founder of TechFlow. Early staff at Microsoft and Google.",
    initials: "AC",
    linkedin: "#",
    github: "#",
    website: "#",
  },
  {
    name: "Marcus Rodriguez",
    role: "Chief Technology Officer",
    bio: "Ex-AWS Principal Engineer. Built security infrastructure for Fortune 500s.",
    initials: "MR",
    linkedin: "#",
    github: "#",
    website: "#",
  },
  {
    name: "Priya Sharma",
    role: "Head of Product",
    bio: "Previously led compliance products at a Series C security startup.",
    initials: "PS",
    linkedin: "#",
    github: "#",
    website: "#",
  },
  {
    name: "James Wilson",
    role: "VP of Engineering",
    bio: "Former tech lead at Stripe. Built developer tools used by 10k+ companies.",
    initials: "JW",
    linkedin: "#",
    github: "#",
    website: "#",
  },
  {
    name: "Sarah Kim",
    role: "Head of Security",
    bio: "Ex-CISO at high-growth SaaS companies. CISSP, CISM certified.",
    initials: "SK",
    linkedin: "#",
    github: "#",
    website: "#",
  },
];

export default function CompanyPage() {
  return (
    <>
      <BeamsHero size="medium">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Building the future of compliance
            </h1>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <blockquote className="rounded-2xl border-l-4 border-primary bg-muted/50 px-8 py-8 text-lg leading-relaxed text-foreground md:text-xl">
              &ldquo;We believe compliance should be a competitive advantage,
              not a tax. Our mission is to eliminate the manual work that slows
              down security teams so they can focus on actually securing their
              products.&rdquo;
            </blockquote>
          </div>
        </div>
      </BeamsHero>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            Our values
          </h2>
          <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
            The principles that guide how we build and operate
          </p>

          <div className="mx-auto max-w-4xl">
            <StackedCards cards={values} />
          </div>
        </div>
      </section>

      <section id="team" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Our team
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Security engineers and product builders who understand compliance
            from the inside.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {team.map((member) => (
              <Card key={member.name} className="flex flex-col gap-6 py-2">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="relative mx-auto h-36 w-36">
                        {/* Dot pattern background */}
                        <div 
                          aria-hidden="true" 
                          className="absolute inset-0 bg-[radial-gradient(circle,var(--foreground)_1px,transparent_1px)] bg-[length:16px_16px] opacity-30"
                        />
                        {/* Radial gradient overlay */}
                        <div 
                          aria-hidden="true" 
                          className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,var(--card)_100%)]"
                        />
                        {/* Avatar container */}
                        <div className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-md border bg-background shadow-xs">
                          <Avatar className="h-24 w-24 border shadow-lg">
                            <AvatarFallback className="text-lg font-semibold">
                              {member.initials}
                            </AvatarFallback>
                          </Avatar>
                        </div>
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-1">
                      {member.name}
                    </h3>
                    <p 
                      className="text-sm font-medium mb-3"
                      style={{ color: "#00E5A0" }}
                    >
                      {member.role}
                    </p>
                    <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex items-center justify-center gap-3">
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                        className="inline-flex items-center justify-center rounded-md transition-all hover:bg-accent dark:hover:bg-accent/50 h-8 w-8 cursor-pointer hover:text-primary"
                      >
                        <Linkedin className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} GitHub`}
                        className="inline-flex items-center justify-center rounded-md transition-all hover:bg-accent dark:hover:bg-accent/50 h-8 w-8 cursor-pointer hover:text-primary"
                      >
                        <Github className="h-4 w-4" aria-hidden="true" />
                      </a>
                      <a
                        href={member.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} Website`}
                        className="inline-flex items-center justify-center rounded-md transition-all hover:bg-accent dark:hover:bg-accent/50 h-8 w-8 cursor-pointer hover:text-primary"
                      >
                        <Globe className="h-4 w-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="careers" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Join us
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            We&apos;re building a world-class team to make compliance effortless
            for every company. We&apos;re hiring across engineering, security,
            and go-to-market roles.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="#">See Open Positions</Link>
          </Button>
        </div>
      </section>

      <section id="contact" className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Get in touch
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Have questions or want to learn more? We&apos;d love to hear from
            you.
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <a
              href="mailto:sales@evidentflow.ai"
              className="inline-flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground"
            >
              <Mail className="h-5 w-5" />
              sales@evidentflow.ai
            </a>

            <div className="flex items-center gap-6">
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="Twitter"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
