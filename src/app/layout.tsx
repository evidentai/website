import type { Metadata } from "next";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import { siteConfig } from "@/lib/constants";

export const metadata: Metadata = {
  title: {
    default: `${siteConfig.name} — Compliance Automation Platform`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  metadataBase: new URL(siteConfig.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="dark antialiased"
      suppressHydrationWarning
    >
      <body className="font-sans" suppressHydrationWarning>
        <ThemeProvider defaultTheme="dark" storageKey="evident-ai-theme">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
