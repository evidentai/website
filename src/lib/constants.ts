import {
  Shield,
  FileSearch,
  Camera,
  Code2,
  Users,
  BarChart3,
  Lock,
  Globe,
  Laptop,
  GitBranch,
  Building,
  Eye,
  Rocket,
  type LucideIcon,
} from "lucide-react";

export const siteConfig = {
  name: "evidentflow.ai",
  description:
    "Continuous compliance & evidence automation for high-growth startups. Cut audit prep from months to weeks.",
  url: "https://yourdomain.com",
  ogImage: "/og-image.png",
};

export const navLinks = [
  { label: "Platform", href: "/platform" },
  {
    label: "Solutions",
    href: "/solutions",
    children: [
      {
        label: "For Startups",
        href: "/solutions/startups",
        description: "Get your first SOC 2 and unlock enterprise deals",
      },
      {
        label: "For Growing SaaS",
        href: "/solutions/growing-saas",
        description: "Multi-framework compliance as your infra scales",
      },
      {
        label: "For DevSecOps",
        href: "/solutions/devsecops",
        description: "Compliance as part of your CI/CD pipeline",
      },
      {
        label: "For Auditors",
        href: "/solutions/auditors",
        description: "Structured evidence and dedicated portal",
      },
    ],
  },
  {
    label: "Frameworks",
    href: "/frameworks",
    children: [
      {
        label: "SOC 2",
        href: "/frameworks/soc-2",
        description: "Trust services criteria automation",
      },
      {
        label: "ISO 27001",
        href: "/frameworks/iso-27001",
        description: "Information security management",
      },
      {
        label: "HIPAA",
        href: "/frameworks/hipaa",
        description: "Healthcare data protection",
      },
      {
        label: "GDPR",
        href: "/frameworks/gdpr",
        description: "EU data privacy compliance",
      },
      {
        label: "FedRAMP",
        href: "/frameworks/fedramp",
        description: "Federal risk authorization",
      },
      {
        label: "CMMC",
        href: "/frameworks/cmmc",
        description: "Cybersecurity maturity for defense contractors",
      },
    ],
  },
  { label: "Customers", href: "/customers" },
  { label: "Resources", href: "/resources" },
  { label: "Pricing", href: "/pricing" },
];

export const footerLinks = {
  product: [
    { label: "Platform", href: "/platform" },
    { label: "Frameworks", href: "/frameworks" },
    { label: "Pricing", href: "/pricing" },
    { label: "Trust", href: "/trust" },
  ],
  company: [
    { label: "About", href: "/company" },
    { label: "Careers", href: "/company#careers" },
    { label: "Blog", href: "/resources/blog" },
    { label: "Contact", href: "/company#contact" },
  ],
  resources: [
    { label: "Guides", href: "/resources" },
    { label: "Webinars", href: "/resources#webinars" },
    { label: "FAQs", href: "/pricing#faq" },
    { label: "Status", href: "#" },
  ],
  legal: [
    { label: "Privacy", href: "#" },
    { label: "Terms", href: "#" },
    { label: "Cookie Policy", href: "#" },
  ],
};

export interface Framework {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  longDescription: string;
  whoNeeds: string;
  controlCount: number;
  icon: LucideIcon;
  image: string;
  controls: string[];
  automationFeatures: string[];
}

