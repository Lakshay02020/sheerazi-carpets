import React, { useState, useEffect } from 'react';
import { db } from '../firebase/config';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const DEFAULT_CATEGORIES = [
    { name: 'Hand Tufted', url: 'https://images.unsplash.com/photo-1594040226829-7f251ab46d80?auto=format&fit=crop&q=80&w=800' },
    { name: 'Shaggy', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800' },
    { name: 'Persian Silk', url: 'https://images.unsplash.com/photo-1600166898405-da9535204843?auto=format&fit=crop&q=80&w=800' },
    { name: 'Designer', url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&q=80&w=800' }
];

const AdminManageCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);
    const [uploadingIndex, setUploadingIndex] = useState(null);
    
    const [newName, setNewName] = useState('');
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newDetails, setNewDetails] = useState('');
    const [editingDetailsIndex, setEditingDetailsIndex] = useState(null);
    const [editDetailsValue, setEditDetailsValue] = useState('');

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const docRef = doc(db, 'metadata', 'categories');
                const docSnap = await getDoc(docRef);
                if (docSnap.exists() && docSnap.data().items) {
                    setCategories(docSnap.data().items);
                } else {
                    await setDoc(docRef, { items: DEFAULT_CATEGORIES });
                    setCategories(DEFAULT_CATEGORIES);
                }
            } catch (error) {
                console.error("Error fetching categories:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    const handleImageUpload = async (file, index = null) => {
        if (!file) return;

        if (index !== null) setUploadingIndex(index);
        else setIsUploading(true);

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
                if (index !== null) {
                    const updatedList = [...categories];
                    updatedList[index].url = data.secure_url;
                    await updateDoc(doc(db, 'metadata', 'categories'), { items: updatedList });
                    setCategories(updatedList);
                } else {
                    setNewImageUrl(data.secure_url);
                }
            }
        } catch (error) {
            console.error("Error uploading image: ", error);
            alert("Error connecting to image server.");
        } finally {
            if (index !== null) setUploadingIndex(null);
            else setIsUploading(false);
        }
    };

    const handleAddCategory = async (e) => {
        e.preventDefault();
        if(!newName.trim() || !newImageUrl.trim()) return;
        
        const newCat = { name: newName.trim(), url: newImageUrl, details: newDetails.trim() };
        const updatedList = [...categories, newCat];
        
        try {
            await updateDoc(doc(db, 'metadata', 'categories'), { items: updatedList });
            setCategories(updatedList);
            setNewName('');
            setNewImageUrl('');
            setNewDetails('');
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const handleSaveDetails = async (index) => {
        const updatedList = [...categories];
        updatedList[index].details = editDetailsValue.trim();
        try {
            await updateDoc(doc(db, 'metadata', 'categories'), { items: updatedList });
            setCategories(updatedList);
            setEditingDetailsIndex(null);
        } catch (error) {
            console.error("Error saving details:", error);
        }
    };

    const handleDeleteCategory = async (indexToDelete) => {
        if(!window.confirm("Are you sure you want to delete this category?")) return;
        
        const updatedList = categories.filter((_, idx) => idx !== indexToDelete);
        try {
            await updateDoc(doc(db, 'metadata', 'categories'), { items: updatedList });
            setCategories(updatedList);
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    if (loading) return <div>Loading Categories...</div>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0 }}>Manage Store Categories</h1>
            </div>

            {/* Add New Category Form */}
            <div style={{ backgroundColor: 'var(--white)', borderRadius: '8px', padding: '20px', border: '1px solid var(--border-color)', marginBottom: '30px' }}>
                <h3>Add New Category Banner</h3>
                <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '15px' }}>
                    <div>
                        <label>Category Title*</label>
                        <input required type="text" value={newName} onChange={e => setNewName(e.target.value)} className="form-control" placeholder="e.g. Vintage Collections" />
                    </div>
                    <div>
                        <label>Product Details (Bullet points)*</label>
                        <textarea required value={newDetails} onChange={e => setNewDetails(e.target.value)} className="form-control" rows="4" placeholder="Material: 100% Wool&#10;Backing: Canvas&#10;Comfort: Soft and plush"></textarea>
                    </div>
                    <div>
                        <label>Banner Image URL*</label>
                        <div style={{ display: 'flex', gap: '10px' }}>
                            <input required type="url" value={newImageUrl} onChange={e => setNewImageUrl(e.target.value)} className="form-control" style={{ marginTop: 0 }} placeholder="Paste a link or click Upload ->" />
                            <label className="btn" style={{ cursor: 'pointer', margin: 0, padding: '0 15px', display: 'flex', alignItems: 'center', backgroundColor: '#1976d2', whiteSpace: 'nowrap' }}>
                                {isUploading ? 'Uploading...' : 'Upload Image'}
                                <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e.target.files[0], null)} disabled={isUploading} />
                            </label>
                        </div>
                    </div>
                    <button type="submit" disabled={isUploading || !newName || !newImageUrl} className="btn" style={{ marginTop: '10px' }}>Add Category</button>
                </form>
            </div>

            {/* Existing Categories Table */}
            <div style={{ backgroundColor: 'var(--white)', borderRadius: '8px', padding: '20px', border: '1px solid var(--border-color)' }}>
                <h3>Current Categories</h3>
                <div style={{ overflowX: 'auto', marginTop: '15px' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                        <thead>
                            <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                                <th style={{ padding: '15px' }}>Banner</th>
                                <th style={{ padding: '15px' }}>Title</th>
                                <th style={{ padding: '15px', textAlign: 'right' }}>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categories.map((cat, idx) => (
                                <React.Fragment key={idx}>
                                <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                    <td style={{ padding: '15px' }}>
                                        <img src={cat.url} alt={cat.name} style={{ width: '100px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                    </td>
                                    <td style={{ padding: '15px', fontWeight: '500' }}>{cat.name}</td>
                                    <td style={{ padding: '15px', textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: '10px', flexWrap: 'wrap' }}>
                                        <label className="btn" style={{ padding: '6px 12px', fontSize: '0.85rem', backgroundColor: '#1976d2', cursor: 'pointer', margin: 0, display: 'inline-flex', alignItems: 'center' }}>
                                            {uploadingIndex === idx ? 'Uploading...' : 'Edit Image'}
                                            <input type="file" accept="image/*" style={{ display: 'none' }} onChange={(e) => handleImageUpload(e.target.files[0], idx)} disabled={uploadingIndex === idx} />
                                        </label>
                                        <button onClick={() => {
                                            if (editingDetailsIndex === idx) {
                                                setEditingDetailsIndex(null);
                                            } else {
                                                setEditingDetailsIndex(idx);
                                                setEditDetailsValue(cat.details || '');
                                            }
                                        }} className="btn" style={{ padding: '6px 12px', fontSize: '0.85rem', backgroundColor: '#4caf50' }}>{editingDetailsIndex === idx ? 'Cancel' : 'Edit Details'}</button>
                                        <button onClick={() => handleDeleteCategory(idx)} className="btn" style={{ padding: '6px 12px', fontSize: '0.85rem', backgroundColor: '#e53935' }}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                                {editingDetailsIndex === idx && (
                                    <tr style={{ borderBottom: '1px solid var(--border-color)', backgroundColor: '#f9f9f9' }}>
                                        <td colSpan="3" style={{ padding: '15px' }}>
                                            <div>
                                                <label style={{ display: 'block', marginBottom: '8px', fontWeight: '500' }}>Edit details for "{cat.name}" (Newline separated bullets)</label>
                                                <textarea value={editDetailsValue} onChange={(e) => setEditDetailsValue(e.target.value)} className="form-control" rows="4"></textarea>
                                                <button onClick={() => handleSaveDetails(idx)} className="btn" style={{ marginTop: '10px' }}>Save Details</button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                                </React.Fragment>
                            ))}
                            {categories.length === 0 && (
                                <tr><td colSpan="3" style={{ padding: '20px', textAlign: 'center' }}>No categories created yet.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <style>{`
                .form-control { width: 100%; padding: 10px 15px; border: 1px solid var(--border-color); font-family: var(--font-sans); font-size: 1rem; margin-top: 5px; border-radius: 4px; }
            `}</style>
        </div>
    );
};

export default AdminManageCategories;
