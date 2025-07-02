import algosdk from "algosdk"

// Replace this with your funded Testnet mnemonic (25 words)
const DISPENSER_MNEMONIC = import.meta.env.VITE_DISPENSER_MNEMONIC
const dispenserAccount = algosdk.mnemonicToSecretKey(DISPENSER_MNEMONIC)

// Algorand Testnet client
const algodClient = new algosdk.Algodv2("", "https://testnet-api.algonode.cloud", "")

export async function sendAlgo(receiver: string, amount = 100_000) {
  if (!receiver || typeof receiver !== "string" || receiver.length !== 58) {
    console.error("🚨 Invalid receiver passed:", receiver)
    throw new Error("❌ Receiver address is invalid or missing")
  }

  if (receiver === String(dispenserAccount.addr)) {
    console.warn("🚫 Sender and receiver are the same")
    throw new Error("❌ Cannot send to the same dispenser address")
  }

  try {
    const params = await algodClient.getTransactionParams().do()
    console.log("✅ Params:", params)

    const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      sender: dispenserAccount.addr,
      receiver, // ✅ not `to`
      amount,
      note: undefined,
      suggestedParams: params,
    })

    const signedTxn = txn.signTxn(dispenserAccount.sk)
    const txId = txn.txID()

    console.log("📤 Sending transaction:", txId)
    await algodClient.sendRawTransaction(signedTxn).do()
    await algosdk.waitForConfirmation(algodClient, txId, 4)

    return { success: true, txId }
  } catch (error) {
    console.error("❌ Failed to send ALGO:", error)
    return {
      success: false,
      error: error instanceof Error ? error : new Error("Unknown error"),
    }
  }
}

export async function getDispenserBalance() {
  try {
    const accountInfo = await algodClient.accountInformation(dispenserAccount.addr).do()
    return Number(accountInfo.amount) / 1e6
  } catch (error) {
    console.error("❌ Failed to fetch dispenser balance:", error)
    return null
  }
}