"use client"

import { FileText } from "lucide-react"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

type PolicyStatus = "Approved" | "Draft" | "Needs Review"

interface Policy {
  name: string
  status: PolicyStatus
  updatedAt: string
}

const policies: Policy[] = [
  { name: "Information Security Policy", status: "Approved", updatedAt: "Mar 10, 2026" },
  { name: "Acceptable Use Policy", status: "Approved", updatedAt: "Feb 28, 2026" },
  { name: "Data Classification Policy", status: "Draft", updatedAt: "Mar 18, 2026" },
  { name: "Incident Response Plan", status: "Approved", updatedAt: "Jan 15, 2026" },
  { name: "Business Continuity Plan", status: "Needs Review", updatedAt: "Mar 5, 2026" },
  { name: "Vendor Management Policy", status: "Draft", updatedAt: "Mar 20, 2026" },
  { name: "Access Control Policy", status: "Approved", updatedAt: "Feb 12, 2026" },
  { name: "Change Management Policy", status: "Needs Review", updatedAt: "Mar 1, 2026" },
]

const statusClass: Record<PolicyStatus, string> = {
  Approved:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400",
  Draft:
    "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400",
  "Needs Review":
    "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-800 dark:bg-orange-950 dark:text-orange-400",
}

export default function PoliciesPage() {
  return (
    <>
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Policies</h1>
      </div>

      <div className="px-4 lg:px-6">
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {policies.map((policy) => (
            <Card key={policy.name}>
              <CardHeader className="pb-3">
                <div className="flex items-start gap-3">
                  <div className="rounded-md border p-2">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="space-y-1 min-w-0">
                    <CardTitle className="text-sm font-medium leading-snug">
                      {policy.name}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className={statusClass[policy.status]}
                    >
                      {policy.status}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-muted-foreground">
                    Updated {policy.updatedAt}
                  </p>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  )
}
