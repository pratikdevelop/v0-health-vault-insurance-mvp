// WebSocket provider for real-time blockchain and health data
export class WebSocketProvider {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 5
  private reconnectDelay = 3000
  private listeners: Map<string, Set<(data: any) => void>> = new Map()
  private isConnected = false

  constructor(private url: string) {}

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        this.ws = new WebSocket(this.url)

        this.ws.onopen = () => {
          console.log("[v0] WebSocket connected")
          this.isConnected = true
          this.reconnectAttempts = 0
          resolve()
        }

        this.ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            const { type, payload } = data

            if (this.listeners.has(type)) {
              this.listeners.get(type)?.forEach((callback) => {
                callback(payload)
              })
            }
          } catch (error) {
            console.error("[v0] Failed to parse WebSocket message:", error)
          }
        }

        this.ws.onerror = (error) => {
          console.error("[v0] WebSocket error:", error)
          reject(error)
        }

        this.ws.onclose = () => {
          console.log("[v0] WebSocket disconnected")
          this.isConnected = false
          this.attemptReconnect()
        }
      } catch (error) {
        reject(error)
      }
    })
  }

  private attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++
      setTimeout(() => {
        console.log(`[v0] Attempting reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`)
        this.connect().catch((error) => {
          console.error("[v0] Reconnection failed:", error)
        })
      }, this.reconnectDelay)
    }
  }

  subscribe(type: string, callback: (data: any) => void): () => void {
    if (!this.listeners.has(type)) {
      this.listeners.set(type, new Set())
    }

    this.listeners.get(type)?.add(callback)

    // Return unsubscribe function
    return () => {
      this.listeners.get(type)?.delete(callback)
    }
  }

  emit(type: string, payload: any): void {
    if (this.ws && this.isConnected) {
      this.ws.send(JSON.stringify({ type, payload }))
    } else {
      console.warn("[v0] WebSocket not connected, cannot emit:", type)
    }
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close()
      this.ws = null
      this.isConnected = false
    }
  }

  isReady(): boolean {
    return this.isConnected && this.ws?.readyState === WebSocket.OPEN
  }
}

// Singleton instance for health data streaming
let healthWsProvider: WebSocketProvider | null = null

export function getHealthWebSocketProvider(): WebSocketProvider {
  if (!healthWsProvider) {
    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:3001"
    healthWsProvider = new WebSocketProvider(wsUrl)
  }
  return healthWsProvider
}
