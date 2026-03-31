import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
    return (
        <section className="hero">
            <div className="hero-content">
                <h2>Premium Handmade & Machine-Made Carpets</h2>
                <p>Explore Fine and art carpets' extensive collection of hand-tufted rugs, shaggy carpets, and designer pieces.</p>
                <Link to="/shop" className="btn btn-hero">Shop Now</Link>
            </div>
            <style>{`
        .hero {
          height: 70vh;
          min-height: 500px;
          background-image: linear-gradient(rgba(0,0,0,0.4), rgba(75, 6, 6, 0.5)), url('/hero-rug.png');
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          color: var(--white);
          padding: 0 20px;
        }
        .hero-content {
          max-width: 800px;
          animation: fadeIn 1s ease-out forwards;
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .hero h2 {
          font-size: 3.5rem;
          margin-bottom: 20px;
          text-shadow: 2px 2px 4px rgba(0,0,0,0.6);
        }
        .hero p {
          font-size: 1.2rem;
          margin-bottom: 30px;
          font-weight: 300;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.6);
        }
        .btn-hero {
          font-size: 1.1rem;
          padding: 15px 40px;
          border: 2px solid var(--white);
          background-color: transparent;
        }
        .btn-hero:hover {
          background-color: var(--white);
          color: var(--primary);
        }
        @media (max-width: 768px) {
          .hero {
            height: 60vh;
            min-height: 400px;
          }
          .hero h2 {
            font-size: 2rem !important;
          }
          .hero p {
            font-size: 1rem !important;
          }
          .btn-hero {
            padding: 12px 30px;
            font-size: 1rem;
          }
        }
      `}</style>
        </section>
    );
};

export default Hero;