export const frameworks: Framework[] = [
  {
    slug: "soc-2",
    name: "SOC 2 Type II",
    shortName: "SOC 2",
    description:
      "Demonstrate trust with the gold standard for SaaS security audits.",
    longDescription:
      "SOC 2 is a widely recognized auditing standard that evaluates an organization's information systems relevant to security, availability, processing integrity, confidentiality, and privacy. A SOC 2 Type II report covers a period of time (typically 6-12 months) and provides assurance that controls are operating effectively.",
    whoNeeds:
      "Any SaaS company selling to mid-market or enterprise buyers. SOC 2 is often a prerequisite in vendor security questionnaires and procurement processes.",
    controlCount: 60,
    icon: Shield,
    image: "/images/frameworks/soc2.png",
    controls: [
      "Access Control",
      "Change Management",
      "Risk Assessment",
      "Incident Response",
      "Logical & Physical Access",
      "System Operations",
      "Data Classification",
      "Vendor Management",
    ],
    automationFeatures: [
      "Automated evidence collection from AWS, GCP, Azure",
      "Continuous monitoring of access controls and configurations",
      "Automated policy document generation and tracking",
      "Real-time control status with gap identification",
      "Auditor portal with structured evidence timelines",
    ],
  },
  {
    slug: "iso-27001",
    name: "ISO 27001:2022",
    shortName: "ISO 27001",
    description:
      "The international standard for information security management systems.",
    longDescription:
      "ISO 27001 is an international standard for establishing, implementing, maintaining, and continually improving an information security management system (ISMS). The 2022 revision includes 93 controls across 4 domains: organizational, people, physical, and technological.",
    whoNeeds:
      "Companies operating globally or selling to European enterprises. ISO 27001 certification signals mature security practices to international partners and customers.",
    controlCount: 93,
    icon: Globe,
    image: "/images/frameworks/iso27001.png",
    controls: [
      "Information Security Policies",
      "Asset Management",
      "Access Control",
      "Cryptography",
      "Physical Security",
      "Operations Security",
      "Communications Security",
      "Supplier Relationships",
    ],
    automationFeatures: [
      "ISMS document generation and lifecycle management",
      "Automated risk assessment and treatment tracking",
      "Continuous Annex A control monitoring",
      "Statement of Applicability auto-generation",
      "Internal audit evidence aggregation",
    ],
  },
  {
    slug: "hipaa",
    name: "HIPAA",
    shortName: "HIPAA",
    description: "Protect patient health information and meet healthcare regulations.",
    longDescription:
      "The Health Insurance Portability and Accountability Act (HIPAA) sets the standard for protecting sensitive patient data. Any company that deals with protected health information (PHI) must ensure that all required physical, network, and process security measures are in place and followed.",
    whoNeeds:
      "Healthcare technology companies, digital health startups, telehealth platforms, and any organization that creates, receives, maintains, or transmits PHI.",
    controlCount: 54,
    icon: Lock,
    image: "/images/frameworks/hipaa.png",
    controls: [
      "Administrative Safeguards",
      "Physical Safeguards",
      "Technical Safeguards",
      "Breach Notification",
      "Privacy Rule",
      "Security Rule",
      "Business Associate Agreements",
      "Risk Analysis",
    ],
    automationFeatures: [
      "PHI access logging and monitoring",
      "Encryption verification for data at rest and in transit",
      "Business Associate Agreement tracking",
      "Automated risk analysis and remediation",
      "Breach notification workflow automation",
    ],
  },
  {
    slug: "gdpr",
    name: "GDPR",
    shortName: "GDPR",
    description: "EU data privacy compliance for processing personal data.",
    longDescription:
      "The General Data Protection Regulation (GDPR) is the EU's comprehensive data protection law. It gives individuals control over their personal data and imposes obligations on organizations that collect or process personal data of EU residents, regardless of the organization's location.",
    whoNeeds:
      "Any company processing personal data of EU residents, including SaaS companies with EU customers, e-commerce platforms, and data processors.",
    controlCount: 45,
    icon: Eye,
    image: "/images/frameworks/gdpr.png",
    controls: [
      "Lawful Basis for Processing",
      "Data Subject Rights",
      "Data Protection Impact Assessments",
      "Data Breach Notification",
      "Data Processing Records",
      "International Data Transfers",
      "Data Protection Officer",
      "Privacy by Design",
    ],
    automationFeatures: [
      "Data processing activity mapping and Records of Processing",
      "Data Subject Access Request (DSAR) workflow automation",
      "Consent management and tracking",
      "DPIA template generation and tracking",
      "Sub-processor change monitoring and notifications",
    ],
  },
  {
    slug: "fedramp",
    name: "FedRAMP",
    shortName: "FedRAMP",
    description: "Federal risk and authorization management for government cloud.",
    longDescription:
      "The Federal Risk and Authorization Management Program (FedRAMP) provides a standardized approach to security assessment, authorization, and continuous monitoring for cloud products and services used by U.S. federal agencies.",
    whoNeeds:
      "Cloud service providers looking to sell to U.S. federal agencies. FedRAMP authorization is required for any cloud service used by a government agency.",
    controlCount: 325,
    icon: Building,
    image: "/images/frameworks/fedramp.png",
    controls: [
      "Access Control",
      "Audit & Accountability",
      "Security Assessment",
      "Configuration Management",
      "Contingency Planning",
      "Identification & Authentication",
      "System & Information Integrity",
      "System & Communications Protection",
    ],
    automationFeatures: [
      "NIST 800-53 control mapping and monitoring",
      "Continuous monitoring dashboard for ConMon requirements",
      "Plan of Action & Milestones (POA&M) tracking",
      "System Security Plan (SSP) generation",
      "Monthly vulnerability scan automation",
    ],
  },
  {
    slug: "cmmc",
    name: "CMMC 2.0",
    shortName: "CMMC",
    description:
      "Cybersecurity maturity model certification for defense industrial base contractors.",
    longDescription:
      "The Cybersecurity Maturity Model Certification (CMMC) 2.0 is a framework developed by the U.S. Department of Defense to protect Controlled Unclassified Information (CUI) and Federal Contract Information (FCI) within the defense industrial base. CMMC 2.0 streamlines the original model into three levels aligned with NIST SP 800-171 and NIST SP 800-172 standards.",
    whoNeeds:
      "Defense contractors, subcontractors, and any organization in the defense industrial base (DIB) that handles CUI or FCI. CMMC certification is required to bid on DoD contracts.",
    controlCount: 110,
    icon: Shield,
    image: "/images/frameworks/cmmc.png",
    controls: [
      "Access Control",
      "Audit & Accountability",
      "Awareness & Training",
      "Configuration Management",
      "Identification & Authentication",
      "Incident Response",
      "Media Protection",
      "System & Communications Protection",
    ],
    automationFeatures: [
      "NIST SP 800-171 control mapping and continuous monitoring",
      "CUI flow tracking and boundary enforcement",
      "Automated System Security Plan (SSP) and POA&M generation",
      "Maturity level assessment with gap analysis",
      "Evidence collection aligned to CMMC assessment requirements",
    ],
  },
];

