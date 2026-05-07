"use client";

import { useState } from "react";
import { isConnected, getAddress } from "@stellar/freighter-api";

export function FreighterButton() {
  const [stellarAddress, setStellarAddress] = useState<string | null>(null);

  async function connect() {
    const connected = await isConnected();
    if (!connected) {
      alert("Please install the Freighter wallet extension.");
      return;
    }
    const { address } = await getAddress();
    setStellarAddress(address);
  }

  if (stellarAddress) {
    return (
      <span className="text-sm font-mono bg-gray-100 px-3 py-1 rounded-full">
        {stellarAddress.slice(0, 6)}…{stellarAddress.slice(-4)}
      </span>
    );
  }

  return (
    <button
      onClick={connect}
      className="text-sm px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
    >
      Connect Freighter
    </button>
  );
}
