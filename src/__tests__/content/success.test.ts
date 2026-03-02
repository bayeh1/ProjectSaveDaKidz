import { describe, it, expect } from 'vitest';
import { successContent } from '../../content/success';

describe('successContent', () => {
  it('has all required string fields', () => {
    expect(successContent.heading).toBeTruthy();
    expect(successContent.subheading).toBeTruthy();
    expect(successContent.body).toBeTruthy();
    expect(successContent.receiptNote).toBeTruthy();
    expect(successContent.returnCta).toBeTruthy();
  });

  it('all fields are strings', () => {
    Object.values(successContent).forEach((v) => {
      expect(typeof v).toBe('string');
    });
  });

  it('has exactly 5 fields', () => {
    expect(Object.keys(successContent)).toHaveLength(5);
  });
});
