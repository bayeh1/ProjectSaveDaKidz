import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Footer from '../../components/Footer';

function renderFooter() {
  return render(
    <MemoryRouter>
      <Footer />
    </MemoryRouter>
  );
}

describe('Footer', () => {
  it('renders the brand name', () => {
    renderFooter();
    expect(screen.getByText('Joy for Every Child')).toBeInTheDocument();
  });

  it('renders Home nav link pointing to /', () => {
    renderFooter();
    const link = screen.getByRole('link', { name: 'Home' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders Gallery nav link pointing to /gallery', () => {
    renderFooter();
    const link = screen.getByRole('link', { name: 'Gallery' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/gallery');
  });

  it('renders Donate nav link pointing to /donate', () => {
    renderFooter();
    const link = screen.getByRole('link', { name: 'Donate' });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/donate');
  });

  it('renders copyright notice', () => {
    renderFooter();
    expect(screen.getByText(/2025 Joy for Every Child/)).toBeInTheDocument();
  });

  it('renders 501(c)(3) notice', () => {
    renderFooter();
    expect(screen.getByText(/501\(c\)\(3\)/)).toBeInTheDocument();
  });
});
