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
    const [selectedSize, setSelectedSize] = useState('');
    const [activeImageIndex, setActiveImageIndex] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setProduct({ id: docSnap.id, ...data });
                    // Set default selected size to the first available size
                    if (data.sizes && data.sizes.length > 0) {
                        setSelectedSize(data.sizes[0]);
                    }
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

    // Moved after null checks for safety
    const getImages = () => {
        if (product.images && Array.isArray(product.images) && product.images.length > 0) {
            return product.images;
        }
        return product.image ? [product.image] : ['https://picsum.photos/seed/carpet_fallback/800/800'];
    };

    const productImages = getImages();

    // Find the current variant based on selected size
    const currentVariant = product.variants?.find(v => v.size === selectedSize);
    const displayPrice = currentVariant ? currentVariant.price : product.price;
    const displayOriginalPrice = currentVariant ? currentVariant.originalPrice : product.originalPrice;

    const handleAddToCart = () => {
        addToCart({ 
            ...product, 
            image: productImages[0], // Ensure a direct image string is passed
            size: selectedSize, 
            price: displayPrice, // Use variant price
            originalPrice: displayOriginalPrice, // Use variant original price
            quantity: 1 
        });
    };

    return (
        <div className="product-details container py-60">
            <div className="product-layout">
                <div className="product-image-section">
                    <div className="main-image-container">
                        <img 
                            src={productImages[activeImageIndex]} 
                            alt={product.title} 
                            className="main-image" 
                            onError={(e) => { e.target.onerror = null; e.target.src = 'https://picsum.photos/seed/carpet_fallback/800/800'; }} 
                        />
                    </div>
                    {productImages.length > 1 && (
                        <div className="thumbnail-grid">
                            {productImages.map((img, index) => (
                                <div 
                                    key={index} 
                                    className={`thumbnail-item ${activeImageIndex === index ? 'active' : ''}`}
                                    onClick={() => setActiveImageIndex(index)}
                                >
                                    <img src={img} alt={`${product.title} view ${index + 1}`} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                
                <div className="product-info-section">
                    <p className="product-vendor caps">{product.vendor}</p>
                    <h1 className="product-title">{product.title}</h1>
                    <div className="product-price">
                        {displayOriginalPrice && displayPrice && parseFloat(displayOriginalPrice) > parseFloat(displayPrice) && (
                            <span className="original-price">₹{parseFloat(displayOriginalPrice).toFixed(2)}</span>
                        )}
                        <span className="current-price">
                            {displayPrice ? `₹${parseFloat(displayPrice).toFixed(2)}` : 'Contact for Price'}
                        </span>
                    </div>

                    {product.sizes && product.sizes.length > 0 && (
                        <div className="size-selector">
                            <h4>Select Size (Feet)</h4>
                            <div className="size-buttons">
                                {product.sizes.map(size => (
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
                    )}

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
        .main-image-container {
          width: 100%;
          margin-bottom: 15px;
          border-radius: 4px;
          overflow: hidden;
          background: #f9f9f9;
        }
        .main-image {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.3s ease;
        }
        .thumbnail-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
          gap: 10px;
        }
        .thumbnail-item {
          aspect-ratio: 1;
          cursor: pointer;
          border: 1px solid var(--border-color);
          overflow: hidden;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .thumbnail-item img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .thumbnail-item:hover {
          border-color: var(--primary);
        }
        .thumbnail-item.active {
          border-color: var(--primary);
          box-shadow: 0 0 0 1px var(--primary);
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
