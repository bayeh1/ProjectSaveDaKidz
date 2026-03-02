import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Navbar from '../../components/Navbar';

function renderNavbar(initialPath = '/') {
  return render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Navbar />
    </MemoryRouter>
  );
}

describe('Navbar', () => {
  it('renders the brand link', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Save Da Kidz' })).toBeInTheDocument();
  });

  it('brand link points to /', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Save Da Kidz' })).toHaveAttribute('href', '/');
  });

  it('renders Home nav link', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument();
  });

  it('renders Gallery nav link', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Gallery' })).toBeInTheDocument();
  });

  it('renders Donate Now nav link', () => {
    renderNavbar();
    expect(screen.getByRole('link', { name: 'Donate Now' })).toBeInTheDocument();
  });

  it('renders menu toggle button with accessible label', () => {
    renderNavbar();
    expect(screen.getByRole('button', { name: 'Menu' })).toBeInTheDocument();
  });

  it('adds open class to nav when toggle button is clicked', () => {
    renderNavbar();
    const nav = document.querySelector('nav')!;
    expect(nav.className).not.toContain('open');
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(nav.className).toContain('open');
  });

  it('removes open class when toggle is clicked again', () => {
    renderNavbar();
    const toggle = screen.getByRole('button', { name: 'Menu' });
    fireEvent.click(toggle);
    fireEvent.click(toggle);
    expect(document.querySelector('nav')!.className).not.toContain('open');
  });

  it('closes menu when a nav link is clicked', () => {
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(document.querySelector('nav')!.className).toContain('open');
    fireEvent.click(screen.getByRole('link', { name: 'Home' }));
    expect(document.querySelector('nav')!.className).not.toContain('open');
  });

  it('closes menu when brand link is clicked', () => {
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    fireEvent.click(screen.getByRole('link', { name: 'Save Da Kidz' }));
    expect(document.querySelector('nav')!.className).not.toContain('open');
  });

  it('closes menu when Gallery link is clicked', () => {
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(document.querySelector('nav')!.className).toContain('open');
    fireEvent.click(screen.getByRole('link', { name: 'Gallery' }));
    expect(document.querySelector('nav')!.className).not.toContain('open');
  });

  it('closes menu when Donate Now link is clicked', () => {
    renderNavbar();
    fireEvent.click(screen.getByRole('button', { name: 'Menu' }));
    expect(document.querySelector('nav')!.className).toContain('open');
    fireEvent.click(screen.getByRole('link', { name: 'Donate Now' }));
    expect(document.querySelector('nav')!.className).not.toContain('open');
  });
});
