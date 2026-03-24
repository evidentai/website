

**Product Requirements Document**

*Compliance Automation Platform — Marketing Website & Dashboard*

Template: shadcn-dashboard-landing-template (shadcnstore.com)

Stack: Next.js 15 (App Router) \+ TypeScript \+ Tailwind CSS v4 \+ shadcn/ui

Hosting: Vercel

Target: Cursor AI for implementation

**Table of Contents**

1. 1\. Project Overview

2. 2\. Tech Stack & Template

3. 3\. Project Structure

4. 4\. Pages & Routes

5. 5\. Home Page (detailed spec)

6. 6\. Platform Page

7. 7\. Solutions Page

8. 8\. Frameworks Page

9. 9\. Customers Page

10. 10\. Resources Page (Blog)

11. 11\. Pricing Page

12. 12\. Trust / Security Page

13. 13\. Company Page

14. 14\. Dashboard App Shell

15. 15\. SEO Requirements

16. 16\. Performance Requirements

17. 17\. Deployment & Vercel Config

18. 18\. Component Library

**1\. Project Overview**

We are building the public marketing website and the authenticated product dashboard for a compliance automation platform. The platform helps startups get SOC 2, ISO 27001, HIPAA, and other certifications by automatically collecting evidence from their infrastructure, flagging gaps, and generating remediation steps.

The website has two distinct parts:

* Marketing site (public) — 9 pages that explain the product, build trust, and convert visitors into demo bookings or free gap assessment signups.

* Dashboard app (authenticated) — the product interface where customers see their compliance score, controls, evidence, integrations, and settings. Auditors get a separate read-only portal.

Both parts live in the same Next.js project using the App Router. The marketing site is server-rendered for SEO. The dashboard is client-rendered behind auth.

**2\. Tech Stack & Template**

**Base Template**

* shadcn-dashboard-landing-template from shadcnstore.com

  * Landing: https://shadcnstore.com/templates/dashboard/shadcn-dashboard-landing-template/landing

  * Dashboard: https://shadcnstore.com/templates/dashboard/shadcn-dashboard-landing-template/dashboard

  * GitHub: https://github.com/shadcnstore/shadcn-dashboard-landing-template

**Core Stack**

* Next.js 15 with App Router (NOT Pages Router)

* TypeScript (strict mode)

* Tailwind CSS v4

* shadcn/ui component library (use cn() utility for conditional classes)

* React 19

**Additional Libraries**

* next-themes for dark/light mode

* next-seo or built-in Next.js metadata API for SEO meta tags

* framer-motion for animations (hero, scroll reveals, page transitions)

* lucide-react for icons

* recharts or tremor for dashboard charts

* next-mdx-remote or contentlayer for blog/resource pages

* zod for form validation

* react-hook-form for form handling

**Auth (dashboard only)**

* Clerk or Auth0 (to be decided, scaffold with Clerk for now)

* Middleware-based route protection for /dashboard/\* routes

**Hosting**

* Vercel with automatic preview deployments on PRs

* Custom domain setup

* Vercel Analytics and Speed Insights enabled

**3\. Project Structure**

Use the Next.js App Router convention. All marketing pages go in the (marketing) route group. All dashboard pages go in the (dashboard) route group behind auth middleware.

src/

  app/

    (marketing)/

      page.tsx                    \# Home

      platform/page.tsx           \# Platform

      solutions/page.tsx          \# Solutions

      solutions/\[segment\]/page.tsx \# Individual solution pages

      frameworks/page.tsx         \# Frameworks overview

      frameworks/\[slug\]/page.tsx  \# Individual framework (soc-2, iso-27001, etc)

      customers/page.tsx          \# Customers / case studies

      resources/page.tsx          \# Resources hub

      resources/blog/page.tsx     \# Blog listing

      resources/blog/\[slug\]/page.tsx \# Blog post

      pricing/page.tsx            \# Pricing

      trust/page.tsx              \# Trust / Security

      company/page.tsx            \# Company / About

      layout.tsx                  \# Marketing layout (navbar \+ footer)

    (dashboard)/

      dashboard/

        page.tsx                  \# Dashboard overview

        frameworks/page.tsx       \# Framework progress

        controls/page.tsx         \# Controls list

        evidence/page.tsx         \# Evidence management

        integrations/page.tsx     \# Connected integrations

        policies/page.tsx         \# Policy documents

        settings/page.tsx         \# Account settings

      layout.tsx                  \# Dashboard layout (sidebar \+ header)

    layout.tsx                    \# Root layout

    not-found.tsx                 \# Custom 404

  components/

    ui/                           \# shadcn/ui primitives

    marketing/                    \# Marketing-specific components

    dashboard/                    \# Dashboard-specific components

    shared/                       \# Shared components (logo, theme toggle)

  lib/

    utils.ts                      \# cn() helper, formatters

    constants.ts                  \# Site metadata, nav links, framework data

    seo.ts                        \# SEO helpers, schema generators

  content/

    blog/                         \# MDX blog posts

    frameworks/                   \# Framework content (SOC 2, ISO, etc)

  styles/

    globals.css                   \# Tailwind imports, custom CSS vars

  middleware.ts                   \# Auth protection for /dashboard/\*

