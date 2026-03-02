# 🚀 Quick Start Guide - Launch in 5 Minutes

## Fastest Way to Launch (Stripe Payment Links)

### Step 1: Set Up Stripe Payment Link (2 minutes)

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/login)
2. Click **Products** → **Payment Links** → **Create payment link**
3. Set up your product:
   - **Name:** Donation to Save Da Kidz
   - **Price:** Enable **"Allow customers to enter custom amounts"** ✅
   - **Description:** (Optional) Add your charity description
4. Copy your Payment Link URL (looks like: `https://buy.stripe.com/abc123...`)

### Step 2: Update Your Website (1 minute)

1. Open `src/js/config.js`
2. Find this line:
   ```javascript
   paymentLinkUrl: 'https://buy.stripe.com/YOUR_PAYMENT_LINK_ID',
   ```
3. Replace `YOUR_PAYMENT_LINK_ID` with your actual Payment Link URL
4. Save the file

### Step 3: Deploy (2 minutes)

Choose one:

**Option A: Vercel (Recommended)**
- Go to [vercel.com](https://vercel.com)
- Sign up/login
- Click "Add New Project"
- Import your folder or connect to GitHub
- Deploy! ✅

**Option B: Netlify**
- Go to [netlify.com](https://netlify.com)
- Drag and drop your project folder
- Deploy! ✅

**Option C: GitHub Pages**
- Push code to GitHub
- Go to Settings → Pages
- Select main branch
- Deploy! ✅

---

## That's It! 🎉

Your donation website is now live. Test it with Stripe's test mode first, then switch to live mode when ready.

---

## Want More Control? (Stripe Checkout - 15 minutes)

If you want the amount buttons to work directly (without redirecting to Stripe's page):

1. Get your Stripe API keys from Dashboard
2. Set up the serverless function (`api/create-checkout.js`)
3. Add environment variable: `STRIPE_SECRET_KEY`
4. Update `src/js/config.js` to use Option 2 (uncomment and configure)
5. Deploy

See `README.md` for full details.

---

## Testing

- Use Stripe test card: `4242 4242 4242 4242`
- Any future expiry date
- Any 3-digit CVC
- Any ZIP code

---

**Need help?** Check the main README.md for more details!
