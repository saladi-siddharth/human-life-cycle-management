# 🚀 BioVerse Platform — Live Deployment & Free Domain Guide

This guide walks you through deploying your **BioVerse Life Management Platform** live on the internet and connecting a free custom domain via **DigitalPlat FreeDomain**.

---

## ⚡ Step 1: Deploy Live for Free

Your repository is pre-configured for instant one-click zero-config deployment on **Vercel** and **Render**.

### Option A: Deploy on Vercel (Recommended for Speed & Global CDN)
1. Go to **[https://vercel.com](https://vercel.com)** and sign in with your GitHub account.
2. Click **"Add New..."** ➔ **"Project"**.
3. Import your repository: `saladi-siddharth/human-life-cycle-management`.
4. Leave build settings as default (the included `vercel.json` will automatically configure Node.js serverless functions & static assets).
5. (Optional) Add your Environment Variables if needed:
   - `EMAIL_USER`: `mahisiddharth721@gmail.com`
   - `EMAIL_PASS`: `mqoqiqzpcfcqvnzp`
   - `TIDB_HOST`: `gateway01.ap-southeast-1.prod.alicloud.tidbcloud.com`
   - `TIDB_PORT`: `4000`
   - `TIDB_USER`: `3aposv8BwtQq1iQ.root`
   - `TIDB_PASSWORD`: `iV5raMCYdId3skvO`
   - `TIDB_DATABASE`: `test`
6. Click **Deploy**. Your app will be live at `https://human-life-cycle-management.vercel.app` (or similar)!

---

### Option B: Deploy on Render (Full Persistent Background Node.js Server)
1. Go to **[https://render.com](https://render.com)** and log in with GitHub.
2. Click **"New +"** ➔ **"Web Service"**.
3. Connect your repository: `saladi-siddharth/human-life-cycle-management`.
4. Select **Node** environment, Build Command: `npm install`, Start Command: `npm start`.
5. Click **Create Web Service**. Your app is live at `https://human-life-cycle-management.onrender.com`.

---

## 🌐 Step 2: Claim Your Free Domain with DigitalPlat FreeDomain

DigitalPlat FreeDomain ([GitHub: DigitalPlatDev/FreeDomain](https://github.com/DigitalPlatDev/FreeDomain)) provides free domain extensions including:
- `.US.KG`
- `.DPDNS.ORG`
- `.QZZ.IO`
- `.XX.KG`
- `.QD.JE`

### Registration Steps:
1. Open the official dashboard: **[https://dash.domain.digitalplat.org/](https://dash.domain.digitalplat.org/)**
2. Sign in with your **GitHub Account** (`saladi-siddharth`).
3. Search for your preferred domain name (e.g. `bioverse.dpdns.org` or `bioverse-india.us.kg`).
4. Click **Register / Claim Domain**.

---

## 🔗 Step 3: Connect Your Free Domain to Your Live Website

### Method 1: Connecting to Vercel
1. In your **Vercel Dashboard**, go to your BioVerse project ➔ **Settings** ➔ **Domains**.
2. Type your registered domain (e.g. `bioverse.dpdns.org`) and click **Add**.
3. Vercel will provide you with DNS Records (e.g. `CNAME cname.vercel-dns.com` or `A 76.76.21.21`).
4. In your **DigitalPlat Domain Dashboard** (or Cloudflare DNS if nameserver delegation is used), add the DNS record pointing to Vercel.
5. Within a few minutes, SSL certificate will auto-generate and your project will be live on your free custom domain!

### Method 2: Connecting with Cloudflare DNS
1. Sign up for a free **[Cloudflare](https://dash.cloudflare.com/)** account.
2. Add your registered domain in Cloudflare.
3. Copy the Cloudflare Nameservers (e.g. `ns1.cloudflare.com`, `ns2.cloudflare.com`).
4. In the **DigitalPlat FreeDomain Dashboard**, set the custom nameservers to Cloudflare.
5. In Cloudflare DNS management, add a CNAME record pointing `@` and `www` to your Vercel/Render deployment URL!
