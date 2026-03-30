import React, { useState } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc } from 'firebase/firestore';
import { products as mockProducts } from '../data/mockProducts';
import { useAuth } from '../context/AuthContext';

const AVAILABLE_COLORS = ['Red', 'Blue', 'Beige', 'Black', 'Green', 'White', 'Grey', 'Brown', 'Pink', 'Yellow'];
const AVAILABLE_SIZES = ['3x5 ft', '4x6 ft', '5x7 ft', '5x8 ft', '6x8 ft', '6x9 ft', '8x10 ft', '9x12 ft'];
const AVAILABLE_SHAPES = ['Rectangular', 'Round', 'Irregular'];

const AdminAddProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [shape, setShape] = useState('Rectangular');
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSeeding, setIsSeeding] = useState(false);
    
    const { logout } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!imageUrl) {
            setMessage('Please paste an image URL address.');
            return;
        }

        setIsLoading(true);
        setMessage('');

        try {
            // 2. Save product info to Firestore directly
            const productData = {
                title,
                vendor: 'FINE AND ART CARPETS',
                price: parseFloat(price),
                originalPrice: originalPrice ? parseFloat(originalPrice) : null,
                category,
                shape,
                colors: selectedColors,
                sizes: selectedSizes,
                image: imageUrl, // USING THE LINK THEY PASTED
                rating: 5.0, // Default rating for new products
                createdAt: new Date().getTime()
            };

            await addDoc(collection(db, 'products'), productData);

            setMessage('Product added successfully!');
            // Reset form
            setTitle('');
            setPrice('');
            setOriginalPrice('');
            setCategory('');
            setImageUrl('');
            setShape('Rectangular');
            setSelectedColors([]);
            setSelectedSizes([]);
        } catch (error) {
            console.error('Error adding product: ', error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSeedMockData = async () => {
        setIsSeeding(true);
        setMessage('');
        try {
            let addedCount = 0;
            for (const product of mockProducts) {
                const productData = {
                    title: product.title,
                    vendor: product.vendor,
                    price: product.price,
                    originalPrice: product.originalPrice,
                    category: product.category,
                    image: product.image,
                    rating: product.rating,
                    createdAt: new Date().getTime()
                };
                await addDoc(collection(db, 'products'), productData);
                addedCount++;
            }
            setMessage(`Successfully seeded ${addedCount} initial products to Live Database!`);
        } catch (error) {
            console.error("Error seeding data: ", error);
            setMessage(`Seeding Error: ${error.message}`);
        } finally {
            setIsSeeding(false);
        }
    };

    return (
        <div className="container py-60">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0 }}>Admin: Product Management</h1>
                <button onClick={() => logout()} className="btn" style={{ padding: '8px 15px', backgroundColor: 'var(--text-dark)' }}>
                    Log Out
                </button>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 600px)', justifyContent: 'center', gap: '40px' }}>
                <div style={{ padding: '30px', border: '1px solid var(--border-color)', borderRadius: '8px' }}>
                    <h2 style={{ marginBottom: '20px' }}>Add New Carpet</h2>
                    
                    {message && (
                        <div style={{ padding: '10px', marginBottom: '20px', backgroundColor: message.includes('Error') ? '#ffeeb' : '#e6ffe6', border: `1px solid ${message.includes('Error') ? 'red' : 'green'}` }}>
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                        <div>
                            <label>Product Title*</label>
                            <input required type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="form-control" placeholder="e.g. Royal Persian Rug" />
                        </div>
                        
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label>Sale Price (₹)*</label>
                                <input required type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" />
                            </div>
                            <div>
                                <label>Original Price (₹)</label>
                                <input type="number" step="0.01" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="form-control" placeholder="Optional" />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                            <div>
                                <label>Category*</label>
                                <input required type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" placeholder="e.g. Shaggy, Hand Tufted" />
                            </div>
                            <div>
                                <label>Shape*</label>
                                <select value={shape} onChange={(e) => setShape(e.target.value)} className="form-control" style={{ backgroundColor: 'white' }}>
                                    {AVAILABLE_SHAPES.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Available Colors</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {AVAILABLE_COLORS.map(color => (
                                    <label key={color} style={{ display: 'inline-flex', alignItems: 'center', background: selectedColors.includes(color) ? 'var(--primary)' : '#f1f1f1', color: selectedColors.includes(color) ? 'white' : 'black', padding: '4px 10px', borderRadius: '20px', cursor: 'pointer', border: '1px solid #ccc' }}>
                                        <input 
                                            type="checkbox" 
                                            style={{ display: 'none' }}
                                            checked={selectedColors.includes(color)}
                                            onChange={(e) => {
                                                if (e.target.checked) setSelectedColors([...selectedColors, color]);
                                                else setSelectedColors(selectedColors.filter(c => c !== color));
                                            }}
                                        />
                                        <span style={{ fontSize: '0.85rem' }}>{color}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Available Sizes</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {AVAILABLE_SIZES.map(size => (
                                    <label key={size} style={{ display: 'inline-flex', alignItems: 'center', background: selectedSizes.includes(size) ? 'var(--primary)' : '#f1f1f1', color: selectedSizes.includes(size) ? 'white' : 'black', padding: '4px 10px', borderRadius: '20px', cursor: 'pointer', border: '1px solid #ccc' }}>
                                        <input 
                                            type="checkbox" 
                                            style={{ display: 'none' }}
                                            checked={selectedSizes.includes(size)}
                                            onChange={(e) => {
                                                if (e.target.checked) setSelectedSizes([...selectedSizes, size]);
                                                else setSelectedSizes(selectedSizes.filter(s => s !== size));
                                            }}
                                        />
                                        <span style={{ fontSize: '0.85rem' }}>{size}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label>Product Image Link URL*</label>
                            <input required type="url" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="form-control" placeholder="https://images.unsplash.com/photo-..." />
                        </div>

                        <button type="submit" className="btn" disabled={isLoading} style={{ marginTop: '10px' }}>
                            {isLoading ? 'Saving Product...' : 'Add to Store'}
                        </button>
                    </form>
                </div>

                <div style={{ padding: '30px', backgroundColor: 'var(--secondary)', borderRadius: '8px', textAlign: 'center' }}>
                    <h3>First Time Setup</h3>
                    <p style={{ marginTop: '10px', marginBottom: '20px', color: 'var(--text-light)' }}>
                        If your live database is currently empty, you can safely copy the 4 original starter products into it automatically.
                    </p>
                    <button 
                        className="btn" 
                        onClick={handleSeedMockData} 
                        disabled={isSeeding}
                        style={{ backgroundColor: '#2e7d32' }}
                    >
                        {isSeeding ? 'Seeding...' : 'Seed Starter Products'}
                    </button>
                </div>
            </div>

            <style>{`
                .form-control { width: 100%; padding: 12px 15px; border: 1px solid var(--border-color); font-family: var(--font-sans); font-size: 1rem; margin-top: 5px; }
                .form-control:focus { outline: none; border-color: var(--primary); }
                label { font-weight: 500; font-size: 0.9rem; }
            `}</style>
        </div>
    );
};

export default AdminAddProduct;
