"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, ArrowLeft, Plus, X, Wrench } from "lucide-react";

interface AdditionalToolsStepProps {
  tools: string[];
  onToolsChange: (tools: string[]) => void;
  onNext: () => void;
  onBack: () => void;
}

export function AdditionalToolsStep({
  tools,
  onToolsChange,
  onNext,
  onBack,
}: AdditionalToolsStepProps) {
  const [inputValue, setInputValue] = useState("");

  const addTool = () => {
    const trimmed = inputValue.trim();
    if (trimmed && !tools.includes(trimmed)) {
      onToolsChange([...tools, trimmed]);
      setInputValue("");
    }
  };

  const removeTool = (tool: string) => {
    onToolsChange(tools.filter((t) => t !== tool));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTool();
    }
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-8 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Step 9 of 11
        </span>
        <div className="mx-auto mb-4 flex size-14 items-center justify-center rounded-2xl bg-[#00E5A0]/10 text-[#00E5A0]">
          <Wrench className="size-6" />
        </div>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Any other tools?
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Add any additional tools, platforms, or services your team uses that
          weren&apos;t covered in previous steps.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.4 }}
        className="w-full max-w-lg"
      >
        <div className="flex items-center gap-2">
          <Input
            placeholder="e.g. Terraform, Ansible, Vault..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleKeyDown}
            className="h-11"
          />
          <Button
            variant="outline"
            onClick={addTool}
            disabled={!inputValue.trim()}
            className="shrink-0 gap-2"
          >
            <Plus className="size-4" />
            Add
          </Button>
        </div>

        {tools.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-5 flex flex-wrap gap-2"
          >
            {tools.map((tool, i) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.03 }}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#00E5A0]/40 bg-[#00E5A0]/5 px-3 py-1.5 text-sm text-[#00E5A0]"
              >
                {tool}
                <button
                  onClick={() => removeTool(tool)}
                  className="rounded-full p-0.5 transition-colors hover:bg-[#00E5A0]/20"
                >
                  <X className="size-3" />
                </button>
              </motion.span>
            ))}
          </motion.div>
        )}

        {tools.length === 0 && (
          <p className="mt-4 text-center text-sm text-muted-foreground">
            Type a tool name and press Enter or click Add. This step is
            optional.
          </p>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mt-8 flex items-center gap-4"
      >
        <Button variant="outline" size="lg" onClick={onBack} className="gap-2">
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <Button size="lg" onClick={onNext} className="group gap-2">
          Continue
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Button>
      </motion.div>
    </div>
  );
}
