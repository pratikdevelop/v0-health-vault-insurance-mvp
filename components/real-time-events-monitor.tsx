"use client"

import { useBlockchainEvents } from "@/hooks/use-blockchain-events"
import { useWebSocketHealth } from "@/hooks/use-websocket-health"
import { Card } from "@/components/ui/card"
import { Activity, TrendingUp, Zap, AlertCircle } from "lucide-react"

interface RealTimeEventsMonitorProps {
  address: string | null
}

export function RealTimeEventsMonitor({ address }: RealTimeEventsMonitorProps) {
  const { events } = useBlockchainEvents(address)
  const { data: streamData, isConnected } = useWebSocketHealth()

  if (!events.length && !streamData) {
    return null
  }

  return (
    <Card className="p-6 border border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-bold text-foreground">Live Events</h3>
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full animate-pulse ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
          <span className="text-xs text-muted-foreground">{isConnected ? "Connected" : "Disconnected"}</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {events.map((event, i) => (
          <div
            key={`${event.timestamp}-${i}`}
            className="flex items-start gap-3 p-3 bg-gradient-to-r from-background to-muted/30 rounded-lg border border-border/50 hover:border-primary/30 transition-all duration-300"
          >
            <div className="flex-shrink-0 mt-1">
              {event.type === "deposit" && <TrendingUp className="w-4 h-4 text-blue-500" />}
              {event.type === "payout" && <Zap className="w-4 h-4 text-green-500" />}
              {event.type === "trigger" && <AlertCircle className="w-4 h-4 text-yellow-500" />}
              {event.type === "poolUpdate" && <Activity className="w-4 h-4 text-purple-500" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 mb-1">
                <p className="text-sm font-medium text-foreground capitalize">{event.type}</p>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
              </div>
              <p className="text-xs text-muted-foreground truncate">{event.transactionHash}</p>
              <p className="text-xs font-medium text-foreground mt-1">${event.amount}</p>
            </div>
          </div>
        ))}
        {events.length === 0 && <p className="text-sm text-muted-foreground text-center py-4">No events yet</p>}
      </div>
    </Card>
  )
}
