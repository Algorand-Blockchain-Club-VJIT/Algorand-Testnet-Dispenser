// src/components/Navbar.tsx
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PeraWalletConnect } from "@perawallet/connect"

const peraWallet = new PeraWalletConnect()

const Navbar = () => {
  const [accountAddress, setAccountAddress] = useState<string | null>(null)

  // Auto reconnect on refresh
  useEffect(() => {
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length) {
        setAccountAddress(accounts[0])
        peraWallet.connector?.on("disconnect", () => {
          setAccountAddress(null)
        })
      }
    })
  }, [])

  const handleConnect = async () => {
    try {
      const accounts = await peraWallet.connect()
      if (accounts.length > 0) {
        setAccountAddress(accounts[0])
      }

      // Handle disconnect
      peraWallet.connector?.on("disconnect", () => {
        setAccountAddress(null)
      })
    } catch (error) {
      console.error("Wallet connect error:", error)
    }
  }

  const handleDisconnect = () => {
    peraWallet.disconnect()
    setAccountAddress(null)
  }

  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-teal-700">
        Algorand Testnet Dispenser
      </div>

      <div className="space-x-6 text-sm font-medium flex items-center">
        <Link to="/" className="text-gray-700 hover:text-teal-600 transition">
          Home
        </Link>
        <Link to="/dispense" className="text-gray-700 hover:text-teal-600 transition">
          Dispense
        </Link>

        {accountAddress ? (
          <>
            <span className="text-teal-700 text-sm font-mono">
              {accountAddress.slice(0, 6)}...{accountAddress.slice(-4)}
            </span>
            <button
              onClick={handleDisconnect}
              className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Disconnect
            </button>
          </>
        ) : (
          <button
            onClick={handleConnect}
            className="bg-teal-600 text-white px-4 py-2 rounded-full hover:bg-teal-700"
          >
            Connect Wallet
          </button>
        )}
      </div>
    </nav>
  )
}

export default Navbar
