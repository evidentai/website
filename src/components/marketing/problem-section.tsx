import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileSearch, Camera, Clock, MessageSquare } from "lucide-react";

const problems = [
  {
    icon: FileSearch,
    title: "Manual evidence collection",
    description:
      "Teams chase logs and configs across dozens of systems, burning hundreds of hours before every audit.",
  },
  {
    icon: Camera,
    title: "Screenshot chaos",
    description:
      "Critical proof buried in Slack, email, and shared drives with no way to verify what is current.",
  },
  {
    icon: Clock,
    title: "Outdated compliance between audits",
    description:
      "Controls checked once a year — security drift and misconfigurations pile up silently.",
  },
  {
    icon: MessageSquare,
    title: "Auditor back-and-forth",
    description:
      "Audits become endless email threads and spreadsheets, zero visibility into developer tools.",
  },
];

export function ProblemSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Compliance is broken
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Most teams still rely on manual processes that drain engineering time,
            create audit anxiety, and leave security gaps between reviews.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {problems.map((problem) => (
            <Card key={problem.title} className="border-destructive/10 bg-destructive/[0.02]">
              <CardHeader>
                <div className="mb-2 flex size-10 items-center justify-center rounded-lg bg-destructive/10">
                  <problem.icon className="size-5 text-destructive" />
                </div>
                <CardTitle className="text-lg">{problem.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
