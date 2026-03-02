# Architecture Overview

## What is `api/create-checkout.js`?

`create-checkout.js` is a **serverless function** (backend API endpoint) used for **Option 2: Stripe Checkout Sessions**.

### Two Payment Options:

**Option 1: Stripe Payment Links** (Current default - fastest)
- ✅ No backend needed
- ✅ Just redirects to Stripe's hosted page
- ✅ Users enter amount on Stripe's page
- ❌ Less control over the checkout experience

**Option 2: Stripe Checkout Sessions** (More control)
- ✅ Preserves the selected donation amount from your site
- ✅ More customization options
- ✅ Better user experience (amount is pre-filled)
- ❌ Requires a backend/serverless function
- ❌ Needs `api/create-checkout.js` deployed

### When to use `create-checkout.js`:

Use it if you want:
- The amount buttons to actually set the donation amount (instead of just suggestions)
- More control over the checkout flow
- Custom success/cancel URLs
- Additional metadata tracking

---

## Folder Structure Explanation

### Why `api/` stays at root (not in `util/`):

1. **Serverless Platform Convention**
   - Vercel expects `/api` at the root level
   - Netlify uses `netlify/functions` but can route `/api/*` to functions
   - These platforms automatically detect and deploy functions from `/api`

2. **Different Purpose**
   - `util/` = Utility functions (helpers, constants, pure functions)
   - `api/` = Backend API endpoints (serverless functions, HTTP handlers)

3. **Deployment Requirements**
   - Serverless platforms need to find API routes at specific locations
   - Moving it would break deployment configurations

### Current Structure:

```
ProjectSaveDaKidz/
├── api/                    # Backend API endpoints (serverless functions)
│   └── create-checkout.js  # Stripe Checkout Session handler
├── src/                     # Frontend source code
│   ├── css/                 # Styles
│   └── js/                  # JavaScript modules
├── util/                    # Utility functions (pure helpers)
│   └── constants.js         # App constants
└── index.html               # Main page
```

This follows standard web development conventions:
- **Root-level `api/`** = Backend/API routes
- **`src/`** = Frontend application code
- **`util/`** = Shared utility functions

---

## Summary

- **`api/create-checkout.js`** = Optional backend for advanced Stripe Checkout (Option 2)
- **`api/` at root** = Required for serverless platform deployment
- **`util/`** = For utility functions, not API endpoints

If you're using Payment Links (Option 1), you can ignore `api/create-checkout.js` entirely!
