export const donateContent = {
  header: {
    heading: 'Make a Donation',
    subheading: 'Your generosity directly feeds children in Afaben. Every dollar makes a difference.',
  },

  card: {
    heading: 'Choose an Amount',
    presetLabel: 'Select a donation amount',
    customLabel: 'Or enter a custom amount',
    buttonIdle: 'Donate Now',
    buttonLoading: 'Processing…',
    secureNote: 'Secure payment options available',
  },

  disclaimer:
    'Stripe processing fees apply (approximately 2.9% + $0.30 per transaction). All proceeds after fees go directly to community children in Afaben.',

  statBadges: [
    { value: '100%', label: 'To Afaben' },
    { value: 'Secure', label: 'Safe Payment' },
    { value: 'Receipt', label: 'Tax-Deductible' },
  ] as { value: string; label: string }[],

  about: {
    heading: 'About Our Mission',
    body1:
      'Joy for Every Child is dedicated to fighting child hunger in Afaben. We work directly with local partners to ensure that every dollar donated goes directly to providing nutritious meals for community children.',
    body2:
      'Your support makes it possible for us to reach more children every day. Together, we can make a lasting impact on the lives of those who need it most.',
  },
};
