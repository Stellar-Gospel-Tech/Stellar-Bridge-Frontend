# Architecture — Stellar Bridge Frontend

## Overview

A Next.js web app that lets users initiate token transfers between Ethereum and Stellar through the Stellar Bridge contracts.

## Stack

| Concern | Choice | Reason |
|---------|--------|--------|
| Framework | Next.js (App Router) | SSR, file-based routing, easy Vercel deploy |
| Ethereum wallet | RainbowKit + Wagmi | Industry standard, handles MetaMask + WalletConnect |
| Stellar wallet | Freighter API | The standard Stellar browser wallet |
| Styling | Tailwind CSS | Utility-first, ships with Next.js scaffold |
| State | React Query (via Wagmi) + local state | No global store needed at this scale |

## Pages

```
/                          Landing — explain the bridge, two CTAs
/bridge/eth-to-stellar     Lock ERC-20 on Ethereum → receive SEP-41 on Stellar
/bridge/stellar-to-eth     Lock SEP-41 on Stellar  → receive ERC-20 on Ethereum
/status/[txHash]           Track a transfer in progress
```

## Component Structure

```
app/
  layout.tsx               Root layout — mounts Providers
  providers.tsx            WagmiProvider + QueryClientProvider + RainbowKitProvider
  page.tsx                 Landing page
  bridge/
    eth-to-stellar/        Deposit form (Ethereum side)
    stellar-to-eth/        Deposit form (Stellar side)
  status/[txHash]/         Transfer status tracker

components/
  Navbar.tsx               Nav + both wallet connect buttons
  FreighterButton.tsx      Freighter connect / address display
  WalletStatusBar.tsx      Shows both connected wallets at a glance

lib/
  wagmi.ts                 Wagmi config (chains, WalletConnect project ID)
  tokens.ts                ERC-20 address ↔ Soroban contract ID mapping

hooks/
  useFreighter.ts          address, isConnected, signTransaction
```

## Data Flow

### ETH → Stellar
```
User fills form
  → useWriteContract (Wagmi) calls StellarBridge.deposit(token, amount, stellarRecipient, nonce)
  → tx confirmed on Ethereum
  → relayer picks up Deposit event → releases SEP-41 on Stellar
  → /status/[txHash] polls both chains and shows progress
```

### Stellar → ETH
```
User fills form
  → useFreighter builds Soroban tx calling bridge.deposit(from, amount, ethRecipient, nonce)
  → Freighter signs → tx submitted to Stellar RPC
  → relayer picks up deposit event → releases ERC-20 on Ethereum
  → /status/[txHash] polls both chains and shows progress
```

## Contract Dependency

The bridge forms (ETH→Stellar, Stellar→ETH) require deployed contract addresses.  
These are injected via environment variables and are only available once the contracts are deployed on testnet.

```
NEXT_PUBLIC_ETH_BRIDGE_ADDRESS
NEXT_PUBLIC_STELLAR_BRIDGE_CONTRACT_ID
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID
```

Layers 1 and 2 (layout + wallets) have no contract dependency and can be built now.
