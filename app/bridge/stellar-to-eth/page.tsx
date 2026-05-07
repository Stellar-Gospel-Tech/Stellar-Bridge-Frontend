"use client";

import { useState } from "react";
import { FreighterButton } from "@/components/FreighterButton";
import { Navbar } from "@/components/Navbar";

export default function StellarToEthPage() {
  const [amount, setAmount] = useState("");
  const [ethRecipient, setEthRecipient] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // TODO: call bridge.deposit(from, amount, ethRecipient, nonce) on Soroban
    console.log("deposit", { amount, ethRecipient });
  }

  return (
    <>
      <Navbar />
      <main className="max-w-lg mx-auto px-6 py-16">
        <h1 className="text-2xl font-bold mb-2">Stellar → ETH</h1>
        <p className="text-gray-500 text-sm mb-8">
          Lock a SEP-41 token on Stellar. The relayer will release the
          equivalent ERC-20 token to your Ethereum address.
        </p>

        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm text-gray-600">Stellar wallet:</span>
          <FreighterButton />
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            <label className="block text-sm font-medium mb-1">Ethereum Recipient Address</label>
            <input
              type="text"
              placeholder="0x..."
              value={ethRecipient}
              onChange={(e) => setEthRecipient(e.target.value)}
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
      </main>
    </>
  );
}
