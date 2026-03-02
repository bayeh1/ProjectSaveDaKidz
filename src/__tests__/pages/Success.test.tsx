import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Success from '../../pages/Success';
import { successContent } from '../../content/success';

function renderSuccess() {
  return render(
    <MemoryRouter>
      <Success />
    </MemoryRouter>
  );
}

describe('Success page', () => {
  it('renders the main heading', () => {
    renderSuccess();
    expect(screen.getByRole('heading', { level: 1, name: successContent.heading })).toBeInTheDocument();
  });

  it('renders the subheading text', () => {
    renderSuccess();
    expect(screen.getByText(successContent.subheading)).toBeInTheDocument();
  });

  it('renders the body text', () => {
    renderSuccess();
    expect(screen.getByText(successContent.body)).toBeInTheDocument();
  });

  it('renders the receipt note', () => {
    renderSuccess();
    expect(screen.getByText(successContent.receiptNote)).toBeInTheDocument();
  });

  it('renders the return home link pointing to /', () => {
    renderSuccess();
    const link = screen.getByRole('link', { name: successContent.returnCta });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the checkmark SVG icon', () => {
    renderSuccess();
    expect(document.querySelector('svg')).toBeInTheDocument();
  });
});
