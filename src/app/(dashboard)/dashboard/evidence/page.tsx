"use client"

import { Cloud, Github, KeyRound, Monitor } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface EvidenceRow {
  source: string
  sourceIcon: React.ElementType
  type: string
  linkedControl: string
  collectedAt: string
  hash: string
  status: "Verified" | "Pending"
}

const evidence: EvidenceRow[] = [
  {
    source: "AWS",
    sourceIcon: Cloud,
    type: "API Snapshot",
    linkedControl: "CC6.1",
    collectedAt: "2026-03-22 09:12",
    hash: "a1b2c3d4e5f6789012345678abcdef0123456789abcdef0123456789abcdef01",
    status: "Verified",
  },
  {
    source: "GitHub",
    sourceIcon: Github,
    type: "Config Check",
    linkedControl: "CC7.1",
    collectedAt: "2026-03-22 09:00",
    hash: "b2c3d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef012",
    status: "Verified",
  },
  {
    source: "Okta",
    sourceIcon: KeyRound,
    type: "Screenshot",
    linkedControl: "CC6.2",
    collectedAt: "2026-03-22 08:45",
    hash: "c3d4e5f6789012345678abcdef0123456789abcdef0123456789abcdef01234",
    status: "Verified",
  },
  {
    source: "AWS",
    sourceIcon: Cloud,
    type: "API Snapshot",
    linkedControl: "§164.312(a)",
    collectedAt: "2026-03-22 08:30",
    hash: "d4e5f67890123456789abcdef0123456789abcdef0123456789abcdef012345",
    status: "Pending",
  },
  {
    source: "Datadog",
    sourceIcon: Monitor,
    type: "Log Export",
    linkedControl: "A.12.4.1",
    collectedAt: "2026-03-22 08:15",
    hash: "e5f6789012345678abcdef0123456789abcdef0123456789abcdef0123456789",
    status: "Verified",
  },
  {
    source: "GitHub",
    sourceIcon: Github,
    type: "Config Check",
    linkedControl: "A.14.2.8",
    collectedAt: "2026-03-21 17:00",
    hash: "f67890123456789abcdef0123456789abcdef0123456789abcdef01234567890",
    status: "Pending",
  },
  {
    source: "AWS",
    sourceIcon: Cloud,
    type: "API Snapshot",
    linkedControl: "CC9.2",
    collectedAt: "2026-03-21 15:30",
    hash: "0123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef",
    status: "Verified",
  },
  {
    source: "Okta",
    sourceIcon: KeyRound,
    type: "Screenshot",
    linkedControl: "§164.312(d)",
    collectedAt: "2026-03-21 14:00",
    hash: "123456789abcdef0123456789abcdef0123456789abcdef0123456789abcdef0",
    status: "Pending",
  },
]

const statusClass: Record<string, string> = {
  Verified:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400",
  Pending:
    "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400",
}

export default function EvidencePage() {
  return (
    <>
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Evidence</h1>
      </div>

      <div className="px-4 lg:px-6">
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Source</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Linked Control</TableHead>
                  <TableHead>Collected At</TableHead>
                  <TableHead>Hash</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {evidence.map((e, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <e.sourceIcon className="h-4 w-4 text-muted-foreground" />
                        <span>{e.source}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary">{e.type}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">
                      {e.linkedControl}
                    </TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {e.collectedAt}
                    </TableCell>
                    <TableCell className="font-mono text-xs text-muted-foreground">
                      {e.hash.slice(0, 16)}...
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusClass[e.status]}
                      >
                        {e.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
