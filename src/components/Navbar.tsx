import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md px-6 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-teal-700">
        Algorand Testnet Dispenser
      </div>
      <div className="space-x-6 text-sm font-medium">
        <Link
          to="/"
          className="text-gray-700 hover:text-teal-600 transition"
        >
          Home
        </Link>
        <Link
          to="/dispense"
          className="text-gray-700 hover:text-teal-600 transition"
        >
          Dispense
        </Link>
        <Link
          to="/connect"
          className="text-gray-700 hover:text-teal-600 transition"
        >
          Connect Wallet
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
