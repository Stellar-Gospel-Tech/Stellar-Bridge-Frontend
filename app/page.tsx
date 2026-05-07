import { Navbar } from "@/components/Navbar";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto px-6 py-20 text-center">
        <h1 className="text-4xl font-bold mb-4">Stellar Bridge</h1>
        <p className="text-gray-500 mb-10">
          Move ERC-20 tokens onto Stellar as SEP-41 tokens, and back.
          Trust-minimized. Open source.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/bridge/eth-to-stellar"
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800"
          >
            ETH → Stellar
          </Link>
          <Link
            href="/bridge/stellar-to-eth"
            className="px-6 py-3 border border-black rounded-xl hover:bg-gray-50"
          >
            Stellar → ETH
          </Link>
        </div>
      </main>
    </>
  );
}
