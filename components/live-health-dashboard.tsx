"use client"

import { Heart, Activity, Droplets, Zap, TrendingUp } from "lucide-react"
import { Card } from "@/components/ui/card"
import { useRealTimeHealthData } from "@/hooks/use-real-time-data"

export function LiveHealthDashboard() {
  const { healthData, isLoading } = useRealTimeHealthData()

  if (!healthData) {
    return (
      <Card className="p-8 border border-border/50 bg-card/50 backdrop-blur-sm">
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-3" />
            <p className="text-muted-foreground">Loading health data...</p>
          </div>
        </div>
      </Card>
    )
  }

  const metrics = [
    {
      icon: Heart,
      label: "Heart Rate",
      value: `${healthData.heartRate}`,
      unit: "BPM",
      color: "text-red-500",
      bg: "bg-red-500/10",
      trend: "normal",
    },
    {
      icon: Activity,
      label: "Steps",
      value: `${healthData.steps.toLocaleString()}`,
      unit: "steps",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      trend: "up",
    },
    {
      icon: Droplets,
      label: "Calories",
      value: `${healthData.calories}`,
      unit: "kcal",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
      trend: "up",
    },
    {
      icon: Zap,
      label: "Sleep",
      value: `${healthData.sleep}`,
      unit: "hrs",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
      trend: "optimal",
    },
    {
      icon: Activity,
      label: "Oxygen",
      value: `${healthData.oxygen}`,
      unit: "%",
      color: "text-green-500",
      bg: "bg-green-500/10",
      trend: "normal",
    },
    {
      icon: TrendingUp,
      label: "Stress",
      value: `${healthData.stress}`,
      unit: "%",
      color: "text-yellow-500",
      bg: "bg-yellow-500/10",
      trend: "low",
    },
  ]

  return (
    <Card className="p-8 border border-border/50 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-foreground">Live Health Metrics</h2>
        <div className="flex items-center gap-2 text-sm text-green-500">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Real-time</span>
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {metrics.map((metric, i) => (
          <div
            key={i}
            className="p-6 bg-gradient-to-br from-background to-muted/30 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 group hover:scale-105"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <div className={`p-2 rounded-lg ${metric.bg} group-hover:scale-110 transition-transform`}>
                <metric.icon className={`w-4 h-4 ${metric.color}`} />
              </div>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {metric.value}
              </span>
              <span className="text-sm text-muted-foreground">{metric.unit}</span>
            </div>
            <div className="w-full bg-muted rounded-full h-1 mt-3">
              <div
                className={`h-1 rounded-full transition-all duration-1000 ${
                  metric.trend === "up" ? "bg-green-500" : metric.trend === "optimal" ? "bg-blue-500" : "bg-yellow-500"
                }`}
                style={{ width: `${Math.min(100, (Number.parseInt(metric.value) / 200) * 100)}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
