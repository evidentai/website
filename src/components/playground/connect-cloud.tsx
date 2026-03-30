"use client";

import { motion } from "framer-motion";
import { usePlaygroundStore, type CloudProvider } from "@/lib/playground-store";

const clouds: { name: CloudProvider; logo: string; color: string }[] = [
  {
    name: "AWS",
    logo: "/images/logos/aws.svg",
    color: "#FF9900",
  },
  {
    name: "Azure",
    logo: "/images/logos/azure.svg",
    color: "#0078D4",
  },
  {
    name: "GCP",
    logo: "/images/logos/gcp.svg",
    color: "#4285F4",
  },
];

export function ConnectCloud() {
  const { selectCloud, setStep, framework } = usePlaygroundStore();

  const handleSelect = (cloud: CloudProvider) => {
    selectCloud(cloud);
    setStep("integrationSCM");
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-10 text-center"
      >
        <span className="mb-3 inline-block rounded-full bg-[#00E5A0]/10 px-4 py-1.5 text-sm text-[#00E5A0]">
          Step 2 of 6
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Connect your cloud provider
        </h2>
        <p className="mt-3 text-lg text-muted-foreground">
          Select your primary cloud. We&apos;ll simulate scanning your {framework} infrastructure.
        </p>
      </motion.div>

      <div className="grid w-full max-w-3xl grid-cols-1 gap-5 sm:grid-cols-3">
        {clouds.map((cloud, i) => (
          <motion.button
            key={cloud.name}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.15 + i * 0.12, duration: 0.4 }}
            whileHover={{ scale: 1.04, y: -6 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => handleSelect(cloud.name)}
            className="group relative flex flex-col items-center gap-4 rounded-xl border border-border/50 bg-card p-8 text-center transition-colors hover:border-transparent"
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = `0 0 40px ${cloud.color}18, 0 0 0 1px ${cloud.color}35`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <div
              className="flex size-20 items-center justify-center rounded-2xl transition-transform group-hover:scale-110"
              style={{ backgroundColor: `${cloud.color}12` }}
            >
              <img
                src={cloud.logo}
                alt={cloud.name}
                className="size-10 object-contain"
              />
            </div>
            <h3 className="text-xl font-semibold">{cloud.name}</h3>

            <div className="mt-2 flex items-center gap-2 rounded-full bg-muted/50 px-4 py-2 text-sm text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full opacity-75" style={{ backgroundColor: cloud.color }} />
                <span className="relative inline-flex size-2 rounded-full" style={{ backgroundColor: cloud.color }} />
              </span>
              Click to connect
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
