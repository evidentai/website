import Link from "next/link";
import { Shield } from "lucide-react";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center gap-2", className)}>
      <Shield className="size-6 text-primary" />
      <span className="font-bold text-lg">
        evident.ai
      </span>
    </Link>
  );
}
