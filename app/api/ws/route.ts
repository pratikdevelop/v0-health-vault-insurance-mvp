import { type NextRequest, NextResponse } from "next/server"

// WebSocket upgrade handler - NOT USED in Next.js but kept for reference
export async function GET(request: NextRequest) {
  // In Next.js, we use Server-Sent Events instead
  // This endpoint serves as documentation
  return NextResponse.json({
    message: "WebSocket endpoint",
    note: "Use /api/health/stream for SSE-based real-time updates",
  })
}
