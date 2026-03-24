import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className={`site-nav${open ? ' open' : ''}`}>
      <div className="site-nav-inner">
        <NavLink className="site-nav-brand" to="/" onClick={() => setOpen(false)}>
          🇬🇭
        </NavLink>
        <button
          className="site-nav-toggle"
          onClick={() => setOpen((o) => !o)}
          aria-label="Menu"
        >
          &#9776;
        </button>
        <ul className="site-nav-links">
          <li>
            <NavLink
              to="/"
              end
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/gallery"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              Gallery
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? 'active' : '')}
              onClick={() => setOpen(false)}
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/donate"
              className={({ isActive }) => `nav-cta${isActive ? ' active' : ''}`}
              onClick={() => setOpen(false)}
            >
              Donate Now
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
