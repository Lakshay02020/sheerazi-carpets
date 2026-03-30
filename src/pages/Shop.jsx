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
        <div className="container py-60" style={{ display: 'flex', gap: '30px', alignItems: 'flex-start' }}>
            {/* Sidebar Filters */}
            <aside style={{ flex: '0 0 250px', position: 'sticky', top: '20px' }}>
                <div style={{ padding: '20px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--white)' }}>
                    <h3 style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>Filters</h3>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ marginBottom: '10px', fontSize: '1rem' }}>Category</h4>
                        <select 
                            value={selectedCategory} 
                            onChange={(e) => updateURL('category', e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">All Categories</option>
                            {SHOP_CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ marginBottom: '10px', fontSize: '1rem' }}>Color</h4>
                        <select 
                            value={selectedColor} 
                            onChange={(e) => updateURL('color', e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">All Colors</option>
                            {AVAILABLE_COLORS.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ marginBottom: '10px', fontSize: '1rem' }}>Size</h4>
                        <select 
                            value={selectedSize} 
                            onChange={(e) => updateURL('size', e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">All Sizes</option>
                            {AVAILABLE_SIZES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <h4 style={{ marginBottom: '10px', fontSize: '1rem' }}>Shape</h4>
                        <select 
                            value={selectedShape} 
                            onChange={(e) => updateURL('shape', e.target.value)}
                            style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                        >
                            <option value="">All Shapes</option>
                            {AVAILABLE_SHAPES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>
                    
                    <button 
                        onClick={handleClearFilters}
                        style={{ width: '100%', padding: '8px', backgroundColor: '#f1f1f1', border: '1px solid #ccc', borderRadius: '4px', cursor: 'pointer', transition: '0.2s' }}
                    >
                        Clear Filters
                    </button>
                </div>
            </aside>

            {/* Product Grid */}
            <main style={{ flex: 1, minWidth: 0 }}>
                <h2 style={{ marginBottom: '20px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
                    {selectedCategory || 'All Carpets'} 
                    <span style={{ fontSize: '1rem', color: 'var(--text-light)', marginLeft: '10px', fontWeight: 'normal' }}>
                        ({filteredProducts.length} results)
                    </span>
                </h2>

                {loading ? (
                    <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-light)' }}>Loading collection...</div>
                ) : filteredProducts.length === 0 ? (
                    <div style={{ padding: '60px', textAlign: 'center', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc' }}>
                        <h3 style={{ color: 'var(--text-dark)', marginBottom: '10px' }}>No carpets match your exact filters.</h3>
                        <p style={{ color: 'var(--text-light)' }}>Try clearing some filters to see more results.</p>
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
                        {filteredProducts.map(product => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default Shop;
