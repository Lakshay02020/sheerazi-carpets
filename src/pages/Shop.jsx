import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/ProductCard';

const AVAILABLE_COLORS = ['Red', 'Blue', 'Beige', 'Black', 'Green', 'White', 'Grey', 'Brown', 'Pink', 'Yellow'];
const AVAILABLE_SIZES = ['3x5 ft', '4x6 ft', '5x7 ft', '5x8 ft', '6x8 ft', '6x9 ft', '8x10 ft', '9x12 ft'];
const AVAILABLE_SHAPES = ['Rectangular', 'Round', 'Irregular'];

// We can dynamically extract categories from products, or hardcode them
const SHOP_CATEGORIES = ['Hand Tufted', 'Shaggy', 'Persian Silk', 'Designer', 'Contemporary'];

const Shop = () => {
    const { products, loading } = useProducts();
    const [searchParams, setSearchParams] = useSearchParams();

    // Filters state - initialize from URL URLSearchParams
    const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
    const [selectedColor, setSelectedColor] = useState(searchParams.get('color') || '');
    const [selectedSize, setSelectedSize] = useState(searchParams.get('size') || '');
    const [selectedShape, setSelectedShape] = useState(searchParams.get('shape') || '');

    // If URL params change (e.g. clicking a link in the Mega Menu), update local state
    useEffect(() => {
        setSelectedCategory(searchParams.get('category') || '');
        setSelectedColor(searchParams.get('color') || '');
        setSelectedSize(searchParams.get('size') || '');
        setSelectedShape(searchParams.get('shape') || '');
    }, [searchParams]);

    // Sync state to URL when changed (optional, but good for shareable links)
    const updateURL = (key, value) => {
        const params = new URLSearchParams(searchParams);
        if (value) {
            params.set(key, value);
        } else {
            params.delete(key);
        }
        setSearchParams(params);
    };

    // Fast client-side filtering
    const filteredProducts = useMemo(() => {
        return products.filter(product => {
            if (selectedCategory && product.category?.toLowerCase() !== selectedCategory.toLowerCase()) return false;
            
            if (selectedColor) {
                // Support both legacy products (no colors array) and new products
                if (!product.colors || !product.colors.includes(selectedColor)) return false;
            }
            
            if (selectedSize) {
                if (!product.sizes || !product.sizes.includes(selectedSize)) return false;
            }

            if (selectedShape && product.shape !== selectedShape) return false;

            return true;
        });
    }, [products, selectedCategory, selectedColor, selectedSize, selectedShape]);

    const handleClearFilters = () => {
        setSearchParams(new URLSearchParams());
    };

    return (
        <div className="shop-page container py-60">
            {/* Sidebar Filters */}
            <aside className="shop-sidebar">
                <div className="filter-card">
                    <h3 className="filter-title">Filters</h3>

                    <div className="filter-group">
                        <h4 className="filter-label">Category</h4>
                        <select 
                            value={selectedCategory} 
                            onChange={(e) => updateURL('category', e.target.value)}
                            className="filter-select"
                        >
                            <option value="">All Categories</option>
                            {SHOP_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-label">Color</h4>
                        <select 
                            value={selectedColor} 
                            onChange={(e) => updateURL('color', e.target.value)}
                            className="filter-select"
                        >
                            <option value="">All Colors</option>
                            {AVAILABLE_COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-label">Size</h4>
                        <select 
                            value={selectedSize} 
                            onChange={(e) => updateURL('size', e.target.value)}
                            className="filter-select"
                        >
                            <option value="">All Sizes</option>
                            {AVAILABLE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div className="filter-group">
                        <h4 className="filter-label">Shape</h4>
                        <select 
                            value={selectedShape} 
                            onChange={(e) => updateURL('shape', e.target.value)}
                            className="filter-select"
                        >
                            <option value="">All Shapes</option>
                            {AVAILABLE_SHAPES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    
                    <button onClick={handleClearFilters} className="clear-btn">
                        Clear Filters
                    </button>
                </div>
            </aside>

            {/* Product Grid */}
            <main className="shop-main">
                <h2 className="shop-title">
                    {selectedCategory || 'All Carpets'} 
                    <span className="result-count">
                        ({filteredProducts.length} results)
                    </span>
                </h2>

                {loading ? (
                    <div className="loading-state">Loading collection...</div>
                ) : filteredProducts.length === 0 ? (
                    <div className="no-results">
                        <h3>No carpets match your exact filters.</h3>
                        <p>Try clearing some filters to see more results.</p>
                    </div>
                ) : (
                    <div className="product-grid">
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </main>

            <style>{`
                .shop-page {
                    display: flex;
                    gap: 40px;
                    align-items: flex-start;
                }
                .shop-sidebar {
                    flex: 0 0 260px;
                    position: sticky;
                    top: 100px;
                }
                .filter-card {
                    padding: 24px;
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    background-color: var(--white);
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                }
                .filter-title {
                    font-size: 1.25rem;
                    margin-bottom: 24px;
                    padding-bottom: 12px;
                    border-bottom: 2px solid var(--secondary);
                }
                .filter-group {
                    margin-bottom: 20px;
                }
                .filter-label {
                    margin-bottom: 8px;
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--text-dark);
                    font-family: var(--font-sans);
                }
                .filter-select {
                    width: 100%;
                    padding: 10px 12px;
                    border-radius: 6px;
                    border: 1px solid #ddd;
                    font-family: var(--font-sans);
                    font-size: 0.9rem;
                    background-color: #fff;
                    outline: none;
                }
                .filter-select:focus {
                    border-color: var(--primary);
                }
                .clear-btn {
                    width: 100%;
                    padding: 12px;
                    background-color: var(--secondary);
                    color: var(--text-dark);
                    border: 1px solid #ddd;
                    border-radius: 6px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: 0.3s;
                    font-family: var(--font-sans);
                }
                .clear-btn:hover {
                    background-color: #eee;
                }
                .shop-main {
                    flex: 1;
                    min-width: 0;
                }
                .shop-title {
                    font-size: 2rem;
                    margin-bottom: 30px;
                    padding-bottom: 15px;
                    border-bottom: 1px solid var(--border-color);
                }
                .result-count {
                    font-size: 1rem;
                    color: var(--text-light);
                    margin-left: 15px;
                    font-weight: 400;
                }
                .product-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
                    gap: 30px;
                }
                .loading-state, .no-results {
                    padding: 80px 20px;
                    text-align: center;
                    background-color: #f9f9f9;
                    border-radius: 12px;
                    border: 1px dashed #ddd;
                }

                @media (max-width: 992px) {
                    .shop-page {
                        flex-direction: column;
                        gap: 30px;
                        align-items: center; /* Center everything on mobile */
                    }
                    .shop-sidebar {
                        flex: none;
                        width: 100%;
                        max-width: 500px; /* Limit filter width on mobile */
                        position: relative;
                        top: 0;
                    }
                    .filter-card {
                        display: grid;
                        grid-template-columns: 1fr 1fr;
                        gap: 15px;
                        padding: 20px;
                    }
                    .filter-title {
                        grid-column: 1 / -1;
                        margin-bottom: 10px;
                        text-align: center;
                    }
                    .filter-group {
                        margin-bottom: 0;
                    }
                    .clear-btn {
                        grid-column: 1 / -1;
                        margin-top: 10px;
                    }
                    .shop-main {
                        width: 100%;
                    }
                    .shop-title {
                        font-size: 1.5rem;
                        margin-top: 10px;
                        text-align: center;
                    }
                    .product-grid {
                        grid-template-columns: 1fr;
                        justify-items: center;
                        gap: 30px;
                    }
                }

                @media (max-width: 480px) {
                    .filter-card {
                        grid-template-columns: 1fr;
                    }
                }
            `}</style>
        </div>
    );
};

export default Shop;
