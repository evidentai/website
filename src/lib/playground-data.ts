export interface GraphNode {
  id: string;
  label: string;
  type: "service" | "database" | "identity" | "storage" | "compute" | "network";
  x: number;
  y: number;
  risk?: "high" | "medium" | "low";
}

export interface GraphEdge {
  from: string;
  to: string;
}

export interface RiskItem {
  id: string;
  nodeId: string;
  title: string;
  severity: "critical" | "high" | "medium" | "low";
  description: string;
}

export interface ChecklistItem {
  id: string;
  label: string;
  category: string;
}

interface FrameworkMetadata {
  totalControls: number;
  controlGroups: number;
}

export const insightsByFramework: Record<
  string,
  { critical: number; high: number; medium: number; low: number; remediate: number }
> = {
  "SOC 2": { critical: 29, high: 83, medium: 194, low: 347, remediate: 418 },
  "ISO 27001": { critical: 34, high: 91, medium: 213, low: 371, remediate: 456 },
  HIPAA: { critical: 41, high: 97, medium: 178, low: 312, remediate: 389 },
  GDPR: { critical: 22, high: 67, medium: 201, low: 358, remediate: 421 },
  FedRAMP: { critical: 47, high: 112, medium: 237, low: 389, remediate: 503 },
  CMMC: { critical: 36, high: 89, medium: 206, low: 334, remediate: 427 },
};

const frameworkMetadata: Record<string, FrameworkMetadata> = {
  "SOC 2": { totalControls: 64, controlGroups: 13 },
  "ISO 27001": { totalControls: 114, controlGroups: 14 },
  HIPAA: { totalControls: 45, controlGroups: 3 },
  GDPR: { totalControls: 99, controlGroups: 11 },
  FedRAMP: { totalControls: 325, controlGroups: 17 },
  CMMC: { totalControls: 130, controlGroups: 14 },
};

export interface DemoDataset {
  nodes: GraphNode[];
  edges: GraphEdge[];
  risks: RiskItem[];
  checklist: ChecklistItem[];
  finalScore: number;
  scanLogs: string[];
  totalControls: number;
}

const awsNodes: GraphNode[] = [
  { id: "vpc", label: "VPC", type: "network", x: 50, y: 15 },
  { id: "ec2-1", label: "EC2 (API)", type: "compute", x: 20, y: 35 },
  { id: "ec2-2", label: "EC2 (Worker)", type: "compute", x: 50, y: 35 },
  { id: "lambda", label: "Lambda", type: "compute", x: 80, y: 35 },
  { id: "rds", label: "RDS PostgreSQL", type: "database", x: 30, y: 55 },
  { id: "s3", label: "S3 Bucket", type: "storage", x: 70, y: 55, risk: "medium" },
  { id: "iam", label: "IAM", type: "identity", x: 50, y: 75, risk: "high" },
  { id: "cloudwatch", label: "CloudWatch", type: "service", x: 15, y: 75 },
  { id: "kms", label: "KMS", type: "service", x: 85, y: 75 },
];

const awsEdges: GraphEdge[] = [
  { from: "vpc", to: "ec2-1" },
  { from: "vpc", to: "ec2-2" },
  { from: "vpc", to: "lambda" },
  { from: "ec2-1", to: "rds" },
  { from: "ec2-2", to: "rds" },
  { from: "lambda", to: "s3" },
  { from: "ec2-1", to: "s3" },
  { from: "iam", to: "ec2-1" },
  { from: "iam", to: "lambda" },
  { from: "cloudwatch", to: "ec2-1" },
  { from: "cloudwatch", to: "ec2-2" },
  { from: "kms", to: "rds" },
  { from: "kms", to: "s3" },
];

const azureNodes: GraphNode[] = [
  { id: "vnet", label: "VNet", type: "network", x: 50, y: 15 },
  { id: "app-svc", label: "App Service", type: "compute", x: 25, y: 35 },
  { id: "func", label: "Azure Functions", type: "compute", x: 75, y: 35 },
  { id: "sql", label: "Azure SQL", type: "database", x: 30, y: 55, risk: "medium" },
  { id: "blob", label: "Blob Storage", type: "storage", x: 70, y: 55 },
  { id: "aad", label: "Azure AD", type: "identity", x: 50, y: 75, risk: "high" },
  { id: "monitor", label: "Azure Monitor", type: "service", x: 15, y: 75 },
  { id: "vault", label: "Key Vault", type: "service", x: 85, y: 75 },
];

