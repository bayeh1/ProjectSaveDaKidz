import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { aboutContent } from '../content/about';

const { header, mission, intro, legacy, donateCta } = aboutContent;

export default function About() {
  return (
    <>
      <Navbar />

      {/* Page Header */}
      <header className="gradient-bg text-white">
        <div className="container mx-auto px-4 py-10 md:py-16 text-center">
          <div className="mx-auto max-w-2xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{header.heading}</h1>
            <p className="text-base md:text-xl opacity-90 leading-relaxed">{header.subheading}</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-16 max-w-3xl">

        {/* Mission Statement */}
        <div className="bg-green-50 border-l-4 rounded-xl p-4 md:p-6 mb-8 md:mb-12" style={{ borderColor: '#006B3F' }}>
          <span className="inline-block bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold mb-2">
            {mission.eyebrow}
          </span>
          <p className="text-base md:text-xl font-semibold text-gray-800 leading-relaxed">
            {mission.statement}
          </p>
        </div>

        {/* Intro */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">{intro.heading}</h2>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg">{intro.body}</p>
        </section>

        {/* Legacy Section */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-5">{legacy.heading}</h2>

          {/* Photo */}
          <div className="flex justify-center mb-6">
            <div className="rounded-2xl overflow-hidden shadow-lg w-48 h-56 md:w-64 md:h-72">
              <img
                src={`/images/${legacy.photo}`}
                alt={legacy.photoAlt}
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-4">{legacy.body1}</p>
          <p className="text-gray-600 leading-relaxed text-base md:text-lg mb-6">{legacy.body2}</p>

          {/* "Time to..." list */}
          <div className="bg-gray-50 rounded-xl p-4 md:p-6 mb-6">
            <p className="text-gray-700 font-medium mb-3">Where they will have:</p>
            <ul className="space-y-2">
              {legacy.timeFor.map((line) => (
                <li key={line} className="flex items-start gap-2 text-gray-700 text-sm md:text-base">
                  <span style={{ color: '#FCD116' }} className="text-lg leading-tight mt-0.5 shrink-0">★</span>
                  {line}
                </li>
              ))}
            </ul>
          </div>

          <p className="text-gray-700 leading-relaxed text-base md:text-lg font-medium">{legacy.closing}</p>
        </section>

      </main>

      {/* Donate CTA */}
      <section className="gradient-bg text-white py-12 md:py-14">
        <div className="container mx-auto px-4 text-center">
          <div className="mx-auto max-w-lg">
            <h2 className="text-2xl md:text-3xl font-bold mb-3">{donateCta.heading}</h2>
            <p className="text-base md:text-xl mb-6 opacity-90 leading-relaxed">{donateCta.subheading}</p>
            <Link
              to="/donate"
              className="btn-donate inline-block px-8 md:px-10 py-3 bg-white text-green-700 font-bold rounded-full shadow text-sm md:text-base"
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
