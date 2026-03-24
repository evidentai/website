"use client"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Integration {
  name: string
  connected: boolean
  lastSync?: string
}

const integrations: Integration[] = [
  { name: "AWS", connected: true, lastSync: "5 min ago" },
  { name: "GitHub", connected: true, lastSync: "12 min ago" },
  { name: "Okta", connected: true, lastSync: "8 min ago" },
  { name: "Google Workspace", connected: true, lastSync: "20 min ago" },
  { name: "Jira", connected: true, lastSync: "30 min ago" },
  { name: "Slack", connected: true, lastSync: "2 min ago" },
  { name: "Datadog", connected: true, lastSync: "1 hr ago" },
  { name: "Cloudflare", connected: true, lastSync: "45 min ago" },
  { name: "Azure", connected: false },
  { name: "GitLab", connected: false },
  { name: "PagerDuty", connected: false },
  { name: "MongoDB", connected: false },
  { name: "Vercel", connected: false },
  { name: "Docker", connected: false },
  { name: "Kubernetes", connected: false },
  { name: "1Password", connected: false },
]

export default function IntegrationsPage() {
  const connected = integrations.filter((i) => i.connected)
  const available = integrations.filter((i) => !i.connected)

  return (
    <>
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Integrations</h1>
      </div>

      <div className="px-4 lg:px-6 space-y-8">
        {/* Connected */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Connected</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {connected.map((integ) => (
              <Card key={integ.name}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {integ.name}
                    </CardTitle>
                    <Badge
                      variant="outline"
                      className="border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400"
                    >
                      Connected
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-3">
                    Last sync: {integ.lastSync}
                  </p>
                  <Button variant="outline" size="sm" className="w-full">
                    Disconnect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Available */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Available</h2>
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            {available.map((integ) => (
              <Card key={integ.name}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm font-medium">
                      {integ.name}
                    </CardTitle>
                    <Badge variant="secondary">Available</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <Button size="sm" className="w-full">
                    Connect
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