const azureEdges: GraphEdge[] = [
  { from: "vnet", to: "app-svc" },
  { from: "vnet", to: "func" },
  { from: "app-svc", to: "sql" },
  { from: "func", to: "blob" },
  { from: "aad", to: "app-svc" },
  { from: "aad", to: "func" },
  { from: "monitor", to: "app-svc" },
  { from: "vault", to: "sql" },
  { from: "vault", to: "blob" },
];

const gcpNodes: GraphNode[] = [
  { id: "vpc-gcp", label: "VPC", type: "network", x: 50, y: 15 },
  { id: "gke", label: "GKE Cluster", type: "compute", x: 25, y: 35 },
  { id: "cloud-run", label: "Cloud Run", type: "compute", x: 75, y: 35 },
  { id: "cloud-sql", label: "Cloud SQL", type: "database", x: 30, y: 55 },
  { id: "gcs", label: "Cloud Storage", type: "storage", x: 70, y: 55, risk: "medium" },
  { id: "iam-gcp", label: "Cloud IAM", type: "identity", x: 50, y: 75, risk: "high" },
  { id: "logging", label: "Cloud Logging", type: "service", x: 15, y: 75 },
  { id: "kms-gcp", label: "Cloud KMS", type: "service", x: 85, y: 75 },
];

const gcpEdges: GraphEdge[] = [
  { from: "vpc-gcp", to: "gke" },
  { from: "vpc-gcp", to: "cloud-run" },
  { from: "gke", to: "cloud-sql" },
  { from: "cloud-run", to: "gcs" },
  { from: "iam-gcp", to: "gke" },
  { from: "iam-gcp", to: "cloud-run" },
  { from: "logging", to: "gke" },
  { from: "kms-gcp", to: "cloud-sql" },
  { from: "kms-gcp", to: "gcs" },
];

const soc2Risks: RiskItem[] = [
  {
    id: "r1",
    nodeId: "iam",
    title: "Overly permissive IAM roles detected",
    severity: "critical",
    description: "3 IAM roles have wildcard (*) permissions. Restrict to least-privilege.",
  },
  {
    id: "r2",
    nodeId: "s3",
    title: "S3 bucket lacks encryption at rest",
    severity: "high",
    description: "Default encryption is not enabled on the primary data bucket.",
  },
  {
    id: "r3",
    nodeId: "rds",
    title: "Database backups not encrypted",
    severity: "medium",
    description: "Automated backups should use KMS encryption keys.",
  },
];

const hipaaRisks: RiskItem[] = [
  {
    id: "r1",
    nodeId: "iam",
    title: "MFA not enforced for all users",
    severity: "critical",
    description: "HIPAA requires MFA for accessing systems containing PHI.",
  },
  {
    id: "r2",
    nodeId: "s3",
    title: "PHI data bucket publicly accessible",
    severity: "critical",
    description: "Storage containing PHI must not have public access.",
  },
  {
    id: "r3",
    nodeId: "rds",
    title: "Audit logging not enabled",
    severity: "high",
    description: "All access to PHI must be logged and auditable.",
  },
];

const isoRisks: RiskItem[] = [
  {
    id: "r1",
    nodeId: "iam",
    title: "Access review policy missing",
    severity: "high",
    description: "ISO 27001 A.9 requires periodic access reviews.",
  },
  {
    id: "r2",
    nodeId: "s3",
    title: "Data classification not applied",
    severity: "medium",
    description: "Assets must be classified per information security policy.",
  },
];

const gdprRisks: RiskItem[] = [
  {
    id: "r1",
    nodeId: "iam",
    title: "No data processing agreements on file",
    severity: "critical",
    description: "GDPR Article 28 requires DPAs with all processors.",
  },
  {
    id: "r2",
    nodeId: "s3",
    title: "No data retention policy",
    severity: "high",
    description: "Personal data must have defined retention periods.",
  },
];

