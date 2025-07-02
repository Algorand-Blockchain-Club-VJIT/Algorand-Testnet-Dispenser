import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { PeraWalletConnect } from "@perawallet/connect"
import { motion, AnimatePresence } from "framer-motion"
import { LogIn, LogOut, Droplets, Menu, X } from "lucide-react"

const peraWallet = new PeraWalletConnect()

const Navbar = () => {
  const [accountAddress, setAccountAddress] = useState<string | null>(null)
  const [menuOpen, setMenuOpen] = useState(false)

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
    <>
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="backdrop-blur-md bg-white/80 dark:bg-black/70 shadow-xl px-6 py-4 flex items-center justify-between fixed top-0 left-0 right-0 z-50 border-b border-gray-200 dark:border-gray-800"
      >
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-2xl font-extrabold tracking-tight text-[#00D9A7] hover:opacity-90 transition"
        >
          <Droplets size={28} strokeWidth={2.5} />
          Algorand Dispenser
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link
            to="/"
            className="text-gray-700 dark:text-gray-200 hover:text-[#00D9A7] transition text-sm font-medium"
          >
            Home
          </Link>
          <Link
            to="/dispense"
            className="text-gray-700 dark:text-gray-200 hover:text-[#00D9A7] transition text-sm font-medium"
          >
            Dispense
          </Link>

          {accountAddress ? (
            <>
              <span className="bg-[#00D9A7] text-white px-3 py-1 rounded-full text-xs font-mono tracking-wide">
                {accountAddress.slice(0, 6)}...{accountAddress.slice(-4)}
              </span>
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
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleConnect}
              className="relative flex items-center gap-2 overflow-hidden px-6 py-2 rounded-full bg-[#00D9A7] text-white text-sm font-semibold transition-all duration-300 hover:bg-[#00c89d] focus:outline-none"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: accountAddress ? "0%" : "-100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="absolute inset-0 bg-black/20 z-0"
              />
              <div className="z-10">
                <LogIn size={18} />
              </div>
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: accountAddress ? 0 : 1 }}
                transition={{ duration: 0.3 }}
                className="z-10"
              >
                Connect Wallet
              </motion.span>
            </motion.button>
          )}
        </div>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-[#00D9A7]"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </motion.nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-64 h-full bg-black dark:bg-black shadow-xl z-40 pt-30 px-6 space-y-6 md:hidden"
          >
            <div className="flex justify-between items-center mb-4">
              <p className="text-lg font-bold text-[#00D9A7]">Menu</p>
            </div>

            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 dark:text-gray-200 hover:text-[#00D9A7] text-sm font-medium"
            >
              Home
            </Link>
            <Link
              to="/dispense"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-700 dark:text-gray-200 hover:text-[#00D9A7] text-sm font-medium"
            >
              Dispense
            </Link>

            {accountAddress ? (
              <>
                <div className="bg-[#00D9A7] text-white px-3 py-1 rounded-full text-xs font-mono tracking-wide">
                  {accountAddress.slice(0, 6)}...{accountAddress.slice(-4)}
                </div>
                <button
                  onClick={() => {
                    handleDisconnect()
                    setMenuOpen(false)
                  }}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 transition"
                >
                  <LogOut size={16} />
                  Disconnect
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleConnect()
                  setMenuOpen(false)
                }}
                className="flex items-center gap-2 px-4 py-2 bg-[#00D9A7] text-white text-sm rounded-full hover:bg-[#00c89d] transition"
              >
                <LogIn size={18} />
                Connect Wallet
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
