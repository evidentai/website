"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

type Status = "Passing" | "Failing" | "Needs Review"

interface Control {
  id: string
  name: string
  framework: string
  status: Status
  lastChecked: string
}

const controls: Control[] = [
  {
    id: "CC6.1",
    name: "Logical and physical access controls",
    framework: "SOC 2",
    status: "Passing",
    lastChecked: "2026-03-22 09:15",
  },
  {
    id: "CC6.2",
    name: "User authentication mechanisms",
    framework: "SOC 2",
    status: "Passing",
    lastChecked: "2026-03-22 09:15",
  },
  {
    id: "CC6.3",
    name: "MFA enforcement for all users",
    framework: "SOC 2",
    status: "Failing",
    lastChecked: "2026-03-22 08:00",
  },
  {
    id: "CC7.3",
    name: "Incident response plan testing",
    framework: "SOC 2",
    status: "Failing",
    lastChecked: "2026-03-21 14:30",
  },
  {
    id: "CC9.2",
    name: "Vendor risk assessment",
    framework: "SOC 2",
    status: "Needs Review",
    lastChecked: "2026-03-20 11:00",
  },
  {
    id: "A.9.2.5",
    name: "Review of user access rights",
    framework: "ISO 27001",
    status: "Failing",
    lastChecked: "2026-03-22 07:45",
  },
  {
    id: "A.12.4.1",
    name: "Event logging",
    framework: "ISO 27001",
    status: "Passing",
    lastChecked: "2026-03-22 09:10",
  },
  {
    id: "A.14.2.8",
    name: "System security testing",
    framework: "ISO 27001",
    status: "Needs Review",
    lastChecked: "2026-03-21 16:20",
  },
  {
    id: "§164.312(a)",
    name: "Access control — unique user identification",
    framework: "HIPAA",
    status: "Passing",
    lastChecked: "2026-03-22 09:05",
  },
  {
    id: "§164.312(a)(2)(iv)",
    name: "Encryption and decryption of ePHI",
    framework: "HIPAA",
    status: "Failing",
    lastChecked: "2026-03-22 08:30",
  },
]

const statusVariant: Record<Status, string> = {
  Passing:
    "border-green-200 bg-green-50 text-green-700 dark:border-green-800 dark:bg-green-950 dark:text-green-400",
  Failing:
    "border-red-200 bg-red-50 text-red-700 dark:border-red-800 dark:bg-red-950 dark:text-red-400",
  "Needs Review":
    "border-yellow-200 bg-yellow-50 text-yellow-700 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-400",
}

export default function ControlsPage() {
  const [framework, setFramework] = useState("all")
  const [status, setStatus] = useState("all")
  const [search, setSearch] = useState("")

  const filtered = controls.filter((c) => {
    if (framework !== "all" && c.framework !== framework) return false
    if (status !== "all" && c.status !== status) return false
    if (
      search &&
      !c.name.toLowerCase().includes(search.toLowerCase()) &&
      !c.id.toLowerCase().includes(search.toLowerCase())
    )
      return false
    return true
  })

  return (
    <>
      <div className="px-4 lg:px-6">
        <h1 className="text-2xl font-bold tracking-tight">Controls</h1>
      </div>

      <div className="px-4 lg:px-6 space-y-4">
        {/* Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-4 sm:flex-row">
              <Select value={framework} onValueChange={setFramework}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Framework" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Frameworks</SelectItem>
                  <SelectItem value="SOC 2">SOC 2</SelectItem>
                  <SelectItem value="ISO 27001">ISO 27001</SelectItem>
                  <SelectItem value="HIPAA">HIPAA</SelectItem>
                </SelectContent>
              </Select>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Passing">Passing</SelectItem>
                  <SelectItem value="Failing">Failing</SelectItem>
                  <SelectItem value="Needs Review">Needs Review</SelectItem>
                </SelectContent>
              </Select>
              <Input
                placeholder="Search controls..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:max-w-xs"
              />
            </div>
          </CardContent>
        </Card>

        {/* Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Control ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Framework</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Checked</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filtered.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono text-sm">
                      {c.id}
                    </TableCell>
                    <TableCell>{c.name}</TableCell>
                    <TableCell>{c.framework}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={statusVariant[c.status]}
                      >
                        {c.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground text-sm">
                      {c.lastChecked}
                    </TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
                {filtered.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={6}
                      className="text-center py-8 text-muted-foreground"
                    >
                      No controls match your filters.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