export interface Solution {
  segment: string;
  title: string;
  headline: string;
  description: string;
  icon: LucideIcon;
  valueProps: {
    title: string;
    description: string;
    icon: LucideIcon;
  }[];
  testimonial: {
    quote: string;
    name: string;
    title: string;
    company: string;
  };
}

export const solutions: Solution[] = [
  {
    segment: "startups",
    title: "For Startups",
    headline: "Get SOC 2 ready in weeks, not months",
    description:
      "Your first enterprise deal is waiting. Stop losing revenue to security questionnaires you can't answer. We automate the entire SOC 2 journey so you can close deals faster.",
    icon: Rocket,
    valueProps: [
      {
        title: "Close Enterprise Deals Faster",
        description:
          "Respond to security questionnaires with real evidence instead of promises. Show prospects a live trust report during the sales cycle.",
        icon: BarChart3,
      },
      {
        title: "Set Up in Hours, Not Months",
        description:
          "Connect your cloud infrastructure and get an instant gap assessment. Our agents start collecting evidence immediately.",
        icon: GitBranch,
      },
      {
        title: "First SOC 2 Readiness Free",
        description:
          "Start with our free gap assessment. See exactly what you need to fix before engaging an auditor — no commitment required.",
        icon: Shield,
      },
      {
        title: "Built for Developer Teams",
        description:
          "No spreadsheets, no consultants. Everything lives in a dashboard your engineering team will actually use.",
        icon: Code2,
      },
    ],
    testimonial: {
      quote:
        "We went from zero compliance posture to SOC 2 Type II in 8 weeks. Our biggest customer signed the week after we shared the trust report.",
      name: "Sarah Chen",
      title: "CTO",
      company: "DataStack (Series A)",
    },
  },
  {
    segment: "growing-saas",
    title: "For Growing SaaS",
    headline: "Scale compliance alongside your infrastructure",
    description:
      "You outgrew spreadsheet-based compliance. As your infrastructure scales across clouds and frameworks, keep every control monitored continuously — not just at audit time.",
    icon: BarChart3,
    valueProps: [
      {
        title: "Multi-Framework Coverage",
        description:
          "Map controls across SOC 2, ISO 27001, HIPAA, and GDPR simultaneously. Shared controls reduce duplicate work by up to 40%.",
        icon: Globe,
      },
      {
        title: "Continuous Monitoring",
        description:
          "Detect configuration drift, access anomalies, and policy violations in real time — not during annual audits.",
        icon: Eye,
      },
      {
        title: "Infrastructure-Scale Evidence",
        description:
          "Automated collectors handle hundreds of cloud resources, repos, and endpoints without manual intervention.",
        icon: FileSearch,
      },
      {
        title: "Team Collaboration",
        description:
          "Assign control ownership across engineering, security, and compliance teams. Track remediation with built-in workflows.",
        icon: Users,
      },
    ],
    testimonial: {
      quote:
        "Managing SOC 2 and ISO 27001 simultaneously used to require a dedicated team. Now it's a dashboard our security engineer checks weekly.",
      name: "Marcus Webb",
      title: "VP of Engineering",
      company: "CloudScale (Series B)",
    },
  },
  {
    segment: "devsecops",
    title: "For DevSecOps",
    headline: "Shift compliance left into your pipeline",
    description:
      "Compliance shouldn't be an afterthought bolted on at audit time. Embed security controls directly into your CI/CD pipeline with policy-as-code and automated checks.",
    icon: Code2,
    valueProps: [
      {
        title: "Policy-as-Code with OPA",
        description:
          "Define compliance policies in Rego. Enforce them in CI/CD pipelines. Fail builds that violate security requirements before they reach production.",
        icon: Code2,
      },
      {
        title: "PR-Level Compliance Checks",
        description:
          "Every pull request gets a compliance status check. Developers see exactly what policies apply and whether their changes comply.",
        icon: GitBranch,
      },
      {
        title: "Infrastructure Drift Detection",
        description:
          "Detect when Terraform state, Kubernetes configs, or cloud settings drift from compliant baselines. Get alerts and auto-remediation steps.",
        icon: Shield,
      },
      {
        title: "Developer-Friendly Integration",
        description:
          "CLI tools, GitHub Actions, and API endpoints. Fits into existing workflows without adding friction to the development process.",
        icon: Laptop,
      },
    ],
    testimonial: {
      quote:
        "Finally, compliance that speaks our language. The OPA policies catch misconfigurations in CI before they ever hit production.",
      name: "Alex Rivera",
      title: "Staff Security Engineer",
      company: "InfraOps",
    },
  },
  {
    segment: "auditors",
    title: "For Auditors",
    headline: "Structured evidence, faster audits",
    description:
      "Stop chasing clients for evidence over email. Access a dedicated portal with time-stamped, hash-verified evidence organized by control. Complete audits in half the time.",
    icon: FileSearch,
    valueProps: [
      {
        title: "Dedicated Auditor Portal",
        description:
          "Read-only access to all evidence, organized by framework and control. No more Dropbox links and email attachments.",
        icon: Eye,
      },
      {
        title: "Hash-Verified Evidence",
        description:
          "Every piece of evidence is SHA-256 hashed with timestamps. Verify integrity without questioning authenticity.",
        icon: Lock,
      },
      {
        title: "Evidence Timelines",
        description:
          "See the full history of evidence collection for each control. Understand not just the current state, but how it evolved.",
        icon: BarChart3,
      },
      {
        title: "Export & Reporting",
        description:
          "Export evidence packs, generate readiness reports, and create sampling plans directly from the platform.",
        icon: FileSearch,
      },
    ],
    testimonial: {
      quote:
        "The structured evidence format cut our SOC 2 audit engagement from 6 weeks to 3. The hash verification eliminated evidence authenticity concerns entirely.",
      name: "Jennifer Okafor",
      title: "Partner",
      company: "Shield & Associates CPAs",
    },
  },
];

