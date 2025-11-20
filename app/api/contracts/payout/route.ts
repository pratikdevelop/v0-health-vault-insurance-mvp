import { type NextRequest, NextResponse } from "next/server"

interface PayoutRequest {
  address: string
  triggerId: number
  proofData: string
  chainId: number
}

// Handle payout claims from smart contracts
export async function POST(request: NextRequest) {
  try {
    const body: PayoutRequest = await request.json()

    if (!body.address || body.triggerId === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Simulate verification of health trigger proof
    const transactionHash = `0x${Math.random().toString(16).slice(2).padEnd(64, "0")}`
    const payoutAmount = Math.random() * 500 + 250

    // Simulate delay for proof verification
    await new Promise((resolve) => setTimeout(resolve, 3000))

    return NextResponse.json({
      success: true,
      transactionHash,
      from: "0x1234567890123456789012345678901234567890",
      to: body.address,
      payoutAmount: payoutAmount.toFixed(2),
      triggerId: body.triggerId,
      status: "confirmed",
      blockNumber: Math.floor(Math.random() * 1000000) + 40000000,
      timestamp: Date.now(),
      gasUsed: Math.floor(Math.random() * 80000) + 40000,
      gasPrice: "45",
    })
  } catch (error) {
    return NextResponse.json({ error: "Failed to process payout" }, { status: 500 })
  }
}
