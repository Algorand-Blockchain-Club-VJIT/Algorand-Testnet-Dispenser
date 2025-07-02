import { Link } from "react-router-dom"
import algorandLogo from "/algorand.svg"
import { motion } from "framer-motion"
import { Droplet, Terminal, Rocket, Info, Link as LinkIcon } from "lucide-react"

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-slate-900 to-[#00D9A7] px-4 pt-32 pb-10 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-md rounded-3xl shadow-2xl p-10 max-w-5xl w-full text-center border border-white/10">
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center space-y-4"
        >
          <img src={algorandLogo} alt="Algorand" className="w-16 h-16" />
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
            Algorand Testnet Dispenser
          </h1>
          <p className="text-teal-100 text-lg max-w-xl">
            Get instant ALGO tokens for development and testing on the Algorand Testnet — built for builders, powered by open web.
          </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
          {[
            {
              icon: <Droplet size={28} />,
              title: "Free Testnet ALGO",
              desc: "Instantly receive 0.1 ALGO for testing dApps on Algorand's blazing-fast blockchain.",
            },
            {
              icon: <Terminal size={28} />,
              title: "Wallet Integration",
              desc: "Easily connect your wallet via Pera Wallet or paste your Testnet address manually.",
            },
            {
              icon: <Rocket size={28} />,
              title: "One-Click Dispense",
              desc: "Click once. Funds sent. Ready to build — with minimal wait time or friction.",
            },
            {
              icon: <Info size={28} />,
              title: "Open Source Code",
              desc: "Fork it, improve it, remix it — the source is open and community-powered.",
            },
            {
              icon: <LinkIcon size={28} />,
              title: "Developer Resources",
              desc: "Guides, docs, and starter kits using AlgoKit to speed up your dApp journey.",
            },
            {
              icon: <Droplet size={28} />,
              title: "Secure & Rate Limited",
              desc: "reCAPTCHA-protected to prevent abuse and ensure fair use for all developers.",
            },
          ].map(({ icon, title, desc }, idx) => (
            <motion.div
              key={idx}
              whileHover={{ y: -6, boxShadow: "0px 12px 30px rgba(0,0,0,0.3)" }}
              transition={{ type: "spring", stiffness: 200 }}
              className="rounded-xl bg-white/10 text-white p-6 text-left space-y-3 backdrop-blur-lg border border-white/10"
            >
              <div className="text-[#00D9A7]">{icon}</div>
              <h3 className="text-lg font-bold">{title}</h3>
              <p className="text-sm text-gray-200">{desc}</p>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-10"
        >
          <Link
            to="/dispense"
            className="inline-block px-8 py-3 bg-[#00D9A7] text-white rounded-full font-bold shadow-md hover:shadow-xl transition hover:bg-[#00c89d]"
          >
            Go to Dispense Page
          </Link>
        </motion.div>
      </div>
    </div>
  )
}

export default Home
