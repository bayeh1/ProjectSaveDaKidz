import { describe, it, expect } from 'vitest';
import { homeContent } from '../../content/home';

describe('homeContent', () => {
  describe('hero', () => {
    it('has non-empty string fields', () => {
      expect(homeContent.hero.eyebrow).toBeTruthy();
      expect(homeContent.hero.heading).toBeTruthy();
      expect(homeContent.hero.subheading).toBeTruthy();
      expect(homeContent.hero.donateCta).toBeTruthy();
      expect(homeContent.hero.galleryCta).toBeTruthy();
    });
  });

  describe('stats', () => {
    it('has exactly 4 entries', () => {
      expect(homeContent.stats).toHaveLength(4);
    });

    it('each stat has a non-empty value and label', () => {
      homeContent.stats.forEach((s) => {
        expect(s.value).toBeTruthy();
        expect(s.label).toBeTruthy();
      });
    });
  });

  describe('mission', () => {
    it('has non-empty string fields', () => {
      const { mission } = homeContent;
      expect(mission.eyebrow).toBeTruthy();
      expect(mission.heading).toBeTruthy();
      expect(mission.body1).toBeTruthy();
      expect(mission.body2).toBeTruthy();
      expect(mission.cta).toBeTruthy();
    });
  });

  describe('missionCards', () => {
    it('has exactly 4 cards', () => {
      expect(homeContent.missionCards).toHaveLength(4);
    });

    it('each card has icon, title, desc, bg, titleColor', () => {
      homeContent.missionCards.forEach((card) => {
        expect(card.icon).toBeTruthy();
        expect(card.title).toBeTruthy();
        expect(card.desc).toBeTruthy();
        expect(card.bg).toBeTruthy();
        expect(card.titleColor).toBeTruthy();
      });
    });

    it('card titles are unique', () => {
      const titles = homeContent.missionCards.map((c) => c.title);
      expect(new Set(titles).size).toBe(titles.length);
    });
  });

  describe('galleryPreview', () => {
    it('has non-empty eyebrow, heading, subheading, cta', () => {
      const { galleryPreview } = homeContent;
      expect(galleryPreview.eyebrow).toBeTruthy();
      expect(galleryPreview.heading).toBeTruthy();
      expect(galleryPreview.subheading).toBeTruthy();
      expect(galleryPreview.cta).toBeTruthy();
    });

    it('has exactly 3 photos', () => {
      expect(homeContent.galleryPreview.photos).toHaveLength(3);
    });

    it('each photo has a non-empty seed and caption', () => {
      homeContent.galleryPreview.photos.forEach((p) => {
        expect(p.seed).toBeTruthy();
        expect(p.caption).toBeTruthy();
      });
    });

    it('photo seeds are unique', () => {
      const seeds = homeContent.galleryPreview.photos.map((p) => p.seed);
      expect(new Set(seeds).size).toBe(seeds.length);
    });
  });

  describe('donateCta', () => {
    it('has non-empty heading, subheading, cta', () => {
      const { donateCta } = homeContent;
      expect(donateCta.heading).toBeTruthy();
      expect(donateCta.subheading).toBeTruthy();
      expect(donateCta.cta).toBeTruthy();
    });
  });
});
