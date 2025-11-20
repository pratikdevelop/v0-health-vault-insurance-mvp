"use client"

import { useState, useEffect, useRef } from "react"
import {
  ArrowRight,
  Heart,
  Shield,
  Zap,
  Activity,
  Wallet,
  ChevronDown,
  Play,
  Check,
  Star,
  Users,
  Clock,
  Apple,
  Download,
  Smartphone,
  Award,
  Globe,
  Lock,
  Eye,
  Cpu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function Home() {
  const [email, setEmail] = useState("")
  const [isVisible, setIsVisible] = useState(false)
  const [activeFeature, setActiveFeature] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollProgress, setScrollProgress] = useState(0)
  const heroRef = useRef(null)

  useEffect(() => {
    setIsVisible(true)
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % 3)
    }, 4000)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(progress)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    return () => {
      clearInterval(interval)
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  // Mouse follower gradient
  const mouseFollowerStyle = {
    background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(120, 119, 198, 0.15), transparent 80%)`,
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted overflow-hidden relative">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10" style={mouseFollowerStyle}>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-accent/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-48 h-48 bg-green-500/10 rounded-full blur-2xl animate-pulse delay-500"></div>
      </div>

      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-primary/20">
        <div
          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 hover:bg-background/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <Heart className="w-5 h-5 text-primary-foreground group-hover:rotate-12 transition-transform" />
            </div>
            <span className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              HealthVault
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            {["Features", "How It Works", "Insurance Pools", "Testimonials"].map((item, index) => (
              <a
                key={item}
                href={`#${item.toLowerCase().replace(/\s+/g, "-")}`}
                className="text-sm text-muted-foreground hover:text-foreground transition-all duration-300 hover:scale-105 relative group"
              >
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>
          <Link href="/dashboard">
            <Button
              size="sm"
              className="group hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-primary to-accent"
            >
              Launch App
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div
            className={`space-y-6 transition-all duration-700 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-6 animate-pulse hover:scale-105 transition-transform">
              <Zap className="w-4 h-4 text-primary animate-bounce" />
              <span className="text-sm font-medium text-primary">Powered by Chainlink & Wearables</span>
            </div>
           <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground text-balance leading-tight mb-8">
  Insurance Powered by{" "}
  <span className="relative inline-block">
    <span className="bg-gradient-to-r from-primary via-accent to-purple-600 bg-clip-text text-transparent animate-gradient relative z-10 text-white">
      Your Health
    </span>
    <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent blur-xl opacity-30 -z-10 animate-pulse rounded-lg" />
    <div className="absolute -bottom-2 left-0 w-full h-0.5 bg-gradient-to-r from-primary to-accent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
  </span>
</h1>
            <p className="text-lg text-muted-foreground text-balance leading-relaxed">
              Get paid instantly when health triggers activate. No claims. No waiting. Pure transparency through
              blockchain and real-time wearable data.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/dashboard">
                <Button
                  size="lg"
                  className="w-full sm:w-auto group hover:scale-105 transition-transform duration-300 bg-gradient-to-r from-primary to-accent"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto bg-transparent group hover:scale-105 transition-transform border-2"
              >
                <Play className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Watch Demo
              </Button>
            </div>

            {/* App Store Badges */}
            <div className="flex gap-4 pt-6">
              <Button
                variant="outline"
                className="flex items-center gap-2 group hover:scale-105 transition-transform bg-transparent"
              >
                <Apple className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-xs">Download on the</div>
                  <div className="text-sm font-semibold">App Store</div>
                </div>
              </Button>
              <Button
                variant="outline"
                className="flex items-center gap-2 group hover:scale-105 transition-transform bg-transparent"
              >
                <Download className="w-4 h-4" />
                <div className="text-left">
                  <div className="text-xs">Get it on</div>
                  <div className="text-sm font-semibold">Google Play</div>
                </div>
              </Button>
            </div>
          </div>

          {/* Enhanced Hero Visual */}
          <div className="relative h-96">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl border border-border flex items-center justify-center overflow-hidden group hover:scale-105 transition-transform duration-500 shadow-2xl">
              {/* Animated Dashboard Preview */}
              <div className="absolute w-64 h-40 bg-background/80 backdrop-blur-sm rounded-lg border border-border p-4 transform -rotate-6 shadow-lg animate-float">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-3 h-3 bg-red-400 rounded-full animate-pulse"></div>
                  <div className="text-xs font-medium">Live Heart Rate</div>
                </div>
                <div className="text-2xl font-bold text-primary mb-2">72 BPM</div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full w-3/4 animate-pulse"></div>
                </div>
              </div>

              <div className="absolute w-56 h-32 bg-background/80 backdrop-blur-sm rounded-lg border border-border p-4 transform rotate-3 shadow-lg animate-float delay-1000 right-8 top-8">
                <div className="text-xs text-muted-foreground mb-1">Coverage Active</div>
                <div className="text-lg font-bold text-accent">$1,000</div>
                <div className="w-full bg-muted rounded-full h-1 mt-2">
                  <div className="bg-accent h-1 rounded-full w-full"></div>
                </div>
              </div>

              <div className="absolute w-52 h-28 bg-background/80 backdrop-blur-sm rounded-lg border border-border p-4 transform -rotate-3 shadow-lg animate-float delay-500 bottom-12 left-12">
                <div className="text-xs text-muted-foreground">Next Payout Ready</div>
                <div className="text-sm font-semibold text-foreground">Trigger: Sleep &lt;6h</div>
              </div>

              <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent" />
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="flex justify-center mt-16 animate-bounce">
          <ChevronDown className="w-6 h-6 text-muted-foreground" />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <p className="text-sm text-muted-foreground mb-6">Trusted by industry leaders</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
          {["Chainlink", "Polygon", "Celo", "Fitbit", "Apple Health", "Garmin"].map((company, i) => (
            <div
              key={company}
              className="flex justify-center group hover:scale-110 transition-transform duration-300 hover:opacity-100"
            >
              <div className="text-lg font-semibold text-muted-foreground group-hover:text-primary transition-colors">
                {company}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { number: "10K+", label: "Active Users", icon: Users },
            { number: "$2M+", label: "Claims Paid", icon: Wallet },
            { number: "99.9%", label: "Uptime", icon: Activity },
            { number: "<60s", label: "Avg Payout", icon: Clock },
          ].map((stat, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="relative inline-block">
                <stat.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 w-8 h-8 text-primary mx-auto mb-3 opacity-0 group-hover:opacity-100 animate-ping" />
              </div>
              <div className="text-2xl font-bold text-foreground mb-1 group-hover:bg-gradient-to-r group-hover:from-primary group-hover:to-accent group-hover:bg-clip-text group-hover:text-transparent transition-all">
                {stat.number}
              </div>
              <div className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {stat.label}
              </div>
            </div>
          ))}
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
              features: ["Zero paperwork", "Anti-fraud protection", "Full transparency"],
            },
            {
              icon: Wallet,
              title: "Instant Payouts",
              description: "No waiting for approval. When your health metrics trigger, you get paid immediately.",
              features: ["<60 second payouts", "24/7 automation", "No human approval"],
            },
            {
              icon: Lock,
              title: "Blockchain Secured",
              description:
                "Immutable records on-chain. Your health data and policy details remain private yet verifiable.",
              features: ["Military-grade encryption", "Decentralized storage", "You own your data"],
            },
          ].map((feature, i) => (
            <Card
              key={i}
              className={`p-8 border-2 border-border hover:border-primary/50 transition-all duration-500 group hover:scale-105 cursor-pointer relative overflow-hidden ${
                activeFeature === i ? "ring-2 ring-primary/20 bg-primary/5" : ""
              }`}
              onMouseEnter={() => setActiveFeature(i)}
            >
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-primary/10 to-transparent rounded-bl-full" />
              <feature.icon
                className={`w-12 h-12 text-primary mb-4 group-hover:scale-110 transition-transform ${
                  activeFeature === i ? "animate-pulse" : ""
                }`}
              />
              <h3 className="text-xl font-semibold text-foreground mb-3 group-hover:text-primary transition-colors">
                {feature.title}
              </h3>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors mb-4">
                {feature.description}
              </p>
              <ul className="space-y-2">
                {feature.features.map((item, j) => (
                  <li
                    key={j}
                    className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                  >
                    <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-lg text-muted-foreground">Simple steps to secure your health future</p>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              step: "1",
              title: "Connect Device",
              desc: "Link your wearable to HealthVault",
              icon: Smartphone,
              color: "from-blue-500 to-cyan-500",
            },
            {
              step: "2",
              title: "Join Pool",
              desc: "Select an insurance pool",
              icon: Users,
              color: "from-green-500 to-emerald-500",
            },
            {
              step: "3",
              title: "Deposit Premium",
              desc: "Fund your coverage via blockchain",
              icon: Wallet,
              color: "from-purple-500 to-pink-500",
            },
            {
              step: "4",
              title: "Get Paid",
              desc: "Automatic payouts on trigger",
              icon: Check,
              color: "from-orange-500 to-red-500",
            },
          ].map((item, i) => (
            <div key={i} className="relative group">
              <Card className="p-8 text-center border-2 border-border hover:border-primary/50 transition-all duration-500 hover:scale-105 relative overflow-hidden">
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                />
                <div
                  className={`w-12 h-12 bg-gradient-to-r ${item.color} text-primary-foreground rounded-full flex items-center justify-center text-lg font-bold mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold shadow-lg">
                  {item.step}
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                  {item.desc}
                </p>
              </Card>
              {i < 3 && (
                <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm animate-pulse">
                    →
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Technology Stack */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Powered by Cutting-Edge Technology</h2>
        </div>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            {
              icon: Cpu,
              title: "Chainlink Oracles",
              desc: "Secure off-chain data feeds",
              color: "from-blue-500 to-purple-500",
            },
            {
              icon: Shield,
              title: "Zero-Knowledge Proofs",
              desc: "Verify without revealing data",
              color: "from-green-500 to-teal-500",
            },
            {
              icon: Globe,
              title: "Polygon PoS",
              desc: "Fast, low-cost transactions",
              color: "from-purple-500 to-pink-500",
            },
            {
              icon: Eye,
              title: "IPFS Storage",
              desc: "Decentralized data storage",
              color: "from-orange-500 to-red-500",
            },
          ].map((tech, i) => (
            <Card
              key={i}
              className="p-6 text-center border border-border hover:border-primary/50 transition-all duration-500 group hover:scale-105"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-r ${tech.color} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform shadow-lg`}
              >
                <tech.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                {tech.title}
              </h3>
              <p className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">{tech.desc}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">What Our Users Say</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Sarah Chen",
              role: "Fitness Coach",
              text: "HealthVault paid out within seconds when I hit my stress threshold. Game changer!",
              avatar: "SC",
            },
            {
              name: "Marcus Rodriguez",
              role: "Marathon Runner",
              text: "Finally, insurance that understands an active lifestyle. The automatic payouts are incredible.",
              avatar: "MR",
            },
            {
              name: "Dr. Emily Watson",
              role: "Cardiologist",
              text: "As a doctor, I recommend HealthVault to all my patients. Transparency matters.",
              avatar: "EW",
            },
          ].map((testimonial, i) => (
            <Card
              key={i}
              className="p-6 border border-border hover:border-primary/50 transition-all duration-500 group hover:scale-105"
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center text-white font-semibold group-hover:scale-110 transition-transform">
                  {testimonial.avatar}
                </div>
                <div>
                  <div className="font-semibold text-foreground">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
              <p className="text-muted-foreground group-hover:text-foreground transition-colors italic">
                "{testimonial.text}"
              </p>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, j) => (
                  <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Pools Section */}
      <section id="insurance-pools" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Insurance Pools</h2>
          <p className="text-lg text-muted-foreground">Choose coverage that matches your lifestyle</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              name: "Active",
              premium: 50,
              trigger: "Heart Rate >120 BPM x5min",
              payout: 500,
              features: ["Real-time monitoring", "Basic coverage", "24/7 support"],
              gradient: "from-blue-500 to-cyan-500",
            },
            {
              name: "Wellness",
              premium: 100,
              trigger: "Sleep <6 hours x7 days",
              payout: 1000,
              features: ["Advanced analytics", "Wellness coaching", "Priority support"],
              popular: true,
              gradient: "from-purple-500 to-pink-500",
            },
            {
              name: "Elite",
              premium: 150,
              trigger: "Multiple metrics combined",
              payout: 2000,
              features: ["All features", "Dedicated manager", "Custom triggers"],
              gradient: "from-orange-500 to-red-500",
            },
          ].map((pool, i) => (
            <Card
              key={i}
              className={`p-8 border-2 border-border hover:border-primary/50 transition-all duration-500 group hover:scale-105 relative overflow-hidden ${
                pool.popular ? "ring-2 ring-accent/50 shadow-xl" : ""
              }`}
            >
              {pool.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 z-10">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-1 shadow-lg">
                    <Star className="w-3 h-3 fill-current" />
                    Most Popular
                  </div>
                </div>
              )}

              <div className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${pool.gradient}`} />

              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors">
                {pool.name}
              </h3>

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Monthly Premium</p>
                  <p className="text-2xl font-bold text-primary group-hover:scale-110 transition-transform inline-block">
                    ${pool.premium}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Trigger Condition</p>
                  <p className="text-sm text-foreground font-medium">{pool.trigger}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Payout Amount</p>
                  <p className="text-2xl font-bold text-accent group-hover:scale-110 transition-transform inline-block">
                    ${pool.payout}
                  </p>
                </div>
                <div className="space-y-2">
                  {pool.features.map((feature, j) => (
                    <div
                      key={j}
                      className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors"
                    >
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      {feature}
                    </div>
                  ))}
                </div>
              </div>

              <Button className="w-full group-hover:scale-105 transition-transform bg-gradient-to-r from-primary to-accent">
                Select Pool
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <Card className="p-12 bg-gradient-to-r from-primary/10 to-accent/10 border-2 border-primary/20 group hover:scale-105 transition-transform duration-500 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-accent/10 rounded-full translate-y-12 -translate-x-12"></div>

          <div className="text-center relative z-10">
            <Award className="w-16 h-16 text-primary mx-auto mb-6 group-hover:scale-110 transition-transform" />
            <h2 className="text-3xl font-bold text-foreground mb-4 group-hover:scale-105 transition-transform inline-block">
              Ready to Revolutionize Your Insurance?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of users getting paid fairly for their health data. Start in under 5 minutes.
            </p>
            <Link href="/dashboard">
              <Button
                size="lg"
                className="group hover:scale-110 transition-transform bg-gradient-to-r from-primary to-accent shadow-lg"
              >
                Launch Dashboard
                <Zap className="w-4 h-4 ml-2 group-hover:rotate-12 transition-transform" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">No credit card required • Free 30-day trial</p>
          </div>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-background/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4 group cursor-pointer">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Heart className="w-5 h-5 text-primary-foreground group-hover:rotate-12 transition-transform" />
                </div>
                <span className="font-semibold text-foreground group-hover:text-primary transition-colors">
                  HealthVault
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">Parametric insurance powered by health.</p>
              <div className="flex gap-3">
                {[Apple, Download, Globe].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center group hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                ))}
              </div>
            </div>
            {["Product", "Company", "Resources", "Legal"].map((category) => (
              <div key={category}>
                <h4 className="font-semibold text-foreground mb-4">{category}</h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <li key={i}>
                      <a
                        href="#"
                        className="hover:text-foreground transition-all duration-300 hover:translate-x-1 inline-block"
                      >
                        {category} Link {i + 1}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>© 2025 HealthVault. All rights reserved.</p>
            <p className="flex items-center gap-2 mt-2 md:mt-0">
              Built on
              <span className="text-primary animate-pulse">Chainlink</span> |
              <span className="text-primary animate-pulse delay-100">Polygon</span> |
              <span className="text-primary animate-pulse delay-200">Celo</span>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
