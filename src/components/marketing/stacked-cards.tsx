"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, ReactNode } from "react";

interface StackedCard {
  icon: ReactNode;
  title: string;
  description: string;
}

interface StackedCardsProps {
  cards: StackedCard[];
}

export function StackedCards({ cards }: StackedCardsProps) {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={container}
      className="relative"
      style={{ height: `${cards.length * 100 + 100}vh` }}
    >
      {cards.map((card, i) => {
        const targetScale = Math.max(0.85, 1 - (cards.length - i - 1) * 0.05);
        return (
          <CardItem
            key={card.title}
            i={i}
            card={card}
            progress={scrollYProgress}
            range={[i * 0.25, 1]}
            targetScale={targetScale}
          />
        );
      })}
    </div>
  );
}

interface CardItemProps {
  i: number;
  card: StackedCard;
  progress: any;
  range: [number, number];
  targetScale: number;
}

function CardItem({ i, card, progress, range, targetScale }: CardItemProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={containerRef}
      className="sticky top-0 flex h-screen items-center justify-center px-4"
    >
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
        }}
        className="relative w-full max-w-4xl origin-top"
      >
        <div
          className="relative overflow-hidden rounded-3xl border shadow-2xl backdrop-blur-sm"
          style={{
            background: "linear-gradient(135deg, rgba(0,229,160,0.05) 0%, rgba(0,229,160,0.02) 100%)",
          }}
        >
          {/* Decorative top gradient border */}
          <div 
            className="absolute top-0 left-0 right-0 h-1"
            style={{
              background: "linear-gradient(90deg, transparent 0%, #00E5A0 50%, transparent 100%)",
              opacity: 0.6,
            }}
          />

          {/* Decorative gradient overlay */}
          <div 
            className="absolute inset-0 opacity-40"
            style={{
              background: "radial-gradient(circle at top right, rgba(0,229,160,0.15) 0%, transparent 50%)",
            }}
          />
          
          {/* Content */}
          <div className="relative p-12 md:p-16 lg:p-20">
            <div className="flex flex-col md:flex-row items-start gap-8">
              {/* Icon */}
              <div 
                className="flex size-20 md:size-24 shrink-0 items-center justify-center rounded-3xl shadow-lg"
                style={{
                  background: "linear-gradient(135deg, rgba(0,229,160,0.25) 0%, rgba(0,229,160,0.15) 100%)",
                  boxShadow: "0 0 40px rgba(0,229,160,0.2), 0 0 80px rgba(0,229,160,0.1)",
                }}
              >
                <div className="transform transition-transform duration-500 hover:scale-110 hover:rotate-6">
                  {card.icon}
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex-1 min-w-0">
                <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
                  {card.title}
                </h3>
                <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed">
                  {card.description}
                </p>
              </div>
            </div>
          </div>

          {/* Animated border glow */}
          <div 
            className="absolute inset-0 rounded-3xl opacity-60 pointer-events-none"
            style={{
              boxShadow: "0 0 0 1px rgba(0,229,160,0.3) inset",
            }}
          />

          {/* Bottom accent */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-1"
            style={{
              background: "linear-gradient(90deg, transparent 0%, #00E5A0 50%, transparent 100%)",
              opacity: 0.4,
            }}
          />

          {/* Corner accents */}
          <div 
            className="absolute top-4 right-4 w-20 h-20 rounded-full opacity-30 blur-2xl"
            style={{
              background: "radial-gradient(circle, #00E5A0 0%, transparent 70%)",
            }}
          />
          <div 
            className="absolute bottom-4 left-4 w-32 h-32 rounded-full opacity-20 blur-3xl"
            style={{
              background: "radial-gradient(circle, #00E5A0 0%, transparent 70%)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
