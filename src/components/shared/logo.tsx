import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center", className)}>
      <Image
        src="/images/logo.svg"
        alt="evidentflow.ai"
        width={180}
        height={42}
        priority
      />
    </Link>
  );
}
