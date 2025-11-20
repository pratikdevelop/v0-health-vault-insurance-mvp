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

  useEffect(() => {
    checkWalletConnection()
  }, [])

  const setupListeners = useCallback(() => {
    if (typeof window === "undefined" || !("ethereum" in window)) {
      return
    }

    const ethereum = window.ethereum as any

    const handleAccountsChanged = (accounts: string[]) => {
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
    }

    const handleChainChanged = (chainId: string) => {
      setState((prev) => ({
        ...prev,
        chainId: Number.parseInt(chainId, 16),
      }))
    }

    ethereum.on("accountsChanged", handleAccountsChanged)
    ethereum.on("chainChanged", handleChainChanged)

    return () => {
      ethereum.removeListener("accountsChanged", handleAccountsChanged)
      ethereum.removeListener("chainChanged", handleChainChanged)
    }
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
      })

      setupListeners()
    } catch (error: any) {
      setState((prev) => ({
        ...prev,
        isConnecting: false,
        error: error?.message || "Failed to connect wallet",
      }))
    }
  }, [setupListeners])

  const connectDemoAccount = useCallback(() => {
    setState({
      address: "0x742d35Cc6634C0532925a3b844Bc7e7595f0bEb",
      chainId: 137,
      balance: "10.5",
      isConnected: true,
      isConnecting: false,
      error: null,
    })
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
  }, [])

  return {
    ...state,
    connectWallet,
    connectDemoAccount,
    disconnect,
    switchNetwork,
    checkWalletConnection,
  }
}
