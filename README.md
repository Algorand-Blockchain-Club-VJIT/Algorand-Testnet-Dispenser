# Algorand Testnet Dispenser 2.0

### A simple DApp to dispense Algo Testnet Tokens for developers...

## Features:

- **One Click Dispense:** - We have created the DApp such that once we connect the DApp with the wallet, it will store the address in the DApp and you can simply click on Dispense. If the DApp
- **Recaptcha Verification:** - Although it created a lot of headache for me to implement this (nearly took 4 hours🥲 just for verifying the token in the backend), It's a great feature to prevent abusing by requesting more Algos than needed.
- **Open Source** - No Project is perfect. I am creating this Readme while testing the DApp, and I have noticed 3 more fixes. In the same way, you may also notice some issues in the DApp, just fork, code and send a PR. We will review the code and merge if it's a good one. (Don't forget to star⭐ the repo, I need the StarStruck Badge in my GitHub Profile😅)
- **Live Testnet Balance** - For now, I had connected my testnet wallet for the functionality. It will show the balance from my testnet wallet. (In case if no funds are present, please add into it. Wallet Address - `BI4UMMBDHUASBHVKHUGJKLGOQDGHN4FOYQZYO7P5LE4XMVIHZYYNCT3VTQ`)

---

## Tech Stack Used:

- **Frontend**: React, TypeScript, TailwindCSS
- **Styling Dependencies**: Framer Motion, Lucide React
- **Wallet**: Pera Algo Wallet (will try to add more wallets in upcoming features)
- **Algorand**: AlgoSDK, PeraWalletConnect, Algonode.cloud Testnet API
- **Backend**: Express JS, Node-fetch, Cors
- **Security**: Dotenv package for storing mnemonic, and captcha keys(or else I am doomed)
- **Captcha Verification**: Last but not least, `react-google-recaptcha`, I just hate this one, but needed for security.

## How It Works

- User connects wallet or enters a Testnet address manually.
- reCAPTCHA is shown and must be completed.
- Backend verifies the CAPTCHA using Google Recaptcha.
- If valid, the frontend uses algosdk to send 0.1 ALGO to the address.
- Transaction ID is displayed and the dispenser balance is updated.

## Demo Link: https://algorand-testnet-dispenser.vercel.app/

## For Project Setup:

1. Fork repo
2. Clone repo
- Run this command in the terminal
```bash
git clone https://github.com/ur_github_username/algorand-testnet-dispenser
```
- Change Directory into the project
```bash
cd algorand-testnet-dispenser
```
3. Setup environment variables:
- We have to create two .env files for now. One in project root directory and another in server folder
- Note: mnemonic string shouldn't have commas, just space
- Project root folder/.env
```bash
VITE_DISPENSER_MNEMONIC="Your_wallet_25_mnemonic_words"
VITE_RECAPTCHA_SITE_KEY=your_captcha_site_key
```
- root/server/.env
```bash
RECAPTCHA_SECRET_KEY=your_captcha_secret_key
```
4. Run the command in both server folder and root folder terminal to install node_modules:
```bash
npm install
```
5. Replace line 43 in src/pages/Dispense.tsx file with this:
```js
const verifyRes = await fetch("https://localhost:3001/verify-recaptcha", {
```
6. Run `node server.js` in server folder and `npm run dev` in project root folder.
7. Open 'localhost:5173' to open the DApp.

## For Open Source:

1. Open terminal in your project root folder.
2. Create a new branch using the command:
```bash
git checkout -b feature/fix_name
```
3. Do your changes and then stage the files:
```bash
git add .
```
4. Commit them:
```bash
git commit -m "Your commit msg"
```
5. Push to ur repo
```bash
git push origin branch_name
```
- That feature/fix_name is the branch_name
6. Open ur github repo and create a Pull Request.

---

### This project deserves a star⭐, so please star the repo😅...