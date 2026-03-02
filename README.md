# Save Da Kidz - Donation Website

A fast, lightweight donation website for charity fundraising. Built with vanilla HTML/CSS/JS and Tailwind CSS for maximum performance and quick deployment.

## 🚀 Quick Launch (Fastest Option - No Backend Required)

### Option 1: Stripe Payment Links (Recommended for Speed)

1. **Set up Stripe Payment Link:**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com)
   - Navigate to **Products** → **Payment Links**
   - Create a new Payment Link
   - Enable **"Allow customers to enter custom amounts"** ✅
   - Copy your Payment Link URL

2. **Update the website:**
   - Open `src/js/config.js`
   - Find the line: `paymentLinkUrl: 'https://buy.stripe.com/YOUR_PAYMENT_LINK_ID'`
   - Replace with your Payment Link URL
   - Save and deploy!

3. **Deploy:**
   - **Vercel:** Drag and drop the folder to [vercel.com](https://vercel.com)
   - **Netlify:** Drag and drop to [netlify.com](https://netlify.com)
   - **GitHub Pages:** Push to GitHub and enable Pages
   - **Any static host:** Upload `index.html` to your web server

**Time to launch: ~5 minutes**

> **Note:** With Payment Links, the amount buttons on the page are suggestions. Users will enter their final donation amount on Stripe's secure checkout page.

---

### Option 2: Stripe Checkout (More Control, Requires Backend)

If you want more control over the checkout experience:

1. **Set up Stripe:**
   - Create account at [stripe.com](https://stripe.com)
   - Get your **Publishable Key** and **Secret Key**
   - Update `src/js/config.js` with your publishable key

2. **Deploy Backend Function:**
   - Use the provided serverless function (see `/api` folder)
   - Deploy to Vercel or Netlify
   - Update the API endpoint in `index.html`

3. **Deploy Frontend:**
   - Deploy `index.html` to your hosting platform

**Time to launch: ~15 minutes**

---

## 📁 File Structure

```
ProjectSaveDaKidz/
├── index.html              # Main donation page (clean HTML)
├── success.html            # Success page after donation
├── README.md               # This file
├── QUICK_START.md          # Quick launch guide
├── TESTING.md              # Testing instructions
├── package.json            # npm scripts
├── src/                    # Source files
│   ├── css/
│   │   └── styles.css      # Custom styles
│   └── js/
│       ├── main.js         # Application entry point
│       ├── config.js       # Configuration (Stripe keys, etc.)
│       └── donation.js     # Donation handler logic
├── util/                   # Utility files
│   └── constants.js        # Application constants
└── api/                    # Serverless functions (optional)
    └── create-checkout.js  # Stripe Checkout Session handler
```

## 🎨 Customization

### Colors
The site uses a purple gradient theme. To change colors:
- Search for `purple-600`, `indigo-600`, `#667eea`, `#764ba2`
- Replace with your brand colors

### Content
- Update "Save Da Kidz" with your charity name
- Modify the mission statement in the About section
- Adjust donation amount buttons (currently: $25, $50, $100, $250)

### Logo
Add your logo in the hero section:
```html
<img src="your-logo.png" alt="Your Charity" class="h-16 mx-auto mb-4">
```

## 🔒 Security Notes

- Never commit your Stripe Secret Key to version control
- Use environment variables for sensitive data
- Enable HTTPS in production (most hosts do this automatically)

## 📊 Analytics

Consider adding:
- Google Analytics
- Facebook Pixel
- Stripe Dashboard (tracks donations automatically)

## 🚀 Performance

This site is optimized for speed:
- **No build step required**
- **Minimal dependencies** (only Tailwind CSS CDN)
- **Fast loading** (under 100KB total)
- **Works offline** after first load (can be enhanced with Service Worker)

## 💳 Stripe Setup Checklist

- [ ] Create Stripe account
- [ ] Complete business verification
- [ ] Set up Payment Link (Option 1) OR Get API keys (Option 2)
- [ ] Test with Stripe test mode
- [ ] Switch to live mode when ready
- [ ] Configure webhook notifications (optional, for advanced use)

## 📝 License

This project is free to use for charitable purposes.

---

**Need help?** Check out:
- [Stripe Documentation](https://stripe.com/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Vercel Deployment](https://vercel.com/docs)

**Built with ❤️ for making a difference**