const cmmcRisks: RiskItem[] = [
  {
    id: "r1",
    nodeId: "iam",
    title: "CUI access not restricted to authorized personnel",
    severity: "critical",
    description: "NIST 800-171 AC-1 requires limiting system access to authorized users.",
  },
  {
    id: "r2",
    nodeId: "s3",
    title: "CUI not encrypted at rest in storage",
    severity: "critical",
    description: "CMMC Level 2 requires encryption of CUI at rest (SC.L2-3.13.11).",
  },
  {
    id: "r3",
    nodeId: "rds",
    title: "Audit events not correlated across systems",
    severity: "high",
    description: "AU.L2-3.3.5 requires audit record review, analysis, and reporting.",
  },
];

const fedrampRisks: RiskItem[] = [
  {
    id: "r1",
    nodeId: "iam",
    title: "Authorization boundary not clearly defined",
    severity: "critical",
    description: "FedRAMP requires a documented authorization boundary for all system components.",
  },
  {
    id: "r2",
    nodeId: "s3",
    title: "Continuous monitoring not configured",
    severity: "high",
    description: "ConMon requires automated vulnerability scanning and configuration monitoring.",
  },
  {
    id: "r3",
    nodeId: "rds",
    title: "POA&M items not tracked for remediation",
    severity: "high",
    description: "All findings must be tracked in a Plan of Action and Milestones with target dates.",
  },
];

const soc2Checklist: ChecklistItem[] = [
  // Availability (A)
  { id: "A1.1", label: "Manages processing capacity", category: "Availability" },
  { id: "A1.2", label: "Implements recovery infrastructure and backup", category: "Availability" },
  { id: "A1.3", label: "Tests recovery procedures", category: "Availability" },
  
  // Confidentiality (C)
  { id: "C1.1", label: "Identifies confidential information", category: "Confidentiality" },
  { id: "C1.2", label: "Disposes confidential information", category: "Confidentiality" },
  
  // Control Environment (CC1)
  { id: "CC1.1", label: "Integrity and ethical values", category: "Control Environment" },
  { id: "CC1.2", label: "Board independence and oversight", category: "Control Environment" },
  { id: "CC1.3", label: "Organizational structure", category: "Control Environment" },
  { id: "CC1.4", label: "Competence and personnel", category: "Control Environment" },
  { id: "CC1.5", label: "Accountability", category: "Control Environment" },
  
  // Communication & Information (CC2)
  { id: "CC2.1", label: "Information quality", category: "Communication & Information" },
  { id: "CC2.2", label: "Internal communication", category: "Communication & Information" },
  { id: "CC2.3", label: "External communication", category: "Communication & Information" },
  
  // Risk Assessment (CC3)
  { id: "CC3.1", label: "Defines objectives", category: "Risk Assessment" },
  { id: "CC3.2", label: "Identifies risks", category: "Risk Assessment" },
  { id: "CC3.3", label: "Fraud risk consideration", category: "Risk Assessment" },
  { id: "CC3.4", label: "Identifies changes", category: "Risk Assessment" },
  
  // Monitoring (CC4)
  { id: "CC4.1", label: "Ongoing evaluations", category: "Monitoring" },
  { id: "CC4.2", label: "Communicates deficiencies", category: "Monitoring" },
  
  // Control Activities (CC5)
  { id: "CC5.1", label: "Selects control activities", category: "Control Activities" },
  { id: "CC5.2", label: "Technology controls", category: "Control Activities" },
  { id: "CC5.3", label: "Policies and procedures", category: "Control Activities" },
  
  // Logical & Physical Access (CC6)
  { id: "CC6.1", label: "Access controls implementation", category: "Logical & Physical Access" },
  { id: "CC6.2", label: "User authorization", category: "Logical & Physical Access" },
  { id: "CC6.3", label: "Access modification", category: "Logical & Physical Access" },
  { id: "CC6.4", label: "Physical access restrictions", category: "Logical & Physical Access" },
  { id: "CC6.5", label: "Access removal", category: "Logical & Physical Access" },
  { id: "CC6.6", label: "External threat protection", category: "Logical & Physical Access" },
  { id: "CC6.7", label: "Data transmission protection", category: "Logical & Physical Access" },
  { id: "CC6.8", label: "Malware protection", category: "Logical & Physical Access" },
  
  // System Operations (CC7)
  { id: "CC7.1", label: "Detect configuration changes", category: "System Operations" },
  { id: "CC7.2", label: "Monitor system activity", category: "System Operations" },
  { id: "CC7.3", label: "Evaluate security events", category: "System Operations" },
  { id: "CC7.4", label: "Incident response", category: "System Operations" },
  { id: "CC7.5", label: "Recover from incidents", category: "System Operations" },
  
  // Change Management (CC8)
  { id: "CC8.1", label: "Manage system changes", category: "Change Management" },
  
  // Risk Mitigation (CC9)
  { id: "CC9.1", label: "Business continuity risk mitigation", category: "Risk Mitigation" },
  { id: "CC9.2", label: "Vendor risk management", category: "Risk Mitigation" },
  
  // Privacy (P)
  { id: "P1.1", label: "Privacy notice", category: "Privacy" },
  { id: "P1.2", label: "Consent management", category: "Privacy" },
  { id: "P1.3", label: "Data collection limitation", category: "Privacy" },
  { id: "P1.4", label: "Data usage limitation", category: "Privacy" },
  { id: "P1.5", label: "Data retention", category: "Privacy" },
  { id: "P1.6", label: "Data disposal", category: "Privacy" },
  { id: "P1.7", label: "Third-party disclosure", category: "Privacy" },
  { id: "P1.8", label: "Access to personal data", category: "Privacy" },
  { id: "P1.9", label: "Data correction", category: "Privacy" },
  
  // Processing Integrity (PI)
  { id: "PI1.1", label: "Information processing quality", category: "Processing Integrity" },
  { id: "PI1.2", label: "Input validation", category: "Processing Integrity" },
  { id: "PI1.3", label: "Processing controls", category: "Processing Integrity" },
  { id: "PI1.4", label: "Output accuracy", category: "Processing Integrity" },
  { id: "PI1.5", label: "Data storage integrity", category: "Processing Integrity" },
];

