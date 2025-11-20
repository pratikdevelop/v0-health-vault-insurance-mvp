"use client"

import { useState, useEffect } from "react"

export interface StreamedHealthData {
  heartRate: number
  steps: number
  calories: number
  sleep: number
  oxygen: number
  stress: number
  timestamp: number
}

export function useWebSocketHealth() {
  const [data, setData] = useState<StreamedHealthData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const eventSource = new EventSource("/api/health/stream")

    eventSource.onopen = () => {
      console.log("[v0] SSE connection established")
      setIsConnected(true)
      setError(null)
    }

    eventSource.onmessage = (event) => {
      try {
        const healthData = JSON.parse(event.data)
        setData(healthData)
      } catch (err) {
        console.error("[v0] Failed to parse SSE data:", err)
      }
    }

    eventSource.onerror = () => {
      console.log("[v0] SSE connection error")
      setIsConnected(false)
      setError("Failed to connect to health stream")
      eventSource.close()
    }

    return () => {
      eventSource.close()
    }
  }, [])

  return {
    data,
    isConnected,
    error,
  }
}
