import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { homeContent } from '../content/home';

const { hero, stats, mission, missionCards, galleryPreview, donateCta } = homeContent;

export default function Home() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <header className="gradient-bg text-white">
        <div className="container mx-auto px-4 py-16 md:py-24 text-center">
          <div className="mx-auto max-w-3xl">
            <p className="uppercase font-semibold mb-3 opacity-75 text-sm tracking-widest">
              {hero.eyebrow}
            </p>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              {hero.heading}
            </h1>
            <p className="text-xl mb-8 opacity-90">
              {hero.subheading}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/donate"
                className="btn-donate px-10 py-3 bg-white text-purple-700 font-bold rounded-full shadow text-lg"
              >
                {hero.donateCta}
              </Link>
              <Link
                to="/gallery"
                className="px-10 py-3 border-2 border-white text-white font-semibold rounded-full text-lg hover:bg-white hover:text-purple-700 transition-colors"
              >
                {hero.galleryCta}
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Impact Stats */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-bold text-purple-600 mb-1">{stat.value}</div>
                <div className="text-gray-500 text-sm font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12 max-w-5xl mx-auto">
            <div className="lg:w-1/2">
              <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-4">
                {mission.eyebrow}
              </span>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                {mission.heading}
              </h2>
              <p className="text-gray-600 mb-4 leading-relaxed">
                {mission.body1}
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {mission.body2}
              </p>
              <Link
                to="/donate"
                className="btn-donate inline-block px-8 py-3 text-white font-bold rounded-full"
                style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}
              >
                {mission.cta}
              </Link>
            </div>
            <div className="lg:w-1/2 grid grid-cols-2 gap-3">
              {missionCards.map((card) => (
                <div
                  key={card.title}
                  className={`mission-card rounded-xl p-4 bg-gradient-to-br ${card.bg}`}
                >
                  <div className="text-3xl mb-2">{card.icon}</div>
                  <h5 className={`font-bold mb-1 ${card.titleColor}`}>{card.title}</h5>
                  <p className="text-sm text-gray-600">{card.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Preview */}
      <section className="py-16 md:py-20" style={{ backgroundColor: '#f8f7ff' }}>
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-semibold mb-3">
              {galleryPreview.eyebrow}
            </span>
            <h2 className="text-4xl font-bold text-gray-900 mb-3">{galleryPreview.heading}</h2>
            <p className="text-gray-500 mx-auto max-w-lg">
              {galleryPreview.subheading}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {galleryPreview.photos.map(({ seed, caption }) => (
              <div key={seed} className="gallery-thumb rounded-xl overflow-hidden relative" style={{ height: 240 }}>
                <img
                  src={`https://picsum.photos/seed/${seed}/600/400`}
                  alt={caption}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute bottom-0 left-0 right-0 p-3 text-white"
                  style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.6))' }}
                >
                  <p className="text-sm font-semibold mb-0">{caption}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link
              to="/gallery"
              className="inline-block px-10 py-3 border-2 rounded-full font-semibold"
              style={{ borderColor: '#764ba2', color: '#764ba2' }}
            >
              {galleryPreview.cta}
            </Link>
          </div>
        </div>
      </section>

      {/* Donate CTA */}
      <section className="gradient-bg text-white py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-xl">
            <h2 className="text-4xl font-bold mb-4">{donateCta.heading}</h2>
            <p className="text-xl mb-8 opacity-90">
              {donateCta.subheading}
            </p>
            <Link
              to="/donate"
              className="btn-donate inline-block px-12 py-3 bg-white text-purple-700 font-bold rounded-full shadow-lg text-lg"
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