const hipaaChecklist: ChecklistItem[] = [
  { id: "c1", label: "PHI encryption at rest", category: "Technical Safeguards" },
  { id: "c2", label: "PHI encryption in transit", category: "Technical Safeguards" },
  { id: "c3", label: "Access controls for PHI", category: "Technical Safeguards" },
  { id: "c4", label: "Audit logging enabled", category: "Technical Safeguards" },
  { id: "c5", label: "BAA agreements in place", category: "Administrative Safeguards" },
  { id: "c6", label: "Risk assessment completed", category: "Administrative Safeguards" },
  { id: "c7", label: "Workforce training completed", category: "Administrative Safeguards" },
  { id: "c8", label: "Disaster recovery plan", category: "Physical Safeguards" },
];

const cmmcChecklist: ChecklistItem[] = [
  { id: "c1", label: "CUI boundary defined", category: "Access Control" },
  { id: "c2", label: "MFA enforced for all CUI access", category: "Identification & Auth" },
  { id: "c3", label: "CUI encrypted at rest", category: "System & Comms Protection" },
  { id: "c4", label: "CUI encrypted in transit", category: "System & Comms Protection" },
  { id: "c5", label: "Audit logs retained and reviewed", category: "Audit & Accountability" },
  { id: "c6", label: "Incident response plan tested", category: "Incident Response" },
  { id: "c7", label: "System security plan documented", category: "Security Assessment" },
  { id: "c8", label: "Personnel security screening", category: "Personnel Security" },
  { id: "c9", label: "Media sanitization procedures", category: "Media Protection" },
];

const fedrampChecklist: ChecklistItem[] = [
  { id: "c1", label: "System Security Plan (SSP) documented", category: "Documentation" },
  { id: "c2", label: "Authorization boundary defined", category: "Documentation" },
  { id: "c3", label: "3PAO assessment scheduled", category: "Assessment" },
  { id: "c4", label: "Continuous monitoring (ConMon) configured", category: "Monitoring" },
  { id: "c5", label: "POA&M tracking in place", category: "Remediation" },
  { id: "c6", label: "FIPS 140-2 validated encryption", category: "Cryptography" },
  { id: "c7", label: "Incident response plan tested", category: "Incident Response" },
  { id: "c8", label: "Vulnerability scanning automated", category: "Monitoring" },
  { id: "c9", label: "Supply chain risk management documented", category: "Risk Management" },
];

