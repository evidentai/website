"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ClipboardCheck } from "lucide-react";
import { ProgressBar } from "./progress-bar";
import { BasicInfoStep } from "./basic-info-step";
import { FrameworkStep } from "./framework-step";
import { MultiSelectStep, type SelectOption } from "./multi-select-step";
import { AdditionalToolsStep } from "./additional-tools-step";
import { FinalMessageStep } from "./final-message-step";
import { ReviewStep, type QuestionnaireFormData } from "./review-step";
import { QuestionnaireDiagram } from "./questionnaire-diagram";

const TOTAL_STEPS = 11;

const cloudOptions: SelectOption[] = [
  { id: "AWS", label: "AWS", color: "#FF9900", logo: "/images/logos/aws.svg" },
  { id: "Azure", label: "Azure", color: "#0078D4", logo: "/images/logos/azure.svg" },
  { id: "GCP", label: "GCP", color: "#4285F4", logo: "/images/logos/gcp.svg" },
];

const scmOptions: SelectOption[] = [
  { id: "GitHub", label: "GitHub", color: "#181717", logo: "/images/logos/github.svg" },
  { id: "GitLab", label: "GitLab", color: "#FC6D26", logo: "/images/logos/gitlab.svg" },
  { id: "Bitbucket", label: "Bitbucket", color: "#0052CC", logo: "/images/logos/bitbucket.svg" },
  { id: "Azure DevOps", label: "Azure DevOps", color: "#0078D7", logo: "/images/logos/azure-devops.svg" },
  { id: "CodeCommit", label: "CodeCommit", color: "#FF9900", logo: "/images/logos/codecommit.svg" },
];

const cicdOptions: SelectOption[] = [
  { id: "Jenkins", label: "Jenkins", color: "#D24939", logo: "/images/logos/jenkins.svg" },
  { id: "GitHub Actions", label: "GitHub Actions", color: "#2088FF", logo: "/images/logos/github-actions.svg" },
  { id: "GitLab CI", label: "GitLab CI", color: "#FC6D26", logo: "/images/logos/gitlab-ci.svg" },
  { id: "CircleCI", label: "CircleCI", color: "#343434", logo: "/images/logos/circleci.svg" },
  { id: "TeamCity", label: "TeamCity", color: "#07C3F2", logo: "/images/logos/teamcity.svg" },
  { id: "Travis CI", label: "Travis CI", color: "#3EAAAF", logo: "/images/logos/travis-ci.svg" },
  { id: "ArgoCD", label: "ArgoCD", color: "#EF7B4D", logo: "/images/logos/argocd.svg" },
];

const identityOptions: SelectOption[] = [
  { id: "Okta", label: "Okta", color: "#007DC1", logo: "/images/logos/okta.svg" },
  { id: "Azure AD", label: "Azure AD", color: "#0078D4", logo: "/images/logos/azure-ad.svg" },
  { id: "PingIdentity", label: "PingIdentity", color: "#B3282D", logo: "/images/logos/ping-identity.svg" },
  { id: "Duo", label: "Duo", color: "#6BBF4E", logo: "/images/logos/duo.svg" },
  { id: "OneLogin", label: "OneLogin", color: "#02A95C", logo: "/images/logos/onelogin.svg" },
  { id: "Auth0", label: "Auth0", color: "#EB5424", logo: "/images/logos/Auth0.svg" },
  { id: "JumpCloud", label: "JumpCloud", color: "#53B689", logo: "/images/logos/jumpcloud.svg" },
];

