export interface ComplianceNode {
  id: string;
  label: string;
  type: "framework" | "criteria" | "control" | "evidence";
  group?: string;
  children?: string[];
  metadata?: {
    coverage?: number;
    status?: "met" | "partial" | "gap";
    description?: string;
    controlFamily?: string;
    sharedFrameworks?: string[];
  };
}

export interface ComplianceLink {
  source: string;
  target: string;
  value: number;
}

export interface ComplianceMapData {
  nodes: ComplianceNode[];
  links: ComplianceLink[];
}

export interface SankeyFilters {
  activeFrameworks: string[];
  showEvidence: boolean;
  detailLevel: "overview" | "expanded";
  expandedGroups: string[];
  searchQuery: string;
}

// ---------------------------------------------------------------------------
// Mock dataset — realistic compliance mappings
// ---------------------------------------------------------------------------

const nodes: ComplianceNode[] = [
  // ── Frameworks ──────────────────────────────────────────────────────────
  { id: "soc2", label: "SOC 2", type: "framework", metadata: { coverage: 87, status: "partial" } },
  { id: "hipaa", label: "HIPAA", type: "framework", metadata: { coverage: 72, status: "partial" } },
  { id: "iso27001", label: "ISO 27001", type: "framework", metadata: { coverage: 64, status: "partial" } },
  { id: "gdpr", label: "GDPR", type: "framework", metadata: { coverage: 58, status: "partial" } },
  { id: "fedramp", label: "FedRAMP", type: "framework", metadata: { coverage: 76, status: "partial" } },
  { id: "cmmc", label: "CMMC 2.0", type: "framework", metadata: { coverage: 68, status: "partial" } },

  // ── SOC 2 Criteria ──────────────────────────────────────────────────────
  { id: "cc1.1", label: "CC1.1", type: "criteria", group: "soc2", metadata: { description: "Control Environment", status: "met", coverage: 100 } },
  { id: "cc2.1", label: "CC2.1", type: "criteria", group: "soc2", metadata: { description: "Communication & Information", status: "met", coverage: 95 } },
  { id: "cc6.1", label: "CC6.1", type: "criteria", group: "soc2", metadata: { description: "Logical & Physical Access", status: "met", coverage: 90 } },
  { id: "cc7.1", label: "CC7.1", type: "criteria", group: "soc2", metadata: { description: "System Operations", status: "partial", coverage: 75 } },
  { id: "cc7.2", label: "CC7.2", type: "criteria", group: "soc2", metadata: { description: "Change Management", status: "met", coverage: 88 } },

  // ── HIPAA Criteria ──────────────────────────────────────────────────────
  { id: "hipaa-312a", label: "§164.312(a)", type: "criteria", group: "hipaa", metadata: { description: "Access Control", status: "met", coverage: 85 } },
  { id: "hipaa-312d", label: "§164.312(d)", type: "criteria", group: "hipaa", metadata: { description: "Person or Entity Authentication", status: "partial", coverage: 70 } },
  { id: "hipaa-308a", label: "§164.308(a)", type: "criteria", group: "hipaa", metadata: { description: "Administrative Safeguards", status: "gap", coverage: 45 } },

  // ── ISO 27001 Criteria ──────────────────────────────────────────────────
  { id: "iso-a9.1", label: "A.9.1", type: "criteria", group: "iso27001", metadata: { description: "Access Control Policy", status: "met", coverage: 82 } },
  { id: "iso-a12.4", label: "A.12.4", type: "criteria", group: "iso27001", metadata: { description: "Logging & Monitoring", status: "partial", coverage: 60 } },
  { id: "iso-a18.1", label: "A.18.1", type: "criteria", group: "iso27001", metadata: { description: "Compliance Requirements", status: "partial", coverage: 55 } },
  { id: "iso-a5.1", label: "A.5.1", type: "criteria", group: "iso27001", metadata: { description: "Information Security Policies", status: "met", coverage: 92 } },

  // ── GDPR Criteria (Articles) ────────────────────────────────────────────
  { id: "gdpr-art5", label: "Art. 5", type: "criteria", group: "gdpr", metadata: { description: "Principles — Integrity & Confidentiality", status: "met", coverage: 78 } },
  { id: "gdpr-art25", label: "Art. 25", type: "criteria", group: "gdpr", metadata: { description: "Data Protection by Design & Default", status: "partial", coverage: 55 } },
  { id: "gdpr-art30", label: "Art. 30", type: "criteria", group: "gdpr", metadata: { description: "Records of Processing Activities", status: "met", coverage: 82 } },
  { id: "gdpr-art32", label: "Art. 32", type: "criteria", group: "gdpr", metadata: { description: "Security of Processing", status: "partial", coverage: 65 } },
  { id: "gdpr-art33", label: "Art. 33", type: "criteria", group: "gdpr", metadata: { description: "Breach Notification (72 hrs)", status: "gap", coverage: 38 } },
  { id: "gdpr-art35", label: "Art. 35", type: "criteria", group: "gdpr", metadata: { description: "Data Protection Impact Assessment", status: "partial", coverage: 50 } },

  // ── FedRAMP Criteria (Control Baselines) ────────────────────────────────
  { id: "fed-ac", label: "AC Family", type: "criteria", group: "fedramp", metadata: { description: "Access Control (25 controls)", status: "met", coverage: 88 } },
  { id: "fed-au", label: "AU Family", type: "criteria", group: "fedramp", metadata: { description: "Audit & Accountability (16 controls)", status: "met", coverage: 82 } },
  { id: "fed-sc", label: "SC Family", type: "criteria", group: "fedramp", metadata: { description: "System & Communications Protection (44 controls)", status: "partial", coverage: 70 } },
  { id: "fed-ir", label: "IR Family", type: "criteria", group: "fedramp", metadata: { description: "Incident Response (10 controls)", status: "partial", coverage: 62 } },
  { id: "fed-ra", label: "RA Family", type: "criteria", group: "fedramp", metadata: { description: "Risk Assessment (7 controls)", status: "met", coverage: 85 } },
  { id: "fed-ca", label: "CA Family", type: "criteria", group: "fedramp", metadata: { description: "Security Assessment & Authorization", status: "met", coverage: 90 } },
  { id: "fed-cm", label: "CM Family", type: "criteria", group: "fedramp", metadata: { description: "Configuration Management (12 controls)", status: "partial", coverage: 72 } },

  // ── CMMC 2.0 Criteria (Domains) ────────────────────────────────────────
  { id: "cmmc-ac", label: "AC Domain", type: "criteria", group: "cmmc", metadata: { description: "Access Control (22 practices)", status: "partial", coverage: 75 } },
  { id: "cmmc-ia", label: "IA Domain", type: "criteria", group: "cmmc", metadata: { description: "Identification & Authentication (11 practices)", status: "met", coverage: 82 } },
  { id: "cmmc-au", label: "AU Domain", type: "criteria", group: "cmmc", metadata: { description: "Audit & Accountability (9 practices)", status: "partial", coverage: 68 } },
  { id: "cmmc-cm", label: "CM Domain", type: "criteria", group: "cmmc", metadata: { description: "Configuration Management (9 practices)", status: "met", coverage: 80 } },
  { id: "cmmc-ir", label: "IR Domain", type: "criteria", group: "cmmc", metadata: { description: "Incident Response (3 practices)", status: "gap", coverage: 42 } },
  { id: "cmmc-mp", label: "MP Domain", type: "criteria", group: "cmmc", metadata: { description: "Media Protection (9 practices)", status: "partial", coverage: 60 } },
  { id: "cmmc-sc", label: "SC Domain", type: "criteria", group: "cmmc", metadata: { description: "System & Comms Protection (16 practices)", status: "partial", coverage: 58 } },

  // ── Controls (NIST SP 800-53) ───────────────────────────────────────────
  { id: "ac-02", label: "AC-02", type: "control", group: "AC", metadata: { controlFamily: "Access Control", description: "Account Management", status: "met", coverage: 95, sharedFrameworks: ["soc2", "hipaa", "iso27001", "gdpr", "fedramp", "cmmc"] } },
  { id: "ac-03", label: "AC-03", type: "control", group: "AC", metadata: { controlFamily: "Access Control", description: "Access Enforcement", status: "met", coverage: 90, sharedFrameworks: ["soc2", "hipaa", "fedramp", "cmmc"] } },
  { id: "ac-04", label: "AC-04", type: "control", group: "AC", metadata: { controlFamily: "Access Control", description: "Information Flow Enforcement", status: "partial", coverage: 62, sharedFrameworks: ["fedramp", "cmmc"] } },
  { id: "ac-17", label: "AC-17", type: "control", group: "AC", metadata: { controlFamily: "Access Control", description: "Remote Access", status: "met", coverage: 85, sharedFrameworks: ["fedramp", "cmmc"] } },
  { id: "au-02", label: "AU-02", type: "control", group: "AU", metadata: { controlFamily: "Audit & Accountability", description: "Audit Events", status: "met", coverage: 88, sharedFrameworks: ["gdpr", "fedramp", "cmmc"] } },
  { id: "au-06", label: "AU-06", type: "control", group: "AU", metadata: { controlFamily: "Audit & Accountability", description: "Audit Review & Reporting", status: "partial", coverage: 70, sharedFrameworks: ["soc2", "iso27001", "fedramp", "cmmc"] } },
  { id: "ca-01", label: "CA-01", type: "control", group: "CA", metadata: { controlFamily: "Security Assessment", description: "Policy & Procedures", status: "met", coverage: 100, sharedFrameworks: ["soc2", "fedramp", "cmmc"] } },
  { id: "ca-02", label: "CA-02", type: "control", group: "CA", metadata: { controlFamily: "Security Assessment", description: "Control Assessments", status: "met", coverage: 88, sharedFrameworks: ["fedramp"] } },
  { id: "cm-06", label: "CM-06", type: "control", group: "CM", metadata: { controlFamily: "Configuration Mgmt", description: "Configuration Settings", status: "met", coverage: 85, sharedFrameworks: ["soc2", "iso27001", "gdpr", "fedramp", "cmmc"] } },
  { id: "cm-07", label: "CM-07", type: "control", group: "CM", metadata: { controlFamily: "Configuration Mgmt", description: "Least Functionality", status: "met", coverage: 80, sharedFrameworks: ["fedramp", "cmmc"] } },
  { id: "ia-02", label: "IA-02", type: "control", group: "IA", metadata: { controlFamily: "Identification & Auth", description: "Identification & Authentication", status: "met", coverage: 88, sharedFrameworks: ["soc2", "hipaa", "iso27001", "fedramp", "cmmc"] } },
  { id: "ir-04", label: "IR-04", type: "control", group: "IR", metadata: { controlFamily: "Incident Response", description: "Incident Handling", status: "gap", coverage: 40, sharedFrameworks: ["soc2", "hipaa", "gdpr", "fedramp", "cmmc"] } },
  { id: "ir-06", label: "IR-06", type: "control", group: "IR", metadata: { controlFamily: "Incident Response", description: "Incident Reporting", status: "partial", coverage: 55, sharedFrameworks: ["gdpr", "fedramp"] } },
  { id: "mp-02", label: "MP-02", type: "control", group: "MP", metadata: { controlFamily: "Media Protection", description: "Media Access", status: "partial", coverage: 60, sharedFrameworks: ["cmmc"] } },
  { id: "mp-04", label: "MP-04", type: "control", group: "MP", metadata: { controlFamily: "Media Protection", description: "Media Storage", status: "partial", coverage: 58, sharedFrameworks: ["cmmc"] } },
  { id: "ra-03", label: "RA-03", type: "control", group: "RA", metadata: { controlFamily: "Risk Assessment", description: "Risk Assessment", status: "met", coverage: 82, sharedFrameworks: ["gdpr", "fedramp"] } },
  { id: "ra-05", label: "RA-05", type: "control", group: "RA", metadata: { controlFamily: "Risk Assessment", description: "Vulnerability Monitoring & Scanning", status: "partial", coverage: 68, sharedFrameworks: ["fedramp"] } },
  { id: "sc-08", label: "SC-08", type: "control", group: "SC", metadata: { controlFamily: "System & Comms Protection", description: "Transmission Confidentiality & Integrity", status: "met", coverage: 90, sharedFrameworks: ["gdpr", "fedramp", "cmmc"] } },
  { id: "sc-12", label: "SC-12", type: "control", group: "SC", metadata: { controlFamily: "System & Comms Protection", description: "Cryptographic Key Establishment", status: "met", coverage: 85, sharedFrameworks: ["gdpr", "fedramp"] } },
  { id: "sc-28", label: "SC-28", type: "control", group: "SC", metadata: { controlFamily: "System & Comms Protection", description: "Protection of Information at Rest", status: "partial", coverage: 65, sharedFrameworks: ["hipaa", "iso27001", "gdpr", "fedramp", "cmmc"] } },
  { id: "si-04", label: "SI-04", type: "control", group: "SI", metadata: { controlFamily: "System & Info Integrity", description: "System Monitoring", status: "partial", coverage: 72, sharedFrameworks: ["soc2", "iso27001", "fedramp"] } },
  { id: "at-02", label: "AT-02", type: "control", group: "AT", metadata: { controlFamily: "Awareness & Training", description: "Security Awareness Training", status: "met", coverage: 90, sharedFrameworks: ["hipaa", "cmmc"] } },
  { id: "pt-03", label: "PT-03", type: "control", group: "PT", metadata: { controlFamily: "PII Processing", description: "Personally Identifiable Information Processing Purposes", status: "partial", coverage: 48, sharedFrameworks: ["gdpr"] } },
  { id: "dm-01", label: "DM-01", type: "control", group: "DM", metadata: { controlFamily: "Data Minimization", description: "Minimization of PII", status: "partial", coverage: 45, sharedFrameworks: ["gdpr"] } },

  // ── Evidence Artifacts ──────────────────────────────────────────────────
  { id: "ev-iam-policy", label: "IAM Policy JSON", type: "evidence", metadata: { description: "AWS IAM password policy configuration", status: "met" } },
  { id: "ev-mfa-config", label: "MFA Config Screenshot", type: "evidence", metadata: { description: "Multi-factor authentication settings", status: "met" } },
  { id: "ev-access-review", label: "Access Review Export", type: "evidence", metadata: { description: "Quarterly user access review spreadsheet", status: "met" } },
  { id: "ev-audit-logs", label: "CloudTrail Audit Logs", type: "evidence", metadata: { description: "AWS CloudTrail 90-day log export", status: "met" } },
  { id: "ev-encryption", label: "Encryption Audit Report", type: "evidence", metadata: { description: "At-rest encryption verification report", status: "partial" } },
  { id: "ev-incident-plan", label: "Incident Response Plan", type: "evidence", metadata: { description: "IR playbook document v3.2", status: "gap" } },
  { id: "ev-config-baseline", label: "Config Baseline", type: "evidence", metadata: { description: "CIS benchmark compliance scan results", status: "met" } },
  { id: "ev-monitoring", label: "SIEM Dashboard Export", type: "evidence", metadata: { description: "Datadog / Splunk monitoring dashboard", status: "partial" } },
  { id: "ev-training-records", label: "Training Records", type: "evidence", metadata: { description: "Security awareness training completion", status: "met" } },
  { id: "ev-risk-assessment", label: "Risk Assessment", type: "evidence", metadata: { description: "Annual risk assessment document", status: "met" } },
  { id: "ev-vendor-review", label: "Vendor Security Review", type: "evidence", metadata: { description: "Third-party vendor assessment", status: "partial" } },
  { id: "ev-policy-doc", label: "InfoSec Policy Doc", type: "evidence", metadata: { description: "Information security policy document", status: "met" } },
  { id: "ev-dpia", label: "DPIA Report", type: "evidence", metadata: { description: "Data Protection Impact Assessment report", status: "partial" } },
  { id: "ev-ropa", label: "ROPA Register", type: "evidence", metadata: { description: "Record of Processing Activities register", status: "met" } },
  { id: "ev-breach-runbook", label: "Breach Notification Runbook", type: "evidence", metadata: { description: "72-hour breach notification procedure", status: "gap" } },
  { id: "ev-tls-cert", label: "TLS Certificate Report", type: "evidence", metadata: { description: "TLS/SSL certificate configuration audit", status: "met" } },
  { id: "ev-vuln-scan", label: "Vulnerability Scan Report", type: "evidence", metadata: { description: "Nessus / Qualys vulnerability scan results", status: "partial" } },
  { id: "ev-3pao", label: "3PAO Assessment Package", type: "evidence", metadata: { description: "Third-party assessment organization report", status: "met" } },
  { id: "ev-conmon", label: "ConMon Report", type: "evidence", metadata: { description: "FedRAMP continuous monitoring monthly report", status: "met" } },
  { id: "ev-poam", label: "POA&M Tracker", type: "evidence", metadata: { description: "Plan of Action & Milestones tracker", status: "partial" } },
  { id: "ev-remote-access", label: "Remote Access Config", type: "evidence", metadata: { description: "VPN / ZTNA remote access policy config", status: "met" } },
  { id: "ev-media-sanitize", label: "Media Sanitization Log", type: "evidence", metadata: { description: "NIST SP 800-88 media disposal log", status: "partial" } },
  { id: "ev-data-flow", label: "Data Flow Diagram", type: "evidence", metadata: { description: "CUI / PII data flow mapping document", status: "met" } },
  { id: "ev-privacy-policy", label: "Privacy Policy", type: "evidence", metadata: { description: "GDPR-compliant privacy policy document", status: "met" } },
  { id: "ev-key-mgmt", label: "Key Management Policy", type: "evidence", metadata: { description: "Cryptographic key lifecycle management doc", status: "met" } },
];

