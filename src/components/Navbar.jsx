import React from 'react';
import { Menu, Search, User, ShoppingBag, MapPin, Phone, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { cartCount, toggleCart } = useCart();

  return (
    <header className="navbar-container">
      {/* Top Announcement Bar */}
      <div className="top-bar">
        <p className="caps" style={{ fontSize: '12px', letterSpacing: '2px' }}>
          Free Shipping Across India | Handcrafted with Love
        </p>
      </div>

      {/* Main Navbar */}
      <nav className="main-nav">
        <div className="nav-left">
          <Menu className="icon icon-menu" />
        </div>

        <div className="nav-center">
          <Link to="/" className="logo-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '15px', textDecoration: 'none' }}>
            <img src="/logo.jpg" alt="Fine and Art Carpets" style={{ height: '60px', objectFit: 'contain', mixBlendMode: 'lighten', borderRadius: '4px' }} className="logo-img" />
            <div style={{ textAlign: 'left' }}>
              <h1 className="logo-text">
                <span className="logo-line" style={{ fontSize: '1rem', fontStyle: 'normal' }}>FINE AND ART</span><br />
                <span className="logo-bold" style={{ fontSize: '1.8rem', letterSpacing: '1px' }}>CARPETS</span>
              </h1>
            </div>
          </Link>
        </div>

        <div className="nav-right">
          <Link to="/contact"><Phone className="icon nav-icon" style={{ color: 'var(--white)' }} /></Link>
          <Link to="/contact"><MapPin className="icon nav-icon" style={{ color: 'var(--white)' }} /></Link>
          <User className="icon nav-icon" />
          <Search className="icon nav-icon" />
          <div className="cart-icon-wrapper" onClick={toggleCart}>
            <ShoppingBag className="icon nav-icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </nav>

      {/* Mega Menu Navigation */}
      <div className="mega-menu-bar">
        <ul className="mega-menu-list">
            <li className="mega-dropdown">
                <Link to="/shop" className="mega-link">Shop All <ChevronDown className="mega-icon" /></Link>
            </li>
            <li className="mega-dropdown">
                <span className="mega-link">By Category <ChevronDown className="mega-icon" /></span>
                <div className="dropdown-content">
                    <Link to="/shop?category=Hand+Tufted">Hand Tufted Carpets</Link>
                    <Link to="/shop?category=Shaggy">Shaggy Carpets</Link>
                    <Link to="/shop?category=Persian+Silk">Persian Silk Carpets</Link>
                    <Link to="/shop?category=Designer">Designer Carpets</Link>
                    <Link to="/shop?category=Contemporary">Contemporary</Link>
                </div>
            </li>
            <li className="mega-dropdown">
                <span className="mega-link">By Size <ChevronDown className="mega-icon" /></span>
                <div className="dropdown-content">
                    <Link to="/shop?size=3x5+ft">3x5 ft</Link>
                    <Link to="/shop?size=4x6+ft">4x6 ft</Link>
                    <Link to="/shop?size=5x7+ft">5x7 ft</Link>
                    <Link to="/shop?size=5x8+ft">5x8 ft</Link>
                    <Link to="/shop?size=6x9+ft">6x9 ft</Link>
                    <Link to="/shop?size=8x10+ft">8x10 ft</Link>
                    <Link to="/shop?size=9x12+ft">9x12 ft</Link>
                </div>
            </li>
            <li className="mega-dropdown">
                <span className="mega-link">By Color <ChevronDown className="mega-icon" /></span>
                <div className="dropdown-content color-grid">
                    <Link to="/shop?color=Red">Red</Link>
                    <Link to="/shop?color=Blue">Blue</Link>
                    <Link to="/shop?color=Beige">Beige</Link>
                    <Link to="/shop?color=Black">Black</Link>
                    <Link to="/shop?color=Green">Green</Link>
                    <Link to="/shop?color=White">White</Link>
                    <Link to="/shop?color=Grey">Grey</Link>
                </div>
            </li>
            <li className="mega-dropdown">
                <span className="mega-link">By Shape <ChevronDown className="mega-icon" /></span>
                <div className="dropdown-content">
                    <Link to="/shop?shape=Rectangular">Rectangular</Link>
                    <Link to="/shop?shape=Round">Round</Link>
                    <Link to="/shop?shape=Irregular">Irregular</Link>
                </div>
            </li>
        </ul>
      </div>

      <style>{`
        .navbar-container {
          position: sticky;
          top: 0;
          z-index: 100;
        }
        .top-bar {
          background-color: var(--secondary);
          color: var(--text-dark);
          text-align: center;
          padding: 8px 0;
        }
        .main-nav {
          background-color: var(--primary);
          color: var(--white);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 40px;
        }
        .nav-left, .nav-right {
          flex: 1;
        }
        .nav-right {
          display: flex;
          justify-content: flex-end;
          gap: 20px;
        }
        .nav-center {
          flex: 2;
          text-align: center;
        }
        .logo-text {
          font-family: var(--font-serif);
          font-weight: 400;
          line-height: 1;
          color: var(--white);
          margin: 0;
        }
        .logo-line {
          font-style: italic;
          font-size: 1.2rem;
          font-weight: 300;
        }
        .logo-bold {
          font-size: 2.2rem;
          text-transform: uppercase;
        }
        .icon {
          width: 20px;
          height: 20px;
          cursor: pointer;
        }
        .icon-menu {
          width: 24px;
          height: 24px;
        }
        .nav-icon:hover, .icon-menu:hover {
          opacity: 0.8;
        }
        .cart-icon-wrapper {
          position: relative;
          cursor: pointer;
        }
        .cart-badge {
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: var(--white);
          color: var(--primary);
          border-radius: 50%;
          width: 18px;
          height: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
        }

        /* Mega Menu Styles */
        .mega-menu-bar {
          background-color: var(--white);
          border-bottom: 1px solid var(--border-color);
          display: none; /* hidden on small screens */
        }
        @media (min-width: 768px) {
          .mega-menu-bar {
            display: block;
          }
        }
        .mega-menu-list {
          list-style: none;
          display: flex;
          justify-content: center;
          margin: 0;
          padding: 0;
          gap: 30px;
        }
        .mega-dropdown {
          position: relative;
        }
        .mega-link {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 15px 10px;
          font-weight: 500;
          color: var(--text-dark);
          text-decoration: none;
          cursor: pointer;
          font-size: 0.95rem;
          transition: 0.2s;
        }
        .mega-link:hover {
          color: var(--primary);
        }
        .mega-icon {
          width: 14px;
          height: 14px;
        }
        .dropdown-content {
          display: none;
          position: absolute;
          top: 100%;
          left: 50%;
          transform: translateX(-50%);
          background-color: var(--white);
          min-width: 220px;
          box-shadow: 0px 8px 24px 0px rgba(0,0,0,0.15);
          z-index: 101;
          border-radius: 4px;
          border: 1px solid var(--border-color);
          overflow: hidden;
        }
        .mega-dropdown:hover .dropdown-content {
          display: block;
        }
        .dropdown-content a {
          color: var(--text-dark);
          padding: 12px 20px;
          text-decoration: none;
          display: block;
          font-size: 0.9rem;
          border-bottom: 1px solid #f1f1f1;
        }
        .dropdown-content a:last-child {
          border-bottom: none;
        }
        .dropdown-content a:hover {
          background-color: #fafafa;
          color: var(--primary);
          padding-left: 24px;
          transition: 0.3s;
        }
        .color-grid {
          min-width: 300px;
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .color-grid a {
          border-bottom: none;
        }
      `}</style>
    </header>
  );
};

export default Navbar;
