"use client"

import Link from "next/link"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"

const frameworks = [
  {
    name: "SOC 2",
    description: "Service Organization Control 2 — Trust Services Criteria",
    passing: 44,
    failing: 8,
    needsReview: 8,
    total: 60,
  },
  {
    name: "ISO 27001",
    description:
      "Information Security Management System (ISMS) standard",
    passing: 68,
    failing: 12,
    needsReview: 13,
    total: 93,
  },
  {
    name: "HIPAA",
    description:
      "Health Insurance Portability and Accountability Act safeguards",
    passing: 38,
    failing: 9,
    needsReview: 7,
    total: 54,
  },
]

export default function FrameworksPage() {
  return (
    <>
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Frameworks</h1>
      </div>

      <div className="px-4 lg:px-6 space-y-6">
        {frameworks.map((fw) => {
          const pct = Math.round((fw.passing / fw.total) * 100)
          return (
            <Card key={fw.name}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>{fw.name}</CardTitle>
                    <CardDescription className="mt-1">
                      {fw.description}
                    </CardDescription>
                  </div>
                  <Button asChild>
                    <Link href="/dashboard/controls">View Controls</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {fw.passing}/{fw.total} controls passing
                    </span>
                    <span className="font-medium">{pct}%</span>
                  </div>
                  <Progress value={pct} className="h-2" />
                </div>
                <div className="flex gap-3">
                  <Badge
                    variant="outline"
                    className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
                  >
                    {fw.passing} Passing
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400"
                  >
                    {fw.failing} Failing
                  </Badge>
                  <Badge
                    variant="outline"
                    className="border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400"
                  >
                    {fw.needsReview} Needs Review
                  </Badge>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </>
  )
}
