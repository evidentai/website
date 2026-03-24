"use client"

import * as React from "react"
import {
  LayoutDashboard,
  Layers,
  ShieldCheck,
  FileSearch,
  FileText,
  Plug,
  Settings,
} from "lucide-react"
import Link from "next/link"
import { Logo } from "@/components/logo"

import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Compliance Admin",
    email: "admin@complianceco.com",
    avatar: "",
  },
  navGroups: [
    {
      label: "Platform",
      items: [
        {
          title: "Overview",
          url: "/dashboard",
          icon: LayoutDashboard,
        },
        {
          title: "Frameworks",
          url: "/dashboard/frameworks",
          icon: Layers,
        },
        {
          title: "Controls",
          url: "/dashboard/controls",
          icon: ShieldCheck,
        },
        {
          title: "Evidence",
          url: "/dashboard/evidence",
          icon: FileSearch,
        },
        {
          title: "Policies",
          url: "/dashboard/policies",
          icon: FileText,
        },
        {
          title: "Integrations",
          url: "/dashboard/integrations",
          icon: Plug,
        },
      ],
    },
    {
      label: "Administration",
      items: [
        {
          title: "Settings",
          url: "/dashboard/settings",
          icon: Settings,
        },
      ],
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <ShieldCheck size={18} />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">evident.ai</span>
                  <span className="truncate text-xs">Automation Platform</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {data.navGroups.map((group) => (
          <NavMain key={group.label} label={group.label} items={group.items} />
        ))}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
