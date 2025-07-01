import algosdk from "algosdk"

// Public Algorand Testnet API node (via AlgoNode)
const algodClient = new algosdk.Algodv2(
  "", // no API token needed
  "https://testnet-api.algonode.cloud",
  ""
)

// Replace this mnemonic with your funded dispenser wallet
const DISPENSER_MNEMONIC = "your twelve or twenty-five word mnemonic here"
const dispenserAccount = algosdk.mnemonicToSecretKey(DISPENSER_MNEMONIC)

export async function sendAlgo(receiver: string, amount = 100_000) {
  try {
    const params = await algodClient.getTransactionParams().do()

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: dispenserAccount.addr,
      to: receiver,
      amount, // microAlgos
      suggestedParams: params,
    })

    const signedTxn = txn.signTxn(dispenserAccount.sk)
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do()
    await algosdk.waitForConfirmation(algodClient, txId, 4)

    return { success: true, txId }
  } catch (error) {
    console.error("Failed to send ALGO:", error)
    return { success: false, error }
  }
}
