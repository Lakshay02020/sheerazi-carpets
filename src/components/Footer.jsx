import React from 'react';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-grid">
                    <div className="footer-brand">
                        <h2 className="logo-text" style={{ color: 'var(--primary)', fontWeight: 'bold' }}>
                            Fine and art
                        </h2>
                        <p className="mt-4" style={{ color: 'var(--text-light)' }}>
                            Bringing traditional elegance and modern design to your floors. Premium handmade carpets from India.
                        </p>
                    </div>
                    <div className="footer-links">
                        <h4>Shop</h4>
                        <ul>
                            <li><a href="#">Hand Tufted Rugs</a></li>
                            <li><a href="#">Shaggy Carpets</a></li>
                            <li><a href="#">Luxury Viscose</a></li>
                            <li><a href="#">Traditional Kashmiri</a></li>
                        </ul>
                    </div>
                    <div className="footer-links">
                        <h4>Customer Care</h4>
                        <ul>
                            <li><a href="#">Contact Us</a></li>
                            <li><a href="#">Shipping Policy</a></li>
                            <li><a href="#">Returns & Exchanges</a></li>
                            <li><a href="#">Track Order</a></li>
                        </ul>
                    </div>
                </div>
                <div className="footer-bottom">
                    <p>&copy; {new Date().getFullYear()} Fine and art carpets. All rights reserved<a href="/admin" style={{ color: 'inherit', textDecoration: 'none' }}>.</a></p>
                </div>
            </div>
            <style>{`
        .footer {
          background-color: var(--secondary);
          padding: 60px 0 20px;
          margin-top: 60px;
          border-top: 1px solid var(--border-color);
        }
        .footer-grid {
          display: grid;
          grid-template-columns: 2fr 1fr 1fr;
          gap: 40px;
          margin-bottom: 40px;
        }
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr;
            gap: 30px;
            text-align: center;
          }
        }
        .footer h4 {
          font-family: var(--font-sans);
          font-weight: 600;
          margin-bottom: 20px;
          text-transform: uppercase;
        }
        .footer-links ul {
          list-style: none;
        }
        .footer-links li {
          margin-bottom: 12px;
        }
        .footer-links a {
          color: var(--text-light);
          font-size: 0.95rem;
        }
        .footer-links a:hover {
          color: var(--primary);
        }
        .footer-bottom {
          text-align: center;
          padding-top: 20px;
          border-top: 1px solid var(--border-color);
          color: var(--text-light);
          font-size: 0.9rem;
        }
        .mt-4 { margin-top: 16px; }
      `}</style>
        </footer>
    );
};

export default Footer;
