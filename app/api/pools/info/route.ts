import { type NextRequest, NextResponse } from "next/server"

// Get pool information from blockchain
export async function GET(request: NextRequest) {
  try {
    const poolId = request.nextUrl.searchParams.get("poolId")

    const pools = [
      {
        id: 1,
        name: "Active Lifestyle",
        totalStaked: 125000,
        payoutAmount: 500,
        trigger: "Heart Rate >120 BPM for 5min",
        isActive: true,
        members: 342,
        payoutsProcessed: 1250,
      },
      {
        id: 2,
        name: "Sleep Wellness",
        totalStaked: 87500,
        payoutAmount: 1000,
        trigger: "Sleep <6hrs for 7 days",
        isActive: true,
        members: 218,
        payoutsProcessed: 890,
      },
      {
        id: 3,
        name: "Stress Relief",
        totalStaked: 45000,
        payoutAmount: 750,
        trigger: "Stress >80% for 1hr",
        isActive: true,
        members: 156,
        payoutsProcessed: 450,
      },
    ]

    if (poolId) {
      const pool = pools.find((p) => p.id === Number.parseInt(poolId))
      return NextResponse.json(pool || { error: "Pool not found" })
    }

    return NextResponse.json(pools)
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch pool info" }, { status: 500 })
  }
}