public/

  robots.txt

  sitemap.xml                     \# Auto-generated via next-sitemap

  og-image.png                    \# Default OG image

  images/                         \# Static images (.webp format)

**4\. Pages & Routes**

All marketing pages use the same layout with a sticky navbar and footer. Each page has its own metadata export for SEO. The route structure uses slugs, not IDs, for all content pages (blog posts, frameworks, solutions).

**Route Table**

* / — Home (hero, problem, solution, how it works, highlights, social proof, CTA)

* /platform — Platform deep dive (architecture, features, technical moat)

* /solutions — Solutions overview with links to segment pages

* /solutions/startups — For early-stage startups

* /solutions/growing-saas — For growing SaaS companies

* /solutions/devsecops — For DevSecOps teams

* /solutions/auditors — For compliance auditors

* /frameworks — Framework overview grid

* /frameworks/soc-2 — SOC 2 detail page

* /frameworks/iso-27001 — ISO 27001 detail page

* /frameworks/hipaa — HIPAA detail page

* /frameworks/gdpr — GDPR detail page

* /frameworks/fedramp — FedRAMP-lite detail page

* /customers — Logos, testimonials, case studies

* /resources — Resource hub (blog, guides, webinars)

* /resources/blog — Blog listing

* /resources/blog/\[slug\] — Individual blog post

* /pricing — Plan comparison, FAQs, startup offer

* /trust — Security practices, encryption, access controls

* /company — About, mission, team, careers

* /dashboard — Authenticated product dashboard

**5\. Home Page (detailed spec)**

The most important page. It tells the full story: problem, solution, proof, and conversion. Every section should be a separate React component for reusability.

**5.1 Navbar (shared across all marketing pages)**

* Sticky on scroll with backdrop blur

* Logo on the left, nav links in the center, CTAs on the right

* Nav links: Platform, Solutions (dropdown), Frameworks (dropdown), Customers, Resources, Pricing

* Right side: Login button (ghost), Book Demo button (primary)

* Mobile: hamburger menu with slide-out drawer

**5.2 Hero Section**

* Headline: "Continuous compliance & evidence automation for high-growth startups"

* Subpoints (2–3 short lines):

  * Cut audit prep from months to weeks

  * Prove security posture with real system evidence

* Two CTA buttons: "Book Demo" (primary) and "Start your free SOC 2 gap assessment" (outline/secondary)

* Hero visual: product screenshot or animated illustration showing the dashboard

* Subtle gradient or pattern background, not a flat white

**5.3 Logo Bar (social proof)**

* Horizontal scrolling row of customer/partner logos

* Grayscale logos, full color on hover

* Text above: "Trusted by fast-moving teams" or similar

**5.4 Problem Section**

* Section heading: something like "Compliance is broken"

* Four problem cards in a 2x2 grid:

  * Manual evidence collection — teams chase logs and configs across dozens of systems, burning hundreds of hours before every audit

  * Screenshot chaos — critical proof buried in Slack, email, and shared drives with no way to verify what is current

  * Outdated compliance between audits — controls checked once a year, security drift and misconfigurations pile up silently

  * Auditor back-and-forth — audits become endless email threads and spreadsheets, zero visibility into developer tools and software inventory

* Each card gets an icon (lucide-react), a bold title, and 1–2 sentence description

**5.5 Solution Section**

* Simple diagram or illustration showing data flowing through the platform

* Show: customer stack on the left, platform in the middle, outputs on the right (dashboard, auditor portal, trust report)

