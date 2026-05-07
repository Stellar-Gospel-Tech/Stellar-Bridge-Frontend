# Stellar Bridge — Frontend

Next.js frontend for the [Stellar Bridge](https://github.com/Stellar-Gospel-Tech/Stellar-Bidge) — a trust-minimized bridge between Ethereum and Stellar.

> **Status:** Early development — scaffold only. Contract wiring comes after the bridge contracts are complete.

## Stack

- [Next.js](https://nextjs.org/) (App Router)
- [RainbowKit](https://www.rainbowkit.com/) + [Wagmi](https://wagmi.sh/) — Ethereum wallet connection
- [Freighter API](https://docs.freighter.app/) — Stellar wallet connection
- [Tailwind CSS](https://tailwindcss.com/)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page |
| `/bridge/eth-to-stellar` | Lock ERC-20 on Ethereum, receive SEP-41 on Stellar |
| `/bridge/stellar-to-eth` | Lock SEP-41 on Stellar, receive ERC-20 on Ethereum |

## Getting Started

```bash
cp .env.example .env.local   # fill in your keys
npm install
npm run dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID` | From [cloud.walletconnect.com](https://cloud.walletconnect.com) |
| `NEXT_PUBLIC_ETH_BRIDGE_ADDRESS` | Deployed `StellarBridge.sol` address |
| `NEXT_PUBLIC_STELLAR_BRIDGE_CONTRACT_ID` | Deployed Soroban bridge contract ID |

## Relationship to the Bridge Contracts

This repo is a companion to [Stellar-Gospel-Tech/Stellar-Bidge](https://github.com/Stellar-Gospel-Tech/Stellar-Bidge).  
The frontend is developed independently and wired to the contracts once they are deployed on testnet (Layer 4 of the build plan).

## License

MIT
