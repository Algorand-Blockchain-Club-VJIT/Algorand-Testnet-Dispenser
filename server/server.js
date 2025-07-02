import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import fetch from "node-fetch"
import dotenv from "dotenv"

dotenv.config()
const app = express()
app.use(cors())
app.use(bodyParser.json())

const SECRET_KEY = process.env.RECAPTCHA_SECRET_KEY

app.post("/verify-recaptcha", async (req, res) => {
  const { token } = req.body
  if (!token) {
    return res.status(400).json({ success: false, error: "No token provided" })
  }

  try {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        secret: SECRET_KEY,
        response: token
      })
    })
    const raw = await response.text()
    console.log("🔍 Raw response from Google:", raw)
    let data
    try {
      data = JSON.parse(raw)
    } catch (err) {
      console.error("❌ JSON parse error:", err)
      return res.status(500).json({ success: false, error: "Invalid JSON from Google" })
    }

    console.log("🔍 Verification result:", data)
    if (data.success) {
      res.json({ success: true })
    } else {
      res.status(403).json({ success: false, error: data["error-codes"] })
    }
  } catch (err) {
    res.status(500).json({ success: false, error: "Server error" })
  }
})

app.listen(3001, () => console.log("✅ Server running on http://localhost:3001"))
