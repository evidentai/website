"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { navLinks } from "@/lib/constants";
import { Logo } from "@/components/shared/logo";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-lg border-b">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
        {/* Logo */}
        <Logo />

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            {navLinks.map((link) =>
              link.children ? (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuTrigger>{link.label}</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <NavigationMenuLink asChild>
                            <Link
                              href={child.href}
                              className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                            >
                              <div className="text-sm font-medium leading-none">
                                {child.label}
                              </div>
                              <p className="mt-1.5 line-clamp-2 text-sm leading-snug text-muted-foreground">
                                {child.description}
                              </p>
                            </Link>
                          </NavigationMenuLink>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              ) : (
                <NavigationMenuItem key={link.label}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={cn(navigationMenuTriggerStyle())}
                    >
                      {link.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              )
            )}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-2">
          <Button variant="ghost" asChild>
            <a href="https://app.evidentflow.ai">Login</a>
          </Button>
          <Button asChild>
            <Link href="/book-demo">Book Demo</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="size-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[360px] overflow-y-auto">
            <SheetTitle className="sr-only">Navigation</SheetTitle>
            <div className="flex flex-col gap-6 pt-6 pb-6">
              <Logo />
              <nav className="flex flex-col gap-1">
                {navLinks.map((link) =>
                  link.children ? (
                    // Collapsible section
                    <div key={link.label}>
                      <button
                        onClick={() =>
                          setExpandedSection(
                            expandedSection === link.label ? null : link.label
                          )
                        }
                        className="flex items-center justify-between w-full rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                      >
                        <span>{link.label}</span>
                        <ChevronDown
                          className={cn(
                            "size-4 transition-transform",
                            expandedSection === link.label && "rotate-180"
                          )}
                        />
                      </button>
                      {expandedSection === link.label && (
                        <div className="ml-4 flex flex-col gap-0.5 border-l pl-3 mt-1 transition-all duration-200">
                          {link.children.map((child) => (
                            <Link
                              key={child.href}
                              href={child.href}
                              onClick={() => {
                                setMobileOpen(false);
                                setExpandedSection(null);
                              }}
                              className="flex flex-col rounded-md px-3 py-2 hover:bg-accent hover:text-accent-foreground transition-colors"
                            >
                              <span className="text-sm font-medium">
                                {child.label}
                              </span>
                              <span className="text-xs text-muted-foreground line-clamp-1">
                                {child.description}
                              </span>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    // Regular link
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </nav>
              <div className="mt-6 flex flex-col gap-2 border-t pt-4 px-3">
                <Button variant="outline" asChild className="w-auto">
                  <a
                    href="https://app.evidentflow.ai"
                    onClick={() => setMobileOpen(false)}
                  >
                    Login
                  </a>
                </Button>
                <Button asChild className="w-auto">
                  <Link
                    href="/book-demo"
                    onClick={() => setMobileOpen(false)}
                  >
                    Book Demo
                  </Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
