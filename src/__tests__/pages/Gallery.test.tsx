import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
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

  it('renders photo images with correct src path', () => {
    renderGallery();
    const firstPhoto = galleryContent.categories[0].photos[0];
    const img = screen.getByAltText(firstPhoto.alt);
    expect(img).toHaveAttribute('src', `/images/${firstPhoto.filename}`);
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

  it('renders each photo card as a button', () => {
    renderGallery();
    galleryContent.categories.forEach((cat) => {
      cat.photos.forEach((photo) => {
        expect(screen.getByRole('button', { name: `Open photo: ${photo.title}` })).toBeInTheDocument();
      });
    });
  });

  it('opens lightbox when a photo card is clicked', () => {
    renderGallery();
    const firstPhoto = galleryContent.categories[0].photos[0];
    fireEvent.click(screen.getByRole('button', { name: `Open photo: ${firstPhoto.title}` }));
    expect(screen.getByTestId('lightbox-overlay')).toBeInTheDocument();
  });

  it('lightbox shows the photo image', () => {
    renderGallery();
    const firstPhoto = galleryContent.categories[0].photos[0];
    fireEvent.click(screen.getByRole('button', { name: `Open photo: ${firstPhoto.title}` }));
    const lightboxContent = screen.getByTestId('lightbox-content');
    expect(lightboxContent.querySelector('img')).toHaveAttribute('src', `/images/${firstPhoto.filename}`);
  });

  it('lightbox shows category label, title, and caption', () => {
    renderGallery();
    const cat = galleryContent.categories[0];
    const photo = cat.photos[0];
    fireEvent.click(screen.getByRole('button', { name: `Open photo: ${photo.title}` }));
    const lightbox = screen.getByTestId('lightbox-content');
    expect(lightbox).toHaveTextContent(cat.heading);
    expect(lightbox).toHaveTextContent(photo.title);
    expect(lightbox).toHaveTextContent(photo.caption);
  });

  it('closes lightbox when × button is clicked', () => {
    renderGallery();
    const firstPhoto = galleryContent.categories[0].photos[0];
    fireEvent.click(screen.getByRole('button', { name: `Open photo: ${firstPhoto.title}` }));
    expect(screen.getByTestId('lightbox-overlay')).toBeInTheDocument();
    fireEvent.click(screen.getByRole('button', { name: 'Close lightbox' }));
    expect(screen.queryByTestId('lightbox-overlay')).not.toBeInTheDocument();
  });

  it('closes lightbox when Escape key is pressed', () => {
    renderGallery();
    const firstPhoto = galleryContent.categories[0].photos[0];
    fireEvent.click(screen.getByRole('button', { name: `Open photo: ${firstPhoto.title}` }));
    expect(screen.getByTestId('lightbox-overlay')).toBeInTheDocument();
    fireEvent.keyDown(document, { key: 'Escape' });
    expect(screen.queryByTestId('lightbox-overlay')).not.toBeInTheDocument();
  });

  it('closes lightbox when overlay is clicked', () => {
    renderGallery();
    const firstPhoto = galleryContent.categories[0].photos[0];
    fireEvent.click(screen.getByRole('button', { name: `Open photo: ${firstPhoto.title}` }));
    expect(screen.getByTestId('lightbox-overlay')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('lightbox-overlay'));
    expect(screen.queryByTestId('lightbox-overlay')).not.toBeInTheDocument();
  });

  it('does not close lightbox when clicking inside the lightbox content', () => {
    renderGallery();
    const firstPhoto = galleryContent.categories[0].photos[0];
    fireEvent.click(screen.getByRole('button', { name: `Open photo: ${firstPhoto.title}` }));
    fireEvent.click(screen.getByTestId('lightbox-content'));
    expect(screen.getByTestId('lightbox-overlay')).toBeInTheDocument();
  });
});
