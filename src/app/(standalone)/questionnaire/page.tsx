import type { Metadata } from "next";
import { BeamsHero } from "@/components/marketing/beams-hero";
import { QuestionnaireContainer } from "@/components/questionnaire/questionnaire-container";

export const metadata: Metadata = {
  title: "Infrastructure Questionnaire",
  description:
    "Tell us about your infrastructure and compliance needs so we can tailor evidentflow.ai for your organization.",
  robots: { index: false, follow: false },
};

export default function QuestionnairePage() {
  return (
    <BeamsHero size="compact">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-12 lg:px-8">
        <QuestionnaireContainer />
      </div>
    </BeamsHero>
  );
}
