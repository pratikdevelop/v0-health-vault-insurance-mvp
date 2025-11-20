"use client"

import { useState, useCallback } from "react"

export interface TransactionState {
  hash: string | null
  status: "pending" | "confirming" | "confirmed" | "failed" | null
  error: string | null
  isLoading: boolean
}

export function useSmartContract(address: string | null, chainId: number | null) {
  const [depositState, setDepositState] = useState<TransactionState>({
    hash: null,
    status: null,
    error: null,
    isLoading: false,
  })

  const [payoutState, setPayoutState] = useState<TransactionState>({
    hash: null,
    status: null,
    error: null,
    isLoading: false,
  })

  const deposit = useCallback(
    async (amount: string, poolId: number) => {
      if (!address || !chainId) {
        setDepositState((prev) => ({
          ...prev,
          error: "Wallet not connected",
        }))
        return
      }

      setDepositState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }))

      try {
        const response = await fetch("/api/contracts/deposit", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address,
            amount,
            poolId,
            chainId,
          }),
        })

        if (!response.ok) throw new Error("Deposit failed")

        const data = await response.json()

        setDepositState({
          hash: data.transactionHash,
          status: "confirmed",
          error: null,
          isLoading: false,
        })

        // Monitor transaction
        monitorTransaction(data.transactionHash, address)

        return data
      } catch (error: any) {
        setDepositState({
          hash: null,
          status: "failed",
          error: error.message,
          isLoading: false,
        })
      }
    },
    [address, chainId],
  )

  const claimPayout = useCallback(
    async (triggerId: number, proofData: string) => {
      if (!address || !chainId) {
        setPayoutState((prev) => ({
          ...prev,
          error: "Wallet not connected",
        }))
        return
      }

      setPayoutState((prev) => ({
        ...prev,
        isLoading: true,
        error: null,
      }))

      try {
        const response = await fetch("/api/contracts/payout", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            address,
            triggerId,
            proofData,
            chainId,
          }),
        })

        if (!response.ok) throw new Error("Payout claim failed")

        const data = await response.json()

        setPayoutState({
          hash: data.transactionHash,
          status: "confirmed",
          error: null,
          isLoading: false,
        })

        return data
      } catch (error: any) {
        setPayoutState({
          hash: null,
          status: "failed",
          error: error.message,
          isLoading: false,
        })
      }
    },
    [address, chainId],
  )

  const monitorTransaction = useCallback(async (txHash: string, userAddress: string) => {
    try {
      const checkStatus = async () => {
        const response = await fetch(`/api/contracts/monitor?hash=${txHash}&address=${userAddress}`)
        const data = await response.json()

        if (data.status === "confirmed" || data.status === "completed") {
          setDepositState((prev) => ({
            ...prev,
            status: "confirmed",
          }))
        } else if (data.status === "failed") {
          setDepositState((prev) => ({
            ...prev,
            status: "failed",
            error: "Transaction failed",
          }))
        }
      }

      // Check status periodically
      const interval = setInterval(checkStatus, 5000)
      return () => clearInterval(interval)
    } catch (error) {
      console.error("Error monitoring transaction:", error)
    }
  }, [])

  return {
    depositState,
    payoutState,
    deposit,
    claimPayout,
  }
}