const links: ComplianceLink[] = [
  // ── SOC 2 → Criteria ───────────────────────────────────────────────────
  { source: "soc2", target: "cc1.1", value: 5 },
  { source: "soc2", target: "cc2.1", value: 4 },
  { source: "soc2", target: "cc6.1", value: 5 },
  { source: "soc2", target: "cc7.1", value: 4 },
  { source: "soc2", target: "cc7.2", value: 3 },

  // ── HIPAA → Criteria ───────────────────────────────────────────────────
  { source: "hipaa", target: "hipaa-312a", value: 5 },
  { source: "hipaa", target: "hipaa-312d", value: 4 },
  { source: "hipaa", target: "hipaa-308a", value: 3 },

  // ── ISO 27001 → Criteria ───────────────────────────────────────────────
  { source: "iso27001", target: "iso-a9.1", value: 4 },
  { source: "iso27001", target: "iso-a12.4", value: 3 },
  { source: "iso27001", target: "iso-a18.1", value: 3 },
  { source: "iso27001", target: "iso-a5.1", value: 4 },

  // ── GDPR → Criteria (Articles) ─────────────────────────────────────────
  { source: "gdpr", target: "gdpr-art5", value: 5 },
  { source: "gdpr", target: "gdpr-art25", value: 4 },
  { source: "gdpr", target: "gdpr-art30", value: 4 },
  { source: "gdpr", target: "gdpr-art32", value: 5 },
  { source: "gdpr", target: "gdpr-art33", value: 4 },
  { source: "gdpr", target: "gdpr-art35", value: 3 },

  // ── FedRAMP → Criteria (Control Families) ───────────────────────────────
  { source: "fedramp", target: "fed-ac", value: 5 },
  { source: "fedramp", target: "fed-au", value: 4 },
  { source: "fedramp", target: "fed-sc", value: 5 },
  { source: "fedramp", target: "fed-ir", value: 4 },
  { source: "fedramp", target: "fed-ra", value: 3 },
  { source: "fedramp", target: "fed-ca", value: 4 },
  { source: "fedramp", target: "fed-cm", value: 3 },

  // ── CMMC 2.0 → Criteria (Domains from NIST 800-171) ────────────────────
  { source: "cmmc", target: "cmmc-ac", value: 5 },
  { source: "cmmc", target: "cmmc-ia", value: 4 },
  { source: "cmmc", target: "cmmc-au", value: 4 },
  { source: "cmmc", target: "cmmc-cm", value: 3 },
  { source: "cmmc", target: "cmmc-ir", value: 3 },
  { source: "cmmc", target: "cmmc-mp", value: 3 },
  { source: "cmmc", target: "cmmc-sc", value: 4 },

  // ── SOC 2 Criteria → Controls ──────────────────────────────────────────
  { source: "cc1.1", target: "ca-01", value: 4 },
  { source: "cc1.1", target: "at-02", value: 2 },
  { source: "cc2.1", target: "au-06", value: 3 },
  { source: "cc2.1", target: "si-04", value: 2 },
  { source: "cc6.1", target: "ac-02", value: 5 },
  { source: "cc6.1", target: "ac-03", value: 4 },
  { source: "cc6.1", target: "ia-02", value: 4 },
  { source: "cc7.1", target: "ir-04", value: 4 },
  { source: "cc7.1", target: "si-04", value: 3 },
  { source: "cc7.2", target: "cm-06", value: 3 },

  // ── HIPAA Criteria → Controls ──────────────────────────────────────────
  { source: "hipaa-312a", target: "ac-02", value: 5 },
  { source: "hipaa-312a", target: "ac-03", value: 4 },
  { source: "hipaa-312d", target: "ia-02", value: 5 },
  { source: "hipaa-308a", target: "ir-04", value: 3 },
  { source: "hipaa-308a", target: "at-02", value: 3 },

  // ── ISO 27001 Criteria → Controls ──────────────────────────────────────
  { source: "iso-a9.1", target: "ac-02", value: 4 },
  { source: "iso-a9.1", target: "ia-02", value: 4 },
  { source: "iso-a12.4", target: "au-06", value: 3 },
  { source: "iso-a12.4", target: "si-04", value: 3 },
  { source: "iso-a18.1", target: "sc-28", value: 3 },
  { source: "iso-a18.1", target: "cm-06", value: 2 },
  { source: "iso-a5.1", target: "ca-01", value: 2 },

  // ── GDPR Criteria → Controls ───────────────────────────────────────────
  { source: "gdpr-art5", target: "ac-02", value: 4 },
  { source: "gdpr-art5", target: "sc-08", value: 4 },
  { source: "gdpr-art5", target: "sc-28", value: 3 },
  { source: "gdpr-art25", target: "cm-06", value: 3 },
  { source: "gdpr-art25", target: "dm-01", value: 4 },
  { source: "gdpr-art25", target: "pt-03", value: 3 },
  { source: "gdpr-art30", target: "au-02", value: 4 },
  { source: "gdpr-art32", target: "sc-12", value: 4 },
  { source: "gdpr-art32", target: "sc-28", value: 4 },
  { source: "gdpr-art32", target: "ia-02", value: 3 },
  { source: "gdpr-art33", target: "ir-04", value: 5 },
  { source: "gdpr-art33", target: "ir-06", value: 4 },
  { source: "gdpr-art35", target: "ra-03", value: 4 },

  // ── FedRAMP Criteria → Controls ────────────────────────────────────────
  { source: "fed-ac", target: "ac-02", value: 5 },
  { source: "fed-ac", target: "ac-03", value: 4 },
  { source: "fed-ac", target: "ac-04", value: 4 },
  { source: "fed-ac", target: "ac-17", value: 3 },
  { source: "fed-au", target: "au-02", value: 4 },
  { source: "fed-au", target: "au-06", value: 4 },
  { source: "fed-sc", target: "sc-08", value: 5 },
  { source: "fed-sc", target: "sc-12", value: 4 },
  { source: "fed-sc", target: "sc-28", value: 4 },
  { source: "fed-ir", target: "ir-04", value: 4 },
  { source: "fed-ir", target: "ir-06", value: 3 },
  { source: "fed-ra", target: "ra-03", value: 4 },
  { source: "fed-ra", target: "ra-05", value: 4 },
  { source: "fed-ca", target: "ca-01", value: 4 },
  { source: "fed-ca", target: "ca-02", value: 4 },
  { source: "fed-cm", target: "cm-06", value: 4 },
  { source: "fed-cm", target: "cm-07", value: 3 },

  // ── CMMC Criteria → Controls ───────────────────────────────────────────
  { source: "cmmc-ac", target: "ac-02", value: 5 },
  { source: "cmmc-ac", target: "ac-03", value: 4 },
  { source: "cmmc-ac", target: "ac-04", value: 3 },
  { source: "cmmc-ac", target: "ac-17", value: 4 },
  { source: "cmmc-ia", target: "ia-02", value: 5 },
  { source: "cmmc-au", target: "au-02", value: 3 },
  { source: "cmmc-au", target: "au-06", value: 4 },
  { source: "cmmc-cm", target: "cm-06", value: 4 },
  { source: "cmmc-cm", target: "cm-07", value: 3 },
  { source: "cmmc-ir", target: "ir-04", value: 4 },
  { source: "cmmc-mp", target: "mp-02", value: 3 },
  { source: "cmmc-mp", target: "mp-04", value: 3 },
  { source: "cmmc-sc", target: "sc-08", value: 4 },
  { source: "cmmc-sc", target: "sc-28", value: 3 },
  { source: "cmmc-sc", target: "at-02", value: 2 },

  // ── Controls → Evidence ────────────────────────────────────────────────
  { source: "ac-02", target: "ev-iam-policy", value: 4 },
  { source: "ac-02", target: "ev-access-review", value: 3 },
  { source: "ac-03", target: "ev-iam-policy", value: 3 },
  { source: "ac-03", target: "ev-mfa-config", value: 3 },
  { source: "ac-04", target: "ev-data-flow", value: 4 },
  { source: "ac-17", target: "ev-remote-access", value: 4 },
  { source: "au-02", target: "ev-ropa", value: 3 },
  { source: "au-02", target: "ev-audit-logs", value: 4 },
  { source: "ia-02", target: "ev-mfa-config", value: 5 },
  { source: "au-06", target: "ev-audit-logs", value: 4 },
  { source: "sc-08", target: "ev-tls-cert", value: 4 },
  { source: "sc-12", target: "ev-key-mgmt", value: 4 },
  { source: "sc-28", target: "ev-encryption", value: 4 },
  { source: "ir-04", target: "ev-incident-plan", value: 5 },
  { source: "ir-06", target: "ev-breach-runbook", value: 4 },
  { source: "cm-06", target: "ev-config-baseline", value: 4 },
  { source: "cm-07", target: "ev-config-baseline", value: 3 },
  { source: "si-04", target: "ev-monitoring", value: 4 },
  { source: "at-02", target: "ev-training-records", value: 3 },
  { source: "ca-01", target: "ev-risk-assessment", value: 3 },
  { source: "ca-01", target: "ev-policy-doc", value: 3 },
  { source: "ca-01", target: "ev-vendor-review", value: 2 },
  { source: "ca-02", target: "ev-3pao", value: 5 },
  { source: "ca-02", target: "ev-conmon", value: 3 },
  { source: "ca-02", target: "ev-poam", value: 3 },
  { source: "ra-03", target: "ev-dpia", value: 4 },
  { source: "ra-03", target: "ev-risk-assessment", value: 3 },
  { source: "ra-05", target: "ev-vuln-scan", value: 5 },
  { source: "mp-02", target: "ev-media-sanitize", value: 3 },
  { source: "mp-04", target: "ev-media-sanitize", value: 3 },
  { source: "pt-03", target: "ev-privacy-policy", value: 4 },
  { source: "dm-01", target: "ev-data-flow", value: 3 },
  { source: "dm-01", target: "ev-privacy-policy", value: 3 },
];

