import { useEffect, useState, useRef } from "react"
import { sendAlgo, getDispenserBalance } from "../utils/dispenseAlgo"
import { PeraWalletConnect } from "@perawallet/connect"
import ReCAPTCHA from "react-google-recaptcha"
import { motion } from "framer-motion"
import { Droplet, Loader2 } from "lucide-react"

const peraWallet = new PeraWalletConnect()
const SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY!

const Dispense = () => {
  const [connectedAddress, setConnectedAddress] = useState<string | null>(null)
  const [manualAddress, setManualAddress] = useState("")
  const [status, setStatus] = useState("")
  const [loading, setLoading] = useState(false)
  const [verified, setVerified] = useState(false)
  const [sourceBalance, setSourceBalance] = useState<number | null>(null)
  const captchaRef = useRef<ReCAPTCHA>(null)

  useEffect(() => {
    getDispenserBalance().then(setSourceBalance)
  }, [])

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

  const handleDispense = async (address: string) => {
    const token = captchaRef.current?.getValue()
    if (!token) {
      setStatus("❌ Please complete the CAPTCHA")
      return
    }

    try {
      const verifyRes = await fetch("https://algorand-testnet-dispenser-backend.up.railway.app/verify-recaptcha", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      })

      const verifyData = await verifyRes.json()
      if (!verifyData.success) {
        setStatus("❌ CAPTCHA verification failed")
        return
      }
    } catch (err) {
      setStatus("❌ Server error verifying CAPTCHA")
      return
    }

    if (!address || address.length !== 58) {
      setStatus("❌ Invalid Algorand address")
      return
    }

    setLoading(true)
    setStatus("Sending...")

    try {
      const result = await sendAlgo(address)
      if (result.success) {
        setStatus(`✅ Success! Tx ID: ${result.txId}`)
        getDispenserBalance().then(setSourceBalance)
      } else if (result.error instanceof Error) {
        setStatus(`❌ Failed: ${result.error.message}`)
      } else {
        setStatus("❌ Failed: Unknown error")
      }
    } catch (err: any) {
      setStatus(`❌ Exception: ${err.message}`)
    }

    setLoading(false)
    setVerified(false)
    captchaRef.current?.reset()
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-black via-slate-900 to-[#00D9A7] flex flex-col items-center justify-center px-4 py-20">
      <div className="scale-[0.85] origin-top md:scale-100 z-10 mb-4">
        <ReCAPTCHA
          sitekey={SITE_KEY}
          onChange={() => setVerified(true)}
          onExpired={() => setVerified(false)}
          ref={captchaRef}
        />
      </div>
      <div className="text-white text-sm font-mono mb-4">
        Faucet Balance:{" "}
        {sourceBalance !== null ? (
          <span className="text-[#00D9A7] font-semibold">{sourceBalance.toFixed(6)} ALGO</span>
        ) : (
          <span className="text-red-400">Loading...</span>
        )}
      </div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 w-full max-w-md text-center border border-white/10"
      >
        <div className="flex items-center justify-center gap-2 text-white text-2xl font-bold mb-4">
          <Droplet size={28} strokeWidth={2.5} />
          Testnet Dispenser
        </div>

        <div className="mt-4 space-y-4">
          {connectedAddress ? (
            <>
              <p className="text-sm text-gray-300 break-words max-w-full">
                Connected Wallet:{" "}
                <span className="font-mono text-white break-words text-sm block max-w-xs mx-auto">
                  {connectedAddress}
                </span>
              </p>
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => handleDispense(connectedAddress)}
                disabled={loading || !verified}
                className={`w-full flex items-center justify-center gap-2 bg-[#00D9A7] text-white font-semibold py-2 rounded-full hover:bg-[#00c89d] transition ${loading || !verified ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Droplet size={18} />}
                {loading ? "Sending..." : "Send 0.1 ALGO"}
              </motion.button>
            </>
          ) : (
            <>
              <input
                type="text"
                placeholder="Enter Wallet address"
                value={manualAddress}
                onChange={(e) => setManualAddress(e.target.value)}
                className="w-full border border-white/20 bg-white/10 text-white placeholder-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-[#00D9A7]"
              />
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => handleDispense(manualAddress)}
                disabled={loading || !verified}
                className={`w-full flex items-center justify-center gap-2 bg-[#00D9A7] text-white font-semibold py-2 rounded-full hover:bg-[#00c89d] transition ${loading || !verified ? "opacity-50 cursor-not-allowed" : ""
                  }`}
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Droplet size={18} />}
                {loading ? "Sending..." : "Send 0.1 ALGO"}
              </motion.button>
            </>
          )}
        </div>
        {status && (
          <p className="text-sm text-gray-100 mt-4 break-all font-mono">{status}</p>
        )}
      </motion.div>
    </div>
  )
}

export default Dispense
