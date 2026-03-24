import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// TODO: Replace this placeholder middleware with Clerk's authMiddleware
// once API keys are configured in environment variables.
// See: https://clerk.com/docs/references/nextjs/auth-middleware
export function middleware(_request: NextRequest) {
  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard(.*)"],
}
