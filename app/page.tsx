"use client"

import { useState } from "react"
import { ArrowRight, Heart, TrendingUp, Shield, Zap, Activity, Wallet } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-semibold text-foreground">HealthVault</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">
              Features
            </a>
            <a href="#how-it-works" className="text-sm text-muted-foreground hover:text-foreground transition">
              How It Works
            </a>
            <a href="#pools" className="text-sm text-muted-foreground hover:text-foreground transition">
              Insurance Pools
            </a>
          </div>
          <Link href="/dashboard">
            <Button size="sm">Launch App</Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Powered by Chainlink & Wearables</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 text-balance leading-tight">
              Insurance Powered by Your Health
            </h1>
            <p className="text-lg text-muted-foreground mb-8 text-balance leading-relaxed">
              Get paid instantly when health triggers activate. No claims. No waiting. Pure transparency through
              blockchain and real-time wearable data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button size="lg" className="w-full sm:w-auto">
                  Get Started <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent">
                Learn More
              </Button>
            </div>
          </div>
          <div className="relative h-96 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-border flex items-center justify-center overflow-hidden">
            <Activity className="w-32 h-32 text-primary/30 animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Why HealthVault?</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            The future of insurance is parametric. Get paid automatically when you need it most.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: Shield,
              title: "Transparent Claims",
              description: "Smart contracts eliminate fraud. Payouts happen automatically based on real data.",
            },
            {
              icon: Wallet,
              title: "Instant Payouts",
              description: "No waiting for approval. When your health metrics trigger, you get paid immediately.",
            },
            {
              icon: TrendingUp,
              title: "Blockchain Secured",
              description:
                "Immutable records on-chain. Your health data and policy details remain private yet verifiable.",
            },
          ].map((feature, i) => (
            <Card key={i} className="p-8 border border-border hover:border-primary/50 transition">
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { step: "1", title: "Connect Device", desc: "Link your wearable to HealthVault" },
            { step: "2", title: "Join Pool", desc: "Select an insurance pool" },
            { step: "3", title: "Deposit Premium", desc: "Fund your coverage via blockchain" },
            { step: "4", title: "Get Paid", desc: "Automatic payouts on trigger" },
          ].map((item, i) => (
            <div key={i} className="relative">
              <Card className="p-8 text-center border border-border">
                <div className="w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </Card>
              {i < 3 && (
                <div className="hidden md:block absolute top-1/3 -right-3 text-2xl text-muted-foreground">→</div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pools Section */}
      <section id="pools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Insurance Pools</h2>
          <p className="text-lg text-muted-foreground">Choose coverage that matches your lifestyle</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Active", premium: 50, trigger: "Heart Rate >120 BPM x5min", payout: 500 },
            { name: "Wellness", premium: 100, trigger: "Sleep <6 hours x7 days", payout: 1000 },
            { name: "Elite", premium: 150, trigger: "Multiple metrics combined", payout: 2000 },
          ].map((pool, i) => (
            <Card key={i} className="p-8 border border-border hover:border-primary/50 transition">
              <h3 className="text-2xl font-bold text-foreground mb-4">{pool.name}</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Premium</p>
                  <p className="text-2xl font-bold text-primary">${pool.premium}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Trigger Condition</p>
                  <p className="text-sm text-foreground">{pool.trigger}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payout Amount</p>
                  <p className="text-2xl font-bold text-accent">${pool.payout}</p>
                </div>
              </div>
              <Button className="w-full">Select Pool</Button>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="p-12 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">Ready to Revolutionize Your Insurance?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users getting paid fairly for their health data.
            </p>
            <Link href="/dashboard">
              <Button size="lg">Launch Dashboard</Button>
            </Link>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Heart className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-semibold text-foreground">HealthVault</span>
              </div>
              <p className="text-sm text-muted-foreground">Parametric insurance powered by health.</p>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-foreground transition">
                    Disclaimer
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2025 HealthVault. All rights reserved.</p>
            <p>Built on Chainlink | Polygon | Celo</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
