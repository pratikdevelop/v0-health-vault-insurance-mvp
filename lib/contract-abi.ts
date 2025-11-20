// Smart contract ABIs for HealthVault
export const HEALTH_VAULT_POOL_ABI = [
  {
    name: "deposit",
    type: "function",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "poolId", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "withdraw",
    type: "function",
    inputs: [
      { name: "amount", type: "uint256" },
      { name: "poolId", type: "uint256" },
    ],
    outputs: [],
    stateMutability: "nonpayable",
  },
  {
    name: "claimPayout",
    type: "function",
    inputs: [
      { name: "triggerId", type: "uint256" },
      { name: "proofData", type: "bytes" },
    ],
    outputs: [{ name: "amount", type: "uint256" }],
    stateMutability: "nonpayable",
  },
  {
    name: "getUserBalance",
    type: "function",
    inputs: [{ name: "user", type: "address" }],
    outputs: [{ name: "balance", type: "uint256" }],
    stateMutability: "view",
  },
  {
    name: "getPoolInfo",
    type: "function",
    inputs: [{ name: "poolId", type: "uint256" }],
    outputs: [
      { name: "totalStaked", type: "uint256" },
      { name: "payoutAmount", type: "uint256" },
      { name: "trigger", type: "string" },
      { name: "isActive", type: "bool" },
    ],
    stateMutability: "view",
  },
  {
    name: "triggerHealthEvent",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "poolId", type: "uint256", indexed: true },
      { name: "amount", type: "uint256" },
      { name: "timestamp", type: "uint256" },
    ],
  },
  {
    name: "PayoutProcessed",
    type: "event",
    inputs: [
      { name: "user", type: "address", indexed: true },
      { name: "amount", type: "uint256" },
      { name: "txHash", type: "string" },
    ],
  },
] as const
