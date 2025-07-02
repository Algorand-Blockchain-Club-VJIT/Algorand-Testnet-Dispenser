import type { VercelRequest, VercelResponse } from '@vercel/node'

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ success: false, error: "Method Not Allowed" })
  }

  const { token } = req.body
  const secret = process.env.RECAPTCHA_SECRET_KEY

  if (!token || !secret) {
    return res.status(400).json({ success: false, error: "Missing token or secret" })
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token })
    })

    const data = await response.json()

    if (data.success) {
      return res.status(200).json({ success: true })
    } else {
      return res.status(403).json({ success: false, error: data["error-codes"] })
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: "Server error" })
  }
}
