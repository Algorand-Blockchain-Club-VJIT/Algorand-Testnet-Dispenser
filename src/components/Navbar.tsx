import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PeraWalletConnect } from "@perawallet/connect"
import { motion } from "framer-motion"
import { LogIn, LogOut, Droplets } from "lucide-react" // 👈 added icon

const peraWallet = new PeraWalletConnect()

const Navbar = () => {
  const [accountAddress, setAccountAddress] = useState<string | null>(null)

  useEffect(() => {
    peraWallet.reconnectSession().then((accounts) => {
      if (accounts.length) {
        setAccountAddress(accounts[0])
        peraWallet.connector?.on("disconnect", () => setAccountAddress(null))
      }
    })
  }, [])

  const handleConnect = async () => {
    try {
      const accounts = await peraWallet.connect()
      if (accounts.length > 0) {
        setAccountAddress(accounts[0])
        peraWallet.connector?.on("disconnect", () => setAccountAddress(null))
      }
    } catch (error) {
      console.error("Wallet connect error:", error)
    }
  }

  const handleDisconnect = () => {
    peraWallet.disconnect()
    setAccountAddress(null)
  }

  return (
    <motion.nav
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="backdrop-blur-md bg-white/80 dark:bg-black/70 shadow-xl px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800"
    >
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-[#00D9A7] hover:opacity-90 transition"
      >
        <Droplets size={28} strokeWidth={2.5} />
        Algorand Testnet Dispenser
      </Link>

      <div className="space-x-4 flex items-center">
        <Link
          to="/"
          className="text-gray-700 dark:text-gray-200 hover:text-[#00D9A7] transition duration-200 text-sm font-medium"
        >
          Home
        </Link>
        <Link
          to="/dispense"
          className="text-gray-700 dark:text-gray-200 hover:text-[#00D9A7] transition duration-200 text-sm font-medium"
        >
          Dispense
        </Link>

        {accountAddress ? (
          <>
            <motion.span
              className="bg-[#00D9A7] text-white px-3 py-1 rounded-full text-xs font-mono tracking-wide"
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              {accountAddress.slice(0, 6)}...{accountAddress.slice(-4)}
            </motion.span>
            <button
              onClick={handleDisconnect}
              className="flex items-center gap-2 px-3 py-2 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 transition"
            >
              <LogOut size={16} />
              Disconnect
            </button>
          </>
        ) : (
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleConnect}
            className="flex items-center gap-2 bg-[#00D9A7] text-white px-4 py-2 rounded-full hover:bg-[#00c89d] transition"
          >
            <LogIn size={18} />
            Connect Wallet
          </motion.button>
        )}
      </div>
    </motion.nav>
  )
}

export default Navbar
