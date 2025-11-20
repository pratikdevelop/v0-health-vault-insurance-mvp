import { type NextRequest, NextResponse } from "next/server"

// Health data streaming endpoint
export async function GET(request: NextRequest) {
  const encoder = new TextEncoder()

  const customReadable = new ReadableStream({
    start(controller) {
      // Send initial data
      const initialData = {
        heartRate: 72,
        steps: 8432,
        calories: 450,
        sleep: 7.5,
        oxygen: 98,
        stress: 35,
        timestamp: Date.now(),
      }

      controller.enqueue(encoder.encode(`data: ${JSON.stringify(initialData)}\n\n`))

      // Set interval for streaming updates
      const interval = setInterval(() => {
        const update = {
          heartRate: Math.floor(Math.random() * (95 - 60) + 60),
          steps: Math.floor(Math.random() * 500) + 8432,
          calories: Math.floor(Math.random() * 100) + 450,
          oxygen: Math.floor(Math.random() * (100 - 95) + 95),
          stress: Math.floor(Math.random() * 60),
          timestamp: Date.now(),
        }

        controller.enqueue(encoder.encode(`data: ${JSON.stringify(update)}\n\n`))
      }, 3000)

      // Cleanup on connection close
      request.signal.addEventListener("abort", () => {
        clearInterval(interval)
        controller.close()
      })
    },
  })

  return new NextResponse(customReadable, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  })
}
