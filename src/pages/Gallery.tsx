import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { galleryContent } from '../content/gallery';

const { header, categories, donateCta } = galleryContent;

export default function Gallery() {
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
                <div key={photo.seed} className="gallery-card rounded-xl overflow-hidden shadow-sm">
                  <div className="relative" style={{ height: 220 }}>
                    <img
                      src={`https://picsum.photos/seed/${photo.seed}/600/400`}
                      alt={photo.alt}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-3 bg-white">
                    <p className="font-semibold text-gray-800 mb-1 text-sm">{photo.title}</p>
                    <p className="text-gray-500 text-xs">{photo.caption}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="text-center py-4 text-gray-400 text-sm border-t">
          <p>
            📷 Replace placeholder images with real photos from the field. Add your images to an{' '}
            <code>images/</code> folder and update the <code>src</code> attributes above.
          </p>
        </div>
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
              className="btn-donate inline-block px-10 py-3 bg-white text-purple-700 font-bold rounded-full shadow"
            >
              {donateCta.cta}
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
}
