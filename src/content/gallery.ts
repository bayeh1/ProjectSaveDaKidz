export interface GalleryPhoto {
  seed: string;
  alt: string;
  title: string;
  caption: string;
}

export interface GalleryCategory {
  heading: string;
  subheading: string;
  photos: GalleryPhoto[];
}

export const galleryContent = {
  header: {
    heading: 'Our Gallery',
    subheading: 'See the faces, stories, and moments that make up our mission in Afaben.',
  },

  categories: [
    {
      heading: 'Meal Distributions',
      subheading: 'Hot meals delivered directly to families and community centers across Afaben.',
      photos: [
        {
          seed: 'meal1',
          alt: 'Volunteers serving meals to children',
          title: 'Community Meal Day',
          caption: 'Over 200 children received hot meals at the Afaben community center.',
        },
        {
          seed: 'meal2',
          alt: 'Food preparation by volunteers',
          title: 'Kitchen Volunteers',
          caption: 'Our dedicated volunteers prepare fresh, nutritious food every morning.',
        },
        {
          seed: 'meal3',
          alt: 'Children eating lunch',
          title: 'Lunchtime in Afaben',
          caption: 'Children gather for a warm, shared meal — a highlight of their day.',
        },
      ],
    },
    {
      heading: 'Community & Events',
      subheading: 'Building bonds and celebrating the spirit of togetherness in Afaben.',
      photos: [
        {
          seed: 'community1',
          alt: 'Community gathering event',
          title: 'Annual Fundraiser 2024',
          caption: 'Hundreds of supporters came together to celebrate and give back.',
        },
        {
          seed: 'community2',
          alt: 'Local partners working together',
          title: 'Partner Organizations',
          caption: 'Working alongside 12+ local partners to extend our reach.',
        },
        {
          seed: 'community3',
          alt: 'Children playing after meal',
          title: 'After Lunch Play',
          caption: 'Full bellies mean happy kids — and brighter futures ahead.',
        },
      ],
    },
    {
      heading: 'Stories of Impact',
      subheading: 'Real moments that show how your donations are changing lives.',
      photos: [
        {
          seed: 'impact1',
          alt: 'Child receiving food package',
          title: 'Food Package Delivery',
          caption: 'Weekly food packages delivered directly to families most in need.',
        },
        {
          seed: 'impact2',
          alt: 'School lunch program',
          title: 'School Lunch Program',
          caption: 'Partnering with local schools to feed children Monday through Friday.',
        },
        {
          seed: 'impact3',
          alt: 'Smiling children after meal',
          title: 'Smiles That Say It All',
          caption: "The joy on every child's face is why we do what we do.",
        },
      ],
    },
  ] as GalleryCategory[],

  donateCta: {
    heading: 'Be Part of the Story',
    subheading:
      "Every photo you've seen was made possible by donors like you. Help us create more moments like these.",
    cta: 'Make a Donation',
  },
};
