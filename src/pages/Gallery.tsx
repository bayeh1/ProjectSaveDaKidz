import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { galleryContent, type GalleryPhoto } from '../content/gallery';

const { header, categories, donateCta } = galleryContent;

interface ActivePhoto {
  photo: GalleryPhoto;
  categoryLabel: string;
}

function Lightbox({ active, onClose }: { active: ActivePhoto; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.85)' }}
      onClick={onClose}
      data-testid="lightbox-overlay"
    >
      <div
        className="relative max-w-3xl w-full rounded-xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        data-testid="lightbox-content"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/50 text-white text-xl font-bold transition-colors hover:bg-red-600"
          aria-label="Close lightbox"
          style={{ '--tw-hover-bg-opacity': '1' } as React.CSSProperties}
        >
          &times;
        </button>
        <img
          src={`/images/${active.photo.filename}`}
          alt={active.photo.alt}
          className="w-full object-contain max-h-[70vh]"
        />
        <div className="bg-white p-4" style={{ borderTop: '3px solid #FCD116' }}>
          <span className="text-xs font-semibold uppercase tracking-widest text-green-700 mb-1 block">
            {active.categoryLabel}
          </span>
          <p className="font-bold text-gray-900 mb-1">{active.photo.title}</p>
          <p className="text-gray-500 text-sm">{active.photo.caption}</p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default function Gallery() {
  const [active, setActive] = useState<ActivePhoto | null>(null);

  return (
    <>
      <Navbar />

      {/* Page Header */}
      <header className="gradient-bg text-white">
        <div className="container mx-auto px-4 py-10 md:py-16 text-center">
          <div className="mx-auto max-w-xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-3">{header.heading}</h1>
            <p className="text-xl opacity-90">
              {header.subheading}
            </p>
          </div>
        </div>
      </header>

      {/* Gallery Sections */}
      <main className="container mx-auto px-4 py-12 md:py-16">
        {categories.map((cat) => (
          <div key={cat.heading} className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">{cat.heading}</h2>
            <p className="text-gray-500 mb-6">{cat.subheading}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {cat.photos.map((photo) => (
                <button
                  key={photo.filename}
                  className="gallery-card rounded-xl overflow-hidden shadow-sm text-left w-full cursor-pointer"
                  onClick={() => setActive({ photo, categoryLabel: cat.heading })}
                  aria-label={`Open photo: ${photo.title}`}
                >
                  <div className="relative" style={{ height: 220 }}>
                    <img
                      src={`/images/${photo.filename}`}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <p className="font-semibold text-gray-800 mb-1 text-sm">{photo.title}</p>
                    <p className="text-gray-500 text-xs">{photo.caption}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ))}
      </main>

      {/* Donate CTA */}
      <section className="gradient-bg text-white py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-lg">
            <h2 className="text-3xl font-bold mb-3">{donateCta.heading}</h2>
            <p className="text-xl mb-6 opacity-90">
              {donateCta.subheading}
            </p>
            <Link
              to="/donate"
              className="btn-donate inline-block px-10 py-3 bg-white text-green-700 font-bold rounded-full shadow"
            >
              {donateCta.cta}
            </Link>
          </div>
        </div>
      </section>

      <Footer />

      {active && <Lightbox active={active} onClose={() => setActive(null)} />}
    </>
  );
}
