import { describe, it, expect, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import { homeContent } from '../content/home';
import { galleryContent } from '../content/gallery';
import { donateContent } from '../content/donate';
import { successContent } from '../content/success';

// App uses BrowserRouter internally; navigate via window.history before rendering.
afterEach(() => {
  window.history.pushState({}, '', '/');
});

describe('App routing', () => {
  it('renders Home page at /', () => {
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: homeContent.hero.heading })).toBeInTheDocument();
  });

  it('renders Gallery page at /gallery', () => {
    window.history.pushState({}, '', '/gallery');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: galleryContent.header.heading })).toBeInTheDocument();
  });

  it('renders Donate page at /donate', () => {
    window.history.pushState({}, '', '/donate');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: donateContent.header.heading })).toBeInTheDocument();
  });

  it('renders Success page at /success', () => {
    window.history.pushState({}, '', '/success');
    render(<App />);
    expect(screen.getByRole('heading', { level: 1, name: successContent.heading })).toBeInTheDocument();
  });
});
