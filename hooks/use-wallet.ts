"use client"

import { useState, useCallback, useEffect } from "react"
import { NETWORK_CONFIG } from "@/lib/web3-config"

export interface WalletState {
  address: string | null
  chainId: number | null
  balance: string | null
  isConnected: boolean
  isConnecting: boolean
  error: string | null
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    chainId: null,
    balance: null,
    isConnected: false,
    isConnecting: false,
    error: null,
  })

  // Check if wallet is already connected on mount
  useEffect(() => {
    checkWalletConnection()
  }, [])

  const checkWalletConnection = useCallback(async () => {
    if (typeof window === "undefined" || !("ethereum" in window)) {
      setState((prev) => ({ ...prev, error: "MetaMask not installed" }))
      return
    }

    try {
      const accounts = await (window.ethereum as any).request({
        method: "eth_accounts",
      })

      if (accounts.length > 0) {
        await connectWallet()
      }
    } catch (error) {
      console.error("Error checking wallet:", error)
    }
  }, [])

  const connectWallet = useCallback(async () => {
    if (typeof window === "undefined" || !("ethereum" in window)) {
      setState((prev) => ({
        ...prev,
        error: "MetaMask not installed. Please install MetaMask to continue.",
      }))
      return
    }

    setState((prev) => ({ ...prev, isConnecting: true, error: null }))

    try {
      const accounts = await (window.ethereum as any).request({
        method: "eth_requestAccounts",
      })

      const chainId = await (window.ethereum as any).request({
        method: "eth_chainId",
      })

      const balance = await (window.ethereum as any).request({
        method: "eth_getBalance",
        params: [accounts[0], "latest"],
      })

      setState({
        address: accounts[0],
        chainId: Number.parseInt(chainId, 16),
        balance: (BigInt(balance) / BigInt(10 ** 18)).toString(),
        isConnected: true,
        isConnecting: false,
        error: null,
      })(
        // Listen for account changes
        window.ethereum as any,
      )
        .on(
          "accountsChanged",
          handleAccountsChanged,
        )(window.ethereum as any)
        .on("chainChanged", handleChainChanged)
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: error?.message || "Failed to connect wallet",
      }))
    }
  }, [])

  const handleAccountsChanged = useCallback((accounts: string[]) => {
    if (accounts.length === 0) {
      setState({
        address: null,
        chainId: null,
        balance: null,
        isConnected: false,
        isConnecting: false,
        error: null,
      })
    } else {
      setState((prev) => ({ ...prev, address: accounts[0] }))
    }
  }, [])

  const handleChainChanged = useCallback((chainId: string) => {
    setState((prev) => ({
      ...prev,
      chainId: Number.parseInt(chainId, 16),
    }))
  }, [])

  const switchNetwork = useCallback(async (chainId: number) => {
    if (typeof window === "undefined" || !("ethereum" in window)) {
      return
    }

    try {
      await (window.ethereum as any).request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${chainId.toString(16)}` }],
      })
    } catch (error: any) {
      if (error.code === 4902) {
        // Chain not added, try to add it
        const chainConfig = Object.values(NETWORK_CONFIG).find((config) => config.chainId === chainId)
        if (chainConfig) {
          await (window.ethereum as any).request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${chainId.toString(16)}`,
                chainName: chainConfig.name,
                rpcUrls: [chainConfig.rpcUrl],
                blockExplorerUrls: [chainConfig.explorer],
              },
            ],
          })
        }
      }
    }
  }, [])

  const disconnect = useCallback(() => {
    setState({
      address: null,
      chainId: null,
      balance: null,
      isConnected: false,
      isConnecting: false,
      error: null,
    })

    if (typeof window !== "undefined" && "ethereum" in window) {
      ;(window.ethereum as any)
        .removeListener(
          "accountsChanged",
          handleAccountsChanged,
        )(window.ethereum as any)
        .removeListener("chainChanged", handleChainChanged)
    }
  }, [handleAccountsChanged, handleChainChanged])

  return {
    ...state,
    connectWallet,
    disconnect,
    switchNetwork,
    checkWalletConnection,
  }
}
