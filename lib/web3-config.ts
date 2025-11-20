// Web3 configuration for blockchain interaction
export const NETWORK_CONFIG = {
  polygon: {
    chainId: 137,
    name: "Polygon",
    rpcUrl: "https://polygon-rpc.com",
    explorer: "https://polygonscan.com",
  },
  celo: {
    chainId: 42220,
    name: "Celo",
    rpcUrl: "https://forno.celo.org",
    explorer: "https://explorer.celo.org",
  },
  ethereum: {
    chainId: 1,
    name: "Ethereum",
    rpcUrl: "https://eth.llamarpc.com",
    explorer: "https://etherscan.io",
  },
} as const

export const SUPPORTED_CHAINS = [
  { id: 137, name: "Polygon", icon: "🔷" },
  { id: 42220, name: "Celo", icon: "🟢" },
  { id: 1, name: "Ethereum", icon: "⟠" },
]

// Mock Smart Contract Addresses
export const CONTRACT_ADDRESSES = {
  healthVaultPool: "0x1234567890123456789012345678901234567890",
  premiumToken: "0x0987654321098765432109876543210987654321",
  oracleConnector: "0xabcdefabcdefabcdefabcdefabcdefabcdefabcd",
} as const

// Chainlink Oracle Configuration
export const CHAINLINK_CONFIG = {
  priceFeeds: {
    heartRate: "heart-rate-bpm",
    sleepHours: "sleep-hours",
    stressLevel: "stress-percentage",
  },
  updateInterval: 60000, // 1 minute
  requiredConfirmations: 3,
}

// Health Trigger Thresholds
export const TRIGGER_THRESHOLDS = {
  activeLifestyle: {
    heartRate: 120,
    duration: 5 * 60 * 1000, // 5 minutes
    payout: 500,
  },
  sleepWellness: {
    sleepHours: 6,
    consecutiveDays: 7,
    payout: 1000,
  },
  stressRelief: {
    stressLevel: 80,
    duration: 60 * 60 * 1000, // 1 hour
    payout: 750,
  },
}
