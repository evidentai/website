import Link from "next/link";
import { Linkedin, Twitter, Github } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { footerLinks } from "@/lib/constants";

const columnHeaders: { key: keyof typeof footerLinks; label: string }[] = [
  { key: "product", label: "Product" },
  { key: "company", label: "Company" },
  { key: "resources", label: "Resources" },
  { key: "legal", label: "Legal" },
];

const socialLinks = [
  { label: "LinkedIn", href: "#", icon: Linkedin },
  { label: "Twitter", href: "#", icon: Twitter },
  { label: "GitHub", href: "#", icon: Github },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 md:px-6 py-12 lg:py-16">
        {/* Top: Logo + tagline */}
        <div className="mb-10">
          <Logo />
          <p className="mt-3 max-w-sm text-sm text-muted-foreground">
            Continuous compliance &amp; evidence automation for high-growth
            startups. Cut audit prep from months to weeks.
          </p>
        </div>

        {/* Link Columns */}
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {columnHeaders.map(({ key, label }) => (
            <div key={key}>
              <h3 className="mb-3 text-sm font-semibold">{label}</h3>
              <ul className="flex flex-col gap-2">
                {footerLinks[key].map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: Social + Copyright */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} evident.ai. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="size-5" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
