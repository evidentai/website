import { Metadata } from "next";
import Link from "next/link";
import {
  Lock,
  Shield,
  Key,
  Database,
  AlertTriangle,
  Search,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BeamsHero } from "@/components/marketing/beams-hero";

export const metadata: Metadata = {
  title: "Trust & Security — evident.ai",
  description:
    "Security is our foundation. Learn about our certifications, security controls, and how we protect your data.",
};

const securityControls = [
  {
    icon: Lock,
    title: "Encryption at Rest",
    description:
      "AES-256 encryption for all stored data, including backups and database snapshots.",
  },
  {
    icon: Shield,
    title: "Encryption in Transit",
    description:
      "TLS 1.3 for all communications between clients, APIs, and internal services.",
  },
  {
    icon: Key,
    title: "Access Controls",
    description:
      "Role-based access control, SSO integration, and MFA enforcement for all accounts.",
  },
  {
    icon: Database,
    title: "Data Isolation",
    description:
      "Tenant-level data isolation ensuring your data is never co-mingled with other customers.",
  },
  {
    icon: AlertTriangle,
    title: "Incident Response",
    description:
      "24-hour incident response SLA with documented runbooks and post-incident reviews.",
  },
  {
    icon: Search,
    title: "Penetration Testing",
    description:
      "Annual third-party penetration tests with findings remediated within 30 days.",
  },
];

const subProcessors = [
  { name: "AWS", purpose: "Infrastructure" },
  { name: "Cloudflare", purpose: "CDN / WAF" },
  { name: "Datadog", purpose: "Monitoring" },
  { name: "Stripe", purpose: "Billing" },
];

export default function TrustPage() {
  return (
    <>
      <BeamsHero size="medium">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
              Security is our foundation
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              As a compliance company, we hold ourselves to the highest security
              standards. Here&apos;s how we protect your data and earn your
              trust.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium"
            >
              SOC 2 Type II
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium"
            >
              ISO 27001
            </Badge>
            <Badge
              variant="secondary"
              className="px-4 py-2 text-sm font-medium"
            >
              GDPR Compliant
            </Badge>
          </div>
        </div>
      </BeamsHero>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Security controls
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Defense in depth across every layer of our platform.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {securityControls.map((control) => (
              <Card key={control.title}>
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <control.icon className="h-5 w-5" />
                  </div>
                  <CardTitle className="text-lg">{control.title}</CardTitle>
                  <CardDescription>{control.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold tracking-tight sm:text-4xl">
            Sub-processors
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            We carefully vet every third party that processes your data.
          </p>

          <div className="mx-auto mt-12 max-w-2xl overflow-hidden rounded-lg border">
            <table className="w-full">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Provider
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium">
                    Purpose
                  </th>
                </tr>
              </thead>
              <tbody>
                {subProcessors.map((sp) => (
                  <tr key={sp.name} className="border-b last:border-0">
                    <td className="px-6 py-4 text-sm font-medium">
                      {sp.name}
                    </td>
                    <td className="px-6 py-4 text-sm text-muted-foreground">
                      {sp.purpose}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Questions about our security?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Our security team is happy to discuss our practices, provide
            documentation, or schedule a call.
          </p>
          <Button asChild size="lg" className="mt-8">
            <Link href="/company#contact">Contact Security</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
