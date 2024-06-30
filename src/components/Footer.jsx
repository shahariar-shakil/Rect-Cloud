import React from 'react';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light">
      <div className="container">
        <p className="text-muted text-center">&copy; 2024 Shahariar's Website</p>
        <div className="row justify-content-center">
          <div className="col-auto">
            <ul className="list-inline">
              <li className="list-inline-item"><a href="/terms">Terms of Use</a></li>
              <li className="list-inline-item"><a href="/privacy">Privacy Policy</a></li>
              <li className="list-inline-item"><a href="/contact">Contact Us</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
