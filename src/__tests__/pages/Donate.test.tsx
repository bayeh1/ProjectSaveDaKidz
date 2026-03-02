import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Donate from '../../pages/Donate';
import { donateContent } from '../../content/donate';
import { config } from '../../config';

function renderDonate() {
  return render(
    <MemoryRouter>
      <Donate />
    </MemoryRouter>
  );
}

describe('Donate page', () => {
  beforeEach(() => {
    vi.spyOn(window, 'alert').mockImplementation(() => {});
  });

  it('renders the page heading', () => {
    renderDonate();
    expect(screen.getByRole('heading', { level: 1, name: donateContent.header.heading })).toBeInTheDocument();
  });

  it('renders the page subheading', () => {
    renderDonate();
    expect(screen.getByText(donateContent.header.subheading)).toBeInTheDocument();
  });

  it('renders the card heading', () => {
    renderDonate();
    expect(screen.getByText(donateContent.card.heading)).toBeInTheDocument();
  });

  it('renders preset label text', () => {
    renderDonate();
    expect(screen.getByText(donateContent.card.presetLabel)).toBeInTheDocument();
  });

  it('renders all preset amount buttons', () => {
    renderDonate();
    config.defaultAmounts.forEach((amount) => {
      expect(screen.getByRole('button', { name: `$${amount}` })).toBeInTheDocument();
    });
  });

  it('renders custom amount label', () => {
    renderDonate();
    expect(screen.getByText(donateContent.card.customLabel)).toBeInTheDocument();
  });

  it('renders custom amount input', () => {
    renderDonate();
    expect(screen.getByLabelText(donateContent.card.customLabel)).toBeInTheDocument();
  });

  it('renders the donate button with idle label', () => {
    renderDonate();
    expect(screen.getByRole('button', { name: donateContent.card.buttonIdle })).toBeInTheDocument();
  });

  it('renders the secure payment note', () => {
    renderDonate();
    expect(screen.getByText(donateContent.card.secureNote)).toBeInTheDocument();
  });

  it('renders the disclaimer text', () => {
    renderDonate();
    expect(screen.getByText(/Stripe processing fees apply/)).toBeInTheDocument();
  });

  it('renders all stat badges', () => {
    renderDonate();
    donateContent.statBadges.forEach((s) => {
      expect(screen.getByText(s.value)).toBeInTheDocument();
      expect(screen.getByText(s.label)).toBeInTheDocument();
    });
  });

  it('renders the about section heading', () => {
    renderDonate();
    expect(screen.getByText(donateContent.about.heading)).toBeInTheDocument();
  });

  it('renders about body paragraphs', () => {
    renderDonate();
    expect(screen.getByText(donateContent.about.body1)).toBeInTheDocument();
    expect(screen.getByText(donateContent.about.body2)).toBeInTheDocument();
  });

  it('clicking a preset amount adds selected class', () => {
    renderDonate();
    const firstAmount = config.defaultAmounts[0];
    const btn = screen.getByRole('button', { name: `$${firstAmount}` });
    fireEvent.click(btn);
    expect(btn.className).toContain('selected');
  });

  it('clicking a second preset deselects the first', () => {
    renderDonate();
    const [first, second] = config.defaultAmounts;
    fireEvent.click(screen.getByRole('button', { name: `$${first}` }));
    fireEvent.click(screen.getByRole('button', { name: `$${second}` }));
    expect(screen.getByRole('button', { name: `$${first}` }).className).not.toContain('selected');
    expect(screen.getByRole('button', { name: `$${second}` }).className).toContain('selected');
  });

  it('typing a custom amount deselects any preset', () => {
    renderDonate();
    const firstAmount = config.defaultAmounts[0];
    const presetBtn = screen.getByRole('button', { name: `$${firstAmount}` });
    fireEvent.click(presetBtn);
    expect(presetBtn.className).toContain('selected');

    const input = screen.getByLabelText(donateContent.card.customLabel);
    fireEvent.change(input, { target: { value: '75' } });
    expect(presetBtn.className).not.toContain('selected');
  });

  it('custom amount input value updates on change', () => {
    renderDonate();
    const input = screen.getByLabelText(donateContent.card.customLabel) as HTMLInputElement;
    fireEvent.change(input, { target: { value: '42' } });
    expect(input.value).toBe('42');
  });

  it('shows alert with minimum amount when donate clicked with no amount', async () => {
    renderDonate();
    fireEvent.click(screen.getByRole('button', { name: donateContent.card.buttonIdle }));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining(`$${config.minDonationAmount}`)
      );
    });
  });

  it('shows alert about unconfigured payment link when amount is valid', async () => {
    renderDonate();
    fireEvent.click(screen.getByRole('button', { name: `$${config.defaultAmounts[0]}` }));
    fireEvent.click(screen.getByRole('button', { name: donateContent.card.buttonIdle }));
    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith(
        expect.stringContaining('src/config.ts')
      );
    });
  });
});
