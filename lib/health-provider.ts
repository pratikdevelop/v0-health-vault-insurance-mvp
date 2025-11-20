// Real-time health data provider
export interface HealthMetrics {
  heartRate: number
  steps: number
  calories: number
  sleep: number
  oxygen: number
  stress: number
  timestamp: number
}

export class HealthDataProvider {
  private updateListeners: ((data: HealthMetrics) => void)[] = []
  private interval: NodeJS.Timeout | null = null

  subscribe(callback: (data: HealthMetrics) => void) {
    this.updateListeners.push(callback)

    // Start polling if this is the first subscriber
    if (this.updateListeners.length === 1) {
      this.startPolling()
    }

    // Return unsubscribe function
    return () => {
      this.updateListeners = this.updateListeners.filter((cb) => cb !== callback)
      if (this.updateListeners.length === 0) {
        this.stopPolling()
      }
    }
  }

  private startPolling() {
    this.interval = setInterval(() => {
      const metrics = this.generateHealthMetrics()
      this.updateListeners.forEach((callback) => callback(metrics))
    }, 3000) // Update every 3 seconds
  }

  private stopPolling() {
    if (this.interval) {
      clearInterval(this.interval)
      this.interval = null
    }
  }

  private generateHealthMetrics(): HealthMetrics {
    // Simulate realistic health data with slight variations
    return {
      heartRate: Math.floor(Math.random() * (95 - 60) + 60),
      steps: Math.floor(Math.random() * 500) + 8000,
      calories: Math.floor(Math.random() * 100) + 350,
      sleep: Math.round((Math.random() * 3 + 6) * 10) / 10,
      oxygen: Math.floor(Math.random() * (100 - 95) + 95),
      stress: Math.floor(Math.random() * 60),
      timestamp: Date.now(),
    }
  }

  async fetchFromWearable(deviceId: string): Promise<HealthMetrics> {
    // This would connect to actual wearable APIs (Fitbit, Apple Health, Garmin, etc.)
    // For now, returning simulated data
    try {
      const response = await fetch(`/api/wearable/health?deviceId=${deviceId}`)
      return await response.json()
    } catch (error) {
      console.error("Failed to fetch wearable data:", error)
      return this.generateHealthMetrics()
    }
  }
}

export const healthProvider = new HealthDataProvider()
