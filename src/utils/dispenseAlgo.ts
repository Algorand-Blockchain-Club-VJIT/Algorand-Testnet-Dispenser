import algosdk from "algosdk"

// Public Algorand Testnet API node (via AlgoNode)
const algodClient = new algosdk.Algodv2(
    "",
    "https://testnet-api.algonode.cloud",
    ""
)

// Replace with your dispenser mnemonic
const DISPENSER_MNEMONIC = import.meta.env.VITE_DISPENSER_MNEMONIC!
const dispenserAccount = algosdk.mnemonicToSecretKey(DISPENSER_MNEMONIC)

export async function sendAlgo(receiver: string, amount = 100_000) {
    try {
        const params = await algodClient.getTransactionParams().do()
        const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
            from: dispenserAccount.addr,
            to: receiver,
            amount,
            suggestedParams: params,
        } as any)

        const signedTxn = txn.signTxn(dispenserAccount.sk)
        const txId = txn.txID() // ✅ safer and typed
        await algodClient.sendRawTransaction(signedTxn).do()

        await algosdk.waitForConfirmation(algodClient, txId, 4)

        return { success: true, txId }
    } catch (error) {
        console.error("Failed to send ALGO:", error)
        return { success: false, error }
    }
}
