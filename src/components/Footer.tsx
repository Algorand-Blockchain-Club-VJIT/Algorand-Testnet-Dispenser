// src/components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-[#2f4040] text-center text-sm text-gray-300 py-4 border-t border-gray-700">
      <p>
        Built by{" "}
        <a
          href="https://github.com/vjlive"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#00D9A7] underline hover:opacity-80"
        >
          VJLIVE
        </a>{" "}
        • Powered by{" "}
        <a
          href="https://developer.algorand.org/docs/get-details/testnet/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#00D9A7] underline hover:opacity-80"
        >
          Algorand Testnet
        </a>
      </p>
    </footer>
  )
}

export default Footer
