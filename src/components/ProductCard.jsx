import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
    return (
        <div className="product-card">
            <Link to={`/product/${product.id}`} className="product-link">
                <div className="product-image-container">
                    <img 
                        src={(product.images && product.images.length > 0) ? product.images[0] : product.image} 
                        alt={product.title} 
                        className="product-image" 
                        onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/seed/carpet_fallback/800/800'; }} 
                    />
                    {product.originalPrice > product.price && (
                        <div className="sale-badge">Sale</div>
                    )}
                </div>
                <div className="product-info">
                    <p className="product-vendor caps">{product.vendor}</p>
                    <h3 className="product-title">{product.title}</h3>
                    <div className="product-price">
                        {product.originalPrice > product.price && (
                            <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                        )}
                        <span className="current-price">₹{product.price.toFixed(2)}</span>
                    </div>
                </div>
            </Link>

            <style>{`
        .product-card {
          text-align: center;
          transition: transform 0.3s ease;
        }
        .product-card:hover {
          transform: translateY(-5px);
        }
        .product-link {
          color: inherit;
        }
        .product-image-container {
          position: relative;
          overflow: hidden;
          padding-top: 100%; /* 1:1 Aspect Ratio */
          background-color: var(--secondary);
          margin-bottom: 20px;
        }
        .product-image {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }
        .product-card:hover .product-image {
          transform: scale(1.05);
        }
        .sale-badge {
          position: absolute;
          top: 10px;
          left: 10px;
          background-color: var(--primary);
          color: var(--white);
          padding: 5px 10px;
          font-size: 0.8rem;
          font-weight: bold;
          text-transform: uppercase;
          z-index: 2;
        }
        .product-vendor {
          font-size: 0.75rem;
          color: var(--text-light);
          margin-bottom: 8px;
        }
        .product-title {
          font-size: 1.1rem;
          margin-bottom: 12px;
          min-height: 2.4em;
        }
        .product-price {
          font-family: var(--font-sans);
          font-weight: 500;
        }
        .original-price {
          color: var(--text-light);
          text-decoration: line-through;
          margin-right: 10px;
          font-size: 0.9rem;
        }
        .current-price {
          color: var(--primary);
          font-size: 1.1rem;
        }
      `}</style>
        </div>
    );
};

export default ProductCard;
