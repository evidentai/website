import { Button } from "@/components/ui/button";
import Link from "next/link";

export function CtaBand() {
  return (
    <section className="bg-background py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Ready to get SOC 2 ready in weeks?
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
          See how evident.ai automates evidence collection, monitors controls,
          and gets you audit-ready — no commitment required.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/book-demo">
              Book Demo
            </Link>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="group/tour relative overflow-hidden border-[#00E5A0]/30 hover:border-[#00E5A0]/60 transition-all duration-300"
          >
            <Link href="/product-tour" className="gap-2.5">
              <span
                className="flex size-7 items-center justify-center rounded-full text-xs transition-all duration-300 group-hover/tour:scale-110"
                style={{
                  background: "linear-gradient(135deg, #00E5A0 0%, #00C98B 100%)",
                  color: "#000",
                  boxShadow: "0 0 12px rgba(0,229,160,0.4)",
                }}
              >
                ▶
              </span>
              <span>Product Tour</span>
              <span
                className="absolute inset-0 -z-10 opacity-0 group-hover/tour:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(135deg, rgba(0,229,160,0.08) 0%, transparent 60%)",
                }}
              />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
