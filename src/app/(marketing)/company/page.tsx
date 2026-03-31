import { Metadata } from "next";
import Link from "next/link";
import { Shield, Code2, Eye, Mail, Twitter, Linkedin, Github } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BeamsHero } from "@/components/marketing/beams-hero";
import { StackedCards } from "@/components/marketing/stacked-cards";
import { ExpandableBio } from "@/components/team/expandable-bio";

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
    name: "Mohsen",
    role: "Founder",
    bio: "Mohsen Ahmadi is a cybersecurity leader specializing in application security, threat modeling, and vulnerability research. With experience at Apple and Cisco, he has contributed to secure system design, including work related to the M1 chip architecture. He has also worked on compliance initiatives and projects supported by Department of Defense (DoD) grants, and is passionate about building secure, scalable systems.",
    initials: "Mohsen",
    image: "/images/team/mohsen.png",
    linkedin: "https://www.linkedin.com/in/pwnslinger",
    github: "https://github.com/pwnslinger",
    x: "https://x.com/pwnslinger",
  },
  {
    name: "Mike",
    role: "Director of Engineering",
    bio: "",
    initials: "Mike",
    image: "/images/team/mike.jpeg",
    linkedin: "https://www.linkedin.com/in/",
    github: "",
    x: "",
  },
  {
    name: "Shahin",
    role: "VP of Operations",
    bio: "",
    initials: "Shahin",
    image: "/images/team/shahin.jpeg",
    linkedin: "https://www.linkedin.com/in/shahin-chinichian/",
    github: "",
    x: "",
  },
  {
    name: "Parsa",
    role: "VP of Platform",
    bio: "Parsa Banaei is a computer science graduate with experience in startups, where he has worked on building scalable full stack systems and AI driven platforms. His work includes developing backend infrastructure, modern web applications, and integrating machine learning models into real world products. He is focused on building high quality, production ready systems and turning complex ideas into practical solutions.",
    initials: "Parsa",
    image: "/images/team/parsa.jpg",
    linkedin: "https://www.linkedin.com/in/parsa-b-b30034157/",
    github: "https://github.com/parsabanaei",
    x: "https://x.com/parsabanaei",
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

          <div className="mt-12 grid grid-cols-1 items-start gap-8 md:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <Card key={member.name} className="flex flex-col">
                <CardContent className="flex flex-col p-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-4">
                      <div className="relative mx-auto h-36 w-36">
                        <div 
                          aria-hidden="true" 
                          className="absolute inset-0 bg-[radial-gradient(circle,var(--foreground)_1px,transparent_1px)] bg-[length:16px_16px] opacity-30"
                        />
                        <div 
                          aria-hidden="true" 
                          className="absolute inset-0 bg-[radial-gradient(circle,transparent_0%,var(--card)_100%)]"
                        />
                        <div className="absolute inset-0 m-auto flex h-12 w-12 items-center justify-center rounded-md border bg-background shadow-xs">
                          <Avatar className="h-26 w-26 border shadow-lg">
                            <AvatarImage 
                              src={member.image} 
                              alt={member.name}
                              className={`object-cover ${member.name === "Parsa" ? "object-top" : ""}`}
                            />
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
                    <ExpandableBio bio={member.bio} memberName={member.name} />
                    <div className="flex items-center justify-center gap-3">
                      {member.linkedin && (
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} LinkedIn`}
                          className="inline-flex items-center justify-center rounded-md transition-all hover:bg-accent dark:hover:bg-accent/50 h-8 w-8 cursor-pointer hover:text-primary"
                        >
                          <Linkedin className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                      {member.github && (
                        <a
                          href={member.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} GitHub`}
                          className="inline-flex items-center justify-center rounded-md transition-all hover:bg-accent dark:hover:bg-accent/50 h-8 w-8 cursor-pointer hover:text-primary"
                        >
                          <Github className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
                      {member.x && (
                        <a
                          href={member.x}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${member.name} X`}
                          className="inline-flex items-center justify-center rounded-md transition-all hover:bg-accent dark:hover:bg-accent/50 h-8 w-8 cursor-pointer hover:text-primary"
                        >
                          <Twitter className="h-4 w-4" aria-hidden="true" />
                        </a>
                      )}
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
                aria-label="X"
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
