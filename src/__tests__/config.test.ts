import { describe, it, expect } from 'vitest';
import { config } from '../config';

describe('config', () => {
  it('has a non-empty paymentLinkUrl', () => {
    expect(typeof config.paymentLinkUrl).toBe('string');
    expect(config.paymentLinkUrl.length).toBeGreaterThan(0);
  });

  it('has minDonationAmount >= 1', () => {
    expect(config.minDonationAmount).toBeGreaterThanOrEqual(1);
  });

  it('has defaultAmounts as a non-empty array of positive numbers', () => {
    expect(Array.isArray(config.defaultAmounts)).toBe(true);
    expect(config.defaultAmounts.length).toBeGreaterThan(0);
    config.defaultAmounts.forEach((a) => {
      expect(typeof a).toBe('number');
      expect(a).toBeGreaterThan(0);
    });
  });

  it('has a successPageUrl string', () => {
    expect(typeof config.successPageUrl).toBe('string');
    expect(config.successPageUrl.length).toBeGreaterThan(0);
  });

  it('alternativePayments has cashApp, venmo, paypal, zelle keys', () => {
    const { alternativePayments } = config;
    expect(alternativePayments).toHaveProperty('cashApp');
    expect(alternativePayments).toHaveProperty('venmo');
    expect(alternativePayments).toHaveProperty('paypal');
    expect(alternativePayments).toHaveProperty('zelle');
  });

  it('each alternative payment has an enabled boolean', () => {
    Object.values(config.alternativePayments).forEach((p) => {
      expect(typeof p.enabled).toBe('boolean');
    });
  });
});
