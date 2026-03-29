import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <p className="font-bold mb-1">Joy for Every Child</p>
        <div className="flex justify-center gap-6 mb-3">
          <Link to="/" className="text-gray-400 text-sm no-underline hover:text-gray-200">Home</Link>
          <Link to="/gallery" className="text-gray-400 text-sm no-underline hover:text-gray-200">Gallery</Link>
          <Link to="/donate" className="text-gray-400 text-sm no-underline hover:text-gray-200">Donate</Link>
        </div>
        <p className="text-gray-500 text-sm mb-1">© 2025 Joy for Every Child. All rights reserved.</p>
        <p className="text-gray-600 text-sm mb-0">A registered 501(c)(3) charity organization</p>
      </div>
    </footer>
  );
}