export const complianceMapData: ComplianceMapData = { nodes, links };

// ---------------------------------------------------------------------------
// Transformer: filters + groups raw data into d3-sankey-ready shape
// ---------------------------------------------------------------------------

export function buildSankeyData(
  data: ComplianceMapData,
  filters: SankeyFilters,
): ComplianceMapData {
  let filteredNodes = [...data.nodes];
  let filteredLinks = [...data.links];

  if (filters.activeFrameworks.length > 0) {
    const activeIds = new Set<string>();

    filteredNodes
      .filter((n) => n.type === "framework" && filters.activeFrameworks.includes(n.id))
      .forEach((n) => activeIds.add(n.id));

    filteredNodes
      .filter((n) => n.type === "criteria" && n.group && filters.activeFrameworks.includes(n.group))
      .forEach((n) => activeIds.add(n.id));

    let changed = true;
    while (changed) {
      changed = false;
      for (const link of data.links) {
        const srcId = typeof link.source === "string" ? link.source : (link.source as unknown as ComplianceNode).id;
        const tgtId = typeof link.target === "string" ? link.target : (link.target as unknown as ComplianceNode).id;
        if (activeIds.has(srcId) && !activeIds.has(tgtId)) {
          activeIds.add(tgtId);
          changed = true;
        }
      }
    }

    filteredNodes = filteredNodes.filter((n) => activeIds.has(n.id));
    filteredLinks = filteredLinks.filter((l) => {
      const srcId = typeof l.source === "string" ? l.source : (l.source as unknown as ComplianceNode).id;
      const tgtId = typeof l.target === "string" ? l.target : (l.target as unknown as ComplianceNode).id;
      return activeIds.has(srcId) && activeIds.has(tgtId);
    });
  }

  if (!filters.showEvidence) {
    const evidenceIds = new Set(filteredNodes.filter((n) => n.type === "evidence").map((n) => n.id));
    filteredNodes = filteredNodes.filter((n) => n.type !== "evidence");
    filteredLinks = filteredLinks.filter((l) => {
      const tgtId = typeof l.target === "string" ? l.target : (l.target as unknown as ComplianceNode).id;
      return !evidenceIds.has(tgtId);
    });
  }

  if (filters.detailLevel === "overview") {
    const controlNodes = filteredNodes.filter((n) => n.type === "control" && n.group);
    const groups = new Map<string, ComplianceNode[]>();
    for (const node of controlNodes) {
      const g = node.group!;
      if (!filters.expandedGroups.includes(g)) {
        if (!groups.has(g)) groups.set(g, []);
        groups.get(g)!.push(node);
      }
    }

    for (const [groupKey, members] of groups) {
      if (members.length <= 1) continue;
      const aggregateId = `group-${groupKey}`;
      const familyName = members[0].metadata?.controlFamily ?? groupKey;
      const avgCoverage = Math.round(
        members.reduce((s, m) => s + (m.metadata?.coverage ?? 0), 0) / members.length,
      );

      const aggregateNode: ComplianceNode = {
        id: aggregateId,
        label: `${groupKey} — ${familyName} (${members.length})`,
        type: "control",
        group: groupKey,
        children: members.map((m) => m.id),
        metadata: {
          controlFamily: familyName,
          coverage: avgCoverage,
          status: members.some((m) => m.metadata?.status === "gap") ? "gap" : members.some((m) => m.metadata?.status === "partial") ? "partial" : "met",
          sharedFrameworks: [...new Set(members.flatMap((m) => m.metadata?.sharedFrameworks ?? []))],
        },
      };

      const memberIds = new Set(members.map((m) => m.id));
      filteredNodes = filteredNodes.filter((n) => !memberIds.has(n.id));
      filteredNodes.push(aggregateNode);

      filteredLinks = filteredLinks.map((l) => ({
        ...l,
        source: memberIds.has(l.source) ? aggregateId : l.source,
        target: memberIds.has(l.target) ? aggregateId : l.target,
      }));
    }

    const linkMap = new Map<string, ComplianceLink>();
    for (const l of filteredLinks) {
      const key = `${l.source}->${l.target}`;
      if (linkMap.has(key)) {
        linkMap.get(key)!.value += l.value;
      } else {
        linkMap.set(key, { ...l });
      }
    }
    filteredLinks = Array.from(linkMap.values());
  }

  return { nodes: filteredNodes, links: filteredLinks };
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function resolveId(ref: string | { id: string }): string {
  return typeof ref === "string" ? ref : ref.id;
}

/**
 * Get directly connected node IDs (one hop in each direction)
 * plus the full downstream (forward) chain from the given node.
 * This gives a focused, predictable highlight that follows the
 * Sankey flow direction without lighting up the entire graph.
 */
export function getConnectedIds(
  nodeId: string,
  allLinks: { source: string | { id: string }; target: string | { id: string } }[],
): Set<string> {
  const connected = new Set<string>([nodeId]);

  // Collect direct neighbors (one hop)
  const directNeighbors = new Set<string>();
  for (const l of allLinks) {
    const src = resolveId(l.source);
    const tgt = resolveId(l.target);
    if (src === nodeId) directNeighbors.add(tgt);
    if (tgt === nodeId) directNeighbors.add(src);
  }
  for (const id of directNeighbors) connected.add(id);

  // Walk forward (downstream) from the node and its forward neighbors
  let frontier = new Set<string>([nodeId]);
  while (frontier.size > 0) {
    const next = new Set<string>();
    for (const l of allLinks) {
      const src = resolveId(l.source);
      const tgt = resolveId(l.target);
      if (frontier.has(src) && !connected.has(tgt)) {
        connected.add(tgt);
        next.add(tgt);
      }
    }
    frontier = next;
  }

  // Walk backward (upstream) from the node and its backward neighbors
  frontier = new Set<string>([nodeId]);
  while (frontier.size > 0) {
    const next = new Set<string>();
    for (const l of allLinks) {
      const src = resolveId(l.source);
      const tgt = resolveId(l.target);
      if (frontier.has(tgt) && !connected.has(src)) {
        connected.add(src);
        next.add(src);
      }
    }
    frontier = next;
  }

  return connected;
}

/**
 * Get the set of link keys (source->target) that lie on a
 * connected path through the given node.
 */
export function getConnectedLinkKeys(
  nodeId: string,
  allLinks: { source: string | { id: string }; target: string | { id: string } }[],
): Set<string> {
  const connectedNodes = getConnectedIds(nodeId, allLinks);
  const keys = new Set<string>();
  for (const l of allLinks) {
    const src = resolveId(l.source);
    const tgt = resolveId(l.target);
    if (connectedNodes.has(src) && connectedNodes.has(tgt)) {
      keys.add(`${src}->${tgt}`);
    }
  }
  return keys;
}

export const NODE_COLORS: Record<ComplianceNode["type"], string> = {
  framework: "#00E5A0",
  criteria: "rgba(0,229,160,0.55)",
  control: "#64748b",
  evidence: "#334155",
};

export const SHARED_CONTROL_BORDER = "#f59e0b";

export function isSharedControl(node: ComplianceNode): boolean {
  return (
    node.type === "control" &&
    (node.metadata?.sharedFrameworks?.length ?? 0) > 1
  );
}