const awsScanLogs = [
  "Initializing AWS SDK connection...",
  "Authenticating with IAM credentials...",
  "Enumerating VPC configurations...",
  "Scanning EC2 instances (2 found)...",
  "Checking Lambda functions (1 found)...",
  "Analyzing RDS instances...",
  "Inspecting S3 bucket policies...",
  "Reviewing IAM roles and policies...",
  "Checking CloudWatch configurations...",
  "Validating KMS key policies...",
  "Checking security group rules...",
  "Verifying encryption settings...",
  "Analyzing network ACLs...",
  "Reviewing CloudTrail logs...",
  "Generating compliance map...",
  "Building infrastructure graph...",
  "Cross-referencing control requirements...",
  "Calculating risk scores...",
  "Compiling findings report...",
  "Scan complete — 9 resources analyzed",
];

const azureScanLogs = [
  "Initializing Azure SDK connection...",
  "Authenticating with service principal...",
  "Enumerating VNet configurations...",
  "Scanning App Services (1 found)...",
  "Checking Azure Functions (1 found)...",
  "Analyzing Azure SQL databases...",
  "Inspecting Blob Storage containers...",
  "Reviewing Azure AD configurations...",
  "Checking Azure Monitor alerts...",
  "Validating Key Vault policies...",
  "Checking NSG rules...",
  "Verifying encryption settings...",
  "Analyzing RBAC assignments...",
  "Reviewing Activity Log...",
  "Generating compliance map...",
  "Building infrastructure graph...",
  "Cross-referencing control requirements...",
  "Calculating risk scores...",
  "Compiling findings report...",
  "Scan complete — 8 resources analyzed",
];

const gcpScanLogs = [
  "Initializing GCP SDK connection...",
  "Authenticating with service account...",
  "Enumerating VPC configurations...",
  "Scanning GKE clusters (1 found)...",
  "Checking Cloud Run services (1 found)...",
  "Analyzing Cloud SQL instances...",
  "Inspecting Cloud Storage buckets...",
  "Reviewing Cloud IAM policies...",
  "Checking Cloud Logging sinks...",
  "Validating Cloud KMS keys...",
  "Checking firewall rules...",
  "Verifying encryption settings...",
  "Analyzing service account permissions...",
  "Reviewing audit logs...",
  "Generating compliance map...",
  "Building infrastructure graph...",
  "Cross-referencing control requirements...",
  "Calculating risk scores...",
  "Compiling findings report...",
  "Scan complete — 8 resources analyzed",
];

type CloudKey = "AWS" | "Azure" | "GCP";
type FrameworkKey = "SOC 2" | "ISO 27001" | "HIPAA" | "GDPR" | "FedRAMP" | "CMMC";

const cloudDataMap: Record<CloudKey, { nodes: GraphNode[]; edges: GraphEdge[]; logs: string[] }> = {
  AWS: { nodes: awsNodes, edges: awsEdges, logs: awsScanLogs },
  Azure: { nodes: azureNodes, edges: azureEdges, logs: azureScanLogs },
  GCP: { nodes: gcpNodes, edges: gcpEdges, logs: gcpScanLogs },
};

const frameworkDataMap: Record<FrameworkKey, { risks: RiskItem[]; checklist: ChecklistItem[]; score: number }> = {
  "SOC 2": { risks: soc2Risks, checklist: soc2Checklist, score: 23 },
  "ISO 27001": { risks: isoRisks, checklist: soc2Checklist, score: 19 },
  HIPAA: { risks: hipaaRisks, checklist: hipaaChecklist, score: 27 },
  GDPR: { risks: gdprRisks, checklist: soc2Checklist, score: 21 },
  FedRAMP: { risks: fedrampRisks, checklist: fedrampChecklist, score: 14 },
  CMMC: { risks: cmmcRisks, checklist: cmmcChecklist, score: 18 },
};

