import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ShieldOff } from "lucide-react"

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="flex flex-col items-center gap-6 text-center">
        <ShieldOff size={64} className="text-muted-foreground" />
        <div className="space-y-2">
          <h1 className="text-4xl font-bold">
            Page not found
          </h1>
          <p className="text-muted-foreground">
            The page you&apos;re looking for doesn&apos;t exist or has been
            moved.
          </p>
        </div>
        <div className="flex gap-3">
          <Button asChild>
            <Link href="/">Go Home</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/company#contact">Contact Support</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
