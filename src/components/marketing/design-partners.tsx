"use client";

import { useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const partners = [
  {
    name: "InfoGuard Security",
    url: "https://www.infoguardsecurity.com/",
    description:
      "Cybersecurity and risk management firm working with us to validate compliance workflows in real-world environments.",
    logo: "/images/partners/infoguard.png",
    initial: "I",
    color: "#3B82F6",
  },
  {
    name: "ValueAligners",
    url: "https://valuealigners.com/",
    description:
      "Advisory firm helping shape how governance and compliance align with real business operations.",
    logo: "/images/partners/valuealigners.png",
    initial: "V",
    color: "#8B5CF6",
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: [0.25, 0.4, 0.25, 1] as [number, number, number, number],
    },
  }),
};

function ShimmerCard({
  partner,
  index,
  isInView,
}: {
  partner: (typeof partners)[number];
  index: number;
  isInView: boolean;
}) {
  const borderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = borderRef.current;
    if (!el) return;
    let start = index * 180;
    let f: number;
    const tick = () => {
      start = (start + 0.15) % 360;
      el.style.background = `conic-gradient(from ${start}deg at 50% 50%, rgba(0,229,160,0.01) 0%, rgba(0,229,160,0.25) 8%, rgba(0,229,160,0.01) 16%, rgba(0,229,160,0.0) 50%, rgba(0,229,160,0.01) 84%, rgba(0,229,160,0.25) 92%, rgba(0,229,160,0.01) 100%)`;
      f = requestAnimationFrame(tick);
    };
    f = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(f);
  }, [index]);

  return (
    <motion.a
      href={partner.url}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      custom={index}
      className="group relative flex flex-col rounded-2xl p-[1px] transition-transform duration-500 ease-out hover:scale-[1.02]"
    >
      {/* Shimmer border — mutated via ref for 60fps without re-renders */}
      <div
        ref={borderRef}
        className="absolute inset-0 rounded-2xl opacity-60 transition-opacity duration-700 group-hover:opacity-100"
      />

      {/* Soft ambient glow */}
      <div
        className="pointer-events-none absolute -inset-1 rounded-2xl opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
        style={{ background: "rgba(0,229,160,0.06)" }}
      />

      {/* Inner glass surface */}
      <div
        className="relative flex flex-1 flex-col rounded-[15px] px-6 pb-6 pt-4"
        style={{
          background:
            "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)",
          backdropFilter: "blur(20px) saturate(1.5)",
          WebkitBackdropFilter: "blur(20px) saturate(1.5)",
          boxShadow:
            "inset 0 1px 0 0 rgba(255,255,255,0.06), inset 0 -1px 0 0 rgba(255,255,255,0.02)",
        }}
      >
        {/* Top row: logo + arrow */}
        <div className="mb-4 flex items-center justify-between">
          {partner.logo ? (
            <img
              src={partner.logo}
              alt={partner.name}
              className="h-26 w-auto max-w-[200px] object-contain"
            />
          ) : (
            <div
              className="flex h-16 w-16 items-center justify-center rounded-lg text-xl font-bold text-white"
              style={{
                background: `linear-gradient(135deg, ${partner.color}, ${partner.color}cc)`,
                boxShadow: `0 4px 12px ${partner.color}33`,
              }}
            >
              {partner.initial}
            </div>
          )}
          <ArrowUpRight className="size-5 text-muted-foreground/50 transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#00E5A0]" />
        </div>

        <h3 className="mb-2 text-lg font-semibold text-foreground">
          {partner.name}
        </h3>

        <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
          {partner.description}
        </p>
      </div>
    </motion.a>
  );
}

export function DesignPartners() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-primary/[0.02] to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-14 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Design partners
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            We&apos;re building EvidentFlow alongside organizations solving real
            compliance challenges
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {partners.map((partner, index) => (
            <ShimmerCard
              key={partner.name}
              partner={partner}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
