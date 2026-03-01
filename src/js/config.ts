/**
 * Configuration file for Save Da Kidz donation website
 * Update these values with your payment credentials
 */

export interface AlternativePayment {
    enabled: boolean;
    link?: string;
    cashtag?: string;
    username?: string;
    email?: string;
    instructions?: string;
}

export interface AlternativePayments {
    cashApp: AlternativePayment;
    venmo: AlternativePayment;
    paypal: AlternativePayment;
    zelle: AlternativePayment;
}

export interface Config {
    paymentLinkUrl: string;
    alternativePayments: AlternativePayments;
    minDonationAmount: number;
    defaultAmounts: number[];
    successPageUrl: string;
}

export const config: Config = {
    // Stripe Payment Link (Primary - Credit/Debit Cards)
    // Get this from: Stripe Dashboard → Products → Payment Links
    // Enable "Allow customers to enter custom amounts" in Payment Link settings
    paymentLinkUrl: 'https://buy.stripe.com/YOUR_PAYMENT_LINK_ID',
    
    // Alternative Payment Methods
    // Add your payment links/usernames here
    alternativePayments: {
        cashApp: {
            enabled: false, // Set to true to enable
            cashtag: '$YourCashTag', // Your Cash App $cashtag (e.g., $SaveDaKidz)
            link: 'https://cash.app/$YourCashTag' // Cash App payment link
        },
        venmo: {
            enabled: false, // Set to true to enable
            username: '@YourVenmoUsername', // Your Venmo username
            link: 'https://venmo.com/YourVenmoUsername' // Venmo payment link
        },
        paypal: {
            enabled: false, // Set to true to enable
            link: 'https://paypal.me/YourPayPalUsername', // PayPal.me link
            // Or use: 'https://www.paypal.com/donate?hosted_button_id=YOUR_BUTTON_ID'
        },
        zelle: {
            enabled: false, // Set to true to enable
            email: 'donations@yourdomain.com', // Zelle email or phone
            instructions: 'Send to donations@yourdomain.com via Zelle' // Instructions
        }
    },
    
    // Donation settings
    minDonationAmount: 1,
    defaultAmounts: [5, 10, 25, 50, 100, 250],
    
    // Success page URL
    successPageUrl: '/success.html'
};
