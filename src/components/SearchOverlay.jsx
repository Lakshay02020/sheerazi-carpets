import React, { useState, useEffect, useRef } from 'react';
import { X, Search } from 'lucide-react';
import { useProducts } from '../context/ProductContext';
import ProductCard from './ProductCard'; 

const SearchOverlay = ({ isOpen, onClose }) => {
    const { products, loading } = useProducts();
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    // Focus input when modal opens and prevent background scroll
    useEffect(() => {
        if (isOpen && inputRef.current) {
            setTimeout(() => inputRef.current.focus(), 100);
            document.body.style.overflow = 'hidden';
            // Clear prior queries when opened
            setQuery('');
        } else {
            document.body.style.overflow = 'auto';
        }
        
        return () => { document.body.style.overflow = 'auto'; }
    }, [isOpen]);

    // Handle Escape key to close
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    if (!isOpen) return null;

    // Filter instantly based on user input
    // Only search if user types at least 2 characters to avoid huge generic dumps
    const filteredProducts = query.length > 1 ? 
        products.filter(p => {
            const searchString = `${p.title} ${p.category} ${p.colors?.join(' ')} ${p.sizes?.join(' ')} ${p.vendor}`.toLowerCase();
            return searchString.includes(query.toLowerCase());
        }).slice(0, 8) // Show top 8 hits
        : [];

    return (
        <div className="search-overlay">
            <div className="search-overlay-close" onClick={onClose}>
                <X size={36} />
            </div>

            <div className="search-container">
                <div className="search-input-wrapper">
                    <Search className="search-icon-large" />
                    <input 
                        ref={inputRef}
                        type="text" 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for 'Red Shaggy' or 'Designer'..." 
                        className="search-input"
                    />
                </div>

                <div className="search-results-area">
                    {query.length > 1 && (
                        loading ? (
                            <p style={{ textAlign: 'center', color: '#fff', fontSize: '1.2rem', marginTop: '40px' }}>Loading catalog...</p>
                        ) : filteredProducts.length > 0 ? (
                            <div className="search-products-grid">
                                {filteredProducts.map(product => (
                                     // Wrap ProductCard with onClick so clicking a product closes the overlay
                                    <div key={product.id} onClick={onClose}>
                                        <ProductCard product={product} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', marginTop: '60px' }}>
                                <Search size={48} color="rgba(255,255,255,0.2)" style={{ marginBottom: '15px' }} />
                                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.2rem' }}>
                                    No exact matches found for "{query}". 
                                </p>
                                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '1rem', marginTop: '10px' }}>
                                    Try searching by color (e.g. "Red") or collection (e.g. "Persian").
                                </p>
                            </div>
                        )
                    )}
                </div>
            </div>

            <style>{`
                .search-overlay {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100vw;
                    height: 100vh;
                    background-color: rgba(10, 10, 10, 0.95);
                    z-index: 9999;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding-top: 15vh;
                    animation: fadeIn 0.3s ease;
                    backdrop-filter: blur(10px);
                    overflow-y: auto;
                }
                
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                .search-overlay-close {
                    position: absolute;
                    top: 30px;
                    right: 40px;
                    color: white;
                    cursor: pointer;
                    transition: transform 0.2s, color 0.2s;
                }

                .search-overlay-close:hover {
                    transform: scale(1.1);
                    color: var(--primary);
                }

                .search-container {
                    width: 90%;
                    max-width: 1200px;
                }

                .search-input-wrapper {
                    display: flex;
                    align-items: center;
                    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
                    padding-bottom: 15px;
                    transition: border-color 0.3s;
                }
                
                .search-input-wrapper:focus-within {
                    border-bottom-color: var(--primary);
                }

                .search-icon-large {
                    color: white;
                    width: 36px;
                    height: 36px;
                    margin-right: 20px;
                }

                .search-input {
                    background: transparent;
                    border: none;
                    color: white;
                    font-size: 2.5rem;
                    width: 100%;
                    font-family: var(--font-serif);
                    outline: none;
                }
                
                .search-input::placeholder {
                    color: rgba(255, 255, 255, 0.3);
                }

                .search-results-area {
                    margin-top: 50px;
                    padding-bottom: 80px;
                }

                .search-products-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
                    gap: 30px;
                    width: 100%;
                }
                
                /* Make product cards visually pop against the dark overlay */
                .search-products-grid .product-card {
                    background-color: var(--white);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.6);
                    border: none;
                }
                
                @media (max-width: 768px) {
                    .search-input {
                        font-size: 1.8rem;
                    }
                    .search-icon-large {
                        width: 24px;
                        height: 24px;
                        margin-right: 15px;
                    }
                    .search-overlay {
                        padding-top: 8vh;
                    }
                    .search-overlay-close {
                        top: 20px;
                        right: 20px;
                    }
                }
            `}</style>
        </div>
    );
};

export default SearchOverlay;
