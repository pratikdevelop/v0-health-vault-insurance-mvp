"use client"

import { useState, useEffect } from "react"
import { Activity, Heart, Droplets, Zap, TrendingUp, Wallet, Send, ArrowDownRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"

interface HealthData {
  heartRate: number
  steps: number
  calories: number
  sleep: number
}

interface UserData {
  balance: number
  poolsJoined: number
  monthlyPaid: number
  totalPaid: number
}

export default function Dashboard() {
  const [connected, setConnected] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")
  const [depositAmount, setDepositAmount] = useState("")

  // Mock health data
  const [healthData, setHealthData] = useState<HealthData>({
    heartRate: 72,
    steps: 8432,
    calories: 450,
    sleep: 7.5,
  })

  // Mock user data
  const [userData] = useState<UserData>({
    balance: 2450.5,
    poolsJoined: 2,
    monthlyPaid: 150,
    totalPaid: 850,
  })

  // Simulate real-time health data updates
  useEffect(() => {
    const interval = setInterval(() => {
      setHealthData((prev) => ({
        ...prev,
        heartRate: Math.floor(Math.random() * (95 - 60) + 60),
        steps: Math.floor(Math.random() * (15000 - 5000) + 5000),
        calories: Math.floor(Math.random() * (600 - 200) + 200),
      }))
    }, 5000)
    return () => clearInterval(interval)
  }, [])

  const handleDeposit = () => {
    if (depositAmount) {
      alert(`Deposit of $${depositAmount} initiated. Transaction pending on blockchain...`)
      setDepositAmount("")
    }
  }

  const handleConnectWallet = () => {
    setConnected(true)
  }

  if (!connected) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8 border border-border">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Wallet className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Connect Your Wallet</h1>
            <p className="text-muted-foreground">Start your HealthVault journey by connecting your Web3 wallet</p>
          </div>
          <Button onClick={handleConnectWallet} size="lg" className="w-full mb-4">
            Connect MetaMask
          </Button>
          <Button variant="outline" size="lg" className="w-full mb-4 bg-transparent">
            Connect WalletConnect
          </Button>
          <Button variant="outline" size="lg" className="w-full bg-transparent">
            Use Test Account
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-6">
            Supported on Polygon, Celo, and Ethereum networks
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-semibold text-foreground">HealthVault</span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Wallet Balance</p>
              <p className="font-semibold text-foreground">${userData.balance}</p>
            </div>
            <Button variant="outline" size="sm">
              Disconnect
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Pools", value: userData.poolsJoined, icon: Activity },
            { label: "Monthly Premium", value: `$${userData.monthlyPaid}`, icon: Zap },
            { label: "This Month Earned", value: "$0", icon: TrendingUp },
            { label: "Total Earned", value: `$${userData.totalPaid}`, icon: Wallet },
          ].map((stat, i) => (
            <Card key={i} className="p-6 border border-border">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                </div>
                <stat.icon className="w-6 h-6 text-primary/50" />
              </div>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Health Metrics */}
            <Card className="p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Live Health Metrics</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {[
                  {
                    icon: Heart,
                    label: "Heart Rate",
                    value: `${healthData.heartRate}`,
                    unit: "BPM",
                    color: "text-red-500",
                  },
                  {
                    icon: Activity,
                    label: "Steps",
                    value: `${healthData.steps.toLocaleString()}`,
                    unit: "steps",
                    color: "text-blue-500",
                  },
                  {
                    icon: Droplets,
                    label: "Calories",
                    value: `${healthData.calories}`,
                    unit: "kcal",
                    color: "text-orange-500",
                  },
                  { icon: Zap, label: "Sleep", value: `${healthData.sleep}`, unit: "hrs", color: "text-purple-500" },
                ].map((metric, i) => (
                  <div key={i} className="p-6 bg-muted/50 rounded-lg border border-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{metric.label}</span>
                      <metric.icon className={`w-5 h-5 ${metric.color}`} />
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-foreground">{metric.value}</span>
                      <span className="text-sm text-muted-foreground">{metric.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Active Pools */}
            <Card className="p-8 border border-border">
              <h2 className="text-2xl font-bold text-foreground mb-6">Your Pools</h2>
              <div className="space-y-4">
                {[
                  { name: "Active Pool", premium: 50, balance: 1500, status: "active", trigger: "HR >120" },
                  { name: "Wellness Pool", premium: 100, balance: 950.5, status: "active", trigger: "Sleep <6hrs" },
                ].map((pool, i) => (
                  <div
                    key={i}
                    className="p-6 bg-muted/50 rounded-lg border border-border flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{pool.name}</h3>
                      <p className="text-sm text-muted-foreground">Trigger: {pool.trigger}</p>
                    </div>
                    <div className="text-right mr-4">
                      <p className="text-lg font-bold text-primary">${pool.balance}</p>
                      <p className="text-xs text-muted-foreground">${pool.premium}/month</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full" />
                      <span className="text-sm text-green-600">Active</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Deposit Card */}
            <Card className="p-8 border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5">
              <h3 className="text-lg font-bold text-foreground mb-6">Deposit Premium</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Amount (USD)</label>
                  <div className="relative flex">
                    <span className="absolute left-3 top-3 text-foreground">$</span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="pl-7"
                    />
                  </div>
                </div>
                <div className="bg-muted/50 p-4 rounded border border-border">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Gas Fee (est.)</span>
                    <span className="text-foreground">$2.50</span>
                  </div>
                  <div className="flex justify-between text-sm border-t border-border pt-2">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="font-bold text-foreground">
                      ${depositAmount ? (Number.parseFloat(depositAmount) + 2.5).toFixed(2) : "2.50"}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleDeposit}
                  className="w-full"
                  disabled={!depositAmount || Number.parseFloat(depositAmount) <= 0}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Deposit Now
                </Button>
              </div>
            </Card>

            {/* Recent Transactions */}
            <Card className="p-8 border border-border">
              <h3 className="text-lg font-bold text-foreground mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { type: "deposit", amount: 100, date: "2 hours ago", status: "confirmed" },
                  { type: "payout", amount: 250, date: "1 day ago", status: "confirmed" },
                  { type: "deposit", amount: 150, date: "3 days ago", status: "confirmed" },
                ].map((tx, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === "deposit" ? "bg-blue-500/20" : "bg-green-500/20"
                        }`}
                      >
                        <ArrowDownRight
                          className={tx.type === "deposit" ? "w-5 h-5 text-blue-500" : "w-5 h-5 text-green-500"}
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground capitalize">{tx.type}</p>
                        <p className="text-xs text-muted-foreground">{tx.date}</p>
                      </div>
                    </div>
                    <p className="font-semibold text-foreground">${tx.amount}</p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Network Info */}
            <Card className="p-6 border border-border bg-muted/50">
              <h4 className="text-sm font-semibold text-foreground mb-4">Network Info</h4>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Network</span>
                  <span className="text-foreground font-medium">Polygon</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chain ID</span>
                  <span className="text-foreground font-medium">137</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Gas Price</span>
                  <span className="text-foreground font-medium">45 Gwei</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
