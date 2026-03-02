import { describe, it, expect } from 'vitest';
import { galleryContent } from '../../content/gallery';

describe('galleryContent', () => {
  describe('header', () => {
    it('has non-empty heading and subheading', () => {
      expect(galleryContent.header.heading).toBeTruthy();
      expect(galleryContent.header.subheading).toBeTruthy();
    });
  });

  describe('categories', () => {
    it('has exactly 3 categories', () => {
      expect(galleryContent.categories).toHaveLength(3);
    });

    it('each category has a non-empty heading and subheading', () => {
      galleryContent.categories.forEach((cat) => {
        expect(cat.heading).toBeTruthy();
        expect(cat.subheading).toBeTruthy();
      });
    });

    it('each category has exactly 3 photos', () => {
      galleryContent.categories.forEach((cat) => {
        expect(cat.photos).toHaveLength(3);
      });
    });

    it('each photo has seed, alt, title, caption', () => {
      galleryContent.categories.forEach((cat) => {
        cat.photos.forEach((photo) => {
          expect(photo.seed).toBeTruthy();
          expect(photo.alt).toBeTruthy();
          expect(photo.title).toBeTruthy();
          expect(photo.caption).toBeTruthy();
        });
      });
    });

    it('all photo seeds are unique across categories', () => {
      const seeds = galleryContent.categories.flatMap((c) => c.photos.map((p) => p.seed));
      expect(new Set(seeds).size).toBe(seeds.length);
    });

    it('category headings are unique', () => {
      const headings = galleryContent.categories.map((c) => c.heading);
      expect(new Set(headings).size).toBe(headings.length);
    });
  });

  describe('donateCta', () => {
    it('has non-empty heading, subheading, cta', () => {
      expect(galleryContent.donateCta.heading).toBeTruthy();
      expect(galleryContent.donateCta.subheading).toBeTruthy();
      expect(galleryContent.donateCta.cta).toBeTruthy();
    });
  });
});
