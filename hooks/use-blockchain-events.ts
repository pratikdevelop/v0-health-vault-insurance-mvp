"use client"

import { useState, useEffect, useCallback } from "react"

export interface BlockchainEvent {
  type: "deposit" | "payout" | "trigger" | "poolUpdate"
  user: string
  amount: string
  timestamp: number
  transactionHash: string
  poolId?: number
}

export function useBlockchainEvents(address: string | null) {
  const [events, setEvents] = useState<BlockchainEvent[]>([])
  const [isListening, setIsListening] = useState(false)

  const addEvent = useCallback((event: BlockchainEvent) => {
    setEvents((prev) => [event, ...prev].slice(0, 50)) // Keep last 50 events
  }, [])

  useEffect(() => {
    if (!address) return

    setIsListening(true)
    console.log("[v0] Listening for blockchain events from:", address)

    // Simulate blockchain event listener
    // In production, this would connect to Ethers.js contract events
    const interval = setInterval(() => {
      // Random event simulation for demo
      if (Math.random() > 0.7) {
        const eventTypes: BlockchainEvent["type"][] = ["deposit", "payout", "trigger", "poolUpdate"]
        const randomEvent: BlockchainEvent = {
          type: eventTypes[Math.floor(Math.random() * eventTypes.length)],
          user: address,
          amount: (Math.random() * 1000 + 50).toFixed(2),
          timestamp: Date.now(),
          transactionHash: `0x${Math.random().toString(16).slice(2).padEnd(64, "0")}`,
          poolId: Math.floor(Math.random() * 3) + 1,
        }
        addEvent(randomEvent)
      }
    }, 10000)

    return () => {
      clearInterval(interval)
      setIsListening(false)
    }
  }, [address, addEvent])

  return {
    events,
    isListening,
  }
}
