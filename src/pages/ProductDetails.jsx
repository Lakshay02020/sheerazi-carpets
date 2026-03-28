import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { db } from '../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import { useCart } from '../context/CartContext';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedSize, setSelectedSize] = useState('5x8');

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setProduct({ id: docSnap.id, ...docSnap.data() });
                } else {
                    console.log("No such product!");
                }
            } catch (error) {
                console.error("Error fetching product:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="container py-60 text-center" style={{ color: 'var(--text-light)' }}>Loading product details...</div>;
    }

    if (!product) {
        return (
            <div className="container py-60 text-center">
                <h2>Product not found</h2>
                <button className="btn mt-4" onClick={() => navigate('/')}>Return Home</button>
            </div>
        );
    }

    const sizes = ['3x5', '4x6', '5x8', '8x10', '9x12'];

    const handleAddToCart = () => {
        addToCart({ ...product, size: selectedSize, quantity: 1 });
    };

    return (
        <div className="product-details container py-60">
            <div className="product-layout">
                <div className="product-image-section">
                    <img src={product.image} alt={product.title} className="main-image" onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/seed/carpet_fallback/800/800'; }} />
                </div>

                <div className="product-info-section">
                    <p className="product-vendor caps">{product.vendor}</p>
                    <h1 className="product-title">{product.title}</h1>
                    <div className="product-price">
                        {product.originalPrice > product.price && (
                            <span className="original-price">₹{product.originalPrice.toFixed(2)}</span>
                        )}
                        <span className="current-price">₹{product.price.toFixed(2)}</span>
                    </div>

                    <div className="size-selector">
                        <h4>Select Size (Feet)</h4>
                        <div className="size-buttons">
                            {sizes.map(size => (
                                <button
                                    key={size}
                                    className={`size-btn ${selectedSize === size ? 'selected' : ''}`}
                                    onClick={() => setSelectedSize(size)}
                                >
                                    {size}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="action-buttons">
                        <button className="btn btn-add-cart" onClick={handleAddToCart}>Add to Cart</button>
                        <button className="btn btn-buy-now" onClick={() => {
                            handleAddToCart();
                            navigate('/checkout');
                        }}>Buy It Now</button>
                    </div>

                    <div className="product-description mt-4">
                        <p>Experience the luxury of premium craftsmanship. Our carpets are meticulously handcrafted and machine-made to bring unparalleled elegance and style to any room. Made with the highest quality materials to ensure durability and a rich texture.</p>
                    </div>
                </div>
            </div>

            <style>{`
        .product-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
        }
        @media (min-width: 768px) {
          .product-layout {
            grid-template-columns: 1fr 1fr;
          }
        }
        .main-image {
          width: 100%;
          border-radius: 4px;
        }
        .product-vendor {
          font-size: 0.9rem;
          color: var(--text-light);
          margin-bottom: 10px;
        }
        .product-title {
          font-size: 2.5rem;
          margin-bottom: 20px;
        }
        .product-price {
          font-size: 1.5rem;
          margin-bottom: 30px;
        }
        .current-price {
          color: var(--primary);
          font-weight: 500;
        }
        .original-price {
          color: var(--text-light);
          text-decoration: line-through;
          margin-right: 15px;
          font-size: 1.2rem;
        }
        .size-selector {
          margin-bottom: 30px;
        }
        .size-selector h4 {
          margin-bottom: 10px;
          font-family: var(--font-sans);
          font-size: 0.9rem;
        }
        .size-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .size-btn {
          padding: 8px 16px;
          background: var(--white);
          border: 1px solid var(--border-color);
          cursor: pointer;
          transition: all 0.2s ease;
          font-family: var(--font-sans);
        }
        .size-btn:hover {
          border-color: var(--primary);
        }
        .size-btn.selected {
          background: var(--primary);
          color: var(--white);
          border-color: var(--primary);
        }
        .action-buttons {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .btn-add-cart {
          background: var(--white);
          color: var(--primary);
          border: 2px solid var(--primary);
          width: 100%;
        }
        .btn-add-cart:hover {
          background: var(--primary);
          color: var(--white);
        }
        .btn-buy-now {
          width: 100%;
        }
        .py-60 {
          padding-top: 60px;
          padding-bottom: 60px;
        }
        .mt-4 {
          margin-top: 25px;
        }
      `}</style>
        </div>
    );
};

export default ProductDetails;
