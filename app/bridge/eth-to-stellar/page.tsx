"use client";

import { useState } from "react";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FreighterButton } from "@/components/FreighterButton";
import { Navbar } from "@/components/Navbar";

export default function EthToStellarPage() {
  const { isConnected } = useAccount();
  const [token, setToken] = useState("");
  const [amount, setAmount] = useState("");
  const [stellarRecipient, setStellarRecipient] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: call StellarBridge.deposit(token, amount, stellarRecipient, nonce)
    console.log("deposit", { token, amount, stellarRecipient });
  }

  return (
    <>
      <Navbar />
      <main className="max-w-lg mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold mb-2">ETH → Stellar</h1>
        <p className="text-gray-500 text-sm mb-8">
          Lock an ERC-20 token on Ethereum. The relayer will release the
          equivalent SEP-41 token to your Stellar address.
        </p>

        {!isConnected ? (
          <div className="flex flex-col items-start gap-3">
            <p className="text-sm text-gray-600">Connect your Ethereum wallet to continue.</p>
            <ConnectButton />
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">ERC-20 Token Address</label>
              <input
                type="text"
                placeholder="0x..."
                value={token}
                onChange={(e) => setToken(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm font-mono"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Amount</label>
              <input
                type="number"
                placeholder="0.00"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                required
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Stellar Recipient Address</label>
              <input
                type="text"
                placeholder="G..."
                value={stellarRecipient}
                onChange={(e) => setStellarRecipient(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm font-mono"
                required
              />
            </div>
            <button
              type="submit"
              className="mt-2 w-full bg-black text-white py-3 rounded-xl hover:bg-gray-800 text-sm font-medium"
            >
              Deposit & Bridge
            </button>
          </form>
        )}
      </main>
    </>
  );
}
