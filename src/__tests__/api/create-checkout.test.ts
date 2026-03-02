import { describe, it, expect, vi, beforeEach } from 'vitest';

// vi.hoisted ensures mockSessionCreate is defined before the vi.mock factory runs
const mockSessionCreate = vi.hoisted(() => vi.fn());

// Stripe is called as `new Stripe(...)`, so the mock must be a class, not an arrow function
vi.mock('stripe', () => {
  class MockStripe {
    checkout = {
      sessions: {
        create: mockSessionCreate,
      },
    };
  }
  return { default: MockStripe };
});

import { handler } from '../../api/create-checkout';

type TestEvent = {
  httpMethod: string;
  body: string;
  headers: { origin?: string; referer?: string };
};

function makeEvent(method: string, body: object, headers: TestEvent['headers'] = {}): TestEvent {
  return { httpMethod: method, body: JSON.stringify(body), headers };
}

describe('create-checkout handler', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns 405 for non-POST requests', async () => {
    const result = await handler(makeEvent('GET', {}), {});
    expect(result.statusCode).toBe(405);
    expect(JSON.parse(result.body)).toEqual({ error: 'Method not allowed' });
  });

  it('returns 405 for PUT requests', async () => {
    const result = await handler(makeEvent('PUT', {}), {});
    expect(result.statusCode).toBe(405);
  });

  it('returns 400 when amount is missing', async () => {
    const result = await handler(makeEvent('POST', {}), {});
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({ error: 'Invalid amount' });
  });

  it('returns 400 when amount is below 100 cents', async () => {
    const result = await handler(makeEvent('POST', { amount: 99 }), {});
    expect(result.statusCode).toBe(400);
    expect(JSON.parse(result.body)).toEqual({ error: 'Invalid amount' });
  });

  it('returns 400 when amount is 0', async () => {
    const result = await handler(makeEvent('POST', { amount: 0 }), {});
    expect(result.statusCode).toBe(400);
  });

  it('returns 200 with sessionId on successful checkout', async () => {
    mockSessionCreate.mockResolvedValueOnce({ id: 'cs_test_123' });
    const result = await handler(
      makeEvent('POST', { amount: 1000 }, { origin: 'https://example.com' }),
      {}
    );
    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body)).toEqual({ sessionId: 'cs_test_123' });
  });

  it('passes the amount in cents to stripe.checkout.sessions.create', async () => {
    mockSessionCreate.mockResolvedValueOnce({ id: 'cs_test_456' });
    await handler(makeEvent('POST', { amount: 5000 }, { origin: 'https://example.com' }), {});
    expect(mockSessionCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        line_items: expect.arrayContaining([
          expect.objectContaining({
            price_data: expect.objectContaining({ unit_amount: 5000 }),
          }),
        ]),
      })
    );
  });

  it('creates a one-time payment mode session', async () => {
    mockSessionCreate.mockResolvedValueOnce({ id: 'cs_test_789' });
    await handler(makeEvent('POST', { amount: 2500 }, { origin: 'https://example.com' }), {});
    expect(mockSessionCreate).toHaveBeenCalledWith(
      expect.objectContaining({ mode: 'payment' })
    );
  });

  it('builds success_url from the origin header', async () => {
    mockSessionCreate.mockResolvedValueOnce({ id: 'cs_test_abc' });
    await handler(
      makeEvent('POST', { amount: 1000 }, { origin: 'https://mysite.com' }),
      {}
    );
    expect(mockSessionCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        success_url: expect.stringContaining('https://mysite.com'),
      })
    );
  });

  it('falls back to the referer header when origin is absent', async () => {
    mockSessionCreate.mockResolvedValueOnce({ id: 'cs_test_ref' });
    await handler(
      makeEvent('POST', { amount: 1000 }, { referer: 'https://referer.com' }),
      {}
    );
    expect(mockSessionCreate).toHaveBeenCalledWith(
      expect.objectContaining({
        success_url: expect.stringContaining('https://referer.com'),
      })
    );
  });

  it('returns 500 with the error message when stripe throws an Error', async () => {
    mockSessionCreate.mockRejectedValueOnce(new Error('Stripe network error'));
    const result = await handler(makeEvent('POST', { amount: 1000 }), {});
    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({ error: 'Stripe network error' });
  });

  it('returns 500 with "Unknown error" for non-Error exceptions', async () => {
    mockSessionCreate.mockRejectedValueOnce('string error');
    const result = await handler(makeEvent('POST', { amount: 1000 }), {});
    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body)).toEqual({ error: 'Unknown error' });
  });
});
