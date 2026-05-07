# Build Plan — Stellar Bridge Frontend

## Priority order

Built in dependency order. Each layer must be stable before the next starts.

```
Layer 1 → Layer 2 → Layer 3 → Layer 4
Layout     Wallets   Bridge    Polish
& Pages    & State   Forms
```

---

## Layer 1 — Layout, pages, and navigation
**`app/` + `components/Navbar.tsx`**

The shell everything else lives inside.

| Issue | Task | Complexity |
|-------|------|------------|
| FE-001 | Navbar — logo, ETH→Stellar / Stellar→ETH links, wallet buttons | Trivial |
| FE-002 | Landing page — hero, two CTA buttons, brief explainer | Trivial |
| FE-003 | `/bridge/eth-to-stellar` page shell — layout and heading | Trivial |
| FE-004 | `/bridge/stellar-to-eth` page shell — layout and heading | Trivial |
| FE-005 | `/status/[txHash]` page shell — transfer status tracker | Trivial |

**Done when:** All pages render, nav links work, no broken routes.

---

## Layer 2 — Wallet connections and state
**`components/` + `lib/`**

Users need both an Ethereum wallet and a Stellar wallet connected before they can bridge.

| Issue | Task | Complexity |
|-------|------|------------|
| FE-006 | RainbowKit connect button — MetaMask + WalletConnect on Sepolia | Trivial |
| FE-007 | Freighter connect button — connect, show truncated address, disconnect | Medium |
| FE-008 | `useFreighter` hook — address, connected state, sign transaction helper | Medium |
| FE-009 | Wallet status bar — show both connected wallets (or prompts to connect) | Trivial |

**Done when:** User can connect MetaMask and Freighter independently, addresses shown in UI.

---

## Layer 3 — Bridge forms and contract calls
**`app/bridge/`**

Depends on Layer 2 (wallets) and the contracts being deployed on testnet (Layer 4 of the contract build plan).

| Issue | Task | Complexity |
|-------|------|------------|
| FE-010 | ETH→Stellar form — token address, amount, Stellar recipient inputs + validation | Medium |
| FE-011 | ETH→Stellar submit — call `StellarBridge.deposit()` via Wagmi `useWriteContract` | Medium |
| FE-012 | Stellar→ETH form — amount, ETH recipient inputs + validation | Medium |
| FE-013 | Stellar→ETH submit — build + sign Soroban `deposit` tx via Freighter | High |
| FE-014 | Token address mapping — config file mapping ERC-20 address ↔ Soroban contract ID | Trivial |
| FE-015 | Transaction feedback — pending / success / error states on both forms | Medium |

**Done when:** A full round-trip transfer can be initiated from the UI on testnet.

---

## Layer 4 — Polish and hardening
**All files**

Depends on Layer 3 being functional end-to-end.

| Issue | Task | Complexity |
|-------|------|------------|
| FE-016 | `/status/[txHash]` — poll both chains and display transfer progress | High |
| FE-017 | Decimal display — normalise ERC-20 (18 decimals) ↔ SEP-41 (7 decimals) in UI | Medium |
| FE-018 | Error messages — human-readable errors for rejected txs, wrong network, etc. | Medium |
| FE-019 | Responsive layout — mobile-friendly forms and navbar | Medium |
| FE-020 | Vercel deploy config — `vercel.json`, env var documentation, preview deploys on PRs | Trivial |

**Done when:** App is deployed on Vercel, works on mobile, shows clear feedback at every step.

---

## What is NOT in scope (for now)

- Transaction history / wallet activity feed
- Multi-token selector UI (single token pair at launch)
- Mainnet deployment
- Dark mode

---

## Dependency on the contract repo

| Frontend layer | Requires from contracts |
|----------------|------------------------|
| Layer 1 + 2 | Nothing — build independently |
| Layer 3 | Contracts deployed on testnet (contract Layer 4) |
| Layer 4 | Full relayer running on testnet |