const endpointOptions: SelectOption[] = [
  { id: "CrowdStrike", label: "CrowdStrike", color: "#FF0000", logo: "/images/logos/crowdstrike.svg" },
  { id: "SentinelOne", label: "SentinelOne", color: "#6C2DC7", logo: "/images/logos/sentinelone.svg" },
  { id: "Sysdig", label: "Sysdig", color: "#00B4C8", logo: "/images/logos/sysdig.svg" },
  { id: "Carbon Black", label: "Carbon Black", color: "#002855", logo: "/images/logos/carbon-black.svg" },
  { id: "Tanium", label: "Tanium", color: "#CC0000", logo: "/images/logos/tanium.svg" },
  { id: "Jamf", label: "Jamf", color: "#62B0D9", logo: "/images/logos/jamf.svg" },
  { id: "Microsoft Defender", label: "Microsoft Defender", color: "#0078D4", logo: "/images/logos/ms-defender.svg" },
];

const logOptions: SelectOption[] = [
  { id: "Splunk", label: "Splunk", color: "#65A637", logo: "/images/logos/splunk.svg" },
  { id: "Datadog", label: "Datadog", color: "#632CA6", logo: "/images/logos/datadog.svg" },
  { id: "Elastic / ELK", label: "Elastic / ELK", color: "#00BFB3", logo: "/images/logos/elastic.svg" },
  { id: "New Relic", label: "New Relic", color: "#008C99", logo: "/images/logos/new-relic.svg" },
  { id: "PagerDuty", label: "PagerDuty", color: "#06AC38", logo: "/images/logos/pagerduty.svg" },
  { id: "Grafana", label: "Grafana", color: "#F46800", logo: "/images/logos/grafana.svg" },
];

const initialFormData: QuestionnaireFormData = {
  name: "",
  email: "",
  company: "",
  role: "",
  framework: [],
  cloud: [],
  scm: [],
  cicd: [],
  identity: [],
  endpoint: [],
  logs: [],
  otherTools: [],
  message: "",
};