export const testimonials = [
  {
    quote:
      "We closed our first enterprise deal within 2 weeks of sharing our trust report. The platform paid for itself on day one.",
    name: "Sarah Chen",
    title: "CTO",
    company: "DataStack",
    avatar: "/images/avatars/avatar-1.webp",
  },
  {
    quote:
      "Our audit prep went from 3 months of scrambling to 2 weeks of reviewing dashboards. The evidence automation is a game-changer.",
    name: "Marcus Webb",
    title: "VP of Engineering",
    company: "CloudScale",
    avatar: "/images/avatars/avatar-2.webp",
  },
  {
    quote:
      "The screenshot automation alone saves us 40 hours per audit cycle. No more manual evidence collection across dozens of tools.",
    name: "Priya Sharma",
    title: "Head of Security",
    company: "NexaPay",
    avatar: "/images/avatars/avatar-3.webp",
  },
];

export const integrations = [
  "AWS",
  "Google Cloud",
  "Azure",
  "GitHub",
  "GitLab",
  "Okta",
  "Google Workspace",
  "Jira",
  "Slack",
  "Datadog",
  "PagerDuty",
  "Cloudflare",
  "MongoDB",
  "Vercel",
  "Docker",
  "Kubernetes",
];

export const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    period: "",
    description: "Get your first SOC 2 gap assessment — no credit card required.",
    highlight: true,
    highlightText: "First SOC 2 readiness free",
    cta: "Start Free Readiness",
    features: [
      "1 framework (SOC 2)",
      "Automated gap assessment",
      "Up to 5 integrations",
      "Basic evidence collection",
      "Trust report preview",
      "Email support",
    ],
    notIncluded: [
      "Continuous monitoring",
      "Auditor portal",
      "Policy-as-code",
      "Custom frameworks",
    ],
  },
  {
    name: "Growth",
    price: "$499",
    period: "/month",
    description: "For teams actively pursuing or maintaining certifications.",
    highlight: false,
    highlightText: "",
    cta: "Start Free Trial",
    features: [
      "Up to 3 frameworks",
      "Continuous evidence collection",
      "Unlimited integrations",
      "Screenshot automation",
      "Auditor portal",
      "Policy document management",
      "Remediation guidance",
      "Slack & email notifications",
      "Priority support",
    ],
    notIncluded: ["Custom frameworks", "Dedicated CSM"],
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    description: "For organizations with complex compliance needs at scale.",
    highlight: false,
    highlightText: "",
    cta: "Contact Sales",
    features: [
      "Unlimited frameworks",
      "Custom framework builder",
      "Policy-as-code (OPA/Rego)",
      "CI/CD compliance gates",
      "SSO & SCIM provisioning",
      "Dedicated auditor portals",
      "Asset & software inventory",
      "API access",
      "Dedicated CSM",
      "SLA guarantee",
      "On-premise deployment option",
    ],
    notIncluded: [],
  },
];

