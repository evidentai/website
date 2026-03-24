"use client"

import {
  CheckCircle2,
  AlertCircle,
  XCircle,
  Activity,
  Plug,
} from "lucide-react"
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
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"

const complianceScore = 72

const scoreColor =
  complianceScore > 80
    ? "#22c55e"
    : complianceScore >= 60
      ? "#eab308"
      : "#ef4444"

const scoreData = [
  { name: "Score", value: complianceScore },
  { name: "Remaining", value: 100 - complianceScore },
]

const frameworks = [
  { name: "SOC 2", passing: 44, total: 60 },
  { name: "ISO 27001", passing: 68, total: 93 },
  { name: "HIPAA", passing: 38, total: 54 },
]

const recentActivity = [
  {
    icon: CheckCircle2,
    description: "AWS IAM policy evidence collected",
    time: "2 minutes ago",
    type: "success" as const,
  },
  {
    icon: CheckCircle2,
    description: "GitHub branch protection verified",
    time: "15 minutes ago",
    type: "success" as const,
  },
  {
    icon: CheckCircle2,
    description: "Okta SSO configuration screenshot captured",
    time: "1 hour ago",
    type: "success" as const,
  },
  {
    icon: CheckCircle2,
    description: "HIPAA encryption control marked as passing",
    time: "3 hours ago",
    type: "success" as const,
  },
  {
    icon: AlertCircle,
    description: "New integration connected: Datadog",
    time: "1 day ago",
    type: "info" as const,
  },
]

const failingControls = [
  {
    name: "MFA enforcement for all users",
    framework: "SOC 2 CC6.1",
  },
  {
    name: "Data encryption at rest",
    framework: "HIPAA §164.312(a)(2)(iv)",
  },
  {
    name: "Access review logs",
    framework: "ISO 27001 A.9.2.5",
  },
  {
    name: "Incident response plan testing",
    framework: "SOC 2 CC7.3",
  },
  {
    name: "Vendor risk assessment",
    framework: "SOC 2 CC9.2",
  },
]

export default function DashboardPage() {
  return (
    <>
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Compliance Overview
        </h1>
      </div>

      <div className="px-4 lg:px-6 space-y-6">
        {/* Top row: Score + Frameworks */}
        <div className="grid gap-6 md:grid-cols-4">
          {/* Compliance Score */}
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">
                Compliance Score
              </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="relative h-40 w-40">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={scoreData}
                      cx="50%"
                      cy="50%"
                      innerRadius={50}
                      outerRadius={70}
                      startAngle={90}
                      endAngle={-270}
                      dataKey="value"
                      strokeWidth={0}
                    >
                      <Cell fill={scoreColor} />
                      <Cell fill="hsl(var(--muted))" />
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span
                    className="text-3xl font-bold"
                    style={{ color: scoreColor }}
                  >
                    {complianceScore}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Framework Progress Cards */}
          {frameworks.map((fw) => {
            const pct = Math.round((fw.passing / fw.total) * 100)
            return (
              <Card key={fw.name}>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium">
                    {fw.name}
                  </CardTitle>
                  <CardDescription>
                    {fw.passing}/{fw.total} controls passing
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Progress value={pct} className="h-2" />
                  <p className="text-2xl font-bold">{pct}%</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Bottom row: Activity + Failing Controls + Integration Health */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Recent Activity */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <item.icon
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        item.type === "success"
                          ? "text-green-500"
                          : "text-blue-500"
                      }`}
                    />
                    <div className="space-y-0.5">
                      <p className="text-sm leading-snug">
                        {item.description}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Controls Needing Attention */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">
                Controls Needing Attention
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {failingControls.map((ctrl, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between gap-2"
                  >
                    <div className="flex items-start gap-2 min-w-0">
                      <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                      <div className="min-w-0">
                        <p className="text-sm leading-snug truncate">
                          {ctrl.name}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {ctrl.framework}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="shrink-0">
                      Fix
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Integration Health */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Integration Health</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <Plug className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Connected Integrations</p>
                  <p className="text-2xl font-bold">8 / 16</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Activity className="h-5 w-5 text-muted-foreground" />
                <div>
                  <p className="text-sm font-medium">Last Sync</p>
                  <p className="text-sm text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                <span className="text-sm font-medium text-green-600">
                  All systems operational
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}
