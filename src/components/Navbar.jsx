import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const location = useLocation();

  const getNavLinkClass = (path) => {
    return location.pathname === path ? 'nav-link active' : 'nav-link';
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand">Shahariar</Link>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {location.pathname === '/' && (
              <>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/signup')} to="/signup">Sign Up</Link>
                </li>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/signin')} to="/signin">Sign In</Link>
                </li>
              </>
            )}
            {location.pathname === '/signup' && (
              <li className="nav-item">
                <Link className={getNavLinkClass('/signup')} to="/signup">Sign Up</Link>
              </li>
            )}
            {location.pathname === '/signin' && (
              <li className="nav-item">
                <Link className={getNavLinkClass('/signin')} to="/signin">Sign In</Link>
              </li>
            )}
            {['/home', '/services', '/about', '/contact', '/admin'].includes(location.pathname) && (
              <>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/home')} to="/home">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/services')} to="/services">Services</Link>
                </li>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/about')} to="/about">About</Link>
                </li>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/contact')} to="/contact">Contact</Link>
                </li>
                <li className="nav-item">
                  <Link className={getNavLinkClass('/logout')} to="/logout">Logout</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
