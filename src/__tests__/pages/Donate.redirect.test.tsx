import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';

// Mock config with a real-looking payment URL (no YOUR_PAYMENT_LINK_ID placeholder)
vi.mock('../../config', () => ({
  config: {
    paymentLinkUrl: 'https://buy.stripe.com/test_configured_link',
    minDonationAmount: 1,
    defaultAmounts: [25, 50, 100, 250],
    alternativePayments: {
      cashApp: { enabled: false },
      venmo: { enabled: false },
      paypal: { enabled: false },
      zelle: { enabled: false },
    },
    successPageUrl: '/success',
  },
}));

import Donate from '../../pages/Donate';

describe('Donate page – redirect path', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('navigates to the payment URL when a valid amount is selected', async () => {
    vi.stubGlobal('location', { href: '' });

    render(
      <MemoryRouter>
        <Donate />
      </MemoryRouter>
    );

    fireEvent.click(screen.getByRole('button', { name: '$25' }));
    fireEvent.click(screen.getByRole('button', { name: 'Donate Now' }));

    expect(window.location.href).toBe('https://buy.stripe.com/test_configured_link');
  });

  it('navigates to the payment URL when a custom amount is entered', async () => {
    vi.stubGlobal('location', { href: '' });

    render(
      <MemoryRouter>
        <Donate />
      </MemoryRouter>
    );

    fireEvent.change(screen.getByLabelText('Or enter a custom amount'), { target: { value: '75' } });
    fireEvent.click(screen.getByRole('button', { name: 'Donate Now' }));

    expect(window.location.href).toBe('https://buy.stripe.com/test_configured_link');
  });
});
