import React from 'react';
import { Menu, Search, User, ShoppingBag, MapPin, Phone } from 'lucide-react';
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
          <Phone className="icon nav-icon" />
          <MapPin className="icon nav-icon" />
          <User className="icon nav-icon" />
          <Search className="icon nav-icon" />
          <div className="cart-icon-wrapper" onClick={toggleCart}>
            <ShoppingBag className="icon nav-icon" />
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </div>
        </div>
      </nav>

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
      `}</style>
    </header>
  );
};

export default Navbar;
