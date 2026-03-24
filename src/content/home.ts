export const homeContent = {
  hero: {
    eyebrow: 'A Community Charity',
    heading: 'Every Child Deserves a Meal',
    subheading:
      'Save Da Kidz is on a mission to end child hunger in Afaben, one meal at a time. Your support changes lives.',
    donateCta: 'Donate Now',
    galleryCta: 'See Our Work',
  },

  stats: [
    { value: '500+', label: 'Children Fed Daily' },
    { value: '3yrs', label: 'Years of Service' },
    { value: '100%', label: 'Goes to Afaben' },
    { value: '4+', label: 'Local Partners' },
  ] as { value: string; label: string }[],

  mission: {
    eyebrow: 'Our Mission',
    heading: 'Fighting Child Hunger in Afaben',
    body1:
      "In Afaben, thousands of children go to bed hungry every night. Save Da Kidz works directly with local families, schools, and community centers to deliver hot, nutritious meals where they're needed most.",
    body2:
      'We believe every child deserves the chance to grow up healthy, strong, and full of possibility. With your support, we are making that a reality — one meal at a time.',
    cta: 'Join Our Mission',
  },

  missionCards: [
    {
      icon: '🍽️',
      title: 'Food',
      desc: 'Hot, nutritious meals delivered directly to children in the community.',
      bg: 'from-green-100 to-green-200',
      titleColor: 'text-green-900',
    },
    {
      icon: '🤝',
      title: 'Community',
      desc: 'Building lasting partnerships with families and local organizations.',
      bg: 'from-red-100 to-red-200',
      titleColor: 'text-red-900',
    },
    {
      icon: '📚',
      title: 'Education',
      desc: 'Nourished children learn better and stay in school longer.',
      bg: 'from-yellow-100 to-yellow-200',
      titleColor: 'text-yellow-900',
    },
    {
      icon: '💛',
      title: 'Hope',
      desc: 'Every meal is a message: you are seen, valued, and cared for.',
      bg: 'from-amber-100 to-amber-200',
      titleColor: 'text-amber-900',
    },
  ] as { icon: string; title: string; desc: string; bg: string; titleColor: string }[],

  galleryPreview: {
    eyebrow: 'Photos',
    heading: 'See the Impact',
    subheading:
      'Every photo tells a story of hope, community, and change. Take a look at the work being done on the ground in Afaben.',
    cta: 'View Full Gallery →',
    photos: [
      { filename: 'dc3fb06b-4bbc-4157-bcac-5641668b2527.jpg', caption: 'Christmas Celebration 2023' },
      { filename: 'a1b64e13-4254-4446-abf0-8efebc1e8aa1.jpg', caption: 'Food Package Distribution' },
      { filename: 'cab365c2-0f7e-450a-a793-eeb362e7184e.jpg', caption: 'Community Gathering in Afaben' },
    ] as { filename: string; caption: string }[],
  },

  donateCta: {
    heading: 'Ready to Make a Difference?',
    subheading:
      'A single donation can provide meals for a child for a whole week. Every dollar matters.',
    cta: 'Donate Today',
  },
};
