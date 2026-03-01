/**
 * Application constants
 */

export const APP_NAME: string = 'Save Da Kidz';
export const APP_DESCRIPTION: string = 'Join us in making a difference. Your donation helps feed community children in Afaben.';

export const STATS = {
    GOES_TO_KIDS: '100%',
    SECURE: 'Secure',
    TAX_DEDUCTIBLE: 'Tax-Deductible'
} as const;

export interface Copy {
    HERO_TITLE: string;
    HERO_SUBTITLE: string;
    HERO_DESCRIPTION: string;
    DONATION_TITLE: string;
    CHOOSE_AMOUNT: string;
    CUSTOM_AMOUNT_LABEL: string;
    DONATE_BUTTON: string;
    SECURE_PAYMENT: string;
    STRIPE_DISCLAIMER: string;
    ABOUT_TITLE: string;
    ABOUT_TEXT: string[];
    FOOTER_COPYRIGHT: string;
    FOOTER_ORG: string;
}

export const COPY: Copy = {
    HERO_TITLE: 'Save Da Kidz',
    HERO_SUBTITLE: 'Every donation helps feed community children in Afaben',
    HERO_DESCRIPTION: 'Join our mission to ensure no child goes hungry. Your generosity makes a real difference in the lives of children and families in Afaben.',
    DONATION_TITLE: 'Make a Donation',
    CHOOSE_AMOUNT: 'Choose an amount',
    CUSTOM_AMOUNT_LABEL: 'Or enter a custom amount',
    DONATE_BUTTON: 'Donate Now',
    SECURE_PAYMENT: 'Secure payment powered by Stripe',
    STRIPE_DISCLAIMER: 'Stripe processing fees apply (approximately 2.9% + $0.30 per transaction). All proceeds after fees go directly to community children in Afaben.',
    ABOUT_TITLE: 'About Our Mission',
    ABOUT_TEXT: [
        'Save Da Kidz is dedicated to fighting child hunger in Afaben. We work directly with local partners to ensure that every dollar donated goes directly to providing nutritious meals for community children in Afaben.',
        'Your support makes it possible for us to reach more children every day. Together, we can make a lasting impact on the lives of those who need it most.'
    ],
    FOOTER_COPYRIGHT: '© 2025 Save Da Kidz. All rights reserved.',
    FOOTER_ORG: 'A registered 501(c)(3) charity organization'
};