export function getDemoData(framework: FrameworkKey, cloud: CloudKey): DemoDataset {
  const cloudData = cloudDataMap[cloud];
  const fwData = frameworkDataMap[framework];

  const nodes = cloudData.nodes.map((n) => {
    const risk = fwData.risks.find((r) => r.nodeId === n.id);
    return risk ? { ...n, risk: risk.severity === "critical" ? "high" as const : n.risk } : n;
  });

  return {
    nodes,
    edges: cloudData.edges,
    risks: fwData.risks,
    checklist: fwData.checklist,
    finalScore: fwData.score,
    scanLogs: cloudData.logs,
    totalControls: frameworkMetadata[framework].totalControls,
  };
}

// ─── Cloud Services per Provider ───

export interface CloudService {
  id: string;
  label: string;
  category: string;
}

export const cloudServicesMap: Record<string, CloudService[]> = {
  AWS: [
    { id: "ec2", label: "EC2", category: "Compute" },
    { id: "s3", label: "S3", category: "Storage" },
    { id: "rds", label: "RDS", category: "Database" },
    { id: "lambda", label: "Lambda", category: "Compute" },
    { id: "iam", label: "IAM", category: "Identity" },
    { id: "cloudwatch", label: "CloudWatch", category: "Monitoring" },
    { id: "kms", label: "KMS", category: "Security" },
    { id: "vpc", label: "VPC", category: "Networking" },
    { id: "eks", label: "EKS", category: "Containers" },
    { id: "cloudtrail", label: "CloudTrail", category: "Audit" },
    { id: "route53", label: "Route 53", category: "Networking" },
    { id: "sns", label: "SNS", category: "Messaging" },
  ],
  Azure: [
    { id: "app-service", label: "App Service", category: "Compute" },
    { id: "blob", label: "Blob Storage", category: "Storage" },
    { id: "azure-sql", label: "Azure SQL", category: "Database" },
    { id: "functions", label: "Functions", category: "Compute" },
    { id: "azure-ad", label: "Azure AD", category: "Identity" },
    { id: "key-vault", label: "Key Vault", category: "Security" },
    { id: "monitor", label: "Monitor", category: "Monitoring" },
    { id: "vnet", label: "VNet", category: "Networking" },
    { id: "aks", label: "AKS", category: "Containers" },
    { id: "activity-log", label: "Activity Log", category: "Audit" },
  ],
  GCP: [
    { id: "compute-engine", label: "Compute Engine", category: "Compute" },
    { id: "cloud-storage", label: "Cloud Storage", category: "Storage" },
    { id: "cloud-sql", label: "Cloud SQL", category: "Database" },
    { id: "cloud-functions", label: "Cloud Functions", category: "Compute" },
    { id: "cloud-iam", label: "Cloud IAM", category: "Identity" },
    { id: "cloud-kms", label: "Cloud KMS", category: "Security" },
    { id: "cloud-logging", label: "Cloud Logging", category: "Monitoring" },
    { id: "gcp-vpc", label: "VPC", category: "Networking" },
    { id: "gke", label: "GKE", category: "Containers" },
    { id: "cloud-run", label: "Cloud Run", category: "Compute" },
  ],
};

// ─── Integration Categories ───

export interface IntegrationTool {
  id: string;
  label: string;
  color: string;
  logo?: string;
}

export interface IntegrationCategory {
  key: string;
  title: string;
  description: string;
  icon: string;
  tools: IntegrationTool[];
}

