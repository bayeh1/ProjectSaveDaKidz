import { describe, it, expect } from 'vitest';
import { donateContent } from '../../content/donate';

describe('donateContent', () => {
  describe('header', () => {
    it('has non-empty heading and subheading', () => {
      expect(donateContent.header.heading).toBeTruthy();
      expect(donateContent.header.subheading).toBeTruthy();
    });
  });

  describe('card', () => {
    it('has all required string fields', () => {
      const { card } = donateContent;
      expect(card.heading).toBeTruthy();
      expect(card.presetLabel).toBeTruthy();
      expect(card.customLabel).toBeTruthy();
      expect(card.buttonIdle).toBeTruthy();
      expect(card.buttonLoading).toBeTruthy();
      expect(card.secureNote).toBeTruthy();
    });

    it('buttonIdle and buttonLoading are different strings', () => {
      expect(donateContent.card.buttonIdle).not.toBe(donateContent.card.buttonLoading);
    });
  });

  describe('disclaimer', () => {
    it('is a non-empty string', () => {
      expect(typeof donateContent.disclaimer).toBe('string');
      expect(donateContent.disclaimer.length).toBeGreaterThan(0);
    });
  });

  describe('statBadges', () => {
    it('has exactly 3 badges', () => {
      expect(donateContent.statBadges).toHaveLength(3);
    });

    it('each badge has a non-empty value and label', () => {
      donateContent.statBadges.forEach((s) => {
        expect(s.value).toBeTruthy();
        expect(s.label).toBeTruthy();
      });
    });

    it('badge labels are unique', () => {
      const labels = donateContent.statBadges.map((s) => s.label);
      expect(new Set(labels).size).toBe(labels.length);
    });
  });

  describe('about', () => {
    it('has non-empty heading, body1, body2', () => {
      const { about } = donateContent;
      expect(about.heading).toBeTruthy();
      expect(about.body1).toBeTruthy();
      expect(about.body2).toBeTruthy();
    });
  });
});