export const pricingFAQs = [
  {
    question: "What's included in the free SOC 2 readiness assessment?",
    answer:
      "The free assessment connects to your cloud infrastructure, scans your current security posture, and generates a detailed gap report showing exactly what you need to fix before engaging an auditor. No credit card required, no time limit.",
  },
  {
    question: "Can I switch plans at any time?",
    answer:
      "Yes, you can upgrade or downgrade at any time. When upgrading, you'll get immediate access to additional features. When downgrading, the change takes effect at the next billing cycle.",
  },
  {
    question: "Do you replace our auditor?",
    answer:
      "No. We complement your auditor by automating evidence collection and providing a structured portal for their review. You still need a licensed CPA firm for SOC 2 attestation. We can recommend audit partners if needed.",
  },
  {
    question: "How long does it take to get SOC 2 ready?",
    answer:
      "Most startups using our platform achieve audit readiness in 4-8 weeks, compared to the industry average of 3-6 months. The exact timeline depends on your current security posture and the gaps identified in your assessment.",
  },
  {
    question: "Is my data secure on your platform?",
    answer:
      "Absolutely. We're SOC 2 Type II certified ourselves. All data is encrypted at rest (AES-256) and in transit (TLS 1.3). We use zero-trust architecture and conduct regular penetration testing. Visit our Trust page for full details.",
  },
  {
    question: "What integrations do you support?",
    answer:
      "We support 50+ integrations including AWS, GCP, Azure, GitHub, GitLab, Okta, Google Workspace, Jira, Slack, Datadog, and more. New integrations are added monthly based on customer requests.",
  },
];
