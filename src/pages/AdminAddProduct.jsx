import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, addDoc, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { products as mockProducts } from '../data/mockProducts';
import { useAuth } from '../context/AuthContext';


const AdminAddProduct = () => {
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrls, setImageUrls] = useState(['']); // Array of image URLs
    const [shape, setShape] = useState('Rectangular');
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    
    // Dynamic Metadata State
    const [availableColors, setAvailableColors] = useState([]);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [availableShapes, setAvailableShapes] = useState([]);
    const [newSize, setNewSize] = useState('');
    const [newShape, setNewShape] = useState('');
    const [newColor, setNewColor] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSeeding, setIsSeeding] = useState(false);
    
    const { logout } = useAuth();

    // Fetch and sync global metadata from Firestore
    useEffect(() => {
        const fetchMetadata = async () => {
            try {
                const docRef = doc(db, 'metadata', 'product_options');
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setAvailableColors(data.colors || []);
                    setAvailableSizes(data.sizes || []);
                    setAvailableShapes(data.shapes || []);
                } else {
                    // Initialize if not present
                    const initialData = {
                        colors: ['Red', 'Blue', 'Beige', 'Black', 'Green', 'White', 'Grey', 'Brown', 'Pink', 'Yellow'],
                        sizes: ['3x5 ft', '4x6 ft', '5x7 ft', '5x8 ft', '6x8 ft', '6x9 ft', '8x10 ft', '9x12 ft'],
                        shapes: ['Rectangular', 'Round', 'Irregular']
                    };
                    await setDoc(docRef, initialData);
                    setAvailableColors(initialData.colors);
                    setAvailableSizes(initialData.sizes);
                    setAvailableShapes(initialData.shapes);
                }
            } catch (error) {
                console.error("Error fetching metadata: ", error);
            }
        };
        fetchMetadata();
    }, []);

    const handleAddImageUrl = () => {
        setImageUrls([...imageUrls, '']);
    };

    const handleRemoveImageUrl = (index) => {
        const newUrls = imageUrls.filter((_, i) => i !== index);
        setImageUrls(newUrls.length > 0 ? newUrls : ['']);
    };

    const handleImageUrlChange = (index, value) => {
        const newUrls = [...imageUrls];
        newUrls[index] = value;
        setImageUrls(newUrls);
    };

    const handleAddNewSize = async () => {
        if (!newSize.trim()) return;
        const sizeToAdd = newSize.trim();
        if (!availableSizes.includes(sizeToAdd)) {
            try {
                const docRef = doc(db, 'metadata', 'product_options');
                await updateDoc(docRef, {
                    sizes: arrayUnion(sizeToAdd)
                });
                setAvailableSizes([...availableSizes, sizeToAdd]);
                setSelectedSizes([...selectedSizes, sizeToAdd]);
                setNewSize('');
            } catch (error) {
                console.error("Error adding size: ", error);
            }
        }
    };

    const handleAddNewShape = async () => {
        if (!newShape.trim()) return;
        const shapeToAdd = newShape.trim();
        if (!availableShapes.includes(shapeToAdd)) {
            try {
                const docRef = doc(db, 'metadata', 'product_options');
                await updateDoc(docRef, {
                    shapes: arrayUnion(shapeToAdd)
                });
                setAvailableShapes([...availableShapes, shapeToAdd]);
                setShape(shapeToAdd);
                setNewShape('');
            } catch (error) {
                console.error("Error adding shape: ", error);
            }
        }
    };

    const handleAddNewColor = async () => {
        if (!newColor.trim()) return;
        const colorToAdd = newColor.trim();
        if (!availableColors.includes(colorToAdd)) {
            try {
                const docRef = doc(db, 'metadata', 'product_options');
                await updateDoc(docRef, {
                    colors: arrayUnion(colorToAdd)
                });
                setAvailableColors([...availableColors, colorToAdd]);
                setSelectedColors([...selectedColors, colorToAdd]);
                setNewColor('');
            } catch (error) {
                console.error("Error adding color: ", error);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Filter out empty URLs
        const validUrls = imageUrls.filter(url => url.trim() !== '');

        if (validUrls.length === 0) {
            setMessage('Please paste at least one image URL address.');
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
                images: validUrls, // Use the array of valid URLs
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
            setImageUrls(['']);
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
                    images: product.images || [product.image], // Support both old and new format
                    sizes: product.sizes || ['3x5 ft', '5x8 ft', '8x10 ft'],
                    colors: product.colors || ['Beige', 'Red'],
                    shape: product.shape || 'Rectangular',
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
                                <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                    <select value={shape} onChange={(e) => setShape(e.target.value)} className="form-control" style={{ backgroundColor: 'white', flex: 1, marginTop: 0 }}>
                                        {availableShapes.map(s => <option key={s} value={s}>{s}</option>)}
                                    </select>
                                </div>
                                <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                                    <input 
                                        type="text" 
                                        placeholder="Add New Shape" 
                                        value={newShape} 
                                        onChange={(e) => setNewShape(e.target.value)} 
                                        className="form-control" 
                                        style={{ fontSize: '0.8rem', padding: '8px', marginTop: 0 }}
                                    />
                                    <button type="button" onClick={handleAddNewShape} className="btn" style={{ padding: '0 10px', fontSize: '0.8rem', backgroundColor: 'var(--text-dark)' }}>Add</button>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Available Colors</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {availableColors.map(color => (
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
                            <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                                <input 
                                    type="text" 
                                    placeholder="Add New Color" 
                                    value={newColor} 
                                    onChange={(e) => setNewColor(e.target.value)} 
                                    className="form-control" 
                                    style={{ fontSize: '0.8rem', padding: '8px', marginTop: 0 }}
                                />
                                <button type="button" onClick={handleAddNewColor} className="btn" style={{ padding: '0 10px', fontSize: '0.8rem', backgroundColor: 'var(--text-dark)' }}>Add</button>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '8px' }}>Available Sizes</label>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                                {availableSizes.map(size => (
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
                            <div style={{ display: 'flex', gap: '5px', marginTop: '10px' }}>
                                <input 
                                    type="text" 
                                    placeholder="Add New Size (e.g. 10x14 ft)" 
                                    value={newSize} 
                                    onChange={(e) => setNewSize(e.target.value)} 
                                    className="form-control" 
                                    style={{ fontSize: '0.8rem', padding: '8px', marginTop: 0 }}
                                />
                                <button type="button" onClick={handleAddNewSize} className="btn" style={{ padding: '0 10px', fontSize: '0.8rem', backgroundColor: 'var(--text-dark)' }}>Add</button>
                            </div>
                        </div>

                        <div>
                            <label style={{ display: 'block', marginBottom: '10px' }}>Product Image Links (URLs)*</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {imageUrls.map((url, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '10px' }}>
                                        <input 
                                            required={index === 0} 
                                            type="url" 
                                            value={url} 
                                            onChange={(e) => handleImageUrlChange(index, e.target.value)} 
                                            className="form-control" 
                                            style={{ marginTop: 0 }}
                                            placeholder={`Image URL ${index + 1}`} 
                                        />
                                        {imageUrls.length > 1 && (
                                            <button 
                                                type="button" 
                                                onClick={() => handleRemoveImageUrl(index)}
                                                className="btn"
                                                style={{ padding: '0 15px', backgroundColor: '#e53935' }}
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                ))}
                                <button 
                                    type="button" 
                                    onClick={handleAddImageUrl}
                                    className="btn"
                                    style={{ backgroundColor: 'var(--text-dark)', padding: '10px', fontSize: '0.9rem' }}
                                >
                                    + Add Another Image
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="btn" disabled={isLoading} style={{ marginTop: '20px' }}>
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