* Can be an SVG illustration or a styled component with connecting lines and icons

**5.6 How It Works (steps)**

* Five numbered steps in a vertical or horizontal stepper:

  * Step 1: Pick your frameworks — choose SOC 2, ISO 27001, HIPAA, GDPR, FedRAMP-lite, or a custom framework

  * Step 2: Connect your stack — securely connect cloud accounts, IdPs, repos, CI/CD, endpoints, and security tools

  * Step 3: Agents collect evidence & screenshots — collectors and browser agents continuously pull configs, logs, and screenshots

  * Step 4: Gaps and violations flagged with fixes — missing evidence, misconfigurations, and drift highlighted in real time with remediation steps

  * Step 5: Share trust report & collaborate with auditors — publish live trust reports and give auditors a dedicated portal

* Each step gets a small icon or illustration

**5.7 Platform Highlights**

* 3–4 feature cards highlighting key differentiators:

  * Automated evidence collection (APIs \+ infrastructure scanning)

  * AI-powered screenshot capture and classification

  * Policy-as-code with OPA integration

  * Dedicated auditor portal

* Each card: icon, bold title, short description, optional "Learn more" link to /platform

**5.8 Social Proof / Testimonials**

* 2–3 testimonial cards with quote, name, title, company, and avatar

* Even if placeholder for now, structure the component to accept real data

**5.9 Final CTA Band**

* Full-width section with contrasting background

* Headline: "Ready to get SOC 2 ready in weeks?" or similar

* Two CTAs: "Book Demo" and "Start Free Gap Assessment"

**5.10 Footer (shared across all marketing pages)**

* 4 column layout: Product (Platform, Frameworks, Pricing, Trust), Company (About, Careers, Blog, Contact), Resources (Guides, Webinars, FAQs, Status), Legal (Privacy, Terms, Cookie Policy)

* Logo and tagline at top of footer

* Social links (LinkedIn, Twitter/X, GitHub) at bottom

* Copyright line

**6\. Platform Page**

Purpose: Explain the product in more technical depth. This is where we show the technical moat.

* Route: /platform

* CTA: "See Platform" / "Book Demo"

**Sections**

* Platform overview — high-level explanation of what the platform does

* Architecture diagram — visual showing data flow from customer infra through the platform to outputs

* Evidence automation — explain API connectors, cloud agent, and how evidence is collected automatically

* Screenshot automation — explain the headless browser agent (Playwright \+ AI vision), this is the moat

* Compliance as code — explain OPA/Rego policy engine, CI/CD integration, PR checks

* Asset & software inventory — visibility into developer tools, browser extensions, endpoint software

* Auditor portal — explain the dedicated read-only portal with evidence timelines and export

* Integration grid — logos of supported integrations (AWS, GitHub, Okta, Google Workspace, Jira, etc)

**7\. Solutions Page**

Purpose: Speak to each buyer segment with tailored messaging.

* Route: /solutions (overview) and /solutions/\[segment\] (detail pages)

* Four segments:

  * /solutions/startups — first SOC 2, unlock enterprise deals, speed and simplicity

  * /solutions/growing-saas — maintain multi-framework compliance as infra scales

  * /solutions/devsecops — compliance as part of SDLC, CI/CD gates, policy-as-code

  * /solutions/auditors — structured evidence, sampling tools, dedicated portal, faster audits

* Each segment page: hero with segment-specific headline, 3–4 value props, relevant testimonial, CTA

**8\. Frameworks Page**

Purpose: Show coverage across compliance standards. Helps with SEO and buyer education.

* Route: /frameworks (overview grid) and /frameworks/\[slug\] (detail pages)

* Overview: grid of framework cards (SOC 2, ISO 27001, HIPAA, GDPR, FedRAMP-lite) each with an icon, name, short description, and link to detail page

* Each detail page (/frameworks/soc-2 etc): what the framework is, who needs it, what controls it covers, how our platform automates it, CTA to book demo

* Slug-based routing, not ID-based

**9\. Customers Page**

Purpose: Build trust with proof.

* Route: /customers

* Sections: logo wall, testimonial cards (quote \+ name \+ title \+ company), case study summaries with measurable outcomes, CTA to book demo

* Even early on, populate with design partner stories and placeholder data

**10\. Resources Page (Blog)**

Purpose: Educate and capture organic traffic for SEO.

