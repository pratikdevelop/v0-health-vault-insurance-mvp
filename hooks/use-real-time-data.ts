"use client"

import { useState, useEffect } from "react"
import { type HealthMetrics, healthProvider } from "@/lib/health-provider"

export function useRealTimeHealthData() {
  const [healthData, setHealthData] = useState<HealthMetrics | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(true)

    const unsubscribe = healthProvider.subscribe((data) => {
      setHealthData(data)
      setIsLoading(false)
    })

    // Trigger immediate update
    healthProvider.subscribe((data) => {
      setHealthData(data)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return { healthData, isLoading }
}
