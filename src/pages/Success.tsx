import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { successContent } from '../content/success';

export default function Success() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center px-3 md:px-4 py-8">
        <div className="w-full max-w-sm">
          <div className="gradient-bg text-white rounded-2xl p-8 md:p-12 text-center shadow-lg">
            <div className="mb-6">
              <svg
                className="mx-auto"
                style={{ width: '4rem', height: '4rem' }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">{successContent.heading}</h1>
            <p className="text-lg mb-4 opacity-90">
              {successContent.subheading}
            </p>
            <p className="text-base mb-6 opacity-80">
              {successContent.body}
            </p>
            <div className="flex flex-col gap-3">
              <p className="text-sm opacity-75">
                {successContent.receiptNote}
              </p>
              <Link
                to="/"
                className="btn-donate inline-block bg-white text-green-700 px-8 py-3 rounded-lg font-semibold"
              >
                {successContent.returnCta}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
