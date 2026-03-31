"use client";

import { motion } from "framer-motion";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface BasicInfoData {
  name: string;
  email: string;
  company: string;
  role: string;
}

interface BasicInfoStepProps {
  data: BasicInfoData;
  onChange: (field: keyof BasicInfoData, value: string) => void;
  onNext: () => void;
}

const PERSONAL_DOMAINS = [
  "gmail.com", "googlemail.com",
  "yahoo.com", "yahoo.co.uk", "yahoo.ca", "yahoo.com.au", "yahoo.co.in",
  "hotmail.com", "hotmail.co.uk",
  "outlook.com", "live.com", "msn.com",
  "aol.com",
  "icloud.com", "me.com", "mac.com",
  "mail.com",
  "protonmail.com", "proton.me",
  "zoho.com",
  "yandex.com", "yandex.ru",
  "gmx.com", "gmx.net",
  "tutanota.com", "tuta.io",
  "fastmail.com",
  "hey.com",
  "qq.com", "163.com", "126.com",
  "rediffmail.com",
  "mail.ru",
];

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isWorkEmail(email: string): boolean {
  if (!isValidEmail(email)) return false;
  const domain = email.split("@")[1]?.toLowerCase();
  return !PERSONAL_DOMAINS.includes(domain);
}

export function BasicInfoStep({ data, onChange, onNext }: BasicInfoStepProps) {
  const emailValid = isValidEmail(data.email);
  const emailIsWork = isWorkEmail(data.email);

  const canProceed =
    data.name.trim() !== "" &&
    data.email.trim() !== "" &&
    emailValid &&
    emailIsWork &&
    data.company.trim() !== "";

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Step 1 of 11
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Tell us about yourself
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          We&apos;ll use this to personalize your compliance setup.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="w-full max-w-md space-y-5"
      >
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Full Name <span className="text-[#00E5A0]">*</span>
          </label>
          <Input
            placeholder="John Doe"
            value={data.name}
            onChange={(e) => onChange("name", e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Work Email <span className="text-[#00E5A0]">*</span>
          </label>
          <Input
            type="email"
            placeholder="john@company.com"
            value={data.email}
            onChange={(e) => onChange("email", e.target.value)}
            className="h-11"
          />
          {data.email.length > 0 && !emailValid && (
            <p className="text-xs text-destructive">
              Please enter a valid email address.
            </p>
          )}
          {data.email.length > 0 && emailValid && !emailIsWork && (
            <p className="text-xs text-destructive">
              Please use your work email. Personal emails (Gmail, Yahoo, etc.) are not accepted.
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Company / Organization <span className="text-[#00E5A0]">*</span>
          </label>
          <Input
            placeholder="Acme Corp"
            value={data.company}
            onChange={(e) => onChange("company", e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Role / Job Title
          </label>
          <Input
            placeholder="CTO, VP of Engineering, etc."
            value={data.role}
            onChange={(e) => onChange("role", e.target.value)}
            className="h-11"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8"
      >
        <Button
          size="lg"
          onClick={onNext}
          disabled={!canProceed}
          className="group gap-2"
        >
          Continue
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
}