* Route: /resources (hub), /resources/blog (listing), /resources/blog/\[slug\] (posts)

* Blog posts written in MDX, stored in /content/blog/ directory

* Each post has frontmatter: title, description, date, author, tags, slug, cover image

* Blog listing page: filterable by tag, paginated, shows title, excerpt, date, author, read time

* Individual post: rendered MDX with table of contents sidebar, author card, related posts at bottom

* Resource hub can also link to guides, webinars, and playbooks (placeholder sections for now)

**11\. Pricing Page**

Purpose: Make packaging easy to understand.

* Route: /pricing

* Plan comparison table with 2–3 tiers (Starter, Growth, Enterprise)

* Highlight the "first SOC 2 readiness free" offer prominently for startups

* Feature checklist per plan

* FAQ section below the pricing table (use shadcn/ui Accordion component)

* CTAs: "Start Free Readiness" for starter, "Contact Sales" for enterprise

**12\. Trust / Security Page**

Purpose: Show we take security seriously. Expected for a compliance company.

* Route: /trust

* Sections: security controls overview, encryption practices (at rest \+ in transit), access controls, sub-processor list, incident response process, our own compliance certifications

* Keep it factual and concise. Use icons and short descriptions.

* CTA: "View Security Practices" / "Contact Security"

**13\. Company Page**

Purpose: Build credibility around the team and mission.

* Route: /company

* Sections: about / mission statement, team photos \+ bios (founders initially), careers link (can be placeholder), press mentions (when available)

* Emphasize security pedigree and developer-first DNA in the narrative

**14\. Dashboard App Shell**

The authenticated product interface. Use the dashboard portion of the shadcn-dashboard-landing-template as the base. Protected behind auth middleware.

**Layout**

* Collapsible left sidebar with navigation

* Top header bar with search, notifications, user avatar/dropdown

* Main content area

**Sidebar Navigation (in order)**

* Overview (dashboard home) — compliance score, framework progress cards, recent activity

* Frameworks — list of active frameworks with completion percentages

* Controls — data table of all controls with pass/fail/needs-review status, filterable by framework and status

* Evidence — evidence list with source, timestamp, linked control, hash

* Policies — policy documents with status (draft, approved, needs review)

* Integrations — connected services grid with connect/disconnect, last sync time, status

* Settings — account, team members, billing, notification preferences

**Dashboard Overview Page**

* Compliance readiness score (large percentage display)

* Framework progress cards (SOC 2: 44/60 controls passing, etc)

* Recent scan activity feed

* Controls needing attention (top 5 failing controls with remediation links)

* Integration health status (connected count, last sync)

**Data Table Pattern**

* Use TanStack Table (via shadcn/ui data-table) for controls and evidence pages

* Features: server-side search, column filters, sorting, pagination

* Row click opens detail panel or navigates to detail page

**Auth Middleware**

// src/middleware.ts

import { clerkMiddleware } from '@clerk/nextjs/server'

export default clerkMiddleware()

export const config \= {

  matcher: \['/dashboard(.\*)'\]

}

**15\. SEO Requirements**

Every page must be optimized for search. These are non-negotiable technical requirements.

**15.1 Meta Tags (every page)**

* Unique \<title\> tag per page (50–60 characters, include primary keyword)

* Unique \<meta name="description"\> per page (150–160 characters, compelling and keyword-rich)

* Canonical URL: \<link rel="canonical" href="..."\>

* Open Graph tags: og:title, og:description, og:image, og:url, og:type

* Twitter tags: twitter:card, twitter:title, twitter:description, twitter:image

* Use the Next.js metadata API (export const metadata or generateMetadata function) in each page.tsx

**15.2 Structured Data / Schema**

* Organization schema on the home page (schema.org/Organization)

* WebSite schema with SearchAction on home page

* BlogPosting schema on each blog post

* FAQPage schema on pricing page FAQ section

* BreadcrumbList schema on all nested pages

* Validate at https://validator.schema.org/

* Inject via JSON-LD script tags in the \<head\>

**15.3 Technical SEO**

* Generate robots.txt at /public/robots.txt:

User-agent: \*

Allow: /

Disallow: /dashboard/

Sitemap: https://yourdomain.com/sitemap.xml

* Auto-generate sitemap.xml using next-sitemap package (run at build time)

* Include all public marketing pages and blog posts in sitemap

