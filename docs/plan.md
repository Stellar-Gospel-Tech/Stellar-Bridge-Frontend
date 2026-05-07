# Build Plan — Stellar Bridge Frontend

## Priority order

```
Level 1 → Level 2 → Level 3 → Level 4
Layout     Wallets   Bridge    Polish
& Pages    & State   Forms     & Deploy
```

Each level must be stable before the next starts.  
Levels 1 and 2 have no contract dependency — they can be built in parallel with the contract work.

---

## Level 1 — Layout and pages

The shell everything else lives inside.

- Navbar with logo and links to both bridge directions
- Landing page with hero and two CTAs
- `/bridge/eth-to-stellar` page shell
- `/bridge/stellar-to-eth` page shell
- `/status/[txHash]` page shell

**Done when:** All pages render, nav links work, no broken routes.

---

## Level 2 — Wallet connections

Users need both an Ethereum wallet and a Stellar wallet before they can bridge.

- RainbowKit connect button (MetaMask + WalletConnect, Sepolia)
- Freighter connect button — connect, show truncated address, disconnect
- `useFreighter` hook — address, connected state, sign transaction helper
- Wallet status bar showing both connected wallets

**Done when:** User can connect MetaMask and Freighter independently, addresses shown in UI.

---

## Level 3 — Bridge forms and contract calls

*Blocked until contracts are deployed on testnet.*

- ETH→Stellar form — token address, amount, Stellar recipient, validation
- ETH→Stellar submit — call `StellarBridge.deposit()` via Wagmi `useWriteContract`
- Stellar→ETH form — amount, ETH recipient, validation
- Stellar→ETH submit — build + sign Soroban `deposit` tx via Freighter
- Token address mapping config (ERC-20 ↔ Soroban contract ID)
- Transaction feedback — pending / success / error states

**Done when:** A full round-trip transfer can be initiated from the UI on testnet.

---

## Level 4 — Polish and deploy

*Blocked until Level 3 is functional end-to-end.*

- `/status/[txHash]` — poll both chains, display transfer progress
- Decimal normalisation — ERC-20 (18 decimals) ↔ SEP-41 (7 decimals) in UI
- Human-readable error messages (rejected tx, wrong network, etc.)
- Responsive / mobile layout
- Vercel deploy config, env var docs, preview deploys on PRs

**Done when:** App is live on Vercel, works on mobile, gives clear feedback at every step.

---

## What is NOT in scope (for now)

- Transaction history feed
- Multi-token selector (single token pair at launch)
- Mainnet deployment
- Dark mode
