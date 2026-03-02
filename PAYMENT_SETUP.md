# Payment Methods Setup Guide

This guide explains how to set up alternative payment methods (Cash App, Venmo, PayPal, Zelle) alongside Stripe.

## Quick Setup

1. Open `src/js/config.js`
2. Enable payment methods by setting `enabled: true`
3. Add your payment details (links, usernames, etc.)
4. Save and deploy!

---

## Payment Method Options

### 💳 Stripe (Credit/Debit Cards) - **Default**

**Already configured!** Just add your Stripe Payment Link.

**Pros:**
- ✅ Accepts all major credit/debit cards
- ✅ Automatic receipts
- ✅ Professional checkout
- ❌ Processing fees (2.9% + $0.30)

**Setup:**
1. Get your Payment Link from Stripe Dashboard
2. Update `paymentLinkUrl` in `config.js`

---

### 💵 Cash App

**Pros:**
- ✅ No processing fees (for you or donors)
- ✅ Instant transfers
- ✅ Easy to use
- ❌ Requires Cash App account

**Setup:**
1. Open Cash App and go to your profile
2. Copy your **$Cashtag** (e.g., `$SaveDaKidz`)
3. In `config.js`, set:
   ```javascript
   cashApp: {
       enabled: true,
       cashtag: '$YourCashTag',
       link: 'https://cash.app/$YourCashTag'
   }
   ```

**How it works:**
- Users click "Donate Now" → Opens Cash App
- They send the amount to your $Cashtag

---

### 💙 Venmo

**Pros:**
- ✅ No processing fees (for you or donors)
- ✅ Popular in the US
- ✅ Social features
- ❌ Requires Venmo account

**Setup:**
1. Open Venmo app/website
2. Go to your profile
3. Copy your **Venmo username** (e.g., `@SaveDaKidz`)
4. In `config.js`, set:
   ```javascript
   venmo: {
       enabled: true,
       username: '@YourVenmoUsername',
       link: 'https://venmo.com/YourVenmoUsername'
   }
   ```

**How it works:**
- Users click "Donate Now" → Opens Venmo
- They send the amount to your username

---

### 🔵 PayPal

**Pros:**
- ✅ Widely trusted
- ✅ International support
- ✅ Automatic receipts
- ⚠️ Fees vary (usually 2.9% + $0.30, but can be free for friends/family)

**Setup Option 1: PayPal.me (Easiest)**
1. Go to [paypal.me](https://paypal.me)
2. Create your PayPal.me link (e.g., `paypal.me/SaveDaKidz`)
3. In `config.js`, set:
   ```javascript
   paypal: {
       enabled: true,
       link: 'https://paypal.me/SaveDaKidz'
   }
   ```

**Setup Option 2: Donate Button (More Control)**
1. Go to PayPal Dashboard
2. Create a "Donate" button
3. Copy the button ID
4. In `config.js`, set:
   ```javascript
   paypal: {
       enabled: true,
       link: 'https://www.paypal.com/donate?hosted_button_id=YOUR_BUTTON_ID'
   }
   ```

---

### 🏦 Zelle

**Pros:**
- ✅ No fees at all
- ✅ Direct bank transfer
- ✅ Instant (usually)
- ❌ Requires bank account
- ❌ US only

**Setup:**
1. Set up Zelle with your bank
2. Get your Zelle email or phone number
3. In `config.js`, set:
   ```javascript
   zelle: {
       enabled: true,
       email: 'donations@yourdomain.com',
       instructions: 'Send to donations@yourdomain.com via Zelle'
   }
   ```

**How it works:**
- Users select Zelle → See instructions
- They manually send via their bank's Zelle feature

---

## Example Configuration

```javascript
alternativePayments: {
    cashApp: {
        enabled: true,
        cashtag: '$SaveDaKidz',
        link: 'https://cash.app/$SaveDaKidz'
    },
    venmo: {
        enabled: true,
        username: '@SaveDaKidz',
        link: 'https://venmo.com/SaveDaKidz'
    },
    paypal: {
        enabled: true,
        link: 'https://paypal.me/SaveDaKidz'
    },
    zelle: {
        enabled: true,
        email: 'donations@savedakidz.org',
        instructions: 'Send to donations@savedakidz.org via Zelle'
    }
}
```

---

## Which Methods Should You Use?

**Recommended:**
- **Stripe** - For credit/debit cards (most donations)
- **Cash App** - Popular, no fees
- **Venmo** - Popular, no fees
- **PayPal** - Widely trusted
- **Zelle** - If you want completely fee-free option

**Best Practice:**
Enable 2-3 methods max to avoid overwhelming users. Most charities use:
- Stripe (credit cards)
- PayPal (alternative)
- One peer-to-peer app (Cash App OR Venmo)

---

## Fees Comparison

| Method | Fees | Speed |
|--------|------|-------|
| Stripe | 2.9% + $0.30 | Instant |
| Cash App | None | Instant |
| Venmo | None* | Instant |
| PayPal | 2.9% + $0.30 (or free for friends/family) | Instant |
| Zelle | None | Usually instant |

*Venmo charges fees for business transactions, but personal transfers are free.

---

## Testing

1. Enable each payment method one at a time
2. Test the "Donate Now" button for each
3. Make sure links open correctly
4. Verify instructions are clear

---

## Need Help?

- **Stripe:** [stripe.com/docs](https://stripe.com/docs)
- **Cash App:** [cash.app/help](https://cash.app/help)
- **Venmo:** [venmo.com/support](https://venmo.com/support)
- **PayPal:** [paypal.com/us/help](https://paypal.com/us/help)
- **Zelle:** Contact your bank for Zelle setup
