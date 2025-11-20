"use client"

import { useState, useEffect } from "react"
import {
  Activity,
  Heart,
  Droplets,
  Zap,
  TrendingUp,
  Wallet,
  Send,
  ArrowDownRight,
  ArrowUpRight,
  Shield,
  Cpu,
  Wifi,
  Battery,
  Settings,
  Bell,
  User,
  LogOut,
  Plus,
  MoreVertical,
  Eye,
  EyeOff,
  Smartphone,
} from "lucide-react"
import { useWallet } from "@/hooks/use-wallet"
import { useSmartContract } from "@/hooks/use-smart-contract"
import { useRealTimeHealthData } from "@/hooks/use-real-time-data"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { RealTimeEventsMonitor } from "@/components/real-time-events-monitor"

interface HealthData {
  heartRate: number
  steps: number
  calories: number
  sleep: number
  oxygen: number
  stress: number
}

interface UserData {
  balance: number
  poolsJoined: number
  monthlyPaid: number
  totalPaid: number
  totalEarned: number
}

interface Pool {
  name: string
  premium: number
  balance: number
  status: "active" | "pending" | "inactive"
  trigger: string
  coverage: number
  progress: number
}

interface Transaction {
  hash: string
  status: "pending" | "confirming" | "confirmed" | "failed"
  amount: number
  poolId: number
  timestamp: number
}