* Exclude /dashboard/\* routes from sitemap

* Submit sitemap to Google Search Console after launch

**15.4 URLs & Routing**

* All URLs must be slug-based, not ID-based (/resources/blog/soc-2-guide not /resources/blog/123)

* Lowercase URLs only, hyphens for word separation

* No trailing slashes (configure in next.config.js: trailingSlash: false)

* 301 redirect any old/changed URLs

**15.5 Content Rules**

* Every page must have exactly one \<h1\> tag

* Use proper heading hierarchy: h1 \> h2 \> h3 (no skipping levels)

* Blog posts must have a minimum 400-word description/body

* At least 2 \<h2\> tags per content page for Google crawl structure

* Internal links between related pages (blog posts link to framework pages, framework pages link to platform page, etc)

* All links must be valid, no broken links (check at build time)

**15.6 Images**

* All images in .webp format

* Maximum 200KB per image

* Every \<img\> must have a descriptive alt attribute (not empty, not generic)

* Use Next.js \<Image\> component for automatic optimization, lazy loading, and responsive sizing

* Serve images from /public/images/ or use Vercel image optimization

**15.7 Performance for SEO**

* Target Core Web Vitals: LCP \< 2.5s, FID \< 100ms, CLS \< 0.1

* Chunk JS and CSS properly (Next.js does this automatically with App Router)

* Defer non-critical CSS and JS (Next.js handles this via dynamic imports)

* Enable GZIP/Brotli compression (Vercel handles this automatically)

* Preload critical fonts

**16\. Performance Requirements**

* Lighthouse score: 90+ on Performance, Accessibility, Best Practices, SEO (all four)

* First Contentful Paint: under 1.5s

* Total page weight: under 500KB for marketing pages (before images)

* Use next/dynamic for heavy components (charts, code blocks) to avoid loading them on pages that do not need them

* Prefetch critical routes with \<Link prefetch\>

* No layout shift: set explicit width/height on all images and media

**17\. Deployment & Vercel Config**

**next.config.js**

* trailingSlash: false

* images.formats: \['image/webp'\]

* Enable experimental.optimizePackageImports for large dependencies

**Vercel Settings**

* Framework preset: Next.js

* Build command: next build

* Output directory: .next

* Node.js version: 20.x

* Enable Vercel Analytics

* Enable Vercel Speed Insights

* Environment variables: NEXT\_PUBLIC\_CLERK\_PUBLISHABLE\_KEY, CLERK\_SECRET\_KEY, NEXT\_PUBLIC\_SITE\_URL

**Preview Deployments**

* Every PR gets a preview deployment URL automatically

* Use Vercel comments for feedback on preview deployments

**18\. Component Library**

Use shadcn/ui as the base. Add these components from the library during setup:

**Marketing Components (build custom)**

* HeroSection — headline, subpoints, CTAs, hero image

* LogoBar — scrolling customer logos

* ProblemCard — icon \+ title \+ description

* SolutionDiagram — visual flow illustration

* StepperSection — numbered steps with icons

* FeatureCard — icon \+ title \+ description \+ link

* TestimonialCard — quote \+ avatar \+ name \+ title \+ company

* CTABand — full-width CTA section with contrasting background

* FrameworkCard — framework icon \+ name \+ description \+ link

* PricingTable — plan cards with feature checklists

* TeamMemberCard — photo \+ name \+ role \+ bio

**shadcn/ui Components to Install**

* Button, Card, Badge, Accordion, Dialog, DropdownMenu, NavigationMenu, Sheet (mobile menu), Tabs, Tooltip, Input, Textarea, Select, Separator, Avatar, Table, Command (search palette)

**Dashboard Components (from template \+ custom)**

* ComplianceScoreCard — large circular or bar progress indicator

* FrameworkProgressCard — framework name \+ pass/fail fraction \+ progress bar

* ControlsDataTable — TanStack Table with filters for framework, status, search

* EvidenceList — evidence items with source icon, timestamp, hash, linked control

* IntegrationGrid — service cards with logo, status badge, connect/disconnect

* ActivityFeed — recent scan events with timestamps

* RemediationPanel — step-by-step fix instructions with copy-to-clipboard for commands

End of PRD. This document should give Cursor AI everything it needs to scaffold and build the full website. Start with the project structure and marketing layout, then build pages one at a time starting with the Home page.