export function QuestionnaireContainer() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<QuestionnaireFormData>(initialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const topRef = useRef<HTMLDivElement>(null);

  const scrollToTop = useCallback(() => {
    setTimeout(() => {
      topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  const goTo = useCallback(
    (step: number) => {
      setCurrentStep(step);
      scrollToTop();
    },
    [scrollToTop]
  );

  const next = useCallback(() => goTo(currentStep + 1), [currentStep, goTo]);
  const back = useCallback(() => goTo(currentStep - 1), [currentStep, goTo]);

  const updateBasicInfo = useCallback(
    (field: "name" | "email" | "company" | "role", value: string) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const updateSelection = useCallback(
    (field: keyof QuestionnaireFormData, values: string[]) => {
      setFormData((prev) => ({ ...prev, [field]: values }));
    },
    []
  );

  const handleSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/questionnaire", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error("Submission failed");
      setIsSubmitted(true);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <BasicInfoStep
            data={formData}
            onChange={updateBasicInfo}
            onNext={next}
          />
        );
      case 1:
        return (
          <FrameworkStep
            selected={formData.framework}
            onSelectionChange={(v) => updateSelection("framework", v)}
            onNext={next}
            onBack={back}
          />
        );
      case 2:
        return (
          <MultiSelectStep
            stepNumber={3}
            totalSteps={TOTAL_STEPS}
            title="Cloud providers"
            description="Which cloud providers does your organization use?"
            options={cloudOptions}
            selected={formData.cloud}
            onSelectionChange={(v) => updateSelection("cloud", v)}
            onNext={next}
            onBack={back}
            required
          />
        );
      case 3:
        return (
          <MultiSelectStep
            stepNumber={4}
            totalSteps={TOTAL_STEPS}
            title="Source code management"
            description="Where does your team manage source code?"
            options={scmOptions}
            selected={formData.scm}
            onSelectionChange={(v) => updateSelection("scm", v)}
            onNext={next}
            onBack={back}
          />
        );
      case 4:
        return (
          <MultiSelectStep
            stepNumber={5}
            totalSteps={TOTAL_STEPS}
            title="CI/CD pipelines"
            description="Which CI/CD tools power your deployment pipelines?"
            options={cicdOptions}
            selected={formData.cicd}
            onSelectionChange={(v) => updateSelection("cicd", v)}
            onNext={next}
            onBack={back}
          />
        );
      case 5:
        return (
          <MultiSelectStep
            stepNumber={6}
            totalSteps={TOTAL_STEPS}
            title="Identity providers"
            description="How does your team manage identity and access?"
            options={identityOptions}
            selected={formData.identity}
            onSelectionChange={(v) => updateSelection("identity", v)}
            onNext={next}
            onBack={back}
          />
        );
      case 6:
        return (
          <MultiSelectStep
            stepNumber={7}
            totalSteps={TOTAL_STEPS}
            title="Endpoint management"
            description="Which endpoint security and management tools do you use?"
            options={endpointOptions}
            selected={formData.endpoint}
            onSelectionChange={(v) => updateSelection("endpoint", v)}
            onNext={next}
            onBack={back}
          />
        );
      case 7:
        return (
          <MultiSelectStep
            stepNumber={8}
            totalSteps={TOTAL_STEPS}
            title="Log & monitoring tools"
            description="How does your team collect logs and monitor infrastructure?"
            options={logOptions}
            selected={formData.logs}
            onSelectionChange={(v) => updateSelection("logs", v)}
            onNext={next}
            onBack={back}
          />
        );
      case 8:
        return (
          <AdditionalToolsStep
            tools={formData.otherTools}
            onToolsChange={(v) => updateSelection("otherTools", v)}
            onNext={next}
            onBack={back}
          />
        );
      case 9:
        return (
          <FinalMessageStep
            message={formData.message}
            onChange={(v) => setFormData((prev) => ({ ...prev, message: v }))}
            onNext={next}
            onBack={back}
          />
        );
      case 10:
        return (
          <ReviewStep
            data={formData}
            onBack={back}
            onEdit={goTo}
            onSubmit={handleSubmit}
            isSubmitting={isSubmitting}
            isSubmitted={isSubmitted}
          />
        );
      default:
        return null;
    }
  };

  if (showIntro) {
    return (
      <div ref={topRef} className="flex min-h-[60vh] items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 24 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative w-full max-w-lg"
        >
          {/* Glow border */}
          <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-b from-[#00E5A0]/20 via-white/[0.06] to-white/[0.02]" />

          {/* Glass card */}
          <div className="relative rounded-2xl border border-white/[0.08] bg-white/[0.04] px-8 py-10 backdrop-blur-xl sm:px-10 sm:py-12">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="flex flex-col items-center text-center"
            >
              <div className="mb-6 flex size-16 items-center justify-center rounded-full bg-[#00E5A0]/10 ring-1 ring-[#00E5A0]/20">
                <ClipboardCheck className="size-8 text-[#00E5A0]" />
              </div>

              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Before we begin
              </h2>

              <p className="mt-4 leading-relaxed text-muted-foreground">
                This short questionnaire helps us understand your environment,
                tools, and compliance goals ahead of our discussion. By gathering
                this information in advance, we can tailor the conversation to
                your specific needs and ensure a more focused, efficient, and
                valuable call.
              </p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.45 }}
                className="mt-8"
              >
                <Button
                  size="lg"
                  onClick={() => setShowIntro(false)}
                  className="gap-2 px-8"
                >
                  OK, Let&apos;s Start
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div ref={topRef} className="relative min-h-[70vh]" style={{ scrollMarginTop: "100px" }}>
      {!isSubmitted && <ProgressBar currentStep={currentStep} totalSteps={TOTAL_STEPS} />}

      <div className="flex gap-10 lg:gap-12">
        {/* Left: Step content */}
        <div className="min-w-0 flex-1">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right: Diagram (desktop only) */}
        {!isSubmitted && (
          <div className="hidden w-[340px] shrink-0 xl:block">
            <QuestionnaireDiagram currentStep={currentStep} />
          </div>
        )}
      </div>
    </div>
  );
}