export const integrationCategories: IntegrationCategory[] = [
  {
    key: "scm",
    title: "Source Code Management",
    description: "Connect your repositories to monitor code-level controls and policies.",
    icon: "GitBranch",
    tools: [
      { id: "github", label: "GitHub", color: "#181717", logo: "/images/logos/github.svg" },
      { id: "gitlab", label: "GitLab", color: "#FC6D26", logo: "/images/logos/gitlab.svg" },
      { id: "bitbucket", label: "Bitbucket", color: "#0052CC", logo: "/images/logos/bitbucket.svg" },
      { id: "azure-devops", label: "Azure DevOps", color: "#0078D7", logo: "/images/logos/azure-devops.svg" },
      { id: "codecommit", label: "CodeCommit", color: "#FF9900", logo: "/images/logos/codecommit.svg" },
    ],
  },
  {
    key: "cicd",
    title: "CI/CD Pipelines",
    description: "Track deployment pipelines and change management controls.",
    icon: "Rocket",
    tools: [
      { id: "jenkins", label: "Jenkins", color: "#D24939", logo: "/images/logos/jenkins.svg" },
      { id: "github-actions", label: "GitHub Actions", color: "#2088FF", logo: "/images/logos/github-actions.svg" },
      { id: "gitlab-ci", label: "GitLab CI", color: "#FC6D26", logo: "/images/logos/gitlab-ci.svg" },
      { id: "circleci", label: "CircleCI", color: "#343434", logo: "/images/logos/circleci.svg" },
      { id: "teamcity", label: "TeamCity", color: "#07C3F2", logo: "/images/logos/teamcity.svg" },
      { id: "travis-ci", label: "Travis CI", color: "#3EAAAF", logo: "/images/logos/travis-ci.svg" },
      { id: "argocd", label: "ArgoCD", color: "#EF7B4D", logo: "/images/logos/argocd.svg" },
    ],
  },
  {
    key: "idp",
    title: "Identity Provider",
    description: "Verify identity management, SSO, and MFA configurations.",
    icon: "Fingerprint",
    tools: [
      { id: "okta", label: "Okta", color: "#007DC1", logo: "/images/logos/okta.svg" },
      { id: "azure-ad-idp", label: "Azure AD", color: "#0078D4", logo: "/images/logos/azure-ad.svg" },
      { id: "ping-identity", label: "PingIdentity", color: "#B3282D", logo: "/images/logos/ping-identity.svg" },
      { id: "duo", label: "Duo", color: "#6BBF4E", logo: "/images/logos/duo.svg" },
      { id: "onelogin", label: "OneLogin", color: "#02A95C", logo: "/images/logos/onelogin.svg" },
      { id: "auth0", label: "Auth0", color: "#EB5424", logo: "/images/logos/Auth0.svg" },
      { id: "jumpcloud", label: "JumpCloud", color: "#53B689", logo: "/images/logos/jumpcloud.svg" },
    ],
  },
  {
    key: "endpoint",
    title: "Endpoint Management",
    description: "Monitor endpoint protection and device compliance status.",
    icon: "ShieldCheck",
    tools: [
      { id: "crowdstrike", label: "CrowdStrike", color: "#FF0000", logo: "/images/logos/crowdstrike.svg" },
      { id: "sentinelone", label: "SentinelOne", color: "#6C2DC7", logo: "/images/logos/sentinelone.svg" },
      { id: "sysdig", label: "Sysdig", color: "#00B4C8", logo: "/images/logos/sysdig.svg" },
      { id: "carbon-black", label: "Carbon Black", color: "#002855", logo: "/images/logos/carbon-black.svg" },
      { id: "tanium", label: "Tanium", color: "#CC0000", logo: "/images/logos/tanium.svg" },
      { id: "jamf", label: "Jamf", color: "#62B0D9", logo: "/images/logos/jamf.svg" },
      { id: "ms-defender", label: "Microsoft Defender", color: "#0078D4", logo: "/images/logos/ms-defender.svg" },
    ],
  },
  {
    key: "logs",
    title: "Log Management",
    description: "Collect audit logs, alerts, and monitoring data for compliance evidence.",
    icon: "ScrollText",
    tools: [
      { id: "splunk", label: "Splunk", color: "#65A637", logo: "/images/logos/splunk.svg" },
      { id: "datadog", label: "Datadog", color: "#632CA6", logo: "/images/logos/datadog.svg" },
      { id: "elastic", label: "Elastic / ELK", color: "#00BFB3", logo: "/images/logos/elastic.svg" },
      { id: "new-relic", label: "New Relic", color: "#008C99", logo: "/images/logos/new-relic.svg" },
      { id: "pagerduty", label: "PagerDuty", color: "#06AC38", logo: "/images/logos/pagerduty.svg" },
      { id: "grafana", label: "Grafana", color: "#F46800", logo: "/images/logos/grafana.svg" },
    ],
  },
];
