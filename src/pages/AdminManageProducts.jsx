import React from 'react';
import { useProducts } from '../context/ProductContext';
import { db } from '../firebase/config';
import { doc, deleteDoc, collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const AdminManageProducts = () => {
    const { products, loading } = useProducts();
    const navigate = useNavigate();

    const handleDelete = async (id) => {
        if (window.confirm('Are you certain you want to permanently delete this product?')) {
            try {
                await deleteDoc(doc(db, 'products', id));
                // Firebase onSnapshot will automatically update the ui list
            } catch (error) {
                alert("Failed to delete product.");
            }
        }
    };

    const handleDuplicate = (product) => {
        navigate('/admin/add', { state: { duplicateFrom: product } });
    };

    if (loading) {
        return <div>Loading products...</div>;
    }

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0 }}>Manage Carpets</h1>
            </div>

            <div style={{ backgroundColor: 'var(--white)', borderRadius: '8px', padding: '20px', border: '1px solid var(--border-color)', boxShadow: '0 2px 10px rgba(0,0,0,0.05)' }}>
                {products.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '40px', color: 'var(--text-light)' }}>
                        No products available in the database.
                    </p>
                ) : (
                    <div style={{ overflowX: 'auto' }}>
                        {(() => {
                            const productsByCategory = products.reduce((acc, product) => {
                                const cat = product.category || 'Uncategorized';
                                if (!acc[cat]) acc[cat] = [];
                                acc[cat].push(product);
                                return acc;
                            }, {});

                            return Object.entries(productsByCategory).map(([category, catProducts]) => (
                                <div key={category} style={{ marginBottom: '40px' }}>
                                    <h3 style={{ margin: '0 0 15px 0', borderBottom: '2px solid var(--border-color)', paddingBottom: '10px', color: 'var(--primary)' }}>{category} ({catProducts.length})</h3>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: '20px' }}>
                                        <thead>
                                            <tr style={{ borderBottom: '2px solid var(--border-color)', backgroundColor: '#f9f9f9' }}>
                                                <th style={{ padding: '15px' }}>Image</th>
                                                <th style={{ padding: '15px' }}>Title</th>
                                                <th style={{ padding: '15px' }}>Price</th>
                                                <th style={{ padding: '15px', textAlign: 'right' }}>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {catProducts.map((product) => (
                                    <tr key={product.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        <td style={{ padding: '15px' }}>
                                            <img 
                                                src={product.images && product.images.length > 0 ? product.images[0] : (product.image || '')} 
                                                alt={product.title} 
                                                style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} 
                                            />
                                        </td>
                                        <td style={{ padding: '15px', fontWeight: '500' }}>
                                            {product.title}
                                        </td>
                                        <td style={{ padding: '15px', fontWeight: 'bold' }}>
                                            ₹{product.price}
                                        </td>
                                        <td style={{ padding: '15px', textAlign: 'right' }}>
                                            <button 
                                                onClick={() => navigate(`/admin/edit/${product.id}`)}
                                                className="btn" 
                                                style={{ padding: '6px 12px', fontSize: '0.85rem', marginRight: '10px' }}
                                            >
                                                Edit
                                            </button>
                                            <button 
                                                onClick={() => handleDuplicate(product)}
                                                className="btn" 
                                                style={{ padding: '6px 12px', fontSize: '0.85rem', marginRight: '10px', backgroundColor: '#4caf50' }}
                                            >
                                                Duplicate
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(product.id)}
                                                className="btn" 
                                                style={{ padding: '6px 12px', fontSize: '0.85rem', backgroundColor: '#e53935' }}
                                            >
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        </div>
                            ));
                        })()}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminManageProducts;
