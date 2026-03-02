import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Gallery from '../../pages/Gallery';
import { galleryContent } from '../../content/gallery';

function renderGallery() {
  return render(
    <MemoryRouter>
      <Gallery />
    </MemoryRouter>
  );
}

describe('Gallery page', () => {
  it('renders the page heading', () => {
    renderGallery();
    expect(screen.getByRole('heading', { level: 1, name: galleryContent.header.heading })).toBeInTheDocument();
  });

  it('renders the page subheading', () => {
    renderGallery();
    expect(screen.getByText(galleryContent.header.subheading)).toBeInTheDocument();
  });

  it('renders all 3 category headings', () => {
    renderGallery();
    galleryContent.categories.forEach((cat) => {
      expect(screen.getByText(cat.heading)).toBeInTheDocument();
    });
  });

  it('renders all 3 category subheadings', () => {
    renderGallery();
    galleryContent.categories.forEach((cat) => {
      expect(screen.getByText(cat.subheading)).toBeInTheDocument();
    });
  });

  it('renders all 9 photo titles', () => {
    renderGallery();
    galleryContent.categories.forEach((cat) => {
      cat.photos.forEach((photo) => {
        expect(screen.getByText(photo.title)).toBeInTheDocument();
      });
    });
  });

  it('renders all 9 photo captions', () => {
    renderGallery();
    galleryContent.categories.forEach((cat) => {
      cat.photos.forEach((photo) => {
        expect(screen.getByText(photo.caption)).toBeInTheDocument();
      });
    });
  });

  it('renders all 9 photo images with correct alt text', () => {
    renderGallery();
    galleryContent.categories.forEach((cat) => {
      cat.photos.forEach((photo) => {
        expect(screen.getByAltText(photo.alt)).toBeInTheDocument();
      });
    });
  });

  it('renders picsum photo URLs using the photo seed', () => {
    renderGallery();
    const firstPhoto = galleryContent.categories[0].photos[0];
    const img = screen.getByAltText(firstPhoto.alt);
    expect(img).toHaveAttribute('src', expect.stringContaining(firstPhoto.seed));
  });

  it('renders donate CTA heading', () => {
    renderGallery();
    expect(screen.getByText(galleryContent.donateCta.heading)).toBeInTheDocument();
  });

  it('renders donate CTA subheading', () => {
    renderGallery();
    expect(screen.getByText(galleryContent.donateCta.subheading)).toBeInTheDocument();
  });

  it('renders donate CTA button linking to /donate', () => {
    renderGallery();
    expect(screen.getByRole('link', { name: galleryContent.donateCta.cta })).toHaveAttribute('href', '/donate');
  });

  it('renders the placeholder image note', () => {
    renderGallery();
    expect(screen.getByText(/Replace placeholder images/)).toBeInTheDocument();
  });
});
