import { useEffect, useState } from "react"
import { sendAlgo } from "../utils/dispenseAlgo"
import { PeraWalletConnect } from "@perawallet/connect"

const peraWallet = new PeraWalletConnect()

const Dispense = () => {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null)
  const [manualAddress, setManualAddress] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)

  // Auto-reconnect to Pera wallet
  useEffect(() => {
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length) {
        setConnectedAddress(accounts[0])
        peraWallet.connector?.on("disconnect", () => {
          setConnectedAddress(null)
        })
      }
    })
  }, [])

  const handleDispense = async (addressToSend: string) => {
    if (!addressToSend || addressToSend.length !== 58) {
      setStatus("❌ Invalid Algorand address")
      return
    }

    setLoading(true)
    setStatus("Sending...")

    try {
      const { success, txId, error } = await sendAlgo(addressToSend)
      if (success) {
        setStatus(`✅ Sent successfully! Tx ID: ${txId}`)
      } else {
        setStatus(`❌ Error: ${error?.message || "Transaction failed"}`)
      }
    } catch (err: any) {
      setStatus(`❌ ${err.message}`)
    }

    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md text-center space-y-6">
        <h1 className="text-2xl font-bold text-teal-600">🚰 Dispense Testnet ALGO</h1>

        {connectedAddress ? (
          <>
            <p className="text-sm text-gray-700">
              Connected wallet:{" "}
              <span className="font-mono">{connectedAddress}</span>
            </p>
            <button
              onClick={() => handleDispense(connectedAddress)}
              disabled={loading}
              className="w-full bg-teal-600 text-white font-semibold py-2 rounded hover:bg-teal-700"
            >
              {loading ? "Sending..." : "Dispense 0.1 ALGO"}
            </button>
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Enter your Algorand Testnet address"
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              className="w-full border px-4 py-2 rounded"
            />
            <button
              onClick={() => handleDispense(manualAddress)}
              disabled={loading}
              className="w-full bg-teal-600 text-white font-semibold py-2 rounded hover:bg-teal-700"
            >
              {loading ? "Sending..." : "Dispense 0.1 ALGO"}
            </button>
          </>
        )}

        {status && <p className="text-sm text-gray-700">{status}</p>}
      </div>
    </div>
  )
}

export default Dispense
