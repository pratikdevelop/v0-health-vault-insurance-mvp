"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { X, Plus, Heart } from "lucide-react"

interface CreatePoolModalProps {
  isOpen: boolean
  onClose: () => void
  onCreatePool: (poolData: {
    name: string
    trigger: string
    premium: number
    coverage: number
  }) => void
  isLoading?: boolean
}

export function CreatePoolModal({ isOpen, onClose, onCreatePool, isLoading }: CreatePoolModalProps) {
  const [poolName, setPoolName] = useState("")
  const [trigger, setTrigger] = useState("")
  const [premium, setPremium] = useState("")
  const [coverage, setCoverage] = useState("")

  const handleSubmit = () => {
    if (!poolName || !trigger || !premium || !coverage) {
      alert("Please fill all fields")
      return
    }

    onCreatePool({
      name: poolName,
      trigger,
      premium: Number.parseFloat(premium),
      coverage: Number.parseFloat(coverage),
    })

    // Reset form
    setPoolName("")
    setTrigger("")
    setPremium("")
    setCoverage("")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md border border-border/50 bg-card">
        <div className="p-6 border-b border-border/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Plus className="w-5 h-5 text-primary-foreground" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Create Insurance Pool</h2>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-muted rounded-lg transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Pool Name</label>
            <Input
              placeholder="e.g., Active Lifestyle"
              value={poolName}
              onChange={(e) => setPoolName(e.target.value)}
              className="bg-background/50 border-border/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Health Trigger</label>
            <Input
              placeholder="e.g., HR >120 BPM for 5min"
              value={trigger}
              onChange={(e) => setTrigger(e.target.value)}
              className="bg-background/50 border-border/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Monthly Premium ($)</label>
            <Input
              type="number"
              placeholder="e.g., 50"
              value={premium}
              onChange={(e) => setPremium(e.target.value)}
              className="bg-background/50 border-border/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Coverage ($)</label>
            <Input
              type="number"
              placeholder="e.g., 500"
              value={coverage}
              onChange={(e) => setCoverage(e.target.value)}
              className="bg-background/50 border-border/50"
            />
          </div>

          <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
            <p className="text-xs text-muted-foreground mb-2">Pool Details Preview:</p>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="text-foreground font-medium">{poolName || "Not set"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Premium:</span>
                <span className="text-foreground font-medium">${premium || "0"}/month</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Coverage:</span>
                <span className="text-foreground font-medium">${coverage || "0"}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-border/50 flex gap-3">
          <Button variant="outline" className="flex-1 border-border/50 hover:bg-muted bg-transparent" onClick={onClose}>
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                Creating...
              </>
            ) : (
              <>
                <Heart className="w-4 h-4 mr-2" />
                Create Pool
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}
