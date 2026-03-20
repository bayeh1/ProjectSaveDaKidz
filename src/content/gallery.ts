export interface GalleryPhoto {
  filename: string;
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
          filename: 'b76714de-38b3-4abd-aad0-5d044ebc1a82.jpg',
          alt: 'Volunteer cooking large pot of jollof rice',
          title: 'Kitchen Volunteers',
          caption: 'Our dedicated cooks prepare large pots of jollof rice fresh for every event.',
        },
        {
          filename: '940a3e93-4068-47cc-9d39-93e4aebc2457.jpg',
          alt: 'Volunteers packing meal bags for distribution',
          title: 'Meal Packaging',
          caption: 'Community volunteers pack hundreds of meal bags to distribute to families.',
        },
        {
          filename: 'c4cced2d-b3b4-4265-bfda-b305084d33aa.jpg',
          alt: 'Child receiving a food package from organizer',
          title: 'Meal Distribution Day',
          caption: 'Every child receives a nutritious meal package directly from our team.',
        },
      ],
    },
    {
      heading: 'Community & Events',
      subheading: 'Building bonds and celebrating the spirit of togetherness in Afaben.',
      photos: [
        {
          filename: '5ab95564-c8b9-4cc4-8d3e-5e2229b7b552.jpg',
          alt: 'Children seated under a decorated tent at the Christmas event',
          title: 'Christmas Celebration 2023',
          caption: 'Children gather under the tent for our annual Christmas giveback celebration.',
        },
        {
          filename: 'bce9cbf4-a8ca-49a2-b4e0-fac344d3bf30.jpg',
          alt: 'Large crowd of children and families gathered at the event',
          title: 'Community Gathering in Afaben',
          caption: 'Families and children come together for a day of food, music, and joy.',
        },
        {
          filename: '1e4feffb-11c5-4e09-a26b-d7b68c16508d.jpg',
          alt: 'Children dancing and playing at the community party',
          title: 'Dance & Play',
          caption: 'Full bellies and joyful hearts — kids celebrate together at our community party.',
        },
      ],
    },
    {
      heading: 'Stories of Impact',
      subheading: 'Real moments that show how your donations are changing lives.',
      photos: [
        {
          filename: '7a4bd960-7b38-4e25-aeeb-e874ee29dac1.jpg',
          alt: 'Smiling children holding food bags and giving peace signs',
          title: 'Smiles That Say It All',
          caption: "The joy on every child's face is why we do what we do.",
        },
        {
          filename: '26092a2d-2a8a-46ad-aa80-f36112a63a98.jpg',
          alt: 'Group of children with food bags at the Christmas event',
          title: 'Food Package Delivery',
          caption: 'Children receive their Christmas food packages with excitement and gratitude.',
        },
        {
          filename: 'd96e2588-5217-4d18-b969-437a42967470.jpg',
          alt: 'Large group of children holding food and gift bags',
          title: '350+ Children Served',
          caption: 'Over 350 children received meals and gifts at our Christmas 2023 event.',
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
