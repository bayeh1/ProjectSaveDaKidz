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
  paymentLinkUrl: 'https://buy.stripe.com/YOUR_PAYMENT_LINK_ID',

  alternativePayments: {
    cashApp: {
      enabled: false,
      cashtag: '$YourCashTag',
      link: 'https://cash.app/$YourCashTag',
    },
    venmo: {
      enabled: false,
      username: '@YourVenmoUsername',
      link: 'https://venmo.com/YourVenmoUsername',
    },
    paypal: {
      enabled: false,
      link: 'https://paypal.me/YourPayPalUsername',
    },
    zelle: {
      enabled: false,
      email: 'donations@yourdomain.com',
      instructions: 'Send to donations@yourdomain.com via Zelle',
    },
  },

  minDonationAmount: 1,
  defaultAmounts: [25, 50, 100, 250],
  successPageUrl: '/success',
};
