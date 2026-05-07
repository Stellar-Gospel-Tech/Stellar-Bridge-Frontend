"use client";

import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";

export function Navbar() {
  return (
    <nav className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <Link href="/" className="text-xl font-bold tracking-tight">
        Stellar Bridge
      </Link>
      <div className="flex items-center gap-4">
        <Link href="/bridge/eth-to-stellar" className="text-sm text-gray-600 hover:text-black">
          ETH → Stellar
        </Link>
        <Link href="/bridge/stellar-to-eth" className="text-sm text-gray-600 hover:text-black">
          Stellar → ETH
        </Link>
        <ConnectButton />
      </div>
    </nav>
  );
}
