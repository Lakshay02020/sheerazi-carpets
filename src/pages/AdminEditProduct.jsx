import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useParams, useNavigate } from 'react-router-dom';

const AdminEditProduct = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [originalPrice, setOriginalPrice] = useState('');
    const [category, setCategory] = useState('');
    const [imageUrls, setImageUrls] = useState(['']); // Array of image URLs
    const [shape, setShape] = useState('Rectangular');
    const [selectedColors, setSelectedColors] = useState([]);
    const [selectedSizes, setSelectedSizes] = useState([]);
    
    // Variant pricing state: { [size]: { price, originalPrice } }
    const [variantPrices, setVariantPrices] = useState({});

    // Dynamic Metadata State
    const [availableColors, setAvailableColors] = useState([]);
    const [availableSizes, setAvailableSizes] = useState([]);
    const [availableShapes, setAvailableShapes] = useState([]);
    const [newSize, setNewSize] = useState('');
    const [newShape, setNewShape] = useState('');
    const [newColor, setNewColor] = useState('');

    const [isLoading, setIsLoading] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [message, setMessage] = useState('');
    const [isSeeding, setIsSeeding] = useState(false);
    
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

    // Load Existing Product Data
    useEffect(() => {
        const fetchProductData = async () => {
            if (!id) return;
            try {
                const docRef = doc(db, 'products', id);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.title || '');
                    setPrice(data.price || '');
                    setOriginalPrice(data.originalPrice || '');
                    setCategory(data.category || '');
                    setImageUrls(data.images && data.images.length > 0 ? data.images : ['']);
                    setShape(data.shape || 'Rectangular');
                    setSelectedColors(data.colors || []);
                    setSelectedSizes(data.sizes || []);
                    
                    const prices = {};
                    if (data.variants) {
                        data.variants.forEach(v => {
                            prices[v.size] = { price: v.price || '', originalPrice: v.originalPrice || '' };
                        });
                    } else if (data.sizes) {
                        data.sizes.forEach(s => {
                            prices[s] = { price: data.price || '', originalPrice: data.originalPrice || '' };
                        });
                    }
                    setVariantPrices(prices);
                } else {
                    setMessage('Product not found.');
                }
            } catch (error) {
                console.error("Error loading product: ", error);
                setMessage("Failed to load product data.");
            }
        };
        fetchProductData();
    }, [id]);

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

    const handleImageUpload = async (e, index) => {
        const file = e.target.files[0];
        if (!file) return;

        setIsUploading(true);
        setMessage('');
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', 'Carpet Images');

        try {
            const res = await fetch('https://api.cloudinary.com/v1_1/dmhqtmk5s/image/upload', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            
            if (data.secure_url) {
                handleImageUrlChange(index, data.secure_url);
            } else {
                console.error("Upload failed", data);
                setMessage("Failed to upload image. Please try again.");
            }
        } catch (error) {
            console.error("Error uploading image: ", error);
            setMessage("Error connecting to image server.");
        } finally {
            setIsUploading(false);
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
            // Build variants array
            const variants = selectedSizes.map(size => ({
                size,
                price: parseFloat(variantPrices[size]?.price || price),
                originalPrice: variantPrices[size]?.originalPrice ? parseFloat(variantPrices[size].originalPrice) : (originalPrice ? parseFloat(originalPrice) : null)
            }));

            // Calculate base price for catalog (lowest price)
            const lowestPrice = variants.length > 0 
                ? Math.min(...variants.map(v => v.price)) 
                : parseFloat(price);
            
            const lowestOriginalPrice = variants.length > 0
                ? Math.max(...variants.filter(v => v.originalPrice).map(v => v.originalPrice))
                : (originalPrice ? parseFloat(originalPrice) : null);

            // 2. Update product info in Firestore directly
            const productData = {
                title,
                vendor: 'FINE AND ART CARPETS',
                price: lowestPrice,
                originalPrice: lowestOriginalPrice,
                category,
                shape,
                colors: selectedColors,
                sizes: selectedSizes, // Keep for legacy/search
                variants: variants, // New variant structure
                images: validUrls, // Use the array of valid URLs
                updatedAt: new Date().getTime()
            };

            await updateDoc(doc(db, 'products', id), productData);

            setMessage('Product updated successfully!');
            setTimeout(() => navigate('/admin/manage'), 1500);
            // Reset form
            setTitle('');
            setPrice('');
            setOriginalPrice('');
            setCategory('');
            setImageUrls(['']);
            setShape('Rectangular');
            setSelectedColors([]);
            setSelectedSizes([]);
            setVariantPrices({});
        } catch (error) {
            console.error('Error adding product: ', error);
            setMessage(`Error: ${error.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0 }}>Edit Carpet</h1>
            </div>
            
            <div style={{ maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                <div style={{ padding: '30px', border: '1px solid var(--border-color)', borderRadius: '8px', backgroundColor: 'var(--white)' }}>
                    <h2 style={{ marginBottom: '20px' }}>Product Details</h2>
                    
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
                        
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                            <div>
                                <label>Sale Price (₹)*</label>
                                <input required type="number" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="form-control" />
                            </div>
                            <div>
                                <label>Original Price (₹)</label>
                                <input type="number" step="0.01" value={originalPrice} onChange={(e) => setOriginalPrice(e.target.value)} className="form-control" placeholder="Optional" />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
                            <div>
                                <label>Category*</label>
                                <input required type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="form-control" placeholder="e.g. Shaggy, Hand Tufted" />
                            </div>
                            <div>
                                <label>Shape*</label>
                                <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                                    <select value={String(typeof shape === 'object' ? shape.name || JSON.stringify(shape) : shape)} onChange={(e) => setShape(e.target.value)} className="form-control" style={{ backgroundColor: 'white', flex: 1, marginTop: 0 }}>
                                        {availableShapes.map((s, idx) => {
                                            const sName = typeof s === 'object' && s !== null ? s.name || JSON.stringify(s) : String(s);
                                            return <option key={`shape-${idx}`} value={sName}>{sName}</option>;
                                        })}
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
                                {availableColors.map((color, idx) => {
                                    const colorName = typeof color === 'object' && color !== null ? color.name || JSON.stringify(color) : String(color);
                                    const colorHex = typeof color === 'object' && color !== null ? color.hex : null;
                                    return (
                                        <label key={`color-${idx}`} style={{ display: 'inline-flex', alignItems: 'center', background: selectedColors.includes(color) ? 'var(--primary)' : '#f1f1f1', color: selectedColors.includes(color) ? 'white' : 'black', padding: '4px 10px', borderRadius: '20px', cursor: 'pointer', border: '1px solid #ccc' }}>
                                            <input 
                                                type="checkbox" 
                                                style={{ display: 'none' }}
                                                checked={selectedColors.includes(color)}
                                                onChange={(e) => {
                                                    if (e.target.checked) setSelectedColors([...selectedColors, color]);
                                                    else setSelectedColors(selectedColors.filter(c => c !== color));
                                                }}
                                            />
                                            {colorHex && (
                                                <span style={{ width: '12px', height: '12px', borderRadius: '50%', background: colorHex, marginRight: '6px', border: '1px solid rgba(0,0,0,0.1)' }}></span>
                                            )}
                                            <span style={{ fontSize: '0.85rem' }}>{colorName}</span>
                                        </label>
                                    );
                                })}
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
                            <label style={{ display: 'block', marginBottom: '8px' }}>Available Sizes & Pricing*</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {availableSizes.map((size, idx) => {
                                    const sizeName = typeof size === 'object' && size !== null ? size.name || JSON.stringify(size) : String(size);
                                    return (
                                        <div key={`size-${idx}`} style={{ border: '1px solid #eee', padding: '15px', borderRadius: '8px', background: selectedSizes.includes(size) ? '#fbfbfb' : 'transparent' }}>
                                            <label style={{ display: 'inline-flex', alignItems: 'center', background: selectedSizes.includes(size) ? 'var(--primary)' : '#f1f1f1', color: selectedSizes.includes(size) ? 'white' : 'black', padding: '6px 12px', borderRadius: '20px', cursor: 'pointer', border: '1px solid #ccc' }}>
                                                <input 
                                                    type="checkbox" 
                                                    style={{ display: 'none' }}
                                                    checked={selectedSizes.includes(size)}
                                                    onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelectedSizes([...selectedSizes, size]);
                                                            // Initialize price with the global price if empty
                                                            if (!variantPrices[size]) {
                                                                setVariantPrices({
                                                                    ...variantPrices,
                                                                    [size]: { price: price, originalPrice: originalPrice }
                                                                });
                                                            }
                                                        } else {
                                                            setSelectedSizes(selectedSizes.filter(s => s !== size));
                                                        }
                                                    }}
                                                />
                                                <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>{sizeName}</span>
                                            </label>

                                            {selectedSizes.includes(size) && (
                                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '15px', marginTop: '12px' }}>
                                                    <div>
                                                        <label style={{ fontSize: '0.75rem', color: '#666' }}>Price for {sizeName} (₹)*</label>
                                                        <input 
                                                            required 
                                                            type="number" 
                                                            step="0.01" 
                                                            value={variantPrices[size]?.price || ''} 
                                                            onChange={(e) => setVariantPrices({
                                                                ...variantPrices,
                                                                [size]: { ...variantPrices[size], price: e.target.value }
                                                            })}
                                                            className="form-control" 
                                                            style={{ padding: '8px', fontSize: '0.9rem' }}
                                                        />
                                                    </div>
                                                    <div>
                                                        <label style={{ fontSize: '0.75rem', color: '#666' }}>Original Price (₹)</label>
                                                        <input 
                                                            type="number" 
                                                            step="0.01" 
                                                            value={variantPrices[size]?.originalPrice || ''} 
                                                            onChange={(e) => setVariantPrices({
                                                                ...variantPrices,
                                                                [size]: { ...variantPrices[size], originalPrice: e.target.value }
                                                            })}
                                                            className="form-control" 
                                                            style={{ padding: '8px', fontSize: '0.9rem' }}
                                                            placeholder="Optional"
                                                        />
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
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
                            <label style={{ display: 'block', marginBottom: '10px' }}>Product Images* (Upload file or paste URL)</label>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                {imageUrls.map((url, index) => (
                                    <div key={index} style={{ display: 'flex', gap: '10px' }}>
                                        <input 
                                            required={index === 0 && !url} 
                                            type="url" 
                                            value={url} 
                                            onChange={(e) => handleImageUrlChange(index, e.target.value)} 
                                            className="form-control" 
                                            style={{ marginTop: 0 }}
                                            placeholder={`Paste URL or Upload ->`} 
                                        />
                                        <label className="btn" style={{ cursor: 'pointer', margin: 0, padding: '0 15px', display: 'flex', alignItems: 'center', backgroundColor: '#1976d2', whiteSpace: 'nowrap' }}>
                                            {isUploading && !url ? 'Uploading...' : 'Upload'}
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                style={{ display: 'none' }}
                                                onChange={(e) => handleImageUpload(e, index)}
                                                disabled={isUploading}
                                            />
                                        </label>
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

                        <button type="submit" className="btn" disabled={isLoading || isUploading} style={{ marginTop: '20px' }}>
                            {isLoading ? 'Saving Product...' : (isUploading ? 'Waiting for upload...' : 'Update Properties')}
                        </button>
                    </form>
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

export default AdminEditProduct;
