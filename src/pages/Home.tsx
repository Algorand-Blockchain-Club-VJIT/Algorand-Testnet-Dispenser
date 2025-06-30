import { Link } from 'react-router-dom'
import algorandLogo from '/algorand.svg'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-teal-200 flex items-center justify-center px-4 py-8">
      <div className="bg-white rounded-3xl shadow-xl p-10 max-w-3xl w-full text-center space-y-6 border-t-8 border-teal-500">
        <div className="flex flex-col items-center justify-center space-y-3">
          <img src={algorandLogo} alt="Algorand" className="w-16 h-16" />
          <h1 className="text-4xl font-extrabold text-teal-700">Algorand Testnet Dispenser</h1>
        </div>

        <p className="text-gray-700 text-lg">
          Need ALGO to test your dApp on Algorand Testnet? You've come to the right place.
          Instantly receive Testnet ALGO tokens to your wallet and start building.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-gray-600 text-sm">
          <div className="bg-teal-50 rounded-md p-4 shadow-inner">
            ✅ Free Testnet ALGO for developers
          </div>
          <div className="bg-teal-50 rounded-md p-4 shadow-inner">
            🛠️ Easy Wallet Address Submission
          </div>
          <div className="bg-teal-50 rounded-md p-4 shadow-inner">
            🚀 Instant Token Dispense
          </div>
        </div>

        <Link
          to="/dispense"
          className="inline-block mt-4 px-8 py-3 bg-teal-600 text-white rounded-full font-semibold hover:bg-teal-700 transition"
        >
          🚰 Go to Dispense Page
        </Link>

        <p className="text-sm text-gray-500 mt-4">
          Powered by <a href="https://developer.algorand.org/" className="text-teal-600 underline">AlgoKit</a>
        </p>
      </div>
    </div>
  )
}

export default Home