export default function Dashboard() {
  const { address, isConnected, connectWallet, isConnecting, chainId, balance, connectDemoAccount } = useWallet()
  const { deposit, depositState } = useSmartContract(address || null, chainId || null)
  const { healthData, isLoading } = useRealTimeHealthData()

  const [activeTab, setActiveTab] = useState("overview")
  const [depositAmount, setDepositAmount] = useState("")
  const [showBalance, setShowBalance] = useState(true)
  const [selectedPoolId, setSelectedPoolId] = useState(1)
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [poolsData, setPoolsData] = useState<any[]>([])

  useEffect(() => {
    fetchPoolsData()
  }, [])

  useEffect(() => {
    if (depositState.hash && depositState.status) {
      setTransactions((prev) => [
        {
          hash: depositState.hash!,
          status: depositState.status as any,
          amount: Number.parseFloat(depositAmount) || 0,
          poolId: selectedPoolId,
          timestamp: Date.now(),
        },
        ...prev,
      ])
    }
  }, [depositState.hash, depositState.status])

  const fetchPoolsData = async () => {
    try {
      const response = await fetch("/api/pools/info")
      const data = await response.json()
      setPoolsData(data)
    } catch (error) {
      console.error("Failed to fetch pools:", error)
    }
  }

  const displayHealthData: HealthData = healthData || {
    heartRate: 72,
    steps: 8432,
    calories: 450,
    sleep: 7.5,
    oxygen: 98,
    stress: 35,
  }

  const userData: UserData = {
    balance: Number.parseFloat(balance || "0"),
    poolsJoined: 2,
    monthlyPaid: 150,
    totalPaid: 850,
    totalEarned: 1250,
  }

  const pools: Pool[] =
    poolsData.length > 0
      ? poolsData.map((pool) => ({
          name: pool.name,
          premium: pool.payoutAmount / 10,
          balance: pool.totalStaked / 100,
          status: pool.isActive ? "active" : "inactive",
          trigger: pool.trigger,
          coverage: pool.payoutAmount,
          progress: Math.min(100, (pool.members / 500) * 100),
        }))
      : [
          {
            name: "Active Lifestyle",
            premium: 50,
            balance: 1500,
            status: "active",
            trigger: "HR >120 BPM for 5min",
            coverage: 500,
            progress: 75,
          },
          {
            name: "Sleep Wellness",
            premium: 100,
            balance: 950.5,
            status: "active",
            trigger: "Sleep <6hrs for 7 days",
            coverage: 1000,
            progress: 45,
          },
          {
            name: "Stress Relief",
            premium: 75,
            balance: 0,
            status: "pending",
            trigger: "Stress >80% for 1hr",
            coverage: 750,
            progress: 0,
          },
        ]

  const handleDeposit = async () => {
    if (!depositAmount || !address) {
      alert("Please enter amount and connect wallet")
      return
    }

    const result = await deposit(depositAmount, selectedPoolId)
    if (result) {
      setDepositAmount("")
    }
  }

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30 flex items-center justify-center px-4 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <Card className="w-full max-w-md p-8 border border-border/50 bg-card/80 backdrop-blur-sm shadow-2xl transform hover:scale-105 transition-all duration-500">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg animate-pulse">
              <Heart className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Welcome to HealthVault
            </h1>
            <p className="text-muted-foreground">Start your HealthVault journey by connecting your Web3 wallet</p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={connectWallet}
              size="lg"
              className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-105 shadow-lg"
              disabled={isConnecting}
            >
              {isConnecting ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Connecting...
                </div>
              ) : (
                <>
                  <Wallet className="w-5 h-5 mr-2" />
                  Connect MetaMask
                </>
              )}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full bg-transparent border-2 hover:bg-accent/10 transition-all duration-300"
              disabled
              title="WalletConnect integration coming soon"
            >
              <Smartphone className="w-5 h-5 mr-2" />
              Connect WalletConnect (Coming Soon)
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-full bg-transparent border-2 hover:bg-primary/10 transition-all duration-300"
              onClick={connectDemoAccount}
            >
              <User className="w-5 h-5 mr-2" />
              Try Demo Account
            </Button>
          </div>

          <div className="mt-8 p-4 bg-muted/50 rounded-lg border border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <Shield className="w-4 h-4" />
              <span>Secure Connection</span>
            </div>
            <p className="text-xs text-center text-muted-foreground">
              Supported on Polygon, Celo, and Ethereum networks
            </p>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/30">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                HealthVault
              </span>
            </Link>

            <nav className="hidden md:flex items-center gap-6 ml-8">
              {["Overview", "Pools", "Analytics", "History"].map((item) => (
                <button
                  key={item}
                  className={`text-sm font-medium transition-all duration-300 hover:text-primary relative ${
                    activeTab === item.toLowerCase() ? "text-primary" : "text-muted-foreground"
                  }`}
                  onClick={() => setActiveTab(item.toLowerCase())}
                >
                  {item}
                  {activeTab === item.toLowerCase() && (
                    <span className="absolute -bottom-6 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
            </Button>

            <div className="flex items-center gap-3 bg-muted/50 px-4 py-2 rounded-lg border border-border">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowBalance(!showBalance)}
                className="w-6 h-6 hover:bg-transparent"
              >
                {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
              </Button>
              <div className="text-right">
                <p className="text-xs text-muted-foreground">Wallet Balance</p>
                <p className="font-semibold text-foreground">
                  {showBalance ? `${balance ? Number.parseFloat(balance).toFixed(2) : "0.00"} ETH` : "•••••"}
                </p>
              </div>
            </div>

            <Button variant="outline" size="sm" className="gap-2 bg-transparent">
              <LogOut className="w-4 h-4" />
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome & Quick Stats */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back!</h1>
              <p className="text-muted-foreground">Your health is actively being monitored and protected</p>
            </div>
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Wifi className="w-4 h-4 text-green-500" />
                <span>Device Connected</span>
              </div>
              <div className="flex items-center gap-1">
                <Battery className="w-4 h-4 text-green-500" />
                <span>85%</span>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            {[
              {
                label: "Active Pools",
                value: userData.poolsJoined,
                icon: Activity,
                change: "+2",
                color: "text-blue-500",
              },
              {
                label: "Monthly Premium",
                value: `$${userData.monthlyPaid}`,
                icon: Zap,
                change: "+$50",
                color: "text-purple-500",
              },
              {
                label: "Total Earned",
                value: `$${userData.totalEarned}`,
                icon: TrendingUp,
                change: "+$250",
                color: "text-green-500",
              },
              {
                label: "Lifetime Value",
                value: `$${userData.totalPaid}`,
                icon: Wallet,
                change: "+12%",
                color: "text-orange-500",
              },
            ].map((stat, i) => (
              <Card
                key={i}
                className="p-6 border border-border/50 hover:border-primary/30 transition-all duration-300 group hover:scale-105"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all">
                      {stat.value}
                    </p>
                    <div className="flex items-center gap-1 mt-1">
                      <ArrowUpRight className="w-3 h-3 text-green-500" />
                      <span className="text-xs text-green-500">{stat.change}</span>
                    </div>
                  </div>
                  <div className="p-2 bg-muted rounded-lg group-hover:bg-primary/10 transition-colors">
                    <stat.icon className={`w-5 h-5 ${stat.color}`} />
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <RealTimeEventsMonitor address={address} />

            {/* Live Health Metrics with real data */}
            <Card className="p-8 border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Live Health Metrics</h2>
                <div className="flex items-center gap-2 text-sm text-green-500">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span>Real-time</span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  {
                    icon: Heart,
                    label: "Heart Rate",
                    value: `${displayHealthData.heartRate}`,
                    unit: "BPM",
                    color: "text-red-500",
                    bg: "bg-red-500/10",
                    trend: "normal",
                  },
                  {
                    icon: Activity,
                    label: "Steps",
                    value: `${displayHealthData.steps.toLocaleString()}`,
                    unit: "steps",
                    color: "text-blue-500",
                    bg: "bg-blue-500/10",
                    trend: "up",
                  },
                  {
                    icon: Droplets,
                    label: "Calories",
                    value: `${displayHealthData.calories}`,
                    unit: "kcal",
                    color: "text-orange-500",
                    bg: "bg-orange-500/10",
                    trend: "up",
                  },
                  {
                    icon: Zap,
                    label: "Sleep",
                    value: `${displayHealthData.sleep}`,
                    unit: "hrs",
                    color: "text-purple-500",
                    bg: "bg-purple-500/10",
                    trend: "optimal",
                  },
                  {
                    icon: Activity,
                    label: "Oxygen",
                    value: `${displayHealthData.oxygen}`,
                    unit: "%",
                    color: "text-green-500",
                    bg: "bg-green-500/10",
                    trend: "normal",
                  },
                  {
                    icon: TrendingUp,
                    label: "Stress",
                    value: `${displayHealthData.stress}`,
                    unit: "%",
                    color: "text-yellow-500",
                    bg: "bg-yellow-500/10",
                    trend: "low",
                  },
                ].map((metric, i) => (
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
                          metric.trend === "up"
                            ? "bg-green-500"
                            : metric.trend === "optimal"
                              ? "bg-blue-500"
                              : "bg-yellow-500"
                        }`}
                        style={{ width: `${Math.min(100, (Number.parseInt(metric.value) / 200) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Active Pools */}
            <Card className="p-8 border border-border/50 bg-card/50 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-foreground">Your Insurance Pools</h2>
                <Button className="gap-2 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  <Plus className="w-4 h-4" />
                  New Pool
                </Button>
              </div>

              <div className="space-y-4">
                {pools.map((pool, i) => (
                  <div
                    key={i}
                    className="p-6 bg-gradient-to-br from-background to-muted/30 rounded-xl border border-border/50 hover:border-primary/30 transition-all duration-300 group hover:scale-105 cursor-pointer"
                    onClick={() => setSelectedPoolId(i + 1)}
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                            {pool.name}
                          </h3>
                          <div
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              pool.status === "active"
                                ? "bg-green-500/20 text-green-600"
                                : "bg-yellow-500/20 text-yellow-600"
                            }`}
                          >
                            {pool.status.charAt(0).toUpperCase() + pool.status.slice(1)}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground">Trigger: {pool.trigger}</p>
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>

                    <div className="grid md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Pool Balance</p>
                        <p className="text-lg font-bold text-primary">${pool.balance.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Monthly Premium</p>
                        <p className="text-lg font-bold text-foreground">${pool.premium}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground mb-1">Coverage</p>
                        <p className="text-lg font-bold text-accent">${pool.coverage}</p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Pool Progress</span>
                        <span className="text-foreground font-medium">{Math.round(pool.progress)}%</span>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-gradient-to-r from-primary to-accent transition-all duration-1000"
                          style={{ width: `${pool.progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <Card className="p-8 border border-primary/30 bg-gradient-to-br from-primary/5 to-accent/5 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-foreground mb-6">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                <Button className="h-16 flex-col gap-2 bg-background/50 border border-border/50 hover:border-primary/30">
                  <Send className="w-5 h-5" />
                  <span className="text-xs">Deposit</span>
                </Button>
                <Button className="h-16 flex-col gap-2 bg-background/50 border border-border/50 hover:border-primary/30">
                  <ArrowDownRight className="w-5 h-5" />
                  <span className="text-xs">Withdraw</span>
                </Button>
                <Button className="h-16 flex-col gap-2 bg-background/50 border border-border/50 hover:border-primary/30">
                  <Plus className="w-5 h-5" />
                  <span className="text-xs">New Pool</span>
                </Button>
                <Button className="h-16 flex-col gap-2 bg-background/50 border border-border/50 hover:border-primary/30">
                  <Settings className="w-5 h-5" />
                  <span className="text-xs">Settings</span>
                </Button>
              </div>
            </Card>

            {/* Deposit Card with real contract interaction */}
            <Card className="p-8 border border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-foreground mb-6">Deposit Premium</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Pool</label>
                  <select
                    value={selectedPoolId}
                    onChange={(e) => setSelectedPoolId(Number.parseInt(e.target.value))}
                    className="w-full px-3 py-2 bg-background/50 border border-border/50 rounded-lg text-foreground"
                  >
                    {pools.map((pool, i) => (
                      <option key={i} value={i + 1}>
                        {pool.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">Amount (USD)</label>
                  <div className="relative flex">
                    <span className="absolute left-3 top-3 text-foreground">$</span>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={depositAmount}
                      onChange={(e) => setDepositAmount(e.target.value)}
                      className="pl-7 bg-background/50 border-border/50"
                    />
                  </div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg border border-border/50">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Gas Fee (est.)</span>
                    <span className="text-foreground">$2.50</span>
                  </div>
                  {depositState.hash && (
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Tx Status</span>
                      <span
                        className={`font-medium ${depositState.status === "confirmed" ? "text-green-500" : "text-yellow-500"}`}
                      >
                        {depositState.status}
                      </span>
                    </div>
                  )}
                  <div className="flex justify-between text-sm border-t border-border/50 pt-2">
                    <span className="font-medium text-foreground">Total</span>
                    <span className="font-bold text-foreground">
                      ${depositAmount ? (Number.parseFloat(depositAmount) + 2.5).toFixed(2) : "2.50"}
                    </span>
                  </div>
                </div>
                <Button
                  onClick={handleDeposit}
                  className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 transition-all duration-300 hover:scale-105"
                  disabled={!depositAmount || Number.parseFloat(depositAmount) <= 0 || depositState.isLoading}
                >
                  {depositState.isLoading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Deposit Now
                    </>
                  )}
                </Button>
                {depositState.error && <p className="text-sm text-red-500">{depositState.error}</p>}
              </div>
            </Card>

            {/* Recent Transactions */}
            <Card className="p-8 border border-border/50 bg-card/50 backdrop-blur-sm">
              <h3 className="text-lg font-bold text-foreground mb-6">Recent Activity</h3>
              <div className="space-y-4">
                {transactions.length > 0 ? (
                  transactions.map((tx, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between group hover:bg-muted/30 p-3 rounded-lg transition-all duration-300"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110 bg-blue-500/20">
                          <ArrowDownRight className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">Deposit</p>
                          <p className="text-xs text-muted-foreground">{new Date(tx.timestamp).toLocaleTimeString()}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-blue-500">${tx.amount}</p>
                        <p className="text-xs text-muted-foreground">{tx.status}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground">No transactions yet</p>
                )}
              </div>
            </Card>

            {/* Network Status */}
            <Card className="p-6 border border-border/50 bg-muted/30 backdrop-blur-sm">
              <div className="flex items-center gap-3 mb-4">
                <Cpu className="w-5 h-5 text-primary" />
                <h4 className="text-sm font-semibold text-foreground">Network Status</h4>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Network</span>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-foreground font-medium">
                      {chainId === 137 ? "Polygon" : chainId === 42220 ? "Celo" : "Ethereum"}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Chain ID</span>
                  <span className="text-foreground font-medium">{chainId || "N/A"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Wallet</span>
                  <span className="text-foreground font-medium">
                    {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : "Not connected"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Block</span>
                  <span className="text-foreground font-medium">#42,156,789</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
