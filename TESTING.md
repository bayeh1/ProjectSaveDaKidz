# 🧪 Testing Guide

## Quick Local Testing

### Method 1: Direct File Open (Fastest - No Setup Needed!)
1. **Simply double-click `index.html`** in Finder/Explorer
2. Or right-click → "Open with" → Your browser (Chrome, Firefox, Safari, etc.)
3. Test the UI and button interactions
4. **✅ Payment Links WILL work** even with file:// URLs (they redirect to Stripe's website)

This is the **easiest way** to test! No Python, Node.js, or server needed.

---

### Method 2: Local Server (Optional - For Development)

Only needed if you want to test features that require HTTP (like API calls). For this donation site with Payment Links, **Method 1 works perfectly!**

**Option A: Node.js/npx (if installed)**
```bash
npx serve .
```
No installation needed - npx downloads it temporarily. Then open the URL shown (usually http://localhost:3000)

**Option B: Python (if installed)**
```bash
# Python 3
python3 -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```
Then open: http://localhost:8000

**Option C: VS Code Live Server**
- Install "Live Server" extension in VS Code
- Right-click `index.html` → "Open with Live Server"

**Option D: PHP (if installed)**
```bash
php -S localhost:8000
```

**Option E: Browser Extension**
- Chrome: "Web Server for Chrome" extension
- Firefox: Similar extensions available

---

## Testing Stripe Payments

### Step 1: Set Up Test Payment Link

1. Go to [Stripe Dashboard](https://dashboard.stripe.com/test/dashboard)
2. Make sure you're in **Test Mode** (toggle in top right)
3. Navigate to **Products** → **Payment Links**
4. Create a new Payment Link:
   - Enable "Allow customers to enter custom amounts"
   - Copy the test Payment Link URL
5. Update `index.html` with your test Payment Link URL

### Step 2: Use Test Card Numbers

Stripe provides test cards that work in test mode:

| Card Number | Description |
|-------------|-------------|
| `4242 4242 4242 4242` | Success - Visa |
| `4000 0000 0000 0002` | Card declined |
| `4000 0000 0000 9995` | Insufficient funds |

**Test Card Details:**
- **Expiry:** Any future date (e.g., 12/25)
- **CVC:** Any 3 digits (e.g., 123)
- **ZIP:** Any 5 digits (e.g., 12345)

### Step 3: Test the Flow

1. Open your website locally or deployed
2. Click a donation amount button or enter custom amount
3. Click "Donate Now"
4. You should be redirected to Stripe Checkout
5. Use test card: `4242 4242 4242 4242`
6. Complete the payment
7. You should see a success page

---

## Testing Checklist

### UI/UX Testing
- [ ] Page loads correctly
- [ ] Responsive on mobile (resize browser or use dev tools)
- [ ] Amount buttons highlight when clicked
- [ ] Custom amount input works
- [ ] "Donate Now" button is clickable
- [ ] Success page displays correctly

### Payment Flow Testing
- [ ] Clicking "Donate Now" redirects to Stripe
- [ ] Can enter amount on Stripe page (if using Payment Links)
- [ ] Test card payment succeeds
- [ ] Test card declined scenario works
- [ ] Receives confirmation after payment
- [ ] Success page or redirect works

### Browser Testing
Test in multiple browsers:
- [ ] Chrome
- [ ] Firefox
- [ ] Safari
- [ ] Edge
- [ ] Mobile browser (iOS Safari, Chrome Mobile)

---

## Stripe Dashboard Verification

After test payments, verify in Stripe Dashboard:

1. Go to **Payments** section
2. You should see test payments
3. Check payment details:
   - Amount is correct
   - Payment status (succeeded/failed)
   - Customer information (if collected)

---

## Common Issues & Solutions

### Issue: "Payment Link not working"
- **Solution:** Make sure you're using a Payment Link URL from Stripe Dashboard
- Check you're in Test Mode when testing

### Issue: "Can't open file:// in browser"
- **Solution:** Use a local server (see Method 2 above)

### Issue: "Payment declined with test card"
- **Solution:** Make sure you're using Stripe test mode and test card numbers
- Check card number: `4242 4242 4242 4242` for success

### Issue: "Amount buttons don't do anything"
- **Solution:** Check browser console for JavaScript errors (F12 → Console)
- Make sure JavaScript is enabled

---

## Testing with Real Payments (After Launch)

1. Switch Stripe Dashboard to **Live Mode**
2. Update Payment Link URL in `index.html` with live Payment Link
3. Test with a small real amount ($1-5)
4. Verify payment appears in Stripe Dashboard
5. Process refund if needed for testing

**⚠️ Important:** Never use real card numbers in test mode, and never use test cards in live mode!

---

## Automated Testing (Optional)

For more advanced testing, you can use:
- Stripe CLI for webhook testing
- Browser automation (Selenium, Puppeteer)
- E2E testing frameworks (Playwright, Cypress)

But for quick launch, manual testing is sufficient!
