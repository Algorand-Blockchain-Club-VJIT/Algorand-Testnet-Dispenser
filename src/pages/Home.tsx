import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-100 to-teal-200 p-6">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg w-full text-center space-y-6">
        <h1 className="text-3xl font-bold text-teal-700">🌊 Welcome to AlgoKit Dispenser</h1>
        <p className="text-gray-600">
          This is the homepage. Use the navigation below to access the token faucet.
        </p>
        <Link
          to="/dispense"
          className="inline-block px-6 py-3 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition"
        >
          Go to Dispense Page
        </Link>
      </div>
    </div>
  )
}

export default Home
